import { Stripe } from "stripe";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

type LoaderData = {
  products: Stripe.Product[];
};

// loader: load products from stripe API
export const loader = async () => {
  //  initiate stripe API

  const stripeAPI = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
  });

  //  fetch products from stripe API
  const productIds = ["prod_MtQoCyebAF3pOc"];

  const products = await Promise.all(
    productIds.map(async (productId) => {
      const product = await stripeAPI.products.retrieve(productId);
      return product;
    })
  );

  //  return products
  return json({
    products,
  });
};

// action: submit products to stripe API
export const action = async () => {
  // initiate stripe API

  return null;
};

export default function ShopProductsPage() {
  const data = useLoaderData<LoaderData>();

  return (
    <main>
      <h2>Shop Products</h2>
      <ul>
        {data.products.map((product) => (
          <li key={product.id}>
            <Link to={`${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
