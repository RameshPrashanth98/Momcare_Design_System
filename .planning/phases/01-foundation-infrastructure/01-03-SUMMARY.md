---
phase: 01-foundation-infrastructure
plan: "03"
subsystem: ui
tags: [storybook, react-native, expo, nativewind, fonts, design-tokens, storybook-v10]

requires:
  - phase: 01-01
    provides: metro.config.js with withStorybook(withNativeWind) composition order, assets/fonts/INSTRUCTIONS.md, try/catch Cormorant Garamond pattern
  - phase: 01-02
    provides: tailwind.config.ts with all token-derived class names — bg-rose-500, bg-cream-50, font-display, font-body, font-mono

provides:
  - .rnstorybook/main.ts: Storybook v10 config with story glob for src/**/*.stories.tsx
  - .rnstorybook/preview.tsx: global font decorator loading all 7 brand font keys, global.css import for NativeWind in Storybook context
  - .rnstorybook/index.tsx: StorybookUI root using start() API with require.context story discovery
  - app/storybook.tsx: Expo Router route for Storybook, activated by EXPO_PUBLIC_STORYBOOK=true
  - app/_layout.tsx: Redirect to /storybook when EXPO_PUBLIC_STORYBOOK env var is set
  - src/stories/TokenShowcase.stories.tsx: visual validation story for all Morph Maternity color palettes and three brand fonts

affects:
  - All 50 v1 components — Storybook is the design review environment for brand sign-off
  - assets/fonts/ — Cormorant Garamond .ttf files required before font decorator works fully

tech-stack:
  added: []
  patterns:
    - Storybook v10 uses start() API from @storybook/react-native — not StorybookUI direct import
    - Font decorator wraps all stories: useFonts() in global decorator ensures brand fonts render before sign-off
    - try/catch Cormorant Garamond pattern in preview.tsx — matches app/_layout.tsx pattern from Plan 01
    - EXPO_PUBLIC_STORYBOOK env var toggle: metro.config.js strips Storybook from production; _layout.tsx redirects to /storybook route
    - Static className strings in stories: no template literals, all NativeWind classes are full static strings for build-time scanning

key-files:
  created:
    - .rnstorybook/main.ts (Storybook v10 config — story glob, addon list)
    - .rnstorybook/preview.tsx (global font decorator + global.css import + NativeWind background)
    - .rnstorybook/index.tsx (StorybookUI export using start() API)
    - app/storybook.tsx (Expo Router Storybook route)
    - src/stories/TokenShowcase.stories.tsx (visual token validation — all palettes + all fonts)
  modified:
    - app/_layout.tsx (added Redirect import and EXPO_PUBLIC_STORYBOOK toggle)

key-decisions:
  - "Storybook v10 index.tsx uses start() from @storybook/react-native with require.context — not the simple view.getStorybookUI() pattern from old docs"
  - "preview.tsx uses try/catch cormorantFonts pattern (same as app/_layout.tsx) — graceful build without .ttf files present"
  - "TokenShowcase Swatch component passes full class string as color prop (e.g. 'bg-rose-500 w-12 h-12 rounded-md') — no template literal assembly needed"
  - "app/_layout.tsx redirect placed after font loading gate — ensures SplashScreen hides before redirect fires"

patterns-established:
  - "Story static class pattern: all className strings in stories are complete static strings; Swatch color prop receives full class string to avoid NativeWind scanning failures"
  - "Storybook font decorator pattern: useFonts() in global decorator with try/catch for local .ttf files — consistent with app/_layout.tsx font loading"

requirements-completed: [FOUN-04, FOUN-09, FOUN-10, FOUN-11]

duration: 15min
completed: 2026-03-15
---

# Phase 01 Plan 03: Storybook v10 On-Device Configuration Summary

**Storybook v10 configured on-device with NativeWind brand font decorator, EXPO_PUBLIC_STORYBOOK env-var toggle, and TokenShowcase story proving the full color token pipeline visually**

## Performance

- **Duration:** 15 min
- **Started:** 2026-03-15T15:23:32Z
- **Completed:** 2026-03-15T15:38:00Z
- **Tasks:** 2 automated + 1 human-verify checkpoint
- **Files modified:** 6

## Accomplishments

- `.rnstorybook/` directory created with all 3 required v10 config files
- Global font decorator wired in `preview.tsx` — all 7 brand font keys (4 Cormorant Garamond + DM Sans + DM Mono) with graceful try/catch for missing .ttf files
- `global.css` imported in `preview.tsx` ensuring NativeWind styles work in Storybook context independently of the app entry
- `app/storybook.tsx` Expo Router route created; `app/_layout.tsx` adds `Redirect` to `/storybook` when `EXPO_PUBLIC_STORYBOOK=true`
- `TokenShowcase.stories.tsx` created with rose/cream/sage palettes + status colors + typography showcase — all className strings complete static strings (no template literals)
- All 47 Jest tests continue to pass after changes

## Task Commits

Each task was committed atomically:

