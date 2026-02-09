"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import {
    Cookie,
    ShieldCheck,
    Info,
    Settings,
    ChevronRight,
    Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-background text-white">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-20">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-8"
                        >
                            <div className="h-24 w-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto border border-primary/20">
                                <Cookie className="h-12 w-12 text-primary" />
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic">Neural <span className="text-gradient">Fragments</span></h1>
                            <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
                                We use essential fragments (cookies) to maintain your secure session and optimize your neural configuration dashboard.
                            </p>
                        </motion.div>

                        {/* Content sections */}
                        <div className="space-y-16">
                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <ShieldCheck className="h-6 w-6 text-primary" />
                                    <h2 className="text-3xl font-black italic tracking-tight">Essential Context</h2>
                                </div>
                                <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6">
                                    <p className="text-zinc-400 leading-relaxed font-semibold">
                                        These fragments are technically necessary to provide you with the core functionality of the EdgeAI Platform. They cannot be disabled as they govern:
                                    </p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            "Secure Auth Session Persistence",
                                            "Neural Key Token Handshakes",
                                            "User Configuration Sync",
                                            "XSRF Protection Protocols"
                                        ].map((item) => (
                                            <li key={item} className="flex gap-4 items-center glass p-4 rounded-2xl border-white/5 text-sm font-bold text-zinc-200">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <Settings className="h-6 w-6 text-primary" />
                                    <h2 className="text-3xl font-black italic tracking-tight">Telemetry Fragments</h2>
                                </div>
                                <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6">
                                    <p className="text-zinc-400 leading-relaxed font-semibold">
                                        We use high-level telemetry fragments to understand how operators interact with the sharding engine. This allows us to prioritize hardware target updates and bug fixes.
                                    </p>
                                    <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-black italic text-zinc-100">Global Analytics Payload</span>
                                            <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">PostHog / Google Analytics</span>
                                        </div>
                                        <div className="h-4 w-12 bg-primary rounded-full relative">
                                            <div className="absolute right-1 top-1 h-2 w-2 bg-white rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <Lock className="h-6 w-6 text-primary" />
                                    <h2 className="text-3xl font-black italic tracking-tight">Management</h2>
                                </div>
                                <div className="p-1 glass rounded-3xl border-primary/20 overflow-hidden">
                                    <Button className="w-full h-16 bg-white/[0.02] hover:bg-white/[0.05] text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 rounded-none">
                                        Clear Fragment Cache
                                        <ChevronRight className="h-4 w-4 text-primary" />
                                    </Button>
                                </div>
                                <p className="text-center text-zinc-500 text-[10px] font-black uppercase tracking-widest">Last Transmission Audit: Feb 01, 2026</p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
