const { LexicalLayer } = require("../packages/sdk");

async function runInteractiveTest() {
  const lexical = new LexicalLayer({
    baseUrl: "http://127.0.0.1:8001",
    agentName: "muhammet-agent"
  });

  console.log("\n=======================================================");
  console.log("   LEXICALLAYER SDK CANLI AJAN (AGENT) ÇALIŞTIRICISI   ");
  console.log("=======================================================\n");

  // 1. Sistem Direktifi Testi
  console.log("▶ [1/2] Kullanıcının Eğitim Verilerinden Türetilen Sistem Direktifi Çekiliyor:");
  console.log("-------------------------------------------------------------------------------");
  const directive = await lexical.getSystemDirective();
  console.log(directive);
  console.log("-------------------------------------------------------------------------------\n");

  // 2. Canlı Soru ve Ağırlıklı Yanıt Testi
  const testPrompts = [
    "Sence bir yazılım mimarisi nasıl inşa edilmeli?",
    "Modern dünyada teknolojinin birey üzerindeki etkisi nedir?"
  ];

  for (const prompt of testPrompts) {
    console.log(`▶ [2/2] Soru: "${prompt}"`);
    console.log("   Bekleniyor (Rank-16 LoRA + Residual Steering Uygulanıyor)...");
    
    const response = await lexical.generate({
      prompt: prompt,
      useUserWeights: true
    });

    console.log(`\n   ✓ AGENT YANITI:`);
    console.log(`   ${response.output}\n`);
    console.log(`   METRİKLER: LoRA: ${response.metrics.lora_applied} | Fluff Filtrelenen: ${response.metrics.fluff_tokens_suppressed} | Adaptör: ${response.metrics.active_adapter}`);
    console.log("   ----------------------------------------------------------------------------\n");
  }
}

runInteractiveTest().catch(console.error);
