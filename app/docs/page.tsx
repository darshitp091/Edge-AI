"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import {
    Book,
    Terminal,
    Code2,
    Search,
    Hash,
    ChevronRight,
    Zap,
    Box,
    Cpu
} from "lucide-react";

const navItems = [
    { group: "Getting Started", items: ["Quick Start", "Installation", "Model Upload Guide", "Compression 101"] },
    { group: "Compression Techniques", items: ["INT8 Quantization", "INT4 Mixed Precision", "Channel Pruning", "Knowledge Distillation"] },
    { group: "Export Targets", items: ["TensorRT (NVIDIA)", "OpenVINO (Intel)", "CoreML (Apple)", "TFLite (Mobile)", "llama.cpp"] },
    { group: "API Reference", items: ["Authentication", "Job Management", "Streaming Analytics", "Batch Processing"] },
];

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 flex gap-12">
                    {/* Docs Sidebar */}
                    <aside className="w-64 hidden xl:block sticky top-32 h-[calc(100vh-160px)] overflow-y-auto pr-4 scrollbar-hide">
                        <div className="space-y-8">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <input
                                    placeholder="Search docs..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs font-bold focus:border-primary transition-all"
                                />
                            </div>
                            {navItems.map((group) => (
                                <div key={group.group} className="space-y-3">
                                    <h3 className="text-[10px] uppercase font-black text-primary tracking-[0.2em]">{group.group}</h3>
                                    <ul className="space-y-1">
                                        {group.items.map((item) => (
                                            <li key={item}>
                                                <a href="#" className="text-xs font-bold text-zinc-500 hover:text-white flex items-center gap-2 group py-1.5 transition-colors">
                                                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary" />
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-grow max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-12"
                        >
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                <span>Documentation</span>
                                <ChevronRight className="h-3 w-3" />
                                <span className="text-primary italic">Quick Start</span>
                            </div>

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

                            {/* Pagination */}
                            <div className="pt-12 border-t border-white/5 flex justify-between items-center">
                                <div />
                                <a href="#" className="glass px-8 py-4 rounded-full border-primary/20 text-white font-bold flex items-center gap-3 hover:bg-primary transition-all group">
                                    Next: Installation
                                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-all" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
