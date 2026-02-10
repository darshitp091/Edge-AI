"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export type PlanTier = 'free' | 'pro' | 'enterprise';

export interface PlanFeatures {
    maxCredits: number;
    canUseInt4: boolean;
    canUseMixedPrecision: boolean;
    canUsePruning: boolean;
    canUseDistillation: boolean;
    priorityProcessing: boolean;
    apiBatching: boolean;
}

const PLAN_CONFIGS: Record<PlanTier, PlanFeatures> = {
    free: {
        maxCredits: 100,
        canUseInt4: false,
        canUseMixedPrecision: false,
        canUsePruning: false,
        canUseDistillation: false,
        priorityProcessing: false,
        apiBatching: false,
    },
    pro: {
        maxCredits: 1000,
        canUseInt4: true,
        canUseMixedPrecision: true,
        canUsePruning: true,
        canUseDistillation: false,
        priorityProcessing: true,
        apiBatching: false,
    },
    enterprise: {
        maxCredits: 10000,
        canUseInt4: true,
        canUseMixedPrecision: true,
        canUsePruning: true,
        canUseDistillation: true,
        priorityProcessing: true,
        apiBatching: true,
    },
};

export function usePlan() {
    const [tier, setTier] = useState<PlanTier>('free');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAndSyncPlan = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('subscription_tier, credits, billing_cycle_start')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    setTier(profile.subscription_tier as PlanTier);

                    // --- Dynamic Credit Reset Logic ---
                    if (profile.billing_cycle_start) {
                        const lastReset = new Date(profile.billing_cycle_start);
                        const now = new Date();
                        const nextReset = new Date(lastReset);
                        nextReset.setMonth(nextReset.getMonth() + 1);

                        if (now >= nextReset) {
                            console.log("📅 Billing Cycle Detected: Resetting Neural Credits...");
                            const config = PLAN_CONFIGS[profile.subscription_tier as PlanTier];

                            // Perform atomic reset
                            await supabase.from('profiles').update({
                                credits: config.maxCredits,
                                billing_cycle_start: now.toISOString(), // Start new cycle
                                updated_at: now.toISOString()
                            }).eq('id', user.id);
                        }
                    }
                }
            }
            setLoading(false);
        };

        fetchAndSyncPlan();
    }, []);

    return {
        tier,
        features: PLAN_CONFIGS[tier],
        loading,
        isPro: tier === 'pro' || tier === 'enterprise',
        isEnterprise: tier === 'enterprise'
    };
}
