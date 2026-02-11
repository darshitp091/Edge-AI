"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X, User, LayoutDashboard, Settings, Key, LogOut } from "lucide-react";
import Logo from "./logo";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Docs", href: "/docs" },
    { name: "About", href: "/about" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };

        checkUser();
        window.addEventListener("scroll", handleScroll);

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            authListener?.subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-3" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/">
                        <Logo size="md" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-foreground/80 hover:text-foreground transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA Buttons / AuthNav */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="relative">
                                <Button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    variant="ghost"
                                    className="gap-2 px-4 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10"
                                >
                                    <User className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-bold truncate max-w-[120px]">
                                        {user.user_metadata?.full_name || user.email?.split('@')[0]}
                                    </span>
                                </Button>

                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 glass border border-primary/20 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                                        <div className="p-4 border-b border-primary/10">
                                            <p className="text-[10px] uppercase font-black text-zinc-500 tracking-widest mb-1">Authenticated Pulse</p>
                                            <p className="text-xs font-bold text-white truncate">{user.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-primary/10 transition-colors">
                                                <LayoutDashboard className="h-4 w-4" />
                                                <span className="text-sm font-semibold">Dashboard</span>
                                            </Link>
                                            <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-primary/10 transition-colors">
                                                <Key className="h-4 w-4" />
                                                <span className="text-sm font-semibold">Neural Keys</span>
                                            </Link>
                                            <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-primary/10 transition-colors">
                                                <Settings className="h-4 w-4" />
                                                <span className="text-sm font-semibold">Settings</span>
                                            </Link>
                                        </div>
                                        <div className="p-2 bg-red-500/5">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span className="text-sm font-semibold">Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button className="bg-primary hover:bg-primary/90 glow-blue">
                                        Start Free
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 glass rounded-lg p-6 space-y-4 animate-in slide-in-from-top">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-foreground/80 hover:text-foreground transition-colors py-2"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 space-y-2 border-t border-border">
                            {user ? (
                                <Link href="/dashboard" className="block w-full">
                                    <Button className="w-full bg-primary hover:bg-primary/90">Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="block">
                                        <Button
                                            variant="ghost"
                                            className="w-full text-foreground/80 hover:text-foreground"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/signup" className="block">
                                        <Button
                                            className="w-full bg-primary hover:bg-primary/90"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Start Free
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
