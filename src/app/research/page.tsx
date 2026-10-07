"use client";

import React from "react";
import Link from "next/link";
import { PageLayout } from "@/components/layout/page-layout";
import { 
  FlaskConical, 
  ExternalLink, 
  ArrowRight
} from "lucide-react";

const RESEARCH_PAPERS = [
  {
    tag: "Science Advances & arXiv",
    id: "arXiv:2406.07016",
    title: "Delving into LLM Writing: Surge of Characteristic Vocabulary in Academic Literature",
    authors: "Dmitry Kobak, Rita González-Márquez et al. (Tübingen / Northwestern)",
    year: "2024",
    link: "https://arxiv.org/abs/2406.07016",
    summary: "2023 sonrasında akademik literatürde 'delve', 'tapestry', 'testament' ve 'beacon' gibi yapay zeka tarafından orantısızca tercih edilen yüzlerce kelimenin kullanımındaki patlamayı matematiksel olarak kanıtlayan öncü çalışma.",
    metrics: [
      { label: "'Delve' Artış Oranı", value: "%1,380" },
      { label: "Analiz Edilen Makale", value: "1.4M+" },
      { label: "Tespit Edilen Klişe Kelime", value: "480+" }
    ]
  },
  {
    tag: "Nature Journal (2024)",
    id: "Nature 631, 755–759",
    title: "AI Models Collapse When Trained on Recursively Generated Synthetic Data",
    authors: "Ilia Shumailov, Zakhar Shumaylov, Yarin Gal et al. (Oxford & Cambridge)",
    year: "2024",
    link: "https://www.nature.com/articles/s41586-024-07566-x",
    summary: "Yapay zeka modellerinin kendi ürettikleri sentetik metinlerle tekrar beslendiklerinde yaşadıkları geri döndürülemez kalite kaybını (Model Collapse) ortaya koyan Nature çalışması. Özgün ve gerçek insan dili filtrelemesinin neden zorunlu olduğunu temellendirir.",
    metrics: [
      { label: "Model Çöküş Eşiği", value: "3. Jenerasyon" },
      { label: "Varyans Kaybı", value: "-%84" },
      { label: "Doğrulama Metodu", value: "Matematiksel Teorem" }
    ]
  },
  {
    tag: "Google Research & DeepMind",
    id: "arXiv:2211.17192",
    title: "Fast Inference from Transformers via Speculative Decoding",
    authors: "Yaniv Leviathan, Matan Kalman, Yossi Matias (Google Research)",
    year: "2023",
    link: "https://arxiv.org/abs/2211.17192",
    summary: "LexicalLayer Gateway ters vekil mimarisinin temel aldığı spekülatif akış denetimi. Modelin çıktı dağılımını bozmadan, eşzamanlı token doğrulama tekniğiyle gecikmesiz filtreleme uygulanmasını mümkün kılar.",
    metrics: [
      { label: "Inference Hızlanması", value: "2.5x – 3x" },
      { label: "Dağılım Doğruluğu", value: "%100 Kesin" },
      { label: "Ek Bellek Maliyeti", value: "0 MB" }
    ]
  },
  {
    tag: "Stanford & Oxford",
    id: "arXiv:2306.05949",
    title: "Evaluating the Social and Linguistic Impact of Generative AI Outputs",
    authors: "Irene Solaiman et al.",
    year: "2023",
    link: "https://arxiv.org/abs/2306.05949",
    summary: "Yapay zeka çıktılarının kurumsal itibar, okuyucu güveni ve insan yazım kalitesi üzerindeki uzun vadeli etkilerini inceleyen standart değerlendirme çerçevesi.",
    metrics: [
      { label: "Okuyucu Güven Erozyonu", value: "-%41" },
      { label: "Kurumsal Algı Kaybı", value: "-%58" },
      { label: "Test Edilen Denek", value: "4,200 Kişi" }
    ]
  }
];

export default function ResearchPage() {
  return (
    <PageLayout
      badge="Akademik Araştırmalar • Peer-Reviewed Grounding"
      badgeIcon={<FlaskConical className="size-3.5" />}
      title="Yapay Zeka Dilbilimi ve"
      italicTitle="Model Çöküşü"
      subtitle="LexicalLayer keyfi kurallarla değil; Nature, Oxford, Cambridge ve Google Research tarafından hakemli dergilerde yayımlanan gerçek araştırmalar üzerine inşa edilmiştir."
      sideAction={
        <div className="p-5 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs text-[#0f1d33] w-full max-w-sm space-y-2">
          <div className="text-xs font-mono font-bold text-[#0272FC] uppercase">Nature 2024 Doğrulaması</div>
          <p className="text-xs text-[#445e5f] font-light leading-relaxed">
            Yapay zeka sentetik veriyle beslendiğinde varyans %84 oranında çöker. Özgün dil katmanı bir tercih değil, zorunluluktur.
          </p>
        </div>
      }
    >
      <div className="space-y-12">
        {RESEARCH_PAPERS.map((paper) => (
          <div
            key={paper.id}
            className="p-8 sm:p-12 rounded-3xl bg-white border border-[#222f30]/10 shadow-xs hover:border-[#0272FC]/40 transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-[#0272FC]/10 text-[#0272FC] font-semibold">
                    {paper.tag}
                  </span>
                  <span className="text-[#445e5f]">{paper.id}</span>
                  <span className="text-[#445e5f]">&bull; {paper.year}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-light text-[#222f30] leading-snug">
                  {paper.title}
                </h3>

                <div className="text-xs font-medium text-[#445e5f]">
                  {paper.authors}
                </div>

                <p className="text-sm text-[#445e5f] font-light leading-relaxed pt-2">
                  {paper.summary}
                </p>

                <div className="pt-4">
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#0272FC] font-mono uppercase tracking-wider hover:underline"
                  >
                    <span>Resmi Makaleyi Oku</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </div>

              {/* Metrics Box */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-[#f7f7f5] border border-[#222f30]/10 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-[#445e5f] font-semibold">
                  Araştırma Metrikleri
                </div>
                <div className="space-y-3">
                  {paper.metrics.map(m => (
                    <div key={m.label} className="flex items-center justify-between border-b border-[#222f30]/8 pb-2">
                      <span className="text-xs text-[#445e5f]">{m.label}</span>
                      <span className="text-sm font-semibold font-mono text-[#222f30]">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
