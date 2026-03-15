---
phase: quick
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - .storybook/main.ts
  - .storybook/preview.ts
  - .storybook/tailwind.css
  - src/stories/Welcome.stories.tsx
  - tailwind.web.config.ts
  - package.json
autonomous: true
requirements: []
must_haves:
  truths:
    - "Running `npm run storybook:web` starts Storybook 8 web UI on localhost:6006"
    - "The Welcome story renders a color palette grid and typography scale using real token values"
    - "Tailwind utility classes apply correctly in Storybook web (background colors visible on swatches)"
    - "`npm run build-storybook:web` completes without errors and produces storybook-static/"
  artifacts:
    - path: ".storybook/main.ts"
      provides: "Storybook 8 web config — framework, stories glob, addons"
    - path: ".storybook/preview.ts"
      provides: "Global decorators, imports tailwind.css, imports design tokens"
    - path: ".storybook/tailwind.css"
      provides: "PostCSS/Tailwind entry that web Storybook injects"
    - path: "tailwind.web.config.ts"
      provides: "Tailwind config for web Storybook (no nativewind preset, content points to src/stories + .storybook)"
    - path: "src/stories/Welcome.stories.tsx"
      provides: "Color palette + typography scale showcase story"
  key_links:
    - from: ".storybook/preview.ts"
      to: ".storybook/tailwind.css"
      via: "import '../.storybook/tailwind.css'"
      pattern: "import.*tailwind\\.css"
    - from: "tailwind.web.config.ts"
      to: "tokens/colors.ts, tokens/typography.ts"
      via: "import { colors, semanticColors } from './tokens/colors'"
      pattern: "from.*tokens/"
---

<objective>
Set up Storybook 8 web (storybook-react-vite) alongside the existing on-device @storybook/react-native setup.
The web Storybook serves as a browser-based design system documentation hub — it renders token showcase pages
using regular React + Tailwind CSS (PostCSS), completely separate from the RN Storybook in .rnstorybook/.

Purpose: Provide a web UI to visualize Morph Maternity design tokens (colors, typography) and host a11y/controls
         addons for future component documentation.
Output: .storybook/ config dir, tailwind.web.config.ts, src/stories/Welcome.stories.tsx, two new npm scripts.
</objective>

<execution_context>
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@tokens/colors.ts
@tokens/typography.ts
@tailwind.config.ts

Key constraints from STATE.md:
- tailwindcss is pinned to ^3.4.17 — do NOT upgrade to Tailwind v4 (NativeWind v4 incompatible)
- `storybook` 8.6.0 is already in dependencies — do not add it again
- The existing .rnstorybook/ directory must not be touched — it handles on-device RN stories
- The web Storybook config lives in .storybook/ (separate from .rnstorybook/)
- The tailwind.web.config.ts must NOT use `presets: [require("nativewind/preset")]` — nativewind is RN-only
- Do NOT add @storybook/react-native-server or any RN Storybook packages — this is strictly web

<interfaces>
<!-- Token exports available for Welcome story and web tailwind config -->

From tokens/colors.ts:
```typescript
export const colors = {
  rose:    { 50..950: string },   // "#FFF0F3" .. "#47051C"
  cream:   { 50..950: string },
  sage:    { 50..950: string },
  neutral: { 50..950: string },
  status:  { success, successLight, warning, warningLight, error, errorLight, info, infoLight: string },
} as const;

export const semanticColors = {
  primary, primaryDark, surface, background,
  textPrimary, textSecondary, textDisabled,
  border, borderFocus: string,
} as const;
```

From tokens/typography.ts:
```typescript
export const fontFamily = {
  display, displayItalic, displaySemiBold, displayBold,  // CormorantGaramond-*
  body, bodyMedium,                                       // DMSans-*
  mono,                                                   // DMMono-Regular
} as const; // each value is readonly string[]

export const fontSize = {
  xs, sm, base, md, lg, xl, "2xl", "3xl", "4xl", "5xl", "6xl":
    { size: number, lineHeight: number }
} as const;
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Install Storybook 8 web packages and configure .storybook/</name>
  <files>
    package.json
    .storybook/main.ts
    .storybook/preview.ts
    .storybook/tailwind.css
    tailwind.web.config.ts
  </files>
  <action>
**1. Install packages** (run in project root):

```bash
npm install --save-dev @storybook/react-vite @storybook/addon-a11y @storybook/addon-essentials @vitejs/plugin-react vite autoprefixer postcss
```

Note: `storybook` 8.6.0 is already in dependencies. `@storybook/addon-essentials` bundles controls/actions/docs. Install `@vitejs/plugin-react` and `vite` as devDependencies — Storybook react-vite requires them.

**2. Create `tailwind.web.config.ts`** — separate Tailwind config for web Storybook, no nativewind preset:

```typescript
import type { Config } from "tailwindcss";
import { colors, semanticColors } from "./tokens/colors";
import { fontFamily, fontSize, fontWeight } from "./tokens/typography";

const tailwindFontSize = Object.fromEntries(
  Object.entries(fontSize).map(([key, val]) => [
    key,
    [`${val.size}px`, { lineHeight: `${val.lineHeight}px` }] as [string, { lineHeight: string }],
  ])
);

