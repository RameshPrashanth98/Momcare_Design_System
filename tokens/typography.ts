/**
 * Morph Maternity Typography Tokens
 *
 * CRITICAL: fontFamily key strings must match useFonts() keys in app/_layout.tsx EXACTLY.
 * Case-sensitive. Hyphen vs space matters. Do not change these strings.
 */

// Font family keys — MUST match useFonts() keys in app/_layout.tsx exactly (case-sensitive)
export const fontFamily = {
  display:          ["CormorantGaramond-Regular"],   // Cormorant Garamond — display/editorial text
  displayItalic:    ["CormorantGaramond-Italic"],
  displaySemiBold:  ["CormorantGaramond-SemiBold"],
  displayBold:      ["CormorantGaramond-Bold"],
  body:             ["DMSans-Regular"],               // DM Sans — body and UI text
  bodyMedium:       ["DMSans-Medium"],
  mono:             ["DMMono-Regular"],               // DM Mono — code/data display
} as const;

// Type scale — size in px, lineHeight in px
export const fontSize = {
  xs:    { size: 10, lineHeight: 14 },
  sm:    { size: 12, lineHeight: 16 },
  base:  { size: 14, lineHeight: 20 },
  md:    { size: 16, lineHeight: 24 },
  lg:    { size: 18, lineHeight: 28 },
  xl:    { size: 20, lineHeight: 30 },
  "2xl": { size: 24, lineHeight: 32 },
  "3xl": { size: 30, lineHeight: 38 },
  "4xl": { size: 36, lineHeight: 44 },
  "5xl": { size: 48, lineHeight: 56 },
  "6xl": { size: 60, lineHeight: 68 },
} as const;

export const fontWeight = {
  light:    "300",
  regular:  "400",
  medium:   "500",
  semibold: "600",
  bold:     "700",
} as const;

export const lineHeight = {
  none:    1,
  tight:   1.25,
  snug:    1.375,
  normal:  1.5,
  relaxed: 1.625,
  loose:   2,
} as const;
