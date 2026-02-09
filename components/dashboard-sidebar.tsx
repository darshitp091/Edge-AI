"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    Cpu,
    Database,
    Home,
    Settings,
    Zap,
    ChevronRight,
    Shield,
    History
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./logo";

const menuItems = [
    { name: "Overview", icon: Home, href: "/dashboard" },
    { name: "Neural Compression", icon: Cpu, href: "/dashboard/compress" },
    { name: "Model Gallery", icon: Database, href: "/dashboard/models" },
    { name: "Performance Analysis", icon: BarChart3, href: "/dashboard/analytics" },
    { name: "Optimization Logs", icon: History, href: "/dashboard/logs" },
    { name: "Neural Key Settings", icon: Settings, href: "/dashboard/settings" },
];

export default function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-72 h-screen glass border-r border-primary/20 flex flex-col p-6 space-y-8 sticky top-0 overflow-y-auto">
            {/* Sidebar Brand */}
            <Link href="/" className="px-2">
                <Logo size="md" />
            </Link>

            {/* Navigation */}
            <nav className="flex-grow space-y-2">
                <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest px-4 mb-4">Command Center</p>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 group",
                                isActive
                                    ? "bg-primary text-white glow-blue"
                                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100 border border-transparent hover:border-white/10"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-zinc-500 group-hover:text-primary transition-colors")} />
                                <span className="text-sm font-semibold">{item.name}</span>
                            </div>
                            {isActive && <ChevronRight className="h-4 w-4" />}
                        </Link>
                    );
                })}
            </nav>

            {/* System Status Card */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="relative h-2 w-2">
                        <div className="absolute inset-0 bg-primary/50 rounded-full animate-ping" />
                        <div className="h-full w-full bg-primary rounded-full relative" />
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-zinc-300">Edge Guard Active</span>
                </div>
                <div className="space-y-2">
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-primary glow-blue rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold">
                        <span>Neural Capacity</span>
                        <span className="text-primary">85%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
