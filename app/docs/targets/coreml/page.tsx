"use client";

import DocsLayout from "@/components/docs-layout";
import { Tablet, Smartphone, Laptop, Zap, Globe } from "lucide-react";

export default function CoreMLPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "Export Targets" }, { name: "CoreML (Apple)" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        CoreML <span className="text-gradient">for Apple</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Unleash the Neural Engine on iPhone, iPad, Mac, and Apple Watch with zero-latency inference.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass p-8 rounded-[3rem] border-white/5 space-y-4 flex flex-col items-center text-center">
                        <Smartphone className="h-8 w-8 text-primary" />
                        <h4 className="text-xl font-bold text-white italic italic">iOS / iPadOS</h4>
                        <p className="text-xs text-zinc-500 font-medium">Real-time AR and vision processing with 0% CPU impact.</p>
                    </div>
                    <div className="glass p-8 rounded-[3rem] border-white/5 space-y-4 flex flex-col items-center text-center">
                        <Laptop className="h-8 w-8 text-accent" />
                        <h4 className="text-xl font-bold text-white italic italic">macOS (Metal)</h4>
                        <p className="text-xs text-zinc-500 font-medium">Leverage Metal Performance Shaders for desktop-grade AI.</p>
                    </div>
                    <div className="glass p-8 rounded-[3rem] border-white/5 space-y-4 flex flex-col items-center text-center">
                        <Zap className="h-8 w-8 text-yellow-500" />
                        <h4 className="text-xl font-bold text-white italic italic">ANE</h4>
                        <p className="text-xs text-zinc-500 font-medium">Full compatibility with Apple Neural Engine cores.</p>
                    </div>
                </div>

                <section className="space-y-6">
                    <h2 className="text-3xl font-black italic text-white tracking-tight">Direct Export</h2>
                    <p className="text-zinc-500">The EdgeAI pipeline converts PyTorch/ONNX models directly to .mlpackage format.</p>
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-sm text-zinc-300">
                        edge-ai <span className="text-primary italic">export</span> --target <span className="text-blue-500">coreml</span> --ios-version <span className="text-yellow-500">17.0</span>
                    </div>
                </section>

                <div className="glass p-10 rounded-[4rem] border-white/5 bg-primary/5 space-y-6">
                    <h3 className="text-2xl font-black italic text-white italic">Hardware Acceleration</h3>
                    <div className="space-y-4">
                        {[
                            { title: "Dynamic Shapes", desc: "Full support for variable input sizes without engine re-compilation." },
                            { title: "Memory Mapping", desc: "Zero-copy weight loading from disk to unified memory." }
                        ].map((i) => (
                            <div key={i.title} className="flex gap-4">
                                <Globe className="h-5 w-5 text-primary" />
                                <p className="text-sm"><span className="text-white font-bold">{i.title}:</span> <span className="text-zinc-500">{i.desc}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DocsLayout>
    );
}
