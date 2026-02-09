"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import {
    Zap,
    Rocket,
    Cpu,
    Shield,
    Package,
    ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const versions = [
    {
        ver: "v2.0.4",
        date: "Feb 09, 2026",
        type: "Stable",
        changes: [
            "Optimized Neural Orchestrator for 30% faster sharding",
            "Enhanced INT4 Quantization precision for Transformer models",
            "Implemented Vercel-native sharding endpoints",
            "Resolved high-latency edge cases in EU clusters"
        ]
    },
    {
        ver: "v2.0.0",
        date: "Jan 15, 2026",
        type: "Major",
        changes: [
            "Full rewrite of the Python core to modular TypeScript",
            "Integrated Razorpay for global credit distribution",
            "Launched the Advanced Neural Analytics dashboard",
            "Added support for Apple Neural Engine directly via CoreML export"
        ]
    },
    {
        ver: "v1.8.2",
        date: "Dec 12, 2025",
        type: "Patch",
        changes: [
            "Memory leak fix in persistent sharding buffers",
            "Improved error handling for malformed ONNX artifacts",
            "Standardized API response contracts for better SDK sync"
        ]
    },
];

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-background text-white">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-24">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center space-y-6"
                        >
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
                                Pulse <span className="text-gradient">Changelog</span>
                            </h1>
                            <p className="text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
                                Tracking every iteration of intelligence. From quantization tweaks to massive architectural shifts.
                            </p>
                        </motion.div>

                        {/* Recent Highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: Zap, label: "Performance", value: "+30%" },
                                { icon: Cpu, label: "Nodes Added", value: "15" },
                                { icon: Shield, label: "Uptime", value: "99.99%" },
                            ].map((s) => (
                                <div key={s.label} className="glass p-8 rounded-[2.5rem] border-white/5 text-center space-y-2 group">
                                    <s.icon className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="text-[10px] uppercase font-black text-zinc-600 tracking-widest">{s.label}</p>
                                    <p className="text-2xl font-black text-white italic">{s.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Timeline */}
                        <div className="space-y-16 border-l border-white/10 ml-4 md:ml-0 md:border-l-0">
                            {versions.map((release, i) => (
                                <div key={release.ver} className="relative md:grid md:grid-cols-4 gap-12 group">
                                    <div className="hidden md:flex flex-col items-end pt-2 text-right">
                                        <p className="text-white font-black text-2xl italic tracking-tighter">{release.ver}</p>
                                        <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest mt-1">{release.date}</p>
                                    </div>

                                    <div className="md:col-span-3 pb-16 relative">
                                        {/* Mobile release tag */}
                                        <div className="md:hidden flex items-center gap-3 mb-6 ml-10">
                                            <p className="text-white font-black text-2xl italic tracking-tighter">{release.ver}</p>
                                            <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-black rounded uppercase">{release.type}</span>
                                        </div>

                                        <div className="absolute left-[-21px] md:left-[-6px] top-6 md:top-4 h-3 w-3 rounded-full bg-primary border-4 border-background ring-4 ring-primary/20 z-10" />

                                        <div className="glass p-10 rounded-[3rem] border-white/5 group-hover:border-primary/20 transition-all space-y-8 ml-10 md:ml-0">
                                            <div className="flex items-center justify-between">
                                                <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center">
                                                    <Package className="h-5 w-5 text-zinc-500 group-hover:text-primary transition-colors" />
                                                </div>
                                                <span className="hidden md:block px-3 py-1 bg-white/5 border border-white/10 text-white text-[10px] font-black rounded-full uppercase tracking-widest">{release.type}</span>
                                            </div>

                                            <div className="space-y-4">
                                                <h3 className="text-xl font-bold text-white tracking-tight italic">Key Shifts</h3>
                                                <ul className="space-y-4">
                                                    {release.changes.map((change) => (
                                                        <li key={change} className="flex gap-4 text-zinc-400 font-medium leading-relaxed">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                                            {change}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <Button variant="ghost" className="w-full text-zinc-600 hover:text-primary text-[10px] font-black uppercase tracking-widest py-8 border-t border-white/5 rounded-none flex items-center gap-2">
                                                Full Technical Manifest <ArrowUpRight className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination placeholder */}
                        <div className="flex justify-center pt-8">
                            <Button variant="outline" className="glass border-white/10 px-10 py-6 rounded-2xl text-zinc-500 font-black uppercase tracking-widest text-xs hover:text-white transition-colors">Load Older Transmissions</Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
