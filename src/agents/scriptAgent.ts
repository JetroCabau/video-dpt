import Anthropic from "@anthropic-ai/sdk";
import { VideoBrief } from "../types";
import { loadMemory, saveMemory } from "../memory/memoryStore";

const client = new Anthropic();

export async function generateScript(brief: VideoBrief): Promise<string> {
  const memory = await loadMemory("scriptAgent");

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 2048,
    system:
      "You are a video scriptwriter. Write concise, scene-by-scene scripts suitable for programmatic video production.",
    messages: [
      {
        role: "user",
        content: `Write a ${brief.durationSeconds}-second video script about: ${brief.topic}. Style: ${brief.style}.`,
      },
    ],
  });

  const script = response.content[0].type === "text" ? response.content[0].text : "";

  await saveMemory("scriptAgent", {
    ...memory.context,
    lastTopic: brief.topic,
    lastStyle: brief.style,
  });

  return script;
}
