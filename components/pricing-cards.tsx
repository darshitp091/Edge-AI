"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Check, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRazorpay } from "@/hooks/use-razorpay";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface PricingTier {
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    popular: boolean;
}

const pricingTiers: PricingTier[] = [
    {
        name: "Free",
        price: "0",
        description: "Perfect for students and hobbyists",
        features: [
            "5 compressions per month",
            "INT8 quantization only",
            "Web interface access",
            "100MB model size limit",
            "Community support",
            "Basic analytics",
        ],
        cta: "Start Free",
        popular: false,
    },
    {
        name: "Starter",
        price: "29",
        description: "For indie developers and small startups",
        features: [
            "50 compressions per month",
            "All compression formats",
            "API access",
            "500MB model size limit",
            "Email support",
            "Advanced analytics",
            "Priority queue",
            "Export to all formats",
        ],
        cta: "Start Trial",
        popular: true,
    },
    {
        name: "Pro",
        price: "99",
        description: "For growing companies in production",
        features: [
            "200 compressions per month",
            "Unlimited model size",
            "Python SDK + CLI",
            "Advanced optimization",
            "Priority support",
            "Custom hardware profiles",
            "Team features (5 seats)",
            "99.9% SLA",
            "Model versioning",
        ],
        cta: "Start Trial",
        popular: false,
    },
    {
        name: "Business",
        price: "299",
        description: "For enterprises with high-volume needs",
        features: [
            "1000 compressions per month",
            "Unlimited everything",
            "Dedicated support",
            "SSO & audit logs",
            "Custom integrations",
            "Team features (unlimited)",
            "99.99% SLA",
            "On-premise option",
            "Custom training",
            "White-label option",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

export default function PricingCards() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { initiatePayment } = useRazorpay();
    const router = useRouter();

    const handleCheckout = async (tier: PricingTier) => {
        // 1. Session Guard: Check if user is logged in
        const { data: { session } } = await supabase.auth.getSession();

        if (!session && tier.price !== "0") {
            // Store target tier in cookie/localStorage to resume after login
            localStorage.setItem('pending_purchase', JSON.stringify(tier));
            router.push("/signup?callback=purchase");
            return;
        }

        if (tier.price === "0") {
            router.push("/signup");
            return;
        }

        if (tier.name === "Business") {
            router.push("/contact");
            return;
        }

        if (!session || !session.user) return;

        (initiatePayment as (config: {
            amount: number;
            currency: string;
            name: string;
            description: string;
            notes: {
                user_id: string;
                plan_name: string;
                credits_to_add: number;
            };
            handler: (response: { razorpay_payment_id: string }) => void;
            prefill: {
                email: string;
            };
        }) => void)({
            amount: parseInt(tier.price) * 100, // Amount in paise
            currency: "USD",
            name: "EdgeAI Platform",
            description: `${tier.name} Plan Subscription`,
            notes: {
                user_id: session.user.id,
                plan_name: tier.name,
                credits_to_add: tier.name === "Starter" ? 50 : tier.name === "Pro" ? 200 : 0
            },
            handler: (response: { razorpay_payment_id: string }) => {
                console.log("Payment Successful:", response);
                router.push("/dashboard?payment=success&ref=neural_sync");
            },
            prefill: {
                email: session.user.email || "operator@edgeai.sh"
            }
        });
    };

    return (
        <section id="pricing" className="py-24 px-4 bg-background relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-gradient">Simple Pricing</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Start free, scale as you grow. No hidden fees. Cancel anytime.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onHoverStart={() => setHoveredIndex(index)}
                            onHoverEnd={() => setHoveredIndex(null)}
                            className="relative"
                        >
                            {/* Thunder animation on hover */}
                            {hoveredIndex === index && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-0">
                                    <div className="w-1 h-32 bg-gradient-to-b from-transparent via-primary to-transparent animate-thunder" />
                                </div>
                            )}

                            {/* Popular badge */}
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                        <Zap className="h-3 w-3" />
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <div
                                className={`
                  glass rounded-2xl p-6 h-full flex flex-col relative
                  transition-all duration-300
                  ${tier.popular ? "border-primary/50 scale-105" : "border-border"}
                  ${hoveredIndex === index ? "border-primary glow-blue" : ""}
                `}
                            >
                                {/* Tier name */}
                                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    {tier.description}
                                </p>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-5xl font-bold text-gradient">
                                            ${tier.price}
                                        </span>
                                        <span className="text-muted-foreground">/month</span>
                                    </div>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {pricingTiers[index].features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2">
                                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-foreground/80">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button - aligned at bottom */}
                                <Button
                                    onClick={() => handleCheckout(tier)}
                                    className={`
                    w-full group
                    ${tier.popular
                                            ? "bg-primary hover:bg-primary/90 glow-blue"
                                            : "bg-secondary hover:bg-secondary/80"
                                        }
                  `}
                                >
                                    {tier.cta}
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <p className="text-muted-foreground">
                        All plans include 14-day free trial. No credit card required.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Need custom pricing? <a href="/contact" className="text-primary hover:underline">Contact us</a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
