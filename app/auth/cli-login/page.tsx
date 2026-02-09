"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Loader2, ShieldCheck, Terminal } from "lucide-react";
import Logo from "@/components/logo";

export default function CliLoginPage() {
    const [status, setStatus] = useState<"checking" | "authenticated" | "redirecting" | "error">("checking");

    useEffect(() => {
        const handleCliLogin = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                // Not logged in, send to login with return path
                window.location.href = `/login?next=${encodeURIComponent('/auth/cli-login')}`;
                return;
            }

            setStatus("authenticated");

            // Handshake with local SDK server
            setTimeout(() => {
                setStatus("redirecting");
                window.location.href = `http://localhost:8080?token=${session.access_token}`;
            }, 1500);
        };

        handleCliLogin();
    }, []);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-12">
                <Logo />
            </div>

            <div className="glass p-12 rounded-[3.5rem] border-white/5 max-w-md w-full space-y-8 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                <div className="flex justify-center">
                    <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center border border-primary/20">
                        {status === "checking" ? (
                            <Loader2 className="h-10 w-10 text-primary animate-spin" />
                        ) : (
                            <ShieldCheck className="h-10 w-10 text-primary" />
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-black text-white italic tracking-tight italic">
                        {status === "checking" ? "Verifying Session" : "Access Granted"}
                    </h1>
                    <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                        {status === "checking"
                            ? "Synchronizing with EdgeAI Neural Core..."
                            : "Linking your terminal to the platform. Handshake in progress."}
                    </p>
                </div>

                {status === "redirecting" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.2em]"
                    >
                        <Terminal className="h-4 w-4" />
                        Capturing Node Token
                    </motion.div>
                )}
            </div>

            <p className="mt-8 text-zinc-700 text-[10px] font-bold uppercase tracking-widest">
                Secure Neural Link v1.0.4
            </p>
        </div>
    );
}
