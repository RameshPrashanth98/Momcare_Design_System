/**
 * Morph Maternity Grid / Breakpoint Tokens
 * NativeWind v4 mobile-first responsive breakpoints.
 * Mobile: 4-col (default), Tablet: 8-col (sm), Desktop: 12-col (md+)
 */

export const breakpoints = {
  sm: "640px",    // tablet threshold — 8-column layout
  md: "768px",    // wide tablet — 12-column layout begins
  lg: "1024px",   // desktop / large tablet landscape
  xl: "1280px",   // wide desktop
} as const;
