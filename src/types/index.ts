export interface VideoBrief {
  topic: string;
  style: string;
  durationSeconds: number;
  outputPath: string;
  fps: number;
  resolution: { width: number; height: number };
}

export interface SceneComponent {
  sceneId: string;
  compositionId: string;
  durationInFrames: number;
  props: Record<string, unknown>;
}

export interface AgentMemory {
  agentId: string;
  lastRun: string;
  context: Record<string, unknown>;
}

export interface AgentResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
