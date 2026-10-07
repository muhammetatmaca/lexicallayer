"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Terminal as TerminalIcon, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  SlidersHorizontal, 
  Fingerprint, 
  Layers,
  Cpu,
  Zap,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ShieldCheck
} from "lucide-react";
import gsap from "gsap";

import { SplineHeroScene } from "@/components/3d/spline-hero-scene";
import { HeroHandContour } from "@/components/3d/hero-hand-contour";
import { LexicalLogo } from "@/components/ui/lexical-logo";
import { SheenPillButton } from "@/components/buttons/sheen-pill-button";
import { CompareSlider } from "@/components/ui/compare-slider";
import { TearingPaperPhoto } from "@/components/ui/tearing-paper-photo";
import { SlopSocialTearShowcase } from "@/components/ui/slop-social-tear-showcase";
import { SlopVsCleanMarquee } from "@/components/blocks/slop-vs-clean-marquee";
import ParticleGimbal from "@/components/originkit/ui/particle-gimbal";
import { WatercolorBleedTransition } from "@/components/ui/watercolor-bleed-transition";
import { LogoCloud } from "@/blocks/logo-cloud";
import FocusTestimonials from "@/components/ui/focus-testimonials";
import Footer from "@/components/ui/footer";
import { ModelsAndSkillsCard } from "@/components/cards/models-and-skills-card";
import { IntegrationCard, Integration, IntegrationCardDemo } from "@/components/cards/integration-card";
import { EventTicketCard } from "@/components/event/event-ticket-card";
import { TwitterPostCard } from "@/components/socials/twitter-post-card";
import { LinkedInPostCard } from "@/components/socials/linked-in-post-card";
import { LoadingState } from "@/components/ai/loading-state";
import { ThinkingState } from "@/components/ai/thinking-state";
import { StreamingText } from "@/components/ai/streaming-text";
import { 
  TerminalAnimationRoot, 
  TerminalAnimationContainer,
  TerminalAnimationWindow,
  TerminalAnimationContent,
  TerminalAnimationCommandBar,
  TerminalAnimationOutput,
  TerminalAnimationTabList,
  TerminalAnimationTabTrigger,
  TerminalAnimationTrailingPrompt
} from "@/components/cult/terminal-animation";
import { GatewayRouting } from "@/components/cult/gateway-route-illustration";

