-- Phase 26: API Key & Credit Display Hardening
-- Renaming api_key_hash to api_key and updating defaults/triggers

-- 1. Rename column if it exists as api_key_hash
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'api_key_hash') THEN
    ALTER TABLE public.profiles RENAME COLUMN api_key_hash TO api_key;
  END IF;
END $$;

-- 2. Update default credits to 5
ALTER TABLE public.profiles ALTER COLUMN credits SET DEFAULT 5;

-- 3. Update the handle_new_user trigger to generate keys automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  initial_api_key TEXT;
BEGIN
  -- Generate a secure initial API key
  -- Pattern: edge_ai_u_{16_char_random}
  initial_api_key := 'edge_ai_u_' || encode(gen_random_bytes(8), 'hex');

  INSERT INTO public.profiles (id, full_name, avatar_url, credits, subscription_tier, api_key)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    5, -- Starting credits
    'free',
    initial_api_key
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. One-time fix for existing users on Free tier to align with UI (5 credits)
UPDATE public.profiles 
SET credits = 5 
WHERE subscription_tier = 'free' AND credits > 5;
