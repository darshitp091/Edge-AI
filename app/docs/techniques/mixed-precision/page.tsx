"use client";

import DocsLayout from "@/components/docs-layout";
import { Zap, Cpu, Layers } from "lucide-react";

export default function MixedPrecisionPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "Compression Techniques" }, { name: "INT4 Mixed Precision" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        INT4 <span className="text-gradient">Mixed Precision</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Push the boundaries of sharding by mixing 4-bit and 8-bit precision across sensitive layers.
                    </p>
                </div>

                <section className="space-y-8">
                    <h2 className="text-3xl font-black italic text-white tracking-tight">Why Mixed Precision?</h2>
                    <p className="text-zinc-500 font-medium leading-relaxed">Not all layers are created equal. While some neural layers can be compressed to 4-bit without info loss, others (like attention heads in Transformers) require higher precision. Our optimizer automatically identifies these bottlenecks.</p>
                </section>

                <div className="space-y-6">
                    <div className="flex items-center gap-4 text-primary bg-primary/5 p-6 rounded-3xl border border-primary/10">
                        <Layers className="h-6 w-6" />
                        <div>
                            <p className="text-sm font-black uppercase tracking-[0.2em]">Layer-wise Optimization</p>
                            <p className="text-zinc-400 text-xs">Automatic sensitivity analysis across 1,000+ layers in real-time.</p>
                        </div>
                    </div>
                </div>

                <div className="glass p-1 rounded-[3rem] border-white/5 overflow-hidden">
                    <div className="p-10 space-y-6">
                        <h3 className="text-2xl font-black italic text-white italic">Compression Command</h3>
                        <p className="text-zinc-500">Enable mixed precision by specifying the auto-bit encoder.</p>
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-sm text-zinc-300">
                            edge-ai <span className="text-primary italic">compress</span> ./llama-2.pt --method <span className="text-accent">mixed-precision</span> --auto-bit
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass p-8 rounded-3xl border-white/5 space-y-4">
                        <h4 className="text-lg font-bold text-white italic underline underline-offset-8 decoration-primary">LLM Focus</h4>
                        <p className="text-zinc-500 text-sm">Perfect for Large Language Models where VRAM is the primary constraint. 7B parameter models can run on 6GB VRAM devices.</p>
                    </div>
                    <div className="glass p-8 rounded-3xl border-white/5 space-y-4">
                        <h4 className="text-lg font-bold text-white italic underline underline-offset-8 decoration-accent">Vision Pipelines</h4>
                        <p className="text-zinc-500 text-sm">Ideal for high-throughput video streams where 4-bit weights allow for massive batch parallelization.</p>
                    </div>
                </div>
            </div>
        </DocsLayout>
    );
}
