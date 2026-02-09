import { createClient } from '@supabase/supabase-js';

// 🔐 Supabase Admin Client
// This client uses the SERVICE_ROLE_KEY to bypass RLS.
// ONLY for use in Server Components or API Routes.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("⚠️ Supabase Admin Credentials Missing. Backend synchronization will fail.");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

/**
 * Updates compression job status in the database.
 */
export async function updateJobStatus(jobId: string, status: string, progress: number, error?: string) {
    const { error: dbError } = await supabaseAdmin
        .from('jobs')
        .update({
            status,
            progress,
            updated_at: new Date().toISOString(),
            ...(error && { error_log: error })
        })
        .eq('id', jobId);

    if (dbError) console.error(`❌ Failed to update job ${jobId}:`, dbError.message);
}

/**
 * Registers optimized model metadata.
 */
export async function registerOptimizedModel(modelId: string, storagePath: string, size: number) {
    const { error: dbError } = await supabaseAdmin
        .from('models')
        .update({
            optimized_size: size,
            storage_path: storagePath,
            is_encrypted: true
        })
        .eq('id', modelId);

    if (dbError) console.error(`❌ Failed to register model ${modelId}:`, dbError.message);
}
