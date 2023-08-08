import type { Request, Response } from "express";
import express, { json } from "express";
import Stripe from "stripe";
import invariant from "tiny-invariant";

import { PrismaClient } from "./generated/index.js";
import { STRIPE_PRODUCTS } from "./utils/constants.js";

const app = express();

const prisma = new PrismaClient();

invariant(process.env.STRIPE_API_KEY, "Missing Stripe API key");

const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
});

interface StripeWebhookEvent {
  type: "checkout.session.completed";
  data: {
    object: CheckoutSession;
  };
}

interface CheckoutSession {
  id: string;
  customer: string;
  client_reference_id: string;
}

app.post(
  "/webhook",
  json({ type: "application/json" }),
  (request: Request<{}, {}, StripeWebhookEvent>, response: Response) => {
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

app.listen(8080, () => console.log("Running on port 8080"));

async function handleCheckoutSessionCompleted(
  checkoutSession: CheckoutSession
) {
  console.log(`Payment received!`);

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

  interface StripeSubscription {
    id: string;
    plan: {
      product: string;
    };
  }

  invariant(stripeCheckout.subscription, "Missing subscription");

  const stripeSubscription = (await stripe.subscriptions.retrieve(
    stripeCheckout.subscription.toString()
  )) as unknown as StripeSubscription;

  await prisma.user.update({
    where: {
      id: checkoutSession.client_reference_id,
    },
    data: {
      stripeCustomerId: checkoutSession.customer,
      planType:
        STRIPE_PRODUCTS[
          stripeSubscription.plan.product as keyof typeof STRIPE_PRODUCTS
        ],
    },
  });
}
