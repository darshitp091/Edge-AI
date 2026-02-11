import { NextRequest, NextResponse } from 'next/server';
import { NeuralOrchestrator } from '@/lib/ml/orchestrator';
import { updateJobStatus, registerOptimizedModel, supabaseAdmin } from '@/lib/supabase-admin';
import crypto from 'crypto';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

/**
 * 🤗 Hugging Face Model Ingestion API
 * Downloads a model from HF Hub and pipes it into the Neural Core.
 */
export async function POST(req: NextRequest) {
    const jobId = crypto.randomUUID();
    const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;

    try {
        const { repoId, filename, quantization, pruningRatio, hardware, modelId, userId } = await req.json();

        if (!repoId || !filename) {
            return NextResponse.json({ error: 'Missing repository ID or filename' }, { status: 400 });
        }

        // 1. Initial Job Pulse
        await updateJobStatus(jobId, 'ingesting_from_hf', 5);

        // 2. Resolve HF Download URL
        // Pattern: https://huggingface.co/{repo_id}/resolve/main/{filename}
        const downloadUrl = `https://huggingface.co/${repoId}/resolve/main/${filename}`;

        console.log(`🤗 Ingesting: ${downloadUrl}`);

        // 3. Streaming Download from HF
        const hfResponse = await fetch(downloadUrl, {
            headers: HF_TOKEN ? { 'Authorization': `Bearer ${HF_TOKEN}` } : {}
        });

        if (!hfResponse.ok) {
            throw new Error(`HF Hub Error (${hfResponse.status}): ${hfResponse.statusText}`);
        }

        const arrayBuffer = await hfResponse.arrayBuffer();
        const modelBuffer = new Uint8Array(arrayBuffer);

        await updateJobStatus(jobId, 'processing', 30);

        // 4. Neural Pipeline Execution (Real Binary Engine)
        const results = await NeuralOrchestrator.runPipeline(
            modelBuffer,
            quantization || 'int8',
            pruningRatio || 0.3,
            hardware || 'generic',
            jobId
        );

        // 5. Persistence
        const optimizedFilename = `${jobId}_hf_opt_${filename.replace(/\//g, '_')}`;
        const outputDir = path.join(process.cwd(), 'public', 'optimized');

        // Ensure directory exists
        await mkdir(outputDir, { recursive: true });
        const outputPath = path.join(outputDir, optimizedFilename);

        await writeFile(outputPath, results.buffer);

        // 6. DB Registry & Metric Sync
        if (modelId) {
            await registerOptimizedModel(
                modelId,
                `/optimized/${optimizedFilename}`,
                results.buffer.length
            );
        }

        if (supabaseAdmin) {
            await supabaseAdmin.from('metrics').insert({
                job_id: null,
                optimized_latency: parseFloat(results.latency_boost),
                efficiency_score: 98
            });
        }

        // 7. Final Dispatch
        await updateJobStatus(jobId, 'completed', 100);

        const { buffer, ...responseMetrics } = results;
        return NextResponse.json({
            ...responseMetrics,
            source: 'huggingface',
            repo: repoId
        });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Neural Ingestion Failure';
        console.error("HF Ingestion Error:", error);
        await updateJobStatus(jobId, 'failed', 0, errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
