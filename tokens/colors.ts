/**
 * Morph Maternity Color Tokens
 * Values extracted from morph-maternity-design-system.html spec.
 * This file is the single source of truth for all brand color values.
 */

export const colors = {
  // Rose palette — primary brand color
  rose: {
    50:  "#FFF0F3",
    100: "#FFE0E8",
    200: "#FFC0D1",
    300: "#FF91AA",
    400: "#FF6B89",
    500: "#FF2D55",   // primary brand rose
    600: "#E0184F",
    700: "#BE0F44",
    800: "#9C1040",
    900: "#82133B",
    950: "#47051C",
  },

  // Cream palette — warm neutral background
  cream: {
    50:  "#FFFDF8",
    100: "#FFF8EC",
    200: "#FFF0D6",
    300: "#FFE4B5",
    400: "#FFD485",
    500: "#FFC04A",
    600: "#E0A030",
    700: "#B87D1A",
    800: "#8F5E11",
    900: "#6B440D",
    950: "#3D2605",
  },

  // Sage palette — soft green accent
  sage: {
    50:  "#F4F8F4",
    100: "#E6F0E7",
    200: "#CAE0CD",
    300: "#A4CAA9",
    400: "#74AE7B",
    500: "#4E9157",
    600: "#3B7644",
    700: "#2F5E37",
    800: "#264A2D",
    900: "#1F3D25",
    950: "#0F2214",
  },

  // Neutral palette — grays
  neutral: {
    50:  "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0A0A0A",
  },

  // Status colors
  status: {
    success:      "#22C55E",
    successLight: "#DCFCE7",
    warning:      "#F59E0B",
    warningLight: "#FEF3C7",
    error:        "#EF4444",
    errorLight:   "#FEE2E2",
    info:         "#3B82F6",
    infoLight:    "#DBEAFE",
  },
} as const;

// Semantic color aliases — used for component defaults
export const semanticColors = {
  primary:       colors.rose[500],
  primaryDark:   colors.rose[600],
  surface:       colors.cream[50],
  background:    colors.cream[100],
  textPrimary:   colors.neutral[900],
  textSecondary: colors.neutral[600],
  textDisabled:  colors.neutral[400],
  border:        colors.neutral[200],
  borderFocus:   colors.rose[400],
} as const;
