import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import {
    Database,
    Search,
    Download,
    Trash2,
    ExternalLink,
    ChevronRight,
    Zap,
    Cpu,
    MoreVertical,
    Activity,
    ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ModelGalleryPage() {
    const [dbModels, setDbModels] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchModels = async () => {
            const { data, error } = await supabase
                .from('models')
                .select(`
                    *,
                    jobs (
                        status,
                        config
                    )
                `)
                .order('created_at', { ascending: false });

            if (data && !error) {
                setDbModels(data);
            }
            setIsLoading(false);
        };

        fetchModels();
    }, []);
    return (
        <div className="min-h-screen flex bg-background">
            <DashboardSidebar />
            <div className="flex-grow flex flex-col">
                <DashboardHeader />

                <main className="p-8 space-y-8 max-w-7xl">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black tracking-tight text-white">Model Gallery</h1>
                            <p className="text-zinc-500 text-sm">Managed neural artifacts optimized for edge deployment.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="relative group w-64">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Search models..."
                                    className="pl-12 bg-white/5 border-zinc-800 focus:border-primary/50 h-11 rounded-2xl"
                                />
                            </div>
                            <Button className="bg-primary hover:bg-primary/90 glow-blue rounded-2xl h-11 px-6 font-bold">
                                Compress New
                            </Button>
                        </div>
                    </div>

                    <div className="glass rounded-[3rem] border-white/5 overflow-hidden">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-8 py-5 text-[10px] uppercase font-black text-zinc-500 tracking-widest">Model Artifact</th>
                                    <th className="px-8 py-5 text-[10px] uppercase font-black text-zinc-500 tracking-widest">Metrics</th>
                                    <th className="px-8 py-5 text-[10px] uppercase font-black text-zinc-500 tracking-widest">Optimization</th>
                                    <th className="px-8 py-5 text-[10px] uppercase font-black text-zinc-500 tracking-widest">Inference</th>
                                    <th className="px-8 py-5 text-[10px] uppercase font-black text-zinc-500 tracking-widest">Status</th>
                                    <th className="px-8 py-5 text-[10px] uppercase font-black text-zinc-500 tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center text-zinc-500 font-bold animate-pulse uppercase tracking-[0.5em]">
                                            Synchronizing Neural Inventory...
                                        </td>
                                    </tr>
                                ) : dbModels.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center text-zinc-500 font-bold uppercase tracking-widest text-xs">
                                            No personal artifacts detected. Start by <Link href="/dashboard/compress" className="text-primary hover:underline">Initializing a Pipeline</Link>.
                                        </td>
                                    </tr>
                                ) : dbModels.map((model: any, i: number) => (
                                    <motion.tr
                                        key={model.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group hover:bg-white/[0.01] transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 glass rounded-xl flex items-center justify-center border-white/10 group-hover:border-primary/50 transition-all">
                                                    <Database className="h-5 w-5 text-zinc-500 group-hover:text-primary transition-colors" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-sm">{model.name}</p>
                                                    <p className="text-[9px] text-zinc-500 font-mono truncate max-w-[200px]" title={model.sha256_hash}>
                                                        SHA-256: {model.sha256_hash?.slice(0, 16)}...
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <Activity className="h-3 w-3 text-zinc-600" />
                                                    <span className="text-xs font-bold text-zinc-400">{(model.original_size / (1024 * 1024)).toFixed(1)}MB Original</span>
                                                </div>
                                                {model.is_encrypted && (
                                                    <div className="flex items-center gap-1.5 text-[8px] text-primary font-black uppercase tracking-tighter">
                                                        <ShieldCheck className="h-2.5 w-2.5" />
                                                        AES-256 Secured
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                                                {model.jobs?.[0]?.config?.quantization || 'INT8 Standard'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <Zap className="h-3 w-3 text-yellow-500" />
                                                <span className="text-xs font-bold text-white">Pending Analytics</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-1.5 w-1.5 rounded-full ${model.jobs?.[0]?.status === 'completed' ? 'bg-green-500 glow-green' :
                                                    model.jobs?.[0]?.status === 'processing' ? 'bg-primary animate-pulse' : 'bg-red-500'
                                                    }`} />
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${model.jobs?.[0]?.status === 'completed' ? 'text-green-500' :
                                                    model.jobs?.[0]?.status === 'processing' ? 'text-primary' : 'text-red-500'
                                                    }`}>
                                                    {model.jobs?.[0]?.status || 'Queued'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-9 w-9 glass rounded-xl border-white/5 hover:border-primary/50 transition-all opacity-0 group-hover:opacity-100">
                                                    <Download className="h-4 w-4 text-zinc-400 group-hover:text-primary" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 glass rounded-xl border-white/5 hover:border-red-500/50 transition-all opacity-0 group-hover:opacity-100">
                                                    <Trash2 className="h-4 w-4 text-zinc-400 group-hover:text-red-500" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 glass rounded-xl border-white/5 hover:border-white/20 transition-all">
                                                    <MoreVertical className="h-4 w-4 text-zinc-500" />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="flex justify-between items-center px-4">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Showing 5 of 154 neural artifacts</p>
                        <div className="flex gap-2">
                            <Button variant="outline" className="glass border-white/5 h-8 w-8 p-0 rounded-lg hover:border-primary/50 text-zinc-500">
                                1
                            </Button>
                            <Button variant="outline" className="glass border-white/5 h-8 w-8 p-0 rounded-lg text-primary border-primary/40">
                                2
                            </Button>
                            <Button variant="outline" className="glass border-white/5 h-8 w-8 p-0 rounded-lg hover:border-primary/50 text-zinc-500">
                                3
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
