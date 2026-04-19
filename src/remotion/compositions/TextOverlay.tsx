import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface Props extends Record<string, unknown> {
  text: string;
  subtitle: string;
}

export const TextOverlay: React.FC<Props> = ({ text, subtitle }) => {
  const frame = useCurrentFrame();
  const translateY = interpolate(frame, [0, 30], [40, 0], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#111",
        justifyContent: "flex-end",
        padding: 80,
      }}
    >
      <div style={{ transform: `translateY(${translateY}px)`, opacity }}>
        <p style={{ color: "#fff", fontSize: 64, fontFamily: "sans-serif", margin: 0 }}>{text}</p>
        {subtitle && (
          <p style={{ color: "#ccc", fontSize: 36, fontFamily: "sans-serif", marginTop: 16 }}>{subtitle}</p>
        )}
      </div>
    </AbsoluteFill>
  );
};
