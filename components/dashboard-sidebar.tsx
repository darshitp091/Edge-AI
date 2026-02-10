"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    Cpu,
    Database,
    Home,
    Settings,
    Zap,
    ChevronRight,
    Shield,
    History
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { usePlan } from "@/hooks/use-plan";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const menuItems = [
    // ... items ...
];

export default function DashboardSidebar() {
    const pathname = usePathname();
    const { tier, features, loading: planLoading } = usePlan();
    const [credits, setCredits] = useState(0);

    useEffect(() => {
        const fetchCredits = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('credits')
                    .eq('id', user.id)
                    .single();
                if (profile) setCredits(profile.credits || 0);
            }
        };
        fetchCredits();
    }, []);

    const capacityPercentage = Math.min(100, Math.round((credits / features.maxCredits) * 100));

    return (
        <div className="w-72 h-screen glass border-r border-primary/20 flex flex-col p-6 space-y-8 sticky top-0 overflow-y-auto">
            {/* ... Sidebar Brand and Nav ... */}

            {/* System Status Card */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-5 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="relative h-2 w-2">
                        <div className={`absolute inset-0 ${credits > 0 ? 'bg-primary' : 'bg-red-500'} rounded-full animate-ping opacity-50`} />
                        <div className={`h-full w-full ${credits > 0 ? 'bg-primary' : 'bg-red-500'} rounded-full relative`} />
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-zinc-300">
                        {tier === 'enterprise' ? 'Unlimited Neural Grid' : `${tier.toUpperCase()} Tier Status`}
                    </span>
                </div>
                <div className="space-y-2">
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full bg-primary glow-blue rounded-full transition-all duration-1000`}
                            style={{ width: `${capacityPercentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-500 font-bold">
                        <span>Neural Capacity</span>
                        <span className="text-primary">{capacityPercentage}%</span>
                    </div>
                </div>
                {credits < features.maxCredits * 0.2 && (
                    <p className="text-[8px] text-red-400 font-bold animate-pulse">
                        ⚠️ Neural exhaustion imminent. Refill protocol suggested.
                    </p>
                )}
            </div>
        </div>
    );
}
