import { NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing Stripe webhook signature or secret." }, { status: 400 });
  }

  const body = await request.text();
  const stripe = getStripeClient();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid webhook signature.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const reportId = session.metadata?.reportId;

    if (reportId) {
      const supabase = createSupabaseAdminClient();
      await supabase
        .from("reports")
        .update({
          is_paid: true,
          paid_at: new Date().toISOString()
        })
        .eq("id", reportId)
        .eq("is_paid", false);
    }
  }

  return NextResponse.json({ received: true });
}
