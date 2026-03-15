---
phase: quick-2
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - tokens/colors.ts
  - tailwind.config.ts
  - src/stories/tokens/Color.web.stories.tsx
  - src/stories/tokens/Typography.web.stories.tsx
  - src/stories/tokens/Spacing.web.stories.tsx
  - src/stories/tokens/Elevation.web.stories.tsx
  - src/stories/tokens/Border.web.stories.tsx
  - src/stories/tokens/Radius.web.stories.tsx
  - src/stories/tokens/Grid.web.stories.tsx
  - src/stories/tokens/Iconography.web.stories.tsx
  - src/stories/Welcome.web.stories.tsx
autonomous: true
requirements: []

must_haves:
  truths:
    - "tokens/colors.ts uses the spec's named palette (rose-blush, rose-petal, rose-mist, rose-deep, rose-dark) — the old numeric scale is gone"
    - "tailwind.config.ts color keys match the new token names exactly — no broken references"
    - "Storybook sidebar shows Design Tokens/Color, Typography, Spacing, Elevation, Grid, Border, Radius, Iconography stories"
    - "Color story renders color swatches with hex values matching the HTML spec"
    - "All stories render without runtime errors at localhost:6006"
  artifacts:
    - path: "tokens/colors.ts"
      provides: "Spec-aligned color tokens with named palette"
      contains: "rose-blush"
    - path: "tailwind.config.ts"
      provides: "Tailwind color bridge updated to new token names"
    - path: "src/stories/tokens/Color.web.stories.tsx"
      provides: "Color token Storybook story"
    - path: "src/stories/tokens/Typography.web.stories.tsx"
      provides: "Typography token Storybook story"
    - path: "src/stories/tokens/Spacing.web.stories.tsx"
      provides: "Spacing token Storybook story"
    - path: "src/stories/tokens/Elevation.web.stories.tsx"
      provides: "Elevation/shadow token Storybook story"
    - path: "src/stories/tokens/Border.web.stories.tsx"
      provides: "Border token Storybook story"
    - path: "src/stories/tokens/Radius.web.stories.tsx"
      provides: "Radius token Storybook story"
    - path: "src/stories/tokens/Grid.web.stories.tsx"
      provides: "Grid/breakpoint token Storybook story"
    - path: "src/stories/tokens/Iconography.web.stories.tsx"
      provides: "Iconography token Storybook story"
  key_links:
    - from: "tokens/colors.ts"
      to: "tailwind.config.ts"
      via: "named imports colors, semanticColors"
      pattern: "import.*colors.*semanticColors.*from.*tokens/colors"
    - from: "tokens/colors.ts"
      to: "src/stories/tokens/Color.web.stories.tsx"
      via: "named import colors, semanticColors"
      pattern: "import.*colors.*from.*tokens/colors"
---

<objective>
Replace the old numeric rose/cream/sage color scale with the HTML spec's named palette, update Tailwind to match, and create comprehensive Storybook token documentation stories for all 8 token categories.

Purpose: The HTML spec is the source of truth. Current tokens/colors.ts uses generic numeric scales that don't match the spec's brand names. Storybook currently has only a Welcome story — this brings full design token documentation inline with the spec's visual structure.
Output: Updated tokens/colors.ts, updated tailwind.config.ts, and 8 new token story files under src/stories/tokens/.
</objective>

<execution_context>
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md

@tokens/colors.ts
@tokens/typography.ts
@tokens/spacing.ts
@tokens/radius.ts
@tokens/shadows.ts
@tokens/grid.ts
@tailwind.config.ts
@src/stories/Welcome.web.stories.tsx
@.storybook/main.ts

<interfaces>
<!-- Current token exports — executor works against these. -->

From tokens/colors.ts (BEFORE update — current shape):
```typescript
export const colors = {
  rose: { 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 }
  cream: { 50..950 }
  sage: { 50..950 }
  neutral: { 50..950 }
  status: { success, successLight, warning, warningLight, error, errorLight, info, infoLight }
} as const;

export const semanticColors = {
  primary, primaryDark, surface, background, textPrimary, textSecondary, textDisabled, border, borderFocus
} as const;
```

From tailwind.config.ts (imports that will need updating):
```typescript
import { colors, semanticColors } from "./tokens/colors";
// colors.rose → currently a numeric map; after update becomes named map
// colors.status → currently has successLight etc; after update uses new names
// semanticColors → currently uses old rose[500]; after update uses new names
```

