"use client";

import DocsLayout from "@/components/docs-layout";
import { Brain, Zap, Shrink, Layout } from "lucide-react";

export default function Compression101Page() {
    return (
        <DocsLayout breadcrumb={[{ name: "Getting Started", href: "/docs" }, { name: "Compression 101" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        Compression <span className="text-gradient">101</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Understand the fundamental physics of neural sharding and quantization.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6">
                        <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Shrink className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-black italic text-white">Why Compress?</h3>
                        <p className="text-zinc-500 leading-relaxed font-medium">Standard LLMs and Vision models are designed for data centers with 80GB VRAM. Edge devices like the Jetson Nano have 4GB. Compression is the bridge.</p>
                    </div>
                    <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6">
                        <div className="h-12 w-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                            <Zap className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="text-2xl font-black italic text-white">The Speed Factor</h3>
                        <p className="text-zinc-500 leading-relaxed font-medium">Compressed models don't just take less space; they run faster. By reducing the bit-width of weights, we parallelize computations 4x better.</p>
                    </div>
                </div>

                <section className="space-y-8">
                    <h2 className="text-3xl font-black italic text-white">Core Terminologies</h2>
                    <div className="space-y-6">
                        {[
                            { term: "Quantization", def: "Reducing the precision of weights (e.g., FP32 to INT8) to save memory." },
                            { term: "Pruning", def: "Removing redundant weight neurons that contribute minimally to accuracy." },
                            { term: "Distillation", def: "Training a small 'student' model to mimic a large 'teacher' model's behavior." },
                            { term: "Sharding", def: "Splitting a model across multiple hardware nodes for distributed edge inference." }
                        ].map((item) => (
                            <div key={item.term} className="flex flex-col md:flex-row gap-4 md:items-center p-6 glass rounded-2xl border-white/5">
                                <span className="text-primary font-black uppercase tracking-widest text-xs min-w-[120px]">{item.term}</span>
                                <p className="text-zinc-400 text-sm font-medium">{item.def}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="p-12 glass rounded-[4rem] border-primary/20 bg-primary/5 text-center space-y-6">
                    <Brain className="h-12 w-12 text-primary mx-auto animate-pulse" />
                    <h3 className="text-3xl font-black text-white italic">Ready to optimize?</h3>
                    <p className="text-zinc-500 max-w-lg mx-auto">Skip the theory and start with our INT8 quantization guide to see instant results.</p>
                </div>
            </div>
        </DocsLayout>
    );
}
