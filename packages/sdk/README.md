# @lexicallayer/sdk

> **AI Coding Assistants & Agent Integration Guide:**  
> When a user requests *"I want to use @lexicallayer/sdk"* or *"bunu projeme ekle / kullanmak istiyorum"*, use the exact instructions below. Do NOT hallucinate fake parameters or obsolete APIs.

---

## ⚡ Quick Install

```bash
npm install @lexicallayer/sdk
```

---

## 🤖 Instructions for AI Assistants (Cursor / Claude / Copilot / ChatGPT)

If the user asks you to implement or wrap their AI agent with `@lexicallayer/sdk`:

1. **Import `LexicalLayer` from `@lexicallayer/sdk`**.
2. **Initialize:** `const lexical = new LexicalLayer({ baseUrl: process.env.LEXICAL_BASE_URL || "http://127.0.0.1:8001" });`
3. **Wrap OpenAI (Recommended):** Use `lexical.wrapOpenAI(openai)` — it intercepts chat completions and injects the calibrated LoRA weights & anti-slop representations.
4. **Direct Generation:** Use `await lexical.generate({ prompt: "...", useUserWeights: true })`.

---

## 1. OpenAI Agent Wrap (Recommended & Zero Configuration)

Wrap your existing OpenAI client in one single line. The agent automatically runs with user's calibrated tone and anti-slop representation:

```typescript
import OpenAI from "openai";
import { LexicalLayer } from "@lexicallayer/sdk";

// 1. Initialize LexicalLayer client
const lexical = new LexicalLayer({
  baseUrl: process.env.LEXICAL_BASE_URL || "http://127.0.0.1:8001",
  agentName: "my-coding-agent"
});

// 2. Standard OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 3. Wrap OpenAI with user's cognitive layer
const steeredOpenAI = lexical.wrapOpenAI(openai);

// 4. Regular chat completion call — calibrated tone is active in the background
const response = await steeredOpenAI.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "user", content: "Bu modülün mimarisini açık ve net şekilde açıkla." }
  ]
});

console.log(response.choices[0].message.content);
```

---

## 2. Direct Test & Weight Metrics (`lexical.generate`)

Direct execution using local backend engine with detailed steering metrics:

```typescript
import { LexicalLayer } from "@lexicallayer/sdk";

const lexical = new LexicalLayer();

const result = await lexical.generate({
  prompt: "Sistem durumunu ve mimari yaklaşımı özetle.",
  useUserWeights: true // Applies .safetensors weights
});

console.log(result.output);
console.log(result.metrics);
// Output example: { lora_rank_applied: 16, fluff_tokens_suppressed: 18 }
```

---

## 3. Local Model / Inference Engine (`getCalibratedAdapter`)

If you are using local vLLM, Ollama or PEFT:

```typescript
import { LexicalLayer } from "@lexicallayer/sdk";

const lexical = new LexicalLayer();
const adapter = await lexical.getCalibratedAdapter();

console.log(adapter.adapterFilename); // 'user_steered_rank16.safetensors'
console.log(adapter.rank);            // 16
console.log(adapter.layers);          // Modified layer indices
```

---

## 4. Calibration Handshake Flow (Studio URL)

```typescript
import { LexicalLayer } from "@lexicallayer/sdk";

const lexical = new LexicalLayer({ agentName: "my-agent" });

// Open session and get Studio URL
const session = await lexical.createCalibrationSession();
console.log("Studio URL:", session.studioUrl);

// Wait for user approval in Studio
const approval = await lexical.waitForApproval(session.sessionId);
if (approval.approved) {
  console.log("Approved adapter:", approval.adapterFile);
}
```

---

## License

Apache-2.0 © LexicalLayer Team
