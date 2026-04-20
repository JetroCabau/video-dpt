"use client";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const DynPlayer = dynamic(
  () => import("@remotion/player").then((m) => ({ default: m.Player })),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ width: "100%", aspectRatio: "16/9", backgroundColor: "#0a0015", borderRadius: 8 }}
        className="animate-pulse"
      />
    ),
  }
);

interface Props {
  component: ComponentType<Record<string, unknown>>;
  inputProps: Record<string, unknown>;
  durationInFrames: number;
  fps: number;
}

export function PlayerWrapper({ component, inputProps, durationInFrames, fps }: Props) {
  return (
    <DynPlayer
      component={component}
      inputProps={inputProps}
      durationInFrames={durationInFrames}
      fps={fps}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{ width: "100%", borderRadius: 8, overflow: "hidden" }}
      controls
      loop
      clickToPlay
      numberOfSharedAudioTags={8}
    />
  );
}
