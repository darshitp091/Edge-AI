"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Download,
    CheckCircle2,
    AlertCircle,
    Zap,
    ExternalLink,
    Search
} from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function HuggingFaceImport() {
    const [repoId, setRepoId] = useState("");
    const [filename, setFilename] = useState("model.onnx");
    const [status, setStatus] = useState<'idle' | 'importing' | 'success' | 'error'>('idle');
    const [error, setError] = useState("");

    const handleImport = async () => {
        if (!repoId || !filename) return;
        setStatus('importing');
        setError("");

        try {
            const response = await fetch('/api/huggingface/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    repoId,
                    filename,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Ingestion Protocol Failure');
            }

            const data = await response.json();
            setStatus('success');
            localStorage.setItem('current_job_id', data.job_id);

        } catch (err: any) {
            console.error("HF Import Error:", err);
            setError(err.message);
            setStatus('error');
        }
    };

    return (
        <div className="glass rounded-[2.5rem] p-10 border-white/5 relative overflow-hidden">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <Download className="h-6 w-6 text-primary" />
                    Hugging Face Ingest
                </h2>
                <p className="text-zinc-500 text-sm mt-1">Automated neural শarding from the Hub</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Repository ID</Label>
                    <div className="relative">
                        <Input
                            value={repoId}
                            onChange={(e) => setRepoId(e.target.value)}
                            placeholder="e.g. gpt2"
                            className="bg-white/5 border-white/10 rounded-2xl h-12 pl-12 focus:border-primary transition-all text-white"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Model File Path</Label>
                    <Input
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        placeholder="e.g. model.onnx"
                        className="bg-white/5 border-white/10 rounded-2xl h-12 focus:border-primary transition-all text-white"
                    />
                </div>

                {status !== 'success' && (
                    <Button
                        onClick={handleImport}
                        disabled={status === 'importing' || !repoId || !filename}
                        className="w-full mt-4 bg-[#FFD21E] hover:bg-[#FFD21E]/90 text-black h-14 rounded-2xl font-black text-lg group shadow-xl shadow-yellow-500/10"
                    >
                        {status === 'importing' ? (
                            <div className="flex items-center gap-2">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <Zap className="h-5 w-5" />
                                </motion.div>
                                Neural Stream Ingesting...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                🤗 Import Weight Shards
                                <ExternalLink className="ml-1 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        )}
                    </Button>
                )}

                <AnimatePresence>
                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 bg-green-500/10 border border-green-500/20 rounded-3xl flex flex-col gap-4"
                        >
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-6 w-6 text-green-500" />
                                <div>
                                    <p className="text-sm font-black text-green-400 uppercase tracking-widest">Weights Synchronized</p>
                                    <p className="text-xs text-zinc-500">Repository metadata successfully mapped to local buffers.</p>
                                </div>
                            </div>
                            <Button variant="outline" className="h-10 border-green-500/20 text-green-500 hover:bg-green-500/10 rounded-xl font-bold" onClick={() => setStatus('idle')}>
                                Import Another
                            </Button>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3"
                        >
                            <AlertCircle className="h-5 w-5 text-red-500" />
                            <p className="text-xs font-bold text-red-500">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest text-center">
                    Universal Decoder: Supporting FP32, FP16, and BF16 formats
                </p>
            </div>
        </div>
    );
}
