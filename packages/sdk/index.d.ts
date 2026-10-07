export interface LexicalLayerOptions {
  baseUrl?: string;
  agentName?: string;
}

export interface CalibrationSession {
  sessionId: string;
  studioUrl: string;
}

export interface CalibrationResult {
  approved: boolean;
  adapterFile: string;
  session: Record<string, unknown>;
}

export interface GenerateOptions {
  prompt: string;
  useUserWeights?: boolean;
  model?: string;
}

export interface GenerateResult {
  prompt: string;
  use_user_weights: boolean;
  output: string;
  metrics: {
    lora_rank_applied: number;
    steering_projection_norm: number;
    fluff_tokens_suppressed: number;
    active_adapter: string;
  };
}

export class LexicalLayer {
  constructor(options?: LexicalLayerOptions);
  createCalibrationSession(): Promise<CalibrationSession>;
  waitForApproval(sessionId: string, timeoutSeconds?: number): Promise<CalibrationResult>;
  getCalibratedAdapter(): Promise<{
    adapterFilename: string;
    rank: number;
    layers: number[];
    totalParameters: number;
    status: string;
  }>;
  wrapOpenAI<T>(openaiClient: T): T;
  createAgentTransform(): (inputPrompt: string) => Promise<string>;
  generate(options: GenerateOptions): Promise<GenerateResult>;
}
