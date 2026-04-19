// Xebia Design System tokens — extracted from Figma (MW6RCi5yD7voUAgyKFlce3)

export const colors = {
  // Primitives
  velvet: {
    50: "#f3e8f3", 100: "#dabbda", 200: "#b576b5", 300: "#9c499d",
    400: "#8f3290", 500: "#831b84", 600: "#6a026b", 700: "#500051",
    800: "#370038", 900: "#1d001e",
  },
  velvetLight: {
    50: "#fceafa", 100: "#f9d6f6", 200: "#f4adec", 300: "#ee83e3",
    400: "#e95ad9", 500: "#e331d0", 600: "#c918b6", 700: "#b0009d",
    800: "#960083", 900: "#7d006a",
  },
  blueDark: {
    50: "#fafafb", 100: "#f3f2f4", 200: "#e7e5e9", 300: "#d0ccd4",
    400: "#a199a9", 500: "#73667d", 600: "#5b4d68", 700: "#443352",
    800: "#2c1a3d", 900: "#150027",
  },
  greySlatE: {
    50: "#fafafb", 100: "#f5f5f7", 200: "#eff1f4", 300: "#e5e7ec",
    400: "#d5d9e1", 500: "#cbcfd9", 600: "#b1b5bf", 700: "#989ca6",
    800: "#7f828c", 900: "#656973",
  },
  greyWarm: {
    50: "#fdfcfc", 100: "#faf8f8", 200: "#f0eceb", 300: "#e2dcda",
    400: "#cbbfbd", 500: "#b3a5a2", 600: "#958583", 700: "#786866",
    800: "#5b4d4b", 900: "#3e3332",
  },
  violet: {
    50: "#f6f4fb", 100: "#eceaf8", 200: "#dad5f1", 300: "#d1caed",
    400: "#beb5e6", 500: "#a295db", 600: "#887cc1", 700: "#6f62a8",
    800: "#56498e", 900: "#3c2f75",
  },
  neutral: {
    0: "#ffffff", 50: "#f8f7f9", 100: "#e6e6e6", 200: "#cccccc",
    300: "#b3b3b3", 400: "#999999", 500: "#808080", 600: "#666666",
    700: "#4d4d4d", 800: "#333333", 900: "#000000",
  },
  gradient: ["#e9606c", "#e64dc3", "#d03dae", "#981ff8", "#8017f9"],

  // Semantic (Light mode)
  text: {
    primary: "#000000",
    secondary: "#4d4d4d",
    tertiary: "#808080",
    velvet: "#831b84",
    velvetSubtle: "#9c499d",
    velvetLight: "#e331d0",
    velvetLightSubtle: "#ee83e3",
    velvetDark: "#500051",
    blueDark: "#150027",
    onAccent: "#ffffff",
    inverse: "#ffffff",
  },
  background: {
    primary: "#ffffff",
    secondary: "#faf8f8",
    velvet: "#831b84",
    velvetSubtle: "#9c499d",
    velvetLight: "#e331d0",
    velvetLightSubtle: "#ee83e3",
    velvetDark: "#500051",
    blueDark: "#150027",
    glossy: "#f5f5f7",
  },
  border: {
    primary: "#000000",
    secondary: "#f0eceb",
    velvet: "#831b84",
    velvetSubtle: "#9c499d",
    velvetLight: "#e331d0",
    velvetLightSubtle: "#ee83e3",
    velvetDark: "#500051",
    blueDark: "#150027",
    glossy: "#eff1f4",
  },
  divider: ["#e9606c", "#e64dc3", "#d03dae", "#981ff8", "#8017f9"],
} as const;

export const typography = {
  family: "Suisse Int'l, sans-serif",
  weight: {
    regular: 400,
    medium: 500,
  },
  // line-height as a multiplier (105% for headings, 140% for body)
  lineHeight: {
    heading: 1.05,
    body: 1.4,
  },
  // font-size + letter-spacing in px
  heading: {
    s:   { size: 16,  letterSpacing: 0  },
    m:   { size: 18,  letterSpacing: 0  },
    l:   { size: 20,  letterSpacing: 0  },
    xl:  { size: 24,  letterSpacing: 0  },
    "2xl": { size: 32,  letterSpacing: -1 },
    "3xl": { size: 40,  letterSpacing: -1 },
    "4xl": { size: 48,  letterSpacing: -2 },
    "5xl": { size: 64,  letterSpacing: -2 },
    "6xl": { size: 96,  letterSpacing: -2 },
    "7xl": { size: 128, letterSpacing: -3 },
    "8xl": { size: 192, letterSpacing: -3 },
  },
  body: {
    s:    { size: 14,  letterSpacing: 0 },
    m:    { size: 16,  letterSpacing: 0 },
    l:    { size: 18,  letterSpacing: 0 },
    xl:   { size: 20,  letterSpacing: 0 },
    "2xl": { size: 24,  letterSpacing: 0 },
    "3xl": { size: 32,  letterSpacing: 0 },
  },
  caption: {
    s: { size: 10, letterSpacing: 0 },
    m: { size: 12, letterSpacing: 0 },
  },
} as const;

export const spacing = {
  none: 0,
  xs:   2,
  s:    4,
  m:    6,
  l:    8,
  xl:   12,
  "2xl": 16,
  "3xl": 24,
  "4xl": 32,
  "5xl": 48,
  "6xl": 64,
  "7xl": 96,
  "8xl": 128,
  "9xl": 192,
  "10xl": 256,
} as const;

export const borderRadius = {
  none: 0,
  xs:   2,
  s:    4,
  m:    6,
  l:    8,
  xl:   12,
  "2xl": 16,
  "3xl": 24,
  "4xl": 32,
  "5xl": 48,
  full: 9999,
} as const;
