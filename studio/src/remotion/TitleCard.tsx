"use client";
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useTheme } from "../lib/themeContext";

interface Props { text: string; subtitle: string }

export const TitleCard: React.FC<Props> = ({ text, subtitle }) => {
  const { colors, typography, spacing } = useTheme();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const accentP = spring({ frame, fps, config: { damping: 16, stiffness: 140, mass: 0.5 } });
  const accentW = interpolate(accentP, [0, 1], [0, 200]);

  const titleH = typography.heading["6xl"].size * typography.lineHeight.heading;
  const titleP = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 20, stiffness: 160, mass: 0.6 } });
  const titleTY = interpolate(titleP, [0, 1], [titleH, 0]);

  const subH = typography.heading["4xl"].size * typography.lineHeight.heading;
  const subP = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 20, stiffness: 160, mass: 0.6 } });
  const subTY = interpolate(subP, [0, 1], [subH, 0]);

  return (
    <AbsoluteFill style={{
      backgroundColor: colors.background.blueDark,
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
      paddingLeft: spacing["9xl"],
      paddingRight: spacing["9xl"],
    }}>
      <div style={{
        width: accentW,
        height: 3,
        background: `linear-gradient(to right, ${colors.divider[1]}, ${colors.divider[3]})`,
        marginBottom: spacing["3xl"],
        borderRadius: spacing.xs,
      }} />

      <div style={{ overflow: "hidden", height: titleH }}>
        <h1 style={{
          display: "block",
          transform: `translateY(${titleTY}px)`,
          color: colors.text.inverse,
          fontSize: typography.heading["6xl"].size,
          letterSpacing: typography.heading["6xl"].letterSpacing,
          lineHeight: typography.lineHeight.heading,
          fontFamily: typography.family,
          fontWeight: typography.weight.medium,
          margin: 0,
        }}>{text}</h1>
      </div>

      {subtitle && (
        <div style={{ overflow: "hidden", height: subH, marginTop: spacing["2xl"] }}>
          <p style={{
            display: "block",
            transform: `translateY(${subTY}px)`,
            color: colors.text.velvetLightSubtle,
            fontSize: typography.heading["4xl"].size,
            letterSpacing: typography.heading["4xl"].letterSpacing,
            lineHeight: typography.lineHeight.heading,
            fontFamily: typography.family,
            fontWeight: typography.weight.regular,
            margin: 0,
          }}>{subtitle}</p>
        </div>
      )}
    </AbsoluteFill>
  );
};
