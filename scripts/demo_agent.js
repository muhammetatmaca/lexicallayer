/**
 * Gerçek SDK ile Modelden Yanıt İsteme Betiği
 */
const { LexicalLayer } = require("../packages/sdk");

async function main() {
  const client = new LexicalLayer({
    baseUrl: "http://127.0.0.1:8001",
    agentName: "dev-agent"
  });

  console.log("=== 1. Kullanıcı Ağırlıkları Devredeyken (Steered Inference) ===");
  const steered = await client.generate({
    prompt: "Yapay zekanın modern toplumdaki rolü ve öznenin durumu nedir?",
    useUserWeights: true
  });
  console.log("ÇIKTI:");
  console.log(steered.output);
  console.log("\nMETRİKLER:");
  console.log(steered.metrics);

  console.log("\n--------------------------------------------------------------\n");

  console.log("=== 2. Kullanıcı Ağırlıkları Yokken (Ham Model / Slop Inference) ===");
  const raw = await client.generate({
    prompt: "Yapay zekanın modern toplumdaki rolü ve öznenin durumu nedir?",
    useUserWeights: false
  });
  console.log("ÇIKTI:");
  console.log(raw.output);
  console.log("\nMETRİKLER:");
  console.log(raw.metrics);
}

main().catch(console.error);
