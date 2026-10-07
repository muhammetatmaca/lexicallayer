"use client";

import React, { useState } from "react";
import { cn } from "@/lib/cn";
import { Scissors, Sparkles, RefreshCw, CheckCircle2, ArrowRight } from "lucide-react";

export interface TearSlopCardProps {
  className?: string;
  voice?: "founder" | "engineer" | "minimalist";
}

const VOICES_DATA = {
  founder: {
    label: "Founder & Pitch",
    slopPill: "Synthetic Buzzword Slop",
    cleanPill: "Authentic Human Voice",
    slop: "In today's fast-paced digital tapestry, it is crucial to delve deep into the multifaceted ecosystem of our groundbreaking platform. This is a testament to our steadfast dedication to synergizing scalable solutions, fostering revolutionary paradigm shifts.",
    slopBadges: ["digital tapestry", "delve deep", "multifaceted ecosystem", "testament to", "paradigm shift"],
    clean: "We built LexicalLayer because AI writing sounds fake. It wastes reader attention. We strip robotic fluff so your pitches and shareholder memos close deals instead of triggering eye-rolls.",
    metrics: "64% fewer words • 0 clichés • 100% human cadence",
  },
  engineer: {
    label: "Tech & Architecture",
    slopPill: "Robotic Corporate Padding",
    cleanPill: "Direct Engineering Precision",
    slop: "It is imperative to meticulously elucidate that our robust architectural paradigm boasts seamless redundancy across microservices. In order to optimize latency, we ensure comprehensive end-to-end verification, thereby fostering a pivotal foundation.",
    slopBadges: ["imperative to", "meticulously elucidate", "robust paradigm", "fostering a pivotal foundation"],
    clean: "The cluster survived peak load with zero dropped frames. P99 latency stayed under 14ms across 12 edge locations. Here are the raw Grafana traces and post-mortem notes.",
    metrics: "P99 < 14ms verified • Zero fluff • Direct technical signal",
  },
  minimalist: {
    label: "Customer & Support",
    slopPill: "Over-Polite Synthetic Draft",
    cleanPill: "Crisp & Empathetic",
    slop: "We are delighted to reach out and cordially inform you that we have duly noted your inquiry regarding duplicate billing. Please rest assured that our team has thoroughly investigated this situation, and furthermore, we have initiated a full refund.",
    slopBadges: ["delighted to reach out", "cordially inform", "duly noted", "rest assured"],
    clean: "Hi Priya, you were charged twice for September. I refunded the duplicate $49. The funds will return to your original card in 3 to 5 business days.",
    metrics: "Direct answer first • Respects user time • Zero sycophancy",
  },
};

export function TearOffSlopShowcase({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<"founder" | "engineer" | "minimalist">("founder");
  const [isTorn, setIsTorn] = useState(false);
  const [ripOffset, setRipOffset] = useState(0);

  const data = VOICES_DATA[activeTab];

  return (
    <div className={cn("w-full space-y-8", className)}>
      {/* Top Controls: Voice Tabs & Interactive Tear Action */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Voice Selector */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-200/80 backdrop-blur-sm border border-slate-300/60">
          {(["founder", "engineer", "minimalist"] as const).map((key) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key);
                setIsTorn(false);
                setRipOffset(0);
              }}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-mono transition-all cursor-pointer font-medium",
                activeTab === key
                  ? "bg-[#0b1320] text-white shadow-sm"
                  : "text-[#334155] hover:text-[#0b1320]"
              )}
            >
              {VOICES_DATA[key].label}
            </button>
          ))}
        </div>

        {/* Tear Trigger Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsTorn(!isTorn)}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0b1320] text-white text-xs font-mono hover:bg-black transition-all cursor-pointer shadow-md"
          >
            {isTorn ? (
              <>
                <RefreshCw className="size-3.5 group-hover:rotate-180 transition-transform" />
                <span>Reset Layer</span>
              </>
            ) : (
              <>
                <Scissors className="size-3.5 text-cyan-400 group-hover:-rotate-12 transition-transform" />
                <span>Tear Away Slop</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Paper Tear Stack Container */}
      <div className="relative min-h-[380px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-300/80 select-none bg-[#0b1320]">
        
        {/* UNDERNEATH LAYER: The Pure, Authentic Voice (Editorial Clean Dark Blue/Slate) */}
        <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between bg-[#0b1320] text-white z-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 text-[11px] font-mono font-semibold">
                <Sparkles className="size-3 text-cyan-400" />
                {data.cleanPill}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                LexicalLayer Kernel v1.0
              </span>
            </div>

            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal leading-relaxed tracking-tight max-w-4xl pt-2">
              &ldquo;{data.clean}&rdquo;
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-cyan-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-cyan-400" />
              <span>{data.metrics}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <span>Edge Proxy Latency:</span>
              <span className="font-semibold text-white">12.4ms</span>
            </div>
          </div>
        </div>

        {/* TOP LAYER: The Cliché AI Slop Sheet (Torn Paper Appearance) */}
        <div
          onClick={() => setIsTorn(true)}
          className={cn(
            "absolute inset-0 p-8 sm:p-12 flex flex-col justify-between bg-[#f4f4f0] text-[#1e293b] z-10 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isTorn
              ? "-translate-y-full opacity-0 pointer-events-none rotate-[-4deg] scale-95"
              : "translate-y-0 opacity-100"
          )}
          style={{
            clipPath: isTorn
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
              : undefined,
          }}
        >
          {/* Subtle textured grid / watermark behind raw text */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-700 border border-rose-600/20 text-[11px] font-mono font-semibold">
                <span className="size-2 rounded-full bg-rose-600 animate-pulse" />
                {data.slopPill}
              </span>
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 hover:text-slate-700">
                <Scissors className="size-3 text-rose-600" />
                Click anywhere to rip sheet
              </span>
            </div>

            <p className="font-serif italic text-lg sm:text-xl text-[#334155] leading-relaxed max-w-4xl pt-2">
              &ldquo;{data.slop}&rdquo;
            </p>

            {/* Cliché tags flagged */}
            <div className="flex flex-wrap gap-2 pt-2">
              {data.slopBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[11px] font-mono border border-rose-200 line-through decoration-rose-500 decoration-2"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-300/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-rose-700">
            <span>Semantic Diagnostic: 5 robotic fillers, passive verb density 84%</span>
            <div className="flex items-center gap-2 font-sans font-semibold text-slate-800">
              <span>Tear away slop</span>
              <ArrowRight className="size-3.5" />
            </div>
          </div>

          {/* Jagged / Torn Paper Edge at the bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-4 bg-repeat-x pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 10px 0, transparent 0, transparent 8px, #f4f4f0 9px)`,
              backgroundSize: "20px 20px",
              transform: "translateY(100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TearOffSlopShowcase;
