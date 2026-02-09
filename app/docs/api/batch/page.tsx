"use client";

import DocsLayout from "@/components/docs-layout";
import { Database, Zap, Layers, Rocket } from "lucide-react";

export default function ApiBatchPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "API Reference" }, { name: "Batch Processing" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        Batch <span className="text-gradient">Processing</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Scale your neural distribution by processing hundreds of models in parallel across our global sharding nodes.
                    </p>
                </div>

                <div className="space-y-10">
                    <section className="space-y-8">
                        <div className="flex items-center gap-4">
                            <Database className="h-8 w-8 text-primary" />
                            <h2 className="text-3xl font-black italic text-white tracking-tight">Large-scale Ingestion</h2>
                        </div>
                        <p className="text-zinc-500 font-medium leading-relaxed">The Batch API is designed for enterprise users who need to maintain versioned versions of their entire model zoo across multiple hardware targets (Jetson, mobile, and Intel compute).</p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Parallel Sharding", desc: "Process up to 100 models simultaneously per organization." },
                            { title: "Target Matrix", desc: "Auto-export one model to all 5+ supported targets in a single call." },
                            { title: "Resilient S3 Storage", desc: "Direct-to-bucket uploads with zero-knowledge encryption." },
                            { title: "Webhooks", desc: "Fire event notifications to your CI/CD when a batch is ready." }
                        ].map((item, i) => (
                            <div key={i} className="glass p-8 rounded-3xl border-white/5 space-y-2">
                                <h4 className="text-lg font-bold text-white italic italic">{item.title}</h4>
                                <p className="text-xs text-zinc-600 font-bold leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <section className="space-y-6">
                        <h2 className="text-3xl font-black italic text-white tracking-tight italic text-primary">JSON Payload Example</h2>
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-8 font-mono text-sm text-zinc-300">
                            <pre>
                                {`{
  "batch_name": "llama-v3-release",
  "targets": ["tensorrt", "coreml", "tflite"],
  "models": [ ... ],
  "callback_url": "https://hooks.ai.com/edge"
}`}
                            </pre>
                        </div>
                    </section>
                </div>
            </div>
        </DocsLayout>
    );
}
