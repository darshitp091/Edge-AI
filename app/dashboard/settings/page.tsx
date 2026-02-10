"use client";

import DashboardSidebar from "@/components/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard-header";
import { motion } from "framer-motion";
import {
    Settings,
    Key,
    Bell,
    Shield,
    User,
    CreditCard,
    Zap,
    Lock,
    Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { usePlan } from "@/hooks/use-plan";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function SettingsPage() {
    const { tier, features, loading: planLoading } = usePlan();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                if (profile) setProfile(profile);
            }
        };
        fetchUserData();
    }, []);

    const resetDateStr = profile?.billing_cycle_start
        ? new Date(new Date(profile.billing_cycle_start).setMonth(new Date(profile.billing_cycle_start).getMonth() + 1)).toLocaleDateString()
        : "Pending";

    return (
        <div className="min-h-screen flex bg-background">
            <DashboardSidebar />
            <div className="flex-grow flex flex-col">
                <DashboardHeader />

                <main className="p-8 space-y-8 max-w-7xl overflow-y-auto custom-scrollbar">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-black tracking-tight text-white">Neural Key Settings</h1>
                        <p className="text-zinc-500 text-sm">Configure your core preferences and API access.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Profile Card */}
                            <div className="glass rounded-[3rem] p-10 border-white/5 space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="h-24 w-24 bg-primary/10 rounded-3xl border-2 border-primary/20 flex items-center justify-center relative group">
                                        <User className="h-12 w-12 text-primary" />
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center cursor-pointer">
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Update</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-black text-white">{profile?.full_name || user?.email?.split('@')[0] || "Neural Operator"}</h2>
                                        <p className="text-zinc-500 text-sm">{user?.email || "operator@edgeai.sh"} • {tier.toUpperCase()} Node</p>
                                        <div className="flex gap-2 pt-2">
                                            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-tight">Level 5</span>
                                            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-[10px] font-black uppercase tracking-tight italic">Verified Architecture</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] uppercase font-black text-zinc-500 tracking-widest ml-1">Display Designation</Label>
                                        <Input defaultValue={profile?.full_name || ""} className="bg-white/5 border-zinc-800 h-12 rounded-2xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[10px] uppercase font-black text-zinc-500 tracking-widest ml-1">Contact Routing</Label>
                                        <Input defaultValue={user?.email || ""} className="bg-white/5 border-zinc-800 h-12 rounded-2xl" />
                                    </div>
                                </div>

                                <Button className="bg-white/5 hover:bg-white/10 text-white font-bold h-12 px-8 rounded-2xl border border-white/10">
                                    Save Cluster Config
                                </Button>
                            </div>

                            {/* API Security */}
                            <div className="glass rounded-[3rem] p-10 border-white/5 space-y-6">
                                <h2 className="text-xl font-black text-white flex items-center gap-3">
                                    <Key className="h-5 w-5 text-primary" />
                                    Neural Access Keys
                                </h2>
                                <p className="text-zinc-500 text-sm">Use these keys to authenticate your CLI and edge SDK calls.</p>

                                <div className="space-y-4">
                                    <div className="p-5 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Primary Engine Key</span>
                                            <span className="font-mono text-sm text-zinc-300">edge_live_448*****************2a3</span>
                                        </div>
                                        <Button variant="ghost" className="h-8 px-4 text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 rounded-lg">Copy Key</Button>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full h-12 glass border-primary/20 text-primary font-black uppercase tracking-widest hover:bg-primary/5 rounded-2xl">
                                    Regenerate Access Vector
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Preferences */}
                            <div className="glass rounded-[3rem] p-8 border-white/5 space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                    <Bell className="h-4 w-4" /> Notifications
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-zinc-300">Job Completion</span>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-zinc-300">Resource Alerts</span>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-zinc-300">Neural Security</span>
                                        <Switch />
                                    </div>
                                </div>
                            </div>

                            {/* Security */}
                            <div className="glass rounded-[3rem] p-8 border-white/5 space-y-6">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                    <Shield className="h-4 w-4" /> Hardening
                                </h3>
                                <div className="space-y-4">
                                    <Button variant="outline" className="w-full justify-start h-12 glass border-white/10 text-white font-bold rounded-2xl gap-3">
                                        <Lock className="h-4 w-4 text-primary" />
                                        Update Core Cipher
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start h-12 glass border-white/10 text-white font-bold rounded-2xl gap-3">
                                        <Smartphone className="h-4 w-4 text-primary" />
                                        Neural 2FA Link
                                    </Button>
                                </div>
                            </div>

                            {/* Resource Plan */}
                            <div className="glass rounded-[3rem] p-8 border-primary/20 bg-primary/5 space-y-6 relative overflow-hidden group">
                                <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                                <h3 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" /> Node Capacity
                                </h3>
                                <div className="space-y-2">
                                    <p className="text-2xl font-black text-white italic">{tier.toUpperCase()} Tier</p>
                                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-tight">Next Cycle: {resetDateStr}</p>
                                </div>
                                <Button
                                    onClick={() => window.location.href = "/pricing"}
                                    className="w-full h-12 bg-primary hover:bg-primary/90 glow-blue text-white font-black rounded-2xl"
                                >
                                    Expand Access / Upgrade
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
