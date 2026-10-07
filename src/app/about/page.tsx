"use client";

import React from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { 
  ShieldCheck, 
  ArrowRight, 
  Compass,
  CheckCircle2
} from "lucide-react";
import { LexicalLogo } from "@/components/ui/lexical-logo";

const VALUES = [
  {
    title: "İnsan Sesinin Özgünlüğü",
    desc: "Yapay zeka hızlıdır, ancak ortalama çıktısı 'delve', 'tapestry' gibi aynı 100 kalıp kelimeye sıkışır. Misyonumuz, makinenin insanı tek tipleştirmesine izin vermemektir."
  },
  {
    title: "Sıfır Gecikme, Sıfır Veri Saklama",
    desc: "LexicalLayer bir veri madenciliği şirketi değildir. İstemci verilerinizi asla sunucularımızda depolamıyor, modelleri eğitmek için kullanmıyor ve aktarımda hissedilmeyen gecikmeyle çalışıyoruz."
  },
  {
    title: "Açık ve Bağımsız Standartlar",
    desc: "Tek bir modele veya tek bir yapay zeka sağlayıcısına bağımlı değilsiniz. OpenAI, Anthropic, Gemini veya yerel modelleriniz arasında dilediğiniz gibi geçiş yapabilirsiniz."
  }
];

const MILESTONES = [
  {
    date: "2024",
    title: "Kurucu Hipotezi & Araştırma",
    desc: "Akademik literatürdeki LLM kelime patlamaları analiz edildi ve model çöküşü hipotezleri üzerine ilk ters vekil prototipi geliştirildi."
  },
  {
    date: "2025",
    title: "LexicalLayer Gateway v1.0",
    desc: "OpenAI ve Anthropic için sıfır kod değişikliği gerektiren ilk yüksek hızlı ters vekil motoru canlıya alındı."
  },
  {
    date: "2026",
    title: "Evrensel SDK & Şirket Sözlükleri",
    desc: "20+ yapay zeka modelini destekleyen, özel marka ton kurallarını anlık doğrulayan küresel katman yayına girdi."
  }
];

export default function AboutPage() {
  return (
    <PageLayout
      badge="Misyonumuz ve Değerlerimiz"
      badgeIcon={<Compass className="size-3.5" />}
      title="Yapay Zeka Çağında"
      italicTitle="İnsan Sesinin Doğallığı"
      subtitle="Her gün milyarlarca token üretiliyor; ancak hepsi birbirine benzeyen yapay klişelerle dolu. LexicalLayer, makineler ile insanlar arasındaki leksikal arındırma katmanıdır."
      sideAction={
        <div className="p-5 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs text-[#0f1d33] w-full max-w-sm space-y-1.5">
          <div className="text-xs font-mono font-bold text-[#0272FC]">Zero-Retention İlkesi</div>
          <p className="text-xs text-[#445e5f] font-light leading-relaxed">
            Hiçbir veri kaydedilmez, model eğitilmez. Yalnızca şifrelenmiş geçiş anında arındırma yapılır.
          </p>
        </div>
      }
    >
      <div className="space-y-20">
        {/* Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#222f30]">
              Makineler neden hep aynı şekilde konuşuyor?
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#445e5f] font-light leading-relaxed">
              <p>
                Büyük dil modelleri (LLM&apos;ler), RLHF (İnsan Geri Bildirimiyle Pekiştirmeli Öğrenme) süreçlerinde aşırı derecede &quot;güvenli ve yapmacık kibar&quot; olacak şekilde optimize edilir. Bu durum, her metinde &apos;delve&apos;, &apos;tapestry&apos;, &apos;crucial beacon&apos; gibi sentetik ve ruhsuz kelimelerin patlamasına yol açar.
              </p>
              <p>
                Biz, yapay zekanın bu kurumsal ve tekdüze üslubunun marka kimliğinizi tüketmesine izin vermemek için buradayız. LexicalLayer, API çağrılarınızın tam arasına yerleşir; yapay klişeleri budar ve kurucunun veya mühendisin gerçek tonunu açığa çıkarır.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-8 sm:p-12 rounded-3xl border border-[#222f30]/10 shadow-sm space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-[#222f30]/10">
              <LexicalLogo size={42} />
              <div>
                <div className="font-serif italic text-2xl text-[#222f30]">LexicalLayer</div>
                <div className="text-xs font-mono text-[#0272FC] uppercase tracking-wider">Authentic AI Middleware</div>
              </div>
            </div>
            <div className="space-y-3 font-mono text-xs text-[#445e5f]">
              <div className="flex items-center justify-between py-1.5 border-b border-[#222f30]/5">
                <span>Konum</span>
                <span className="text-[#222f30] font-medium">Global &bull; Distributed Gateway</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#222f30]/5">
                <span>Protokol</span>
                <span className="text-[#222f30] font-medium">OpenAI Compatible Reverse Proxy</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#222f30]/5">
                <span>Gecikme Profili</span>
                <span className="text-emerald-600 font-semibold">Zero-Overhead Speculative Proxy</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-[#222f30]/5">
                <span>Veri Gizliliği</span>
                <span className="text-[#222f30] font-medium">Zero-Retention &bull; SOC2 Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#222f30]">
              Temel İlkelerimiz
            </h2>
            <p className="text-sm text-[#445e5f] font-light">
              Mühendislik kararlarımızı ve ürün mimarimizi şekillendiren sarsılmaz prensipler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map(v => (
              <div key={v.title} className="p-8 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs space-y-4">
                <div className="size-10 rounded-xl bg-[#0272FC]/10 flex items-center justify-center text-[#0272FC]">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="text-lg font-medium text-[#222f30]">
                  {v.title}
                </h3>
                <p className="text-xs text-[#445e5f] font-light leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Roadmap */}
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-light text-[#222f30]">Yolculuğumuz</h2>
            <p className="text-sm text-[#445e5f] font-light">Fikirden küresel yapay zeka arındırma katmanına.</p>
          </div>

          <div className="space-y-6">
            {MILESTONES.map((m) => (
              <div key={m.title} className="p-6 rounded-3xl bg-white border border-[#222f30]/10 flex gap-6 items-start shadow-xs">
                <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-[#f0f0ee] text-[#0272FC]">
                  {m.date}
                </span>
                <div className="space-y-1.5">
                  <h4 className="text-base font-medium text-[#222f30]">{m.title}</h4>
                  <p className="text-xs text-[#445e5f] font-light leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0272FC] hover:bg-[#0272FC]/90 text-white text-xs font-medium transition-all shadow-sm"
            >
              <span>Dokümantasyonu Keşfet</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
