"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import {
    Activity,
    CheckCircle2,
    AlertCircle,
    Clock,
    ShieldCheck,
    Globe
} from "lucide-react";

const systems = [
    { name: "Neural Compression Engine", status: "operational", latency: "14ms" },
    { name: "Quantization Protocol (INT8)", status: "operational", latency: "8ms" },
    { name: "Quantization Protocol (INT4)", status: "operational", latency: "12ms" },
    { name: "Model Sharding Orchestrator", status: "operational", latency: "22ms" },
    { name: "Streaming Analytics Pipeline", status: "degraded", latency: "450ms" },
    { name: "Global Edge Hub", status: "operational", latency: "3ms" },
];

export default function StatusPage() {
    return (
        <div className="min-h-screen bg-background text-white">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-16">
                        {/* Status Header */}
                        <div className="glass p-12 rounded-[4rem] border-white/5 text-center space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-green-500 to-primary animate-pulse" />
                            <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto ring-8 ring-green-500/5">
                                <CheckCircle2 className="h-10 w-10 text-green-500" />
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-black italic tracking-tighter">All Systems Pulse</h1>
                                <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em]">Verified 42 seconds ago</p>
                            </div>
                        </div>

                        {/* System Grid */}
                        <div className="space-y-12">
                            <div className="flex items-end justify-between border-b border-white/10 pb-6">
                                <h2 className="text-2xl font-black italic text-white tracking-tight">Core Infrastructure</h2>
                                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest flex items-center gap-2">
                                    <Activity className="h-3 w-3" />
                                    Real-time Telemetry
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {systems.map((sys) => (
                                    <div key={sys.name} className="glass p-8 rounded-[2rem] border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group hover:bg-white/[0.02] transition-all">
                                        <div className="space-y-1">
                                            <h3 className="font-bold text-lg text-zinc-200">{sys.name}</h3>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Global Latency</span>
                                                <code className="text-[10px] font-bold text-primary">{sys.latency}</code>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${sys.status === 'operational' ? 'text-green-500' : 'text-yellow-500'}`}>
                                                {sys.status}
                                            </span>
                                            <div className={`h-2 w-2 rounded-full ${sys.status === 'operational' ? 'bg-green-500 glow-green' : 'bg-yellow-500 animate-pulse'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Regions */}
                        <div className="space-y-12">
                            <h2 className="text-2xl font-black italic text-white tracking-tight text-center">Global Edge Hubs</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { region: "US-West", load: "12%" },
                                    { region: "EU-Central", load: "44%" },
                                    { region: "Asia-Pacific", load: "8%" },
                                    { region: "Latency-Low", load: "99%" },
                                ].map((reg) => (
                                    <div key={reg.region} className="glass p-6 rounded-3xl text-center border-white/5 space-y-4 group">
                                        <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto group-hover:bg-primary transition-colors">
                                            <Globe className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">{reg.region}</p>
                                            <p className="text-lg font-black text-white italic">{reg.load}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent History */}
                        <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                <Clock className="h-4 w-4" /> Incident History
                            </h3>
                            <div className="space-y-6 border-l border-white/10 pl-8 ml-2">
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-1.5 h-4 w-4 bg-white/5 border border-white/10 rounded-full" />
                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Feb 05, 2026</p>
                                    <p className="text-sm font-bold text-zinc-300">Analytics pipeline latency spike in EU-West-1 cluster. Resolved in 22 minutes.</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[41px] top-1.5 h-4 w-4 bg-white/5 border border-white/10 rounded-full" />
                                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Jan 28, 2026</p>
                                    <p className="text-sm font-bold text-zinc-300">Auth trigger maintenance. No interruption to core sharding services.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
