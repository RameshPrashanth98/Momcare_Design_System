# Phase 2: Core Primitives - Context

**Gathered:** 2026-03-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Build three atomic components — `Text`, `Badge`, and `Icon` — that all subsequent phases (Forms, Actions, Data Display, Layout) compose from. No business logic, no state management, no compound patterns. Pure presentational primitives driven entirely by design tokens.

</domain>

<decisions>
## Implementation Decisions

### Text Component
- Single `variant` prop fully determines font-family + size + weight — no separate `size` prop
- Variant → visual mapping (Claude's discretion to define exact values from spec):
  - `display` → Cormorant Garamond, 4xl–6xl, weight 300 (editorial headers)
  - `heading` → DM Sans, 2xl–3xl, weight 600 (section headings)
  - `body` → DM Sans, base–md, weight 400 (default reading text)
  - `label` → DM Sans, sm–base, weight 500 (form labels, UI labels)
  - `caption` → DM Sans, xs–sm, weight 400 (secondary/helper text)
  - `mono` → DM Mono, sm–base, weight 400 (code, data values)
- Additional props exposed: `color` (token key only, not raw hex), `align`, `numberOfLines`
- `color` defaults per variant — Claude's discretion (text-primary for body/heading, text-secondary for caption)
- `className` prop accepted for one-off overrides via `cn()`

### Badge Component
- Visual style: filled pill (rounded-full, colored background + white/dark text label)
- Label: developer passes custom `label` string prop (not preset "Success"/"Warning" text)
- No leading dot — color + label text is sufficient for accessibility
- No size variants in v1 — single size (md), consistent with spec
- Variants: success, warning, error, info, neutral — map to spec status colors
  - success: bg #6BAF7E, dark text
  - warning: bg #D4A254, dark text
  - error: bg #C95C5C, white text
  - info: bg #6B8FB5, white text
  - neutral: bg neutral-200, dark text

### Icon Component
- Wraps `phosphor-react-native` (already in dependencies as Phosphor Icons)
- `size` prop: sm (16px) | md (20px) | lg (24px) | xl (32px) | 2xl (48px) — default md
- `color` prop: accepts Tailwind color class string (e.g. "text-rose-blush") or defaults to current text color via `currentColor`
- `weight` prop: regular | bold | fill | duotone — default `regular`
- No raw pixel values at call sites — size must be a token key

### Storybook Stories
- All stories use `*.web.stories.tsx` naming convention (established in Quick-1)
- One story file per component, grouped under "Primitives" in sidebar
- Full Storybook controls for every prop
- Accessibility: document `accessibilityRole` and `accessibilityLabel` usage per component

### Claude's Discretion
- Exact cva variant definitions (font sizes, line heights, letter spacing per variant)
- Which Tailwind color classes map to which Badge variant backgrounds
- How `color` prop on Text resolves to a Tailwind class

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/utils/cn.ts` — cn() combining clsx + tailwind-merge; use for ALL className construction
- `tokens/colors.ts` — named palette (rose.blush/petal/mist/deep/dark, cream, sage, neutral, status, semantic)
- `tokens/typography.ts` — fontFamily (display/body/mono), fontSize, fontWeight, lineHeight
- `tokens/spacing.ts` — 4px base grid, space-1 through space-48
- `src/index.ts` — barrel export, Phase 2 section: `export * from "./components/primitives"` (commented, ready to uncomment)
- `docs/conventions/cva-pattern.md` — ENFORCED variant coding convention for all components

### Established Patterns
- **cva() for variants:** All variant logic goes through `cva()` — no ternaries in className strings, no dynamic template literals
- **cn() for merging:** `cn(variantClasses, className)` at the end of every component for override support
- **NativeWind static scan:** All Tailwind classes must be string literals in source — no computed class names
- **Token-only values:** No raw hex/px at component call sites — all visual values come from Tailwind token classes

### Integration Points
- `src/components/primitives/` — new directory (create it); barrel at `src/components/primitives/index.ts`
- `src/index.ts` line 16 — uncomment `export * from "./components/primitives"` after building
- `.rnstorybook/` — add stories here for on-device Storybook (use `*.stories.tsx`, NOT `*.web.stories.tsx`)
- `src/stories/tokens/` — existing token stories for reference on color names to use in stories

</code_context>

<specifics>
## Specific Ideas

- Design spec HTML (`morph-maternity-design-system.html`) is the visual reference — color names like `rose-blush`, `rose-deep`, `cream-warm`, `sage-mid` are now live in Tailwind config
- The spec's primary brand color is `#E8A4B0` (rose-blush) — NOT the vibrant red-rose that was in Phase 1's original tokens
- Phosphor Icons is confirmed (installed as `phosphor-react-native` in dependencies)
- Cormorant Garamond font requires manual `.ttf` file placement in `assets/fonts/` before display variant will render correctly — plan should note this dependency

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-core-primitives*
*Context gathered: 2026-03-15*
