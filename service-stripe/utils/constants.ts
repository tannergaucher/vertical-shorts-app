import { PlanType } from "../generated/index.js";

export const STRIPE_PRODUCTS = {
  prod_O7wzoLu2kjOQXb: PlanType.STARTER,
  prod_O7x1SUxDMMqwGl: PlanType.GROWTH,
  prod_O7x3lffVxBqBiA: PlanType.PROFESSIONAL,
};

export const SERVICE_STRIPE_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://service-stripe-yzmezs2csa-ue.a.run.app`
    : `http://localhost:8080`;
