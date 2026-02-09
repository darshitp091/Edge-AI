"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { FileText, Scale, Gavel, Cpu } from "lucide-react";

export default function TermsPage() {
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
                            <h1 className="text-5xl font-black text-white tracking-tighter">Terms of <span className="text-gradient">Optimization</span></h1>
                            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">Service Directive 4.0 • Feb 2026</p>
                        </div>

                        <div className="space-y-10">
                            <div className="glass p-10 rounded-[2.5rem] border-white/5 space-y-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <Scale className="h-6 w-6 text-primary" />
                                    <h2 className="text-2xl font-black text-white">1. Deployment Rights</h2>
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    All models compressed using the EdgeAI platform remain the sole property of the operator. EdgeAI claims no intellectual property rights over the weights or architectures processed. However, by using the platform, you grant us a limited license to process and derive optimization metrics purely for the task at hand.
                                </p>
                            </div>

                            <div className="glass p-10 rounded-[2.5rem] border-white/5 space-y-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <Cpu className="h-6 w-6 text-primary" />
                                    <h2 className="text-2xl font-black text-white">2. Resource Usage</h2>
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    Users are allotted a specific number of &apos;Neural Bits&apos; per billing cycle. Excess usage will be throttled or billed per-compression. Automated scraping of the compression API is strictly prohibited without an Enterprise API Gateway subscription.
                                </p>
                            </div>

                            <div className="glass p-10 rounded-[2.5rem] border-white/5 space-y-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <Gavel className="h-6 w-6 text-primary" />
                                    <h2 className="text-2xl font-black text-white">3. Liability Limits</h2>
                                </div>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    EdgeAI is not responsible for accuracy degredation below the requested threshold if the original model architecture is not supported. We recommend extensive validation before deploying optimized models in safety-critical systems.
                                </p>
                            </div>
                        </div>

                        <p className="text-center text-zinc-600 text-[10px] uppercase font-bold tracking-widest">End of Directive</p>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
