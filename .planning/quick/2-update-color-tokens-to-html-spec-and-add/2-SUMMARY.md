---
phase: quick-2
plan: 01
subsystem: design-tokens
tags: [colors, storybook, tailwind, tokens]
dependency_graph:
  requires: []
  provides: [spec-aligned-color-tokens, storybook-token-docs]
  affects: [tailwind.config.ts, tailwind.web.config.ts, src/stories/tokens/*]
tech_stack:
  added: []
  patterns: [inline-style-for-dynamic-values, named-palette-tokens]
key_files:
  created:
    - src/stories/tokens/Color.web.stories.tsx
    - src/stories/tokens/Typography.web.stories.tsx
    - src/stories/tokens/Spacing.web.stories.tsx
    - src/stories/tokens/Elevation.web.stories.tsx
    - src/stories/tokens/Border.web.stories.tsx
    - src/stories/tokens/Radius.web.stories.tsx
    - src/stories/tokens/Grid.web.stories.tsx
    - src/stories/tokens/Iconography.web.stories.tsx
  modified:
    - tokens/colors.ts
    - tailwind.config.ts
    - tailwind.web.config.ts
    - tests/tokens/colors.test.ts
decisions:
  - "CSS box-shadow derived from RN tokens: offset.width/height → x/y, shadowRadius → blur, shadowOpacity → rgba alpha. Inner shadow uses hardcoded inset 0px 2px 4px rgba(0,0,0,0.06)"
  - "All dynamic values in stories use inline style — no Tailwind dynamic class assembly per NativeWind static-scan constraint"
  - "colors.neutral retains numeric keys (spec uses 50–900 numeric); only rose/cream/sage use named keys"
metrics:
  duration: "~10 min"
  completed_date: "2026-03-15"
  tasks_completed: 3
  files_modified: 12
---

# Quick Task 2: Color Tokens HTML Spec Update + Token Stories Summary

One-liner: Named color palette (rose-blush/petal/mist/deep/dark) replacing numeric scale, with 8 Storybook design token stories covering the full token system.

## What Was Changed in tokens/colors.ts

**Old structure (numeric scale):**
- `colors.rose` — 11-step numeric scale (50–950), with `colors.rose[500]` as primary
- `colors.cream` — 11-step numeric scale (50–950)
- `colors.sage` — 11-step numeric scale (50–950)
- `colors.status` — 8 keys including `successLight`, `warningLight`, `errorLight`, `infoLight`
- `semanticColors` — keys: primary, primaryDark, surface, background, textPrimary, textSecondary, textDisabled, border, borderFocus

**New structure (HTML spec named palette):**
- `colors.rose` — 5 named keys: blush (#E8A4B0), petal (#F2C4CE), mist (#FAE8EC), deep (#C4697A), dark (#8B3A4A)
- `colors.cream` — 3 named keys: warm (#FDF5F0), soft (#F9EDE8), mid (#EFD9D0)
- `colors.sage` — 3 named keys: light (#D6E4DC), mid (#A8C5B2), deep (#6B9E7E)
- `colors.neutral` — retained 10-step numeric scale (50–900); 950 removed
- `colors.status` — 4 keys only: success (#6BAF7E), warning (#D4A254), error (#C95C5C), info (#6B8FB5)
- `semanticColors` — keys: primary, primaryHover, secondary, accent, textPrimary, textSecondary, textMuted, bgBase, bgSubtle, borderDefault, borderSubtle

## Tailwind Color Keys (tailwind.config.ts and tailwind.web.config.ts)

Both configs updated identically:

| New key | Value |
|---------|-------|
| `rose-blush` | #E8A4B0 (via `colors.rose`) |
| `rose-petal` | #F2C4CE |
| `rose-mist` | #FAE8EC |
| `rose-deep` | #C4697A |
| `rose-dark` | #8B3A4A |
| `cream-warm` | #FDF5F0 |
| `sage-light` | #D6E4DC |
| `neutral-50` ... `neutral-900` | unchanged |
| `success` | #6BAF7E |
| `warning` | #D4A254 |
| `error` | #C95C5C |
| `info` | #6B8FB5 |
| `primary` | #E8A4B0 |
| `primary-hover` | #C4697A |
| `secondary` | #FDF5F0 |
| `accent` | #A8C5B2 |
| `text-primary` | #262626 |
| `text-secondary` | #737373 |
| `text-muted` | #A8A8A8 |
| `bg-base` | #FFFFFF |
| `bg-subtle` | #FDF5F0 |
| `border-default` | #E8E8E8 |
| `border-subtle` | #F5F5F5 |

**Removed keys:** success-light, warning-light, error-light, info-light, primary-dark, surface, background

## 8 Stories Created

| Story File | Storybook Path | What it shows |
|-----------|---------------|---------------|
| Color.web.stories.tsx | Design Tokens/Color | Brand palette swatches, status colors, semantic aliases |
| Typography.web.stories.tsx | Design Tokens/Typography | Type scale rows, font families, font weights, line heights |
| Spacing.web.stories.tsx | Design Tokens/Spacing | 4px grid table with visual rose-colored bars |
| Elevation.web.stories.tsx | Design Tokens/Elevation | 7 shadow cards (CSS box-shadow) + values table |
| Border.web.stories.tsx | Design Tokens/Border | Border width scale (0–8px) + border color swatches |
| Radius.web.stories.tsx | Design Tokens/Radius | Radius swatches (none through full) + token table |
| Grid.web.stories.tsx | Design Tokens/Grid | Breakpoint table + 3 column-grid diagrams (4/8/12-col) |
| Iconography.web.stories.tsx | Design Tokens/Iconography | Icon size scale + 8 icon placeholders with Phosphor note |

## Decisions Made

**1. CSS box-shadow from RN shadow tokens**

React Native shadows don't directly map to CSS. Conversion applied:
- `shadowOffset.width` → x offset
- `shadowOffset.height` → y offset
- `shadowRadius` → blur radius
- `shadowOpacity` → rgba alpha (0–1)
- `shadowColor` hardcoded to #000000 → rgba(0,0,0,opacity)
- `inner` token: hardcoded to `inset 0px 2px 4px rgba(0,0,0,0.06)` (inset shadows cannot be computed from RN props)

**2. Inline styles for all dynamic values in stories**

All dynamic CSS values (backgroundColor, borderRadius, width, boxShadow) use React `style={{}}` inline, not Tailwind utility classes. This follows the established design system convention: NativeWind only processes statically-analyzable class names. Dynamic template literals silently produce no styles.

**3. neutral keeps numeric keys; rose/cream/sage use named keys**

The HTML spec uses named keys for rose/cream/sage (it's a brand palette, not a utility scale), but uses numeric steps for neutral (it's a standard gray scale). This matches the spec exactly.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed tailwind.web.config.ts referencing removed token keys**
- **Found during:** Task 1 TypeScript verification
- **Issue:** `tailwind.web.config.ts` still referenced `colors.status.successLight`, `semanticColors.primaryDark`, `semanticColors.surface`, `semanticColors.background` which were removed
- **Fix:** Updated `tailwind.web.config.ts` to match new token structure identically to `tailwind.config.ts`
- **Files modified:** tailwind.web.config.ts
- **Commit:** 3a89fd2

**2. [Rule 1 - Bug] Fixed colors.test.ts referencing old numeric keys**
- **Found during:** Task 1 TypeScript verification
- **Issue:** `tests/tokens/colors.test.ts` tested `colors.rose[50]`, `colors.rose[500]`, `colors.cream[50]`, `colors.sage[50]` — all numeric, none of which exist in the new named structure
- **Fix:** Rewrote tests to use the new named keys (blush, petal, mist, deep, dark; warm, soft, mid; light, mid, deep). Added a new assertion `rose.blush === "#E8A4B0"` to lock in spec value.
- **Files modified:** tests/tokens/colors.test.ts
- **Commit:** 3a89fd2

## Self-Check

### Files Exist
- tokens/colors.ts: FOUND
- tailwind.config.ts: FOUND
- tailwind.web.config.ts: FOUND
- src/stories/tokens/ (8 files): FOUND
- tests/tokens/colors.test.ts: FOUND

### TypeScript
- `npx tsc --noEmit`: PASSED (no output = no errors)

### Task 3: Checkpoint — verify Storybook Design Tokens stories

Human verified at localhost:6006 on 2026-03-15. All 8 Design Token stories confirmed rendering correctly (Color, Typography, Spacing, Elevation, Border, Radius, Grid, Iconography). No console errors reported. Checkpoint approved.

### Commits
- 3a89fd2: feat(quick-2): update color tokens to HTML spec named palette
- 7c870ea: feat(quick-2): create 8 Design Tokens Storybook stories

## Self-Check: PASSED
