"use client";

import DocsLayout from "@/components/docs-layout";
import { GraduationCap, Brain, Users, Zap } from "lucide-react";

export default function DistillationPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "Compression Techniques" }, { name: "Knowledge Distillation" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        Knowledge <span className="text-gradient">Distillation</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Train compact "Student" networks to inherit the intelligence of massive "Teacher" models.
                    </p>
                </div>

                <section className="space-y-8">
                    <div className="flex items-center gap-4">
                        <GraduationCap className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl font-black italic text-white tracking-tight">The Teacher-Student Paradigm</h2>
                    </div>
                    <p className="text-zinc-500 font-medium leading-relaxed">Knowledge distillation is the process of transferring the Dark Knowledge (probability distributions) from a complex model to a lighter architecture. The student doesn't just learn if an image is a "cat"; it learns how sure the teacher was that it wasn't a "dog".</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6 group hover:border-primary/20 transition-all">
                        <h3 className="text-2xl font-black italic text-white flex items-center gap-3">
                            <Brain className="h-6 w-6 text-zinc-600 group-hover:text-primary transition-colors" />
                            Teacher
                        </h3>
                        <p className="text-zinc-500 text-sm font-medium">Massive architecture (e.g., GPT-4, Llama-70B, ViT-Huge) used to generate soft-labels for training.</p>
                    </div>
                    <div className="glass p-10 rounded-[3rem] border-white/5 space-y-6 group hover:border-accent/20 transition-all">
                        <h3 className="text-2xl font-black italic text-white flex items-center gap-3">
                            <Users className="h-6 w-6 text-zinc-600 group-hover:text-accent transition-colors" />
                            Student
                        </h3>
                        <p className="text-zinc-500 text-sm font-medium">Ultra-light architecture (e.g., MobileNet, TinyLlama) that achieves 90% accuracy with 10% parameters.</p>
                    </div>
                </div>

                <div className="glass p-1 rounded-[3rem] border-white/5 overflow-hidden">
                    <div className="p-10 space-y-6">
                        <h3 className="text-2xl font-black italic text-white italic">Distillation Command</h3>
                        <p className="text-zinc-500">Provide both models and your training dataset to begin the neural transfer.</p>
                        <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-sm text-zinc-300">
                            edge-ai <span className="text-primary italic">distill</span> --teacher teacher.pt --student student.pt --data ./train_set
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 p-8 glass rounded-3xl border-primary/10 items-center">
                    <Zap className="h-8 w-8 text-primary" />
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-600">This process usually requires 12-24 hours of GPU time for optimal results.</p>
                </div>
            </div>
        </DocsLayout>
    );
}
