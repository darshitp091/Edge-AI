"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone, MapPin, Send, Zap, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                                    Contact <span className="text-gradient">Core Support</span>
                                </h1>
                                <p className="text-xl text-zinc-400 font-light max-w-xl leading-relaxed">
                                    Have a technical question or need a custom enterprise compression pipeline? Our neural engineers are standing by.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="h-10 w-10 glass rounded-xl flex items-center justify-center border-primary/20">
                                        <Mail className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-black uppercase text-zinc-500 tracking-widest">Email Endpoint</p>
                                        <p className="text-white font-bold">neural@edgeai.com</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-10 w-10 glass rounded-xl flex items-center justify-center border-primary/20">
                                        <MessageSquare className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-black uppercase text-zinc-500 tracking-widest">Internal Slack</p>
                                        <p className="text-white font-bold">edgeai.slack.com</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-10 w-10 glass rounded-xl flex items-center justify-center border-primary/20">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-black uppercase text-zinc-500 tracking-widest">Physical Node</p>
                                        <p className="text-white font-bold">Silicon Valley, CA</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-10 w-10 glass rounded-xl flex items-center justify-center border-primary/20">
                                        <Zap className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-black uppercase text-zinc-500 tracking-widest">Response Latency</p>
                                        <p className="text-white font-bold">&lt; 24 Neural Cycles</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 flex gap-4">
                                <Button variant="ghost" size="icon" className="glass h-12 w-12 rounded-2xl border-white/5 hover:border-primary/50 text-zinc-500 hover:text-primary">
                                    <Github className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="glass h-12 w-12 rounded-2xl border-white/5 hover:border-primary/50 text-zinc-500 hover:text-primary">
                                    <Twitter className="h-5 w-5" />
                                </Button>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass p-10 md:p-12 rounded-[3.5rem] border-primary/20 relative"
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <Send className="h-32 w-32 text-primary -rotate-12" />
                            </div>

                            <form className="space-y-6 relative z-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] items-center gap-2 uppercase font-black text-zinc-500 tracking-widest ml-1 flex"><span className="h-1.5 w-1.5 bg-primary rounded-full" /> Full Name</Label>
                                        <Input placeholder="John Doe" className="bg-white/5 border-zinc-800 focus:border-primary/50 h-14 rounded-2xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] items-center gap-2 uppercase font-black text-zinc-500 tracking-widest ml-1 flex"><span className="h-1.5 w-1.5 bg-primary rounded-full" /> Work Email</Label>
                                        <Input placeholder="john@company.com" className="bg-white/5 border-zinc-800 focus:border-primary/50 h-14 rounded-2xl" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] items-center gap-2 uppercase font-black text-zinc-500 tracking-widest ml-1 flex"><span className="h-1.5 w-1.5 bg-primary rounded-full" /> Inquiry Subject</Label>
                                    <Input placeholder="Enterprise Custom Pipeline" className="bg-white/5 border-zinc-800 focus:border-primary/50 h-14 rounded-2xl" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] items-center gap-2 uppercase font-black text-zinc-500 tracking-widest ml-1 flex"><span className="h-1.5 w-1.5 bg-primary rounded-full" /> Message Payload</Label>
                                    <textarea
                                        placeholder="Describe your optimization needs..."
                                        className="w-full min-h-[150px] p-6 bg-white/5 border border-zinc-800 rounded-3xl focus:border-primary/50 focus:outline-none transition-all placeholder:text-zinc-600 text-sm"
                                    />
                                </div>

                                <Button className="w-full h-16 bg-primary hover:bg-primary/90 glow-blue text-lg font-black rounded-2xl">
                                    Transmit Data
                                    <Send className="ml-2 h-5 w-5" />
                                </Button>
                            </form>
                        </motion.div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
