---
phase: quick
plan: 1
subsystem: storybook-web
tags: [storybook, vite, tailwind, web, design-tokens]
dependency_graph:
  requires: [tokens/colors.ts, tokens/typography.ts, tailwindcss@^3.4.17]
  provides: [web-storybook-ui, design-token-showcase, static-storybook-build]
  affects: [src/stories/]
tech_stack:
  added:
    - "@storybook/react-vite@8.6.18"
    - "@storybook/react@8.6.18"
    - "@storybook/addon-essentials@8.6.14"
    - "@storybook/addon-a11y@8.6.18"
    - "vite@6.4.1"
    - "@vitejs/plugin-react@6.0.1"
    - "autoprefixer@10.4.27"
    - "postcss@8.5.8"
  patterns:
    - "*.web.stories.tsx convention for web-only stories (excludes RN stories from Vite)"
    - "tailwind.web.config.ts separate from tailwind.config.ts (no nativewind preset)"
    - "postcss.config.js points at tailwind.web.config.ts for PostCSS processing"
key_files:
  created:
    - ".storybook/main.ts"
    - ".storybook/preview.ts"
    - ".storybook/tailwind.css"
    - "tailwind.web.config.ts"
    - "postcss.config.js"
    - "src/stories/Welcome.web.stories.tsx"
  modified:
    - "package.json (added storybook:web + build-storybook:web scripts)"
decisions:
  - "*.web.stories.tsx glob used in main.ts to prevent React Native stories from being processed by Vite (Flow types cause parse errors)"
  - "vite pinned to ^6 — @storybook/builder-vite@8 supports Vite 4-6 only; Vite 8 uses rolldown which crashes on this codebase"
  - "@storybook/react pinned to @8 explicitly — npm resolved v10 by default which has incompatible entry-preview.mjs exports"
metrics:
  duration: "8 min"
  completed_date: "2026-03-15"
  tasks_completed: 3
  files_created: 6
  files_modified: 1
---

# Quick Task 1: Set Up Storybook 8 for This Project — Summary

**One-liner:** Storybook 8 web UI with react-vite framework, Tailwind v3 PostCSS integration, and a token showcase story displaying the full Morph Maternity color palette and typography scale.

## What Was Built

### Task 1: Install Storybook 8 web packages and configure .storybook/

**Packages installed (all devDependencies):**

| Package | Version | Purpose |
|---------|---------|---------|
| @storybook/react-vite | 8.6.18 | Storybook framework for React + Vite |
| @storybook/react | 8.6.18 | React renderer (explicit pin to v8) |
| @storybook/addon-essentials | 8.6.14 | Controls, actions, docs addons |
| @storybook/addon-a11y | 8.6.18 | Accessibility audit addon |
| vite | 6.4.1 | Build tool (pinned to v6, not v8) |
| @vitejs/plugin-react | 6.0.1 | React JSX transform for Vite |
| autoprefixer | 10.4.27 | CSS vendor prefixes (PostCSS plugin) |
| postcss | 8.5.8 | CSS processing pipeline |

**Files created:**

- `.storybook/main.ts` — Storybook config: react-vite framework, essentials + a11y addons, `*.web.stories.tsx` glob
- `.storybook/preview.ts` — Global parameters (controls matchers, a11y config), design token globals
- `.storybook/tailwind.css` — PostCSS entry (`@tailwind base/components/utilities`)
- `tailwind.web.config.ts` — Web-only Tailwind config (no nativewind preset) using brand tokens
- `postcss.config.js` — PostCSS config pointing at `tailwind.web.config.ts`

**Scripts added to package.json:**

```json
"storybook:web": "storybook dev -p 6006 --config-dir .storybook",
"build-storybook:web": "storybook build --config-dir .storybook --output-dir storybook-static"
```

**Commit:** `9cf654b`

### Task 2: Create Welcome story and verify build

