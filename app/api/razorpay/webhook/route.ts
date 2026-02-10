import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Admin (Service Role) for server-side updates
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
        return NextResponse.json({ error: "Missing Signature" }, { status: 400 });
    }

    // 1. Verify Razorpay Signature
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
        .update(body)
        .digest("hex");

    if (expectedSignature !== signature) {
        console.error("❌ Razorpay Signature Rejection: Neural Bridge Compromised");
        return NextResponse.json({ error: "Invalid Signature" }, { status: 403 });
    }

    const payload = JSON.parse(body);
    const event = payload.event;

    // 2. Handle Payment & Subscription Events
    switch (event) {
        case "payment.captured":
        case "order.paid": {
            const payment = payload.payload.payment?.entity || payload.payload.order?.entity;
            const userId = payment.notes?.user_id;
            const creditsToAdd = parseInt(payment.notes?.credits_to_add || "0");
            const planName = payment.notes?.plan_name || "free";

            if (userId && creditsToAdd > 0) {
                console.log(`📡 Reconciling Payment: User ${userId} | Plan: ${planName} | Credits: +${creditsToAdd}`);

                await supabaseAdmin.rpc('increment_credits', {
                    user_id: userId,
                    amount: creditsToAdd,
                    new_tier: planName.toLowerCase()
                });
            }
            break;
        }

        case "subscription.activated":
        case "subscription.charged": {
            const subscription = payload.payload.subscription.entity;
            const userId = subscription.notes?.user_id;
            const planName = subscription.notes?.plan_name || "pro";

            // Map plan to credits (Standard SaaS pricing)
            const creditMapping: Record<string, number> = {
                "free": 5,
                "starter": 50,
                "pro": 200,
                "business": 1000
            };

            const credits = creditMapping[planName.toLowerCase()] || 0;

            if (userId) {
                console.log(`⚡ Subscription Sync: User ${userId} | Event: ${event} | Plan: ${planName}`);

                // Use the new hardened RPC for atomic sync
                await supabaseAdmin.rpc('sync_subscription_credits', {
                    user_id: userId,
                    amount: credits,
                    new_tier: planName.toLowerCase(),
                    sub_id: subscription.id,
                    cycle_start: new Date().toISOString()
                });
            }
            break;
        }

        case "subscription.cancelled": {
            const subscription = payload.payload.subscription.entity;
            const userId = subscription.notes?.user_id;

            if (userId) {
                console.log(`⚠️ Subscription Terminated: User ${userId}`);
                await supabaseAdmin.from('profiles').update({
                    subscription_tier: "free",
                    updated_at: new Date().toISOString()
                }).eq('id', userId);
            }
            break;
        }
    }

    return NextResponse.json({ status: "success", received: true });
}
