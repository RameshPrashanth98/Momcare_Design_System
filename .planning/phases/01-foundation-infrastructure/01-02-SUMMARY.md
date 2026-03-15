---
phase: 01-foundation-infrastructure
plan: "02"
subsystem: ui
tags: [design-tokens, tailwindcss, nativewind, typescript, colors, typography, spacing]

requires:
  - phase: 01-01
    provides: tailwind.config.ts skeleton with NativeWind preset and theme.extend placeholder ready

provides:
  - tokens/colors.ts: Rose/Cream/Sage/Neutral palettes + Status + Semantic color constants
  - tokens/typography.ts: fontFamily keys (matching useFonts exactly), type scale, weights
  - tokens/spacing.ts: 4px grid space-1 through space-48 (15 steps)
  - tokens/radius.ts: border radius scale none through full
  - tokens/shadows.ts: elevation xs through 2xl + inner (iOS + Android React Native shadow props)
  - tokens/grid.ts: breakpoints sm/md/lg/xl for NativeWind v4 responsive classes
  - tokens/index.ts: barrel export for all token files
  - tailwind.config.ts: all tokens bridged into theme.extend — className="bg-rose-500 font-body" resolves to Morph Maternity brand values

affects:
  - All 50 v1 components that use token-derived class names
  - app/_layout.tsx: fontFamily.display etc. keys match useFonts() strings
  - 01-03 (Storybook): decorator can use className="bg-cream-50" reliably
  - 01-04 (cva/cn utilities): base classes reference rose-500, neutral-900 etc.

tech-stack:
  added: []
  patterns:
    - readonly-to-mutable spread pattern for fontFamily arrays in tailwind.config.ts (TypeScript const arrays are readonly; Tailwind expects mutable string[])
    - numeric-to-string px conversion pattern for spacing and borderRadius in tailwind.config.ts (token values are number for React Native; Tailwind expects string)
    - barrel export pattern via tokens/index.ts (all token files re-exported from single entry)

key-files:
  created:
    - tokens/colors.ts (Rose, Cream, Sage, Neutral palettes + Status + Semantic aliases)
    - tokens/typography.ts (fontFamily keys, type scale xs-6xl, fontWeight, lineHeight)
    - tokens/spacing.ts (4px grid space-1 through space-48)
    - tokens/radius.ts (none=0 through full=9999)
    - tokens/shadows.ts (xs through 2xl + inner, iOS + Android shadow properties)
    - tokens/grid.ts (sm 640px, md 768px, lg 1024px, xl 1280px breakpoints)
    - tokens/index.ts (barrel export)
  modified:
    - tailwind.config.ts (full token bridge: imports all token files, populates all theme.extend entries)

key-decisions:
  - "Token files use TypeScript const exports with no framework deps — importable in tailwind.config.ts and directly in components if needed"
  - "fontFamily arrays spread with [...array] in tailwind.config.ts to convert readonly tuple to mutable string[] required by Tailwind Config type"
  - "Numeric spacing and radius values converted to px string values in tailwind.config.ts (tokens store numbers for React Native StyleSheet use; Tailwind requires strings)"
  - "shadows.ts stores React Native shadow props (shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation) — not CSS box-shadow — because NativeWind v4 targets RN primitives"
  - "tokens/index.ts barrel export allows future components to import from tokens directly when needed alongside class names"

requirements-completed: [FOUN-03, FOUN-04, FOUN-05, FOUN-06, FOUN-07, FOUN-08]

duration: 18min
completed: 2026-03-15
---

# Phase 01 Plan 02: Design Token Definitions Summary

**All 6 Morph Maternity token categories defined as TypeScript constants and bridged into tailwind.config.ts — any component can use `className="bg-rose-500 font-body text-md"` and receive exact brand values**

## Performance

- **Duration:** 18 min
- **Started:** 2026-03-15T15:10:26Z
- **Completed:** 2026-03-15T15:28:00Z
- **Tasks:** 2
- **Files modified:** 8

## Accomplishments

- All 6 token files created: colors, typography, spacing, radius, shadows, grid
- tokens/index.ts barrel export established for clean imports
- tailwind.config.ts fully wired: all theme.extend entries populated from token imports
- All 5 token test suites pass: 41 tests GREEN
- TypeScript clean: 0 errors in token files and tailwind.config.ts

## Task Commits

Each task was committed atomically:

1. **Task 1: Color, typography, spacing, radius, shadow, grid token files** - `4488e58` (feat)
2. **Task 2: Radius, shadow, grid token tests + tailwind.config.ts full wiring** - `66deba5` (feat)

## Files Created/Modified

