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

    // 2. Handle Payment Success
    if (event === "payment.captured") {
        const payment = payload.payload.payment.entity;
        const userId = payment.notes?.user_id;
        const creditsToAdd = parseInt(payment.notes?.credits_to_add || "0");
        const planName = payment.notes?.plan_name;

        if (userId && creditsToAdd > 0) {
            console.log(`📡 Reconciling Payment: User ${userId} | Plan: ${planName} | Credits: +${creditsToAdd}`);

            // 3. Update Profile via Supabase Admin
            const { error: updateError } = await supabaseAdmin
                .from('profiles')
                .select('credits')
                .eq('id', userId)
                .single();

            if (!updateError) {
                const { error: finalError } = await supabaseAdmin.rpc('increment_credits', {
                    user_id: userId,
                    amount: creditsToAdd,
                    new_tier: planName.toLowerCase()
                });

                if (finalError) {
                    console.error("❌ Database Reconciliation Failure:", finalError);
                } else {
                    console.log("✅ Neural Sync Complete: Credits Dispatched");
                }
            }
        }
    }

    return NextResponse.json({ status: "success", received: true });
}
