"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVICE_STRIPE_BASE_URL = exports.STRIPE_PRODUCTS = void 0;
const index_js_1 = require("../generated/index.js");
exports.STRIPE_PRODUCTS = {
    prod_O7wzoLu2kjOQXb: index_js_1.PlanType.STARTER,
    prod_O7x1SUxDMMqwGl: index_js_1.PlanType.GROWTH,
    prod_O7x3lffVxBqBiA: index_js_1.PlanType.PROFESSIONAL,
};
exports.SERVICE_STRIPE_BASE_URL = process.env.NODE_ENV === "production"
    ? `https://service-stripe-yzmezs2csa-ue.a.run.app`
    : `http://localhost:8080`;
