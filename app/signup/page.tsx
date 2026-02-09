"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Mail, Lock, User, ArrowRight, Github, ShieldCheck, Fingerprint } from "lucide-react";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // Password strength logic
    const getPasswordStrength = (pass: string) => {
        let score = 0;
        if (pass.length > 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score;
    };

    const strength = getPasswordStrength(formData.password);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (strength < 3) {
            setError("Neural Protocol requires a stronger password (8+ chars, numbers, symbols)");
            return;
        }

        setIsLoading(true);
        setError(null);

        const { data, error: authError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    full_name: formData.name,
                }
            }
        });

        if (authError) {
            setError(authError.message);
            setIsLoading(false);
        } else {
            const next = new URLSearchParams(window.location.search).get('next') || '/dashboard';
            router.push(next);
        }
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
            {/* Animated background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

            {/* Back to home link */}
            <Link
                href="/"
                className="absolute top-8 left-8 flex items-center gap-2 group z-10"
            >
                <div className="relative">
                    <Zap className="h-8 w-8 text-primary animate-glow" />
                    <div className="absolute inset-0 blur-lg bg-primary/30 group-hover:bg-primary/50 transition-all" />
                </div>
                <span className="text-2xl font-bold text-gradient">EdgeAI</span>
            </Link>

            {/* Signup form container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="glass rounded-3xl p-8 border-primary/20">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="mx-auto h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 transition-transform">
                            <Fingerprint className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-black mb-3 tracking-tight italic">
                            <span className="text-gradient">Enlist Operator</span>
                        </h1>
                        <p className="text-zinc-500 text-sm font-medium">
                            Join the elite edge-aware neural compression grid.
                        </p>
                    </div>

                    {/* Social signup */}
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

                    {/* Divider */}
                    <div className="relative mb-8 text-center uppercase text-[10px] font-black tracking-[0.3em] text-zinc-600">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                        <span className="relative z-10 px-4 bg-background">Or New Cipher</span>
                    </div>

                    {/* Signup form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="h-4 w-4 text-primary" />
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="glass border-primary/30 focus:border-primary"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="glass border-primary/30 focus:border-primary"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-primary" />
                                Neural Access Key
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                                className="glass border-primary/20 focus:border-primary bg-black/40 h-12"
                                required
                            />

                            {/* Strength Meter */}
                            <div className="flex gap-1.5 mt-2 h-1">
                                {[1, 2, 3, 4].map((step) => (
                                    <div
                                        key={step}
                                        className={`flex-grow rounded-full transition-all duration-500 ${strength >= step
                                            ? (strength <= 2 ? 'bg-red-500' : strength === 3 ? 'bg-yellow-500' : 'bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]')
                                            : 'bg-white/5'
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest mt-1">
                                <span className={strength <= 1 ? 'text-red-500' : strength === 2 ? 'text-yellow-500' : 'text-zinc-500'}>
                                    {strength === 0 ? 'Protocol Idle' : strength <= 2 ? 'Weak Cipher' : strength === 3 ? 'Secure' : 'Military Grade'}
                                </span>
                                <span className="text-zinc-600">8+ chars, numbers, symbols</span>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary/90 glow-blue group mt-6"
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                            {!isLoading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>

                    {/* Terms */}
                    <p className="text-xs text-center text-muted-foreground mt-6">
                        By signing up, you agree to our{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                        </Link>
                    </p>

                    {/* Login link */}
                    <div className="text-center mt-6 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-primary hover:underline font-semibold"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Floating stats */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="absolute -left-32 top-1/4 hidden lg:block"
                >
                    <div className="glass rounded-2xl p-4 w-40">
                        <div className="text-3xl font-bold text-primary mb-1">5,000+</div>
                        <div className="text-sm text-muted-foreground">Active Users</div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute -right-32 bottom-1/4 hidden lg:block"
                >
                    <div className="glass rounded-2xl p-4 w-40">
                        <div className="text-3xl font-bold text-primary mb-1">10x</div>
                        <div className="text-sm text-muted-foreground">Compression</div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
