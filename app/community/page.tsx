"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import {
    Users,
    MessageSquare,
    Github,
    Twitter,
    Slack,
    ArrowUpRight,
    Search
} from "lucide-react";
import { Button } from "@/components/ui/button";

const channels = [
    { name: "GitHub Discussions", icon: Github, desc: "RFCs, feature requests, and open-source contributions.", count: "14k Members", color: "hover:text-white" },
    { name: "Discord Shard", icon: MessageSquare, desc: "Real-time support and debugging with core engineers.", count: "8k Online", color: "hover:text-blue-400" },
    { name: "Developer Twitter", icon: Twitter, desc: "Latest neural benchmarks and edge AI news.", count: "45k Followers", color: "hover:text-cyan-400" },
    { name: "Enterprise Slack", icon: Slack, desc: "Dedicated channel for Pro and Business operators.", count: "500+ Teams", color: "hover:text-purple-400" },
];

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-background text-white">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto space-y-24">
                        {/* Hero */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center space-y-6"
                        >
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
                                Neural <span className="text-gradient">Ecosystem</span>
                            </h1>
                            <p className="text-xl text-zinc-500 font-light max-w-2xl mx-auto leading-relaxed">
                                Connect with the world's most innovative edge AI engineers. Share benchmarks, optimize shards, and build the future of intelligence together.
                            </p>
                        </motion.div>

                        {/* Channels Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {channels.map((ch, i) => (
                                <div key={ch.name} className={`glass p-10 rounded-[3.5rem] border-white/5 transition-all group cursor-pointer hover:border-primary/40`}>
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="h-14 w-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-all">
                                            <ch.icon className={`h-7 w-7 text-zinc-500 transition-colors ${ch.color}`} />
                                        </div>
                                        <ArrowUpRight className="h-5 w-5 text-zinc-700 group-hover:text-primary transition-all" />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-2xl font-black text-white italic">{ch.name}</h3>
                                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{ch.count}</span>
                                        </div>
                                        <p className="text-zinc-500 font-medium leading-relaxed">{ch.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Showcase section */}
                        <div className="space-y-12">
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-black italic tracking-tight">Built by the Shard</h2>
                                <p className="text-zinc-500 text-sm italic">Amazing projects optimized with EdgeAI</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3].map((id) => (
                                    <div key={id} className="aspect-square glass rounded-[2.5rem] border-white/5 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                                            <div className="h-1 w-8 bg-primary rounded-full" />
                                            <h4 className="font-black text-white text-lg">Project_Shard_0{id}</h4>
                                            <p className="text-zinc-500 text-xs font-medium">Real-time inference on mobile NPU with 98% accuracy retention.</p>
                                            <Button variant="ghost" className="text-[10px] font-black uppercase text-primary tracking-widest">Case Study</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Events CTA */}
                        <div className="glass rounded-[4rem] p-16 text-center border-primary/20 bg-primary/[0.02] relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-16 -mt-16" />
                            <h2 className="text-4xl font-black text-white mb-6">Join the Next <span className="text-gradient">Neural Sprint</span></h2>
                            <p className="text-zinc-400 max-w-xl mx-auto mb-10 font-medium">
                                Our monthly virtual hackathon where we shard the most complex models in existence. Next sprint: Feb 28th.
                            </p>
                            <Button className="bg-primary hover:bg-primary/90 text-white px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-xs glow-blue">
                                Register for Sprint
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
