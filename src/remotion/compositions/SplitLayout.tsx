import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

interface Props extends Record<string, unknown> {
  left: string;
  right: string;
}

export const SplitLayout: React.FC<Props> = ({ left, right }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ flexDirection: "row", opacity }}>
      <div
        style={{
          flex: 1,
          backgroundColor: "#1a1a2e",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: 60,
        }}
      >
        <p style={{ color: "#fff", fontSize: 52, fontFamily: "sans-serif", textAlign: "center" }}>{left}</p>
      </div>
      <div
        style={{
          flex: 1,
          backgroundColor: "#16213e",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          padding: 60,
        }}
      >
        <p style={{ color: "#e0e0e0", fontSize: 40, fontFamily: "sans-serif", textAlign: "center" }}>{right}</p>
      </div>
    </AbsoluteFill>
  );
};
