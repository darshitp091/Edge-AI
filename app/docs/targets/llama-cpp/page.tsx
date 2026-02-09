"use client";

import DocsLayout from "@/components/docs-layout";
import { Terminal, Cpu, Box, Zap } from "lucide-react";

export default function LlamaCppPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "Export Targets" }, { name: "llama.cpp" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        LLM <span className="text-gradient">in C++</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Run massive Large Language Models on consumer-grade hardware with zero dependencies.
                    </p>
                </div>

                <div className="space-y-10">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-black italic text-white tracking-tight">The GGUF Standard</h2>
                        <p className="text-zinc-500 font-medium leading-relaxed">EdgeAI automatically converts Llama, Mistral, and Falcon models to optimized GGUF files with tiered quantization (Q4_0, Q5_K_M, Q8_0).</p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass p-1 rounded-[2.5rem] border-white/5">
                            <div className="p-8 space-y-4">
                                <h4 className="text-lg font-bold text-white italic">CPU Offloading</h4>
                                <p className="text-xs text-zinc-600 font-bold leading-relaxed">Perfect for devices without a dedicated GPU. GGUF allows for split execution between CPU and VRAM for maximum efficiency.</p>
                            </div>
                        </div>
                        <div className="glass p-1 rounded-[2.5rem] border-white/5">
                            <div className="p-8 space-y-4">
                                <h4 className="text-lg font-bold text-white italic">Apple Silicon (Metal)</h4>
                                <p className="text-xs text-zinc-600 font-bold leading-relaxed">Native Metal integration allows for 40+ tokens per second on basic M-series MacBooks.</p>
                            </div>
                        </div>
                    </div>

                    <section className="space-y-6">
                        <h2 className="text-3xl font-black italic text-white tracking-tight">Convert & Quantize</h2>
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-8 font-mono text-sm text-zinc-300">
                            edge-ai <span className="text-primary italic">export</span> --target <span className="text-yellow-500">gguf</span> --quant <span className="text-accent">Q4_K_M</span>
                        </div>
                    </section>

                    <div className="p-8 glass rounded-3xl border-primary/10 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Terminal className="h-6 w-6 text-primary" />
                            <span className="text-sm font-black italic uppercase tracking-widest">Self-contained Binary</span>
                        </div>
                        <Zap className="h-5 w-5 text-zinc-800" />
                    </div>
                </div>
            </div>
        </DocsLayout>
    );
}
