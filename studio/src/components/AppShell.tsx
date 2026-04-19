"use client";
import { ThemeProvider } from "@/lib/themeContext";
import { Sidebar } from "./Sidebar";
import { CompositionCard } from "./CompositionCard";
import { TitleCard } from "@/remotion/TitleCard";
import { TextOverlay } from "@/remotion/TextOverlay";
import { FullBleedText } from "@/remotion/FullBleedText";
import { SplitLayout } from "@/remotion/SplitLayout";
import { TextReveal } from "@/remotion/TextReveal";
import { LogoStinger } from "@/remotion/LogoStinger";
import { TaglineStinger } from "@/remotion/TaglineStinger";
import type { ComponentType } from "react";

const COMPOSITIONS: {
  name: string;
  description: string;
  component: ComponentType<Record<string, unknown>>;
  durationInFrames: number;
  fps: number;
  propDefs: { key: string; type: "string"; placeholder: string; default: string }[];
}[] = [
  {
    name: "TitleCard",
    description: "Full-screen title with optional subtitle",
    component: TitleCard as unknown as ComponentType<Record<string, unknown>>,
    durationInFrames: 90,
    fps: 30,
    propDefs: [
      { key: "text",     type: "string", placeholder: "Main title",  default: "Hello Xebia"                },
      { key: "subtitle", type: "string", placeholder: "Subtitle",    default: "A global knowledge exchange" },
    ],
  },
  {
    name: "TextOverlay",
    description: "Slide-up text anchored to bottom",
    component: TextOverlay as unknown as ComponentType<Record<string, unknown>>,
    durationInFrames: 150,
    fps: 30,
    propDefs: [
      { key: "text",     type: "string", placeholder: "Main text",  default: "Knowledge that matters" },
      { key: "subtitle", type: "string", placeholder: "Subtitle",   default: "Xebia · 2025"           },
    ],
  },
  {
    name: "FullBleedText",
    description: "Scale-in centered statement on white",
    component: FullBleedText as unknown as ComponentType<Record<string, unknown>>,
    durationInFrames: 120,
    fps: 30,
    propDefs: [
      { key: "text", type: "string", placeholder: "Statement text", default: "Driven by expertise." },
    ],
  },
  {
    name: "SplitLayout",
    description: "Two-panel left/right composition",
    component: SplitLayout as unknown as ComponentType<Record<string, unknown>>,
    durationInFrames: 150,
    fps: 30,
    propDefs: [
      { key: "left",  type: "string", placeholder: "Left panel",  default: "The Challenge" },
      { key: "right", type: "string", placeholder: "Right panel", default: "The Solution"  },
    ],
  },
  {
    name: "TextReveal",
    description: "Masked line-by-line reveal with spring physics",
    component: TextReveal as unknown as ComponentType<Record<string, unknown>>,
    durationInFrames: 120,
    fps: 30,
    propDefs: [
      { key: "text",     type: "string", placeholder: "Lines separated by |", default: "Knowledge|that matters" },
      { key: "subtitle", type: "string", placeholder: "Subtitle (optional)",   default: "Xebia · 2025"          },
    ],
  },
  {
    name: "LogoStinger",
    description: "Xebia logo animated intro with optional tagline",
    component: LogoStinger as unknown as ComponentType<Record<string, unknown>>,
    durationInFrames: 150,
    fps: 30,
    propDefs: [],
  },
  {
    name: "TaglineStinger",
    description: "Shaping Tomorrow with AI Today — gradient animated text",
    component: TaglineStinger as unknown as ComponentType<Record<string, unknown>>,
    durationInFrames: 240,
    fps: 30,
    propDefs: [],
  },
];

export function AppShell() {
  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-[#0a0015]">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top bar */}
          <header className="flex items-center gap-4 px-8 py-4 border-b border-[#150027] shrink-0">
            <div>
              <h1 className="text-white text-sm font-medium">Composition Library</h1>
              <p className="text-[#443352] text-xs mt-0.5 font-mono">
                {COMPOSITIONS.length} compositions · Xebia Design System
              </p>
            </div>
            <div className="ml-auto flex flex-wrap gap-1.5">
              {COMPOSITIONS.map((c) => (
                <span
                  key={c.name}
                  className="px-2 py-0.5 rounded-full bg-[#0e0020] border border-[#2c1a3d] text-[#73667d] text-xs font-mono"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </header>

          {/* Cards */}
          <main className="flex-1 overflow-y-auto p-8">
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 max-w-[1600px]">
              {COMPOSITIONS.map((c) => (
                <CompositionCard
                  key={c.name}
                  name={c.name}
                  description={c.description}
                  component={c.component}
                  durationInFrames={c.durationInFrames}
                  fps={c.fps}
                  propDefs={c.propDefs}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
