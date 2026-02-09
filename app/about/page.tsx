"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, BrainCircuit } from "lucide-react";

const valueProps = [
    {
        icon: BrainCircuit,
        title: "Intelligence at the Edge",
        description: "We are bridging the gap between massive AI models and constrained hardware environments."
    },
    {
        icon: Zap,
        title: "10x Faster Deployment",
        description: "Our automated pipelines reduce model optimization time from weeks to minutes."
    },
    {
        icon: Shield,
        title: "Privacy First",
        description: "On-device processing ensures sensitive data never leaves the user's hands."
    },
    {
        icon: BarChart3,
        title: "Economic Efficiency",
        description: "Reduce cloud inference costs by 90% while improving user experience."
    }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Mission Section */}
                    <div className="max-w-4xl mx-auto text-center space-y-8 mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                                Redefining the <span className="text-gradient">Neural Frontier</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                                EdgeAI started with a single realization: the future of artificial intelligence isn&apos;t just in the cloud—it&apos;s in the palms of our hands, the vehicles we drive, and the factories we build.
                            </p>
                        </motion.div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
                        {[
                            { label: "Models Compressed", value: "2M+" },
                            { label: "Cloud Costs Saved", value: "$45M" },
                            { label: "Active Nodes", value: "1.5M+" },
                            { label: "Developer Community", value: "180K" }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass p-8 rounded-[2rem] border-white/5 text-center"
                            >
                                <div className="text-3xl md:text-4xl font-black text-primary mb-2 tracking-tighter">{stat.value}</div>
                                <div className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.2em]">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Core Values */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                        {valueProps.map((prop, i) => {
                            const Icon = prop.icon;
                            return (
                                <motion.div
                                    key={prop.title}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="glass p-10 rounded-[3rem] border-primary/10 flex flex-col gap-6 group hover:border-primary/30 transition-all"
                                >
                                    <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-black text-white">{prop.title}</h3>
                                        <p className="text-zinc-400 leading-relaxed font-medium">{prop.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative overflow-hidden glass rounded-[4rem] p-12 md:p-24 border-primary/20 text-center"
                    >
                        <div className="absolute inset-0 bg-primary/5 blur-[120px] -z-10" />
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to Optimize Your <span className="text-gradient">Hardware Horizon?</span></h2>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <button className="px-10 py-5 bg-primary text-white font-black rounded-full glow-blue hover:scale-105 transition-all text-lg tracking-tight">
                                Get Started Free
                            </button>
                            <button className="px-10 py-5 glass border-white/20 text-white font-black rounded-full hover:bg-white/10 transition-all text-lg tracking-tight">
                                View Enterprise Solutions
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
