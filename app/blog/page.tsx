"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import {
    Newspaper,
    Calendar,
    User,
    ChevronRight,
    ArrowRight,
    Search
} from "lucide-react";
import { Button } from "@/components/ui/button";

const posts = [
    {
        title: "The Rise of On-Device Intelligence",
        excerpt: "Why the next decade of AI belongs to the edge, not the data center.",
        date: "Feb 12, 2026",
        author: "Dr. Neural",
        category: "Insights",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "INT4: The New Gold Standard?",
        excerpt: "Exploring the limits of model quantization without losing semantic integrity.",
        date: "Feb 08, 2026",
        author: "Sarah Shard",
        category: "Technical",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800"
    },
    {
        title: "EdgeAI SDK v2.0 Release",
        excerpt: "New support for Apple Neural Engine and custom C++ kernels.",
        date: "Jan 15, 2026",
        author: "Dev Cluster",
        category: "Product",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800"
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-background text-white">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto space-y-20">
                        {/* Blog Header */}
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                            <div className="space-y-4">
                                <h1 className="text-6xl font-black tracking-tighter italic">Neural <span className="text-gradient">Transmissions</span></h1>
                                <p className="text-zinc-500 text-lg max-w-xl font-medium">Stories, research, and product updates from the edge of artificial intelligence.</p>
                            </div>
                            <div className="relative w-full md:w-80 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                                <input placeholder="Search articles..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm font-bold focus:border-primary transition-all" />
                            </div>
                        </div>

                        {/* Featured Post */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative group cursor-pointer"
                        >
                            <div className="aspect-[21/9] w-full glass rounded-[3rem] overflow-hidden border-white/5 relative">
                                <img src={posts[0].image} alt="Featured" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-12 space-y-4 max-w-3xl">
                                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">Featured Article</span>
                                    <h2 className="text-4xl md:text-5xl font-black text-white group-hover:text-primary transition-colors">{posts[0].title}</h2>
                                    <p className="text-zinc-300 text-lg font-medium leading-relaxed">{posts[0].excerpt}</p>
                                    <div className="flex gap-6 pt-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                                        <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {posts[0].date}</span>
                                        <span className="flex items-center gap-2"><User className="h-4 w-4" /> {posts[0].author}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Recent Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.slice(1).map((post, i) => (
                                <div key={post.title} className="group flex flex-col space-y-6">
                                    <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/5 glass relative">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute top-6 left-6">
                                            <span className="px-3 py-1 bg-white/5 backdrop-blur-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full">{post.category}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3 px-2">
                                        <h3 className="text-2xl font-black text-white group-hover:text-primary transition-colors leading-tight italic">{post.title}</h3>
                                        <p className="text-zinc-500 font-medium leading-relaxed line-clamp-2">{post.excerpt}</p>
                                        <div className="flex items-center justify-between pt-4">
                                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{post.date}</span>
                                            <Button variant="ghost" className="text-primary hover:bg-primary/10 font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                                                Read Pulse <ArrowRight className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Newsletter CTA */}
                        <div className="glass rounded-[4rem] p-12 md:p-24 text-center border-primary/20 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/5 blur-[120px] -z-10" />
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 italic">Stay in the <span className="text-gradient">Neural Loop</span></h2>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input placeholder="Enter your email" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:border-primary transition-all" />
                                <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-10 font-black uppercase tracking-widest text-xs h-14 glow-blue">Subscribe</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
