-- 1. Add subscription tracking columns to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS subscription_id TEXT,
ADD COLUMN IF NOT EXISTS billing_cycle_start TIMESTAMPTZ;

-- 2. Update increment_credits to handle subscription details
CREATE OR REPLACE FUNCTION public.sync_subscription_credits(
    user_id UUID, 
    amount INTEGER, 
    new_tier TEXT, 
    sub_id TEXT, 
    cycle_start TIMESTAMPTZ
)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET credits = amount, -- For subscriptions, we usually reset to the plan amount
      subscription_tier = new_tier,
      subscription_id = sub_id,
      billing_cycle_start = cycle_start,
      updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
