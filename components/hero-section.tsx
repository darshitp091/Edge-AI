"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

// Defined text segments with longer ranges for better visibility
const heroTexts = [
  {
    id: 1,
    start: 0,
    end: 45,
    title: "Compress AI Models",
    subtitle: "10x Smaller. 3x Faster.",
  },
  {
    id: 2,
    start: 46,
    end: 90,
    title: "Deploy Anywhere",
    subtitle: "Edge devices. Mobile. IoT.",
  },
  {
    id: 3,
    start: 91,
    end: 135,
    title: "No Code Required",
    subtitle: "Upload. Optimize. Download.",
  },
  {
    id: 4,
    start: 136,
    end: 180,
    title: "Production Ready",
    subtitle: "INT8. INT4. Pruning. Distillation.",
  },
  {
    id: 5,
    start: 181,
    end: 220,
    title: "Save 90% Costs",
    subtitle: "Cloud inference is expensive.",
  },
  {
    id: 6,
    start: 221,
    end: 240,
    title: "Start Free Today",
    subtitle: "5 compressions. No credit card.",
  },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentText, setCurrentText] = useState(heroTexts[0]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = [];
      const tempImages: HTMLImageElement[] = [];

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const frameNumber = i.toString().padStart(3, "0");
        img.src = `/frames/ezgif-frame-${frameNumber}.jpg`;
        imagePromises.push(
          new Promise((resolve) => {
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
          })
        );
        tempImages.push(img);
      }

      await Promise.all(imagePromises);
      imagesRef.current = tempImages;
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const renderFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !context) return;

      const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const x = (canvas.width - img.width * scale) / 2;
      const y = (canvas.height - img.height * scale) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(frameIndexRef.current);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const timelineProxy = { frame: 0 };
    const scrollAnimation = gsap.to(timelineProxy, {
      frame: TOTAL_FRAMES - 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000%", // Increased scroll distance for much slower/smoother transitions
        scrub: 1.5, // Even smoother scrubbing
        pin: true,
        onUpdate: (self) => {
          const currentFrame = Math.round(timelineProxy.frame);
          if (currentFrame !== frameIndexRef.current) {
            frameIndexRef.current = currentFrame;
            renderFrame(currentFrame);

            const textSection = heroTexts.find(
              (text) => currentFrame >= text.start && currentFrame <= text.end
            );
            if (textSection) {
              setCurrentText((prev) => (prev.id !== textSection.id ? textSection : prev));
            }
          }
        },
      },
    });

    return () => {
      scrollAnimation.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [imagesLoaded]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-background"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{
          opacity: imagesLoaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />

      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-50">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 border-2 border-primary/20 rounded-full animate-ping absolute inset-0" />
              <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin relative" />
            </div>
            <div className="space-y-2 text-center">
              <p className="text-xl font-medium text-gradient">Initializing Neural Core...</p>
              <p className="text-sm text-muted-foreground animate-pulse">Synchronizing hardware frames</p>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center pointer-events-none">
        <div className="max-w-6xl mx-auto space-y-12 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentText.id}
              initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(20px)" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Slower, more elegant ease
              className="space-y-6"
            >
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-tight">
                <span className="text-gradient drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  {currentText.title}
                </span>
              </h1>

              <p className="text-2xl md:text-4xl text-zinc-300 font-extralight max-w-4xl mx-auto leading-relaxed tracking-wide">
                {currentText.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12 pointer-events-auto">
            <Button
              size="lg"
              className="text-xl px-12 py-8 bg-primary hover:bg-primary/90 glow-blue group rounded-full transition-all hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-xl px-12 py-8 glass border-primary/30 hover:border-primary/60 rounded-full bg-white/5 transition-all hover:scale-105"
            >
              <Zap className="mr-3 h-6 w-6 text-primary" />
              Technical Demo
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 md:gap-16 pt-20 max-w-5xl mx-auto opacity-80">
            <div className="glass rounded-[2rem] p-6 md:p-10 space-y-2 border-white/10">
              <div className="text-3xl md:text-6xl font-black text-primary tracking-tighter">10x</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-zinc-500">Shrink Ratio</div>
            </div>
            <div className="glass rounded-[2rem] p-6 md:p-10 space-y-2 border-white/10">
              <div className="text-3xl md:text-6xl font-black text-primary tracking-tighter">3x</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-zinc-500">Inference Boost</div>
            </div>
            <div className="glass rounded-[2rem] p-6 md:p-10 space-y-2 border-white/10">
              <div className="text-3xl md:text-6xl font-black text-primary tracking-tighter">90%</div>
              <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-black text-zinc-500">Compute Savings</div>
            </div>
          </div>

          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <p className="text-[10px] uppercase tracking-[0.5em] font-black text-zinc-500 animate-pulse">Scroll to Initiate</p>
            <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
            <motion.div
              className="w-4 h-4 bg-primary ring-8 ring-primary/20 rounded-full"
              animate={{ y: [0, 60, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
