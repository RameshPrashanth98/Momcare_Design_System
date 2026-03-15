import type { Config } from "tailwindcss";
import { colors, semanticColors } from "./tokens/colors";
import { fontFamily, fontSize, fontWeight } from "./tokens/typography";

const tailwindFontSize = Object.fromEntries(
  Object.entries(fontSize).map(([key, val]) => [
    key,
    [`${val.size}px`, { lineHeight: `${val.lineHeight}px` }] as [string, { lineHeight: string }],
  ])
);

const tailwindFontWeight: Record<string, string> = { ...fontWeight };

const config: Config = {
  content: [
    "./src/stories/**/*.{js,jsx,ts,tsx}",
    "./.storybook/**/*.{js,jsx,ts,tsx}",
  ],
  // NO nativewind preset — this is web-only
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
      fontSize: tailwindFontSize,
      fontWeight: tailwindFontWeight,
    },
  },
  plugins: [],
};

export default config;
