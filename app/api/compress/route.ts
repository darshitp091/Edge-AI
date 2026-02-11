import { NextRequest, NextResponse } from 'next/server';
import { NeuralOrchestrator } from '@/lib/ml/orchestrator';
import { updateJobStatus, registerOptimizedModel, supabaseAdmin } from '@/lib/supabase-admin';
import { CompressionRequestSchema } from '@/lib/schemas/neural';
import crypto from 'crypto';
import { writeFile } from 'fs/promises';
import path from 'path';

/**
 * 🚀 Neural Compression API (Real Binary Hardware Handshake)
 * This route is the entry point for actual sharding and quantization protocols.
 */
export async function POST(req: NextRequest) {
    const jobId = crypto.randomUUID();
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        // 1. Strict Technical Validation (Zod)
        const parseResult = CompressionRequestSchema.safeParse({
            quantization: formData.get('quantization'),
            pruning_ratio: formData.get('pruning_ratio') ? parseFloat(formData.get('pruning_ratio') as string) : 0.3,
            target_hardware: formData.get('hardware'),
            user_id: formData.get('user_id'),
            model_id: formData.get('model_id'),
        });

        if (!parseResult.success) {
            return NextResponse.json({
                error: 'Invalid Neural Configuration',
                details: parseResult.error.format()
            }, { status: 400 });
        }

        const config = parseResult.data;

        if (!file) {
            return NextResponse.json({ error: 'No neural artifact detected' }, { status: 400 });
        }

        // 2. Initial Job Pulse (Supabase)
        await updateJobStatus(jobId, 'initializing', 10);

        // 3. Binary Handshake (Conversion to Uint8Array)
        const arrayBuffer = await file.arrayBuffer();
        const modelBuffer = new Uint8Array(arrayBuffer);

        await updateJobStatus(jobId, 'processing', 40);

        // 4. Neural Pipeline Execution (Real Binary Engine)
        const results = await NeuralOrchestrator.runPipeline(
            modelBuffer,
            config.quantization as 'int8' | 'int4' | 'fp16',
            config.pruning_ratio,
            config.target_hardware,
            jobId
        );

        // 5. Persistence (Save optimized binary to disk)
        // Note: In production, this would be pushed to R2/S3
        const optimizedFilename = `${jobId}_opt_${file.name.replace(/\s+/g, '_')}`;
        const outputDir = path.join(process.cwd(), 'public', 'optimized');
        const outputPath = path.join(outputDir, optimizedFilename);

        await writeFile(outputPath, results.buffer);

        // 6. DB Registry & Metric Sync
        if (config.model_id) {
            await registerOptimizedModel(
                config.model_id,
                `/optimized/${optimizedFilename}`,
                results.buffer.length
            );
        }

        if (supabaseAdmin) {
            await supabaseAdmin.from('metrics').insert({
                job_id: null,
                optimized_latency: parseFloat(results.latency_boost),
                efficiency_score: 95
            });
        }

        // 7. Final Dispatch
        await updateJobStatus(jobId, 'completed', 100);

        // Remove buffer from results before sending to client to keep response small
        const { buffer, ...responseMetrics } = results;

        return NextResponse.json(responseMetrics);

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Internal Neural Handshake Failure';
        console.error("Neural Route Error:", error);
        await updateJobStatus(jobId, 'failed', 0, errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
