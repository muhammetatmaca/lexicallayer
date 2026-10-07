# ADR-0002: Cloudflare Pages ve Global Edge Dağıtımı

* **Durum:** Kabul Edildi (Accepted)
* **Tarih:** 2026-10-06
* **Karar Vericiler:** Muhammet Atmaca (Sistem Mimarı)

---

## 1. Bağlam ve Problem Tanımı
LexicalLayer kullanıcı arayüzü, interaktif 3D sinir ağı görselleştirmeleri (Three.js), gerçek zamanlı yönlendirme vektör grafikleri ve dokümantasyon içerir. Global ölçekte en düşük ilk yükleme süresi (TTFB < 50ms) ve sıfır sunucu bakım maliyeti hedeflenmiştir.

## 2. Değerlendirilen Seçenekler
* **Seçenek A:** Bağımsız VPS / Docker Nginx Sunucusu
* **Seçenek B:** Vercel Pro Planı
* **Seçenek C:** Cloudflare Pages + DNS Edge Dağıtımı

## 3. Karar
**Seçenek C seçildi.**  
Arayüz `cloudflare-pages` altyapısı üzerinde `lexicallayer.muhammetatmaca.com.tr` özel alan adı ve Cloudflare Global Anycast Ağı ile yayınlanacaktır.

## 4. Gerekçe ve Teknik Nedenler
* **Sıfır Sunucu Yönetimi:** Stateless statik varlıklar (WASM, GLTF modelleri, bundle edilmiş JS/CSS) 300+ edge veri merkezine anında replike edilir.
* **Bant Genişliği Maliyeti:** Cloudflare Pages sınırsız bant genişliği sunarak 3D model indirme maliyetini sıfıra indirir.
* **Özel Domain & SSL:** Otomatik TLS 1.3 ve HTTP/3 desteğiyle güvenli ve yüksek hızlı bağlantı sağlanır.

## 5. Sonuçlar
* **Olumlu:** <50ms global erişim, DDOS koruması, sıfır altyapı faturası.
