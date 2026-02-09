"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X, Zap } from "lucide-react";
import Logo from "./logo";

const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Docs", href: "/docs" },
    { name: "About", href: "/about" },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
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
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