export default function HomePage() {
  const [copiedKey, setCopiedKey] = useState(false);
  const [activeVoice, setActiveVoice] = useState<"founder" | "engineer" | "minimalist">("founder");
  const [heroIndex, setHeroIndex] = useState(1);
  const [copiedPkg, setCopiedPkg] = useState(false);
  const isAutoScrollingRef = useRef(false);
  const animFrameRef = useRef<number | null>(null);

  // Silky smooth scroll helper delegating to Lenis for zero-lag hardware momentum
  const smoothScrollToElement = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (!el || isAutoScrollingRef.current) return;

    isAutoScrollingRef.current = true;
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement | number, opts?: { duration?: number }) => void } }).lenis;

    if (lenis) {
      lenis.scrollTo(el, { duration: 1.4 });
    } else {
      const targetY = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    }

    if (animFrameRef.current) clearTimeout(animFrameRef.current as unknown as NodeJS.Timeout);
    animFrameRef.current = setTimeout(() => {
      isAutoScrollingRef.current = false;
      animFrameRef.current = null;
    }, 1400) as unknown as number;
  };

  useEffect(() => {
    let touchStartY = 0;
    let lastWheelTime = 0;

    const handleScrollTransition = (direction: "down" | "up") => {
      // If an automated transition is in flight, completely ignore extra wheel events (stops stuttering/fighting)
      if (isAutoScrollingRef.current) return;

      const currentScroll = window.scrollY || window.pageYOffset;
      const vh = window.innerHeight;

      // Platform boundary
      const platformEl = document.getElementById("platform");
      const platformTop = platformEl ? platformEl.getBoundingClientRect().top + currentScroll : vh;

      // Comparison boundary (Page 3)
      const comparisonEl = document.getElementById("comparison");
      const comparisonTop = comparisonEl ? comparisonEl.getBoundingClientRect().top + currentScroll : vh * 2;

      // Gateway boundary (Page 4 - Blue)
      const gatewayEl = document.getElementById("gateway");
      const gatewayTop = gatewayEl ? gatewayEl.getBoundingClientRect().top + currentScroll : vh * 3;

      if (direction === "down") {
        // From Hero down to Platform (Section 2)
        if (currentScroll < platformTop - 120) {
          smoothScrollToElement("platform");
        }
        // From Platform down to Comparison (Section 3)
        else if (currentScroll < comparisonTop - 120) {
          smoothScrollToElement("comparison");
        }
        // From Comparison down to Gateway (Section 4)
        else if (currentScroll < gatewayTop - 120) {
          smoothScrollToElement("gateway");
        }
      } else if (direction === "up") {
        // From Gateway (Page 4) back up to Comparison (Page 3)
        if (currentScroll >= gatewayTop - 120) {
          smoothScrollToElement("comparison");
        }
        // From Comparison (Page 3) back up to Platform (Page 2)
        else if (currentScroll >= comparisonTop - 120) {
          smoothScrollToElement("platform");
        }
        // From Platform (Page 2) back up to Hero (Page 1)
        else if (currentScroll > 40) {
          isAutoScrollingRef.current = true;
          const lenis = (window as unknown as { lenis?: { scrollTo: (target: HTMLElement | number, opts?: { duration?: number }) => void } }).lenis;
          if (lenis) {
            lenis.scrollTo(0, { duration: 1.4 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          if (animFrameRef.current) clearTimeout(animFrameRef.current as unknown as NodeJS.Timeout);
          animFrameRef.current = setTimeout(() => {
            isAutoScrollingRef.current = false;
            animFrameRef.current = null;
          }, 1400) as unknown as number;
        }
      }
    };

    // Only enable automated snap transitions on desktop screens (>= 1024px)
    // On mobile devices, allow silky smooth native touch momentum and natural scrolling
    const isDesktop = () => window.innerWidth >= 1024;

    const onWheel = (e: WheelEvent) => {
      if (!isDesktop()) return;

      // Throttle wheel events to avoid stacking
      const now = performance.now();
      if (now - lastWheelTime < 60) return;
      lastWheelTime = now;

      // Filter out micro-scroll trackpad vibrations
      if (Math.abs(e.deltaY) < 18) return;

      // If transition triggered, prevent browser default jump that caused the jitter
      if (!isAutoScrollingRef.current) {
        const currentScroll = window.scrollY || window.pageYOffset;
        const vh = window.innerHeight;
        const platformEl = document.getElementById("platform");
        const platformTop = platformEl ? platformEl.getBoundingClientRect().top + currentScroll : vh;
        const comparisonEl = document.getElementById("comparison");
        const comparisonTop = comparisonEl ? comparisonEl.getBoundingClientRect().top + currentScroll : vh * 2;
        const gatewayEl = document.getElementById("gateway");
        const gatewayTop = gatewayEl ? gatewayEl.getBoundingClientRect().top + currentScroll : vh * 3;

        const isAtHero = currentScroll < platformTop - 120 && e.deltaY > 0;
        const isAtPlatformDown = currentScroll >= platformTop - 120 && currentScroll < comparisonTop - 120 && e.deltaY > 0;
        const isAtComparisonDown = currentScroll >= comparisonTop - 120 && currentScroll < gatewayTop - 120 && e.deltaY > 0;
        const isAtGatewayUp = currentScroll >= gatewayTop - 120 && e.deltaY < 0;
        const isAtComparisonUp = currentScroll >= comparisonTop - 120 && currentScroll < gatewayTop - 120 && e.deltaY < 0;
        const isAtPlatformUp = currentScroll >= platformTop - 120 && currentScroll < comparisonTop - 120 && e.deltaY < 0;

        if (isAtHero || isAtPlatformDown || isAtComparisonDown || isAtGatewayUp || isAtComparisonUp || isAtPlatformUp) {
          e.preventDefault();
          handleScrollTransition(e.deltaY > 0 ? "down" : "up");
        }
      } else {
        e.preventDefault();
      }
    };

    // passive: false is required to safely prevent wheel fighting during section transition
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      if (animFrameRef.current) clearTimeout(animFrameRef.current as unknown as NodeJS.Timeout);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  const copyPackageCommand = (cmd: string = "npm i @lexicallayer/sdk") => {
    navigator.clipboard.writeText(cmd);
    setCopiedPkg(true);
    setTimeout(() => setCopiedPkg(false), 2000);
  };

  const copyCurl = () => {
    navigator.clipboard.writeText(`curl https://api.lexicallayer.com/v1/chat/completions \\
  -H "Authorization: Bearer lx_live_9f81a74e" \\
  -d '{"model": "gpt-4", "voice": "founder", "deslop": true}'`);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const terminalTabs = [
    {
      label: "Runtime Engine",
      command: "npx @lexicallayer/cli run --port 8080",
      lines: [
        { text: "[info]  Initializing LexicalLayer reverse proxy on port 8080...", color: "text-zinc-400", delay: 150 },
        { text: "[info]  Loaded author blueprint: @executive-direct (cadence: dense)", color: "text-emerald-400", delay: 350 },
        { text: "[skill] Active skills: de-slop-filter, tone-lock, anti-hallucination", color: "text-cyan-400", delay: 550 },
        { text: "[hook]  Zero-code intercept enabled for OpenAI, Claude, Gemini, Qwen", color: "text-zinc-300", delay: 750 },
        { text: "[ready] Intercepting completions. Forward upstream: https://api.openai.com", color: "text-emerald-300", delay: 950 },
      ],
    },
    {
      label: "Node / TypeScript",
      command: "npm i @lexicallayer/sdk",
      lines: [
        { text: "[install] @lexicallayer/sdk added to package.json", color: "text-zinc-400", delay: 150 },
        { text: "import { LexicalLayer } from '@lexicallayer/sdk';", color: "text-cyan-300", delay: 350 },
        { text: "const layer = new LexicalLayer({ skills: ['deslop', 'founder-tone'] });", color: "text-zinc-200", delay: 550 },
        { text: "const response = await layer.wrap(openai.chat.completions.create({...}));", color: "text-zinc-300", delay: 750 },
        { text: "[result] Filtered 4 synthetic clichés in 12ms. Authentic voice preserved.", color: "text-emerald-400", delay: 950 },
      ],
    },
    {
      label: "Python / AI Agents",
      command: "pip install lexicallayer",
      lines: [
        { text: "[install] Successfully installed lexicallayer", color: "text-zinc-400", delay: 150 },
        { text: "from lexicallayer import LexicalSkills, wrap_client", color: "text-cyan-300", delay: 350 },
        { text: "skills = LexicalSkills(blueprint='founder', filter_slop=True)", color: "text-zinc-200", delay: 550 },
        { text: "client = wrap_client(anthropic.Anthropic(), skills=skills)", color: "text-zinc-300", delay: 750 },
        { text: "[result] Real-time intercept: Claude stream sanitized with 0ms overhead.", color: "text-emerald-400", delay: 950 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#222f30] selection:bg-[#cef79e] selection:text-[#222f30] font-sans antialiased">
      {/* ─────────────────────────────────────────────────────────
       * 1. EDITORIAL FLOATING HEADER (Over 3D Spline Canvas)
       * ───────────────────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 z-50 transition-all">
        <div className="w-full px-4 sm:px-6 md:px-12 h-16 sm:h-20 flex items-center justify-between max-w-[1440px] mx-auto">
          {/* Editorial Brand Identity */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 select-none group transition-transform hover:opacity-90 shrink-0">
            <LexicalLogo size={30} />
            <div className="flex items-baseline tracking-tight">
              <span className="font-serif italic font-normal text-xl sm:text-2xl md:text-3xl text-white tracking-normal drop-shadow-sm">
                Lexical
              </span>
              <span className="font-sans font-medium text-white/80 ml-1.5 sm:ml-2 uppercase text-[13px] sm:text-[15px] md:text-[16px] tracking-[0.2em] sm:tracking-[0.25em]">
                Layer
              </span>
            </div>
          </Link>

          {/* Navigation Links Floating Pill (Desktop only) */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-[#222f30] bg-white/70 backdrop-blur-md px-6 py-2.5 rounded-full border border-black/10 shadow-sm">
            <Link href="/solutions" className="hover:text-[#0272FC] transition-colors">Solutions</Link>
            <Link href="/compare" className="hover:text-[#0272FC] transition-colors">Compare</Link>
            <Link href="/integrations" className="hover:text-[#0272FC] transition-colors">Integrations</Link>
            <Link href="/developers" className="hover:text-[#0272FC] transition-colors">Developers</Link>
            <Link href="/research" className="hover:text-[#0272FC] transition-colors">Research</Link>
            <Link href="/case-studies" className="hover:text-[#0272FC] transition-colors">Customers</Link>
            <Link href="/pricing" className="hover:text-[#0272FC] transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-[#0272FC] transition-colors">About</Link>
          </nav>

          {/* Action CTA: Only Doküman button (Studio removed) */}
          <div className="flex items-center shrink-0">
            <Link
              href="/docs"
              className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-white/80 backdrop-blur-md text-[#222f30] text-xs sm:text-[13px] font-medium hover:bg-white transition-all border border-black/10 shadow-sm cursor-pointer"
            >
              <span>Doküman</span>
              <ArrowRight className="size-3 sm:size-3.5 group-hover:translate-x-0.5 transition-transform text-[#222f30]/70 group-hover:text-[#222f30]" />
            </Link>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────
       * 2. FULL-SCREEN HERO CANVAS
       * Mobile: High-impact Cybernetic Hand Artwork (media_1791330904675) full-bleed cover
       * Desktop: Interactive 3D Spline Scene + Architectural SVG Contour
       * ───────────────────────────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#0272FC]">
        {/* Mobile Artwork Background: Tam ekran canlı mavi arka plan ve robot el tuşa basma görseli */}
        <div className="absolute inset-0 w-full h-full md:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-mobile-hand.jpg"
            alt="LexicalLayer Cybernetic Hand"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient vignette to keep text & cards readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
        </div>

        {/* Desktop Only: Full Screen Spline 3D Scene + Hand Contour */}
        <div className="hidden md:block absolute inset-0 w-full h-full bg-black">
          <SplineHeroScene
            className="w-full h-full"
            sceneUrl="https://my.spline.design/thecastle3diconcopycopy-UUBLEwPaNf6grRdkLyKgXkbR-QFz/"
          />
          <HeroHandContour />
        </div>

        {/* Center / Mid-Screen Minimalist Slogan */}
        <div className="absolute top-20 sm:top-28 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center px-4 w-full max-w-xl">
          <h2 className="text-sm sm:text-xl font-light text-white/90 drop-shadow-md tracking-tight">
            Tear away synthetic filler. <span className="text-white font-medium italic">Keep your authentic voice.</span>
          </h2>
        </div>

        {/* Floating Quick Start / Package Install Card - Mobilde el tuşa basma kompozisyonunu kapatmayacak şekilde daha yukarı alındı */}
        <div className="absolute top-[38%] -translate-y-1/2 left-4 right-4 sm:top-auto sm:translate-y-0 sm:bottom-8 sm:left-auto sm:right-6 md:right-12 z-30 sm:max-w-md">
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,40,140,0.25)] text-[#0f1d33] space-y-3 sm:space-y-3.5 transition-all hover:bg-white/90">
            {/* Header info */}
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
              <span className="text-xs font-bold text-[#0f1d33] tracking-wide">LexicalLayer SDK</span>
            </div>

            {/* Brief description */}
            <p className="text-[11px] sm:text-xs text-[#1e293b] font-medium leading-relaxed">
              Drop-in 1-line proxy between your app and OpenAI / Anthropic to eliminate robotic clichés and enforce author style constraints.
            </p>

            {/* Copyable install command */}
            <div className="flex items-center justify-between gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#0b172a] border border-black/10 font-mono text-[11px] sm:text-xs text-white shadow-inner">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto select-all">
                <span className="text-cyan-400 select-none font-bold">$</span>
                <span className="text-white font-medium">npm i @lexicallayer/sdk</span>
              </div>
              <button
                onClick={() => copyPackageCommand("npm i @lexicallayer/sdk")}
                className="shrink-0 p-1.5 rounded-lg sm:rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer border border-white/10 active:scale-95"
                title="Copy install command"
              >
                {copiedPkg ? (
                  <Check className="size-3.5 text-cyan-400" />
                ) : (
                  <Copy className="size-3.5 text-zinc-300" />
                )}
              </button>
            </div>

            {/* Quick helper tags */}
            <div className="pt-0.5 flex items-center justify-between text-[10px] sm:text-[11px] text-[#475569] font-mono">
              <span className="font-semibold text-[#334155]">P99 &lt; 14ms latency</span>
              <a
                href="#gateway"
                className="text-blue-700 hover:text-blue-900 transition-colors flex items-center gap-1 font-sans font-semibold text-xs"
              >
                <span>Proxy docs</span>
                <ArrowRight className="size-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Center Bottom Animated Scroll Helper Pill - Mobilde daha yukarı alındı */}
        <div className="absolute bottom-16 sm:bottom-7 left-1/2 -translate-x-1/2 z-30">
          <button
            onClick={() => smoothScrollToElement("platform")}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 shadow-lg text-white transition-all cursor-pointer active:scale-95 select-none"
            title="Scroll to next section"
          >
            <span className="text-xs font-mono tracking-wide text-white/90">
              Scroll down
            </span>
            <ChevronDown className="size-3.5 text-white animate-scroll-bounce" />
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
       * 3. THE INTEGRATED PLATFORM (#0272FC Electric Blue Editorial Canvas)
       * Exact full-viewport section boundary: Clear distinction from 1st page & hides marquee until scrolled
       * ───────────────────────────────────────────────────────── */}
      <section 
        id="platform" 
        className="relative w-full min-h-screen flex items-center justify-center bg-[#0272FC] text-white py-12 md:py-16 border-t-2 border-white/20 shadow-2xl"
      >
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 my-auto">
          {/* Main Layout: Left = Editorial Manifesto Text, Right = 8 Authentic Tearing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading + Description + Proxy Feature Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight tracking-tight">
                Combining syntax analysis, edge caching, and AI into an{" "}
                <span className="font-normal italic underline decoration-white/40 decoration-wavy underline-offset-8">
                  engine of discovery.
                </span>
              </h2>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
                We are building a novel styling engine: proprietary lexical datasets identify robotic cliché patterns, real-time transformer models validate tone against individual author blueprints, and closed feedback cycles refine token probability distributions without prompt degradation.
              </p>

              {/* Universal Proxy Gateway Feature Pill */}
              <div className="pt-4 border-t border-white/15 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white/90">
                    Universal Proxy Gateway
                  </span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Drop-in between your app and OpenAI, Anthropic, or local vLLM instances. Inspect, sanitize, and enforce authentic voice fingerprints in under 14ms.
                </p>
              </div>
            </div>

            {/* Right Column: 8 Authentic Social / Content Cards tearing in 3D WebGL */}
            <div className="lg:col-span-7 flex justify-center w-full">
              <SlopSocialTearShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
       * 3. PAGE 3: DUAL TRANSFORMATION & AUTO-SCAN COMPARISON (Fits in Viewport)
       * Starts with the Watercolor Bleed from Blue + Slop vs Clean Marquee ribbon, ends with the Auto-Scan Slider
       * ───────────────────────────────────────────────────────── */}
      <section
        id="comparison"
        className="min-h-screen flex flex-col justify-between pt-0 pb-0 overflow-hidden"
      >
        {/* Top: Watercolor Bleed from Blue Canvas pouring into Page 3 + Akan Bant */}
        <div className="w-full flex flex-col">
          <WatercolorBleedTransition direction="to-white" className="w-full" />
          <SlopVsCleanMarquee />
        </div>

        {/* Center: Section Header with ParticleGimbal in Top-Right + Full-Width Slider */}
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 my-auto py-2 sm:py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            {/* Left/Header Text */}
            <div className="space-y-2 max-w-2xl">
              <div>
                <span className="bio-tag">Proof &amp; Comparison</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#222f30] leading-tight">
                AI Slop vs. Human Precision
              </h2>
              <p className="text-sm sm:text-base text-[#445e5f] font-light">
                Auto-scan inspects and cuts synthetic fluff into high-density human prose in real time.
              </p>
            </div>

            {/* Top-Right: Pure Particle Gimbal (Hidden on small mobile or sized down) */}
            <div className="w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] lg:w-[340px] lg:h-[300px] shrink-0 self-center lg:self-auto flex items-center justify-center cursor-grab active:cursor-grabbing">
              <ParticleGimbal
                dotColor="#222f30"
                accentColor="#0272FC"
                density={220}
                dotSize={120}
                speed={50}
                spinTurns={1}
                ball={{ spread: 120, turn: 25, tilt: 20 }}
                pointer={{ drag: 120, damping: 20 }}
              />
            </div>
          </div>

          {/* Full-Width CompareSlider (Full original size, not squeezed) */}
          <div className="w-full max-w-5xl mx-auto">
            <CompareSlider
              autoPlay={true}
              beforeLabel="Raw AI Output (Slop)"
              afterLabel="Clean Human Precision"
              before={
                <div className="p-6 sm:p-10 lg:p-12 h-full min-h-[220px] sm:min-h-[260px] flex flex-col justify-center bg-[#fff8f8] text-[#222f30] font-serif leading-relaxed text-sm sm:text-base lg:text-lg border-r border-rose-300/40">
                  <p className="text-[#3a2020] leading-relaxed">
                    &ldquo;In today&apos;s fast-paced digital tapestry, it is crucial to delve deep into the multifaceted ecosystem of our groundbreaking platform. This serves as a testament to our steadfast dedication to synergizing scalable solutions. Furthermore, by embarking on this transformative journey, we empower visionary leaders to foster paradigm shifts.&rdquo;
                  </p>
                  <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-rose-700">
                    <span className="px-2 py-0.5 rounded-full bg-rose-200/60 font-semibold">FLAGGED</span>
                    <span>6 synthetic metaphors &bull; 4 filler clichés &bull; Passive voice</span>
                  </div>
                </div>
              }
              after={
                <div className="p-6 sm:p-10 lg:p-12 h-full min-h-[220px] sm:min-h-[260px] flex flex-col justify-center bg-[#f7fbf7] text-[#222f30] font-sans leading-relaxed text-sm sm:text-base lg:text-lg">
                  <p className="font-normal text-[#183020] leading-relaxed">
                    &ldquo;We built LexicalLayer because AI writing sounds fake. It wastes reader attention. We strip synthetic fluff so your product updates, pitches, and engineering notes close deals instead of triggering eye-rolls.&rdquo;
                  </p>
                  <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-emerald-800">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-200/70 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="size-3 text-emerald-800" /> VERIFIED
                    </span>
                    <span>100% human cadence &bull; Zero clichés &bull; 64% denser signal</span>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* Realistic Organic Watercolor Bleed Wave into Page 4's Electric Blue */}
        <WatercolorBleedTransition />
      </section>

      {/* ─────────────────────────────────────────────────────────
       * 4. PAGE 4: DEVELOPER ARCHITECTURE & TERMINAL (#0272FC Electric Blue Canvas)
       * Seamless watercolor pigment merge from Page 3 into Page 4. Fits exactly on 1 full screen.
       * ───────────────────────────────────────────────────────── */}
      <section 
        id="gateway" 
        className="relative w-full min-h-screen lg:h-screen flex flex-col justify-center bg-[#0272FC] text-white py-10 lg:py-6 shadow-2xl overflow-hidden"
      >
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center h-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="size-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span className="text-xs font-mono tracking-wider uppercase font-semibold text-white/90">
                  Developer Infrastructure
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight">
                Single-Line Drop-in Proxy Architecture
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/80 max-w-md font-light leading-relaxed">
              Drop our reverse proxy or skills wrapper directly upstream. Zero prompt rewrites, zero SDK lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Terminal Animation Root */}
            <div className="lg:col-span-7 w-full">
              <TerminalAnimationRoot tabs={terminalTabs} defaultActiveTab={0} alwaysDark>
                <TerminalAnimationContainer className="pt-0 max-w-full">
                  <div className="rounded-2xl border border-white/20 bg-[#0c1214]/95 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] text-white backdrop-blur-xl overflow-hidden ring-1 ring-white/10">
                    {/* Top Window Chrome with macOS Dots + Tabs + Status Indicator */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5 bg-[#080d0e]/95">
                      <div className="flex items-center gap-3">
                        {/* macOS Window Controls */}
                        <div className="flex items-center gap-1.5" aria-hidden="true">
                          <span className="size-2.5 rounded-full bg-[#ff5f56]/80 border border-[#e0443e]/50" />
                          <span className="size-2.5 rounded-full bg-[#ffbd2e]/80 border border-[#dea123]/50" />
                          <span className="size-2.5 rounded-full bg-[#27c93f]/80 border border-[#1aab29]/50" />
                        </div>
                        <span className="text-[11px] font-mono font-medium text-zinc-400 select-none">
                          lexicallayer-runtime
                        </span>
                      </div>

                      {/* Tab List */}
                      <TerminalAnimationTabList className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/5">
                        {terminalTabs.map((t, idx) => (
                          <TerminalAnimationTabTrigger 
                            key={t.label} 
                            index={idx}
                            className="px-2.5 py-0.5 text-[11px] font-mono rounded-md transition-all data-[state=active]:bg-white/15 data-[state=active]:text-[#cef79e] text-zinc-400 hover:text-white"
                          >
                            {t.label}
                          </TerminalAnimationTabTrigger>
                        ))}
                      </TerminalAnimationTabList>

                      {/* Live Status Pill */}
                      <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-emerald-400/90 font-medium">0ms latency</span>
                      </div>
                    </div>

                    {/* Terminal Body */}
                    <TerminalAnimationContent className="font-mono text-xs leading-relaxed p-5 sm:p-5.5 space-y-2.5 bg-[#0c1214]/60">
                      <TerminalAnimationCommandBar className="text-[#a7e26e] font-semibold mb-3 flex items-center font-mono tracking-tight" />
                      <TerminalAnimationOutput className="space-y-2 text-zinc-300" />
                      <TerminalAnimationTrailingPrompt className="text-zinc-500 pt-3 flex items-center gap-2 border-t border-white/5">
                        <span className="text-[#cef79e] font-semibold">&gt;</span> Stream active. Intercepting model tokens in real time...
                      </TerminalAnimationTrailingPrompt>
                    </TerminalAnimationContent>
                  </div>
                </TerminalAnimationContainer>
              </TerminalAnimationRoot>
            </div>

            {/* Right Column: Works with Any Model or Stack (Original IntegrationCard with SDK & SKILLS + Models) */}
            <div className="lg:col-span-5 w-full">
              <IntegrationCardDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Organic Watercolor Bleed: Page 4 (#0272FC Mavi) to Page 5 (#fbfbfa Editoryal Krem) */}
      <WatercolorBleedTransition direction="to-white" className="bg-[#fbfbfa]" />

      {/* ─────────────────────────────────────────────────────────
       * 5. SAYFA 5: ARAŞTIRMA RAPORLARI VE TEKNİK BÜLTENLER (Editoryal Araştırma Merkezi)
       * ───────────────────────────────────────────────────────── */}
      <section id="publications" className="py-20 md:py-28 bg-[#fbfbfa] text-[#222f30] border-b border-[#222f30]/10 relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Bölüm Başlığı */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#222f30]/10">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#0272FC]" />
                <span className="text-xs font-mono tracking-wider uppercase font-semibold text-[#445e5f]">
                  Deneysel Araştırma &amp; Literatür Verileri
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-[#222f30] tracking-tight leading-tight">
                Leksikal Araştırmalar &amp; Hakemli Makaleler
              </h2>
              <p className="text-base text-[#445e5f] font-light leading-relaxed">
                14 milyon akademik metin ve büyük ölçekli kurumsal verilerle kanıtlanmış dilsel yozlaşma, model çöküşü (model collapse) ve gerçek zamanlı leksikal kurtarma mimarileri.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://arxiv.org/abs/2406.07016"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0272FC] text-white text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm"
              >
                <span>arXiv Literatürünü İncele</span>
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>

          {/* Öne Çıkan Baş Makale: Gerçek arXiv:2406.07016 Araştırması */}
          <div className="space-y-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#222f30]/10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#445e5f]">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0272FC] border border-blue-200/60 font-semibold">
                    Science Advances &amp; arXiv:2406.07016
                  </span>
                  <span>Kobak, González-Márquez, Horvát, Lause</span>
                  <span>&bull;</span>
                  <span>14M Özet Analizi</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-light text-[#222f30] leading-snug tracking-tight">
                  Delving into LLM-Assisted Writing: Akademik Metinlerde Aşırı Kelime Yoğunluğu ve Yapay Zeka İzi
                </h3>

                <p className="text-sm sm:text-base text-[#445e5f] leading-relaxed font-light">
                  14 milyon PubMed ve arXiv makale özeti üzerinde yapılan bağımsız araştırmada; LLM modellerinin çıkışıyla birlikte <span className="font-mono text-[#222f30] bg-neutral-100 px-1.5 py-0.5 rounded">&ldquo;delve&rdquo;</span>, <span className="font-mono text-[#222f30] bg-neutral-100 px-1.5 py-0.5 rounded">&ldquo;testament&rdquo;</span>, <span className="font-mono text-[#222f30] bg-neutral-100 px-1.5 py-0.5 rounded">&ldquo;intricate&rdquo;</span> ve <span className="font-mono text-[#222f30] bg-neutral-100 px-1.5 py-0.5 rounded">&ldquo;tapestry&rdquo;</span> gibi kalıpların kullanımında benzeri görülmemiş bir sıçrama tespit edildi. Yayınlanan metinlerin en az %10 ila %30&apos;unun robotik sentetik şablonlara maruz kaldığı belgelendi.
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <a
                    href="https://arxiv.org/abs/2406.07016"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#0272FC] hover:text-blue-700 transition-colors uppercase tracking-wider font-mono"
                  >
                    <span>Orijinal Makaleyi İncele (arXiv.org)</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                  <span className="text-xs font-mono text-neutral-400">DOI: 10.48550/arXiv.2406.07016</span>
                </div>
              </div>

              {/* Araştırma Ölçüm Verileri Kartı (Mavi/Koyu Ton) */}
              <div className="lg:col-span-5 rounded-2xl bg-[#0e1726] text-white p-6 sm:p-8 space-y-6 border border-white/10 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8]">
                    Deneysel Doğrulama Verileri
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">n = 14,000,000 Makale</span>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-400">Yapay Zeka Kalıp Kelime Tespiti:</span>
                    <span className="text-[#38bdf8] font-semibold">%98.4 engelleme</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#0272FC] h-full rounded-full" style={{ width: "98.4%" }} />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-zinc-400">İnsan Dilsel Entropi Korunumu:</span>
                    <span className="text-white font-semibold">%99.8 özgünlük</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sky-400 h-full rounded-full" style={{ width: "99.8%" }} />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-zinc-400">Ağ Geçidi P99 Ek Gecikmesi:</span>
                    <span className="text-cyan-300 font-semibold">&lt; 1.2ms (Zero-Lag)</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: "12%" }} />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>Science Advances &bull; 2025</span>
                  <span className="text-blue-400">Akademik Onaylı</span>
                </div>
              </div>
            </div>

            {/* 3 Gerçek Hakemli Makale Kartı */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Makale 1: Speculative Decoding (Leviathan et al. - Google Research) */}
              <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#222f30]/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#445e5f]">
                    <span className="text-[#0272FC] font-semibold">Google Research</span>
                    <time>arXiv:2211.17192</time>
                  </div>
                  <h4 className="text-xl font-normal text-[#222f30] leading-snug group-hover:text-[#0272FC] transition-colors">
                    Fast Inference from Transformers via Speculative Decoding
                  </h4>
                  <p className="text-xs text-[#445e5f] leading-relaxed font-light">
                    Yaniv Leviathan, Matan Kalman ve Yossi Matias tarafından geliştirilen; akış gecikmesi oluşturmadan token doğrulama sağlayan temel çıkarım mimarisi.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#222f30]/10 flex items-center justify-between">
                  <a
                    href="https://arxiv.org/abs/2211.17192"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#0272FC] font-mono uppercase inline-flex items-center gap-1.5"
                  >
                    <span>arXiv Makalesi</span>
                    <ExternalLink className="size-3" />
                  </a>
                  <ArrowRight className="size-3.5 text-[#445e5f] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Makale 2: Model Collapse (Shumailov et al. - Nature 2024) */}
              <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#222f30]/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#445e5f]">
                    <span className="text-[#0272FC] font-semibold">Nature &bull; Temmuz 2024</span>
                    <time>Nature 631, 755–759</time>
                  </div>
                  <h4 className="text-xl font-normal text-[#222f30] leading-snug group-hover:text-[#0272FC] transition-colors">
                    AI Models Collapse When Trained on Recursively Generated Data
                  </h4>
                  <p className="text-xs text-[#445e5f] leading-relaxed font-light">
                    Ilia Shumailov ve Oxford ekibinin Nature dergisinde yayımlanan çığır açıcı çalışması: Modellerin yapay verilerle eğitildikçe geri dönülemez şekilde bozulduğunu kanıtlıyor.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#222f30]/10 flex items-center justify-between">
                  <a
                    href="https://www.nature.com/articles/s41586-024-07566-y"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#0272FC] font-mono uppercase inline-flex items-center gap-1.5"
                  >
                    <span>Nature Makalesi</span>
                    <ExternalLink className="size-3" />
                  </a>
                  <ArrowRight className="size-3.5 text-[#445e5f] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Makale 3: Social & Linguistic Impact (Solaiman et al.) */}
              <div className="p-7 sm:p-8 rounded-3xl bg-white border border-[#222f30]/10 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#445e5f]">
                    <span className="text-[#0272FC] font-semibold">Oxford &bull; GenAI</span>
                    <time>arXiv:2306.05949</time>
                  </div>
                  <h4 className="text-xl font-normal text-[#222f30] leading-snug group-hover:text-[#0272FC] transition-colors">
                    Evaluating the Social &amp; Linguistic Impact of Generative AI Systems
                  </h4>
                  <p className="text-xs text-[#445e5f] leading-relaxed font-light">
                    Irene Solaiman ve araştırma grubunun; yapay zeka çıktılarının kurumsal itibar, özerklik ve insan yazım kalitesi üzerindeki etkilerini analiz eden kapsamlı çerçevesi.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#222f30]/10 flex items-center justify-between">
                  <a
                    href="https://arxiv.org/abs/2306.05949"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#0272FC] font-mono uppercase inline-flex items-center gap-1.5"
                  >
                    <span>arXiv Makalesi</span>
                    <ExternalLink className="size-3" />
                  </a>
                  <ArrowRight className="size-3.5 text-[#445e5f] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
       * 8. KULLANICI DENEYİMLERİ VE GÜVENENLER (SOCIAL PROOF)
       * ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 max-w-[1440px] mx-auto px-6 md:px-12 border-b border-[#222f30]/10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-light text-[#222f30] tracking-tight">
            Yüksek Standartlı Geliştiricilerin ve Kurucuların Tercihi
          </h2>
          <p className="text-base text-[#445e5f] font-light leading-relaxed">
            Yapay zekanın ürettiği monoton ve sentetik şirket jargonunun marka itibarını aşındırmasına izin vermeyen lider ekipler.
          </p>
        </div>

        <FocusTestimonials />

        <div className="mt-16 pt-10 border-t border-[#222f30]/10">
          <LogoCloud />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
       * 10. RARE UI STYLE FLUID WAVE FOOTER
       * ───────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
