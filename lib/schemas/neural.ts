import { z } from 'zod';

/**
 * 🛡️ Neural Core Contract
 * Validates every inbound sharding request
 */
export const CompressionRequestSchema = z.object({
    quantization: z.enum(['int8', 'int4', 'fp16']).default('int8'),
    pruning_ratio: z.number().min(0).max(0.99).default(0.3),
    target_hardware: z.enum(['jetson', 'mobile', 'iot', 'generic', 'server']).default('generic'),
    user_id: z.string().uuid().optional(),
    model_id: z.string().uuid().optional(),
});

export type CompressionRequest = z.infer<typeof CompressionRequestSchema>;

export const CompressionResultsSchema = z.object({
    status: z.literal('success'),
    optimization_method: z.string(),
    reduction_ratio: z.string(),
    latency_boost: z.string(),
    accuracy: z.string(),
    memory_efficiency: z.string(),
    hardware_node: z.string(),
    job_id: z.string().uuid(),
});

export type CompressionResults = z.infer<typeof CompressionResultsSchema>;
