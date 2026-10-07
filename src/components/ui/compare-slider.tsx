"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";
import { Bot, UserCheck } from "lucide-react";

export interface CompareSliderProps {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  initialPosition?: number; // 0 to 100
  autoPlay?: boolean;
}

export function CompareSlider({
  before,
  after,
  beforeLabel = "Raw AI Slop",
  afterLabel = "Human Precision",
  className,
  style,
  initialPosition = 50,
  autoPlay = true,
}: CompareSliderProps) {
  const [position, setPosition] = useState<number>(initialPosition);
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play state tracked via refs so interactions can pause and smoothly resume
  const isInteractingRef = useRef<boolean>(false);
  const isAutoPlayingRef = useRef<boolean>(autoPlay);
  const currentPosRef = useRef<number>(initialPosition);
  const directionRef = useRef<number>(1); // 1 = moving right, -1 = moving left
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    isAutoPlayingRef.current = autoPlay;
  }, [autoPlay]);

  // Smooth autonomous back-and-forth sweep
  useEffect(() => {
    let lastTimestamp = performance.now();

    const loop = (timestamp: number) => {
      const dt = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      // Only advance position if not actively dragged or waiting
      if (isAutoPlayingRef.current && !isInteractingRef.current) {
        // Speed: ~18% per second, smooth constant rate with soft bounds
        const speed = 16;
        let nextPos = currentPosRef.current + directionRef.current * speed * dt;

        if (nextPos >= 82) {
          nextPos = 82;
          directionRef.current = -1;
        } else if (nextPos <= 18) {
          nextPos = 18;
          directionRef.current = 1;
        }

        currentPosRef.current = nextPos;
        setPosition(nextPos);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handlePointerDown = (clientX: number) => {
    setIsInteracting(true);
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    currentPosRef.current = pct;
    setPosition(pct);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isInteractingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    currentPosRef.current = pct;
    setPosition(pct);
  };

  const handlePointerUp = () => {
    setIsInteracting(false);
    isInteractingRef.current = false;

    // RESUME AUTOPLAY after brief pause (1.2s)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isAutoPlayingRef.current = true;
    }, 1200);
  };

  // Global window listeners for drag so lifting pointer anywhere releases and resumes
  useEffect(() => {
    const onWindowMouseMove = (e: MouseEvent) => {
      if (isInteractingRef.current) {
        handlePointerMove(e.clientX);
      }
    };
    const onWindowMouseUp = () => {
      if (isInteractingRef.current) {
        handlePointerUp();
      }
    };
    const onWindowTouchMove = (e: TouchEvent) => {
      if (isInteractingRef.current && e.touches[0]) {
        handlePointerMove(e.touches[0].clientX);
      }
    };
    const onWindowTouchEnd = () => {
      if (isInteractingRef.current) {
        handlePointerUp();
      }
    };

    window.addEventListener("mousemove", onWindowMouseMove);
    window.addEventListener("mouseup", onWindowMouseUp);
    window.addEventListener("touchmove", onWindowTouchMove, { passive: true });
    window.addEventListener("touchend", onWindowTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
      window.removeEventListener("touchmove", onWindowTouchMove);
      window.removeEventListener("touchend", onWindowTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={style}
      className={cn(
        "relative select-none overflow-hidden rounded-2xl sm:rounded-3xl border border-[#222f30]/15 bg-[#fbfbfa] shadow-[0_8px_32px_rgba(34,47,48,0.06)] transition-all",
        isInteracting ? "cursor-ew-resize" : "cursor-default",
        className
      )}
      onMouseDown={(e) => handlePointerDown(e.clientX)}
      onTouchStart={(e) => {
        if (e.touches[0]) handlePointerDown(e.touches[0].clientX);
      }}
    >
      {/* ─── AFTER LAYER (Clean Human Prose - Base Layer) ─── */}
      <div className="relative w-full h-full bg-[#f4f7f4]">
        {after}
        {afterLabel && (
          <span className="absolute top-3 right-3 sm:top-5 sm:right-5 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono font-medium tracking-wide rounded-full bg-emerald-100/90 text-emerald-800 border border-emerald-300 shadow-xs backdrop-blur-md z-10 flex items-center gap-1.5">
            <UserCheck className="size-3.5 text-emerald-600" />
            {afterLabel}
          </span>
        )}
      </div>

      {/* ─── BEFORE LAYER (Raw AI Slop - Clipped Overlay Layer) ─── */}
      <div
        className="absolute inset-0 overflow-hidden bg-[#fff5f5]"
        style={{ width: `${position}%` }}
      >
        <div
          className="absolute inset-0"
          style={{
            width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%",
          }}
        >
          {before}
        </div>
        {beforeLabel && (
          <span className="absolute top-3 left-3 sm:top-5 sm:left-5 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-mono font-medium tracking-wide rounded-full bg-rose-100/90 text-rose-800 border border-rose-300 shadow-xs backdrop-blur-md z-10 flex items-center gap-1.5">
            <Bot className="size-3.5 text-rose-600" />
            {beforeLabel}
          </span>
        )}
      </div>

      {/* ─── SLEEK GLASS DIVIDER & AUTOMATED SCAN HANDLE ─── */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#222f30]/40 to-transparent pointer-events-none"
        style={{ left: `${position}%` }}
      >
        {/* Modern minimal pill cursor with live pulse indicator */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 border border-[#222f30]/20 shadow-[0_4px_16px_rgba(0,0,0,0.12)] flex items-center gap-1.5 pointer-events-auto cursor-ew-resize hover:scale-105 active:scale-95 transition-transform backdrop-blur-md">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-mono font-semibold tracking-wider text-[#222f30] uppercase">
            Auto Scan
          </span>
        </div>
      </div>
    </div>
  );
}

export default CompareSlider;
