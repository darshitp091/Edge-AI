"use client";

import { motion } from "framer-motion";
import {
    Cpu,
    Zap,
    Cloud,
    Smartphone,
    Code,
    BarChart3,
    Shield,
    Rocket,
    GitBranch
} from "lucide-react";

const features = [
    {
        icon: Cpu,
        title: "INT8/INT4 Quantization",
        description: "Compress models 4-8x with <1% accuracy loss. Automatic precision optimization.",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "3x faster inference. Optimized for edge devices, mobile, and IoT.",
        gradient: "from-purple-500 to-pink-500",
    },
    {
        icon: Cloud,
        title: "Multi-Framework Support",
        description: "PyTorch, TensorFlow, ONNX, Keras. Convert between any format.",
        gradient: "from-orange-500 to-red-500",
    },
    {
        icon: Smartphone,
        title: "Edge Deployment",
        description: "Jetson, Raspberry Pi, mobile chips. Hardware-specific optimization.",
        gradient: "from-green-500 to-emerald-500",
    },
    {
        icon: Code,
        title: "No Code Required",
        description: "Drag & drop interface. RESTful API. Python SDK. CLI tool.",
        gradient: "from-indigo-500 to-blue-500",
    },
    {
        icon: BarChart3,
        title: "Real-time Benchmarking",
        description: "Before/after comparison. Latency, throughput, memory, accuracy metrics.",
        gradient: "from-yellow-500 to-orange-500",
    },
    {
        icon: Shield,
        title: "Production Ready",
        description: "99.9% SLA. Enterprise security. SOC 2 compliant. Audit logs.",
        gradient: "from-teal-500 to-cyan-500",
    },
    {
        icon: Rocket,
        title: "Auto-Optimization",
        description: "AI-powered hyperparameter tuning. Find optimal compression settings.",
        gradient: "from-pink-500 to-rose-500",
    },
    {
        icon: GitBranch,
        title: "Model Versioning",
        description: "Git-like version control. Rollback capabilities. A/B testing.",
        gradient: "from-violet-500 to-purple-500",
    },
];

export default function FeaturesGrid() {
    return (
        <section id="features" className="py-24 px-4 bg-background relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-gradient">Powerful Features</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Everything you need to compress, optimize, and deploy AI models to edge devices
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className={`
                  glass rounded-2xl p-6 group cursor-pointer
                  hover:border-primary/50 transition-all duration-300
                  ${index === 0 ? "md:col-span-2" : ""}
                  ${index === 4 ? "lg:col-span-2" : ""}
                `}
                            >
                                {/* Icon with gradient background */}
                                <div className="relative mb-4 inline-block">
                                    <div
                                        className={`
                      absolute inset-0 bg-gradient-to-br ${feature.gradient} 
                      rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity
                    `}
                                    />
                                    <div className="relative bg-card rounded-xl p-3">
                                        <Icon className="h-8 w-8 text-primary" />
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover effect line */}
                                <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500 rounded-full" />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-16"
                >
                    <p className="text-muted-foreground mb-4">
                        And many more features coming soon...
                    </p>
                    <div className="flex gap-2 justify-center">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full bg-primary animate-pulse"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
