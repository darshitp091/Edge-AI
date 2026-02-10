"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { PlanTier, PlanFeatures, PLAN_CONFIGS } from '@/lib/plans';

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
                    setTier((profile.subscription_tier?.toLowerCase() || 'free') as PlanTier);

                    // --- Dynamic Credit Reset Logic ---
                    if (profile.billing_cycle_start) {
                        const lastReset = new Date(profile.billing_cycle_start);
                        const now = new Date();
                        const nextReset = new Date(lastReset);
                        nextReset.setMonth(nextReset.getMonth() + 1);

                        if (now >= nextReset) {
                            console.log("📅 Billing Cycle Detected: Resetting Neural Credits...");
                            const config = PLAN_CONFIGS[(profile.subscription_tier?.toLowerCase() || 'free') as PlanTier];

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
        isPro: tier === 'pro' || tier === 'business' || tier === 'starter',
        isEnterprise: tier === 'business'
    };
}