const tailwindFontWeight: Record<string, string> = { ...fontWeight };

const config: Config = {
  content: [
    "./src/stories/**/*.{js,jsx,ts,tsx}",
    "./.storybook/**/*.{js,jsx,ts,tsx}",
  ],
  // NO nativewind preset — this is web-only
  theme: {
    extend: {
      colors: {
        rose:    colors.rose,
        cream:   colors.cream,
        sage:    colors.sage,
        neutral: colors.neutral,
        success:         colors.status.success,
        "success-light": colors.status.successLight,
        warning:         colors.status.warning,
        "warning-light": colors.status.warningLight,
        error:           colors.status.error,
        "error-light":   colors.status.errorLight,
        info:            colors.status.info,
        "info-light":    colors.status.infoLight,
        primary:        semanticColors.primary,
        "primary-dark": semanticColors.primaryDark,
        surface:        semanticColors.surface,
        background:     semanticColors.background,
      },
      fontSize: tailwindFontSize,
      fontWeight: tailwindFontWeight,
    },
  },
  plugins: [],
};

export default config;
```

**3. Create `.storybook/tailwind.css`** — PostCSS entry file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**4. Create `.storybook/main.ts`**:

```typescript
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinalConfig: async (config) => config,
};

export default config;
```

Note: `viteFinalConfig` is the Storybook 8 hook name (not `viteFinal`).

**5. Create `.storybook/preview.ts`**:

```typescript
import type { Preview } from "@storybook/react";
import "../.storybook/tailwind.css";
import { colors, semanticColors } from "../tokens/colors";
import { fontSize, fontFamily } from "../tokens/typography";

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/i,
    },
  },
  a11y: {
    config: {},
  },
};

export const globals = {
  designTokens: { colors, semanticColors, fontSize, fontFamily },
};

const preview: Preview = {
  parameters,
};

export default preview;
```

**6. Add npm scripts to `package.json`** — add alongside existing scripts:

```json
"storybook:web": "storybook dev -p 6006 --config-dir .storybook",
"build-storybook:web": "storybook build --config-dir .storybook --output-dir storybook-static"
```

Also add a `postcss.config.js` at the project root so Vite can process Tailwind:

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: { config: "./tailwind.web.config.ts" },
    autoprefixer: {},
  },
};
```
  </action>
  <verify>
    <automated>cd "D:\1.Product Development with AI\1.1 project\1.MOH Clinic app\Momcare_Code\my-design-system" && node -e "require('./.storybook/main.ts')" 2>/dev/null || npx tsc --noEmit --skipLibCheck 2>&1 | head -20</automated>
  </verify>
  <done>
    - .storybook/main.ts, preview.ts, tailwind.css created
    - tailwind.web.config.ts created (no nativewind preset)
    - postcss.config.js created pointing at tailwind.web.config.ts
    - package.json has storybook:web and build-storybook:web scripts
    - All required packages installed (no peer dep errors)
  </done>
</task>

<task type="auto">
  <name>Task 2: Create Welcome story (color palette + typography scale) and run build verification</name>
  <files>src/stories/Welcome.stories.tsx</files>
  <action>
Create `src/stories/Welcome.stories.tsx`. This file uses plain React (no React Native imports) since it runs in the web Storybook with Vite. Use Tailwind utility classes for styling — they are statically scanned at build time via tailwind.web.config.ts.

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { colors, semanticColors } from "../../tokens/colors";
import { fontSize, fontFamily } from "../../tokens/typography";

// ─── Color Swatch ────────────────────────────────────────────────────────────

interface SwatchProps {
  name: string;
  hex: string;
}

function Swatch({ name, hex }: SwatchProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-12 h-12 rounded-lg border border-neutral-200 shadow-sm"
        style={{ backgroundColor: hex }}
        aria-label={`${name}: ${hex}`}
      />
      <span className="text-xs text-neutral-600 font-mono text-center leading-tight">
        {name}
      </span>
      <span className="text-xs text-neutral-400 font-mono">{hex}</span>
    </div>
  );
}

// ─── Palette Row ─────────────────────────────────────────────────────────────

function PaletteRow({ paletteName, palette }: { paletteName: string; palette: Record<string | number, string> }) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-neutral-700 mb-3 capitalize">{paletteName}</h3>
      <div className="flex flex-wrap gap-3">
        {Object.entries(palette).map(([step, hex]) => (
          <Swatch key={step} name={String(step)} hex={hex} />
        ))}
      </div>
    </div>
  );
}

// ─── Welcome Component ────────────────────────────────────────────────────────

