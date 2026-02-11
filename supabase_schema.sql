-- EDGE AI PLATFORM: CORE SCHEMA
-- High-Security Persistence Layer

-- 1. Profiles: User specific settings and credits
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    credits INTEGER DEFAULT 5,
    subscription_tier TEXT DEFAULT 'free',
    api_key TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Models: Metadata for uploaded neural artifacts
CREATE TABLE IF NOT EXISTS public.models (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    original_size BIGINT, -- in bytes
    optimized_size BIGINT,
    format TEXT, -- e.g., 'onnx', 'pth', 'tflite'
    sha256_hash TEXT, -- For integrity proof
    storage_path TEXT, -- Path in S3/R2
    is_encrypted BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Jobs: Tracking compression pipeline status
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    model_id UUID REFERENCES public.models ON DELETE CASCADE,
    status TEXT DEFAULT 'queued', -- queued, processing, completed, failed
    config JSONB, -- storing quantization/pruning settings
    progress INTEGER DEFAULT 0,
    error_log TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Metrics: Post-optimization performance data
CREATE TABLE IF NOT EXISTS public.metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES public.jobs ON DELETE CASCADE,
    original_latency FLOAT, -- ms
    optimized_latency FLOAT, -- ms
    memory_original FLOAT, -- mb
    memory_optimized FLOAT, -- mb
    efficiency_score FLOAT, -- calculated 0-100
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only see their own data
-- We use DROP IF EXISTS to ensure idempotency when re-running the script
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can view own models" ON public.models;
CREATE POLICY "Users can view own models" ON public.models FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own models" ON public.models;
CREATE POLICY "Users can insert own models" ON public.models FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own models" ON public.models;
CREATE POLICY "Users can delete own models" ON public.models FOR DELETE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own jobs" ON public.jobs;
CREATE POLICY "Users can view own jobs" ON public.jobs FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view metrics for own jobs" ON public.metrics;
CREATE POLICY "Users can view metrics for own jobs" ON public.metrics FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.jobs WHERE jobs.id = metrics.job_id AND jobs.user_id = auth.uid()));

-- 5. AUTOMATED TRIGGER: Handle profile creation on signup
-- This ensures every user gets a profile entry automatically
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, credits, subscription_tier)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    5, -- Starting credits
    'free'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: Run handle_new_user() whenever a user joins
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. RPC FUNCTION: Increment credits (Atomic update)
CREATE OR REPLACE FUNCTION public.increment_credits(user_id UUID, amount INTEGER, new_tier TEXT)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET credits = credits + amount,
      subscription_tier = new_tier,
      updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
