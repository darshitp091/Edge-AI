"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import {
    Shield,
    Lock,
    Key,
    ShieldCheck,
    ChevronRight,
    Search,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SecurityPage() {
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
                            className="text-center space-y-8"
                        >
                            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto border-2 border-primary/20 relative">
                                <Shield className="h-10 w-10 text-primary" />
                                <div className="absolute inset-0 bg-primary animate-ping opacity-10 rounded-full" />
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
                                Neural <span className="text-gradient">Hardening</span>
                            </h1>
                            <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
                                Security is not a feature at EdgeAI—it is the bedrock of our sharding protocol. Your architectural secrets are protected by military-grade encryption from ingestion to edge.
                            </p>
                        </motion.div>

                        {/* Security Pillars */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { icon: Lock, title: "AES-256 Ingestion", desc: "Every model shard is encrypted at the storage layer before optimization begins." },
                                { icon: Key, title: "Neural Key Vectors", desc: "API access is managed via rotated, sharded keys that never touch unencrypted disks." },
                                { icon: ShieldCheck, title: "SOC 2 Type II", desc: "Our infrastructure is continuously audited for security, availability, and confidentiality." },
                                { icon: AlertCircle, title: "Vulnerability Pulse", desc: "Real-time threat detection across every optimized model running at the edge." },
                            ].map((card, i) => (
                                <div key={card.title} className="glass p-12 rounded-[3.5rem] border-white/5 group hover:border-primary/20 transition-all">
                                    <div className="h-14 w-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-all">
                                        <card.icon className="h-7 w-7 text-zinc-500 group-hover:text-primary transition-all" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-4 italic italic">{card.title}</h3>
                                    <p className="text-zinc-500 leading-relaxed font-semibold">{card.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Compliance Section */}
                        <div className="space-y-12">
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-black italic tracking-tight">Compliance & Trust</h2>
                                <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Third-party verified security</p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                                <span className="text-3xl font-black text-white italic">GDPR</span>
                                <span className="text-3xl font-black text-white italic">SOC2</span>
                                <span className="text-3xl font-black text-white italic">HIPAA</span>
                                <span className="text-3xl font-black text-white italic">ISO_27001</span>
                            </div>
                        </div>

                        {/* Vulnerability Reporting */}
                        <div className="glass rounded-[4rem] p-16 text-center border-primary/20 bg-primary/5 relative overflow-hidden group">
                            <h2 className="text-4xl font-black text-white mb-6 italic">Found a Leak?</h2>
                            <p className="text-zinc-400 max-w-xl mx-auto mb-10 font-medium">
                                We operate a private Bug Bounty program for verified security researchers. Report vulnerabilities directly to our triage team.
                            </p>
                            <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-xs">
                                Submit Security Pulse
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
