"use client";

import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { motion } from "framer-motion";
import {
    Terminal,
    Search,
    Clock,
    AlertCircle,
    CheckCircle2,
    Cpu,
    ArrowDownCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function LogsPage() {
    const [liveLogs, setLiveLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            const { data, error } = await supabase
                .from('jobs')
                .select(`
                    id,
                    created_at,
                    status,
                    config,
                    models (name)
                `)
                .order('created_at', { ascending: false });

            if (data && !error) {
                setLiveLogs(data);
            }
            setLoading(false);
        };
        fetchLogs();
    }, []);

    return (
        <div className="min-h-screen flex bg-background">
            <DashboardSidebar />
            <div className="flex-grow flex flex-col">
                <DashboardHeader />

                <main className="p-8 space-y-8 max-w-7xl">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black tracking-tight text-white">Optimization Logs</h1>
                            <p className="text-zinc-500 text-sm">Real-time telemetry from the neural optimization core.</p>
                        </div>
                        <div className="relative w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <Input placeholder="Filter logs..." className="pl-12 bg-white/5 border-zinc-800 h-11 rounded-2xl" />
                        </div>
                    </div>

                    <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
                        <div className="bg-white/[0.02] p-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex gap-4">
                                <div className="h-3 w-3 rounded-full bg-primary/20 border border-primary/50" />
                                <div className="h-3 w-3 rounded-full bg-zinc-800 border border-white/10" />
                            </div>
                            <span className="text-[10px] font-black text-zinc-600 tracking-widest uppercase italic">Streaming Engine 4.0.2</span>
                        </div>
                        <div className="p-4 font-mono text-xs leading-relaxed max-h-[600px] overflow-y-auto space-y-2 custom-scrollbar">
                            {loading ? (
                                <div className="py-20 text-center text-zinc-600 animate-pulse font-black uppercase tracking-[0.3em]">
                                    Intercepting Neural Streams...
                                </div>
                            ) : liveLogs.length === 0 ? (
                                <div className="py-20 text-center text-zinc-600 font-bold uppercase tracking-widest">
                                    No neural activity detected.
                                </div>
                            ) : liveLogs.map((log) => (
                                <div key={log.id} className="flex gap-6 py-2 group hover:bg-white/[0.01] transition-all px-4 rounded-lg">
                                    <span className="text-zinc-600 shrink-0">[{new Date(log.created_at).toLocaleString()}]</span>
                                    <span className={`font-bold flex items-center gap-2 w-48 ${log.status === 'completed' ? 'text-green-500' :
                                        log.status === 'failed' ? 'text-red-500' : 'text-primary'
                                        }`}>
                                        {log.status === 'completed' && <CheckCircle2 className="h-3 w-3" />}
                                        {log.status === 'failed' && <AlertCircle className="h-3 w-3" />}
                                        {(log.status === 'processing' || log.status === 'queued') && <Terminal className="h-3 w-3 animate-pulse" />}
                                        {log.status.toUpperCase()} :: {log.config?.quantization?.toUpperCase() || 'OPT'}
                                    </span>
                                    <span className="text-zinc-400">Model: <span className="text-white italic">{log.models?.name || 'Unknown Artifact'}</span></span>
                                    <span className="text-zinc-600 ml-auto flex items-center gap-2">
                                        <Cpu className="h-3 w-3" />
                                        {log.config?.hardware || 'Cloud Grid'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
