"use client";

import DocsLayout from "@/components/docs-layout";
import { Zap, Activity, Info, BarChart3 } from "lucide-react";

export default function QuantizationPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "Compression Techniques" }, { name: "INT8 Quantization" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        INT8 <span className="text-gradient">Quantization</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Convert FP32 weights to 8-bit integers without sacrificing perceptual accuracy.
                    </p>
                </div>

                <section className="space-y-6">
                    <h2 className="text-3xl font-black italic text-white tracking-tight">Overview</h2>
                    <p className="text-zinc-500 font-medium">Standard neural networks use FP32 (32-bit floating point) for weights and activations. INT8 quantization reduces this to 8-bit integers, providing a 4x reduction in model size and significant speedup on hardware with INT8 tensor cores.</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass p-8 rounded-3xl border-white/5 space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <Zap className="h-5 w-5" />
                            <h4 className="font-bold uppercase tracking-widest text-xs">Performance Boost</h4>
                        </div>
                        <p className="text-2xl font-black text-white italic">4.2x Faster Inference</p>
                        <p className="text-zinc-500 text-sm">On specialized hardware like NVIDIA Jetson (TensorRT) or Apple M2 (CoreML).</p>
                    </div>
                    <div className="glass p-8 rounded-3xl border-white/5 space-y-4">
                        <div className="flex items-center gap-3 text-accent">
                            <Activity className="h-5 w-5" />
                            <h4 className="font-bold uppercase tracking-widest text-xs">Accuracy Retention</h4>
                        </div>
                        <p className="text-2xl font-black text-white italic">99.8% Core Parity</p>
                        <p className="text-zinc-500 text-sm">Maintains near-original accuracy through our advanced calibration algorithms.</p>
                    </div>
                </div>

                <section className="space-y-6">
                    <h2 className="text-3xl font-black italic text-white tracking-tight">How to use</h2>
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-sm text-zinc-300">
                        edge-ai <span className="text-primary italic">compress</span> ./model.onnx --method <span className="text-yellow-500">int8</span>
                    </div>
                </section>

                <div className="glass p-8 rounded-3xl border-white/5 bg-white/[0.02]">
                    <div className="flex gap-4 items-start">
                        <Info className="h-6 w-6 text-zinc-600 mt-1" />
                        <div className="space-y-2">
                            <h5 className="font-bold text-white">Calibration Datasets</h5>
                            <p className="text-zinc-500 text-sm leading-relaxed">For the best results, provide a representative sample of your input data (100-500 images or text samples) to help the optimizer calculate optimal clamping ranges.</p>
                        </div>
                    </div>
                </div>
            </div>
        </DocsLayout>
    );
}
