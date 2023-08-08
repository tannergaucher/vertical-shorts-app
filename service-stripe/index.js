"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const stripe_1 = __importDefault(require("stripe"));
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const index_js_1 = require("./generated/index.js");
const constants_js_1 = require("./utils/constants.js");
const app = (0, express_1.default)();
const prisma = new index_js_1.PrismaClient();
(0, tiny_invariant_1.default)(process.env.STRIPE_API_KEY, "Missing Stripe API key");
const stripe = new stripe_1.default(process.env.STRIPE_API_KEY, {
    apiVersion: "2022-11-15",
});
app.post("/webhook", (0, express_1.json)({ type: "application/json" }), (request, response) => {
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
});
app.listen(8080, () => console.log("Running on port 8080"));
function handleCheckoutSessionCompleted(checkoutSession) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Payment received!`);
        if (!checkoutSession.client_reference_id) {
            throw new Error("Checkout session missing client reference ID");
        }
        const user = yield prisma.user.findUnique({
            where: {
                id: checkoutSession.client_reference_id,
            },
        });
        if (!user) {
            throw new Error(`User not found with ID ${checkoutSession.client_reference_id}`);
        }
        const stripeCheckout = yield stripe.checkout.sessions.retrieve(checkoutSession.id);
        (0, tiny_invariant_1.default)(stripeCheckout.subscription, "Missing subscription");
        const stripeSubscription = (yield stripe.subscriptions.retrieve(stripeCheckout.subscription.toString()));
        yield prisma.user.update({
            where: {
                id: checkoutSession.client_reference_id,
            },
            data: {
                stripeCustomerId: checkoutSession.customer,
                planType: constants_js_1.STRIPE_PRODUCTS[stripeSubscription.plan.product],
            },
        });
    });
}
