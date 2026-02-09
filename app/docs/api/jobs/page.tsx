"use client";

import DocsLayout from "@/components/docs-layout";
import { ListChecks, PlayCircle, Loader2, CheckCircle2 } from "lucide-react";

export default function ApiJobsPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "API Reference" }, { name: "Job Management" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        Job <span className="text-gradient">Management</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Track, cancel, and manage your neural compression pipelines at scale.
                    </p>
                </div>

                <div className="space-y-10">
                    <section className="space-y-6">
                        <h2 className="text-3xl font-black italic text-white tracking-tight">Lifecycle States</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { status: "Pending", icon: Loader2, color: "text-zinc-500" },
                                { status: "Sharding", icon: PlayCircle, color: "text-primary" },
                                { status: "Optimizing", icon: Loader2, color: "text-accent" },
                                { status: "Completed", icon: CheckCircle2, color: "text-green-500" }
                            ].map((s) => (
                                <div key={s.status} className="glass p-6 rounded-3xl border-white/5 flex flex-col items-center gap-3">
                                    <s.icon className={`h-6 w-6 ${s.color} ${s.status === 'Optimizing' || s.status === 'Pending' ? 'animate-spin' : ''}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{s.status}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6 text-zinc-300">
                        <h3 className="text-2xl font-black italic text-white">Endpoints</h3>
                        <div className="space-y-4">
                            {[
                                { method: "GET", path: "/v1/jobs", desc: "List all active and historical jobs." },
                                { method: "POST", path: "/v1/jobs/cancel/:id", desc: "Immediately terminate a running process." },
                                { method: "GET", path: "/v1/jobs/:id/logs", desc: "Stream real-time terminal output." }
                            ].map((api) => (
                                <div key={api.path} className="flex flex-col md:flex-row gap-4 md:items-center p-6 glass rounded-2xl border-white/5 hover:border-white/10 transition-colors">
                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded bg-white/5 w-fit ${api.method === 'POST' ? 'text-accent' : 'text-primary'}`}>{api.method}</span>
                                    <code className="text-sm font-mono text-zinc-400 flex-grow">{api.path}</code>
                                    <p className="text-xs text-zinc-600 font-bold">{api.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="p-8 glass rounded-3xl border-primary/10 bg-primary/5 flex items-center gap-6">
                        <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                            <ListChecks className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed font-medium">Batch jobs allow you to submit multiple model architectures in a single request, ideal for regression testing across targets.</p>
                    </div>
                </div>
            </div>
        </DocsLayout>
    );
}
