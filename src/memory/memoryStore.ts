import path from "path";
import fs from "fs/promises";
import { AgentMemory } from "../types";

const MEMORY_DIR = path.resolve("memory");

function memoryPath(agentId: string): string {
  return path.join(MEMORY_DIR, `${agentId}.json`);
}

export async function loadMemory(agentId: string): Promise<AgentMemory> {
  await fs.mkdir(MEMORY_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(memoryPath(agentId), "utf-8");
    return JSON.parse(raw) as AgentMemory;
  } catch {
    return { agentId, lastRun: "", context: {} };
  }
}

export async function saveMemory(
  agentId: string,
  context: Record<string, unknown>
): Promise<void> {
  await fs.mkdir(MEMORY_DIR, { recursive: true });
  const memory: AgentMemory = {
    agentId,
    lastRun: new Date().toISOString(),
    context,
  };
  await fs.writeFile(memoryPath(agentId), JSON.stringify(memory, null, 2));
}
