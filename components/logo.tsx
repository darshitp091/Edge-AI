"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface LogoProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    showText?: boolean;
}

export default function Logo({ className = "", size = "md", showText = true }: LogoProps) {
    const sizes = {
        sm: { icon: 24, text: "text-lg" },
        md: { icon: 32, text: "text-2xl" },
        lg: { icon: 48, text: "text-4xl" }
    };

    const currentSize = sizes[size];

    return (
        <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
            <div className="relative">
                {/* Core Icon SVG */}
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative z-10"
                >
                    <svg
                        width={currentSize.icon}
                        height={currentSize.icon}
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#2563eb" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Hexagonal Outer Frame */}
                        <path
                            d="M50 5 L85 25 L85 75 L50 95 L15 75 L15 25 Z"
                            stroke="url(#logo-grad)"
                            strokeWidth="4"
                            className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        />

                        {/* Inner Neural Node */}
                        <circle cx="50" cy="50" r="15" fill="url(#logo-grad)" filter="url(#glow)" />

                        {/* Connection Lines */}
                        <path d="M50 15 V30" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                        <path d="M50 70 V85" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                        <path d="M20 35 L35 42" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                        <path d="M65 58 L80 65" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                        <path d="M20 65 L35 58" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                        <path d="M65 42 L80 35" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                    </svg>
                </motion.div>

                {/* Animated Glow Backdrop */}
                <div className="absolute inset-0 blur-2xl bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {showText && (
                <div className="flex flex-col">
                    <span className={`${currentSize.text} font-black text-white tracking-tighter leading-none`}>
                        Edge<span className="text-primary italic">AI</span>
                    </span>
                    <span className="text-[8px] uppercase font-bold text-zinc-500 tracking-[0.3em] mt-0.5">Neural Core</span>
                </div>
            )}
        </div>
    );
}
