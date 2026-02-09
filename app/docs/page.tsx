"use client";

import DocsLayout from "@/components/docs-layout";
import { Terminal, Box, Cpu, Code2, Zap, ChevronRight } from "lucide-react";

export default function DocsPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "Quick Start" }]}>
            <div className="space-y-12">
                {/* Hero */}
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        Quick <span className="text-gradient">Start Guide</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Learn how to compress AI models from Gigabytes to Megabytes in less than 60 seconds using the EdgeAI Neural Core.
                    </p>
                </div>

                {/* Install Code Block */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Terminal className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Installation</h3>
                    </div>
                    <div className="glass rounded-[2rem] p-1 border-primary/20 bg-[#0a0a0b]">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                                <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
                            </div>
                            <span className="text-[10px] font-black text-zinc-600 tracking-widest uppercase">bash</span>
                        </div>
                        <div className="p-8 font-mono text-sm leading-7">
                            <div className="flex gap-4">
                                <span className="text-zinc-700 select-none">1</span>
                                <p className="text-zinc-300">pip install <span className="text-primary italic">edge-ai-sdk</span></p>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-zinc-700 select-none">2</span>
                                <p className="text-zinc-300">edge-ai <span className="text-yellow-500">auth</span> --login</p>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-zinc-700 select-none">3</span>
                                <p className="text-zinc-300">edge-ai <span className="text-green-500">compress</span> ./my_model.pt --target <span className="text-blue-500">jetson</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Documentation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { icon: Box, title: "Model Uploads", text: "Learn supported formats including PyTorch, ONNX, and TF SavedModel." },
                        { icon: Cpu, title: "Hardware Profiles", text: "Configure custom benchmarks for Jetson, Pi, and mobile NPUs." },
                        { icon: Code2, title: "Custom Plugins", text: "Extend the compression pipeline with your custom C++ kernels." },
                        { icon: Zap, title: "Edge Deployment", text: "One-click export to TensorRT engines or TFLite flatbuffers." }
                    ].map((card, i) => (
                        <div key={card.title} className="p-8 glass rounded-[2.5rem] border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                            <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                <card.icon className="h-6 w-6 text-zinc-500 group-hover:text-primary transition-colors" />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">{card.title}</h4>
                            <p className="text-zinc-500 text-sm leading-relaxed">{card.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </DocsLayout>
    );
}
