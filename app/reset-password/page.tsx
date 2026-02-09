"use client";

import { motion } from "framer-motion";
import { Lock, ShieldCheck, Key, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Neural Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="glass rounded-[3rem] p-10 md:p-12 border-primary/20 shadow-2xl shadow-primary/5">
                    <div className="mb-10 text-center space-y-4">
                        <div className="h-16 w-16 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto border border-green-500/20">
                            <ShieldCheck className="h-8 w-8 text-green-500" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black text-white tracking-tighter italic">Re-Cipher Link</h1>
                            <p className="text-zinc-500 text-sm">Define a new access key for your neural profile.</p>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-black text-zinc-500 tracking-widest ml-1">New Neural Cipher</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                                    <Input type="password" placeholder="••••••••" className="bg-white/5 border-zinc-800 focus:border-primary/50 h-14 pl-12 rounded-2xl" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase font-black text-zinc-500 tracking-widest ml-1">Confirm Cipher</Label>
                                <div className="relative group">
                                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-600" />
                                    <Input type="password" placeholder="••••••••" className="bg-white/5 border-zinc-800 focus:border-primary/50 h-14 pl-12 rounded-2xl" />
                                </div>
                            </div>
                        </div>

                        <Button className="w-full h-16 bg-primary hover:bg-primary/90 glow-blue text-lg font-black rounded-2xl group">
                            Update Identity
                            <RefreshCw className="ml-3 h-5 w-5 group-hover:rotate-180 transition-transform duration-700" />
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
