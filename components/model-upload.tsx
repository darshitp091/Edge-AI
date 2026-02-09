"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    UploadCloud,
    File,
    X,
    CheckCircle2,
    AlertCircle,
    Zap,
    Cpu,
    BrainCircuit
} from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";

async function calculateSHA256(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function ModelUpload() {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) setFile(droppedFile);
    }, []);

    const handleUpload = async () => {
        if (!file) return;
        setUploadStatus('uploading');

        try {
            // 1. Calculate SHA-256 Fingerprint (Security)
            const fileHash = await calculateSHA256(file);
            console.log("Neural Fingerprint (SHA-256):", fileHash);

            // 2. Ingest via Backend
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/compress', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Ingestion Protocol Failure');
            const data = await response.json();

            // 3. Persist to Supabase Database
            const { data: userData } = await supabase.auth.getUser();
            if (!userData.user) throw new Error("Authentication Required");

            const { error: dbError } = await supabase
                .from('models')
                .insert([{
                    user_id: userData.user.id,
                    name: file.name,
                    original_size: file.size,
                    format: file.name.split('.').pop(),
                    sha256_hash: fileHash,
                    is_encrypted: true
                }]);

            if (dbError) throw dbError;

            setUploadStatus('success');
            // Store job ID in localStorage for tracking
            localStorage.setItem('current_job_id', data.job_id);
        } catch (error) {
            console.error("Neural Bridge Error:", error);
            setUploadStatus('error');
        }
    };

    return (
        <div className="glass rounded-[2.5rem] p-10 border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
                <BrainCircuit className="h-12 w-12 text-primary opacity-20" />
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <UploadCloud className="h-6 w-6 text-primary" />
                    Neural Model Ingest
                </h2>
                <p className="text-zinc-500 text-sm mt-1">Upload your model weights for edge optimization</p>
            </div>

            {!file ? (
                <motion.div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={onDrop}
                    className={`
            relative h-64 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all duration-500 cursor-pointer
            ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'}
          `}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="text-center space-y-4">
                        <div className={`
              h-20 w-20 rounded-full flex items-center justify-center mx-auto transition-all duration-500
              ${isDragging ? 'bg-primary text-white scale-110 glow-blue' : 'bg-white/5 text-zinc-500'}
            `}>
                            <UploadCloud className="h-8 w-8" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-zinc-300">
                                Drag & drop neural artifacts
                            </p>
                            <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">
                                PyTorch, TensorFlow, ONNX (Up to 2GB)
                            </p>
                        </div>
                    </div>
                    <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </motion.div>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-6 relative group"
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 h-8 w-8 rounded-full hover:bg-white/10"
                            onClick={() => { setFile(null); setUploadStatus('idle'); }}
                        >
                            <X className="h-4 w-4 text-zinc-400" />
                        </Button>

                        <div className="flex items-center gap-6">
                            <div className="h-16 w-16 glass rounded-2xl flex items-center justify-center border-primary/20 shrink-0">
                                <File className="h-8 w-8 text-primary" />
                            </div>
                            <div className="flex-grow space-y-1 min-w-0">
                                <p className="font-bold text-white truncate">{file.name}</p>
                                <p className="text-[10px] uppercase font-bold text-zinc-500">
                                    Size: {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for Sharding
                                </p>
                            </div>
                        </div>

                        {uploadStatus === 'idle' && (
                            <Button
                                onClick={handleUpload}
                                className="w-full mt-6 bg-primary hover:bg-primary/90 glow-blue h-12 rounded-2xl font-bold"
                            >
                                Initialize Compression
                                <Zap className="ml-2 h-4 w-4" />
                            </Button>
                        )}

                        {uploadStatus === 'uploading' && (
                            <div className="mt-6 space-y-3">
                                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-primary glow-blue"
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 2 }}
                                    />
                                </div>
                                <p className="text-center text-[10px] uppercase font-black text-primary animate-pulse tracking-widest">
                                    Neural Stream Ingesting...
                                </p>
                            </div>
                        )}

                        {uploadStatus === 'success' && (
                            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <div className="space-y-0.5">
                                    <p className="text-sm font-bold text-green-500 uppercase tracking-tight italic">Ingest Complete</p>
                                    <p className="text-[10px] text-zinc-400">Artifact stored in /v1/neural/cache</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            )}

            {/* Target Hardware Selection */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Mobile', 'IoT', 'Server', 'Robotics'].map((target) => (
                    <Button key={target} variant="outline" className="glass border-white/5 h-20 rounded-2xl flex flex-col gap-1 hover:border-primary/50 group">
                        <Cpu className="h-4 w-4 text-zinc-500 group-hover:text-primary transition-colors" />
                        <span className="text-[10px] uppercase font-bold text-zinc-400 group-hover:text-white">{target}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}
