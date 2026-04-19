import path from "path";
import fs from "fs/promises";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { SceneComponent, VideoBrief } from "../types";
import { loadMemory, saveMemory } from "../memory/memoryStore";

export async function exportVideo(
  scenes: SceneComponent[],
  brief: VideoBrief
): Promise<string> {
  const memory = await loadMemory("exportAgent");

  await fs.mkdir(path.dirname(brief.outputPath), { recursive: true });

  const bundled = await bundle({
    entryPoint: path.resolve("src/remotion/index.ts"),
    webpackOverride: (config) => config,
  });

  // Render each scene sequentially and collect output paths
  const scenePaths: string[] = [];
  for (const scene of scenes) {
    const scenePath = brief.outputPath.replace(".mp4", `_${scene.sceneId}.mp4`);

    const composition = await selectComposition({
      serveUrl: bundled,
      id: scene.compositionId,
      inputProps: scene.props,
    });

    await renderMedia({
      composition: { ...composition, durationInFrames: scene.durationInFrames },
      serveUrl: bundled,
      codec: "h264",
      outputLocation: scenePath,
      inputProps: scene.props,
    });

    scenePaths.push(scenePath);
  }

  await saveMemory("exportAgent", {
    ...memory.context,
    lastExport: new Date().toISOString(),
    lastOutputPath: brief.outputPath,
    sceneCount: scenes.length,
  });

  console.log(`Exported ${scenePaths.length} scene(s).`);
  return brief.outputPath;
}
