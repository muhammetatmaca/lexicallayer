"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { 
  Scale, 
  ArrowRight, 
  Check, 
  Layers
} from "lucide-react";

const COMPARISONS = [
  {
    id: "chatgpt",
    title: "LexicalLayer vs. Raw OpenAI API",
    subtitle: "Ham OpenAI API Çıktısı vs. Gerçek Zamanlı Leksikal Katman",
    badge: "Popüler Karşılaştırma",
    summary: "Ham model çıktıları, RLHF nedeniyle sürekli 'delve', 'testament', 'tapestry' ve 'vital beacon' gibi kurumsal klişeleri üretir. LexicalLayer, modelin mantık zekasını korurken bu yapay dil tortusunu anlık olarak temizler.",
    features: [
      { name: "Sentetik Jargon (Slop) Ayıklama", raw: "Yok (Aşırı klişe yoğunluğu)", lexical: "Otomatik (480+ kelime kütüphanesi)" },
      { name: "Özel Marka Ton Kilidi (Tone Lock)", raw: "Zayıf (Prompt leak ve unutma)", lexical: "Kesin (%100 Deterministic Gateway)" },
      { name: "Gecikme (Latency Overhead)", raw: "0ms (Filtresiz)", lexical: "Hissedilmeyen Gecikme (Speculative Proxy)" },
      { name: "Şirket İçi Yasaklı Kelime Sözlüğü", raw: "Prompt içine yazmak gerekir", lexical: "Merkezi Dashboard & API kuralı" },
      { name: "Prompt Token Tüketimi", raw: "Sürekli negatif prompt gerektirir", lexical: "0 Ekstra Prompt Tokeni" },
      { name: "Doğrudan/Yalın Founder Üslubu", raw: "Aşırı dolaylı ve yapmacık kibar", lexical: "Radikal doğrudanlık ve netlik" }
    ]
  },
  {
    id: "claude",
    title: "LexicalLayer vs. Anthropic Claude",
    subtitle: "Uzun Akıl Yürütme vs. Kurumsal Ses Standardizasyonu",
    badge: "Geliştirici Tercihi",
    summary: "Claude kodlamada ve akıl yürütmede harikadır ancak metin yazarken aşırı akademik, kendini tekrar eden ve tedbirli ('It's important to consider...') paragraflar kurar. LexicalLayer, modelin üstün zekasını korur, dolambaçlı gevezeliği keser.",
    features: [
      { name: "Aşırı Tedbirli Dolgu Cümleleri", raw: "Sıkça görülür ('It is worth noting...')", lexical: "Otomatik temizlenir" },
      { name: "Kod İçi Yorum Satırı Temizliği", raw: "Aşırı açıklamalı", lexical: "Kısa, net ve endüstri standardı" },
      { name: "Mühendis / Founder Blueprinti", raw: "Manuel prompt", lexical: "Tek satır header (@founder)" },
      { name: "Streaming SSE Desteği", raw: "Destekler", lexical: "0ms hissedilen gecikmeyle stream eder" }
    ]
  },
  {
    id: "manual",
    title: "LexicalLayer vs. Manuel İnsan Redaksiyonu",
    subtitle: "40 Saatlik Editoryal Gözden Geçirme vs. Makine Hızı",
    badge: "Maliyet & Hız",
    summary: "Büyüyen şirketlerde her yapay zeka çıktısını bir editörün okuyup düzeltmesi operasyonel bir kabustur. LexicalLayer, bir kıdemli başyazarın titizliğini milisaniyeler içinde üretim bandınıza getirir.",
    features: [
      { name: "İşlem Süresi", raw: "2 - 40 Saat", lexical: "< 10 Milisaniye" },
      { name: "Kelime Başına Maliyet", raw: "$0.05 - $0.15", lexical: "$0.00008" },
      { name: "Ölçeklenebilirlik", raw: "Günde ~5,000 kelime", lexical: "Saniyede 1,000,000+ token" },
      { name: "Tutarlılık", raw: "İnsan yorgunluğuna bağlı", lexical: "%100 Matematiksel Tutarlılık" }
    ]
  },
  {
    id: "perplexity",
    title: "LexicalLayer vs. Perplexity AI",
    subtitle: "Arama ve Bilgi Sentezi vs. Kurumsal Üretim Middleware",
    badge: "Mimari Ayrım",
    summary: "Perplexity bir arama motoru ve araştırma arayüzüdür. LexicalLayer ise şirketinizin kendi LLM boru hatlarında çalışan, müşteriyle temas eden tüm API çıktılarının kalitesini garanti eden bir altyapı katmanıdır.",
    features: [
      { name: "Hedef Kullanıcı", raw: "Son kullanıcı / Araştırmacı", lexical: "Geliştiriciler & Mühendislik Ekipleri" },
      { name: "API & SDK Entegrasyonu", raw: "Temel Arama API", lexical: "Reverse Proxy, MCP, TypeScript/Python SDK" },
      { name: "Kendi Modellerini Getir (BYOM)", raw: "Kendi modellerine bağlı", lexical: "OpenAI, Claude, Gemini, DeepSeek, Ollama" }
    ]
  }
];

