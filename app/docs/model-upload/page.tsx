"use client";

import DocsLayout from "@/components/docs-layout";
import { UploadCloud, FileType, ShieldCheck, Zap } from "lucide-react";

export default function ModelUploadGuide() {
    return (
        <DocsLayout breadcrumb={[{ name: "Getting Started", href: "/docs" }, { name: "Model Upload Guide" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        Model <span className="text-gradient">Upload Guide</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        EdgeAI supports a wide array of neural architectures. Learn how to prepare your weights for the sharding engine.
                    </p>
                </div>

                <div className="space-y-12">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-black italic text-white tracking-tight">Supported Frameworks</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {["PyTorch (.pt, .pth)", "ONNX (.onnx)", "TensorFlow (pb)", "Keras (.h5)"].map((f) => (
                                <div key={f} className="glass p-4 rounded-2xl border-white/5 text-[10px] font-black uppercase tracking-widest text-center text-zinc-400">
                                    {f}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-8">
                        <div className="flex items-center gap-4">
                            <UploadCloud className="h-6 w-6 text-primary" />
                            <h2 className="text-3xl font-black italic text-white tracking-tight">Ingestion Protocol</h2>
                        </div>

                        <div className="space-y-6">
                            {[
                                { title: "Neural Integrity Check", desc: "The SDK performs a local SHA-256 hash to ensure no data corruption during transmission." },
                                { title: "Format Normalization", desc: "Models are automatically converted to a high-performance internal representation for sharding." },
                                { title: "Architecture Mapping", desc: "We map layer operations to optimized hardware kernels for your specific edge target." }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <span className="text-4xl font-black text-zinc-800 group-hover:text-primary transition-colors italic">0{i + 1}</span>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-bold text-white italic">{step.title}</h4>
                                        <p className="text-zinc-500 font-medium">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8">
                            <FileType className="h-16 w-16 text-primary/10" />
                        </div>
                        <h3 className="text-2xl font-bold text-white italic">CLI Upload Example</h3>
                        <p className="text-zinc-400">The fastest way to upload is via the terminal. Large models are automatically sharded into 50MB chunks for resilient streaming.</p>
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-sm text-zinc-300">
                            edge-ai <span className="text-primary italic">upload</span> ./massive_resnet.onnx
                        </div>
                    </div>
                </div>
            </div>
        </DocsLayout>
    );
}
