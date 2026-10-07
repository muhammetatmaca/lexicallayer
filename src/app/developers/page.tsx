"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight, 
  Key, 
  Webhook, 
  Server
} from "lucide-react";

export default function DevelopersPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <PageLayout
      badge="Developer Hub • v2 API & MCP"
      badgeIcon={<Terminal className="size-3.5" />}
      title="Mühendisler İçin"
      italicTitle="Geliştirici Merkezi"
      subtitle="Model Context Protocol (MCP) sunucusu, anlık SSE akış kancaları, ters vekil geçitleri ve açık kaynaklı SDK mimarisi."
      sideAction={
        <div className="p-5 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs text-[#0f1d33] w-full max-w-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-xs font-semibold font-mono text-[#222f30]">Hızlı MCP Başlatma</span>
          </div>
          <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-2xl bg-[#0c1017] text-xs font-mono text-white shadow-inner">
            <span className="text-emerald-400 select-all">$ npx -y @lexicallayer/mcp</span>
            <button onClick={() => copy("npx -y @lexicallayer/mcp", "hero-mcp")}>
              {copiedKey === "hero-mcp" ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5 text-zinc-400 hover:text-white" />}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* MCP Server Card */}
          <div className="p-8 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="size-12 rounded-2xl bg-[#0272FC]/10 flex items-center justify-center text-[#0272FC]">
                <Server className="size-6" />
              </div>
              <h3 className="text-xl font-medium text-[#222f30]">
                MCP Server (Cursor &amp; Claude)
              </h3>
              <p className="text-xs text-[#445e5f] font-light leading-relaxed">
                Cursor IDE, Claude Desktop ve Windsurf için tek komutla çalışan Model Context Protocol (MCP) aracı. Kod tabanınızdaki sentetik AI yorumlarını anında arındırın.
              </p>
            </div>
            <div className="pt-4 border-t border-[#222f30]/8">
              <div className="bg-[#0c1017] p-3 rounded-xl font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                <code>npx -y @lexicallayer/mcp</code>
                <button onClick={() => copy("npx -y @lexicallayer/mcp", "mcp")}>
                  {copiedKey === "mcp" ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3 text-zinc-400" />}
                </button>
              </div>
            </div>
          </div>

          {/* Webhooks & Streaming Card */}
          <div className="p-8 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="size-12 rounded-2xl bg-[#0272FC]/10 flex items-center justify-center text-[#0272FC]">
                <Webhook className="size-6" />
              </div>
              <h3 className="text-xl font-medium text-[#222f30]">
                Webhooks &amp; Event Stream
              </h3>
              <p className="text-xs text-[#445e5f] font-light leading-relaxed">
                Her API isteğinde filtrelenen kalıpların, engellenen jargon kelimelerinin ve gecikme metriklerinin HMAC-SHA256 imzalı anlık webhook bildirimlerini alın.
              </p>
            </div>
            <div className="pt-4 border-t border-[#222f30]/8">
              <Link href="/docs#streaming" className="text-xs font-mono text-[#0272FC] flex items-center gap-1.5 hover:underline">
                <span>Webhook Kılavuzunu Gör</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* Authentication & API Keys */}
          <div className="p-8 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="size-12 rounded-2xl bg-[#0272FC]/10 flex items-center justify-center text-[#0272FC]">
                <Key className="size-6" />
              </div>
              <h3 className="text-xl font-medium text-[#222f30]">
                Kimlik Doğrulama &amp; Yetki
              </h3>
              <p className="text-xs text-[#445e5f] font-light leading-relaxed">
                Kendi upstream model anahtarlarınızı (OpenAI, Anthropic) güvenle taşıyın veya LexicalLayer Universal Token kullanarak tüm modelleri tek bir faturada birleştirin.
              </p>
            </div>
            <div className="pt-4 border-t border-[#222f30]/8">
              <Link href="/docs#authentication" className="text-xs font-mono text-[#0272FC] flex items-center gap-1.5 hover:underline">
                <span>API Güvenlik Standartları</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* API v2 Reference Sneak Peek */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#0272FC]">REST Endpoints</span>
              <h2 className="text-2xl font-light text-[#222f30]">v2 Universal API Referansı</h2>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
              Status: %99.99 Uptime
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-[#f7f7f5] border border-[#222f30]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">POST</span>
                <span className="text-[#222f30] font-semibold">https://gateway.lexicallayer.com/v1/chat/completions</span>
              </div>
              <span className="text-[#445e5f]">OpenAI Drop-in Replacement</span>
            </div>

            <div className="p-4 rounded-xl bg-[#f7f7f5] border border-[#222f30]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-[#0272FC] text-white text-[10px] font-bold">POST</span>
                <span className="text-[#222f30] font-semibold">https://api.lexicallayer.com/v2/analyze</span>
              </div>
              <span className="text-[#445e5f]">Leksikal Skorlama &amp; Slop Raporu</span>
            </div>

            <div className="p-4 rounded-xl bg-[#f7f7f5] border border-[#222f30]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-purple-600 text-white text-[10px] font-bold">GET</span>
                <span className="text-[#222f30] font-semibold">https://api.lexicallayer.com/v2/blueprints</span>
              </div>
              <span className="text-[#445e5f]">Özel Şirket Sözlükleri &amp; Kuralları</span>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
