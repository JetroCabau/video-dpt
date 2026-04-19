"use client";
import React, { createContext, useContext, useState } from "react";
import * as base from "./theme";

type BgKey = keyof typeof base.colors.background;
type TextKey = keyof typeof base.colors.text;
type HeadingKey = keyof typeof base.typography.heading;

interface Overrides {
  bg: Partial<Record<BgKey, string>>;
  text: Partial<Record<TextKey, string>>;
  headingSize: Partial<Record<HeadingKey, number>>;
}

interface ThemeCtx {
  colors: typeof base.colors;
  typography: typeof base.typography;
  spacing: typeof base.spacing;
  borderRadius: typeof base.borderRadius;
  overrides: Overrides;
  setBg: (key: BgKey, val: string) => void;
  setText: (key: TextKey, val: string) => void;
  setHeadingSize: (key: HeadingKey, val: number) => void;
  reset: () => void;
}

const Ctx = createContext<ThemeCtx | null>(null);
const EMPTY: Overrides = { bg: {}, text: {}, headingSize: {} };

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [ov, setOv] = useState<Overrides>(EMPTY);

  const setBg = (key: BgKey, val: string) =>
    setOv((p) => ({ ...p, bg: { ...p.bg, [key]: val } }));
  const setText = (key: TextKey, val: string) =>
    setOv((p) => ({ ...p, text: { ...p.text, [key]: val } }));
  const setHeadingSize = (key: HeadingKey, val: number) =>
    setOv((p) => ({ ...p, headingSize: { ...p.headingSize, [key]: val } }));
  const reset = () => setOv(EMPTY);

  const colors = {
    ...base.colors,
    background: { ...base.colors.background, ...ov.bg },
    text: { ...base.colors.text, ...ov.text },
  };

  const heading = Object.fromEntries(
    (Object.entries(base.typography.heading) as [HeadingKey, { size: number; letterSpacing: number }][]).map(
      ([k, v]) => [k, ov.headingSize[k] !== undefined ? { ...v, size: ov.headingSize[k]! } : v]
    )
  ) as typeof base.typography.heading;

  const typography = { ...base.typography, heading };

  return (
    <Ctx.Provider value={{
      colors, typography,
      spacing: base.spacing,
      borderRadius: base.borderRadius,
      overrides: ov, setBg, setText, setHeadingSize, reset,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useTheme() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useTheme must be used inside ThemeProvider");
  return c;
}
