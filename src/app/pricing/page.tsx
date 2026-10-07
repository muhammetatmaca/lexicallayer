"use client";

import React from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { 
  CreditCard, 
  Check, 
  ArrowRight
} from "lucide-react";

const TIERS = [
  {
    name: "Hacker / Starter",
    desc: "Bireysel yazarlar, bağımsız geliştiriciler ve yan projeler için.",
    priceMonthly: "$0",
    period: "sonsuza dek ücretsiz",
    cta: "Ücretsiz Başla",
    href: "/docs#quickstart",
    popular: false,
    features: [
      "Aylık 25,000 Kelime (Arındırma)",
      "Temel De-Slop Kütüphanesi (120+ kalıp)",
      "OpenAI & Ollama Entegrasyonu",
      "Topluluk Desteği (Discord)",
      "1 Adet Özel Kural Listesi"
    ]
  },
  {
    name: "Pro / Team",
    desc: "Büyüyen girişimler, mühendislik takımları ve içerik üreten şirketler.",
    priceMonthly: "$49",
    period: "aylık / faturalandırılır",
    cta: "14 Gün Ücretsiz Dene",
    href: "/docs#reverse-proxy",
    popular: true,
    features: [
      "Aylık 500,000 Kelime (Arındırma)",
      "Tam Kütüphane (480+ sentetik jargon kelimesi)",
      "Tüm Modeller (Anthropic, OpenAI, Gemini, DeepSeek)",
      "Speculative Streaming Proxy Gateway",
      "Özel Yazar Blueprintleri (@founder, @engineer)",
      "Sıfır Veri Saklama (Zero-Retention) Garantisi",
      "Öncelikli E-Posta Desteği"
    ]
  },
  {
    name: "Enterprise",
    desc: "Büyük ölçekli regüle şirketler, bankalar ve yüksek hacimli AI boru hatları.",
    priceMonthly: "Özel",
    period: "yıllık sözleşme",
    cta: "Satış Ekibiyle Görüş",
    href: "mailto:enterprise@lexicallayer.com",
    popular: false,
    features: [
      "Sınırsız Token Hacmi",
      "Şirkete Özel Sözlük ve Yasaklı Sıfat Motoru",
      "Şirket İçi Sunucu / Dedicated VPC Kurulumu",
      "%99.99 SLA & 7/24 Mühendislik Desteği",
      "SOC2 Type II & HIPAA Uyum Raporları",
      "Özel Hesap Yöneticisi"
    ]
  }
];

export default function PricingPage() {
  return (
    <PageLayout
      badge="Şeffaf Fiyatlandırma • Kullandıkça Öde"
      badgeIcon={<CreditCard className="size-3.5" />}
      title="Şirketiniz İçin"
      italicTitle="En Uygun Plan"
      subtitle="Gizli ücretler yok. İster ücretsiz başlangıç paketiyle yerel CLI kullanın, ister üretim ortamında milyonlarca kelimeyi arındırın."
      sideAction={
        <div className="p-5 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs text-[#0f1d33] w-full max-w-sm space-y-1.5">
          <div className="text-xs font-mono font-bold text-[#0272FC]">14 Günlük Risksiz Deneme</div>
          <p className="text-xs text-[#445e5f] font-light leading-relaxed">
            Kredi kartı gerekmez. Dakikalar içinde ters vekilinizi bağlayın.
          </p>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {TIERS.map(tier => (
          <div
            key={tier.name}
            className={`p-8 sm:p-10 rounded-3xl border flex flex-col justify-between transition-all ${
              tier.popular 
                ? "bg-white border-[#0272FC] shadow-xl ring-2 ring-[#0272FC]" 
                : "bg-white/80 border-[#222f30]/10 shadow-xs hover:border-[#222f30]/30"
            }`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-[#222f30]">{tier.name}</h3>
                {tier.popular && (
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#0272FC] text-white font-semibold">
                    En Çok Tercih Edilen
                  </span>
                )}
              </div>

              <p className="text-xs text-[#445e5f] font-light min-h-[32px]">
                {tier.desc}
              </p>

              <div className="pt-2">
                <div className="text-4xl sm:text-5xl font-light font-mono text-[#222f30]">
                  {tier.priceMonthly}
                </div>
                <div className="text-xs font-mono text-[#445e5f] mt-1">
                  {tier.period}
                </div>
              </div>

              <div className="pt-6 border-t border-[#222f30]/8 space-y-3">
                <div className="text-xs font-mono text-[#222f30] font-semibold uppercase tracking-wider">
                  Dahil Olan Özellikler
                </div>
                <ul className="space-y-2.5 text-xs text-[#445e5f]">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8">
              <a
                href={tier.href}
                className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-semibold transition-all shadow-sm ${
                  tier.popular
                    ? "bg-[#0272FC] text-white hover:bg-[#0272FC]/90"
                    : "bg-[#222f30] text-white hover:bg-[#222f30]/90"
                }`}
              >
                <span>{tier.cta}</span>
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
