"use client";
import React from "react";
import { AbsoluteFill, Audio, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { useTheme } from "../lib/themeContext";

interface Props {}

const PART1 = "Shaping Tomorrow";
const SPACE = " ";
const PART2 = "with AI Today";
const TOTAL = PART1.length + SPACE.length + PART2.length;

const START      = 15;
const SPEED      = 3;
const TYPING_END = START + TOTAL * SPEED;  // 105
const HOLD_END   = TYPING_END + 90;        // 195
const FADE_END   = HOLD_END + 30;          // 225

const GRADIENT = "linear-gradient(90deg, #008BF7 0%, #5C31CE 20%, #D9029C 40%, #F40642 60%, #F79D00 80%, #008BF7 100%)";

export const TaglineStinger: React.FC<Props> = () => {
  const { colors, typography } = useTheme();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowIn  = interpolate(frame, [0, 80], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const fadeOut = interpolate(frame, [HOLD_END, FADE_END], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glowOpacity = glowIn * fadeOut;
  const contentOpacity = fadeOut;

  const charsToShow = Math.min(Math.floor(Math.max(0, frame - START) / SPEED), TOTAL);
  const part1Shown = Math.min(charsToShow, PART1.length);
  const spaceShown = charsToShow > PART1.length ? 1 : 0;
  const part2Shown = Math.max(0, charsToShow - PART1.length - SPACE.length);

  const isDone = charsToShow >= TOTAL;
  const cursorVisible = !isDone || Math.floor(frame / 15) % 2 === 0;

  const gradientX = -((frame / fps) * 20) % 100;

  const textStyle: React.CSSProperties = {
    fontSize: typography.heading["3xl"].size,
    letterSpacing: typography.heading["3xl"].letterSpacing,
    lineHeight: typography.lineHeight.heading,
    fontFamily: typography.family,
    fontWeight: typography.weight.regular,
    whiteSpace: "pre",
  };

  return (
    <AbsoluteFill style={{
      backgroundColor: colors.background.blueDark,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        position: "absolute",
        width: 900, height: 900,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(131,27,132,0.18) 0%, rgba(80,0,81,0.08) 45%, transparent 70%)",
        opacity: glowOpacity,
        pointerEvents: "none",
      }} />

      {Array.from({ length: TOTAL }, (_, i) => (
        <Sequence key={i} from={START + i * SPEED} durationInFrames={SPEED + 3}>
          <Audio src={staticFile("keyboard-click.mp3")} volume={0.6} />
        </Sequence>
      ))}

      <div style={{ display: "flex", alignItems: "baseline", opacity: contentOpacity }}>
        <span style={{ ...textStyle, color: colors.text.inverse }}>
          {PART1.slice(0, part1Shown)}{spaceShown ? SPACE : ""}
        </span>

        {part2Shown > 0 && (
          <span style={{
            ...textStyle,
            background: GRADIENT,
            backgroundSize: "200% 100%",
            backgroundPositionX: `${gradientX}%`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}>
            {PART2.slice(0, part2Shown)}
          </span>
        )}

        {cursorVisible && frame < HOLD_END && (
          <span style={{
            ...textStyle,
            color: isDone ? colors.text.velvetLightSubtle : colors.text.inverse,
            marginLeft: 2,
          }}>|</span>
        )}
      </div>
    </AbsoluteFill>
  );
};
