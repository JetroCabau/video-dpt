"use client";
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { useTheme } from "../lib/themeContext";

interface RevealLineProps {
  text: string;
  delay: number;
  fontSize: number;
  letterSpacing: number;
  color: string;
  fontFamily: string;
  fontWeight: number;
  lineHeight: number;
}

const RevealLine: React.FC<RevealLineProps> = ({
  text, delay, fontSize, letterSpacing, color, fontFamily, fontWeight, lineHeight,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineH = fontSize * lineHeight;

  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 20, stiffness: 180, mass: 0.6 },
  });

  const translateY = interpolate(progress, [0, 1], [lineH, 0]);

  return (
    <div style={{ overflow: "hidden", height: lineH }}>
      <span style={{
        display: "block",
        transform: `translateY(${translateY}px)`,
        fontSize,
        letterSpacing,
        lineHeight,
        fontFamily,
        fontWeight,
        color,
      }}>
        {text}
      </span>
    </div>
  );
};

interface Props { text: string; subtitle?: string }

// text supports "|" as line separator: "Line one|Line two|Line three"
export const TextReveal: React.FC<Props> = ({ text, subtitle }) => {
  const { colors, typography, spacing } = useTheme();
  const lines = text.split("|").filter(Boolean);

  return (
    <AbsoluteFill style={{
      backgroundColor: colors.background.blueDark,
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
      paddingLeft: spacing["9xl"],
      paddingRight: spacing["9xl"],
    }}>
      <div>
        {lines.map((line, i) => (
          <RevealLine
            key={i}
            text={line}
            delay={i * 6}
            fontSize={typography.heading["5xl"].size}
            letterSpacing={typography.heading["5xl"].letterSpacing}
            color={colors.text.inverse}
            fontFamily={typography.family}
            fontWeight={typography.weight.medium}
            lineHeight={typography.lineHeight.heading}
          />
        ))}
        {subtitle && (
          <div style={{ marginTop: spacing["3xl"] }}>
            <RevealLine
              text={subtitle}
              delay={lines.length * 6 + 10}
              fontSize={typography.heading["3xl"].size}
              letterSpacing={typography.heading["3xl"].letterSpacing}
              color={colors.text.velvetLightSubtle}
              fontFamily={typography.family}
              fontWeight={typography.weight.regular}
              lineHeight={typography.lineHeight.heading}
            />
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
