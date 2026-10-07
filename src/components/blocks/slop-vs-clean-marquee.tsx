"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface SentenceTransformation {
  id: string;
  category: string;
  slopPrefix: string;
  slopPhrase: string;
  slopSuffix: string;
  cleanPhrase: string;
  cleanFull: string;
}

const TRANSFORMATIONS: SentenceTransformation[] = [
  {
    id: "t1",
    category: "AI CLICHÉ",
    slopPrefix: "In today's fast-paced digital era, we must ",
    slopPhrase: "delve deep into the multifaceted tapestry",
    slopSuffix: " of enterprise innovation.",
    cleanPhrase: "explore the practical foundations",
    cleanFull: "We explore the practical foundations of software architecture with real benchmarks.",
  },
  {
    id: "t2",
    category: "SYNTHETIC FLUFF",
    slopPrefix: "This framework stands as a ",
    slopPhrase: "pivotal testament to fostering holistic synergy",
    slopSuffix: " across digital ecosystems.",
    cleanPhrase: "direct proof of speed",
    cleanFull: "Direct proof of speed: query response times dropped by 42% on production.",
  },
  {
    id: "t3",
    category: "CORPORATE RHETORIC",
    slopPrefix: "It is crucial to remember that we need to ",
    slopPhrase: "navigate the ever-evolving landscape",
    slopSuffix: " with unwavering commitment.",
    cleanPhrase: "solve the real bottleneck",
    cleanFull: "Cut the buzzwords and solve the real database bottleneck before Monday's launch.",
  },
  {
    id: "t4",
    category: "CHATGPT SUMMARY",
    slopPrefix: "In conclusion, by ",
    slopPhrase: "harnessing the bespoke power",
    slopSuffix: " we pave the way for unprecedented horizons.",
    cleanPhrase: "shipping clean code",
    cleanFull: "By shipping clean, reliable code, the team delivered the feature ahead of schedule.",
  },
  {
    id: "t5",
    category: "ROBOTIC PADDING",
    slopPrefix: "Furthermore, the ",
    slopPhrase: "myriad intricacies of this paradigm",
    slopSuffix: " underscore a beacon of excellence.",
    cleanPhrase: "core trade-offs",
    cleanFull: "The core trade-offs are simple: less memory overhead, zero synthetic latency.",
  },
];

export function SlopVsCleanMarquee() {
  return (
    <div className="relative w-full py-2.5 sm:py-3 overflow-hidden select-none">
      {/* Edge gradient masks for seamless visual fade using transparent to background */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[var(--background,#f7f7f5)] via-[var(--background,#f7f7f5)]/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[var(--background,#f7f7f5)] via-[var(--background,#f7f7f5)]/80 to-transparent z-10" />

      {/* Single Continuous Running Ribbon - Direct flowing stream without extra wrapper layers */}
      <div className="flex overflow-hidden group">
        <div className="flex shrink-0 items-center gap-8 sm:gap-12 animate-slop-left group-hover:[animation-play-state:paused]">
          {[...TRANSFORMATIONS, ...TRANSFORMATIONS].map((item, idx) => (
            <div
              key={`item-${idx}`}
              className="flex items-center gap-3 whitespace-nowrap text-xs sm:text-sm"
            >
              {/* Category tag */}
              <span className="px-2 py-0.5 rounded-full bg-[#222f30]/8 text-[#445e5f] text-[10px] font-mono uppercase tracking-wider font-semibold">
                {item.category}
              </span>

              {/* Slop Sentence (Left side with red struck cliché) */}
              <div className="flex items-center text-[#445e5f]/90">
                <span>{item.slopPrefix}</span>
                <span className="mx-1 line-through text-rose-600 bg-rose-100/60 border border-rose-300/60 px-1.5 py-0.5 rounded font-medium decoration-rose-500 decoration-[1.5px]">
                  {item.slopPhrase}
                </span>
                <span>{item.slopSuffix}</span>
              </div>

              {/* Transition arrow indicator */}
              <div className="flex items-center px-1 text-emerald-600">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

              {/* Clean Human Sentence (Right side with emerald highlight) */}
              <div className="flex items-center text-[#222f30] font-medium">
                <span className="bg-emerald-100/80 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                  {item.cleanPhrase}
                </span>
                <span className="ml-1.5 text-[#222f30] hidden md:inline font-normal">
                  — &ldquo;{item.cleanFull}&rdquo;
                </span>
              </div>

              {/* Separator bullet between items */}
              <span className="text-[#222f30]/25 ml-4 text-base">&bull;</span>
            </div>
          ))}
        </div>

        {/* Duplicate runner for 100% infinite gapless loop */}
        <div
          aria-hidden="true"
          className="flex shrink-0 items-center gap-8 sm:gap-12 animate-slop-left group-hover:[animation-play-state:paused]"
        >
          {[...TRANSFORMATIONS, ...TRANSFORMATIONS].map((item, idx) => (
            <div
              key={`item-dup-${idx}`}
              className="flex items-center gap-3 whitespace-nowrap text-xs sm:text-sm"
            >
              {/* Category tag */}
              <span className="px-2 py-0.5 rounded-full bg-[#222f30]/8 text-[#445e5f] text-[10px] font-mono uppercase tracking-wider font-semibold">
                {item.category}
              </span>

              {/* Slop Sentence (Left side with red struck cliché) */}
              <div className="flex items-center text-[#445e5f]/90">
                <span>{item.slopPrefix}</span>
                <span className="mx-1 line-through text-rose-600 bg-rose-100/60 border border-rose-300/60 px-1.5 py-0.5 rounded font-medium decoration-rose-500 decoration-[1.5px]">
                  {item.slopPhrase}
                </span>
                <span>{item.slopSuffix}</span>
              </div>

              {/* Transition arrow indicator */}
              <div className="flex items-center px-1 text-emerald-600">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>

              {/* Clean Human Sentence (Right side with emerald highlight) */}
              <div className="flex items-center text-[#222f30] font-medium">
                <span className="bg-emerald-100/80 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                  {item.cleanPhrase}
                </span>
                <span className="ml-1.5 text-[#222f30] hidden md:inline font-normal">
                  — &ldquo;{item.cleanFull}&rdquo;
                </span>
              </div>

              {/* Separator bullet between items */}
              <span className="text-[#222f30]/25 ml-4 text-base">&bull;</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