- `tokens/colors.ts` — Rose (50–950), Cream (50–950), Sage (50–950), Neutral (50–950) palettes + Status colors (success/warning/error/info + light variants) + semanticColors (primary, surface, background, text roles, border)
- `tokens/typography.ts` — fontFamily keys matching useFonts() exactly (CormorantGaramond-Regular, DMSans-Regular, DMMono-Regular etc.), type scale xs–6xl with px sizes and line heights, fontWeight 300–700
- `tokens/spacing.ts` — 4px grid: space-1=4px through space-48=192px (15 defined steps)
- `tokens/radius.ts` — none=0, xs=2, sm=4, md=8, lg=12, xl=16, 2xl=20, 3xl=24, full=9999
- `tokens/shadows.ts` — xs/sm/md/lg/xl/2xl/inner with React Native shadow props (iOS shadowColor/Offset/Opacity/Radius + Android elevation)
- `tokens/grid.ts` — sm=640px, md=768px, lg=1024px, xl=1280px breakpoints
- `tokens/index.ts` — barrel re-export of all token files
- `tailwind.config.ts` — complete token bridge with all theme.extend entries

## Decisions Made

- **readonly-to-mutable spread for fontFamily.** TypeScript `as const` produces readonly tuple types. Tailwind Config expects `string[]`. Spread with `[...fontFamily.display]` resolves the type mismatch without altering the token values.
- **Numeric tokens converted to px strings in tailwind.config.ts.** Token files store numbers (e.g., `spacing["4"] = 16`) for React Native StyleSheet compatibility. tailwind.config.ts converts to `"16px"` string format required by Tailwind's CSS output.
- **Shadow tokens use React Native props, not CSS.** NativeWind v4 on React Native applies `shadow-*` classes via platform-specific React Native shadow props. The tokens store the RN-native shape so they can be used both as StyleSheet objects and via NativeWind classes.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TypeScript readonly tuple incompatibility for fontFamily arrays**
- **Found during:** Task 2 verification (npx tsc --noEmit)
- **Issue:** `tokens/typography.ts` uses `as const` making fontFamily arrays `readonly ["CormorantGaramond-Regular"]`. Tailwind Config type expects mutable `string[]`. TypeScript error TS2322.
- **Fix:** Spread all fontFamily arrays in tailwind.config.ts: `[...fontFamily.display]` etc.
- **Files modified:** tailwind.config.ts
- **Commit:** 66deba5

**2. [Rule 1 - Bug] Fixed numeric token types incompatible with Tailwind string expectations**
- **Found during:** Task 2 verification (npx tsc --noEmit)
- **Issue:** `spacing` and `radius` tokens store `number` values. Tailwind `KeyValuePair<string, string>` type requires string values. TypeScript error TS2322.
- **Fix:** Added `tailwindSpacing` and `tailwindRadius` conversion helpers using `Object.fromEntries` + template literal `${val}px`.
- **Files modified:** tailwind.config.ts
- **Commit:** 66deba5

## Verification Results

```
npx jest tests/tokens/ --passWithNoTests
  PASS tests/tokens/colors.test.ts   (5 tests)
  PASS tests/tokens/spacing.test.ts  (17 tests)
  PASS tests/tokens/radius.test.ts   (9 tests)
  PASS tests/tokens/shadows.test.ts  (7 tests)
  PASS tests/tokens/grid.test.ts     (3 tests)
  Total: 41 tests, 5 suites, all GREEN

npx tsc --noEmit: 0 errors in token files and tailwind.config.ts
```

## Next Phase Readiness

- Token pipeline complete: `className="bg-rose-500 font-body text-md"` resolves to exact Morph Maternity brand values
- `tokens/index.ts` barrel available for any future direct token import
- Remaining Wave 0 test stubs still RED: `tests/utils/cn.test.ts` (Plan 04), `tests/exports.test.ts` (Plan 04) — expected
- Plan 03 (Storybook + fonts) can now use `className="bg-cream-50"` in the global font decorator

## Self-Check: PASSED

All created files verified on disk. Both task commits confirmed in git log.

- tokens/colors.ts: FOUND
- tokens/typography.ts: FOUND
- tokens/spacing.ts: FOUND
- tokens/radius.ts: FOUND
- tokens/shadows.ts: FOUND
- tokens/grid.ts: FOUND
- tokens/index.ts: FOUND
- tailwind.config.ts: FOUND (modified)
- 01-02-SUMMARY.md: FOUND
- Commit 4488e58: FOUND (Task 1)
- Commit 66deba5: FOUND (Task 2)

---
*Phase: 01-foundation-infrastructure*
*Completed: 2026-03-15*
