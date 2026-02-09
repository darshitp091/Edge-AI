"use client";

import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Neural Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <Link href="/login" className="inline-flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-8 group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs font-black uppercase tracking-widest">Back to Neural Access</span>
                </Link>

                <div className="glass rounded-[3rem] p-10 md:p-12 border-primary/20 shadow-2xl shadow-primary/5">
                    <div className="mb-10 text-center space-y-4">
                        <div className="h-16 w-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto border border-primary/20">
                            <Sparkles className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-white tracking-tighter italic">Relink Identity</h1>
                            <p className="text-zinc-500 text-sm">Transmit your credentials to receive a recovery vector.</p>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase font-black text-zinc-500 tracking-widest ml-1 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 bg-primary rounded-full" />
                                Auth Endpoint (Email)
                            </Label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600 group-focus-within:text-primary transition-colors" />
                                <Input
                                    type="email"
                                    placeholder="name@nexus.sh"
                                    className="bg-white/5 border-zinc-800 focus:border-primary/50 h-14 pl-12 rounded-2xl text-white transition-all"
                                />
                            </div>
                        </div>

                        <Button className="w-full h-16 bg-primary hover:bg-primary/90 glow-blue text-lg font-black rounded-2xl group">
                            Transmit Recovery
                            <Send className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-xs text-zinc-600 font-bold uppercase tracking-tight">
                        Security redundancy: Check your spam node if the transmission fails.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
