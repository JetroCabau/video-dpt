import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface Props extends Record<string, unknown> {
  text: string;
  subtitle: string;
}

export const TitleCard: React.FC<Props> = ({ text, subtitle }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 24,
        opacity,
      }}
    >
      <h1 style={{ color: "#fff", fontSize: 96, fontFamily: "sans-serif", margin: 0 }}>{text}</h1>
      {subtitle && (
        <p style={{ color: "#aaa", fontSize: 48, fontFamily: "sans-serif", margin: 0 }}>{subtitle}</p>
      )}
    </AbsoluteFill>
  );
};
