# LexicalLayer: Real-Time Representation Engineering & LoRA Steering Architecture for LLM Agents

<div align="center">

[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![npm SDK](https://img.shields.io/npm/v/@lexicallayer/sdk.svg?color=emerald&label=@lexicallayer/sdk)](https://www.npmjs.com/package/@lexicallayer/sdk)
[![npm CLI](https://img.shields.io/badge/npm-@lexicallayer/cli-orange)](https://www.npmjs.com/package/@lexicallayer/cli)
[![Production Live](https://img.shields.io/badge/Production%20Live-lexicallayer.muhammetatmaca.com.tr-0272FC)](https://lexicallayer.muhammetatmaca.com.tr)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)](https://www.typescriptlang.org)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-EE4C2C)](https://pytorch.org)

[Canlı Platform](https://lexicallayer.muhammetatmaca.com.tr) • [Studio Kalibrasyon](https://lexicallayer.muhammetatmaca.com.tr/studio) • [API & Dokümantasyon](https://lexicallayer.muhammetatmaca.com.tr/docs) • [npm SDK](https://www.npmjs.com/package/@lexicallayer/sdk)

</div>

LexicalLayer, üretici yapay zeka modellerindeki (LLM) sentetik kurumsal klişeleri ("AI slop") ortadan kaldıran ve agent sistemlerine kullanıcıya/kuruma özel bilişsel üslup kazandıran uçtan uca bir representation engineering ve ters vekil (reverse proxy) mimarisidir.

Sistem; prompt düzeyinde kelime manipülasyonu yapmak yerine, modelin gizli durumlarına (residual stream) doğrudan müdahale eden **Rank-16 LoRA adaptörleri**, **kontrastif steering vektörleri** ve **pre-softmax logit warping** tekniklerini bir arada çalıştırır.

---

## 1. Problem Tanımı ve Mühendislik Motivasyonu

Mevcut büyük dil modelleri (GPT-4o, Claude 3.5 Sonnet, Llama 3 serisi), pekiştirmeli insan geri bildirimi (RLHF) ve güvenlik hizalamaları nedeniyle belirgin sentetik kalıplara hapsolmuştur:

* **Sentetik Jargon (AI Slop):** *"In today's fast-paced digital landscape"*, *"delve deep into the multifaceted tapestry"*, *"pivotal testament to fostering holistic synergy"* gibi anlamsal yoğunluğu düşük, ezber kurumsal dolgu ifadeleri.
* **Otantik Karakter Kaybı:** Bir mühendisin doğrudan, net ve gereksiz soyutlamalardan arındırılmış karar mantığı veya bir kurumun spesifik terminolojisi model tarafından genelleştirilerek silinir.
* **Prompt Engineering'in Yapısal Sınırları:** "Klişe kullanma, doğrudan konuş" gibi sistem promptları token maliyeti yaratır, context penceresini tüketir, modelin dikkat (attention) bütçesini bozar ve "jailbreak" veya uzun sohbetlerde zayıflar.

LexicalLayer bu problemi prompt katmanından çıkarıp modelin **iç temsil uzayına (internal representation space)** ve **token olasılık dağılımına (pre-softmax logits)** taşır.

---

## 2. Sistem Mimarisi ve Veri Akışı

```
[İstemci Uygulaması / Agent]
            │
            ▼
[@lexicallayer/sdk (@0.1.6)]  ──► wrapOpenAI() / generate()
            │
            ▼
[Lexical Gateway (Reverse Proxy)]
    ├── Speculative Stream Intercept (<14ms P99)
    ├── Unembedding Logit Warper (Pre-Softmax Bias: -5.0 Slop, +2.5 Authentic)
    └── Active Adapter Injector
            │
            ├──► [FastAPI Weight Engine (Python 3.11)]
            │        ├── Contrastive Vector Extractor: v_l = normalize(E[h_pos] - E[h_neg])
            │        ├── Dynamic LoRA SVD Extractor: Delta_W = B @ A (Rank 16, alpha=32)
            │        └── FP16 .safetensors Serializer
            │
            ▼
[Upstream LLM Provider] (OpenAI, Anthropic, Gemini, Yerel vLLM / Ollama)
```

Sistem dört ana katmandan meydana gelir:

1. **Representation & LoRA Synthesis Engine (`engine/`):** Python tabanlı matematiksel ağırlık çıkarma çekirdeği. Kullanıcının ham metinlerinden kovaryans matrisi üzerinden tekil değer ayrışımı (SVD) ile `lora_A` ve `lora_B` matrislerini hesaplar; `user_steered_rank16.safetensors` çıktısı üretir.
2. **Activation Steering Hooks (`engine/steering_hook.py`):** Transformer bloklarının forward geçişlerine kanca atarak residual stream üzerinde doğrusal aktivasyon yönlendirmesi gerçekleştirir:
   $$h_l' = h_l + \alpha \cdot v_l$$
3. **Resmi npm SDK (`@lexicallayer/sdk`):** İstemci tarafında OpenAI nesnelerini tek satırda sarmalayan ve yerel/bulut çıkarım motorlarına bağlayan TypeScript kütüphanesi.
4. **Kalibrasyon & Telemetri Platformu (Next.js 16 + Cloudflare Pages):** Kullanıcının kendi dokümanlarını yükleyip gerçek zamanlı token bastırma metriklerini, ses parmak izini ve 3D WebGL yırtılma simülasyonunu izlediği üretim arayüzü.

---

## 3. Kullanıcı Verisi Alımı, İncelemesi ve Ağırlık Dönüşüm Hattı (Data Ingestion Pipeline)

LexicalLayer'ın temel ayırt edici gücü, kullanıcının kişisel düşünce yapısını ve yazım parmak izini doğrudan veri kaynağından çıkarıp ağırlığa dönüştürmesidir.

```
┌────────────────────────────────────────────────────────┐
│     Kullanıcı Verisi (Personal / Corporate Corpus)     │
│  • Kişisel Markdown notları ve mimari tasarım kararları │
│  • Teknik dokümantasyonlar, blog yazıları, makaleler   │
│  • Slack / PR inceleme yorumları, doğrudan e-postalar  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│        1. Pre-Processing & Token Ayrıştırma            │
│  • Bi-gram ve n-gram frekans analizi                   │
│  • Sentetik dolgu / pasif çatı tespiti                 │
│  • Otantik sözlük (User Vocabulary Space) inşası       │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│        2. Latent Projection & Vektör Farkı             │
│  • Temel model gizli katman gömüleri (Hidden States)   │
│  • Kullanıcı aktivasyon ortalaması: E[h_user]          │
│  • Sentetik temel aktivasyon ortalaması: E[h_baseline] │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│        3. SVD ile Düşük Rütbeli Ağırlık Sentezi        │
│  • Kovaryans matrisi üzerinden Rank-16 PCA/SVD         │
│  • lora_A (d_model -> r) ve lora_B (r -> d_model)      │
│  • FP16 SafeTensors: user_steered_rank16.safetensors   │
└────────────────────────────────────────────────────────┘
```

### 3.1. Alınan Veri Tipleri
* **Kişisel Notlar ve Mimari Kararlar:** Yazarın doğrudan, kısa ve sonuca odaklı yaklaşımını içeren Markdown/TXT dosyaları.
* **Teknik Dokümanlar & Kod İncelemeleri:** Kurum içi terminolojiyi, değişken isimlendirme kültürünü ve mühendislik prensiplerini temsil eden metinler.
* **Gerçek İletişim Örnekleri:** Kurumsal nezaket veya yapay zeka jargonu içermeyen samimi, doğrudan e-posta ve mesajlaşma kayıtları.

### 3.2. Verinin İşlenme ve Ağırlığa Dönüşme Süreci
1. **İçerik Alımı (Ingestion API):** `POST /api/user-data/ingest` uç noktası üzerinden metin parçaları sisteme girer. Token sayımı ve karakter yoğunluğu hesaplanır.
2. **Kovaryans Analizi:** Kullanıcının metinlerinden elde edilen latent aktivasyonların ($\mathbb{R}^{n \times d}$) varyans yapısı taranarak yazarın kendine has "düşünce eksenleri" (principal components) belirlenir.
3. **LoRA Matris Çıkarması:** En yüksek varyansa sahip ilk 16 tekil vektör (Rank-16) seçilir. Bu vektörler $A$ ve $B$ projeksiyon matrislerine dönüştürülerek $\Delta W$ adaptörü üretilir.
4. **Agent'a Kilitlenme:** Üretilen `user_steered_rank16.safetensors` dosyası SDK ve Gateway aracılığıyla çalışan AI Agent'ına bağlanır; böylece model her çalıştığında kullanıcının verilerinden sentezlenen üslupla konuşur.

---

## 4. Matematiksel Temeller ve Uygulanan Teknikler

### 3.1. Kontrastif Aktivasyon Yönlendirmesi (Representation Engineering - RepE)
Modelin belirli katmanlarındaki ($l \in \{14 \dots 22\}$) residual stream aktivasyonları pozitif korpus (kullanıcının otantik metinleri) ve negatif korpus (sentetik kurumsal klişe veri seti) üzerinden toplanır:

$$v_l = \frac{\mathbb{E}[h_l^+] - \mathbb{E}[h_l^-]}{\|\mathbb{E}[h_l^+] - \mathbb{E}[h_l^-]\|_2}$$

Forward propagation sırasında bu yön vektörü $v_l$, belirlenen katsayı ($\alpha$) ile toplanarak modelin düşünce uzayı sentetik klişe bölgesinden uzaklaştırılır.

### 3.2. Dinamik Rank-16 LoRA Sentezi (SVD Düşük Rütbeli Yaklaşım)
Kullanıcı metin gömüleri (embeddings) $X \in \mathbb{R}^{n \times d}$ merkezileştirildikten sonra kovaryans yapısı Rank-16 projeksiyonuna tabi tutulur:

$$X - \mu = U \Sigma V^T$$
$$A = V^T \in \mathbb{R}^{r \times d}, \quad B = (X - \mu)[:, :r] \cdot \Sigma_r \in \mathbb{R}^{d \times r}$$
$$\Delta W = \frac{\alpha}{r} (B \cdot A)$$

Elde edilen ağırlık tensörleri FP16 formatında doğrudan `.safetensors` standardında disk üzerine yazılır.

### 3.3. Pre-Softmax Logit Warping
Son katman unembedding çıkışında, sentetik belirteçlerin (filler tokens) olasılık kütlesi softmax öncesinde bastırılır:

$$\text{logits}' = \text{logits} + b$$
$$b_i = \begin{cases} -5.0, & i \in \mathcal{V}_{\text{slop}} \\ +2.5, & i \in \mathcal{V}_{\text{authentic}} \\ 0, & \text{diğer} \end{cases}$$

---

## 4. Canlı Sistem Arayüzü ve Ekran Görüntüleri

Aşağıdaki görüntüler doğrudan [lexicallayer.muhammetatmaca.com.tr](https://lexicallayer.muhammetatmaca.com.tr) üretim ortamından alınmıştır:

### 4.1. Hero Landing ve 3D Spline Canvas
![Hero Landing](./docs/screenshots/01-hero-landing.png)
*İnteraktif 3D Spline sahnesi, mimari el konturu ve hızlı SDK entegrasyonu sağlayan terminal bileşeni.*

### 4.2. WebGL 3D Sentetik Kart Parçalanma Simülasyonu
![Platform Showcase](./docs/screenshots/02-platform-showcase.png)
*Kullanıcı etkileşimiyle fiziksel olarak yırtılan ve parçalanan sentetik sosyal medya kartları (WebGL Shaders + Matter.js).*

### 4.3. Gerçek Zamanlı AI Slop vs. Human Precision Karşılaştırma Motoru
![Comparison Slider](./docs/screenshots/03-comparison-slider.png)
*Otomatik tarama yapan split-slider: Ham yapay zeka çıktısındaki (Slop) 6 sentetik metafor ve 4 klişenin temiz, yoğun insan diline dönüştürülmesi.*

### 4.4. Geliştirici Altyapısı ve Tek Satır Proxy Terminali
![Developer Gateway](./docs/screenshots/04-developer-gateway.png)
*Canlı model proxy terminali ve OpenAI, Claude, Gemini, DeepSeek, Qwen, Llama, Ollama, Groq entegrasyon infografiği.*

### 4.5. LexicalLayer Studio: Bilişsel Temsil ve LoRA Kalibrasyon Paneli
![Studio Calibration](./docs/screenshots/05-studio-calibration.png)
*Metin ve doküman yükleme, veri seti analizi, token bastırma oranları ve canlı ses parmak izi yapılandırması.*

### 4.6. Geliştirici Dokümantasyonu ve API Referansı
![Docs Reference](./docs/screenshots/06-docs-reference.png)
*0-Code Reverse Proxy, Node/TypeScript SDK (@lexicallayer/sdk), Python istemcisi ve MCP Server konfigürasyonları.*

### 4.7. Mobil Cihaz Arayüzü
<div align="center">
  <img src="./docs/screenshots/07-mobile-experience.png" width="380" alt="Mobile Experience" />
</div>
*Mobil cihazlarda dikey tam ekran arka plan kompozisyonu, sıfır yatay kayma ve dokunmatik uyumlu etkileşim.*

---

## 5. npm Paketleri ve İstemci Entegrasyonu

### 5.1. `@lexicallayer/sdk` (v0.1.6)

```bash
npm install @lexicallayer/sdk
```

#### OpenAI Agent Sarmalama (Wrap Pattern)
```typescript
import OpenAI from "openai";
import { LexicalLayer } from "@lexicallayer/sdk";

// LexicalLayer istemcisini başlat
const lexical = new LexicalLayer({
  baseUrl: process.env.LEXICAL_BASE_URL || "http://127.0.0.1:8001",
  agentName: "production-agent"
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// OpenAI client'ı cognitive katmanla sarmala
const steeredOpenAI = lexical.wrapOpenAI(openai);

// Normal chat completion çağrısı — model otomatik olarak LoRA kurallarıyla çalışır
const response = await steeredOpenAI.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "user", content: "Sistem mimarisini ve veritabanı kararlarını açıkla." }
  ]
});

console.log(response.choices[0].message.content);
```

#### Doğrudan Çıkarım ve Metrik Takibi
```typescript
import { LexicalLayer } from "@lexicallayer/sdk";

const lexical = new LexicalLayer();

const result = await lexical.generate({
  prompt: "Servis mimarisindeki trade-off noktalarını listele.",
  useUserWeights: true
});

console.log(result.output);
console.log(result.metrics);
// Çıktı: { lora_rank_applied: 16, fluff_tokens_suppressed: 18 }
```

#### Yerel Çıkarım Motorları (vLLM / Ollama / PEFT) İçin Adaptör Çekme
```typescript
const adapter = await lexical.getCalibratedAdapter();
console.log("Aktif Adapter:", adapter.adapterFilename); // 'user_steered_rank16.safetensors'
console.log("LoRA Rank:", adapter.rank);                 // 16
console.log("Hedef Katmanlar:", adapter.layers);        // [14, 15, 16, 17, 18, 19, 20, 21, 22]
```

---

### 5.2. `@lexicallayer/cli` (v0.2.0)

Terminal üzerinden ses kalibrasyon oturumu başlatmak ve ters vekil servisini ayağa kaldırmak için kullanılır:

```bash
# Oturum başlat ve tarayıcıda Studio linki üret
npx @lexicallayer/cli calibrate

# Yerel ters vekil ağ geçidini 8080 portunda çalıştır
npx @lexicallayer/cli run --port 8080
```

---

## 6. Teknoloji Yığını (Tech Stack)

| Bileşen | Teknoloji | Görev / Sorumluluk |
| :--- | :--- | :--- |
| **Web Platformu** | Next.js 16 (App Router), React 19, Turbopack | Statik export, performanslı istemci sayfaları |
| **Arayüz & Şekillendirme** | Tailwind CSS v4, Lucide React | Tam responsive mobil & masaüstü tasarım sistemi |
| **3D & Fizik Motoru** | Spline 3D Runtime, WebGL Shaders, Matter.js | Etkileşimli sahne ve GPU hızlandırmalı kağıt yırtma efektleri |
| **Kenar Dağıtım (Edge)** | Cloudflare Pages, Custom DNS & SSL | <30ms küresel yanıt süresi, sıfır sunucu maliyeti |
| **İstemci Kütüphaneleri** | TypeScript, Node.js (npm registry) | `@lexicallayer/sdk`, `@lexicallayer/cli` |
| **AI / Çıkarım Çekirdeği** | Python 3.11, PyTorch, Safetensors, HuggingFace | LoRA matris ayrışımı, forward hooklar ve logit yönlendirme |

---

## 7. Yerel Kurulum ve Geliştirme

### Gereksinimler
* Node.js 18+
* pnpm 10+
* Python 3.10+ (Yerel model ağırlık sentezi çalıştırılacaksa)

### Adım Adım Kurulum

1. Depoyu klonlayın:
```bash
git clone https://github.com/muhammetatmaca/lexicallayer.git
cd lexicallayer
```

2. Bağımlılıkları kurun:
```bash
pnpm install
```

3. Geliştirme ortamını başlatın:
```bash
pnpm dev
```
Platform `http://localhost:3000` üzerinde çalışmaya başlayacaktır.

4. (Opsiyonel) Python Ağırlık Motorunu Başlatın:
```bash
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt # torch, safetensors, fastapi, uvicorn
python engine/server.py
```

5. Üretim Derlemesi Alın:
```bash
pnpm build
```

---

## 8. Canlı Bağlantılar

* **Canlı Platform:** [https://lexicallayer.muhammetatmaca.com.tr](https://lexicallayer.muhammetatmaca.com.tr)
* **Pages Mirror:** [https://lexicallayer.pages.dev](https://lexicallayer.pages.dev)
* **Studio Paneli:** [https://lexicallayer.muhammetatmaca.com.tr/studio](https://lexicallayer.muhammetatmaca.com.tr/studio)
* **Dokümantasyon:** [https://lexicallayer.muhammetatmaca.com.tr/docs](https://lexicallayer.muhammetatmaca.com.tr/docs)
* **npm SDK Paketi:** [https://www.npmjs.com/package/@lexicallayer/sdk](https://www.npmjs.com/package/@lexicallayer/sdk)

---

## 9. Geliştirici ve Lisans

**Geliştirici:** Muhammet Atmaca  
* **GitHub:** [@muhammetatmaca](https://github.com/muhammetatmaca)  
* **Kişisel Web Sitesi:** [muhammetatmaca.com.tr](https://muhammetatmaca.com.tr)  

Bu proje [Apache-2.0](LICENSE) lisansı altında geliştirilmiş ve açık kaynak olarak paylaşılmıştır.
