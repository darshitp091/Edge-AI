"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import ModelUpload from "@/components/model-upload";
import { motion } from "framer-motion";
import {
    Settings2,
    Cpu,
    Zap,
    ShieldCheck,
    Gauge,
    ChevronRight,
    Database,
    ArrowRight,
    Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

import { usePlan } from "@/hooks/use-plan";

export default function CompressionPage() {
    const { features, tier, loading } = usePlan();
    const [config, setConfig] = useState({
        quantization: "int8",
        pruning: 30,
        hardware: "jetson",
        distillation: false,
        advancedOptim: true
    });

    return (
        <div className="min-h-screen flex bg-background">
            <DashboardSidebar />
            <div className="flex-grow flex flex-col">
                <DashboardHeader />

                <main className="p-8 space-y-8 max-w-7xl">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black tracking-tight text-white">Neural Optimizer</h1>
                        <p className="text-zinc-500 text-sm">Configure your compression pipeline for target hardware.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Step 1: Upload */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-xs font-black shadow-lg shadow-primary/20">1</div>
                                <h2 className="text-lg font-bold text-white">Model Ingestion</h2>
                            </div>
                            <ModelUpload />
                        </div>

                        {/* Step 2: Configure */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-black border border-white/10">2</div>
                                <h2 className="text-lg font-bold text-white">Pipeline Configuration</h2>
                            </div>

                            <div className="glass rounded-[2.5rem] p-8 border-white/5 space-y-8">
                                {/* Quantization Mode */}
                                <div className="space-y-4">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Quantization Architecture</Label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['FP16', 'INT8', 'INT4'].map((mode) => {
                                            const isRestricted = mode === 'INT4' && !features.canUseInt4;
                                            if (isRestricted) return null;

                                            return (
                                                <button
                                                    key={mode}
                                                    onClick={() => setConfig({ ...config, quantization: mode.toLowerCase() })}
                                                    className={`
                                                      p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 group relative
                                                      ${config.quantization === mode.toLowerCase()
                                                            ? 'bg-primary/10 border-primary text-white'
                                                            : 'bg-white/5 border-white/5 text-zinc-500 hover:border-white/20'}
                                                    `}
                                                >
                                                    <Zap className={`h-4 w-4 ${config.quantization === mode.toLowerCase() ? 'text-primary' : 'text-zinc-600'}`} />
                                                    <span className="text-xs font-black">{mode}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Pruning Slider */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Pruning Intensity</Label>
                                        <span className="text-primary font-black text-sm">{config.pruning}%</span>
                                    </div>
                                    <Slider
                                        defaultValue={[30]}
                                        max={80}
                                        step={5}
                                        onValueChange={(val: number[]) => setConfig({ ...config, pruning: val[0] })}
                                        className="py-4"
                                    />
                                    <p className="text-[10px] text-zinc-600 font-medium italic">Estimated model size reduction: {config.pruning * 1.5}%</p>
                                </div>

                                {/* Target Hardware */}
                                <div className="space-y-4">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Target Hardware Node</Label>
                                    <div className="space-y-2">
                                        {[
                                            { id: 'jetson', name: 'NVIDIA Jetson / TensorRT', icon: Cpu, restricted: false },
                                            { id: 'mobile', name: 'Mobile NPU (iOS/Android)', icon: ShieldCheck, restricted: !features.customHardware },
                                            { id: 'generic', name: 'Generic CPU (llama.cpp)', icon: Gauge, restricted: false },
                                        ].filter(hw => !hw.restricted).map((hw) => (
                                            <button
                                                key={hw.id}
                                                onClick={() => setConfig({ ...config, hardware: hw.id })}
                                                className={`
                                                  w-full p-4 rounded-2xl border transition-all flex items-center justify-between group
                                                  ${config.hardware === hw.id
                                                        ? 'bg-primary/10 border-primary text-white'
                                                        : 'bg-white/5 border-white/5 text-zinc-500 hover:border-white/20'}
                                                `}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <hw.icon className={`h-4 w-4 ${config.hardware === hw.id ? 'text-primary' : 'text-zinc-600'}`} />
                                                    <span className="text-sm font-bold">{hw.name}</span>
                                                </div>
                                                <ChevronRight className={`h-4 w-4 opacity-0 group-hover:opacity-100 transition-all ${config.hardware === hw.id ? 'opacity-100' : ''}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Advanced Toggles */}
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    {features.canUseDistillation && (
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <div className="flex items-center gap-2">
                                                    <Label className="text-sm font-bold text-white">Knowledge Distillation</Label>
                                                </div>
                                                <p className="text-[10px] text-zinc-500">Use teacher model to recover accuracy</p>
                                            </div>
                                            <Switch
                                                checked={config.distillation}
                                                onCheckedChange={(val: boolean) => setConfig({ ...config, distillation: val })}
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-sm font-bold text-white">Hardware-Aware Search</Label>
                                            <p className="text-[10px] text-zinc-500">NAS-based architecture search</p>
                                        </div>
                                        <Switch
                                            checked={config.advancedOptim}
                                            onCheckedChange={(val: boolean) => setConfig({ ...config, advancedOptim: val })}
                                        />
                                    </div>
                                </div>

                                <Button
                                    onClick={() => {
                                        const jobId = localStorage.getItem('current_job_id');
                                        if (!jobId) {
                                            alert("Please ingest a neural artifact first.");
                                            return;
                                        }
                                        // Start the optimization process
                                        window.location.href = `/dashboard/analytics?job=${jobId}`;
                                    }}
                                    className="w-full h-14 bg-primary hover:bg-primary/90 glow-blue rounded-2xl font-black text-lg group"
                                >
                                    Initiate Neural Pipeline
                                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