function WelcomePage() {
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-neutral-900 mb-2">
        Morph Maternity Design System
      </h1>
      <p className="text-base text-neutral-500 mb-10">
        Token showcase — colors and typography scale.
      </p>

      {/* ── Color Palette ── */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-neutral-800 mb-6 border-b border-neutral-200 pb-2">
          Color Palette
        </h2>
        <PaletteRow paletteName="rose" palette={colors.rose} />
        <PaletteRow paletteName="cream" palette={colors.cream} />
        <PaletteRow paletteName="sage" palette={colors.sage} />
        <PaletteRow paletteName="neutral" palette={colors.neutral} />

        <h3 className="text-sm font-semibold text-neutral-700 mb-3 mt-6">Status</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(colors.status).map(([name, hex]) => (
            <Swatch key={name} name={name} hex={hex} />
          ))}
        </div>

        <h3 className="text-sm font-semibold text-neutral-700 mb-3 mt-6">Semantic Aliases</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(semanticColors).map(([name, hex]) => (
            <Swatch key={name} name={name} hex={hex} />
          ))}
        </div>
      </section>

      {/* ── Typography Scale ── */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-800 mb-6 border-b border-neutral-200 pb-2">
          Typography Scale
        </h2>
        <div className="space-y-4">
          {Object.entries(fontSize).map(([step, { size, lineHeight }]) => (
            <div key={step} className="flex items-baseline gap-4 border-b border-neutral-100 pb-3">
              <span className="w-12 text-sm text-neutral-400 font-mono shrink-0">{step}</span>
              <span
                className="text-neutral-900"
                style={{ fontSize: `${size}px`, lineHeight: `${lineHeight}px` }}
              >
                The quick brown fox — {size}px / {lineHeight}px
              </span>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-semibold text-neutral-700 mb-4 mt-8">Font Families</h3>
        <div className="space-y-3">
          {Object.entries(fontFamily).map(([name, families]) => (
            <div key={name} className="flex items-center gap-4">
              <span className="w-36 text-sm text-neutral-400 font-mono shrink-0">{name}</span>
              <span className="text-sm text-neutral-700">{(families as readonly string[]).join(", ")}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Storybook Meta ───────────────────────────────────────────────────────────

const meta: Meta<typeof WelcomePage> = {
  title: "Design System/Welcome",
  component: WelcomePage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof WelcomePage>;

export const ColorAndTypography: Story = {};
```

After creating the file, run a Storybook static build to confirm everything compiles:

```bash
npm run build-storybook:web
```

If the build fails with a PostCSS/Tailwind error about `tailwind.web.config.ts` not found, verify `postcss.config.js` uses the correct path `"./tailwind.web.config.ts"`.

If the build fails because `@storybook/react` types are missing, install `@storybook/react` as a devDependency:
```bash
npm install --save-dev @storybook/react
```
  </action>
  <verify>
    <automated>cd "D:\1.Product Development with AI\1.1 project\1.MOH Clinic app\Momcare_Code\my-design-system" && npm run build-storybook:web 2>&1 | tail -20</automated>
  </verify>
  <done>
    - src/stories/Welcome.stories.tsx created with WelcomePage component
    - Story renders color swatches for all 4 palettes + status + semantic aliases
    - Story renders type scale for all 11 size steps
    - `npm run build-storybook:web` exits 0 and produces storybook-static/ directory
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
    Storybook 8 web setup: .storybook/ config with react-vite framework, a11y addon, controls addon, Tailwind CSS integration via tailwind.web.config.ts, and a Welcome story showing the full Morph Maternity color palette and typography scale.
  </what-built>
  <how-to-verify>
    1. Run: `npm run storybook:web` — should open http://localhost:6006
    2. In the sidebar, expand "Design System" → click "Welcome / ColorAndTypography"
    3. Confirm color swatches appear with correct background colors (rose-500 = #FF2D55, cream-100 = #FFF8EC, etc.)
    4. Confirm typography scale rows show increasing font sizes from xs (10px) to 6xl (60px)
    5. Click the "Accessibility" tab in the addon panel — confirm it runs an a11y audit
    6. Click the "Controls" tab — confirm it shows (empty props for this story is normal)
    7. Confirm the on-device RN Storybook still works: `npm run storybook` still starts Expo normally
  </how-to-verify>
  <resume-signal>Type "approved" if the web Storybook UI loads correctly, or describe any issues</resume-signal>
</task>

</tasks>

<verification>
- `npm run build-storybook:web` exits 0 (storybook-static/ produced)
- `.storybook/main.ts` references `@storybook/react-vite` framework
- `tailwind.web.config.ts` exists and does NOT import `nativewind/preset`
- `postcss.config.js` points at `tailwind.web.config.ts`
- `src/stories/Welcome.stories.tsx` imports from `../../tokens/colors` and `../../tokens/typography` (not from src/ or node_modules)
- `.rnstorybook/` is unchanged — no files modified inside it
</verification>

<success_criteria>
- Web Storybook starts on localhost:6006 with `npm run storybook:web`
- Welcome story displays all color palettes and typography scale with real token values
- Static build (`npm run build-storybook:web`) exits 0
- a11y addon tab visible and functional in UI
- Existing `.rnstorybook/` on-device setup is untouched
</success_criteria>

<output>
After completion, create `.planning/quick/1-set-up-storybook-8-for-this-project/1-SUMMARY.md` with:
- What was installed (package names and versions)
- Files created
- Scripts added to package.json
- Any deviations from the plan (e.g., extra packages needed)
- Confirmation that build-storybook:web passes
</output>
