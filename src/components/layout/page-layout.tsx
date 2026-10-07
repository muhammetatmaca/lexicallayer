"use client";

import React, { ReactNode } from "react";
import { Navbar } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { cn } from "@/lib/cn";

export interface PageLayoutProps {
  badge?: string;
  badgeIcon?: ReactNode;
  title: string;
  italicTitle?: string;
  subtitle: string;
  sideAction?: ReactNode;
  children: ReactNode;
}

export function PageLayout({
  badge,
  title,
  italicTitle,
  subtitle,
  sideAction,
  children,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#222f30] font-sans antialiased selection:bg-[#cef79e] selection:text-[#222f30]">
      {/* ─────────────────────────────────────────────────────────
       * 1. EDITORIAL FLOATING HEADER
       * ───────────────────────────────────────────────────────── */}
      <Navbar theme="glass" />

      {/* ─────────────────────────────────────────────────────────
       * 2. REFINED EDITORIAL HERO (Temiz, AI-slop rozetsiz, doğrudan mimari)
       * ───────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-14 md:pt-36 md:pb-16 border-b border-[#222f30]/10 overflow-hidden">
        {/* Subtle Architectural Grid Lines */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#222f30 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            {/* Left: Typography & Slogan */}
            <div className="lg:col-span-8 space-y-3 max-w-3xl">
              {badge && (
                <div className="text-[11px] font-mono tracking-widest uppercase text-[#445e5f] font-semibold">
                  {badge}
                </div>
              )}

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-[#222f30] tracking-tight leading-[1.08]">
                {title}{" "}
                {italicTitle && (
                  <span className="font-serif italic font-normal text-[#222f30] underline decoration-[#0272FC]/30 decoration-wavy underline-offset-8">
                    {italicTitle}
                  </span>
                )}
              </h1>

              <p className="text-sm sm:text-base text-[#445e5f] font-light leading-relaxed max-w-2xl pt-1">
                {subtitle}
              </p>
            </div>

            {/* Right: Floating Quick Metric or Action Card */}
            {sideAction && (
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                {sideAction}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
       * 3. PAGE MAIN CONTENT SECTION
       * ───────────────────────────────────────────────────────── */}
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-14 md:py-16">
        {children}
      </main>

      {/* ─────────────────────────────────────────────────────────
       * 4. RARE UI LIVE FLUID WAVE FOOTER
       * ───────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