export default function ComparePage() {
  const [activeTab, setActiveTab] = useState(COMPARISONS[0].id);
  const selected = COMPARISONS.find(c => c.id === activeTab) || COMPARISONS[0];

  return (
    <PageLayout
      badge="Platform Karşılaştırmaları"
      badgeIcon={<Scale className="size-3.5" />}
      title="Neden Yalnızca"
      italicTitle="Ham LLM Yetmez?"
      subtitle="Ham ChatGPT, Claude, Perplexity veya manuel redaksiyon süreçleri ile LexicalLayer mimarisinin teknik ve operasyonel farklarını inceleyin."
      sideAction={
        <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-white border border-[#222f30]/10 shadow-xs">
          {COMPARISONS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#222f30] text-white shadow-xs"
                  : "bg-[#f7f7f5] text-[#445e5f] hover:text-[#222f30]"
              }`}
            >
              {tab.title.replace("LexicalLayer vs. ", "")}
            </button>
          ))}
        </div>
      }
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Info Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#0272FC] uppercase tracking-wider font-semibold">
              {selected.badge}
            </span>
            <span className="text-xs font-mono text-[#445e5f]">
              {selected.subtitle}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-[#222f30]">
            {selected.title}
          </h2>
          <p className="text-sm sm:text-base text-[#445e5f] font-light leading-relaxed">
            {selected.summary}
          </p>
        </div>

        {/* Matrix Table */}
        <div className="rounded-3xl bg-white border border-[#222f30]/10 shadow-xs overflow-hidden">
          <div className="grid grid-cols-12 bg-[#f0f0ee] border-b border-[#222f30]/10 px-6 py-4 text-xs font-mono uppercase tracking-wider font-semibold text-[#445e5f]">
            <div className="col-span-5">Özellik / Kriter</div>
            <div className="col-span-3 text-zinc-500">Alternatif Yaklaşım</div>
            <div className="col-span-4 text-[#0272FC]">LexicalLayer Gateway</div>
          </div>

          <div className="divide-y divide-[#222f30]/8">
            {selected.features.map(f => (
              <div key={f.name} className="grid grid-cols-12 px-6 py-5 items-center text-xs sm:text-sm">
                <div className="col-span-5 font-medium text-[#222f30]">
                  {f.name}
                </div>
                <div className="col-span-3 text-[#445e5f] font-light pr-2">
                  {f.raw}
                </div>
                <div className="col-span-4 font-medium text-[#0272FC] flex items-center gap-2">
                  <Check className="size-4 shrink-0 text-emerald-600" />
                  <span>{f.lexical}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Box */}
        <div className="p-8 rounded-3xl bg-[#0c1017] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl font-medium">Kendi modellerinizde canlı deneyin</h3>
            <p className="text-xs text-zinc-400 font-light">30 saniyede ters vekil URL&apos;ini ekleyin, sentetik jargondan anında kurtulun.</p>
          </div>
          <Link
            href="/docs#quickstart"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0272FC] hover:bg-[#0272FC]/90 text-white text-xs font-semibold transition-all shadow-md shrink-0"
          >
            <span>Dokümantasyonu İncele</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
