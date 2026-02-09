"use client";

import DocsLayout from "@/components/docs-layout";
import { Scissors, Minimize2, Cpu, Zap } from "lucide-react";

export default function PruningPage() {
    return (
        <DocsLayout breadcrumb={[{ name: "Compression Techniques" }, { name: "Channel Pruning" }]}>
            <div className="space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                        Channel <span className="text-gradient">Pruning</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-light max-w-2xl leading-relaxed">
                        Surgically remove redundant neural channels to create ultra-lean, specialized models.
                    </p>
                </div>

                <section className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Scissors className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-3xl font-black italic text-white tracking-tight">Structured Pruning</h2>
                    </div>
                    <p className="text-zinc-500 font-medium leading-relaxed">Unlike weight pruning (zeroing out individual weights), channel pruning removes entire convolutional filters. This results in direct speedups on standard hardware without needing specialized sparse-matrix engines.</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Magnitude-based", desc: "Removes channels with the smallest weight norms." },
                        { title: "Sensitivity-driven", desc: "Uses Taylor expansion to predict accuracy impact." },
                        { title: "Iterative Refine", desc: "Prune, fine-tune, repeat for 0% accuracy loss." }
                    ].map((card, i) => (
                        <div key={card.title} className="glass p-6 rounded-3xl border-white/5 space-y-3">
                            <h4 className="font-bold text-white italic">{card.title}</h4>
                            <p className="text-xs text-zinc-600 font-bold">{card.desc}</p>
                        </div>
                    ))}
                </div>

                <section className="space-y-6">
                    <h2 className="text-3xl font-black italic text-white tracking-tight">Usage Example</h2>
                    <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-sm text-zinc-300">
                        edge-ai <span className="text-primary italic">compress</span> ./resnet50.pt --method <span className="text-green-500">prune</span> --ratio <span className="text-yellow-500">0.5</span>
                    </div>
                    <p className="text-[10px] font-black text-zinc-700 tracking-[0.2em] uppercase">This removes 50% of redundant channels in the model architecture.</p>
                </section>

                <div className="p-10 glass rounded-[3rem] border-primary/20 bg-primary/5 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-shrink-0">
                        <Minimize2 className="h-12 w-12 text-primary animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2 italic">Why Prune?</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">Pruning is best for models that were over-engineered for simple tasks. A ResNet50 trained on 10 classes can usually be pruned by 80% with no loss in performance.</p>
                    </div>
                </div>
            </div>
        </DocsLayout>
    );
}
