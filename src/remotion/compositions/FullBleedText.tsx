import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface Props extends Record<string, unknown> {
  text: string;
}

export const FullBleedText: React.FC<Props> = ({ text }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 30], [0.92, 1], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 120,
      }}
    >
      <p
        style={{
          color: "#111",
          fontSize: 72,
          fontFamily: "sans-serif",
          textAlign: "center",
          transform: `scale(${scale})`,
          opacity,
          margin: 0,
        }}
      >
        {text}
      </p>
    </AbsoluteFill>
  );
};
