"use client";

import DocsLayout from "@/components/docs-layout";
import { Lock, Key, ShieldCheck, Terminal } from "lucide-react";

export default function ApiAuthPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "API Reference" }, { name: "Authentication" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        API <span className="text-gradient">Authentication</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Securely integrate with the EdgeAI Neural Core using JWTs and Project Keys.
                    </p>
                </div>

                <section className="space-y-6">
                    <h2 className="text-3xl font-black italic text-white tracking-tight">Project Keys</h2>
                    <p className="text-zinc-500 font-medium leading-relaxed">Project keys are used to authenticate your CI/CD pipelines and the Python SDK. You can generate and rotate these keys in the <span className="text-white italic">Settings</span> panel of your dashboard.</p>
                </section>

                <div className="glass p-1 rounded-[3rem] border-white/5 overflow-hidden">
                    <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex gap-4 items-center">
                            <Lock className="h-4 w-4 text-zinc-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Header Example</span>
                        </div>
                    </div>
                    <div className="p-8 font-mono text-sm text-primary bg-black/50">
                        X-Neural-Core-Key: <span className="text-zinc-300">nc_live_82x...77k2</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6">
                        <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                            <Key className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-2xl font-black italic text-white italic">Bearer Tokens</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">For browser-based requests, use the standard Authorization Bearer header with your Supabase JWT.</p>
                    </div>
                    <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6">
                        <div className="h-12 w-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                            <ShieldCheck className="h-6 w-6 text-accent" />
                        </div>
                        <h3 className="text-2xl font-black italic text-white italic">Rate Limits</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">Free tier: 50 req/min. Pro tier: 10,000 req/min. Enterprise: Unlimited with dedicated sharding nodes.</p>
                    </div>
                </div>

                <section className="space-y-6">
                    <h2 className="text-3xl font-black italic text-white tracking-tight italic">SDK Authenication</h2>
                    <p className="text-zinc-500">The CLI handles authentication via an OAuth handshake. Running the command below will open your browser to finalize the connection.</p>
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-sm text-zinc-300">
                        edge-ai <span className="text-primary">auth</span> --login
                    </div>
                </section>
            </div>
        </DocsLayout>
    );
}
