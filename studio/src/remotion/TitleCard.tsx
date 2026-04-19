"use client";
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { useTheme } from "../lib/themeContext";

interface Props { text: string; subtitle: string }

export const TitleCard: React.FC<Props> = ({ text, subtitle }) => {
  const { colors, typography, spacing } = useTheme();
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      backgroundColor: colors.background.blueDark,
      justifyContent: "center", alignItems: "center",
      flexDirection: "column", gap: spacing["4xl"], opacity,
    }}>
      <h1 style={{
        color: colors.text.inverse,
        fontSize: typography.heading["6xl"].size,
        letterSpacing: typography.heading["6xl"].letterSpacing,
        lineHeight: typography.lineHeight.heading,
        fontFamily: typography.family,
        fontWeight: typography.weight.medium,
        margin: 0,
      }}>{text}</h1>
      {subtitle && (
        <p style={{
          color: colors.text.velvetLightSubtle,
          fontSize: typography.heading["4xl"].size,
          letterSpacing: typography.heading["4xl"].letterSpacing,
          lineHeight: typography.lineHeight.heading,
          fontFamily: typography.family,
          fontWeight: typography.weight.regular,
          margin: 0,
        }}>{subtitle}</p>
      )}
    </AbsoluteFill>
  );
};
