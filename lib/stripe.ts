import Stripe from "stripe";

export function getStripeClient() {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
  }

  return new Stripe(stripeSecretKey, {
    apiVersion: "2025-08-27.basil"
  });
}
