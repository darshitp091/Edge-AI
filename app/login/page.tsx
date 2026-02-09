"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail, Lock, ArrowRight, Github, ShieldCheck, Key } from "lucide-react";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const { error: authError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        if (authError) {
            setError(authError.message);
            setIsLoading(false);
        } else {
            // Give the session a moment to propagate to cookies
            const next = new URLSearchParams(window.location.search).get('next') || '/dashboard';

            // Re-verify session exists before pushing
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                router.push(next);
                // We keep isLoading true to show navigation is happening
            } else {
                setError("Protocol Timeout: Session synchronization failed. Please try again.");
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
            {/* Neural Matrix Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-40 animate-pulse" />
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />

            {/* Navigation Overlay */}
            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 group z-50">
                <Zap className="h-8 w-8 text-primary animate-glow" />
                <span className="text-2xl font-black text-white tracking-tighter">EDGE<span className="text-primary italic">AI</span></span>
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="glass rounded-[3rem] p-10 border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="text-center mb-10">
                        <div className="mx-auto h-20 w-20 glass rounded-3xl flex items-center justify-center border-white/10 mb-6 shadow-primary/20 shadow-2xl">
                            <Key className="h-10 w-10 text-primary animate-pulse" />
                        </div>
                        <h1 className="text-4xl font-black mb-2 tracking-tight">
                            <span className="text-gradient">Recall Identity</span>
                        </h1>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">Authorized Personnel Only</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <Button
                            variant="outline"
                            className="w-full h-14 bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50 rounded-2xl flex items-center justify-center gap-3 transition-all group"
                            onClick={async () => {
                                const next = new URLSearchParams(window.location.search).get('next') || '/dashboard';
                                await supabase.auth.signInWithOAuth({
                                    provider: 'google',
                                    options: {
                                        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
                                    }
                                });
                            }}
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                                />
                            </svg>
                            <span className="text-zinc-300 font-bold uppercase tracking-widest text-[10px]">Neural Sync with Google</span>
                        </Button>
                    </div>

                    <div className="relative mb-8 text-center uppercase text-[10px] font-black tracking-[0.3em] text-zinc-600">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                        <span className="relative z-10 px-4 bg-black/20 backdrop-blur-md">Or Cipher Key</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold text-center"
                            >
                                Protocol Error: {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">Email Endpoint</Label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                                <Input
                                    type="email"
                                    placeholder="operator@network.sh"
                                    className="pl-12 h-14 bg-black/40 border-white/5 focus:border-primary focus:ring-primary/10 rounded-2xl transition-all"
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-1">Cipher Key</Label>
                                <Link href="#" className="text-[10px] text-zinc-600 hover:text-primary font-bold uppercase tracking-wider">Forgot Key?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-primary transition-colors" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-12 h-14 bg-black/40 border-white/5 focus:border-primary focus:ring-primary/10 rounded-2xl transition-all"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" disabled={isLoading} className="w-full h-14 bg-primary hover:bg-primary/90 glow-blue text-sm font-black uppercase tracking-widest rounded-2xl transition-all group">
                            {isLoading ? "Synchronizing..." : "Initiate Recall"}
                            {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>

                    <div className="text-center mt-12 pt-8 border-t border-white/5">
                        <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest">
                            No Neural Profile?{" "}
                            <Link href="/signup" className="text-primary hover:underline ml-1">Establish Link</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
