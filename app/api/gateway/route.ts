import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase Admin for internal logic
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * 🛰️ UNIVERSAL CALLBACK GATEWAY
 * A single endpoint to handle all external callbacks (Auth, Payments, Webhooks).
 * 
 * Usage:
 * Supabase Auth URL: https://your-domain.com/api/gateway?provider=supabase
 * Razorpay Webhook URL: https://your-domain.com/api/gateway?provider=razorpay
 */

// 1. HANDLER: SUPABASE AUTH (GET)
async function handleSupabaseAuth(request: Request, searchParams: URLSearchParams, origin: string) {
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const cookieStore = cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    async get(name: string) {
                        return (await cookieStore).get(name)?.value
                    },
                    async set(name: string, value: string, options: CookieOptions) {
                        (await cookieStore).set({ name, value, ...options })
                    },
                    async remove(name: string, options: CookieOptions) {
                        (await cookieStore).set({ name, value: '', ...options })
                    },
                },
            }
        )
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            return NextResponse.redirect(`${origin}${next}`)
        }
    }
    return NextResponse.redirect(`${origin}/login?error=auth-failed`)
}

// 2. HANDLER: RAZORPAY WEBHOOK (POST)
async function handleRazorpayWebhook(request: Request) {
    const body = await request.text()
    const signature = request.headers.get("x-razorpay-signature")

    if (!signature) return NextResponse.json({ error: "Missing Signature" }, { status: 400 })

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
        .update(body)
        .digest("hex")

    if (expectedSignature !== signature) {
        return NextResponse.json({ error: "Invalid Signature" }, { status: 403 })
    }

    const payload = JSON.parse(body)
    if (payload.event === "payment.captured") {
        const payment = payload.payload.payment.entity
        const userId = payment.notes?.user_id
        const credits = parseInt(payment.notes?.credits_to_add || "0")
        const tier = payment.notes?.plan_name || 'free'

        if (userId && credits > 0) {
            await supabaseAdmin.rpc('increment_credits', {
                user_id: userId,
                amount: credits,
                new_tier: tier.toLowerCase()
            })
        }
    }
    return NextResponse.json({ status: "success" })
}

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const provider = searchParams.get('provider')

    // If it's a Supabase auth code, handle it
    if (searchParams.has('code') || provider === 'supabase') {
        return handleSupabaseAuth(request, searchParams, origin)
    }

    return NextResponse.json({ error: "Provider not recognized" }, { status: 400 })
}

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url)
    const provider = searchParams.get('provider')
    const signature = request.headers.get("x-razorpay-signature")

    // Auto-detect Razorpay by signature OR query param
    if (signature || provider === 'razorpay') {
        return handleRazorpayWebhook(request)
    }

    return NextResponse.json({ error: "Gateway protocol not identified" }, { status: 400 })
}
