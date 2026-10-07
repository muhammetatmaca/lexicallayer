"use client";

import React from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { 
  Building2, 
  Quote, 
  Layers
} from "lucide-react";

const CASE_STUDIES = [
  {
    company: "SaaS Scale Engine",
    industry: "Developer Infrastructure",
    leadMetric: "Haftalık 140 Saat Editoryal Tasarruf",
    subMetric: "%0 Robotik İçerik Şikayeti",
    quote: "Her hafta yüzlerce teknik dokümantasyon ve blog taslağını gözden geçirmek mühendislik ekibimizi tüketiyordu. LexicalLayer'ı entegre ettikten sonra içerik kalitemiz ve netliğimiz tavan yaptı.",
    author: "Caner Vural, VP of Engineering",
    details: "12 kişilik mühendislik ekibi, teknik kılavuzların OpenAI çıktılarındaki 'delve', 'moreover' ve gereksiz giriş lafazanlığını temizlemek için saatler harcıyordu. LexicalLayer @engineer blueprinti ile tek tıkla entegre edildi."
  },
  {
    company: "Apex Capital Partners",
    industry: "VC & Private Equity",
    leadMetric: "Yatırım Komitesi (IC) İnceleme Süresi -%65",
    subMetric: "%100 Veri ve Metrik Odaklı Dil",
    quote: "ChatGPT ile yazılmış girişim analizleri 'şirket ekosistemde bir meşaledir' gibi içi boş övgülerle doluydu. LexicalLayer sayesinde analizlerimiz yalnızca rakamlardan, gerçek risklerden ve pazar gerçeklerinden oluşuyor.",
    author: "Melis Şen, Principal Partner",
    details: "Yılda 600'den fazla şirket analizi yapan fon, tüm yapay zeka özetleme hattını LexicalLayer Gateway arkasına aldı. Ortakların raporları okuma ve karar alma hızı iki katına çıktı."
  },
  {
    company: "FinFlow Global",
    industry: "Regulated FinTech",
    leadMetric: "Regülasyon Uyumluluk Skoru %99.4",
    subMetric: "0 Yanıltıcı Sıfat Riski",
    quote: "Finansal müşteri temsilcisi botlarımızda yapay zekanın 'kesin kâr sağlar' veya 'eşsiz fırsat' gibi regülasyon cezası getirebilecek kelimeler kullanma ihtimalini tamamen ortadan kaldırdık.",
    author: "Ahmet Doğan, Head of Compliance",
    details: "Saniyede 450 müşteri talebini karşılayan yapay zeka müşteri asistanı, LexicalLayer ters vekilinden geçerek yanıt veriyor. Finansal jargon kuralları anlık olarak denetleniyor."
  }
];

export default function CaseStudiesPage() {
  return (
    <PageLayout
      badge="Gerçek Vaka Analizleri • Production Impact"
      badgeIcon={<Building2 className="size-3.5" />}
      title="Üretim Hattında"
      italicTitle="Başarı Hikayeleri"
      subtitle="Lider teknoloji, yatırım ve finans ekiplerinin LexicalLayer kullanarak yapay zeka çıktılarını nasıl güvenilir kurumsal varlıklara dönüştürdüğünü inceleyin."
      sideAction={
        <div className="p-5 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs text-[#0f1d33] w-full max-w-sm space-y-1.5">
          <div className="text-xs font-mono font-bold text-emerald-700">10M+ Token Denetlendi</div>
          <p className="text-xs text-[#445e5f] font-light leading-relaxed">
            Haftalık ortalama 140 saatlik zaman tasarrufu ve sıfır marka itibar riski.
          </p>
        </div>
      }
    >
      <div className="space-y-12 max-w-5xl mx-auto">
        {CASE_STUDIES.map((item) => (
          <div
            key={item.company}
            className="p-8 sm:p-12 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs hover:border-[#0272FC]/40 transition-all space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222f30]/10">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#0272FC] font-semibold">{item.industry}</span>
                <h3 className="text-2xl font-light text-[#222f30]">{item.company}</h3>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-lg font-semibold font-mono text-emerald-700">{item.leadMetric}</div>
                <div className="text-xs text-[#445e5f] font-mono">{item.subMetric}</div>
              </div>
            </div>

            <div className="space-y-4">
              <Quote className="size-8 text-[#0272FC]/30" />
              <blockquote className="text-base sm:text-lg text-[#222f30] font-light italic leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="text-xs font-mono text-[#445e5f] font-semibold">
                &mdash; {item.author}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#f7f7f5] border border-[#222f30]/8 text-xs text-[#445e5f] font-light leading-relaxed">
              <span className="font-semibold text-[#222f30] font-mono block mb-1">Mühendislik Detayı:</span>
              {item.details}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
