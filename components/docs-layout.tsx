"use client";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ChevronRight,
    Search,
    Terminal,
    Code2,
    Cpu,
    Zap,
    Box,
    Shield,
    Rocket,
    Activity,
    Database,
    Lock,
    Globe,
    BookOpen
} from "lucide-react";
import { cn } from "@/lib/utils";

const docNavigation = [
    {
        group: "Getting Started",
        items: [
            { name: "Quick Start", href: "/docs" },
            { name: "Installation", href: "/docs/installation" },
            { name: "Model Upload Guide", href: "/docs/model-upload" },
            { name: "Compression 101", href: "/docs/compression-101" },
        ]
    },
    {
        group: "Compression Techniques",
        items: [
            { name: "INT8 Quantization", href: "/docs/techniques/quantization" },
            { name: "INT4 Mixed Precision", href: "/docs/techniques/mixed-precision" },
            { name: "Channel Pruning", href: "/docs/techniques/pruning" },
            { name: "Knowledge Distillation", href: "/docs/techniques/distillation" },
        ]
    },
    {
        group: "Export Targets",
        items: [
            { name: "TensorRT (NVIDIA)", href: "/docs/targets/tensorrt" },
            { name: "OpenVINO (Intel)", href: "/docs/targets/openvino" },
            { name: "CoreML (Apple)", href: "/docs/targets/coreml" },
            { name: "TFLite (Mobile)", href: "/docs/targets/tflite" },
            { name: "llama.cpp", href: "/docs/targets/llama-cpp" },
        ]
    },
    {
        group: "API Reference",
        items: [
            { name: "Authentication", href: "/docs/api/auth" },
            { name: "Job Management", href: "/docs/api/jobs" },
            { name: "Streaming Analytics", href: "/docs/api/analytics" },
            { name: "Batch Processing", href: "/docs/api/batch" },
        ]
    }
];

interface DocsLayoutProps {
    children: React.ReactNode;
    breadcrumb: { name: string; href?: string }[];
}

export default function DocsLayout({ children, breadcrumb }: DocsLayoutProps) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-background text-white selection:bg-primary selection:text-white">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4 flex gap-12 relative">
                    {/* Floating Glow Effects */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

                    {/* Desktop Sidebar */}
                    <aside className="w-72 hidden xl:block sticky top-32 h-[calc(100vh-160px)] overflow-y-auto pr-6 scrollbar-hide">
                        <div className="space-y-10 pb-10">
                            {/* Search bar */}
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    placeholder="Search the neural core..."
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold focus:border-primary/50 focus:bg-white/[0.05] transition-all outline-none"
                                />
                            </div>

                            {/* Nav Groups */}
                            {docNavigation.map((group) => (
                                <div key={group.group} className="space-y-4">
                                    <h3 className="text-[10px] uppercase font-bold text-primary tracking-[0.2em] px-2">{group.group}</h3>
                                    <ul className="space-y-1">
                                        {group.items.map((item) => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <li key={item.href}>
                                                    <Link
                                                        href={item.href}
                                                        className={cn(
                                                            "text-sm font-medium flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 group",
                                                            isActive
                                                                ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                                                                : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "h-1.5 w-1.5 rounded-full transition-all duration-300",
                                                            isActive ? "bg-primary scale-125 glow-blue" : "bg-zinc-800"
                                                        )} />
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-grow max-w-4xl min-w-0">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.99, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-10"
                        >
                            {/* Breadcrumbs */}
                            <nav className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase tracking-widest overflow-x-auto no-scrollbar whitespace-nowrap">
                                <Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link>
                                {breadcrumb.map((b, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <ChevronRight className="h-3 w-3 text-zinc-800" />
                                        {b.href ? (
                                            <Link href={b.href} className="hover:text-primary transition-colors">{b.name}</Link>
                                        ) : (
                                            <span className="text-primary italic">{b.name}</span>
                                        )}
                                    </div>
                                ))}
                            </nav>

                            {/* Main Content Rendered Child */}
                            <article className="prose prose-invert prose-zinc max-w-none">
                                {children}
                            </article>

                            {/* Pagination Logic Placeholder */}
                            <div className="pt-16 border-t border-white/5 flex gap-6">
                                {docNavigation.flatMap(g => g.items).map((item, idx, arr) => {
                                    if (pathname === item.href) {
                                        const prev = arr[idx - 1];
                                        const next = arr[idx + 1];
                                        return (
                                            <div key="pagination" className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                                {prev ? (
                                                    <Link href={prev.href} className="glass p-6 rounded-3xl border-white/5 hover:border-primary/20 transition-all group">
                                                        <p className="text-[10px] font-black text-zinc-600 uppercase mb-2">Previous</p>
                                                        <p className="text-lg font-bold text-white group-hover:text-primary transition-colors italic">{prev.name}</p>
                                                    </Link>
                                                ) : <div />}
                                                {next ? (
                                                    <Link href={next.href} className="glass p-6 rounded-3xl border-white/5 hover:border-primary/20 transition-all group text-right">
                                                        <p className="text-[10px] font-black text-zinc-600 uppercase mb-2">Next</p>
                                                        <p className="text-lg font-bold text-white group-hover:text-primary transition-colors italic">{next.name}</p>
                                                    </Link>
                                                ) : <div />}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
