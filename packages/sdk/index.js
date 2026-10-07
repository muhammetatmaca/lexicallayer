/**
 * @lexicallayer/sdk
 * Programmatic SDK for AI Agents to connect with calibrated user weights.
 */

class LexicalLayer {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || "http://127.0.0.1:8001";
    this.agentName = options.agentName || "default-agent";
  }

  /**
   * Initializes a handshake session and returns the Studio URL.
   */
  async createCalibrationSession() {
    const res = await fetch(`${this.baseUrl}/api/session/init`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agent_name: this.agentName, email: "agent@runtime.local" })
    });
    const data = await res.json();
    return {
      sessionId: data.session.id,
      studioUrl: `http://localhost:3000/studio?session=${data.session.id}`
    };
  }

  /**
   * Waits until the user approves the weights in Studio.
   */
  async waitForApproval(sessionId, timeoutSeconds = 300) {
    const start = Date.now();
    while ((Date.now() - start) < timeoutSeconds * 1000) {
      const res = await fetch(`${this.baseUrl}/api/session/verify/${sessionId}`);
      const data = await res.json();
      if (data?.session?.approved) {
        return {
          approved: true,
          adapterFile: data.session.adapter_filename,
          session: data.session
        };
      }
      await new Promise(r => setTimeout(r, 2000));
    }
    throw new Error("Kalibrasyon oturumu zaman aşımına uğradı.");
  }

  /**
   * Retrieves the calibrated .safetensors adapter metadata and file location.
   * AI Agents plug this file directly into their inference engine (vLLM, PEFT, Ollama).
   */
  async getCalibratedAdapter() {
    const res = await fetch(`${this.baseUrl}/api/state`);
    const data = await res.json();
    return {
      adapterFilename: data.active_weights?.adapter_filename || "user_steered_rank16.safetensors",
      rank: data.active_weights?.lora_rank || 16,
      layers: data.active_weights?.delta_w_layers || [],
      totalParameters: data.active_weights?.total_parameters_steered,
      status: data.active_weights?.status
    };
  }

  /**
   * Drops into OpenAI client as an Agent Middleware Layer:
   * Wraps openai.chat.completions.create so any agent automatically inherits 
   * the calibrated weights and user-specific representation.
   */
  wrapOpenAI(openaiClient) {
    const originalCreate = openaiClient.chat.completions.create.bind(openaiClient.chat.completions);
    const self = this;

    openaiClient.chat.completions.create = async function(params, ...rest) {
      // 1. Fetch user representation state
      const stateRes = await fetch(`${self.baseUrl}/api/state`).catch(() => null);
      const state = stateRes ? await stateRes.json() : null;
      const docs = state?.user_dataset || [];
      const userCorpusSnippet = docs.map(d => d.text.slice(0, 300)).join("\n");

      // 2. Intercept and steer the agent's message chain
      const messages = [...(params.messages || [])];
      if (userCorpusSnippet) {
        // Enforce user's authentic cognitive style onto the agent's execution
        messages.unshift({
          role: "system",
          content: `[LexicalLayer Steered Representation Layer - Active Adapter: ${state?.active_weights?.adapter_filename || "user_steered_rank16.safetensors"}]\n` +
                   `Execute all agent tasks strictly aligned with the authentic voice, reasoning depth and vocabulary of the user:\n${userCorpusSnippet}`
        });
      }

      return originalCreate({ ...params, messages }, ...rest);
    };

    return openaiClient;
  }

  /**
   * Drops into Vercel AI SDK / LangChain agents as a transform stream layer.
   */
  createAgentTransform() {
    const self = this;
    return async (inputPrompt) => {
      const res = await self.generate({ prompt: inputPrompt, useUserWeights: true });
      return res.output;
    };
  }

  /**
   * Performs steered inference with the user's calibrated weights.
   */
  async generate({ prompt, useUserWeights = true, model = "meta-llama/Llama-3.1-8B-Instruct" }) {
    const res = await fetch(`${this.baseUrl}/api/user-weights/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, use_user_weights: useUserWeights, model })
    });
    return await res.json();
  }
}

module.exports = { LexicalLayer };
