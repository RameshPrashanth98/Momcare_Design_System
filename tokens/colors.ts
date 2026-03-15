/**
 * Morph Maternity Color Tokens
 * Values extracted from morph-maternity-design-system.html spec.
 * This file is the single source of truth for all brand color values.
 */

export const colors = {
  // Rose palette — primary brand color (spec named palette, NOT numeric scale)
  rose: {
    blush: "#E8A4B0",   // primary brand rose
    petal: "#F2C4CE",
    mist:  "#FAE8EC",
    deep:  "#C4697A",
    dark:  "#8B3A4A",
  },

  // Cream palette — warm neutral background
  cream: {
    warm: "#FDF5F0",
    soft: "#F9EDE8",
    mid:  "#EFD9D0",
  },

  // Sage palette — soft green accent
  sage: {
    light: "#D6E4DC",
    mid:   "#A8C5B2",
    deep:  "#6B9E7E",
  },

  // Neutral palette — grays (spec uses 50–900 numeric, retain these)
  neutral: {
    50:  "#FAFAFA",
    100: "#F5F5F5",
    200: "#E8E8E8",
    300: "#D4D4D4",
    400: "#A8A8A8",
    500: "#737373",
    600: "#525252",
    700: "#3D3D3D",
    800: "#262626",
    900: "#171717",
  },

  // Status colors (spec values, no "Light" variants — simplified to 4 states)
  status: {
    success: "#6BAF7E",
    warning: "#D4A254",
    error:   "#C95C5C",
    info:    "#6B8FB5",
  },
} as const;

// Semantic color aliases — used for component defaults
export const semanticColors = {
  primary:       colors.rose.blush,
  primaryHover:  colors.rose.deep,
  secondary:     colors.cream.warm,
  accent:        colors.sage.mid,
  textPrimary:   colors.neutral[800],
  textSecondary: colors.neutral[500],
  textMuted:     colors.neutral[400],
  bgBase:        "#FFFFFF",
  bgSubtle:      colors.cream.warm,
  borderDefault: colors.neutral[200],
  borderSubtle:  colors.neutral[100],
} as const;
