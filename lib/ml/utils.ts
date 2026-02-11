import { onnx } from 'onnx-proto';

/**
 * 🛠️ Neural Core Utilities
 */
export class NeuralUtils {
    /**
     * Extracts Float32 data from an ONNX TensorProto.
     */
    static extractTensorData(tensor: onnx.ITensorProto): Float32Array {
        if (tensor.floatData && tensor.floatData.length > 0) {
            return new Float32Array(tensor.floatData);
        }
        if (tensor.rawData && tensor.rawData.length > 0) {
            return new Float32Array(
                tensor.rawData.buffer,
                tensor.rawData.byteOffset,
                tensor.rawData.byteLength / 4
            );
        }
        return new Float32Array(0);
    }
}
