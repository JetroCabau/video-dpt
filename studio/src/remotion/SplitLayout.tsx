"use client";
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useTheme } from "../lib/themeContext";

interface Props { left: string; right: string }

export const SplitLayout: React.FC<Props> = ({ left, right }) => {
  const { colors, typography, spacing } = useTheme();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftP = spring({ frame, fps, config: { damping: 18, stiffness: 110, mass: 0.9 } });
  const leftTX = interpolate(leftP, [0, 1], [-960, 0]);

  const rightP = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 18, stiffness: 110, mass: 0.9 } });
  const rightTX = interpolate(rightP, [0, 1], [960, 0]);

  const leftTextH = typography.heading["4xl"].size * typography.lineHeight.heading;
  const leftTextP = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 20, stiffness: 160, mass: 0.6 } });
  const leftTextTY = interpolate(leftTextP, [0, 1], [leftTextH, 0]);

  const rightTextH = typography.heading["3xl"].size * typography.lineHeight.heading;
  const rightTextP = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 20, stiffness: 160, mass: 0.6 } });
  const rightTextTY = interpolate(rightTextP, [0, 1], [rightTextH, 0]);

  return (
    <AbsoluteFill style={{ flexDirection: "row" }}>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <div style={{
          width: "100%", height: "100%",
          backgroundColor: colors.background.velvet,
          display: "flex", justifyContent: "center", alignItems: "center",
          padding: spacing["6xl"],
          transform: `translateX(${leftTX}px)`,
        }}>
          <div style={{ overflow: "hidden", height: leftTextH }}>
            <p style={{
              display: "block",
              transform: `translateY(${leftTextTY}px)`,
              color: colors.text.onAccent,
              fontSize: typography.heading["4xl"].size,
              letterSpacing: typography.heading["4xl"].letterSpacing,
              lineHeight: typography.lineHeight.heading,
              fontFamily: typography.family,
              fontWeight: typography.weight.medium,
              textAlign: "center", margin: 0,
            }}>{left}</p>
          </div>
        </div>
      </div>

      <div style={{ width: 1, backgroundColor: colors.background.velvetDark, flexShrink: 0 }} />

      <div style={{ flex: 1, overflow: "hidden" }}>
        <div style={{
          width: "100%", height: "100%",
          backgroundColor: colors.background.blueDark,
          display: "flex", justifyContent: "center", alignItems: "center",
          padding: spacing["6xl"],
          transform: `translateX(${rightTX}px)`,
        }}>
          <div style={{ overflow: "hidden", height: rightTextH }}>
            <p style={{
              display: "block",
              transform: `translateY(${rightTextTY}px)`,
              color: colors.text.velvetLightSubtle,
              fontSize: typography.heading["3xl"].size,
              letterSpacing: typography.heading["3xl"].letterSpacing,
              lineHeight: typography.lineHeight.heading,
              fontFamily: typography.family,
              fontWeight: typography.weight.regular,
              textAlign: "center", margin: 0,
            }}>{right}</p>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
