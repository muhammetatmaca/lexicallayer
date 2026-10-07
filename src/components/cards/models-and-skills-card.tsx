"use client";

import { useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { Cpu, Sparkles } from "lucide-react";

interface ModelIntegrationItem {
  id: string;
  name: string;
  category: string;
  badgeColor: string;
  x: number;
  y: number;
  path: string;
  delay: number;
}

// 8 major foundational AI models & frameworks connected directly into LexicalLayer SDK / Skills
const MODEL_INTEGRATIONS: ModelIntegrationItem[] = [
  {
    id: "openai",
    name: "OpenAI",
    category: "Frontier Models",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    x: 90,
    y: 70,
    path: "M 282 205 V 85 Q 282 70 260 70 H 90",
    delay: 0.1,
  },
  {
    id: "anthropic",
    name: "Anthropic",
    category: "Claude Family",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/40",
    x: 474,
    y: 70,
    path: "M 282 205 V 85 Q 282 70 304 70 H 474",
    delay: 0.2,
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "Multimodal AI",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-400/40",
    x: 80,
    y: 195,
    path: "M 240 205 H 80",
    delay: 0.3,
  },
  {
    id: "meta-llama",
    name: "Meta LLaMA",
    category: "Open Weights",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-400/40",
    x: 484,
    y: 195,
    path: "M 324 205 H 484",
    delay: 0.4,
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    category: "Reasoning Models",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-400/40",
    x: 100,
    y: 320,
    path: "M 282 205 V 305 Q 282 320 260 320 H 100",
    delay: 0.5,
  },
  {
    id: "mistral",
    name: "Mistral AI",
    category: "Frontier Models",
    badgeColor: "bg-orange-500/20 text-orange-300 border-orange-400/40",
    x: 464,
    y: 320,
    path: "M 282 205 V 305 Q 282 320 304 320 H 464",
    delay: 0.6,
  },
  {
    id: "cursor",
    name: "Cursor AI",
    category: "IDE Assistant",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-400/40",
    x: 282,
    y: 50,
    path: "M 282 205 V 50",
    delay: 0.15,
  },
  {
    id: "vllm",
    name: "vLLM / Ollama",
    category: "Self-Hosted Edge",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-400/40",
    x: 282,
    y: 360,
    path: "M 282 205 V 360",
    delay: 0.7,
  },
];

const AnimatedSignalPath = ({ d, id }: { d: string; id: string }) => {
  return (
    <>
      <path
        d={d}
        stroke="rgba(255, 255, 255, 0.18)"
        strokeWidth="1.5"
        fill="none"
      />
      <motion.path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="40 180"
        initial={{ strokeDashoffset: 220 }}
        animate={{ strokeDashoffset: -220 }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2,
        }}
      />
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </>
  );
};

export function ModelsAndSkillsHub() {
  const containerId = useId();

  return (
    <div className="relative h-full w-full min-h-[380px] sm:min-h-[410px]">
      {/* Background Matrix Wiring SVG */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 564 410"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {MODEL_INTEGRATIONS.map((item) => (
          <AnimatedSignalPath
            key={item.id}
            d={item.path}
            id={`${containerId}-${item.id}`}
          />
        ))}
      </svg>

      {/* ─── CENTER HUB: SDK & SKILLS CORE ─── */}
      <div className="absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border border-cyan-400/40 bg-[#0a1b38]/90 p-4 shadow-[0_0_40px_rgba(2,114,252,0.5)] backdrop-blur-xl">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
          <Sparkles className="size-3 text-cyan-400 animate-spin" />
          SDK &amp; SKILLS
        </div>
        <span className="text-[10px] font-mono text-white/70 mt-1">Lexical Layer</span>

        {/* Pulsing Core Radar Rings */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-cyan-400/40"
          animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-2xl border border-white/20"
          animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.8, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ─── ORBITING SATELLITE NODES (Gemini, Claude, OpenAI, DeepSeek, etc.) ─── */}
      {MODEL_INTEGRATIONS.map((model) => (
        <motion.div
          key={model.id}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: model.delay, duration: 0.4 }}
          style={{
            left: `${(model.x / 564) * 100}%`,
            top: `${(model.y / 410) * 100}%`,
          }}
          className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/20 bg-[#0d2248]/85 shadow-lg backdrop-blur-md hover:border-cyan-400 transition-colors">
            <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-white tracking-tight leading-none">
                {model.name}
              </span>
              <span className="text-[9px] font-mono text-cyan-300/80 leading-tight mt-0.5">
                {model.category}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ModelsAndSkillsCard() {
  return (
    <div className="w-full rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl p-6 sm:p-8 flex flex-col gap-6 text-white overflow-hidden relative">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(56,189,248,0.12),transparent)]" />

      {/* Header Info */}
      <div className="flex flex-col gap-1.5 z-10">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-mono text-[11px] font-semibold tracking-wider uppercase border border-cyan-400/40">
            Universal Model Interceptor
          </span>
          <span className="text-xs font-mono text-white/60">Zero Code Changes</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mt-1">
          Works with Any Model or Stack
        </h3>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
          Drop our lightweight SDK &amp; agent skills directly into your pipeline. Compatible with Gemini, Claude, OpenAI, DeepSeek, and local Ollama/vLLM instances in real time.
        </p>
      </div>

      {/* Interactive Visual Network Hub */}
      <div className="relative z-10 w-full rounded-2xl bg-[#06132a]/60 border border-white/15 p-2 sm:p-4 overflow-hidden">
        <ModelsAndSkillsHub />
      </div>

      {/* Footer Feature Badges */}
      <div className="grid grid-cols-3 gap-3 z-10 pt-2 border-t border-white/15 text-center text-xs font-mono">
        <div>
          <span className="text-white/60 block text-[10px]">THROUGHPUT</span>
          <span className="text-cyan-300 font-semibold">100% Stream</span>
        </div>
        <div>
          <span className="text-white/60 block text-[10px]">INTEGRATION</span>
          <span className="text-emerald-300 font-semibold">SDK &amp; Skills</span>
        </div>
        <div>
          <span className="text-white/60 block text-[10px]">LATENCY</span>
          <span className="text-white font-semibold">&lt; 14ms P99</span>
        </div>
      </div>
    </div>
  );
}

export default ModelsAndSkillsCard;
