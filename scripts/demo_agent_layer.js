/**
 * GERÇEK AGENT ENTEGRASYONU:
 * Bir geliştiricinin var olan OpenAI / Claude / LangChain Agent'ına 
 * LexicalLayer'ı bir KATMAN (LAYER / INTERCEPTOR) olarak takması.
 */

const { LexicalLayer } = require("../packages/sdk");

// Temsili OpenAI Client simülasyonu (veya gerçek OpenAI instance'ı)
class MockOpenAIAgent {
  constructor() {
    this.chat = {
      completions: {
        async create({ messages, model }) {
          console.log("\n[Agent İç Çalışma Zamanı - Gönderilen Mesaj Zinciri]:");
          messages.forEach(m => console.log(`[${m.role.toUpperCase()}]: ${m.content.slice(0, 120)}...`));

          // Agent görevi yerine getirir
          return {
            choices: [
              {
                message: {
                  content: "Selamlar,\n\nTalep ettiğiniz mimari incelemeyi tamamladım. Gereksiz ara katmanları ve dolaylı yapıları kaldırarak doğrudan sonuca giden yalın akışı devreye aldık. Detayları inceleyebilirsiniz.\n\nİyi çalışmalar,\nMuhammet"
                }
              }
            ]
          };
        }
      }
    };
  }
}

async function main() {
  console.log("=== 1. Standart Agent Başlatılıyor (Özelleştirilmemiş) ===");
  const baseAgent = new MockOpenAIAgent();

  console.log("\n=== 2. LexicalLayer Ağırlık Katmanı Agent'a Takılıyor ===");
  const lexical = new LexicalLayer();
  
  // İŞTE SİHİRLİ SATIR: Agent'ın istemcisine LexicalLayer doğrudan bir KATMAN (Middleware) olarak sarılır:
  const steeredAgent = lexical.wrapOpenAI(baseAgent);

  console.log("\n=== 3. Kullanıcı Agent'a Görev Veriyor: 'bana bir e-posta yaz' ===");
  const response = await steeredAgent.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "user", content: "bana bir e-posta yaz" }
    ]
  });

  console.log("\n[AGENT'IN ÜRETTİĞİ ÇIKTI (Kullanıcının Özgün Katmanıyla)]:");
  console.log(response.choices[0].message.content);
}

main().catch(console.error);
