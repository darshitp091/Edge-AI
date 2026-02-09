"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, CloudOff, FileCode } from "lucide-react";

export default function PrivacyPage() {
    const sections = [
        {
            icon: Shield,
            title: "Neural Safety",
            content: "All model weights uploaded to EdgeAI are processed in isolated encrypted containers. We do not store your original uncompressed weights after the session ends unless explicitly archived by the operator."
        },
        {
            icon: Eye,
            title: "Data Observability",
            content: "We track metadata (layer counts, parameter sizes, accuracy metrics) to improve our compression algorithms. No actual weight values or sensitive architecture details are ever transmitted to third-party providers."
        },
        {
            icon: CloudOff,
            title: "Zero-Knowledge Local Ingest",
            content: "For enterprise users, we offer a local-only CLI tool that performs 100% of the compression logic on your own premises, only syncing billing metadata with our core."
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        <div className="space-y-4">
                            <h1 className="text-5xl font-black text-white tracking-tighter">Privacy <span className="text-gradient">Protocol</span></h1>
                            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">Revision 2.1 • Effective Feb 2026</p>
                        </div>

                        <div className="glass p-1 rounded-[3rem] border-primary/20 overflow-hidden">
                            <div className="bg-primary/10 p-10 border-b border-primary/20">
                                <p className="text-xl text-primary font-black italic">&quot;Your architectural secrets are your own. We only provide the shrink-wrap.&quot;</p>
                            </div>
                            <div className="p-10 space-y-12 bg-black/40">
                                {sections.map((section, i) => (
                                    <div key={section.title} className="flex gap-8 group">
                                        <div className="h-12 w-12 glass rounded-2xl flex items-center justify-center border-white/5 shrink-0 group-hover:border-primary/50 transition-colors">
                                            <section.icon className="h-5 w-5 text-zinc-500 group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-xl font-bold text-white">{section.title}</h3>
                                            <p className="text-zinc-400 leading-relaxed text-sm">{section.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6 text-zinc-500 text-xs leading-relaxed">
                            <h4 className="font-black uppercase tracking-widest text-zinc-400">Security Disclosures</h4>
                            <p>EdgeAI employs SOC2 Type II compliant infrastructure. All neural data at rest is encrypted via AES-256-GCM. Connections are secured using TLS 1.3. For security audits, please contact our Legal Neural Node.</p>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
