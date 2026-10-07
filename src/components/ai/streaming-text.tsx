"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const WORD_MS = 45;
const HOLD_MS = 4000;

export type StreamingToken = { text: string };

const DEFAULT_TOKENS: StreamingToken[] = [
  ..."I built LexicalLayer because I was genuinely exhausted by AI slop on my feed. Every post sounded like an over-caffeinated corporate spokesperson. We replaced that synthetic jargon with an instant style layer that preserves your real cadence, vocabulary, and authentic voice."
    .split(" ")
    .map((text) => ({ text })),
];

export function StreamingText({
  content = DEFAULT_TOKENS,
  className,
}: {
  content?: StreamingToken[];
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const done = count >= content.length;

  useEffect(() => {
    const t = setTimeout(
      () => setCount((c) => (c >= content.length ? 0 : c + 1)),
      done ? HOLD_MS : WORD_MS,
    );
    return () => clearTimeout(t);
  }, [count, done, content.length]);

  return (
    <div className={cn("w-full font-sans text-sm leading-relaxed text-neutral-800 dark:text-neutral-200", className)}>
      <p>
        {content.slice(0, count).map((token, i) => (
          <span key={i} className="inline transition-opacity duration-150">
            {token.text}{" "}
          </span>
        ))}
        {!done && (
          <span className="inline-block h-4 w-1 translate-y-0.5 bg-emerald-500 rounded-full animate-pulse" />
        )}
      </p>
    </div>
  );
}

export default StreamingText;