1. **Task 1: Storybook v10 configuration files (.rnstorybook/)** - `74e5155` (feat)
2. **Task 2: Expo Router Storybook route + TokenShowcase story** - `c0fca5b` (feat)
3. **Task 3: Human verify Storybook on-device** - checkpoint (awaiting human verification)

## Files Created/Modified

- `.rnstorybook/main.ts` — Storybook v10 config: story glob `../src/**/*.stories.?(ts|tsx)`, addon list documentation
- `.rnstorybook/preview.tsx` — global font decorator with try/catch Cormorant Garamond loading, DM Sans/Mono via expo-google-fonts, `import "../global.css"` for NativeWind
- `.rnstorybook/index.tsx` — StorybookUI root using `start()` API from `@storybook/react-native` with `require.context` story discovery
- `app/storybook.tsx` — Expo Router route importing `StorybookUI` from `../.rnstorybook`
- `app/_layout.tsx` — added `Redirect` import, `EXPO_PUBLIC_STORYBOOK` check redirects to `/storybook`
- `src/stories/TokenShowcase.stories.tsx` — visual token showcase: rose (50-900), cream (50-500), sage (50-900), status colors, Cormorant Garamond/DM Sans/DM Mono typography

## Decisions Made

- **Storybook v10 uses start() API.** The template in `@storybook/react-native@10.2.3` generates `storybook.requires.ts` via Metro plugin and the `index.ts` imports from it. To avoid needing the generated file, `index.tsx` calls `start()` directly with `require.context` for story discovery — the same pattern the Metro-generated file uses.
- **preview.tsx try/catch pattern.** Cormorant Garamond `.ttf` files may not be present at build time. The try/catch pattern (same as `app/_layout.tsx`) allows the project to build and Storybook to load even without the font files, showing a loading indicator until fonts load.
- **Static class strings in TokenShowcase.** The `Swatch` component's `color` prop receives a complete class string (e.g. `"bg-rose-500 w-12 h-12 rounded-md"`) rather than assembling via template literal. This ensures NativeWind's static analysis scanner can detect all class names at build time.
- **Redirect placed after font loading gate.** `_layout.tsx` only evaluates the `isStorybook` check after `fontsLoaded || fontError` is true — ensures SplashScreen hides correctly before the redirect fires.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Replaced template literal in Swatch component with static class string**
- **Found during:** Task 2 verification (TokenShowcase story review)
- **Issue:** Plan showed `className={`w-12 h-12 rounded-md ${color}`}` using a template literal — this causes NativeWind to fail to statically scan the `${color}` portion
- **Fix:** Changed `Swatch` to accept a full class string as `color` prop; all call sites now pass complete strings like `"bg-rose-500 w-12 h-12 rounded-md"`
- **Files modified:** `src/stories/TokenShowcase.stories.tsx`
- **Verification:** `grep -n "\`" TokenShowcase.stories.tsx` returns no matches; plan's done criteria confirms "no backtick template literals"
- **Committed in:** c0fca5b (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Fix required for correct NativeWind behavior — template literal classes would not render at runtime. All call-site class strings are now fully static and NativeWind-scannable.

## User Setup Required

**Cormorant Garamond fonts required for full visual verification.**

See `assets/fonts/INSTRUCTIONS.md`:
1. Download Cormorant Garamond from https://fonts.google.com/specimen/Cormorant+Garamond
2. Place these 4 files in `assets/fonts/`:
   - `CormorantGaramond-Regular.ttf`
   - `CormorantGaramond-Italic.ttf`
   - `CormorantGaramond-SemiBold.ttf`
   - `CormorantGaramond-Bold.ttf`
3. Then run: `EXPO_PUBLIC_STORYBOOK=true npx expo start`
4. Navigate to "Foundation / Token Showcase" and verify all palettes + serif font renders

## On-Device Verification Pending

Task 3 is a `checkpoint:human-verify` — requires user to:
1. Place Cormorant Garamond .ttf files in `assets/fonts/`
2. Run `EXPO_PUBLIC_STORYBOOK=true npx expo start`
3. Verify TokenShowcase story shows correct brand colors + all 3 fonts
4. Run `npx expo start` (no env var) and verify SmokeTest screen loads (not Storybook)

Once verified, type "approved" to complete Plan 03.

## Next Phase Readiness

- Storybook v10 configured and routing wired — ready to use as design review environment
- TokenShowcase story present — will confirm full token pipeline once fonts are placed
- `src/stories/` directory established — all future component stories go here
- Plan 04 (cn()/cva utilities) already complete per STATE.md — Phase 1 is at the final plan

## Self-Check: PASSED

All files verified on disk:
- `.rnstorybook/main.ts`: FOUND
- `.rnstorybook/preview.tsx`: FOUND
- `.rnstorybook/index.tsx`: FOUND
- `app/storybook.tsx`: FOUND
- `src/stories/TokenShowcase.stories.tsx`: FOUND
- `app/_layout.tsx`: FOUND (modified)
- Commit 74e5155: FOUND (Task 1)
- Commit c0fca5b: FOUND (Task 2)

---
*Phase: 01-foundation-infrastructure*
*Completed: 2026-03-15*
