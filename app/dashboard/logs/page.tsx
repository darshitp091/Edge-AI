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

const logs = [
    { id: 1, time: "2026-02-07 21:40:12", event: "Optimization Completed", model: "resnet50_v2.onnx", status: "success", hardware: "Jetson Nano" },
    { id: 2, time: "2026-02-07 21:38:45", event: "Layer Decomposition", model: "bert_large.pt", status: "processing", hardware: "A100" },
    { id: 3, time: "2026-02-07 21:35:10", event: "Quantization Failed", model: "mobilenet_v3.h5", status: "error", hardware: "Generic CPU" },
    { id: 4, time: "2026-02-07 21:30:22", event: "Pruning Started", model: "yolov8m.tflite", status: "success", hardware: "iOS NPU" },
    { id: 5, time: "2026-02-07 21:25:00", event: "Upload Verified", model: "unet_stable.onnx", status: "success", hardware: "S3 Bucket" },
];

export default function LogsPage() {
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
                        <div className="p-4 font-mono text-xs leading-relaxed max-h-[600px] overflow-y-auto space-y-2">
                            {logs.map((log) => (
                                <div key={log.id} className="flex gap-6 py-2 group hover:bg-white/[0.01] transition-all px-4 rounded-lg">
                                    <span className="text-zinc-600 shrink-0">[{log.time}]</span>
                                    <span className={`font-bold flex items-center gap-2 w-48 ${log.status === 'success' ? 'text-green-500' :
                                            log.status === 'error' ? 'text-red-500' : 'text-primary'
                                        }`}>
                                        {log.status === 'success' && <CheckCircle2 className="h-3 w-3" />}
                                        {log.status === 'error' && <AlertCircle className="h-3 w-3" />}
                                        {log.status === 'processing' && <Terminal className="h-3 w-3 animate-pulse" />}
                                        {log.event}
                                    </span>
                                    <span className="text-zinc-400">Model: <span className="text-white italic">{log.model}</span></span>
                                    <span className="text-zinc-600 ml-auto flex items-center gap-2">
                                        <Cpu className="h-3 w-3" />
                                        {log.hardware}
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
