import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

interface Props extends Record<string, unknown> {}

const LOGO_W = 480;
const LOGO_H = 160;

export const LogoStinger: React.FC<Props> = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowP = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 20, stiffness: 80, mass: 1 } });

  // Smooth cubic ease-out fade over ~1.7s
  const opacity = interpolate(frame, [0, 50], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const scale = interpolate(frame, [0, 50], [0.97, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

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
        transform: `scale(${glowP})`,
        pointerEvents: "none",
      }} />

      <svg
        width={LOGO_W} height={LOGO_H}
        viewBox="0 0 385 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity, transform: `scale(${scale})` }}
      >
        <path fillRule="evenodd" clipRule="evenodd" fill="white" d="M0.564303 128H40.4417L83.5795 84.6166L126.592 128H166.971L103.769 64.253L167.535 0H127.156L83.5795 44.0158L40.2536 0H0L63.39 64.253L0.564303 128Z" />
        <path fillRule="evenodd" clipRule="evenodd" fill="white" d="M201.922 71.2291H149.142C149.898 80.5825 156.889 86.5636 167.659 86.1819C174.335 86.1819 180.193 83.3822 183.342 77.9737H199.906C194.364 92.4811 182.775 100.689 168.163 100.689C158.338 100.689 150.213 97.3169 143.411 90.445C137.238 83.8912 133.585 74.7923 133.585 66.0115C133.585 56.7217 136.734 48.5136 142.844 41.9598C149.52 34.897 158.212 30.952 167.218 30.952C178.429 30.952 188.821 36.6786 195.813 46.0321C199.906 52.0132 201.922 59.076 201.922 67.8568V71.2291ZM149.323 58.7502H185.287C182.83 49.9695 176.406 45.1337 166.707 45.1337C158.897 45.1337 151.528 50.5421 149.323 58.7502Z" />
        <path fillRule="evenodd" clipRule="evenodd" fill="white" d="M225.178 11.6187V38.2791C231.098 33.4433 237.585 31.5345 245.584 31.7254C254.276 31.7254 262.212 34.525 268.321 40.5061C275.69 47.0599 279.595 56.7315 279.595 66.4031C279.595 76.9018 275.186 86.7643 267.25 93.6362C261.33 98.472 254.087 101.272 245.647 101.272C237.9 101.272 231.287 99.0447 225.178 94.2089V99.6173H210.062V11.6187H225.178ZM244.576 46.7446C233.868 46.7446 225.744 55.2709 225.744 66.6604C225.744 77.4773 234.246 86.0036 243.757 85.94C255.598 85.94 263.722 77.3501 263.722 66.3423C263.722 55.8435 255.283 46.7446 244.576 46.7446Z" />
        <path fillRule="evenodd" clipRule="evenodd" fill="white" d="M304.715 11.6191H290.103V26.381H304.715V11.6191ZM304.714 33.2443H290.102V99.6091H304.714V33.2443Z" />
        <path fillRule="evenodd" clipRule="evenodd" fill="white" d="M384.01 99.6118H369.397H369.334V91.4037C365.681 98.2756 359.005 101.075 348.865 101.075C329.529 101.075 314.917 86.1225 314.917 66.2067C314.917 56.8533 318.066 48.327 324.176 41.7732C330.852 34.7104 338.725 31.529 348.55 31.529C358.124 31.529 364.926 34.6468 369.397 41.2006V33.247H384.01V99.6118ZM349.195 46.4708C338.803 46.4708 330.363 54.6789 330.363 65.4958C330.363 77.2035 339.054 85.4117 349.447 85.4117C359.02 85.4117 367.712 76.6309 367.712 66.3866C367.712 54.9971 358.768 46.4708 349.195 46.4708Z" />
      </svg>
    </AbsoluteFill>
  );
};
