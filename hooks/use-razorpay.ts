"use client";

import { useCallback } from "react";

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id?: string;
    handler: (response: RazorpayResponse) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    theme?: {
        color?: string;
    };
    notes?: Record<string, string | number>;
}

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => {
            open: () => void;
        };
    }
}

export const useRazorpay = () => {
    const loadScript = useCallback((src: string) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }, []);

    const initiatePayment = useCallback(async (options: Omit<RazorpayOptions, 'key'>) => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const rzpOptions: RazorpayOptions = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mock_key", // Fallback for dev
            ...options,
            theme: {
                color: "#3b82f6", // EdgeAI Blue
            },
        };

        const paymentObject = new window.Razorpay(rzpOptions);
        paymentObject.open();
    }, [loadScript]);

    return { initiatePayment };
};
