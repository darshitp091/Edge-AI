"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Logo from "./logo";

const footerLinks = {
    product: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Documentation", href: "/docs" },
        { name: "API Reference", href: "/docs/api" },
    ],
    company: [
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
    ],
    legal: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Security", href: "/security" },
    ],
    resources: [
        { name: "Community", href: "/community" },
        { name: "Support", href: "/support" },
        { name: "Status", href: "/status" },
        { name: "Changelog", href: "/changelog" },
    ],
};

const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@edgeai.com", label: "Email" },
];

export default function Footer() {
    return (
        <footer className="relative bg-background border-t border-border overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

            <div className="container mx-auto px-4 relative z-10">
                {/* Newsletter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="py-12 border-b border-border"
                >
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl font-bold mb-4">
                            <span className="text-gradient">Stay Updated</span>
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Get the latest updates on AI compression techniques and platform features
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 glass"
                            />
                            <Button className="bg-primary hover:bg-primary/90 glow-blue">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="col-span-2"
                    >
                        <Link href="/" className="mb-4 inline-block">
                            <Logo size="md" />
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                            Compress AI models 10x smaller. Deploy anywhere. Save 90% on inference costs.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        className="glass p-2 rounded-lg hover:border-primary/50 transition-colors group"
                                        aria-label={social.label}
                                    >
                                        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Product Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Resources Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h4 className="font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="py-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-sm text-muted-foreground">
                        © 2026 EdgeAI. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <span>Made with ❤️ for the AI community</span>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
