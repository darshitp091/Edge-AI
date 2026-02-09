"use client";

import DocsLayout from "@/components/docs-layout";
import { Terminal, Shield, Download, CheckCircle2 } from "lucide-react";

export default function InstallationPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "Getting Started", href: "/docs" }, { name: "Installation" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        Installation <span className="text-gradient">& Setup</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Deploy the EdgeAI Neural Core environment on your local workstation or CI/CD runner.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: Terminal, title: "Python 3.8+", desc: "Required for the Neural SDK" },
                        { icon: Shield, title: "Auth Key", desc: "Found in your Dashboard" },
                        { icon: Download, title: "15MB Space", desc: "Ultra-lean footprint" }
                    ].map((step, i) => (
                        <div key={i} className="glass p-6 rounded-3xl border-white/5 flex flex-col items-center text-center space-y-3">
                            <step.icon className="h-6 w-6 text-primary" />
                            <h4 className="font-bold text-white">{step.title}</h4>
                            <p className="text-xs text-zinc-500">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <section className="space-y-6">
                    <h2 className="text-3xl font-black italic text-white tracking-tight">1. Install the SDK</h2>
                    <p className="text-zinc-400">The EdgeAI SDK is available via PyPI and handles all model telemetry, sharding, and transmission.</p>
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-sm text-primary">
                        pip install edge-ai-sdk
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-3xl font-black italic text-white tracking-tight">2. Verify Installation</h2>
                    <p className="text-zinc-400">Ensure the neural binary is correctly linked to your path.</p>
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-sm text-zinc-300">
                        edge-ai --version
                        <br />
                        <span className="text-zinc-600"># Output: EdgeAI Neural Core v2.0.4</span>
                    </div>
                </section>

                <div className="glass p-8 rounded-[2.5rem] border-primary/20 bg-primary/5 space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        Next Steps
                    </h3>
                    <p className="text-zinc-400 text-sm">Once installed, you must authenticate your machine to start sharding models.</p>
                </div>
            </div>
        </DocsLayout>
    );
}
