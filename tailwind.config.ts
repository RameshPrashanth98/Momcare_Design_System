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
        // Brand palettes
        rose:    colors.rose,
        cream:   colors.cream,
        sage:    colors.sage,
        neutral: colors.neutral,
        // Status colors
        success:         colors.status.success,
        "success-light": colors.status.successLight,
        warning:         colors.status.warning,
        "warning-light": colors.status.warningLight,
        error:           colors.status.error,
        "error-light":   colors.status.errorLight,
        info:            colors.status.info,
        "info-light":    colors.status.infoLight,
        // Semantic aliases
        primary:        semanticColors.primary,
        "primary-dark": semanticColors.primaryDark,
        surface:        semanticColors.surface,
        background:     semanticColors.background,
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
