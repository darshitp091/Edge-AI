"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import {
    LifeBuoy,
    Mail,
    MessageSquare,
    BookOpen,
    ChevronRight,
    Search,
    PlayCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-background text-white">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-24">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center space-y-8"
                        >
                            <div className="inline-flex items-center gap-3 glass px-5 py-2 rounded-full border-primary/20">
                                <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">Fast-Pass Support Active</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
                                Neural <span className="text-gradient">Assistance</span>
                            </h1>
                            <div className="relative max-w-2xl mx-auto group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    placeholder="Search shards, docs, or issues..."
                                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-lg font-medium focus:border-primary transition-all focus:ring-4 focus:ring-primary/5"
                                />
                            </div>
                        </motion.div>

                        {/* Help Channels */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { icon: BookOpen, title: "Neural Docs", desc: "Detailed guides on quantization, sharding, and edge deployment.", link: "/docs" },
                                { icon: MessageSquare, title: "Priority Chat", desc: "Real-time debugging for Enterprise and Business accounts.", link: "#" },
                                { icon: Mail, title: "Support Ticket", desc: "Deep technical review of custom model compression pipelines.", link: "/contact" },
                                { icon: PlayCircle, title: "Video Shards", desc: "Quick video walkthroughs for common hardware targets.", link: "#" },
                            ].map((card, i) => (
                                <div key={card.title} className="glass p-10 rounded-[3rem] border-white/5 group hover:border-primary/30 transition-all cursor-pointer">
                                    <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-all">
                                        <card.icon className="h-7 w-7 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-4 italic flex items-center justify-between">
                                        {card.title}
                                        <ChevronRight className="h-5 w-5 text-zinc-700 group-hover:text-primary transition-colors" />
                                    </h3>
                                    <p className="text-zinc-500 leading-relaxed font-medium">{card.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* FAQ Section */}
                        <div className="space-y-12">
                            <h2 className="text-4xl font-black text-white italic tracking-tighter text-center">Common Pulses</h2>
                            <div className="space-y-4">
                                {[
                                    "How do I minimize accuracy loss during INT4 quantization?",
                                    "Which hardware targets support the custom C++ kernels?",
                                    "Is model sharding compatible with custom PyTorch ops?",
                                    "Does the Enterprise trial include performance benchmarking?",
                                ].map((q) => (
                                    <div key={q} className="glass p-8 rounded-3xl border-white/5 hover:bg-white/5 transition-colors cursor-pointer flex justify-between items-center group">
                                        <span className="text-lg font-bold text-zinc-300 group-hover:text-white transition-colors">{q}</span>
                                        <ChevronRight className="h-5 w-5 text-zinc-700 group-hover:translate-x-1 transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom CTA */}
                        <div className="glass rounded-[4rem] p-16 text-center border-primary/20 bg-primary/5 relative overflow-hidden group">
                            <h2 className="text-4xl font-black text-white mb-6 italic">Still Locked?</h2>
                            <p className="text-zinc-400 max-w-xl mx-auto mb-10 font-medium">
                                Technical support is available 24/7 for all operators with a valid neural key.
                            </p>
                            <Button className="bg-primary hover:bg-primary/90 text-white px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-xs glow-blue">
                                Open a Transmission
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
