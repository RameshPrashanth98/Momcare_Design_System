import type { Config } from "tailwindcss";
import { colors, semanticColors } from "./tokens/colors";
import { fontFamily, fontSize, fontWeight } from "./tokens/typography";
import { spacing } from "./tokens/spacing";
import { radius } from "./tokens/radius";
import { breakpoints } from "./tokens/grid";

// Convert fontSize token map to Tailwind format: [size, { lineHeight }]
const tailwindFontSize = Object.fromEntries(
  Object.entries(fontSize).map(([key, val]) => [
    key,
    [`${val.size}px`, { lineHeight: `${val.lineHeight}px` }] as [string, { lineHeight: string }],
  ])
);

// Convert numeric spacing values to string px values for Tailwind
const tailwindSpacing = Object.fromEntries(
  Object.entries(spacing).map(([key, val]) => [key, `${val}px`])
);

// Convert numeric radius values to string px values for Tailwind
const tailwindRadius = Object.fromEntries(
  Object.entries(radius).map(([key, val]) => [key, `${val}px`])
);

// Convert fontWeight values to plain Record<string, string>
const tailwindFontWeight: Record<string, string> = { ...fontWeight };

const config: Config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./.rnstorybook/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Brand palettes — now use named keys
        rose:    colors.rose,     // rose-blush, rose-petal, rose-mist, rose-deep, rose-dark
        cream:   colors.cream,    // cream-warm, cream-soft, cream-mid
        sage:    colors.sage,     // sage-light, sage-mid, sage-deep
        neutral: colors.neutral,  // neutral-50 through neutral-900
        // Status (flat, no object nesting needed)
        success: colors.status.success,
        warning: colors.status.warning,
        error:   colors.status.error,
        info:    colors.status.info,
        // Semantic aliases (flat Tailwind keys)
        primary:          semanticColors.primary,
        "primary-hover":  semanticColors.primaryHover,
        secondary:        semanticColors.secondary,
        accent:           semanticColors.accent,
        "text-primary":   semanticColors.textPrimary,
        "text-secondary": semanticColors.textSecondary,
        "text-muted":     semanticColors.textMuted,
        "bg-base":        semanticColors.bgBase,
        "bg-subtle":      semanticColors.bgSubtle,
        "border-default": semanticColors.borderDefault,
        "border-subtle":  semanticColors.borderSubtle,
      },
      fontFamily: {
        display:            [...fontFamily.display],
        "display-italic":   [...fontFamily.displayItalic],
        "display-semibold": [...fontFamily.displaySemiBold],
        "display-bold":     [...fontFamily.displayBold],
        body:               [...fontFamily.body],
        "body-medium":      [...fontFamily.bodyMedium],
        mono:               [...fontFamily.mono],
      },
      fontSize: tailwindFontSize,
      fontWeight: tailwindFontWeight,
      spacing: tailwindSpacing,
      borderRadius: tailwindRadius,
      screens: { ...breakpoints },
    },
  },
  plugins: [],
};

export default config;
