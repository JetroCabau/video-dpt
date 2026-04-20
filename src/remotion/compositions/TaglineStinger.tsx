import React from "react";
import { AbsoluteFill, Audio, Easing, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, typography } from "../theme";

interface Props extends Record<string, unknown> {}

const PART1      = "Shaping Tomorrow";
const SPACE      = " ";
const PART2_BASE = "with AI Today";
const TM         = "™";
const PART2      = PART2_BASE + TM;
const TOTAL      = PART1.length + SPACE.length + PART2.length;

const START      = 15;
const SPEED      = 2;
const TYPING_END = START + TOTAL * SPEED;
const HOLD_END   = TYPING_END + 90;
const FADE_END   = HOLD_END + 30;

const GRADIENT = "linear-gradient(90deg, #008BF7 0%, #5C31CE 20%, #D9029C 40%, #F40642 60%, #F79D00 80%, #008BF7 100%)";

export const TaglineStinger: React.FC<Props> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Glow: very slow fade-in over 80 frames, then fades out with the rest
  const glowIn  = interpolate(frame, [0, 80], [0, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const fadeOut = interpolate(frame, [HOLD_END, FADE_END], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glowOpacity = glowIn * fadeOut;

  // Text & cursor share the same fade-out
  const contentOpacity = fadeOut;

  const charsToShow = Math.min(Math.floor(Math.max(0, frame - START) / SPEED), TOTAL);
  const part1Shown = Math.min(charsToShow, PART1.length);
  const spaceShown = charsToShow > PART1.length ? 1 : 0;
  const part2Shown = Math.max(0, charsToShow - PART1.length - SPACE.length);

  const gradientX = -((frame / fps) * 20);

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
      {/* Glow — slow fade-in, fades out at end */}
      <div style={{
        position: "absolute",
        width: 900, height: 900,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(131,27,132,0.18) 0%, rgba(80,0,81,0.08) 45%, transparent 70%)",
        opacity: glowOpacity,
        pointerEvents: "none",
      }} />

      {/* Keyboard click per character */}
      {Array.from({ length: TOTAL }, (_, i) => (
        <Sequence key={i} from={START + i * SPEED} durationInFrames={SPEED + 3}>
          <Audio src={staticFile("keyboard-click.mp3")} volume={1} />
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
            {PART2_BASE.slice(0, Math.min(part2Shown, PART2_BASE.length))}
          </span>
        )}

        {part2Shown > PART2_BASE.length && (
          <span style={{ ...textStyle, color: colors.text.inverse }}>
            {TM}
          </span>
        )}
      </div>
    </AbsoluteFill>
  );
};