From tokens/shadows.ts:
```typescript
export const shadows = { xs, sm, md, lg, xl, "2xl", inner } as const;
// Each entry: { shadowColor, shadowOffset, shadowRadius, shadowOpacity, elevation }
```

From tokens/grid.ts:
```typescript
export const breakpoints = { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" } as const;
```

From src/stories/Welcome.web.stories.tsx:
```typescript
// Pattern to follow for all new stories:
const meta: Meta<typeof Component> = {
  title: "Design Tokens/Category",   // <-- sidebar grouping
  component: Component,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof Component>;
export const Default: Story = {};
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update color tokens to HTML spec named palette</name>
  <files>tokens/colors.ts, tailwind.config.ts</files>
  <action>
Rewrite tokens/colors.ts to match the HTML spec exactly. Replace the entire file with the spec's named palette structure:

```typescript
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
```

Note: The old numeric rose/cream/sage scales and the old semanticColors keys (primaryDark, surface, background, textDisabled, border, borderFocus) are REMOVED. The neutral scale keeps numeric keys because the spec keeps them numeric. The status object drops the *Light variants — the spec has no light variants.

After updating tokens/colors.ts, update tailwind.config.ts color section to reference the new structure:

```typescript
colors: {
  // Brand palettes — now use named keys
  rose:    colors.rose,     // rose-blush, rose-petal, rose-mist, rose-deep, rose-dark
  cream:   colors.cream,    // cream-warm, cream-soft, cream-mid
  sage:    colors.sage,     // sage-light, sage-mid, sage-deep
  neutral: colors.neutral,  // neutral-50 through neutral-900
  // Status (flat, no object nesting needed)
  success: colors.status.success,
  warning: colors.status.warning,
  error:   colors.status.error,
  info:    colors.status.info,
  // Semantic aliases (flat Tailwind keys)
  primary:          semanticColors.primary,
  "primary-hover":  semanticColors.primaryHover,
  secondary:        semanticColors.secondary,
  accent:           semanticColors.accent,
  "text-primary":   semanticColors.textPrimary,
  "text-secondary": semanticColors.textSecondary,
  "text-muted":     semanticColors.textMuted,
  "bg-base":        semanticColors.bgBase,
  "bg-subtle":      semanticColors.bgSubtle,
  "border-default": semanticColors.borderDefault,
  "border-subtle":  semanticColors.borderSubtle,
},
```

Remove the old keys (success-light, warning-light, error-light, info-light, primary-dark, surface, background) from the Tailwind colors block — they no longer exist in the token file.

Also update Welcome.web.stories.tsx to reflect the new color structure: replace PaletteRow calls (which used numeric keys) with new palette names. The rose palette no longer has numeric keys — update the imports and rendering to use colors.rose which now has named keys (blush, petal, mist, deep, dark). Remove references to colors.status.successLight etc. Keep the story working with the new token shape.
  </action>
  <verify>
    <automated>cd "D:/1.Product Development with AI/1.1 project/1.MOH Clinic app/Momcare_Code/my-design-system" && npx tsc --noEmit 2>&1 | head -30</automated>
  </verify>
  <done>TypeScript compiles with no errors. tokens/colors.ts exports colors.rose.blush = "#E8A4B0". tailwind.config.ts references only keys that exist in the new token structure.</done>
</task>

<task type="auto">
  <name>Task 2: Create token Storybook stories (all 8 categories)</name>
  <files>
    src/stories/tokens/Color.web.stories.tsx,
    src/stories/tokens/Typography.web.stories.tsx,
    src/stories/tokens/Spacing.web.stories.tsx,
    src/stories/tokens/Elevation.web.stories.tsx,
    src/stories/tokens/Border.web.stories.tsx,
    src/stories/tokens/Radius.web.stories.tsx,
    src/stories/tokens/Grid.web.stories.tsx,
    src/stories/tokens/Iconography.web.stories.tsx
  </files>
  <action>
Create the directory src/stories/tokens/ and write one story file per category. All files follow the *.web.stories.tsx convention (required by .storybook/main.ts glob). Storybook title uses "Design Tokens/Category" for sidebar grouping. All stories use `parameters: { layout: "fullscreen" }` and a shared page wrapper `<div className="p-8 max-w-5xl mx-auto font-sans bg-white min-h-screen">`.

---

**src/stories/tokens/Color.web.stories.tsx**

Import `colors, semanticColors` from `../../tokens/colors`. Render three sections:

1. "Brand Palette" — render each sub-palette as a labeled row. For each palette (rose, cream, sage), render a `<PaletteSection>` with the palette name and its named swatches. For neutral, render the numeric scale (50–900).
2. "Status Colors" — render 4 swatches: success, warning, error, info.
3. "Semantic Aliases" — render all semanticColors keys as swatches.

Each swatch: colored square (64x64px), name below in font-mono text-xs, hex value below in text-neutral-400 font-mono text-xs. Use inline `style={{ backgroundColor: hex }}` — not Tailwind bg-* classes (colors not registered as Tailwind safeList).

---

**src/stories/tokens/Typography.web.stories.tsx**

Import `fontSize, fontFamily, fontWeight, lineHeight` from `../../tokens/typography`.

Render four sections:
1. "Type Scale" — for each fontSize entry (xs through 6xl): one row showing `step | sample text styled at that size | {size}px / {lineHeight}px`. Sample text: "The quick brown fox — Morph Maternity".
2. "Font Families" — for each fontFamily entry: key name + the string value. Add a note: "Font files must be placed in assets/fonts/ — see assets/fonts/INSTRUCTIONS.md."
3. "Font Weights" — for each fontWeight entry: key name + weight value + sample text "Aa Bb Cc" rendered at that CSS font-weight.
4. "Line Heights" — for each lineHeight entry: key + ratio value + visual bar.

---

**src/stories/tokens/Spacing.web.stories.tsx**

Import `spacing` from `../../tokens/spacing`.

Render a table with columns: Token | Value (px) | Visual bar. For each spacing entry, render:
- Token name: `space-{key}` in font-mono
- Value: `{val}px`
- Visual bar: `<div style={{ width: val, height: 16 }} className="bg-rose-blush rounded-sm">` — use inline style for width since values are dynamic. Use a fixed rose-colored bar (inline `backgroundColor: "#E8A4B0"`).

---

**src/stories/tokens/Elevation.web.stories.tsx**

Import `shadows` from `../../tokens/shadows`.

Render one card per shadow level (xs, sm, md, lg, xl, 2xl, inner). Each card: white 120x80 rounded-lg box with CSS box-shadow applied via inline style. Translate the React Native shadow tokens to CSS:

```
shadowColor + shadowOpacity → rgba
shadowOffset.width → X offset
shadowOffset.height → Y offset
shadowRadius → blur radius
```

For each shadow entry, compute:
```
boxShadow: `${offset.width}px ${offset.height}px ${radius}px rgba(0,0,0,${opacity})`
```
For `inner`: use `inset 0px 2px 4px rgba(0,0,0,0.06)`.

Show label below each card: token name + elevation value.

---

**src/stories/tokens/Border.web.stories.tsx**

Render a section showing the border width scale: 0, 1px, 2px, 4px, 8px. These are not imported from a token file — declare them inline as a const array:
```typescript
const borderWidths = [
  { name: "border-0",  value: "0px"  },
  { name: "border-1",  value: "1px"  },
  { name: "border-2",  value: "2px"  },
  { name: "border-4",  value: "4px"  },
  { name: "border-8",  value: "8px"  },
];
```

For each: render a horizontal line with that border-top width in `border-neutral-500`, with token name and value as label.

Also show border color tokens (use semanticColors.borderDefault and borderSubtle): two swatches labeled "border-default" and "border-subtle".

---

**src/stories/tokens/Radius.web.stories.tsx**

Import `radius` from `../../tokens/radius`. For each radius token (none, xs, sm, md, lg, xl, 2xl, 3xl, full): render a 64x64 rose-mist square (`backgroundColor: "#FAE8EC"`) with inline `borderRadius: val === 9999 ? "50%" : val`. Show token name and px value below.

---

**src/stories/tokens/Grid.web.stories.tsx**

Import `breakpoints` from `../../tokens/grid`. Render two sections:

1. "Breakpoints" — table of breakpoints (sm/md/lg/xl) with their values and description (tablet 8-col at 768px, desktop 12-col at 1280px etc).
2. "Grid Structure" — three visual diagrams showing:
   - Mobile: 4-column grid at 360px, 16px gutter (render 4 equal-width divs with gap)
   - Tablet: 8-column grid at 768px, 24px gutter (render 8 equal-width divs with gap)
   - Desktop: 12-column grid at 1280px, 32px gutter (render 12 equal-width divs with gap)

Each column div: height 48px, `backgroundColor: "#FAE8EC"` (rose-mist), with `borderRadius: 4` inline, label with column number.

---

**src/stories/tokens/Iconography.web.stories.tsx**

No external import needed. Render two sections:

1. "Icon Sizes" — table showing the 5 icon size tokens:
   - sm: 16px, md: 20px, lg: 24px, xl: 32px, 2xl: 48px
   For each size: render a Phosphor icon placeholder using a simple SVG circle as proxy, labeled with size token name and px value.

2. "Icon Examples (Phosphor Icons)" — a grid of common icons used in the app. Since phosphor-react may not be installed yet, render these as Unicode/emoji placeholders with a note: "Actual icons use `phosphor-react` — install with `npm install phosphor-react`. Token sizes: sm=16px, md=20px (default UI), lg=24px (nav), xl=32px (hero), 2xl=48px (illustration)."

   Show a grid of icon name + emoji proxy + recommended usage:
   - Heart → "favorite / save"
   - House → "home navigation"
   - Calendar → "appointment booking"
   - Bell → "notifications"
   - User → "profile"
   - Gear → "settings"
   - Pill → "medication"
   - Hospital → "clinic/provider"

   Render each as a card: emoji at md size (24px), name in font-mono text-xs below, usage in text-neutral-500 text-xs below.

---

All 8 stories: no default export required beyond the meta/story pattern. No dependencies on phosphor-react (Iconography story uses emoji proxies). No Tailwind dynamic class assembly — use inline styles for all dynamic values (backgroundColor, borderRadius, width, boxShadow). Static Tailwind classes only for layout (p-8, flex, gap-3 etc).
  </action>
  <verify>
    <automated>cd "D:/1.Product Development with AI/1.1 project/1.MOH Clinic app/Momcare_Code/my-design-system" && npx tsc --noEmit 2>&1 | head -30</automated>
  </verify>
  <done>All 8 story files exist in src/stories/tokens/. TypeScript compiles clean. Running `npm run storybook` shows "Design Tokens" group in sidebar with 8 sub-stories. Each story renders without console errors.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
    Updated color tokens (named palette replacing numeric scale), updated tailwind.config.ts, and 8 new token documentation stories in Storybook.
  </what-built>
  <how-to-verify>
    1. Run `npm run storybook` (or verify it is still running at localhost:6006)
    2. In the Storybook sidebar, confirm "Design Tokens" group appears with 8 stories: Color, Typography, Spacing, Elevation, Border, Radius, Grid, Iconography
    3. Open "Design Tokens/Color" — confirm rose swatches show: blush #E8A4B0, petal #F2C4CE, mist #FAE8EC, deep #C4697A, dark #8B3A4A
    4. Open "Design Tokens/Elevation" — confirm 7 shadow cards render with visible drop shadows (xs = barely visible, 2xl = heavy shadow)
    5. Open "Design Tokens/Grid" — confirm 3 grid diagrams render (4-col, 8-col, 12-col)
    6. Open "Design System/Welcome" — confirm it still renders without errors (it was updated to use new color token names)
    7. Check browser console — no red errors in any story
  </how-to-verify>
  <resume-signal>Type "approved" if all stories look correct, or describe any rendering issues.</resume-signal>
</task>

</tasks>

<verification>
- `npx tsc --noEmit` passes with no errors after token and config changes
- `src/stories/tokens/` directory contains exactly 8 *.web.stories.tsx files
- tokens/colors.ts: `colors.rose.blush === "#E8A4B0"` — old `colors.rose[500]` key is gone
- tailwind.config.ts: no references to removed token keys (rose[500], cream[50], successLight etc)
- Welcome.web.stories.tsx renders without type errors under new color structure
</verification>

<success_criteria>
- tokens/colors.ts exports the spec's named palette (rose-blush, rose-petal, etc.) — numeric scale removed
- tailwind.config.ts uses `colors.rose.blush` style references — all old numeric refs removed
- Storybook shows Design Tokens group with 8 stories, each rendering correct token values
- No TypeScript errors, no console errors in any story
</success_criteria>

<output>
After completion, create `.planning/quick/2-update-color-tokens-to-html-spec-and-add/2-SUMMARY.md` with:
- What was changed in tokens/colors.ts (old vs new structure summary)
- What tailwind.config.ts color keys now look like
- List of 8 stories created with their Storybook title paths
- Any decisions made during execution (e.g. how CSS box-shadow was derived from RN shadow tokens)
</output>
