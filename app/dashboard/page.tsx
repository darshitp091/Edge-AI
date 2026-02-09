"use client";

import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Cpu,
    Database,
    LineChart,
    UploadCloud,
    Zap,
    Activity,
    Timer,
    PieChart
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
    { label: "Total Artifacts", value: "154", icon: Database, color: "text-primary" },
    { label: "Mean Efficiency", value: "84.2%", icon: Zap, color: "text-yellow-500" },
    { label: "Active Jobs", value: "03", icon: Activity, color: "text-green-500" },
    { label: "Total Saved", value: "$4.2K", icon: LineChart, color: "text-purple-500" },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen flex bg-background">
            <DashboardSidebar />
            <div className="flex-grow flex flex-col">
                <DashboardHeader />

                <main className="p-8 space-y-8 max-w-7xl">
                    {/* Welcome Section */}
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black tracking-tight text-white">Neural Dashboard</h1>
                            <p className="text-zinc-500 text-sm">Synchronized with Edge Hub v1.0.4 - All systems nominal.</p>
                        </div>
                        <Button className="bg-primary hover:bg-primary/90 rounded-2xl h-12 px-6 font-bold shadow-lg shadow-primary/20">
                            <UploadCloud className="mr-2 h-5 w-5" />
                            New Compression Task
                        </Button>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass p-6 rounded-[2rem] border-white/5 flex flex-col justify-between h-32 group hover:border-primary/30 transition-all cursor-pointer"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className={stat.color}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <ArrowUpRight className="h-4 w-4 text-zinc-600 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">{stat.label}</p>
                                        <p className="text-2xl font-black text-white">{stat.value}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Visualizer Area */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="glass rounded-[2.5rem] p-8 min-h-[400px] border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8">
                                    <div className="flex gap-2">
                                        <div className="h-2 w-12 bg-primary rounded-full" />
                                        <div className="h-2 w-12 bg-white/10 rounded-full" />
                                    </div>
                                </div>

                                <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3">
                                    <PieChart className="h-5 w-5 text-primary" />
                                    Neural Performance Matrix
                                </h2>

                                <div className="flex items-center justify-center h-64 border-2 border-dashed border-white/5 rounded-3xl group-hover:border-primary/20 transition-all">
                                    <div className="text-center space-y-4">
                                        <div className="h-16 w-16 glass rounded-full flex items-center justify-center mx-auto mb-4 border-primary/20">
                                            <Activity className="h-6 w-6 text-primary animate-pulse" />
                                        </div>
                                        <p className="text-zinc-500 text-sm font-medium">Neural visualization core initializing...</p>
                                        <p className="text-[10px] uppercase font-black text-primary tracking-widest px-4 py-1 glass rounded-full inline-block">Real-time Hook active</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase font-bold text-zinc-500">Peak Latency</p>
                                        <p className="text-lg font-black text-white">0.42ms <span className="text-[10px] text-green-500">-12%</span></p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase font-bold text-zinc-500">Power Efficient</p>
                                        <p className="text-lg font-black text-white">99.8% <span className="text-[10px] text-primary">MAX</span></p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase font-bold text-zinc-500">Sync Rate</p>
                                        <p className="text-lg font-black text-white">100% <span className="text-[10px] text-zinc-600">Locked</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Data Area */}
                        <div className="space-y-8">
                            <div className="glass rounded-[2.5rem] p-8 border-primary/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
                                <h2 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                                    <Timer className="h-5 w-5 text-primary" />
                                    Active Pipelines
                                </h2>

                                <div className="space-y-4">
                                    {[1, 2, 3].map((job) => (
                                        <div key={job} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group cursor-pointer">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-bold text-zinc-300">Model_v{job}.onnx</span>
                                                <span className="text-[10px] font-black uppercase text-primary">In Progress</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-primary glow-blue"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${30 + job * 20}%` }}
                                                    transition={{ duration: 1, delay: job * 0.2 }}
                                                />
                                            </div>
                                            <div className="flex justify-between mt-2 text-[10px] font-bold text-zinc-500">
                                                <span>Quantization (INT8)</span>
                                                <span>{30 + job * 20}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button variant="ghost" className="w-full mt-6 text-zinc-500 hover:text-white font-bold text-xs uppercase tracking-widest">
                                    View Core Queue
                                </Button>
                            </div>

                            {/* Hardware Targets */}
                            <div className="glass rounded-[2.5rem] p-8 border-white/5">
                                <h2 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                                    <Cpu className="h-5 w-5 text-zinc-400" />
                                    Neural Nodes
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {['Jetson AGX', 'Pi 5', 'A17 Pro', 'Tensor G3', 'Snapdragon 8 Gen 3'].map((node) => (
                                        <span key={node} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-zinc-400 hover:text-white hover:border-primary/50 transition-all cursor-crosshair">
                                            {node}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
