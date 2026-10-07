"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { LexicalLogo } from "@/components/ui/lexical-logo";
import { cn } from "@/lib/cn";
import { useState } from "react";

export interface NavbarProps {
  className?: string;
  theme?: "light" | "dark" | "glass";
}

export function Navbar({ className, theme = "glass" }: NavbarProps) {
  const isDark = theme === "dark";
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  return (
    <header className={cn("absolute top-0 left-0 right-0 z-50 transition-all", className)}>
      <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between max-w-[1440px] mx-auto">
        {/* Editorial Brand Identity */}
        <Link href="/" className="flex items-center gap-3.5 select-none group transition-transform hover:opacity-90">
          <LexicalLogo size={34} color={isDark ? "#FFFFFF" : "#222f30"} />
          <div className="flex items-baseline tracking-tight">
            <span className={cn(
              "font-serif italic font-normal text-2xl sm:text-3xl tracking-normal drop-shadow-sm",
              isDark ? "text-white" : "text-[#222f30]"
            )}>
              Lexical
            </span>
            <span className={cn(
              "font-sans font-medium uppercase text-[14px] sm:text-[15px] tracking-[0.25em] ml-2",
              isDark ? "text-white/80" : "text-[#445e5f]"
            )}>
              Layer
            </span>
          </div>
        </Link>

        {/* Navigation Links Floating Pill */}
        <nav className={cn(
          "hidden lg:flex items-center gap-6 text-[13px] font-medium px-6 py-2.5 rounded-full border shadow-xs transition-all",
          isDark
            ? "text-white/90 bg-white/10 backdrop-blur-md border-white/15"
            : "text-[#222f30] bg-white/85 backdrop-blur-md border-black/10"
        )}>
          <Link href="/studio" className="hover:text-[#0272FC] transition-colors font-semibold text-[#0272FC]">
            Studio (Weights)
          </Link>
          <Link href="/solutions" className="hover:text-[#0272FC] transition-colors">
            Solutions
          </Link>
          <Link href="/compare" className="hover:text-[#0272FC] transition-colors">
            Compare
          </Link>
          <Link href="/integrations" className="hover:text-[#0272FC] transition-colors">
            Integrations
          </Link>
          <Link href="/developers" className="hover:text-[#0272FC] transition-colors">
            Developers
          </Link>
          <Link href="/research" className="hover:text-[#0272FC] transition-colors">
            Research
          </Link>
          <Link href="/case-studies" className="hover:text-[#0272FC] transition-colors">
            Customers
          </Link>
          <Link href="/pricing" className="hover:text-[#0272FC] transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-[#0272FC] transition-colors">
            About
          </Link>
        </nav>

        {/* Action CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/docs"
            className={cn(
              "group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all border shadow-xs cursor-pointer",
              isDark
                ? "bg-white text-[#090d16] hover:bg-white/90 border-transparent"
                : "bg-white/85 backdrop-blur-md text-[#222f30] hover:bg-white border-black/10"
            )}
          >
            <span>Docs &bull; SDK</span>
            <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </header>
  );
}
