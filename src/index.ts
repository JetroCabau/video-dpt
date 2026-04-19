import "dotenv/config";
import { runPipeline } from "./pipeline/orchestrator";

const briefPath = process.argv[2] ?? "briefs/example.json";

runPipeline(briefPath).catch((err) => {
  console.error("[pipeline] Fatal error:", err);
  process.exit(1);
});
