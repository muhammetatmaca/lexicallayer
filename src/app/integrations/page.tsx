"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { 
  Cpu, 
  ArrowRight, 
  Check, 
  Copy, 
  Search
} from "lucide-react";

const INTEGRATION_MODELS = [
  {
    name: "OpenAI",
    provider: "OpenAI",
    slug: "openai",
    status: "Native Proxy & SDK",
    latency: "< 8ms",
    endpoint: "https://gateway.lexicallayer.com/v1",
    envKey: "OPENAI_API_KEY",
    codeExample: `import OpenAI from 'openai';\n\nconst client = new OpenAI({\n  baseURL: 'https://gateway.lexicallayer.com/v1',\n  apiKey: process.env.OPENAI_API_KEY,\n  defaultHeaders: { 'X-Lexical-Blueprint': 'founder' }\n});`,
    tags: ["Streaming", "JSON Mode", "Vision", "Tools"]
  },
  {
    name: "Anthropic Claude",
    provider: "Anthropic",
    slug: "anthropic",
    status: "Native Proxy & SDK",
    latency: "< 9ms",
    endpoint: "https://gateway.lexicallayer.com/anthropic/v1",
    envKey: "ANTHROPIC_API_KEY",
    codeExample: `import Anthropic from '@anthropic-ai/sdk';\n\nconst client = new Anthropic({\n  baseURL: 'https://gateway.lexicallayer.com/anthropic/v1',\n  apiKey: process.env.ANTHROPIC_API_KEY\n});`,
    tags: ["Extended Thinking", "Streaming", "Artifacts"]
  },
  {
    name: "Google Gemini",
    provider: "Google Cloud",
    slug: "google",
    status: "Native Proxy & SDK",
    latency: "< 7ms",
    endpoint: "https://gateway.lexicallayer.com/gemini/v1",
    envKey: "GEMINI_API_KEY",
    codeExample: `import { GoogleGenerativeAI } from '@google/generative-ai';\n// LexicalLayer Proxy wraps the fetch transport\nconst ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);`,
    tags: ["Long Context", "Multimodal", "Low Latency"]
  },
  {
    name: "DeepSeek",
    provider: "DeepSeek",
    slug: "deepseek",
    status: "OpenAI Compatible",
    latency: "< 12ms",
    endpoint: "https://gateway.lexicallayer.com/v1",
    envKey: "DEEPSEEK_API_KEY",
    codeExample: `const response = await fetch('https://gateway.lexicallayer.com/v1/chat/completions', {\n  headers: { 'Authorization': 'Bearer ' + process.env.DEEPSEEK_API_KEY }\n});`,
    tags: ["Reasoning", "Open Weights", "MoE"]
  },
  {
    name: "Mistral AI",
    provider: "Mistral AI",
    slug: "mistral",
    status: "Native Proxy & SDK",
    latency: "< 10ms",
    endpoint: "https://gateway.lexicallayer.com/mistral/v1",
    envKey: "MISTRAL_API_KEY",
    codeExample: `import { MistralClient } from '@mistralai/mistralai';\nconst client = new MistralClient({\n  endpoint: 'https://gateway.lexicallayer.com/mistral/v1'\n});`,
    tags: ["European Host", "Function Calling", "Coding"]
  },
  {
    name: "Groq LPU (Llama)",
    provider: "Groq",
    slug: "groq",
    status: "Ultra-Fast Stream",
    latency: "< 3ms",
    endpoint: "https://gateway.lexicallayer.com/groq/v1",
    envKey: "GROQ_API_KEY",
    codeExample: `import Groq from 'groq-sdk';\nconst groq = new Groq({\n  baseURL: 'https://gateway.lexicallayer.com/groq/v1'\n});`,
    tags: ["Ultra Low Latency", "LPU Engine", "Fast Inference"]
  },
  {
    name: "Cohere Command R+",
    provider: "Cohere",
    slug: "cohere",
    status: "Enterprise Hub",
    latency: "< 11ms",
    endpoint: "https://gateway.lexicallayer.com/cohere/v1",
    envKey: "COHERE_API_KEY",
    codeExample: `import { CohereClient } from 'cohere-ai';\nconst cohere = new CohereClient({\n  environment: 'https://gateway.lexicallayer.com/cohere/v1'\n});`,
    tags: ["RAG Engine", "Multi-step Reasoning", "Enterprise"]
  },
  {
    name: "Ollama (Yerel Runtime)",
    provider: "Local AI",
    slug: "ollama",
    status: "Local Daemon",
    latency: "0ms local",
    endpoint: "http://localhost:8080/ollama/v1",
    envKey: "No Key Required",
    codeExample: `npx @lexicallayer/cli run --local-ollama http://localhost:11434`,
    tags: ["Air-Gapped", "Offline", "Zero Cost"]
  }
];

export default function IntegrationsPage() {
  const [selectedModel, setSelectedModel] = useState(INTEGRATION_MODELS[0]);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");

  const copyCode = () => {
    navigator.clipboard.writeText(selectedModel.codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredModels = INTEGRATION_MODELS.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.provider.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageLayout
      badge="20+ Model Desteği • Zero-Config Gateway"
      badgeIcon={<Cpu className="size-3.5" />}
      title="Büyük Yapay Zeka"
      italicTitle="Entegrasyonları"
      subtitle="OpenAI, Claude, Gemini, Mistral, Groq ve yerel modellerinizi tek satır URL değişikliğiyle bağlayın. Kodunuzdaki tüm çağrılar otomatik olarak leksikal arındırmadan geçer."
      sideAction={
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#445e5f]" />
          <input
            type="text"
            placeholder="Model ara (örn. Claude, DeepSeek)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#222f30]/15 text-xs text-[#222f30] placeholder:text-[#445e5f]/60 focus:outline-none focus:border-[#0272FC] shadow-xs"
          />
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Models List */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredModels.map((item) => {
            const isSelected = selectedModel.name === item.name;
            return (
              <div
                key={item.name}
                onClick={() => setSelectedModel(item)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? "bg-white border-[#0272FC] shadow-md ring-2 ring-[#0272FC]" 
                    : "bg-white/80 border-[#222f30]/10 hover:border-[#222f30]/30 hover:bg-white shadow-xs"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#445e5f]">
                      {item.provider}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.latency}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-[#222f30]">
                    {item.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#f0f0ee] text-[#445e5f]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#222f30]/8 flex items-center justify-between text-xs font-mono text-[#0272FC]">
                  <span>Entegrasyonu İncele</span>
                  <ArrowRight className="size-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Code Config View */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 rounded-3xl border border-zinc-800 bg-[#0c1017] p-6 text-white shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Seçili Model</div>
                <div className="text-lg font-medium text-white">{selectedModel.name}</div>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
              >
                {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                <span>{copied ? "Kopyalandı" : "Kopyala"}</span>
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="text-zinc-400">Gateway URL:</div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-cyan-300 break-all select-all">
                {selectedModel.endpoint}
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="text-zinc-400">Gereken Ortam Değişkeni:</div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-emerald-300 select-all">
                {selectedModel.envKey}
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="text-zinc-400">Örnek Bağlantı Kodu:</div>
              <pre className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-200 overflow-x-auto text-[11px] leading-relaxed">
                <code>{selectedModel.codeExample}</code>
              </pre>
            </div>

            <div className="pt-2">
              <Link
                href="/docs#quickstart"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#0272FC] hover:bg-[#0272FC]/90 text-white text-xs font-medium transition-all shadow-sm"
              >
                <span>Tam Dokümantasyonu Oku</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
