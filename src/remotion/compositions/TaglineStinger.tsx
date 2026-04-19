import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, typography, spacing } from "../theme";

interface Props extends Record<string, unknown> {}

// Gradient from xebia.com H1 — seamlessly tileable (starts & ends on #008BF7)
const GRADIENT = "linear-gradient(90deg, #008BF7, #5C31CE 10%, #D9029C 20%, #F40642 30%, #F79D00 40%, #008BF7 50%, #5C31CE 60%, #D9029C 70%, #F40642 80%, #F79D00 90%, #008BF7 100%)";

export const TaglineStinger: React.FC<Props> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowP = spring({ frame: Math.max(0, frame - 3), fps, config: { damping: 20, stiffness: 80, mass: 1 } });

  // "Shaping Tomorrow" mask reveal
  const line1H = typography.heading["5xl"].size * typography.lineHeight.heading;
  const line1P = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 20, stiffness: 160, mass: 0.6 } });
  const line1TY = interpolate(line1P, [0, 1], [line1H, 0]);

  // "with AI Today" mask reveal — slight delay
  const line2H = typography.heading["5xl"].size * typography.lineHeight.heading;
  const line2P = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 20, stiffness: 160, mass: 0.6 } });
  const line2TY = interpolate(line2P, [0, 1], [line2H, 0]);

  // Gradient scrolls at 20%/s, loops seamlessly every 5s
  const gradientX = -((frame / fps) * 20) % 100;

  const sharedTextStyle: React.CSSProperties = {
    display: "block",
    fontSize: typography.heading["5xl"].size,
    letterSpacing: typography.heading["5xl"].letterSpacing,
    lineHeight: typography.lineHeight.heading,
    fontFamily: typography.family,
    fontWeight: typography.weight.medium,
    margin: 0,
    textAlign: "center",
  };

  return (
    <AbsoluteFill style={{
      backgroundColor: colors.background.blueDark,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: spacing["3xl"],
    }}>
      {/* Glow */}
      <div style={{
        position: "absolute",
        width: 900, height: 900,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(131,27,132,0.18) 0%, rgba(80,0,81,0.08) 45%, transparent 70%)",
        transform: `scale(${glowP})`,
        pointerEvents: "none",
      }} />

      {/* "Shaping Tomorrow" */}
      <div style={{ overflow: "hidden", height: line1H }}>
        <p style={{
          ...sharedTextStyle,
          transform: `translateY(${line1TY}px)`,
          color: colors.text.inverse,
        }}>
          Shaping Tomorrow
        </p>
      </div>

      {/* "with AI Today" — gradient text */}
      <div style={{ overflow: "hidden", height: line2H }}>
        <p style={{
          ...sharedTextStyle,
          transform: `translateY(${line2TY}px)`,
          background: GRADIENT,
          backgroundSize: "200% 100%",
          backgroundPositionX: `${gradientX}%`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}>
          with AI Today
        </p>
      </div>
    </AbsoluteFill>
  );
};
