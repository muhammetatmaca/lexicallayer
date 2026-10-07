# LexicalLayer

<div align="center">

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/@lexicallayer/sdk.svg?color=emerald)](https://www.npmjs.com/package/@lexicallayer/sdk)
[![Live Demo](https://img.shields.io/badge/Live%20Platform-lexicallayer.muhammetatmaca.com.tr-0272FC)](https://lexicallayer.muhammetatmaca.com.tr)
[![Turbopack](https://img.shields.io/badge/Next.js-16.3-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)](https://www.typescriptlang.org)

**Real-Time Anti-Slop Representation Engineering & LoRA Steering Gateway for LLM Agents.**

[Canlı Demo](https://lexicallayer.muhammetatmaca.com.tr) • [Studio Deneyimi](https://lexicallayer.muhammetatmaca.com.tr/studio) • [Dokümantasyon](https://lexicallayer.muhammetatmaca.com.tr/docs) • [npm SDK](https://www.npmjs.com/package/@lexicallayer/sdk)

</div>

---

## 📌 Problem: Yapay Zeka Çıktılarındaki "Sentetik Slop" Krizi

Günümüz LLM'leri (GPT-4o, Claude 3.5, Gemini, Llama) varsayılan RLHF ve hizalama süreçleri nedeniyle belirgin kalıplara hapsolmuştur:
* *"In today's fast-paced digital landscape..."*, *"delve deep into the multifaceted tapestry..."*, *"testament to our commitment..."* gibi ezber klişeler.
* Kullanıcının veya şirketin kendine has terminolojisini, doğrudan üslubunu ve otantik sesini bastıran yapay kurumsal laf kalabalığı.
* Prompt mühendisliği ile çözülmeye çalışıldığında token israfı, gecikme (latency) ve prompt enjeksiyonuna karşı kırılganlık.

**LexicalLayer**, prompt düzeyinde kelime manipülasyonu yapmak yerine **bilişsel ağırlık yönlendirmesi (Representation Steering)** ve **sıfır gecikmeli ters vekil mimarisi** kullanarak model çıktılarını kaynağında arındırır.

---

## 🏗️ Mimari & Çözüm Ekosistemi

LexicalLayer üç ana bileşenden oluşan uçtan uca bir sistemdir:

```
[İstemci / AI Agent] 
       │
       ▼
[@lexicallayer/sdk (@0.1.6)]  ──► npm paketi ile tek satırda wrapOpenAI()
       │
       ▼
[Lexical Gateway / Proxy]      ──► <14ms P99 gecikmeyle stream filtreleme & token steering
       │
       ├──► [LoRA Calibration Engine] (.safetensors Rank-16 & residual steering vektörleri)
       │
       ▼
[Upstream LLM] (OpenAI, Anthropic, Gemini, DeepSeek, vLLM, Ollama)
```

1. **Edge Reverse Proxy & Stream Engine:** Model token akışını yakalar; sentetik klişeleri tespit edip engellerken kullanıcının belirlediği yoğunluk ve üslup kurallarını uygular.
2. **LoRA & Representation Steering Motoru:** Kullanıcının yazı örneklerini, notlarını ve dokümanlarını analiz ederek hafif siklet Rank-16 LoRA adaptörü (`user_steered_rank16.safetensors`) ve aktivasyon steering vektörleri üretir.
3. **Resmi npm SDK (`@lexicallayer/sdk`):** Geliştiricilerin herhangi bir OpenAI veya agent zincirini tek satır kodla sarmalamasını sağlar.
4. **Interactive Studio & Web Platform:** Kullanıcıların doküman yükleyip kendi ses parmak izlerini kalibre edebildikleri, interaktif 3D ve WebGL yırtılma animasyonlarıyla desteklenen Next.js platformu.

---

## 📦 Kurulum & SDK Entegrasyonu

SDK npm üzerinde yayınlanmıştır:

```bash
npm install @lexicallayer/sdk
```

### 1. OpenAI İstemcisini Tek Satırda Sarmalama (En Pratik Yol)

```typescript
import OpenAI from "openai";
import { LexicalLayer } from "@lexicallayer/sdk";

// LexicalLayer motorunu başlat
const lexical = new LexicalLayer({
  baseUrl: process.env.LEXICAL_BASE_URL || "http://127.0.0.1:8001",
  agentName: "my-coding-agent",
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// OpenAI client'ı kullanıcının ağırlıklarıyla sar
const steeredOpenAI = lexical.wrapOpenAI(openai);

// Normal chat completion çağrısı — arka planda bilişsel katman devrede
const response = await steeredOpenAI.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "user", content: "Sistem mimarisini net ve doğrudan açıkla." }
  ],
});

console.log(response.choices[0].message.content);
```

### 2. Doğrudan Test & Steering Metrikleri

```typescript
import { LexicalLayer } from "@lexicallayer/sdk";

const lexical = new LexicalLayer();

const result = await lexical.generate({
  prompt: "Mimari yaklaşımı ve teknik seçimleri özetle.",
  useUserWeights: true, // .safetensors ağırlıklarını uygular
});

console.log(result.output);
console.log(result.metrics);
// Çıktı: { lora_rank_applied: 16, fluff_tokens_suppressed: 18 }
```

### 3. Yerel Inference Motorları (vLLM / Ollama / PEFT) İçin Adaptör Çekme

```typescript
const adapter = await lexical.getCalibratedAdapter();
console.log(adapter.adapterFilename); // 'user_steered_rank16.safetensors'
console.log(adapter.rank);            // 16
console.log(adapter.layers);          // Değiştirilen layer indeksleri
```

---

## 💻 Tech Stack & Mühendislik Detayları

| Katman | Teknolojiler |
| :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router), React 19, TypeScript, Turbopack |
| **Styling & UI** | Tailwind CSS v4, Lucide Icons, Custom WebGL Shader Shaders |
| **3D & Animasyonlar** | Spline 3D Scene, Framer Motion, HTML5 Canvas Particle Gimbal |
| **Edge Deployment** | Cloudflare Pages, Wrangler, Zero Cold-Start Global CDN |
| **Package / SDK** | TypeScript, Node.js, npm public registry (`@lexicallayer/sdk`) |
| **Engine & ML** | Python 3.11, Safetensors, LoRA Rank-16 Architecture, Representation Steering |

---

## 🚀 Yerel Geliştirme (Local Development)

### Gereksinimler
* Node.js 18+
* pnpm (`npm i -g pnpm`)
* Python 3.10+ (Yerel motor çalıştırılacaksa)

### Adımlar

1. Depoyu klonlayın:
```bash
git clone https://github.com/muhammetatmaca/lexicallayer.git
cd lexicallayer
```

2. Bağımlılıkları yükleyin:
```bash
pnpm install
```

3. Geliştirme sunucusunu başlatın:
```bash
pnpm dev
```
Sunucu `http://localhost:3000` adresinde ayağa kalkacaktır.

4. Statik üretim derlemesi (Production Build):
```bash
pnpm build
```

---

## 🌐 Canlı Yayın (Live Production)

Platform Cloudflare Pages altyapısında canlıdadır:
* **Canlı Domain:** [https://lexicallayer.muhammetatmaca.com.tr](https://lexicallayer.muhammetatmaca.com.tr)
* **Pages Mirror:** [https://lexicallayer.pages.dev](https://lexicallayer.pages.dev)
* **SDK Dokümantasyonu:** [https://lexicallayer.muhammetatmaca.com.tr/docs](https://lexicallayer.muhammetatmaca.com.tr/docs)

---

## 👤 Geliştirici & İletişim

**Muhammet Atmaca**  
* GitHub: [@muhammetatmaca](https://github.com/muhammetatmaca)  
* Web: [muhammetatmaca.com.tr](https://muhammetatmaca.com.tr)  

---

## 📄 Lisans

Bu proje [Apache-2.0](LICENSE) lisansı altında sunulmaktadır.
