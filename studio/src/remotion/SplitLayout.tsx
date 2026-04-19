"use client";
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { useTheme } from "../lib/themeContext";

interface Props { left: string; right: string }

export const SplitLayout: React.FC<Props> = ({ left, right }) => {
  const { colors, typography, spacing } = useTheme();
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ flexDirection: "row", opacity }}>
      <div style={{
        flex: 1, display: "flex",
        backgroundColor: colors.background.velvet,
        justifyContent: "center", alignItems: "center",
        padding: spacing["6xl"],
      }}>
        <p style={{
          color: colors.text.onAccent,
          fontSize: typography.heading["4xl"].size,
          letterSpacing: typography.heading["4xl"].letterSpacing,
          lineHeight: typography.lineHeight.heading,
          fontFamily: typography.family,
          fontWeight: typography.weight.medium,
          textAlign: "center", margin: 0,
        }}>{left}</p>
      </div>
      <div style={{
        flex: 1, display: "flex",
        backgroundColor: colors.background.blueDark,
        justifyContent: "center", alignItems: "center",
        padding: spacing["6xl"],
      }}>
        <p style={{
          color: colors.text.velvetLightSubtle,
          fontSize: typography.heading["3xl"].size,
          letterSpacing: typography.heading["3xl"].letterSpacing,
          lineHeight: typography.lineHeight.heading,
          fontFamily: typography.family,
          fontWeight: typography.weight.regular,
          textAlign: "center", margin: 0,
        }}>{right}</p>
      </div>
    </AbsoluteFill>
  );
};
