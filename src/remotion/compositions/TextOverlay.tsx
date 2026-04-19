import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors, typography, spacing } from "../theme";

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
        backgroundColor: colors.background.velvetDark,
        justifyContent: "flex-end",
        padding: spacing["8xl"],
      }}
    >
      <div style={{ transform: `translateY(${translateY}px)`, opacity }}>
        <p
          style={{
            color: colors.text.inverse,
            fontSize: typography.heading["5xl"].size,
            letterSpacing: typography.heading["5xl"].letterSpacing,
            lineHeight: typography.lineHeight.heading,
            fontFamily: typography.family,
            fontWeight: typography.weight.medium,
            margin: 0,
          }}
        >
          {text}
        </p>
        {subtitle && (
          <p
            style={{
              color: colors.text.velvetLightSubtle,
              fontSize: typography.heading["3xl"].size,
              letterSpacing: typography.heading["3xl"].letterSpacing,
              lineHeight: typography.lineHeight.heading,
              fontFamily: typography.family,
              fontWeight: typography.weight.regular,
              marginTop: spacing["3xl"],
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </AbsoluteFill>
  );
};
