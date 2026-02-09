"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import {
    Cpu,
    Rocket,
    Globe,
    Zap,
    ChevronRight,
    MapPin,
    ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const listings = [
    { title: "Senior Neural Engineer", dept: "Architecture", location: "San Francisco / Remote", type: "Full-time" },
    { title: "ML Platform Engineer", dept: "Infrastructure", location: "Global / Decentralized", type: "Full-time" },
    { title: "Technical Product Manager", dept: "Neural Ops", location: "London / Remote", type: "Full-time" },
    { title: "Lead Designer", dept: "Interface", location: "Remote", type: "Contract" },
];

export default function CareersPage() {
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
                            className="text-center space-y-6"
                        >
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
                                Bridge the <span className="text-gradient">Neural Gap</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-zinc-500 font-light leading-relaxed">
                                Join the mission to democratize high-performance AI. We're building the infrastructure that powers artificial intelligence on every chip.
                            </p>
                            <div className="pt-8 flex justify-center gap-4">
                                <Button className="bg-primary hover:bg-primary/90 px-8 py-6 rounded-2xl font-black uppercase tracking-widest text-xs glow-blue">
                                    View Open Roles
                                </Button>
                                <Button variant="ghost" className="px-8 py-6 rounded-2xl font-black uppercase tracking-widest text-xs glass border-white/10">
                                    Our Mission
                                </Button>
                            </div>
                        </motion.div>

                        {/* Culture Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { icon: Globe, title: "Asynchronous by Default", text: "Work from anywhere in the world. We value deep work over meeting time." },
                                { icon: Cpu, title: "Hardware Obsessed", text: "We live at the intersection of silicon and software. Every bit counts." },
                                { icon: Rocket, title: "Ultra Fast Pace", text: "We ship daily. The edge moves fast, and so do we." },
                                { icon: Zap, title: "Impact Driven", text: "Your code will run on millions of devices within weeks of deployment." },
                            ].map((card, i) => (
                                <div key={card.title} className="glass p-10 rounded-[3rem] border-white/5 group hover:border-primary/20 transition-all">
                                    <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                        <card.icon className="h-7 w-7 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-4 italic">{card.title}</h3>
                                    <p className="text-zinc-500 leading-relaxed font-medium">{card.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Listings */}
                        <div className="space-y-12">
                            <div className="flex items-end justify-between border-b border-white/10 pb-8">
                                <h2 className="text-4xl font-black text-white italic tracking-tighter">Current Pulsations</h2>
                                <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">4 Active Transmissions</p>
                            </div>

                            <div className="space-y-4">
                                {listings.map((job) => (
                                    <div key={job.title} className="group glass p-8 rounded-[2.5rem] border-white/5 hover:border-primary/40 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer">
                                        <div className="space-y-2">
                                            <h4 className="text-xl font-black text-white group-hover:text-primary transition-colors">{job.title}</h4>
                                            <div className="flex gap-4 items-center">
                                                <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest px-2 py-1 bg-white/5 rounded-md">{job.dept}</span>
                                                <span className="text-xs text-zinc-600 flex items-center gap-1 font-bold">
                                                    <MapPin className="h-3 w-3" />
                                                    {job.location}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-[10px] uppercase font-black text-primary tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Apply Now</span>
                                            <div className="h-12 w-12 glass rounded-2xl flex items-center justify-center border-white/5 group-hover:bg-primary group-hover:text-white transition-all">
                                                <ArrowUpRight className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="glass rounded-[4rem] p-16 text-center border-primary/20 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10 group-hover:bg-primary/10 transition-colors" />
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic">Don't see your shard?</h2>
                            <p className="text-zinc-400 max-w-xl mx-auto mb-10 font-medium">
                                We are always looking for exceptional talent. If you are obsessed with edge AI, send us a neural transmission.
                            </p>
                            <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-6 rounded-2xl font-black uppercase tracking-widest text-xs">
                                General Application
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
