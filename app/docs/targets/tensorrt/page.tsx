"use client";

import DocsLayout from "@/components/docs-layout";
import { Cpu, Zap, Box, Globe } from "lucide-react";

export default function TensorRTPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "Export Targets" }, { name: "TensorRT (NVIDIA)" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        TensorRT <span className="text-gradient">Optimization</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Master high-throughput inference on NVIDIA GPUs using specialized CUDA kernels.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6">
                        <div className="h-12 w-12 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20">
                            <Zap className="h-6 w-6 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-black italic text-white italic">FP16/INT8 Kernels</h3>
                        <p className="text-zinc-500 leading-relaxed font-medium">Automatic layer fusion and kernel auto-tuning for Ampere, Lovelace, and Hopper architectures.</p>
                    </div>
                    <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6">
                        <div className="h-12 w-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                            <Globe className="h-6 w-6 text-blue-500" />
                        </div>
                        <h3 className="text-2xl font-black italic text-white italic">Multi-GPU Sharding</h3>
                        <p className="text-zinc-500 leading-relaxed font-medium">Deploy across A100/H100 clusters with balanced neural sharding across NVLink.</p>
                    </div>
                </div>

                <section className="space-y-8">
                    <h2 className="text-3xl font-black italic text-white">Target Parameters</h2>
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-8 font-mono text-sm text-zinc-300 space-y-4">
                        <p className="text-zinc-500"># Export for NVIDIA Orin (Jetson)</p>
                        <p>edge-ai <span className="text-primary italic">export</span> --target <span className="text-yellow-500">tensorrt</span> --gpu <span className="text-blue-500">orin</span> --precision <span className="text-accent">int8</span></p>
                    </div>
                </section>

                <div className="glass p-8 rounded-3xl border-white/5 bg-white/[0.02] flex gap-6 items-center">
                    <Box className="h-10 w-10 text-zinc-700" />
                    <div>
                        <h4 className="font-bold text-white italic mb-1">TRT Engine Serialization</h4>
                        <p className="text-xs text-zinc-500">Our engine automatically handles serialization to .plan files optimized for the specific GPU UUID detected during export.</p>
                    </div>
                </div>
            </div>
        </DocsLayout>
    );
}
