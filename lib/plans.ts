export type PlanTier = 'free' | 'starter' | 'pro' | 'business';

export interface PlanFeatures {
    maxCredits: number;
    canUseInt4: boolean;
    canUseMixedPrecision: boolean;
    canUsePruning: boolean;
    canUseDistillation: boolean;
    priorityProcessing: boolean;
    apiBatching: boolean;
    sdkAccess: boolean;
    customHardware: boolean;
    teamFeatures: boolean;
    maxModelSize: string; // e.g., '100MB', '500MB', 'Unlimited'
}

export const PLAN_CONFIGS: Record<PlanTier, PlanFeatures> = {
    free: {
        maxCredits: 5,
        canUseInt4: false,
        canUseMixedPrecision: false,
        canUsePruning: true,
        canUseDistillation: false,
        priorityProcessing: false,
        apiBatching: false,
        sdkAccess: false,
        customHardware: false,
        teamFeatures: false,
        maxModelSize: '100MB',
    },
    starter: {
        maxCredits: 50,
        canUseInt4: true,
        canUseMixedPrecision: true,
        canUsePruning: true,
        canUseDistillation: false,
        priorityProcessing: true,
        apiBatching: true,
        sdkAccess: false,
        customHardware: false,
        teamFeatures: false,
        maxModelSize: '500MB',
    },
    pro: {
        maxCredits: 200,
        canUseInt4: true,
        canUseMixedPrecision: true,
        canUsePruning: true,
        canUseDistillation: true,
        priorityProcessing: true,
        apiBatching: true,
        sdkAccess: true,
        customHardware: true,
        teamFeatures: true,
        maxModelSize: 'Unlimited',
    },
    business: {
        maxCredits: 1000,
        canUseInt4: true,
        canUseMixedPrecision: true,
        canUsePruning: true,
        canUseDistillation: true,
        priorityProcessing: true,
        apiBatching: true,
        sdkAccess: true,
        customHardware: true,
        teamFeatures: true,
        maxModelSize: 'Unlimited',
    },
};
