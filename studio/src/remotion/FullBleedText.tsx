"use client";
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useTheme } from "../lib/themeContext";

interface Props { text: string }

export const FullBleedText: React.FC<Props> = ({ text }) => {
  const { colors, typography, spacing } = useTheme();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneOpacity = interpolate(frame, [0, 6], [0, 1], { extrapolateRight: "clamp" });

  const lineP = spring({ frame, fps, config: { damping: 14, stiffness: 130, mass: 0.5 } });
  const lineScale = interpolate(lineP, [0, 1], [0, 1]);

  const textH = typography.heading["5xl"].size * typography.lineHeight.heading;
  const textP = spring({ frame: Math.max(0, frame - 14), fps, config: { damping: 22, stiffness: 170, mass: 0.55 } });
  const textTY = interpolate(textP, [0, 1], [textH, 0]);

  const line2P = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 14, stiffness: 130, mass: 0.5 } });
  const line2Scale = interpolate(line2P, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{
      backgroundColor: colors.background.primary,
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
      paddingLeft: spacing["9xl"],
      paddingRight: spacing["9xl"],
      opacity: sceneOpacity,
    }}>
      <div style={{ width: "100%", height: 2, marginBottom: spacing["4xl"], overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: `linear-gradient(to right, ${colors.background.velvet}, ${colors.background.velvetLight}, transparent)`,
          transform: `scaleX(${lineScale})`,
          transformOrigin: "left center",
        }} />
      </div>

      <div style={{ overflow: "hidden", height: textH }}>
        <p style={{
          display: "block",
          transform: `translateY(${textTY}px)`,
          color: colors.text.primary,
          fontSize: typography.heading["5xl"].size,
          letterSpacing: typography.heading["5xl"].letterSpacing,
          lineHeight: typography.lineHeight.heading,
          fontFamily: typography.family,
          fontWeight: typography.weight.regular,
          margin: 0,
        }}>{text}</p>
      </div>

      <div style={{ width: "40%", height: 2, marginTop: spacing["4xl"], overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: `linear-gradient(to left, ${colors.background.velvet}, ${colors.background.velvetLight}, transparent)`,
          transform: `scaleX(${line2Scale})`,
          transformOrigin: "right center",
        }} />
      </div>
    </AbsoluteFill>
  );
};
