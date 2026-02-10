"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Bell, Search, User, Zap, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { usePlan } from "@/hooks/use-plan";
import { PlanTier } from "@/lib/plans";

export default function DashboardHeader() {
    const router = useRouter();
    const { tier, features, loading: planLoading, isPro } = usePlan();
    const [userName, setUserName] = useState<string>("Neural_Guest");
    const [credits, setCredits] = useState<number>(0);
    const [resetDate, setResetDate] = useState<string>("");

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || "Operator");

                // Fetch real-time profile data for credits
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('credits, billing_cycle_start')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    setCredits(profile.credits || 0);
                    if (profile.billing_cycle_start) {
                        const date = new Date(profile.billing_cycle_start);
                        date.setMonth(date.getMonth() + 1);
                        setResetDate(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
                    }
                }
            }
        };
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <header className="h-20 border-b border-primary/10 flex items-center justify-between px-8 bg-background/50 backdrop-blur-3xl sticky top-0 z-40">
            <div className="flex-grow max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search neural endpoints, models or compression logs..."
                        className="pl-12 bg-white/5 border-zinc-800 focus:border-primary/50 focus:ring-primary/10 rounded-2xl h-11 w-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Real-time Credits Monitor */}
                <div className="hidden lg:flex items-center gap-3 glass px-4 py-2 rounded-full border-primary/20">
                    <Zap className="h-4 w-4 text-primary fill-primary" />
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-100">
                        {credits} <span className="text-zinc-500">Neural Bits</span>
                    </span>
                </div>

                <Button
                    onClick={() => router.push("/dashboard/logs")}
                    variant="ghost"
                    size="icon"
                    className="glass h-11 w-11 rounded-2xl border-white/5 hover:bg-white/10 relative"
                >
                    <Bell className="h-5 w-5 text-zinc-400" />
                    <span className="absolute top-3 right-3 h-2 w-2 bg-primary rounded-full ring-4 ring-background" />
                </Button>

                <div className="h-11 px-4 glass rounded-2xl flex items-center gap-3 border-white/5 group relative">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center p-px">
                        <div className="h-full w-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                            <User className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                    <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-zinc-200 truncate max-w-[80px]">{userName}</span>
                        <span className="text-[8px] uppercase tracking-tighter text-primary font-black">
                            {tier === 'business' ? "Business Architect" : tier === 'pro' ? "Pro Tactical" : tier === 'starter' ? "Starter Node" : "Explorer"}
                        </span>
                        {resetDate && (
                            <span className="text-[6px] uppercase tracking-tighter text-zinc-500 font-bold mt-0.5">
                                Reset: {resetDate}
                            </span>
                        )}
                    </div>

                    {/* Logout Dropdown Simulation */}
                    <button
                        onClick={handleLogout}
                        className="ml-2 p-1.5 hover:bg-white/10 rounded-lg text-zinc-500 hover:text-red-400 transition-colors"
                        title="Pulse Sign Out"
                    >
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
