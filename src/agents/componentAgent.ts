import Anthropic from "@anthropic-ai/sdk";
import { SceneComponent, VideoBrief } from "../types";
import { loadMemory, saveMemory } from "../memory/memoryStore";

const client = new Anthropic();

// Available Remotion composition IDs this agent can assign
const AVAILABLE_COMPOSITIONS = ["TitleCard", "TextOverlay", "FullBleedText", "SplitLayout"];

export async function selectComponents(
  script: string,
  brief: VideoBrief
): Promise<SceneComponent[]> {
  const memory = await loadMemory("componentAgent");

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system: `You are a Remotion template selector. Given a script, map each scene to a Remotion composition.
Available compositions: ${AVAILABLE_COMPOSITIONS.join(", ")}.
Respond with a JSON array of scenes. Each scene: { sceneId, compositionId, durationInFrames, props: { text?, subtitle? } }.`,
    messages: [
      {
        role: "user",
        content: `Script:\n${script}\n\nVideo style: ${brief.style}. FPS: ${brief.fps}.`,
      },
    ],
  });

  const raw = response.content[0].type === "text" ? response.content[0].text : "[]";

  let scenes: SceneComponent[] = [];
  try {
    const jsonMatch = raw.match(/\[[\s\S]*\]/);
    scenes = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch {
    scenes = [];
  }

  await saveMemory("componentAgent", {
    ...memory.context,
    lastCompositionsUsed: scenes.map((s) => s.compositionId),
  });

  return scenes;
}
