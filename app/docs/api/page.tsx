"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import {
    Code2,
    Terminal,
    Globe,
    Lock,
    Zap,
    ChevronRight,
    Search
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApiReferencePage() {
    return (
        <div className="min-h-screen bg-background text-white">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* API Sidebar */}
                        <aside className="hidden lg:block space-y-8">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                <input
                                    placeholder="Search API..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs font-bold focus:border-primary transition-all"
                                />
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-[10px] uppercase font-black text-primary tracking-widest mb-4">Core Endpoints</h3>
                                    <ul className="space-y-3">
                                        {["Authentication", "Model Upload", "Compression Job", "Status Check", "Download"].map((item) => (
                                            <li key={item}>
                                                <a href="#" className="text-xs font-bold text-zinc-500 hover:text-white flex items-center gap-2 group transition-colors">
                                                    <div className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-[10px] uppercase font-black text-primary tracking-widest mb-4">Sharding Protocols</h3>
                                    <ul className="space-y-3">
                                        {["Weight Quantization", "Model Pruning", "Knowledge Distillation"].map((item) => (
                                            <li key={item}>
                                                <a href="#" className="text-xs font-bold text-zinc-500 hover:text-white flex items-center gap-2 group transition-colors">
                                                    <div className="h-1 w-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    {item}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </aside>

                        {/* Main API Content */}
                        <div className="lg:col-span-3 space-y-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                    <span>Documentation</span>
                                    <ChevronRight className="h-3 w-3" />
                                    <span className="text-primary italic">API Reference</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                                    Neural <span className="text-gradient">API v1.0</span>
                                </h1>
                                <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                                    The EdgeAI Neural API provides programmatic access to our sharding and quantization engines. Build custom optimization pipelines directly into your CI/CD.
                                </p>
                            </motion.div>

                            {/* Base URL Section */}
                            <div className="glass rounded-[3rem] p-8 border-white/5 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <Globe className="h-5 w-5 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold tracking-tight">Base URL</h2>
                                </div>
                                <div className="bg-black/50 border border-white/5 rounded-2xl p-6 font-mono text-primary text-sm">
                                    https://api.edge-ai.vercel.app/v1
                                </div>
                            </div>

                            {/* Authentication Section */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                        <Lock className="h-5 w-5 text-primary" />
                                    </div>
                                    <h2 className="text-3xl font-bold tracking-tight text-white italic">Authentication</h2>
                                </div>
                                <p className="text-zinc-400 text-lg">
                                    Neural endpoints require a Bearer token in the <code className="text-primary bg-primary/5 px-2 py-0.5 rounded italic">Authorization</code> header. You can generate your access tokens from the <a href="/dashboard/settings" className="text-white underline decoration-primary font-bold">Dashboard</a>.
                                </p>
                                <div className="glass rounded-[2rem] p-1 border-primary/20 bg-[#0a0a0b]">
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                                        <span className="text-[10px] font-black text-zinc-600 tracking-widest uppercase italic">Example Header</span>
                                        <div className="flex gap-1.5">
                                            <div className="h-2 w-2 rounded-full bg-white/5" />
                                        </div>
                                    </div>
                                    <div className="p-8 font-mono text-sm leading-7">
                                        <p className="text-zinc-300">Authorization: Bearer <span className="text-primary italic">EDGE_KEY_0x7A2...</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* Endpoints */}
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl font-black text-white italic tracking-tighter">Endpoints</h2>
                                    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-500/20">All Systems Nominal</span>
                                </div>

                                <div className="space-y-6">
                                    {[
                                        { method: "POST", path: "/compress", desc: "Start a new model compression job.", color: "text-green-500" },
                                        { method: "GET", path: "/jobs/{id}", desc: "Retrieve status and telemetry for a job.", color: "text-blue-500" },
                                        { method: "POST", path: "/quantize", desc: "Direct hardware quantization endpoint.", color: "text-yellow-500" }
                                    ].map((ep) => (
                                        <div key={ep.path} className="group glass p-8 rounded-[2.5rem] border-white/5 hover:border-primary/20 transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
                                            <span className={`text-xs font-black px-4 py-2 rounded-xl bg-white/5 ${ep.color}`}>{ep.method}</span>
                                            <div className="flex-grow space-y-1">
                                                <code className="text-white font-bold">{ep.path}</code>
                                                <p className="text-zinc-500 text-sm">{ep.desc}</p>
                                            </div>
                                            <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5">View Spec</Button>
                                        </div>
                                    ))}
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
