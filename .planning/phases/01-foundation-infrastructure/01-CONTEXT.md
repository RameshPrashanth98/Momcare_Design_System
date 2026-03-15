# Phase 1: Foundation & Infrastructure - Context

**Gathered:** 2026-03-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Scaffold the Expo + React Native + TypeScript project, wire NativeWind v4 (Babel, Metro, global.css), define all Morph Maternity design tokens in tailwind.config.ts, set up Storybook React Native v7 on-device, and verify the pipeline works end-to-end with a smoke-test component. No UI components are built in this phase — only the infrastructure that all subsequent phases build on.

</domain>

<decisions>
## Implementation Decisions

### Stack & Versions
- React Native + Expo (managed workflow) + TypeScript
- NativeWind v4 — pinned to Tailwind CSS ^3.4.x (do NOT use Tailwind v4 — incompatible with NativeWind v4)
- Storybook React Native v7 (verify if v8 is stable via `npm info @storybook/react-native version` before locking)
- Phosphor Icons (`@phosphor-icons/react-native`) — confirmed icon library

### NativeWind v4 Configuration
- Use `presets: [require('nativewind/preset')]` in tailwind.config.ts (NOT plugins array — common v4 mistake)
- `global.css` with `@tailwind` directives is required — NativeWind does nothing without it
- Three config files must all be correct together: tailwind.config.ts, babel.config.js (nativewind/babel), metro.config.js (withNativeWind wrapper)
- Smoke-test a single component with brand color class names before proceeding to any token definition work

### Storybook Setup
- On-device only for v1 (via Expo Dev Client)
- Entry point toggle: `EXPO_PUBLIC_STORYBOOK=true` env var — do NOT modify package.json main field
- Global font decorator required — loads Cormorant Garamond, DM Sans, DM Mono before any story renders; without it, all stories render in system font and design sign-off is invalid
- Web Storybook (`@storybook/react-native-web-addon`) is deferred to v2

### Design Token Source of Truth
- All token values must exactly match `morph-maternity-design-system.html` spec — no approximations
- Tokens defined in tailwind.config.ts theme extensions (not separate CSS or JS constant files)
- Token categories: colors (Rose, Cream, Sage, Neutral palettes, Status, Semantic), typography (fonts, type scale, weights, line heights), spacing (4px grid, space-1–space-48), radius (radius-none–radius-full), shadow/elevation (shadow-xs–shadow-2xl + shadow-inner), grid breakpoints

### Variant & Utility Pattern
- `cva` (class-variance-authority) installed for all variant-based components — no dynamic template literal class strings (NativeWind v4 compile-time constraint)
- `cn()` utility (clsx + tailwind-merge) established as the class merging helper
- Barrel export `src/index.ts` skeleton created in Phase 1 (populated per phase)

### Claude's Discretion
- Expo template choice and exact folder structure
- Whether to use Expo Router or React Navigation (not yet determined — Claude should pick the appropriate one for a design system / Storybook setup)
- Exact Expo SDK version (verify current stable SDK with npm info)
- Font loading mechanism: `expo-font` with app config or `useFonts` hook — Claude picks the pattern that works cleanly with Storybook decorator

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project, starting from scratch

### Established Patterns
- None yet — Phase 1 establishes all patterns

### Integration Points
- `morph-maternity-design-system.html` is the token spec source — reference it directly when defining tailwind.config.ts values
- All token values in the HTML `:root` CSS variables are the canonical values to match

</code_context>

<specifics>
## Specific Requirements

- Token values must exactly match the HTML spec — copy values directly, do not approximate
- NativeWind v4 Metro config spike must be the very first task — nothing else proceeds until a component renders on-device with brand colors via className
- Cormorant Garamond availability via `@expo-google-fonts` must be verified; fallback is manual `.ttf` in `/assets/fonts/`
- Storybook global font decorator is non-negotiable — brand sign-off requires correct font rendering in stories

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation-infrastructure*
*Context gathered: 2026-03-15*
