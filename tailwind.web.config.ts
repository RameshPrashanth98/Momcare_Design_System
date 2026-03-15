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
        rose:    colors.rose,
        cream:   colors.cream,
        sage:    colors.sage,
        neutral: colors.neutral,
        success:         colors.status.success,
        "success-light": colors.status.successLight,
        warning:         colors.status.warning,
        "warning-light": colors.status.warningLight,
        error:           colors.status.error,
        "error-light":   colors.status.errorLight,
        info:            colors.status.info,
        "info-light":    colors.status.infoLight,
        primary:        semanticColors.primary,
        "primary-dark": semanticColors.primaryDark,
        surface:        semanticColors.surface,
        background:     semanticColors.background,
      },
      fontSize: tailwindFontSize,
      fontWeight: tailwindFontWeight,
    },
  },
  plugins: [],
};

export default config;
