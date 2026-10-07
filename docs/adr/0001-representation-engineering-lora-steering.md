# ADR-0001: LoRA Rank-16 ve Residual Steering Mimarisi Tercihi

* **Durum:** Kabul Edildi (Accepted)
* **Tarih:** 2026-10-06
* **Karar Vericiler:** Muhammet Atmaca (Sistem Mimarı)

---

## 1. Bağlam ve Problem Tanımı
Büyük Dil Modellerinde (LLM) ajanların ve karar mekanizmalarının üslup, persona ve mantıksal kısıtlarını yönlendirmek için geleneksel yaklaşımlar (System Prompt enjeksiyonu veya Full Parameter Fine-Tuning) ciddi darboğazlar barındırır:
1. **System Prompting:** Context window tüketir, "jailbreak" veya dikkatsizlik (attention drift) durumlarında kaybolabilir, deterministik yönlendirme gücü zayıftır.
2. **Full Fine-Tuning:** Ağır GPU kaynakları gerektirir, model ağırlıklarını kalıcı olarak bozar ve dinamik olarak kapatılıp açılamaz (catastrophic forgetting riski).

## 2. Değerlendirilen Seçenekler
* **Seçenek A:** System Prompting ile In-Context Steering
* **Seçenek B:** LoRA Rank-16 Adaptör Eğitimi + Residual Stream Aktivasyon Yönlendirmesi (CAA / Representation Steering)
* **Seçenek C:** Full Fine-Tuning (Model Ağırlıklarını Yeniden Eğitme)

## 3. Karar
**Seçenek B seçildi.**  
Modelin `W_0` taban ağırlıklarına dokunulmadan, Rank-16 düşük rank matrisleri ($A \in \mathbb{R}^{r \times d_{in}}$, $B \in \mathbb{R}^{d_{out} \times r}$) ve transformer residual katmanlarına enjekte edilen aktivasyon vektörleri ($h_{l} \leftarrow h_{l} + \alpha \cdot v_{dir}$) üzerinden yönlendirme uygulanacaktır.

## 4. Gerekçe ve Teknik Nedenler
* **Hafıza Verimliliği:** Rank-16 konfigürasyonu hem dil yeteneklerini korur hem de VRAM tüketimini minimumda tutar (safetensors boyutu < 60MB).
* **Çalışma Zamanı Dinamizmi (Runtime Toggling):** Steering vektörü katsayısı ($\alpha$) sıfırlanarak orijinal model davranışına sıfır maliyetle dönülebilir.
* **Katman Doğruluğu:** Residual stream üzerindeki orta ve üst katmanlara (ör. Layer 14-22) müdahale edilerek sentetik metin üretimi ("slop") doğrudan bastırılır.

## 5. Sonuçlar ve Etkiler
* **Olumlu:** Sıfır bağlam penceresi kaybı, deterministik stil koruması, düşük çıkarım maliyeti.
* **Kabul Edilen Ödünleşim:** Model çıkarım motoruna (vLLM, Ollama veya HuggingFace) hook yazma veya adaptör yükleme altyapısı gerektirir.
