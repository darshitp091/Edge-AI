"use client";

import DocsLayout from "@/components/docs-layout";
import { Cpu, Zap, Activity, Info } from "lucide-react";

export default function OpenVINOPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "Export Targets" }, { name: "OpenVINO (Intel)" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        OpenVINO <span className="text-gradient">Toolkit</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Scale across Intel CPUs, integrated GPUs, and specialized Vision Processing Units (VPUs).
                    </p>
                </div>

                <section className="space-y-8">
                    <h2 className="text-3xl font-black italic text-white tracking-tight">Write once, deploy anywhere.</h2>
                    <p className="text-zinc-500 font-medium leading-relaxed italic border-l-4 border-primary pl-8 py-2">OpenVINO allows your compressed models to run on generic Intel hardware with near-ASIC performance through advanced graph optimizations.</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "NUCs", desc: "Optimized for Edge Compute nodes." },
                        { title: "Xeon", desc: "High-density data center scaling." },
                        { title: "Iris Xe", desc: "Leverage integrated graphics." }
                    ].map((card, i) => (
                        <div key={card.title} className="glass p-6 rounded-[2rem] border-white/5 space-y-2 text-center group hover:bg-primary/5 transition-all">
                            <h4 className="text-lg font-black italic text-white group-hover:text-primary transition-colors">{card.title}</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{card.desc}</p>
                        </div>
                    ))}
                </div>

                <section className="space-y-6">
                    <h2 className="text-3xl font-black italic text-white tracking-tight">Export Command</h2>
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-sm text-zinc-300">
                        edge-ai <span className="text-primary italic">export</span> --target <span className="text-accent">openvino</span> --xml --bin
                    </div>
                </section>

                <div className="p-8 glass rounded-3xl border-primary/10 flex gap-4 items-start">
                    <Info className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h5 className="font-bold text-white mb-2 italic underline decoration-primary underline-offset-4">Intermediate Representation</h5>
                        <p className="text-zinc-500 text-sm">OpenVINO exports generate an .xml and .bin pair. For IoT deployments, ensure the OpenVINO runtime version on your target matches the EdgeAI SDK version.</p>
                    </div>
                </div>
            </div>
        </DocsLayout>
    );
}
