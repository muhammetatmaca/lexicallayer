"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const STAGES = [600, 500, 1200, 1800, 1200];

function useSequence(steps: number[]) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (stage >= steps.length - 1) return;
    const t = setTimeout(() => setStage((s) => s + 1), steps[stage]);
    return () => clearTimeout(t);
  }, [stage, steps]);
  return stage;
}

type Row = {
  primary: string;
  secondary?: string;
  mono?: boolean;
  add?: number;
  del?: number;
  href?: string;
};

const VARIANTS: Record<
  string,
  { active: string; done: string; rows: Row[]; query?: string }
> = {
  Steps: {
    active: "Analyzing AI output",
    done: "Lexical layer applied in 0.4s",
    rows: [
      { primary: "Scanning for AI cliches (delve, testament, furthermore)", secondary: "3 detected" },
      { primary: "Measuring syllable variance & cadence", secondary: "92% robotic" },
      { primary: "Injecting user's personal lexical fingerprint", secondary: "active" },
      { primary: "Restoring human pacing & sentence rhythm", secondary: "clean" },
    ],
  },
  Reasoning: {
    active: "De-slopping thoughts",
    done: "Cleaned authentic prose",
    rows: [
      { primary: "Stripped artificial introductory fluff." },
      { primary: "Restructured overly symmetrical bullet points into organic paragraphs." },
    ],
  },
};

export function ThinkingState({
  variant = "Steps",
  onSettled,
  rows,
  active,
  done,
  icon,
}: {
  variant?: string;
  onSettled?: () => void;
  rows?: Row[];
  active?: string;
  done?: string;
  icon?: ReactNode;
}) {
  const stage = useSequence(STAGES);
  const [manualExpanded, setManualExpanded] = useState<boolean | null>(null);
  const base = VARIANTS[variant] ?? VARIANTS.Steps;
  const v = {
    ...base,
    rows: rows ?? base.rows,
    active: active ?? base.active,
    done: done ?? base.done,
  };
  const autoExpanded = stage >= 1 && stage < 4;
  const expanded = manualExpanded ?? autoExpanded;
  const working = stage < 3;
  const visible = stage < 2 ? 0 : stage === 2 ? Math.min(2, v.rows.length) : v.rows.length;
  const traceRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useLayoutEffect(() => {
    if (traceRef.current) setLineHeight(traceRef.current.offsetHeight);
  }, [visible, expanded, variant, stage]);

  const settledRef = useRef(false);
  useEffect(() => {
    if (working || settledRef.current) return;
    settledRef.current = true;
    onSettled?.();
  }, [working, onSettled]);

  return (
    <div
      key={variant}
      className="flex w-full flex-col font-sans"
    >
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setManualExpanded((current) => !(current ?? autoExpanded))}
        className="flex w-fit items-center gap-2 rounded-lg px-2 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{working ? v.active : v.done}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transition-transform duration-300"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {expanded && (
        <div className="relative mt-2 ml-2 pl-3 border-l border-neutral-200 dark:border-neutral-800">
          <div ref={traceRef} className="flex flex-col gap-1.5 py-1 text-xs">
            {v.rows.slice(0, visible).map((row, i) => (
              <div key={i} className="flex items-center justify-between gap-3 text-neutral-700 dark:text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500/80" />
                  {row.primary}
                </span>
                {row.secondary && (
                  <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500">
                    {row.secondary}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThinkingState;
