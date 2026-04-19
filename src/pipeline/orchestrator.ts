import fs from "fs/promises";
import { generateScript } from "../agents/scriptAgent";
import { selectComponents } from "../agents/componentAgent";
import { reviewScenes } from "../agents/reviewAgent";
import { exportVideo } from "../agents/exportAgent";
import { VideoBrief } from "../types";

export async function runPipeline(briefPath = "briefs/example.json"): Promise<void> {
  const raw = await fs.readFile(briefPath, "utf-8");
  const brief: VideoBrief = JSON.parse(raw);

  console.log(`[pipeline] Brief loaded: "${brief.topic}"`);

  console.log("[pipeline] Step 1: Generating script...");
  const script = await generateScript(brief);

  console.log("[pipeline] Step 2: Selecting Remotion components...");
  const scenes = await selectComponents(script, brief);

  console.log("[pipeline] Step 3: Reviewing scenes...");
  const review = await reviewScenes(scenes, brief);
  console.log(`[pipeline] Review: ${review.approved ? "approved" : "rejected"} — ${review.feedback}`);

  if (!review.approved) {
    console.error("[pipeline] Review failed. Aborting export.");
    process.exit(1);
  }

  console.log("[pipeline] Step 4: Exporting video...");
  const outputPath = await exportVideo(scenes, brief);

  console.log(`[pipeline] Done. Output: ${outputPath}`);
}
