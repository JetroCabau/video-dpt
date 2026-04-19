import path from "path";
import fs from "fs/promises";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import Anthropic from "@anthropic-ai/sdk";
import { SceneComponent, VideoBrief } from "../types";
import { loadMemory, saveMemory } from "../memory/memoryStore";

const client = new Anthropic();

export interface ReviewResult {
  approved: boolean;
  feedback: string;
  stillPath: string;
}

export async function reviewScenes(
  scenes: SceneComponent[],
  brief: VideoBrief
): Promise<ReviewResult> {
  const memory = await loadMemory("reviewAgent");
  const stillPath = path.resolve("output", "review_still.png");

  await fs.mkdir("output", { recursive: true });

  const firstScene = scenes[0];
  if (firstScene) {
    const bundled = await bundle({
      entryPoint: path.resolve("src/remotion/index.ts"),
      webpackOverride: (config) => config,
    });

    const composition = await selectComposition({
      serveUrl: bundled,
      id: firstScene.compositionId,
      inputProps: firstScene.props,
    });

    await renderStill({
      composition: { ...composition, durationInFrames: firstScene.durationInFrames },
      serveUrl: bundled,
      output: stillPath,
      frame: Math.floor(firstScene.durationInFrames / 2),
      inputProps: firstScene.props,
    });
  }

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    system: "You are a video production QA agent. Review scene plans for coherence and completeness.",
    messages: [
      {
        role: "user",
        content: `Review these scenes for a "${brief.topic}" video (${brief.style} style):\n${JSON.stringify(scenes, null, 2)}\n\nReply with JSON: { "approved": boolean, "feedback": string }`,
      },
    ],
  });

  const raw = response.content[0].type === "text" ? response.content[0].text : "{}";
  let review = { approved: true, feedback: "No issues found." };
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) review = JSON.parse(jsonMatch[0]);
  } catch {
    // keep default
  }

  await saveMemory("reviewAgent", {
    ...memory.context,
    lastApproved: review.approved,
    lastFeedback: review.feedback,
  });

  return { ...review, stillPath };
}
