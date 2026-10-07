# LexicalLayer

<div align="center">

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![npm SDK](https://img.shields.io/npm/v/@lexicallayer/sdk.svg?color=emerald&label=@lexicallayer/sdk)](https://www.npmjs.com/package/@lexicallayer/sdk)
[![npm CLI](https://img.shields.io/badge/npm-@lexicallayer/cli-orange)](https://www.npmjs.com/package/@lexicallayer/cli)
[![Live Platform](https://img.shields.io/badge/Production%20Live-lexicallayer.muhammetatmaca.com.tr-0272FC)](https://lexicallayer.muhammetatmaca.com.tr)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)](https://www.typescriptlang.org)

**Real-Time Anti-Slop Representation Engineering, LoRA Steering Gateway & Calibration Studio for LLM Agents.**

[🚀 Canlı Platform](https://lexicallayer.muhammetatmaca.com.tr) • [🎨 Studio Deneyimi](https://lexicallayer.muhammetatmaca.com.tr/studio) • [📖 Dokümantasyon](https://lexicallayer.muhammetatmaca.com.tr/docs) • [📦 npm SDK](https://www.npmjs.com/package/@lexicallayer/sdk)

</div>

---

## 📸 Canlı Platform Ekran Görüntüleri (Live Production Screenshots)

Aşağıdaki görüntüler doğrudan canlıda çalışan [lexicallayer.muhammetatmaca.com.tr](https://lexicallayer.muhammetatmaca.com.tr) üretim ortamından alınmıştır.

<div align="center">

### 1. Hero Landing & 3D Spline Canvas
<img src="./docs/screenshots/01-hero-landing.png" width="100%" alt="LexicalLayer Hero Landing" />
<p><i>İnteraktif 3D Spline sahnesi, mimari el konturu, tek satırda SDK kurulum kartı ve editoryal tipografi.</i></p>

---

### 2. The Integrated Platform (#0272FC Blue Canvas) & WebGL 3D Tearing Cards
<img src="./docs/screenshots/02-platform-showcase.png" width="100%" alt="LexicalLayer Platform Section" />
<p><i>Kullanıcı etkileşimiyle 3D parçalanan sosyal medya ve sentetik metin kartları (WebGL Shaders + Matter.js simülasyonu).</i></p>

---

### 3. AI Slop vs. Human Precision (Interactive Auto-Scan Comparison)
<img src="./docs/screenshots/03-comparison-slider.png" width="100%" alt="AI Slop vs Clean Comparison Slider" />
<p><i>Otomatik tarama yapan split-slider: Ham yapay zeka çıktısındaki (Slop) 6 sentetik metafor ve 4 klişenin temiz, yoğun insan diline dönüştürülmesi.</i></p>

---

### 4. Developer Infrastructure & Single-Line Proxy Gateway
<img src="./docs/screenshots/04-developer-gateway.png" width="100%" alt="Developer Infrastructure & Integrations" />
<p><i>Canlı terminal animasyonu ve model entegrasyon infografiği (OpenAI, Claude, Gemini, DeepSeek, Qwen, Llama, Ollama, Groq).</i></p>

---

### 5. LexicalLayer Studio: Bilişsel Temsil & LoRA Kalibrasyon Paneli
<img src="./docs/screenshots/05-studio-calibration.png" width="100%" alt="LexicalLayer Studio Dashboard" />
<p><i>Metin ve doküman yükleme, interaktif veri seti analizi, token bastırma oranları ve canlı ses parmak izi yapılandırması.</i></p>

---

### 6. Geliştirici Dokümantasyonu (Reference & SDK Guides)
<img src="./docs/screenshots/06-docs-reference.png" width="100%" alt="LexicalLayer Documentation" />
<p><i>0-Code Reverse Proxy, Node/TypeScript SDK (@lexicallayer/sdk), Python istemcisi ve MCP Server konfigürasyonları.</i></p>

---

### 7. Responsive Mobil Deneyim
<img src="./docs/screenshots/07-mobile-experience.png" width="360" alt="LexicalLayer Mobile Experience" />
<p><i>Mobil cihazlarda tam ekran cybernetic el arka planı, sıfır yatay kayma ve dokunmatik optimize akıcı deneyim.</i></p>

</div>

---

## 🎯 Projenin Amacı ve Çözülen Problem

Büyük dil modelleri (GPT-4o, Claude 3.5, Gemini, Llama) varsayılan RLHF ve hizalama süreçleri nedeniyle belirgin kalıplara hapsolmuştur:
* **Sentetik Slop:** *"In today's fast-paced digital era..."*, *"delve deep into the multifaceted tapestry..."*, *"pivotal testament to fostering holistic synergy..."* gibi ezber laf kalabalığı.
* **Otantik Ses Kaybı:** Bir mühendisin, yazarın veya şirketin özgün terminolojisi, doğrudanlığı ve karar alma karakteri kaybolur.
* **Prompt Engineering Yetersizliği:** Prompt ile "bunu söyleme, şöyle yaz" demek hem token maliyeti yaratır, hem context window'u tüketir hem de model tarafından kolayca unutulur.

**LexicalLayer'ın Yaklaşımı:**  
Prompt seviyesinde kelime manipülasyonu yapmak yerine, **Representation Engineering (Bilişsel Temsil Mühendisliği)** prensibiyle çalışır. Kullanıcının otantik metinlerinden **Rank-16 LoRA adaptörü (`.safetensors`)** ve **residual steering vektörleri** sentezler; modeli inference aşamasında doğrudan hizalar.

---

## 🏗️ Mimari & Uçtan Uca Veri Akışı

```
┌────────────────────────────────────────────────────────┐
│                   İstemci / AI Agent                    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│          @lexicallayer/sdk (npm resmi paketi)          │
│   • lexical.wrapOpenAI(openai)                         │
│   • lexical.generate({ useUserWeights: true })         │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             Lexical Gateway & Reverse Proxy            │
│   • <14ms P99 gecikmeyle speculative stream intercept  │
│   • Token olasılık dağılımı dengeleme                  │
└─────────────┬────────────────────────────┬─────────────┘
              │                            │
              ▼                            ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│   LoRA Engine (.safetensors)│ │    Upstream Modeller     │
│  Rank-16 delta_W layers  │  │  OpenAI / Claude / Gemini│
│  Residual steering hooks │  │  Local vLLM / Ollama     │
└──────────────────────────┘  └──────────────────────────┘
```

---

## 📦 npm Paketleri

Proje, monorepo mimarisinde geliştirilen ve npm genel kayıt defterinde yayınlanmış resmi paketler içerir:

### 1. `@lexicallayer/sdk` (v0.1.6)
> AI Agent'larını ve LLM istemcilerini tek satırda kalibre edilmiş LoRA ağırlıklarına bağlayan çekirdek SDK.

```bash
npm install @lexicallayer/sdk
```

#### En Pratik Kullanım: OpenAI Agent Sarmalama
```typescript
import OpenAI from "openai";
import { LexicalLayer } from "@lexicallayer/sdk";

// 1. LexicalLayer istemcisini başlat
const lexical = new LexicalLayer({
  baseUrl: process.env.LEXICAL_BASE_URL || "http://127.0.0.1:8001",
  agentName: "my-coding-agent"
});

// 2. Standart OpenAI istemcisi
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 3. Tek satırda cognitive katman ile sar
const steeredOpenAI = lexical.wrapOpenAI(openai);

// 4. Normal chat completion — arka planda anti-slop & otantik ses devrede
const response = await steeredOpenAI.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "user", content: "Bu modülün mimarisini net ve doğrudan açıkla." }
  ]
});

console.log(response.choices[0].message.content);
```

#### Doğrudan Test & Ağırlık Metrikleri
```typescript
import { LexicalLayer } from "@lexicallayer/sdk";

const lexical = new LexicalLayer();

const result = await lexical.generate({
  prompt: "Sistem mimarisini ve karar gerekçelerini özetle.",
  useUserWeights: true
});

console.log(result.output);
console.log(result.metrics);
// Çıktı: { lora_rank_applied: 16, fluff_tokens_suppressed: 18 }
```

#### Yerel vLLM / Ollama İçin Adaptör Sorgulama
```typescript
const adapter = await lexical.getCalibratedAdapter();
console.log("Aktif Adapter:", adapter.adapterFilename); // 'user_steered_rank16.safetensors'
console.log("LoRA Rank:", adapter.rank);                 // 16
```

---

### 2. `@lexicallayer/cli` (v0.2.0)
> Terminalden doğrudan ses kalibrasyonu, doküman yükleme ve yerel engine başlatma aracı.

```bash
# Kurulum gerektirmeden çalıştırma
npx @lexicallayer/cli calibrate

# Yerel ters vekil motorunu 8080 portunda başlatma
npx @lexicallayer/cli run --port 8080
```

---

## 🛠️ Teknoloji Yığını (Tech Stack)

| Katman | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Frontend Platform** | Next.js 16 (App Router), React 19, Turbopack | Statik export & ultra hızlı derleme süreleri |
| **Styling & Arayüz** | Tailwind CSS v4, Lucide React | Tam responsive mobil & masaüstü editoryal tasarım |
| **3D & Shaders** | Spline 3D Scene, WebGL Paper Tearing Shaders, Canvas Gimbal | GPU hızlandırmalı interaktif görsel deneyim |
| **Global Deployment** | Cloudflare Pages, Custom Subdomain SSL | Sıfır cold-start, küresel edge CDN |
| **npm Ekosistemi** | `@lexicallayer/sdk`, `@lexicallayer/cli` | TypeScript & CJS/ESM uyumlu modüler kütüphaneler |
| **Engine & AI Katmanı** | Python 3.11, Safetensors, HuggingFace, PEFT LoRA | Rank-16 adaptör sentezi ve steering kancaları |

---

## ⚡ Yerel Çalıştırma (Quick Start)

### 1. Depoyu İndirin & Bağımlılıkları Kurun
```bash
git clone https://github.com/muhammetatmaca/lexicallayer.git
cd lexicallayer
pnpm install
```

### 2. Geliştirme Sunucusunu Başlatın
```bash
pnpm dev
```
Tarayıcınızda `http://localhost:3000` adresini açarak platformu görüntüleyin.

### 3. Statik Üretim Derlemesi
```bash
pnpm build
```

---

## 🌐 Canlı Bağlantılar

* **Canlı Web Sitesi:** [https://lexicallayer.muhammetatmaca.com.tr](https://lexicallayer.muhammetatmaca.com.tr)
* **Pages Aynası:** [https://lexicallayer.pages.dev](https://lexicallayer.pages.dev)
* **SDK Dokümantasyonu:** [https://lexicallayer.muhammetatmaca.com.tr/docs](https://lexicallayer.muhammetatmaca.com.tr/docs)
* **Studio Kalibrasyon Ekranı:** [https://lexicallayer.muhammetatmaca.com.tr/studio](https://lexicallayer.muhammetatmaca.com.tr/studio)

---

## 👨‍💻 Geliştirici & İletişim

**Muhammet Atmaca**  
* **GitHub:** [@muhammetatmaca](https://github.com/muhammetatmaca)  
* **Portfolio & Blog:** [muhammetatmaca.com.tr](https://muhammetatmaca.com.tr)  

---

## 📄 Lisans

Bu proje [Apache-2.0](LICENSE) açık kaynak lisansı altında lisanslanmıştır.