**File created:** `src/stories/Welcome.web.stories.tsx`

- Color palette grid for all 4 brand palettes (rose, cream, sage, neutral) with step labels and hex values
- Status color row (success, warning, error, info + light variants)
- Semantic aliases row (primary, primaryDark, surface, background, etc.)
- Typography scale (xs=10px through 6xl=60px) rendered at actual pixel sizes
- Font families list with all 7 family names
- Story title: "Design System/Welcome", story name: "ColorAndTypography"
- Pure React (no React Native imports) — safe for Vite processing

**Build result:** `npm run build-storybook:web` exits 0 — `storybook-static/` produced (27 chunks, ~8s build time)

**Commit:** `f25038f`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed wrong story file name for web-only glob**

- **Found during:** Task 2 build attempt
- **Issue:** Original plan named the file `Welcome.stories.tsx` and used glob `**/*.stories.@(ts|tsx)`. This caused Vite to pick up `TokenShowcase.stories.tsx` (which imports `react-native`), triggering "Flow is not supported" parse error from rolldown.
- **Fix:** Renamed file to `Welcome.web.stories.tsx` and updated glob in `main.ts` to `**/*.web.stories.@(ts|tsx)`. Establishes a clear `*.web.stories.tsx` convention for web-only stories.
- **Files modified:** `.storybook/main.ts`, `src/stories/Welcome.web.stories.tsx` (renamed from `Welcome.stories.tsx`)
- **Commits:** `f25038f`

**2. [Rule 3 - Blocking] Pinned @storybook/react to v8 explicitly**

- **Found during:** Task 1 verification (first build attempt)
- **Issue:** npm resolved `@storybook/react@10.2.19` (latest) instead of v8, causing `entry-preview.mjs` not exported under correct conditions error.
- **Fix:** Ran `npm install --save-dev @storybook/react@8` to explicitly pin to v8 matching core storybook.
- **Files modified:** `package.json`, `package-lock.json`

**3. [Rule 3 - Blocking] Downgraded vite from v8 to v6**

- **Found during:** Task 2 first build attempt
- **Issue:** npm resolved `vite@8.0.0` (newly released) which uses rolldown (Rust bundler). `@storybook/builder-vite@8` only supports Vite `^4 || ^5 || ^6` per peerDependencies. Rolldown crashed with memory allocation failure after 89 modules.
- **Fix:** Ran `npm install --save-dev vite@6` to pin to Vite 6.x (6.4.1 installed).
- **Files modified:** `package.json`, `package-lock.json`

## Verification

- `npm run build-storybook:web` exits 0 — confirmed
- `.storybook/main.ts` references `@storybook/react-vite` framework — confirmed
- `tailwind.web.config.ts` exists and does NOT import `nativewind/preset` — confirmed
- `postcss.config.js` points at `tailwind.web.config.ts` — confirmed
- `src/stories/Welcome.web.stories.tsx` imports from `../../tokens/colors` and `../../tokens/typography` — confirmed
- `.rnstorybook/` is unchanged — confirmed (no files in .rnstorybook/ were touched)

### Task 3: Human verification of web Storybook UI

**Verified by user on 2026-03-15:** Web Storybook UI loads correctly at localhost:6006.

- Color swatches render with correct background colors
- Typography scale rows display increasing font sizes
- Accessibility tab shows a11y audit
- Controls tab visible
- RN on-device Storybook (npm run storybook) unaffected

**Status: APPROVED**

## Self-Check: PASSED

| Item | Status |
|------|--------|
| .storybook/main.ts | FOUND |
| .storybook/preview.ts | FOUND |
| .storybook/tailwind.css | FOUND |
| tailwind.web.config.ts | FOUND |
| postcss.config.js | FOUND |
| src/stories/Welcome.web.stories.tsx | FOUND |
| storybook-static/ directory | FOUND |
| Commit 9cf654b | FOUND |
| Commit f25038f | FOUND |
