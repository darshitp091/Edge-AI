import { NeuralQuantizer } from './quantizer';
import { NeuralPruner } from './pruner';
import { CompressionResults } from '../schemas/neural';

/**
 * 🛰️ Global Neural Orchestrator
 * Coordinates the multi-stage compression pipeline.
 * Mirrors the 'ml/compressor.py' logic from the Python version.
 */
export class NeuralOrchestrator {
    static async runPipeline(
        fileSize: number,
        quantization: 'int8' | 'int4' | 'fp16',
        pruningRatio: number,
        hardware: string,
        jobId: string
    ): Promise<CompressionResults> {

        // 1. Quantization Phase
        const bits = quantization === 'int4' ? 4 : quantization === 'fp16' ? 16 : 8;
        const qMetrics = await NeuralQuantizer.quantize(fileSize, bits);

        // 2. Pruning Phase
        const pMetrics = await NeuralPruner.prune(pruningRatio, hardware);

        // 3. Logic Reconciliation (Synthesis)
        // Combine boosts from both quantization and pruning
        const totalBoost = (parseFloat(qMetrics.reduction_ratio) * parseFloat(pMetrics.latency_gain)).toFixed(1);

        return {
            status: 'success',
            optimization_method: qMetrics.method,
            reduction_ratio: qMetrics.reduction_ratio,
            latency_boost: `${totalBoost}x`,
            accuracy: qMetrics.accuracy,
            memory_efficiency: qMetrics.memory_reclaimed,
            hardware_node: hardware.toUpperCase(),
            job_id: jobId
        };
    }
}
