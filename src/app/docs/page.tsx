"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight, 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  FileCode,
  Layers,
  ChevronRight,
  BookOpen,
  Server,
  Key,
  Webhook,
  Activity,
  Sliders,
  Database,
  Radio,
  AlertCircle
} from "lucide-react";

export default function DocsPage() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"proxy" | "ts" | "py" | "curl">("proxy");
  const [activeSection, setActiveSection] = useState<string>("quickstart");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  useEffect(() => {
    // Scroll spy for active sidebar item
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToId = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", `#${id}`);
      setActiveSection(id);
    }
  };

  const navItemClass = (id: string) => 
    `block py-1 px-2 rounded-lg transition-all text-xs ${
      activeSection === id
        ? "bg-[#222f30] text-white font-medium"
        : "text-[#445e5f] hover:text-[#222f30] hover:bg-black/5"
    }`;

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#222f30] font-sans antialiased selection:bg-[#cef79e] selection:text-[#222f30] scroll-smooth">
      <Navbar theme="glass" />

      {/* Docs Header */}
      <section className="pt-32 pb-12 px-6 md:px-12 border-b border-[#222f30]/10 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#445e5f] font-semibold">
              LexicalLayer API &bull; v2.4 Reference
            </span>
            <h1 className="text-3xl sm:text-5xl font-light text-[#222f30] tracking-tight">
              Geliştirici Dokümantasyonu
            </h1>
            <p className="text-sm sm:text-base text-[#445e5f] font-light leading-relaxed">
              Mevcut LLM sağlayıcılarınızın (OpenAI, Anthropic, Gemini, DeepSeek, vLLM) önüne sıfır gecikmeli ters vekil yerleştirin veya yerel SDK ile entegre edin.
            </p>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Navigation Sidebar + Deep Technical Docs */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sticky Index Sidebar */}
        <aside className="lg:col-span-3">
          <div className="sticky top-28 space-y-6 bg-white p-6 rounded-2xl border border-[#222f30]/10 shadow-xs max-h-[calc(100vh-140px)] overflow-y-auto">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#445e5f] font-semibold">
                1. Hızlı Başlangıç
              </span>
              <ul className="space-y-1">
                <li><a href="#quickstart" onClick={(e) => scrollToId(e, "quickstart")} className={navItemClass("quickstart")}>Mimari Genel Bakış</a></li>
                <li><a href="#installation" onClick={(e) => scrollToId(e, "installation")} className={navItemClass("installation")}>Paket Yöneticileri</a></li>
                <li><a href="#authentication" onClick={(e) => scrollToId(e, "authentication")} className={navItemClass("authentication")}>API Anahtarları &amp; Yetki</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#445e5f] font-semibold">
                2. Entegrasyon Tipleri
              </span>
              <ul className="space-y-1">
                <li><a href="#reverse-proxy" onClick={(e) => scrollToId(e, "reverse-proxy")} className={navItemClass("reverse-proxy")}>Reverse Proxy (0-Code)</a></li>
                <li><a href="#node-sdk" onClick={(e) => scrollToId(e, "node-sdk")} className={navItemClass("node-sdk")}>Node / TypeScript SDK</a></li>
                <li><a href="#python-sdk" onClick={(e) => scrollToId(e, "python-sdk")} className={navItemClass("python-sdk")}>Python Async Client</a></li>
                <li><a href="#mcp-protocol" onClick={(e) => scrollToId(e, "mcp-protocol")} className={navItemClass("mcp-protocol")}>MCP Server (Cursor/Claude)</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#445e5f] font-semibold">
                3. Çekirdek Özellikler
              </span>
              <ul className="space-y-1">
                <li><a href="#blueprints" onClick={(e) => scrollToId(e, "blueprints")} className={navItemClass("blueprints")}>Blueprint Header Parametreleri</a></li>
                <li><a href="#custom-dictionary" onClick={(e) => scrollToId(e, "custom-dictionary")} className={navItemClass("custom-dictionary")}>Özel Şirket Sözlüğü API</a></li>
                <li><a href="#streaming" onClick={(e) => scrollToId(e, "streaming")} className={navItemClass("streaming")}>SSE Canlı Token Akışı</a></li>
                <li><a href="#error-codes" onClick={(e) => scrollToId(e, "error-codes")} className={navItemClass("error-codes")}>Hata Kodları &amp; Telemetri</a></li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Technical Documentation Content */}
        <main className="lg:col-span-9 space-y-16">
          {/* Quickstart / Architecture */}
          <section id="quickstart" className="space-y-4 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0272FC] uppercase tracking-wider">
              <BookOpen className="size-4" /> 01 / Mimari
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-[#222f30] tracking-tight">
              Mimari Genel Bakış
            </h2>
            <p className="text-xs sm:text-sm text-[#445e5f] font-light leading-relaxed">
              LexicalLayer, istemciniz ile model sağlayıcısı (OpenAI, Anthropic, yerel vLLM) arasına giren bağımsız bir yüksek hızlı ters vekildir. Gelen istekleri aynen upstream sağlayıcıya iletir, dönen token akışını <strong>Speculative Stream Pipeline</strong> ile filtreler.
            </p>

            <div className="p-4 rounded-xl bg-white border border-[#222f30]/10 font-mono text-xs space-y-2">
              <div className="text-[#445e5f] text-[11px] font-semibold uppercase">Trafik Akışı:</div>
              <div className="text-[#222f30] flex items-center gap-2 flex-wrap">
                <span className="px-2 py-1 rounded bg-[#f7f7f5] border border-[#222f30]/10">İstemci Uygulamanız</span>
                <span>&rarr;</span>
                <span className="px-2 py-1 rounded bg-[#0272FC]/10 text-[#0272FC] font-semibold border border-[#0272FC]/20">LexicalLayer Gateway</span>
                <span>&rarr;</span>
                <span className="px-2 py-1 rounded bg-[#f7f7f5] border border-[#222f30]/10">OpenAI / Claude API</span>
              </div>
            </div>
          </section>

          {/* Installation */}
          <section id="installation" className="space-y-4 pt-8 border-t border-[#222f30]/10 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0272FC] uppercase tracking-wider">
              <Terminal className="size-4" /> 02 / Kurulum
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-[#222f30] tracking-tight">
              Paket Yöneticileri ve Kurulum
            </h2>
            <p className="text-xs sm:text-sm text-[#445e5f] font-light leading-relaxed">
              İhtiyacınıza göre Node.js SDK, Python Client veya tek satırda çalışan Model Context Protocol (MCP) paketini kurabilirsiniz.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-[#222f30]/10 space-y-2">
                <div className="text-[10px] text-[#445e5f] uppercase font-semibold">Node.js / TypeScript</div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#0c1017] text-zinc-300">
                  <span className="select-all">npm i @lexicallayer/sdk</span>
                  <button onClick={() => copyToClipboard("npm i @lexicallayer/sdk", "pkg-npm")} className="cursor-pointer">
                    {copiedCmd === "pkg-npm" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5 text-zinc-400 hover:text-white" />}
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#222f30]/10 space-y-2">
                <div className="text-[10px] text-[#445e5f] uppercase font-semibold">Python (PyPI)</div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#0c1017] text-zinc-300">
                  <span className="select-all">pip install lexicallayer</span>
                  <button onClick={() => copyToClipboard("pip install lexicallayer", "pkg-pip")} className="cursor-pointer">
                    {copiedCmd === "pkg-pip" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5 text-zinc-400 hover:text-white" />}
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#222f30]/10 space-y-2">
                <div className="text-[10px] text-[#445e5f] uppercase font-semibold">MCP Server (Zero-Install)</div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#0c1017] text-zinc-300">
                  <span className="select-all">npx -y @lexicallayer/mcp</span>
                  <button onClick={() => copyToClipboard("npx -y @lexicallayer/mcp", "pkg-mcp")} className="cursor-pointer">
                    {copiedCmd === "pkg-mcp" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5 text-zinc-400 hover:text-white" />}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Authentication */}
          <section id="authentication" className="space-y-4 pt-8 border-t border-[#222f30]/10 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0272FC] uppercase tracking-wider">
              <Key className="size-4" /> 03 / Kimlik Doğrulama
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-[#222f30] tracking-tight">
              API Anahtarları &amp; Yetkilendirme
            </h2>
            <p className="text-xs sm:text-sm text-[#445e5f] font-light leading-relaxed">
              LexicalLayer isteklerini yetkilendirmek için konsolunuzdan ürettiğiniz <code>lx_live_</code> veya <code>lx_test_</code> anahtarını <code>X-Lexical-Key</code> başlığı altında veya SDK istemcisinde gönderin.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-[#222f30]/10 space-y-3 font-mono text-xs">
              <div className="text-[#222f30] font-semibold">Gerekli HTTP Başlıkları:</div>
              <div className="space-y-1 text-zinc-700 bg-[#f7f7f5] p-3 rounded-xl border border-[#222f30]/5">
                <div><span className="text-[#0272FC] font-semibold">Authorization:</span> Bearer &lt;UPSTREAM_PROVIDER_KEY&gt;</div>
                <div><span className="text-[#0272FC] font-semibold">X-Lexical-Key:</span> lx_live_9f81a74e0d44...</div>
                <div><span className="text-[#0272FC] font-semibold">Content-Type:</span> application/json</div>
              </div>
              <p className="text-[11px] text-[#445e5f] font-sans">
                &bull; Zero-Retention: API anahtarlarınız veya token verileriniz hiçbir zaman diske yazılmaz ya da loglanmaz.
              </p>
            </div>
          </section>

          {/* Integration 1: Reverse Proxy */}
          <section id="reverse-proxy" className="space-y-4 pt-8 border-t border-[#222f30]/10 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0272FC] uppercase tracking-wider">
              <Server className="size-4" /> 04 / Entegrasyon
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-[#222f30] tracking-tight">
              Reverse Proxy (0-Code Değişikliği)
            </h2>
            <p className="text-xs sm:text-sm text-[#445e5f] font-light leading-relaxed">
              Mevcut OpenAI resmi kütüphanesinde yalnızca <code>baseURL</code> parametresini LexicalLayer Gateway&apos;ine yönlendirin. Kodunuzun geri kalanını aynen koruyun.
            </p>

            <div className="rounded-2xl border border-zinc-800 bg-[#0c1017] p-5 text-white font-mono text-xs leading-relaxed shadow-xl">
              <pre className="overflow-x-auto text-zinc-300">
                <code>{`// OpenAI Resmi Kütüphanesini Değiştirmeden Kullanın
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://gateway.lexicallayer.com/v1", // Sadece baseURL yönlendirin
  apiKey: process.env.OPENAI_API_KEY,             // Kendi API anahtarınız
  defaultHeaders: {
    "X-Lexical-Key": process.env.LEXICAL_KEY,    // LexicalLayer lisans anahtarı
    "X-Lexical-Blueprint": "founder",            // Ton: founder | engineer | minimalist
    "X-Lexical-Deslop": "aggressive",            // Filtre düzeyi: strict | aggressive
  },
});

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: "Yatırımcılara hitaben şirket güncellemesi yaz." }],
  stream: true,
});`}</code>
              </pre>
            </div>
          </section>

          {/* Integration 2: Node / TypeScript SDK */}
          <section id="node-sdk" className="space-y-4 pt-8 border-t border-[#222f30]/10 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0272FC] uppercase tracking-wider">
              <Code2 className="size-4" /> 05 / Entegrasyon
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-[#222f30] tracking-tight">
              Node / TypeScript SDK (@lexicallayer/sdk)
            </h2>
            <p className="text-xs sm:text-sm text-[#445e5f] font-light leading-relaxed">
              Resmi <code>@lexicallayer/sdk</code> paketi, kalibre edilmiş LoRA ağırlıklarınızı (<code>.safetensors</code> ve steering vektörlerini) doğrudan AI agent&apos;larınıza ve OpenAI istemcilerinize tek satırda bağlar.
            </p>

            <div className="space-y-4">
              {/* Sekme 1: wrapOpenAI */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0c1017] p-5 text-white font-mono text-xs leading-relaxed shadow-xl space-y-3">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-zinc-800 pb-2">
                  <span className="text-emerald-400 font-semibold">// 1. OpenAI Agent&apos;larını Doğrudan Sarmalama (En Pratik Yol)</span>
                  <span>TypeScript</span>
                </div>
                <pre className="overflow-x-auto text-zinc-300">
                  <code>{`import OpenAI from "openai";
import { LexicalLayer } from "@lexicallayer/sdk";

// LexicalLayer motorunu tanımlayın (varsayılan: http://127.0.0.1:8001 veya Cloud)
const lexical = new LexicalLayer({
  baseUrl: process.env.LEXICAL_BASE_URL || "http://127.0.0.1:8001",
  agentName: "my-coding-agent",
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// OpenAI client'ı kullanıcının anti-slop & LoRA ağırlıklarıyla sarın
const steeredOpenAI = lexical.wrapOpenAI(openai);

// Normal chat completion çağrısı — arkaplanda bilişsel katman ve kurallar devrede
const response = await steeredOpenAI.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "user", content: "Bu modülün mimarisini nasıl kuralım?" }
  ],
});

console.log(response.choices[0].message.content);`}</code>
                </pre>
              </div>

              {/* Sekme 2: Doğrudan Generate ve Kalibrasyon */}
              <div className="rounded-2xl border border-zinc-800 bg-[#0c1017] p-5 text-white font-mono text-xs leading-relaxed shadow-xl space-y-3">
                <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-zinc-800 pb-2">
                  <span className="text-cyan-400 font-semibold">// 2. Doğrudan Generation ve Ağırlık Metrikleri</span>
                  <span>TypeScript</span>
                </div>
                <pre className="overflow-x-auto text-zinc-300">
                  <code>{`import { LexicalLayer } from "@lexicallayer/sdk";

const lexical = new LexicalLayer();

// Doğrudan üretim ve steering metrikleri
const res = await lexical.generate({
  prompt: "Sistem durumunu ve mimari yaklaşımı açıkla.",
  useUserWeights: true, // .safetensors ağırlıklarını uygular
});

console.log(res.output);
console.log(res.metrics); // { lora_rank_applied: 16, fluff_tokens_suppressed: 18 }

// Aktif Adapter Bilgilerini Çekme (vLLM / Ollama için)
const adapter = await lexical.getCalibratedAdapter();
console.log("Aktif Adapter:", adapter.adapterFilename); // 'user_steered_rank16.safetensors'`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Integration 3: Python SDK */}
          <section id="python-sdk" className="space-y-4 pt-8 border-t border-[#222f30]/10 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0272FC] uppercase tracking-wider">
              <FileCode className="size-4" /> 06 / Entegrasyon
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-[#222f30] tracking-tight">
              Python Async Client
            </h2>
            <p className="text-xs sm:text-sm text-[#445e5f] font-light leading-relaxed">
              Python veri bilimi, LangChain veya LlamaIndex boru hatlarınızda sıfır konfigürasyonla çalışın.
            </p>

            <div className="rounded-2xl border border-zinc-800 bg-[#0c1017] p-5 text-white font-mono text-xs leading-relaxed shadow-xl">
              <pre className="overflow-x-auto text-zinc-300">
                <code>{`# pip install lexicallayer
from lexicallayer import LexicalMiddleware, Blueprint
import openai
import os

client = openai.OpenAI(
    base_url="https://gateway.lexicallayer.com/v1",
    api_key=os.environ.get("OPENAI_API_KEY"),
    default_headers={
        "X-Lexical-Key": os.environ.get("LEXICAL_KEY"),
        "X-Lexical-Blueprint": Blueprint.FOUNDER,
        "X-Lexical-Strictness": "0.95"
    }
)

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Ürün lansman bülteni hazırla."}]
)
print(response.choices[0].message.content)`}</code>
              </pre>
            </div>
          </section>

          {/* Integration 4: MCP Server */}
          <section id="mcp-protocol" className="space-y-4 pt-8 border-t border-[#222f30]/10 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0272FC] uppercase tracking-wider">
              <Cpu className="size-4" /> 07 / Entegrasyon
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-[#222f30] tracking-tight">
              Model Context Protocol (MCP) Kurulumu
            </h2>
            <p className="text-xs sm:text-sm text-[#445e5f] font-light leading-relaxed">
              Cursor IDE veya Claude Desktop üzerinden kod yazarken veya prompt üretirken sentetik yapay zeka yorumlarını engellemek için yerel MCP sunucusunu çalıştırın.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-[#222f30]/10 space-y-3">
              <div className="text-xs font-mono font-semibold text-[#222f30]">Claude Desktop Yapılandırması (~/claude_desktop_config.json):</div>
              <pre className="p-4 rounded-xl bg-[#0c1017] text-emerald-400 font-mono text-xs overflow-x-auto">
                <code>{`{
  "mcpServers": {
    "lexicallayer": {
      "command": "npx",
      "args": ["-y", "@lexicallayer/mcp", "--blueprint", "engineer"]
    }
  }
}`}</code>
              </pre>
            </div>
          </section>

          {/* Feature 1: Blueprints */}
          <section id="blueprints" className="space-y-4 pt-8 border-t border-[#222f30]/10 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0272FC] uppercase tracking-wider">
              <Sliders className="size-4" /> 08 / Çekirdek Özellik
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-[#222f30] tracking-tight">
              Blueprint Header Parametreleri ve Konfigürasyon
            </h2>
            <p className="text-xs sm:text-sm text-[#445e5f] font-light leading-relaxed">
              Gateway&apos;e gönderilen her HTTP isteğinde aşağıdaki başlıklarla (headers) davranışı anlık olarak kontrol edebilirsiniz:
            </p>

            <div className="rounded-2xl bg-white border border-[#222f30]/10 overflow-hidden text-xs">
              <div className="grid grid-cols-12 bg-[#f0f0ee] px-4 py-3 font-mono font-semibold text-[#445e5f] border-b border-[#222f30]/10">
                <div className="col-span-4">Header Adı</div>
                <div className="col-span-3">Olası Değerler</div>
                <div className="col-span-5">Açıklama</div>
              </div>
              <div className="divide-y divide-[#222f30]/8 font-mono">
                <div className="grid grid-cols-12 px-4 py-3 items-center">
                  <div className="col-span-4 font-semibold text-[#0272FC]">X-Lexical-Blueprint</div>
                  <div className="col-span-3 text-zinc-600">founder | engineer | minimalist</div>
                  <div className="col-span-5 font-sans text-[#445e5f]">Hedef dil tonu ve cümle yoğunluğu kuralları.</div>
                </div>
                <div className="grid grid-cols-12 px-4 py-3 items-center">
                  <div className="col-span-4 font-semibold text-[#0272FC]">X-Lexical-Deslop</div>
                  <div className="col-span-3 text-zinc-600">standard | aggressive | passthrough</div>
                  <div className="col-span-5 font-sans text-[#445e5f]">Klişe temizleme agresifliği. Standart: 120 kelime, Aggressive: 480+ kelime.</div>
                </div>
                <div className="grid grid-cols-12 px-4 py-3 items-center">
                  <div className="col-span-4 font-semibold text-[#0272FC]">X-Lexical-Custom-Dictionary</div>
                  <div className="col-span-3 text-zinc-600">dict_id (uuid)</div>
                  <div className="col-span-5 font-sans text-[#445e5f]">Panelden tanımlanan şirkete özel yasaklı/zorunlu kelime sözlüğü.</div>
                </div>
                <div className="grid grid-cols-12 px-4 py-3 items-center">
                  <div className="col-span-4 font-semibold text-[#0272FC]">X-Lexical-Latency-Cap</div>
                  <div className="col-span-3 text-zinc-600">integer (ms) örn: 15</div>
                  <div className="col-span-5 font-sans text-[#445e5f]">Gecikme tavanı. Bu süreyi aşarsa doğrudan ham yanıtı iletir (Zero-Block).</div>
                </div>
              </div>
            </div>
          </section>

          {/* Feature 2: Custom Dictionary API */}
          <section id="custom-dictionary" className="space-y-4 pt-8 border-t border-[#222f30]/10 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0272FC] uppercase tracking-wider">
              <Database className="size-4" /> 09 / Çekirdek Özellik
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-[#222f30] tracking-tight">
              Özel Şirket Sözlüğü API
            </h2>
            <p className="text-xs sm:text-sm text-[#445e5f] font-light leading-relaxed">
              Kendi kurumsal terminolojinizi, marka kılavuzunuzu ve kurum içi yasaklı ifadeleri REST endpointi üzerinden dinamik olarak yükleyip yönetin.
            </p>

            <div className="rounded-2xl border border-zinc-800 bg-[#0c1017] p-5 text-white font-mono text-xs leading-relaxed shadow-xl">
              <pre className="overflow-x-auto text-zinc-300">
                <code>{`// POST https://gateway.lexicallayer.com/v1/dictionaries
curl -X POST https://gateway.lexicallayer.com/v1/dictionaries \\
  -H "Authorization: Bearer lx_live_9f81a74e" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Acme Corp Brand Shield",
    "banned_tokens": ["game-changer", "synergize", "tapestry", "beacon"],
    "required_replacements": {
      "utilize": "use",
      "facilitate": "help"
    },
    "strict_mode": true
  }'`}</code>
              </pre>
            </div>
          </section>

          {/* Feature 3: SSE Streaming */}
          <section id="streaming" className="space-y-4 pt-8 border-t border-[#222f30]/10 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0272FC] uppercase tracking-wider">
              <Radio className="size-4" /> 10 / Canlı Akış
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-[#222f30] tracking-tight">
              Server-Sent Events (SSE) Canlı Token Akışı
            </h2>
            <p className="text-xs sm:text-sm text-[#445e5f] font-light leading-relaxed">
              LexicalLayer, <code>stream: true</code> parametresiyle çalışan tüm sorgularda <strong>sliding window n-gram token buffer</strong> tekniğini kullanır. Model çıktı üretirken tokenlar 1-2 kelimelik tampon bellekten geçer ve son kullanıcıya sıfır hissedilen gecikmeyle (TTFT + 4ms) akar.
            </p>

            <div className="p-4 rounded-xl bg-white border border-[#222f30]/10 font-mono text-xs text-[#222f30] space-y-1">
              <div>HTTP/1.1 200 OK</div>
              <div>Content-Type: text/event-stream; charset=utf-8</div>
              <div>X-Lexical-Slop-Removed: 4</div>
              <div>X-Lexical-Latency-Delta: +6ms</div>
              <div className="text-emerald-600 pt-2">data: {`{"choices":[{"delta":{"content":"Doğrudan ve net analiz."}}]}`}</div>
            </div>
          </section>

          {/* Feature 4: Error Codes & Telemetry */}
          <section id="error-codes" className="space-y-4 pt-8 border-t border-[#222f30]/10 scroll-mt-28">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#0272FC] uppercase tracking-wider">
              <AlertCircle className="size-4" /> 11 / Hata Kodları &amp; Telemetri
            </div>
            <h2 className="text-xl sm:text-2xl font-light text-[#222f30] tracking-tight">
              Hata Kodları &amp; Telemetri Standartları
            </h2>
            <p className="text-xs sm:text-sm text-[#445e5f] font-light leading-relaxed">
              Ağ veya model kesintilerinde hata zarfı (error envelope) RFC 7807 uyumlu JSON olarak döner. Uygulamanız asla sessizce çökmez.
            </p>

            <div className="rounded-2xl bg-white border border-[#222f30]/10 overflow-hidden text-xs">
              <div className="grid grid-cols-12 bg-[#f0f0ee] px-4 py-3 font-mono font-semibold text-[#445e5f] border-b border-[#222f30]/10">
                <div className="col-span-3">HTTP Kodu</div>
                <div className="col-span-4">Hata Kodu (Slug)</div>
                <div className="col-span-5">Çözüm / Davranış</div>
              </div>
              <div className="divide-y divide-[#222f30]/8 font-mono">
                <div className="grid grid-cols-12 px-4 py-3 items-center">
                  <div className="col-span-3 font-semibold text-rose-600">401 Unauthorized</div>
                  <div className="col-span-4 text-zinc-600">invalid_lexical_key</div>
                  <div className="col-span-5 font-sans text-[#445e5f]">X-Lexical-Key başlığını veya ortam değişkenini kontrol edin.</div>
                </div>
                <div className="grid grid-cols-12 px-4 py-3 items-center">
                  <div className="col-span-3 font-semibold text-amber-600">429 Too Many Requests</div>
                  <div className="col-span-4 text-zinc-600">rate_limit_exceeded</div>
                  <div className="col-span-5 font-sans text-[#445e5f]">Dakikalık kelime kotası aşıldı. Otomatik backoff uygulayın.</div>
                </div>
                <div className="grid grid-cols-12 px-4 py-3 items-center">
                  <div className="col-span-3 font-semibold text-sky-600">504 Gateway Timeout</div>
                  <div className="col-span-4 text-zinc-600">upstream_provider_timeout</div>
                  <div className="col-span-5 font-sans text-[#445e5f]">Upstream LLM sağlayıcısı yanıt vermedi; istek otomatik fallback havuzuna yönlendirilir.</div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
