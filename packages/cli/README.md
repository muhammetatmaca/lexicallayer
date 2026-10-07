# @lexicallayer/cli

> Representation Engineering & Authentic Weight Calibration CLI for AI Agents.

## Kurulum ve Kullanım

```bash
# Kurulum gerektirmeden doğrudan çalıştırma:
npx @lexicallayer/cli calibrate

# veya global kurulum:
npm install -g @lexicallayer/cli
lexicallayer calibrate
```

## Nasıl Çalışır?

1. CLI çalıştırıldığında bir handshake oturumu başlatır (`lx_sess_...`).
2. Tarayıcıda LexicalLayer Studio açılır.
3. Kullanıcı kendi yazılarını, dokümanlarını veya blogunu ekler.
4. Modelin Rank-16 LoRA $\Delta W$ adaptörü ve Residual Steering vektörleri sentezlenir.
5. Kullanıcı Studio'da **"Ağırlığı Onayla & Agent'a Kilitle"** butonuna bastığında CLI `.safetensors` dosyasını teslim alarak başarıyla sonlanır.
