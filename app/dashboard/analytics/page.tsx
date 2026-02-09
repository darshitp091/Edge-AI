import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Cell,
    PieChart,
    Pie
} from "recharts";
import {
    TrendingDown,
    Zap,
    Cpu,
    Activity,
    Download,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";

const latencyData = [
    { name: 'ResNet-50', original: 45, optimized: 12 },
    { name: 'BERT-Base', original: 120, optimized: 35 },
    { name: 'YOLOv8', original: 85, optimized: 22 },
    { name: 'ViT', original: 210, optimized: 58 },
    { name: 'Llama-7B', original: 450, optimized: 140 },
];

const resourceData = [
    { name: 'Weights', value: 850, fill: '#3b82f6' },
    { name: 'Activations', value: 240, fill: '#60a5fa' },
    { name: 'Optimizer', value: 120, fill: '#2563eb' },
];

const efficiencyFlow = [
    { time: '00:00', efficiency: 78 },
    { time: '04:00', efficiency: 82 },
    { time: '08:00', efficiency: 85 },
    { time: '12:00', efficiency: 89 },
    { time: '16:00', efficiency: 94 },
    { time: '20:00', efficiency: 91 },
    { time: '23:59', efficiency: 95 },
];

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AnalyticsContent() {
    const searchParams = useSearchParams();
    const jobId = searchParams.get('job');
    const [latencyData, setLatencyData] = useState<Record<string, any>[]>([]);
    const [resourceData, setResourceData] = useState<Record<string, any>[]>([]);
    const [efficiencyFlow, setEfficiencyFlow] = useState<Record<string, any>[]>([]);
    const [totalVRAM, setTotalVRAM] = useState("0GB");

    useEffect(() => {
        const fetchData = async () => {
            // Fetch models and their metrics
            const { data: modelsData, error: modelsError } = await supabase
                .from('models')
                .select(`
                    name,
                    original_size,
                    optimized_size,
                    metrics (
                        original_latency,
                        optimized_latency,
                        memory_original,
                        memory_optimized,
                        efficiency_score
                    )
                `)
                .order('created_at', { ascending: false })
                .limit(5);

            if (modelsData && !modelsError) {
                // Transform for Latency Chart
                const chartLatency = modelsData.map(m => ({
                    name: m.name.length > 10 ? m.name.substring(0, 8) + '...' : m.name,
                    original: m.metrics?.[0]?.original_latency || 0,
                    optimized: m.metrics?.[0]?.optimized_latency || 0
                }));
                setLatencyData(chartLatency.length > 0 ? chartLatency : [
                    { name: 'No Data', original: 0, optimized: 0 }
                ]);

                // Transform for Memory Chart (using first model's memory for demo)
                const currentModel = modelsData[0];
                if (currentModel && currentModel.metrics?.[0]) {
                    const met = currentModel.metrics[0];
                    setResourceData([
                        { name: 'Weights', value: met.memory_original * 0.7, fill: '#3b82f6' },
                        { name: 'Activations', value: met.memory_original * 0.2, fill: '#60a5fa' },
                        { name: 'Optimizer', value: met.memory_original * 0.1, fill: '#2563eb' },
                    ]);
                    setTotalVRAM(`${(met.memory_original / 1024).toFixed(1)}GB`);
                }

                // Efficiency logic (mocking trend based on DB scores)
                const trend = modelsData.reverse().map((m, i) => ({
                    time: `${i * 4}:00`,
                    efficiency: m.metrics?.[0]?.efficiency_score || 70
                }));
                setEfficiencyFlow(trend);
            }
        };

        fetchData();
    }, [jobId]);

    return (
        <div className="min-h-screen flex bg-background">
            <DashboardSidebar />
            <div className="flex-grow flex flex-col">
                <DashboardHeader />

                <main className="p-8 space-y-8 max-w-7xl">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black tracking-tight text-white italic">Neural Analytics</h1>
                            {jobId ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                    <p className="text-primary text-xs font-black uppercase tracking-widest">Active Stream: {jobId.slice(0, 8)}...</p>
                                </div>
                            ) : (
                                <p className="text-zinc-500 text-sm">Quantifying the impact of edge-aware optimization.</p>
                            )}
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" className="glass border-white/5 rounded-2xl h-11 px-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter Stream
                            </Button>
                            <Button className="bg-primary hover:bg-primary/90 glow-blue rounded-2xl h-11 px-6 font-bold">
                                <Download className="mr-2 h-4 w-4" />
                                Export Data
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Latency Comparison */}
                        <div className="lg:col-span-2 glass rounded-[2.5rem] p-8 border-white/5 space-y-8">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-black text-white flex items-center gap-3">
                                    <TrendingDown className="h-5 w-5 text-primary" />
                                    Latency Reduction (ms)
                                </h2>
                                <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
                                    <div className="flex items-center gap-2"><div className="h-2 w-2 bg-zinc-800 rounded-full" /> Original</div>
                                    <div className="flex items-center gap-2"><div className="h-2 w-2 bg-primary rounded-full" /> Optimized</div>
                                </div>
                            </div>

                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={latencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                        <XAxis dataKey="name" stroke="#52525b" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                                        <YAxis stroke="#52525b" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#09090b', borderRadius: '16px', border: '1px solid #27272a', fontSize: '12px' }}
                                            itemStyle={{ fontWeight: 'bold' }}
                                        />
                                        <Bar dataKey="original" fill="#18181b" radius={[4, 4, 0, 0]} barSize={20} />
                                        <Bar dataKey="optimized" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} className="glow-blue" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Memory Pie Chart */}
                        <div className="glass rounded-[2.5rem] p-8 border-white/5 space-y-8">
                            <h2 className="text-xl font-black text-white flex items-center gap-3">
                                <Cpu className="h-5 w-5 text-primary" />
                                Memory Allocation
                            </h2>
                            <div className="h-[250px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={resourceData}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {resourceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-black text-white">{totalVRAM}</span>
                                    <span className="text-[10px] uppercase font-bold text-zinc-500">Total VRAM</span>
                                </div>
                            </div>
                            <div className="space-y-4 pt-4">
                                {resourceData.map((item) => (
                                    <div key={item.name} className="flex justify-between items-center text-xs font-bold">
                                        <span className="text-zinc-500 flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                                            {item.name}
                                        </span>
                                        <span className="text-white">{item.value}MB</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Efficiency Over Time */}
                        <div className="lg:col-span-3 glass rounded-[3rem] p-10 border-primary/10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-10">
                                <Zap className="h-16 w-16 text-primary opacity-10 animate-pulse" />
                            </div>

                            <div className="mb-8">
                                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                                    <Activity className="h-6 w-6 text-primary" />
                                    Global Efficiency Sync
                                </h2>
                                <p className="text-zinc-500 text-sm mt-1">Real-time throughput analysis across all optimized endpoints.</p>
                            </div>

                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={efficiencyFlow} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorEff" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="time" stroke="#52525b" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorEff)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function AnalyticsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary font-black uppercase tracking-[0.5em] animate-pulse">Initializing Neural Stream...</div>}>
            <AnalyticsContent />
        </Suspense>
    );
}
