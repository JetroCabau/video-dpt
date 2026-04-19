import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, typography, spacing } from "../theme";

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
        backgroundColor: colors.background.primary,
        justifyContent: "center",
        alignItems: "center",
        padding: spacing["9xl"],
      }}
    >
      <p
        style={{
          color: colors.text.primary,
          fontSize: typography.heading["5xl"].size,
          letterSpacing: typography.heading["5xl"].letterSpacing,
          lineHeight: typography.lineHeight.heading,
          fontFamily: typography.family,
          fontWeight: typography.weight.regular,
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
