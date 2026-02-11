import { onnx } from 'onnx-proto';
import { NeuralUtils } from './utils';

/**
 * ✂️ Neural Pruner (Real Binary Edition)
 * Handles structured channel-striking and sparsity injection.
 */
export class NeuralPruner {
    /**
     * Performs magnitude-based pruning on model initializers.
     */
    static async prune(originalBuffer: Uint8Array, ratio: number = 0.3) {
        try {
            const model = onnx.ModelProto.decode(originalBuffer);
            const graph = model.graph;

            if (!graph) throw new Error("Graph mismatch during pruning");

            let elementsPruned = 0;

            if (graph.initializer) {
                for (const initializer of graph.initializer) {
                    if (initializer.dataType === 1) { // FLOAT
                        const data = NeuralUtils.extractTensorData(initializer);
                        if (data.length === 0) continue;

                        // Identify magnitude threshold
                        const sortedMagnitudes = new Float32Array(data.length);
                        for (let i = 0; i < data.length; i++) {
                            sortedMagnitudes[i] = Math.abs(data[i]);
                        }
                        sortedMagnitudes.sort();

                        const thresholdIndex = Math.floor(data.length * ratio);
                        const threshold = sortedMagnitudes[thresholdIndex];

                        // Strike low-magnitude neurons
                        for (let i = 0; i < data.length; i++) {
                            if (Math.abs(data[i]) < threshold) {
                                data[i] = 0;
                                elementsPruned++;
                            }
                        }

                        // Update initializer (back to float32 storage for now)
                        initializer.floatData = Array.from(data);
                        initializer.rawData = null;
                    }
                }
            }

            const outputBuffer = onnx.ModelProto.encode(model).finish();

            return {
                sparsity: `${(ratio * 100).toFixed(1)}%`,
                elements_pruned: elementsPruned,
                buffer: outputBuffer
            };
        } catch (error) {
            console.error("Neural Pruning Trap:", error);
            throw error;
        }
    }
}
