import express, { json } from "express";
import Stripe from "stripe";

import { PrismaClient } from "./generated/index.js";
import { STRIPE_PRODUCTS } from "./utils/constants.js";

const app = express();

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
});

app.post(
  "/webhook",
  json({ type: "application/json" }),
  (request, response) => {
    const event = request.body;

    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSession = event.data.object;

        handleCheckoutSessionCompleted(checkoutSession);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.json({ received: true });
  }
);

app.listen(8000, () => console.log("Running on port 8000"));

async function handleCheckoutSessionCompleted(checkoutSession) {
  console.log(`Payment received!`);
  console.log(JSON.stringify(checkoutSession, null, 2));

  if (!checkoutSession.client_reference_id) {
    throw new Error("Checkout session missing client reference ID");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: checkoutSession.client_reference_id,
    },
  });

  if (!user) {
    throw new Error(
      `User not found with ID ${checkoutSession.client_reference_id}`
    );
  }

  const stripeCheckout = await stripe.checkout.sessions.retrieve(
    checkoutSession.id
  );

  console.log("_stripe checkout", stripeCheckout);

  const stripeProduct = stripeCheckout?.line_items?.data.map(
    (lineItem) => lineItem.price.product
  );

  await prisma.user.update({
    where: {
      id: checkoutSession.client_reference_id,
    },
    data: {
      stripeCustomerId: checkoutSession.customer,
      planType: STRIPE_PRODUCTS[stripeProduct[0]],
    },
  });
}