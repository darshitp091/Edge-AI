"use client";

import DocsLayout from "@/components/docs-layout";
import { Smartphone, Zap, Box, Activity } from "lucide-react";

export default function TFLitePage() {
    return (
        <DocsLayout breadcrumb={[{ name: "Export Targets" }, { name: "TFLite (Mobile)" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        TFLite <span className="text-gradient">Optimization</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        The gold standard for Android and cross-platform mobile deployments.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6 hover:border-primary/20 transition-all cursor-pointer group">
                        <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <Activity className="h-6 w-6 text-zinc-500 group-hover:text-primary transition-colors" />
                        </div>
                        <h3 className="text-2xl font-black italic text-white italic">XNNPACK Engine</h3>
                        <p className="text-zinc-500 leading-relaxed font-medium">Automatic CPU/GPU delegate handling for varying smartphone silicon.</p>
                    </div>
                    <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6 hover:border-accent/20 transition-all cursor-pointer group">
                        <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                            <Box className="h-6 w-6 text-zinc-500 group-hover:text-accent transition-colors" />
                        </div>
                        <h3 className="text-2xl font-black italic text-white italic">Flex Delegate</h3>
                        <p className="text-zinc-500 leading-relaxed font-medium">Support for complex ops that typically aren't supported in standard TFLite runtimes.</p>
                    </div>
                </div>

                <section className="space-y-8">
                    <h2 className="text-3xl font-black italic text-white tracking-tight">Export Command</h2>
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-8 font-mono text-sm text-zinc-300">
                        edge-ai <span className="text-primary italic">export</span> --target <span className="text-yellow-500">tflite</span> --optimize <span className="text-accent">latency</span>
                    </div>
                </section>

                <div className="flex gap-4 p-8 glass rounded-3xl border-primary/10 items-center justify-center">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Optimized for Android 11+ and iOS 14+</p>
                </div>
            </div>
        </DocsLayout>
    );
}
