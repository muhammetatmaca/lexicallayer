"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { 
  Building2, 
  Landmark, 
  TrendingUp, 
  Code, 
  Newspaper, 
  ArrowRight
} from "lucide-react";

const INDUSTRIES = [
  {
    id: "fintech",
    icon: Landmark,
    title: "Global Finans & Bankacılık",
    tagline: "Kurumsal ölçekte müşteri iletişimi, kredi analizleri ve regülasyon raporları",
    challenge: "Banka ve finans kuruluşları, yapay zekanın ürettiği 'kesin garanti ederiz', 'muazzam fırsatlar' gibi yanıltıcı ve regülasyona aykırı sıfatların yol açtığı yasal cezalardan çekinir.",
    solution: "LexicalLayer, tüm müşteri yanıtlarını ve iç analiz notlarını sıkı regülasyon sözlükleriyle denetler. Finansal abartıları ve belirsiz sıfatları temizler, kesin ve denetlenebilir bir dil sunar.",
    metrics: [
      { label: "Uyum Riski Azalması", value: "%94" },
      { label: "Denetim Hazırlık Hızı", value: "Anlık (0ms)" }
    ]
  },
  {
    id: "vc",
    icon: TrendingUp,
    title: "VC & Özel Sermaye (Private Equity)",
    tagline: "Yatırım notları, kurucu durum tespiti (DD) ve IC komite raporları",
    challenge: "Yapay zeka araçlarıyla yazılan yatırım tezleri, 'delve into market synergies' ve 'testament to ecosystem' gibi içi boş kalıplarla dolup karar vericilerin güvenini sarsar.",
    solution: "IC (Yatırım Komitesi) notları otomatik olarak 'Founder/Investor' modunda filtrelenir; sadece metrikler, gerçek pazar verileri ve somut analizler kalır.",
    metrics: [
      { label: "Döküman İnceleme Süresi", value: "-%60" },
      { label: "Doğrudan Veri Netliği", value: "%100" }
    ]
  },
  {
    id: "devs",
    icon: Code,
    title: "Yazılım Şirketleri & Geliştirici Araçları",
    tagline: "Teknik dokümantasyon, API kılavuzları ve sürüm notları (Changelog)",
    challenge: "Yazılımcılar laf kalabalığından nefret eder. ChatGPT ile yazılmış teknik kılavuzlardaki süslü giriş paragrafları geliştirici terk oranını artırır.",
    solution: "Dokümantasyon boru hattına eklenen LexicalLayer, gereksiz giriş-çıkış lafazanlığını atar, doğrudan kod blokları ve net hata açıklamaları bırakır.",
    metrics: [
      { label: "Geliştirici Memnuniyeti", value: "4.9 / 5" },
      { label: "Kelime Hacmi Tasarrufu", value: "%38" }
    ]
  },
  {
    id: "pr",
    icon: Newspaper,
    title: "Kurumsal İletişim & Liderlik PR",
    tagline: "Basın bültenleri, CEO mektupları ve stratejik duyurular",
    challenge: "Sosyal medyada ve basında yapay zeka tarafından yazıldığı anlaşılan metinler, şirketin ciddiyetine ve marka prestijine onarılamaz darbe vurur.",
    solution: "Şirketinizin kurucularına özel 'Yazar Blueprinti' tanımlanır. Çıktı alan LLM, şirket liderinin kendine has üslubundan ve kelime dağarcığından asla sapamaz.",
    metrics: [
      { label: "Robotik Algı Oranı", value: "%0" },
      { label: "Orijinal Ton Sadakati", value: "%99.8" }
    ]
  }
];

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);
  const activeIndustry = INDUSTRIES.find(i => i.id === activeTab) || INDUSTRIES[0];
  const IconComponent = activeIndustry.icon;

  return (
    <PageLayout
      badge="Sektörel Çözümler • Enterprise Scale"
      badgeIcon={<Building2 className="size-3.5" />}
      title="Yüksek Standartlı Ekipler İçin"
      italicTitle="Leksikal Altyapı"
      subtitle="Bankacılık, yatırım sermayesi, geliştirici araçları ve kurumsal iletişimde yapay zekanın itibarınızı aşındırmasına izin vermeyin."
      sideAction={
        <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-white border border-[#222f30]/10 shadow-xs">
          {INDUSTRIES.map(item => {
            const ItemIcon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeTab === item.id
                    ? "bg-[#222f30] text-white shadow-xs"
                    : "bg-[#f7f7f5] text-[#445e5f] hover:text-[#222f30]"
                }`}
              >
                <ItemIcon className="size-3.5" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      }
    >
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs space-y-8">
          <div className="flex items-center gap-4 pb-6 border-b border-[#222f30]/10">
            <div className="size-12 rounded-2xl bg-[#0272FC]/10 flex items-center justify-center text-[#0272FC]">
              <IconComponent className="size-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-light text-[#222f30]">{activeIndustry.title}</h2>
              <p className="text-xs font-mono text-[#0272FC] uppercase tracking-wider">{activeIndustry.tagline}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-3">
              <span className="text-xs font-mono text-rose-700 uppercase font-semibold">Mevcut Sorun &amp; Risk</span>
              <p className="text-xs sm:text-sm text-[#445e5f] font-light leading-relaxed">
                {activeIndustry.challenge}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
              <span className="text-xs font-mono text-emerald-700 uppercase font-semibold">LexicalLayer Çözümü</span>
              <p className="text-xs sm:text-sm text-[#445e5f] font-light leading-relaxed">
                {activeIndustry.solution}
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-2 gap-6 border-t border-[#222f30]/10">
            {activeIndustry.metrics.map(m => (
              <div key={m.label} className="p-4 rounded-xl bg-[#f7f7f5] border border-[#222f30]/8">
                <div className="text-xs text-[#445e5f] font-mono">{m.label}</div>
                <div className="text-2xl sm:text-3xl font-light text-[#222f30] font-mono mt-1">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Box */}
        <div className="p-8 rounded-3xl bg-[#0c1017] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl font-medium">Kurumsal pilot denemesi başlatın</h3>
            <p className="text-xs text-zinc-400 font-light">Özel şirket sözlüğünüzü ve SLA gereksinimlerinizi yapılandıralım.</p>
          </div>
          <a
            href="mailto:enterprise@lexicallayer.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0272FC] hover:bg-[#0272FC]/90 text-white text-xs font-semibold transition-all shadow-md shrink-0"
          >
            <span>Satış Ekibiyle Görüş</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
