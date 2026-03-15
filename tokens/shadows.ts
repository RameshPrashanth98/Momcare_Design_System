/**
 * Morph Maternity Shadow / Elevation Tokens
 *
 * React Native requires both iOS (shadowColor, shadowOffset, shadowOpacity, shadowRadius)
 * and Android (elevation) shadow properties. NativeWind applies the correct set per platform.
 *
 * NOTE: NativeWind v4 shadow-* utilities map to React Native shadow props (not CSS box-shadow).
 * These tokens are used as StyleSheet objects when applied directly, or via NativeWind shadow classes.
 */

export const shadows = {
  xs: {
    shadowColor:   "#000000",
    shadowOffset:  { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius:  2,
    elevation:     1,
  },
  sm: {
    shadowColor:   "#000000",
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius:  4,
    elevation:     2,
  },
  md: {
    shadowColor:   "#000000",
    shadowOffset:  { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius:  8,
    elevation:     4,
  },
  lg: {
    shadowColor:   "#000000",
    shadowOffset:  { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius:  16,
    elevation:     8,
  },
  xl: {
    shadowColor:   "#000000",
    shadowOffset:  { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius:  24,
    elevation:     12,
  },
  "2xl": {
    shadowColor:   "#000000",
    shadowOffset:  { width: 0, height: 24 },
    shadowOpacity: 0.16,
    shadowRadius:  48,
    elevation:     24,
  },
  inner: {
    // Inner shadow — iOS only (no Android elevation equivalent for inset shadows)
    shadowColor:   "#000000",
    shadowOffset:  { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius:  4,
    elevation:     0,
  },
} as const;
