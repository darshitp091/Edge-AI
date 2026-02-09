"use client";

import DocsLayout from "@/components/docs-layout";
import { BarChart3, Activity, Zap, Cpu } from "lucide-react";

export default function ApiAnalyticsPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "API Reference" }, { name: "Streaming Analytics" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        Streaming <span className="text-gradient">Analytics</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Access raw telemetry and performance metrics from your edge fleet in real-time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6">
                        <BarChart3 className="h-8 w-8 text-primary" />
                        <h3 className="text-2xl font-black italic text-white italic">Inference Latency</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">Track P50, P99, and P99.9 latencies across different hardware clusters to identify hotspots.</p>
                    </div>
                    <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6">
                        <Cpu className="h-8 w-8 text-accent" />
                        <h3 className="text-2xl font-black italic text-white italic">VRAM Utilization</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">Monitor real-time memory pressure and shard swap frequency on target devices.</p>
                    </div>
                </div>

                <section className="space-y-6">
                    <h2 className="text-3xl font-black italic text-white tracking-tight italic">WebSocket Ingestion</h2>
                    <p className="text-zinc-500 font-medium">For lowest latency, we recommend using our WebSocket endpoint to stream live telemetry directly to your application dashboard.</p>
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-sm text-zinc-300">
                        wss://api.edge-ai.io/v1/telemetry/stream
                    </div>
                </section>

                <div className="flex gap-4 p-8 glass rounded-3xl border-primary/10 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Activity className="h-5 w-5 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Global Telemetry Hub</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-1 w-8 rounded-full bg-primary/20 animate-pulse" />
                        <div className="h-1 w-8 rounded-full bg-primary/40 animate-pulse delay-75" />
                        <div className="h-1 w-8 rounded-full bg-primary/60 animate-pulse delay-150" />
                    </div>
                </div>
            </div>
        </DocsLayout>
    );
}
