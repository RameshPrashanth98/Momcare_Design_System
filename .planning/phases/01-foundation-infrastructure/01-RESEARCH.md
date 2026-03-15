# Phase 1: Foundation & Infrastructure - Research

**Researched:** 2026-03-15
**Domain:** Expo + NativeWind v4 + Storybook React Native v10 + Design Tokens
**Confidence:** HIGH for NativeWind v4 config (verified against current docs); MEDIUM for Storybook v10 + NativeWind Metro composition (issue-tracker verified, not official docs); MEDIUM for Expo SDK selection (see SDK version risk below)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- React Native + Expo (managed workflow) + TypeScript
- NativeWind v4 — pinned to Tailwind CSS ^3.4.x (do NOT use Tailwind v4 — incompatible with NativeWind v4)
- Storybook React Native v7 (verify if v8 is stable via `npm info @storybook/react-native version` before locking) — **UPDATED BY RESEARCH: latest stable is v10.2.3; see Standard Stack section**
- Phosphor Icons (`@phosphor-icons/react-native`) — **UPDATED BY RESEARCH: this package does not exist; correct package is `phosphor-react-native`; see Standard Stack**
- NativeWind v4: use `presets: [require('nativewind/preset')]` in tailwind.config.ts (NOT plugins array)
- `global.css` with `@tailwind` directives is required
- Three config files must all be correct together: tailwind.config.ts, babel.config.js, metro.config.js
- Smoke-test a single component with brand color class names before proceeding to any token definition work
- On-device only Storybook for v1 (via Expo Dev Client)
- Entry point toggle: `EXPO_PUBLIC_STORYBOOK=true` env var
- Global font decorator required — loads Cormorant Garamond, DM Sans, DM Mono before any story renders
- Web Storybook deferred to v2
- All token values must exactly match `morph-maternity-design-system.html` spec
- Tokens defined in tailwind.config.ts theme extensions
- Token categories: colors, typography, fonts, type scale, weights, line heights, spacing (4px grid), radius, shadow/elevation, grid breakpoints
- `cva` installed for variant-based components
- `cn()` utility (clsx + tailwind-merge) established
- Barrel export `src/index.ts` skeleton created in Phase 1

### Claude's Discretion
- Expo template choice and exact folder structure
- Whether to use Expo Router or React Navigation (for design system / Storybook setup)
- Exact Expo SDK version (verify current stable SDK)
- Font loading mechanism: `expo-font` with app config or `useFonts` hook — pick pattern that works cleanly with Storybook decorator

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUN-01 | Expo + React Native + TypeScript project scaffolded and builds successfully | Expo SDK 53 or 54 + blank-typescript template; SDK version selection is the key decision |
| FOUN-02 | NativeWind v4 installed and configured (tailwind.config.ts, babel.config.js, metro.config.js, global.css) with smoke-test | Full config verified against current nativewind.dev docs; Metro composition order confirmed |
| FOUN-03 | All Morph Maternity color tokens defined in tailwind.config.ts | Token-in-config pattern documented; values from morph-maternity-design-system.html |
| FOUN-04 | All typography tokens configured (fonts loaded, type scale, weights, line heights) | Cormorant Garamond requires manual .ttf — no expo-google-fonts package confirmed; DM Sans + DM Mono via @expo-google-fonts |
| FOUN-05 | All spacing tokens defined (4px grid, space-1 through space-48) | tailwind.config.ts theme.extend.spacing pattern documented |
| FOUN-06 | All radius tokens defined (radius-none through radius-full) | tailwind.config.ts theme.extend.borderRadius pattern documented |
| FOUN-07 | All shadow/elevation tokens defined (shadow-xs through shadow-2xl, shadow-inner) | iOS + Android shadow handling documented; platform variant approach identified |
| FOUN-08 | Grid system breakpoints configured | tailwind.config.ts theme.extend.screens; NativeWind v4 mobile-first |
| FOUN-09 | Storybook React Native v10 installed and runs on-device via Expo Dev Client | v10.2.3 is current; setup via withStorybook Metro wrapper; peer deps now include @gorhom/bottom-sheet |
| FOUN-10 | Storybook toggle pattern established (EXPO_PUBLIC_STORYBOOK env var) | withStorybook enabled flag strips Storybook from production bundle when false |
| FOUN-11 | Storybook global decorator loads fonts before any story renders | useFonts in .rnstorybook/preview.tsx decorator; async font loading pattern documented |
| FOUN-12 | cva (class-variance-authority) installed and convention documented | v0.7.1 current; pattern documented with NativeWind v4 compile-time constraint in mind |
| FOUN-13 | Barrel exports (index.ts) established | Named-export barrel structure documented; skeleton in Phase 1 |
</phase_requirements>

---

## Summary

Phase 1 establishes the complete project skeleton on which all 50 v1 components depend. The core challenge is configuring three interdependent tools correctly the first time: NativeWind v4 (which rewrote its Babel/Metro integration from v2/v3), Storybook React Native (which has jumped from v7 to v10 since the project research phase), and Expo SDK (where v55 dropped Legacy Architecture, creating an Expo version selection decision).

**Critical discovery:** `@storybook/react-native` is at version **10.2.3** as of March 2026 — not v7 as the prior project research assumed. The API has changed significantly: addons are no longer separate on-device packages, the Metro config now uses a `withStorybook` wrapper with an `enabled` flag for bundle stripping, and Expo Router integration uses a `app/storybook.tsx` route rather than entry-point hijacking. The correct Metro composition order when combining NativeWind and Storybook is `withStorybook(withNativeWind(config, options), storybookOptions)` — not the reverse.

**Expo SDK selection risk:** Expo SDK 55 (current stable) dropped Legacy Architecture entirely and ships React Native 0.83 / React 19.2. NativeWind v4 is officially confirmed for SDK 54. SDK 55 compatibility for NativeWind v4 is MEDIUM confidence — the NativeWind maintainers have noted challenges pegging NativeWind to Expo releases. **Recommendation: Use Expo SDK 54** to get confirmed NativeWind v4 compatibility. Upgrade to SDK 55 only after NativeWind v4 or v5 confirms official SDK 55 support.

**Primary recommendation:** Scaffold with `create-expo-app` using SDK 54, configure NativeWind v4 per current nativewind.dev docs, install Storybook v10 via `npm create storybook@latest`, and run a combined smoke test (component with brand color rendered both in the app and in Storybook) before touching design tokens.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| expo | 53.x (safe) or 54.x (preferred) | Managed workflow runtime | SDK 53 is confirmed stable; SDK 54 is officially recommended by NativeWind maintainers for v4 |
| react-native | bundled with Expo | Native rendering | Do not install independently; version is determined by Expo SDK |
| react | bundled with Expo | UI layer | Do not install independently |
| typescript | 5.x (bundled) | Type safety | Expo blank-typescript template includes it; do not override |
| nativewind | ^4.2.3 (current) | Tailwind utility classes for RN | Only production-ready Tailwind-syntax styling solution for React Native |
| tailwindcss | ^3.4.17 | NativeWind CSS processor | Pin to 3.4.x — NativeWind v4 is built against Tailwind v3 API; do NOT install tailwindcss@^4.x |
| react-native-reanimated | 3.x (via expo install) | NativeWind v4 peer dep | Required by NativeWind v4; use expo install to get compatible version |
| react-native-safe-area-context | 5.x (via expo install) | Safe area insets | Required by Storybook v10 peer dep and layout components |
| @storybook/react-native | ^10.2.3 | On-device component explorer | v10 is current stable; API changed significantly from v7; see Storybook section |
| storybook | >=10 | Storybook core (peer dep) | Required peer dep for @storybook/react-native v10 |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| class-variance-authority | ^0.7.1 | Variant component system | Every component with variant/size props |
| clsx | ^2.1.1 | Conditional class string builder | Used inside cn() utility |
| tailwind-merge | ^3.5.0 | Intelligent Tailwind class merging | Used inside cn() utility; prevents conflicting class overrides |
| @expo-google-fonts/dm-sans | ^0.4.2 | DM Sans font package | Body text font |
| @expo-google-fonts/dm-mono | ^0.4.2 | DM Mono font package | Monospace font |
| expo-font | bundled with Expo | Custom font loading | Required for Cormorant Garamond (manual .ttf) and all custom fonts |
| phosphor-react-native | ^3.0.3 | Phosphor icon components | CONFIRMED: package is `phosphor-react-native`, NOT `@phosphor-icons/react-native` |
| react-native-svg | via expo install | SVG support for phosphor icons | Required peer dep for phosphor-react-native |
| @gorhom/bottom-sheet | ^5.x (via expo install) | Storybook v10 peer dep | Required by @storybook/react-native v10; install via expo install |
| react-native-gesture-handler | ^2.x (via expo install) | Storybook v10 peer dep | Required by @gorhom/bottom-sheet |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Expo SDK 54 | Expo SDK 55 | SDK 55 dropped Legacy Architecture; NativeWind v4 SDK 55 compatibility is MEDIUM confidence — avoid until confirmed |
| Expo SDK 54 | Expo SDK 53 | SDK 53 = RN 0.74; SDK 54 = RN 0.81 (New Architecture default); SDK 54 is what NativeWind maintainers officially target |
| tailwindcss ^3.4.17 | tailwindcss ^4.x | NativeWind v4 built against Tailwind v3 API; Tailwind v4 changed core internals; BLOCKED |
| phosphor-react-native | @expo/vector-icons | Expo vector icons are bundled but have fewer icons; Phosphor has been confirmed as the project choice |
| @storybook/react-native v10 | v7.6.x | v7 is still installable but v10 is current stable with better Expo Router support |

### Installation

```bash
# 1. Scaffold project
npx create-expo-app@sdk-54 my-design-system --template blank-typescript
cd my-design-system

# 2. Install NativeWind v4 + peer dependencies
npx expo install nativewind react-native-reanimated react-native-safe-area-context
npm install --save-dev tailwindcss@^3.4.17
npx tailwindcss init

# 3. Install Storybook v10 (interactive — choose React Native when prompted)
npm create storybook@latest
# OR manually:
npx expo install @storybook/react-native storybook @gorhom/bottom-sheet react-native-gesture-handler

# 4. Install utility libraries
npm install class-variance-authority clsx tailwind-merge

# 5. Install fonts
npx expo install expo-font @expo-google-fonts/dm-sans @expo-google-fonts/dm-mono
# Cormorant Garamond: manual .ttf — place in /assets/fonts/ (see Font Loading section)

# 6. Install Phosphor icons
npx expo install phosphor-react-native react-native-svg
```

---

## Architecture Patterns

### Recommended Project Structure

```
my-design-system/
├── assets/
│   └── fonts/                        # Cormorant Garamond .ttf files
│       ├── CormorantGaramond-Regular.ttf
│       ├── CormorantGaramond-Italic.ttf
│       ├── CormorantGaramond-SemiBold.ttf
│       └── CormorantGaramond-Bold.ttf
├── tokens/                           # TypeScript token constants (brand source of truth)
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── radius.ts
│   ├── shadows.ts
│   └── index.ts
├── src/
│   ├── components/
│   │   ├── primitives/               # Text, Badge, Icon
│   │   ├── forms/                    # TextInput, Checkbox, etc.
│   │   ├── actions/                  # Button, FAB, etc.
│   │   ├── navigation/               # BottomNavBar, TopAppBar
│   │   ├── data-display/             # DataCard, Timeline, etc.
│   │   └── layout/                   # MobileShell, ScrollableContent
│   ├── utils/
│   │   └── cn.ts                     # clsx + tailwind-merge helper
│   └── index.ts                      # Barrel export skeleton
├── .rnstorybook/                     # Storybook v10 config directory (was .storybook in v7)
│   ├── main.ts
│   ├── preview.tsx                   # Font decorator lives here
│   └── index.tsx                     # Storybook UI entry export
├── app/                              # Expo Router (if used)
│   ├── _layout.tsx                   # Imports global.css
│   ├── index.tsx                     # Main app entry
│   └── storybook.tsx                 # Storybook route (Expo Router v10 pattern)
├── global.css                        # @tailwind directives — required by NativeWind v4
├── nativewind-env.d.ts               # NativeWind TypeScript declarations
├── tailwind.config.ts                # Design tokens + NativeWind preset
├── babel.config.js                   # NativeWind jsxImportSource + nativewind/babel
├── metro.config.js                   # withStorybook(withNativeWind(config, options))
├── app.json
├── tsconfig.json
└── package.json
```

### Pattern 1: NativeWind v4 Full Configuration

**Three files must be correct simultaneously.** An error in any one produces silent failures.

**babel.config.js (exact):**
```javascript
// Source: nativewind.dev/docs/getting-started/installation
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

**metro.config.js (NativeWind only, no Storybook):**
```javascript
// Source: nativewind.dev/docs/getting-started/installation
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: "./global.css" });
```

**metro.config.js (NativeWind + Storybook v10 — REQUIRED composition order):**
```javascript
// Source: github.com/storybookjs/react-native/issues/652
// CRITICAL: withStorybook must wrap withNativeWind — NOT the other way around
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { withStorybook } = require("@storybook/react-native/metro/withStorybook");

const config = getDefaultConfig(__dirname);

const nativeWindConfig = withNativeWind(config, { input: "./global.css" });

module.exports = withStorybook(nativeWindConfig, {
  enabled: process.env.EXPO_PUBLIC_STORYBOOK === "true",
  configPath: require("path").resolve(__dirname, "./.rnstorybook"),
});
```

**global.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**nativewind-env.d.ts:**
```typescript
/// <reference types="nativewind/types" />
```

**tailwind.config.ts (skeleton with NativeWind preset):**
```typescript
// Source: nativewind.dev/docs/getting-started/installation
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./.rnstorybook/**/*.{js,jsx,ts,tsx}",  // include Storybook files
  ],
  presets: [require("nativewind/preset")],  // NOT plugins — v4 breaking change
  theme: {
    extend: {
      // Morph Maternity tokens added here in subsequent tasks
    },
  },
  plugins: [],
};

export default config;
```

### Pattern 2: Storybook v10 Configuration

**IMPORTANT CHANGE from v7:** Config directory is `.rnstorybook/` (was `.storybook/`). There are no longer separate `@storybook/addon-ondevice-*` packages — controls, actions, and backgrounds are built into the core v10 package.

**.rnstorybook/main.ts:**
```typescript
// Source: storybookjs.github.io/react-native/docs
import type { StorybookConfig } from "@storybook/react-native";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.?(ts|tsx)"],
  addons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
  ],
};

export default config;
```

**.rnstorybook/preview.tsx (with font decorator — non-negotiable):**
```typescript
import React from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import type { Preview } from "@storybook/react-native";
import "../global.css"; // NativeWind requires this in Storybook preview

const preview: Preview = {
  decorators: [
    (Story) => {
      const [fontsLoaded] = useFonts({
        "CormorantGaramond-Regular": require("../assets/fonts/CormorantGaramond-Regular.ttf"),
        "CormorantGaramond-Italic": require("../assets/fonts/CormorantGaramond-Italic.ttf"),
        "CormorantGaramond-SemiBold": require("../assets/fonts/CormorantGaramond-SemiBold.ttf"),
        "DMSans-Regular": require("../assets/fonts/DMSans-Regular.ttf"),
        "DMSans-Medium": require("../assets/fonts/DMSans-Medium.ttf"),
        "DMMono-Regular": require("../assets/fonts/DMMono-Regular.ttf"),
      });
      if (!fontsLoaded) return null;
      return (
        <View className="flex-1 bg-cream-50 p-4">
          <Story />
        </View>
      );
    },
  ],
};

export default preview;
```

**app/storybook.tsx (Expo Router pattern for v10):**
```typescript
// Source: callstack.com/blog/how-to-cleanly-swap-between-react-native-storybook-10-and-your-app
import StorybookUI from "../.rnstorybook";
export default StorybookUI;
```

**Env var toggle in app root (Expo Router with protected route is cleaner):**
```typescript
// app/_layout.tsx
import "../global.css"; // NativeWind requires this import at app root
import { Stack } from "expo-router";

// Use Expo Router Stack.Protected to hide/show Storybook route
```

Or simpler non-Router approach:
```typescript
// App.tsx (if not using Expo Router)
import "../global.css";
import StorybookUI from "./.rnstorybook";
import { AppRoot } from "./src";

const isStorybook = process.env.EXPO_PUBLIC_STORYBOOK === "true";
export default isStorybook ? StorybookUI : AppRoot;
```

### Pattern 3: Design Token Pipeline

Token values flow ONE direction. Components never import token files directly.

```
morph-maternity-design-system.html (HTML spec — copy values exactly)
        |
        v
tokens/*.ts (TypeScript constants — typed, plain, no framework deps)
        |
        v
tailwind.config.ts theme.extend (single bridge from tokens to class names)
        |
        v
NativeWind Babel/Metro transform (class names → StyleSheet at build time)
        |
        v
Component className="bg-rose-500" (components use ONLY class names)
```

**tokens/colors.ts skeleton:**
```typescript
export const colors = {
  rose: {
    50: "#FFF0F3",  // copy exact hex values from morph-maternity-design-system.html
    // ...
  },
  cream: { /* ... */ },
  sage: { /* ... */ },
  neutral: { /* ... */ },
} as const;
```

**tailwind.config.ts with tokens:**
```typescript
import type { Config } from "tailwindcss";
import { colors } from "./tokens/colors";
// ... other token imports

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "./.rnstorybook/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        rose:    colors.rose,
        cream:   colors.cream,
        sage:    colors.sage,
        neutral: colors.neutral,
        // Semantic aliases
        primary:   colors.rose[500],
        surface:   colors.cream[50],
        background: colors.cream[100],
      },
      fontFamily: {
        display: ["CormorantGaramond-Regular"],  // must match useFonts key exactly
        body:    ["DMSans-Regular"],
        mono:    ["DMMono-Regular"],
      },
      // spacing, borderRadius, boxShadow extensions...
    },
  },
  plugins: [],
};

export default config;
```

### Pattern 4: cn() Utility

Every component uses this for conditional/merged class names.

```typescript
// src/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

### Pattern 5: cva Variant System

The ONLY approved pattern for variant components. No dynamic template literals.

```typescript
// Source: class-variance-authority documentation
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  // base classes — always applied
  "rounded-lg items-center justify-center min-h-[44px]",
  {
    variants: {
      variant: {
        primary:  "bg-primary",
        outline:  "border border-primary bg-transparent",
        ghost:    "bg-transparent",
      },
      size: {
        sm: "px-4 py-2",
        md: "px-6 py-3",
        lg: "px-8 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// CRITICAL: all class strings must be complete and static — never dynamic
// WRONG: `text-${color}-500` — NativeWind compile-time transform never sees it
// RIGHT: isError ? "text-red-500" : "text-rose-500"
```

### Pattern 6: Font Loading with SplashScreen Gate

```typescript
// app/_layout.tsx (Expo Router)
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "CormorantGaramond-Regular": require("../assets/fonts/CormorantGaramond-Regular.ttf"),
    "DMSans-Regular": require("../assets/fonts/DMSans-Regular.ttf"),
    "DMMono-Regular": require("../assets/fonts/DMMono-Regular.ttf"),
    // ... all weights needed
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;
  // ... render layout
}
```

### Anti-Patterns to Avoid

- **Dynamic class strings:** `className={\`text-${color}-500\`}` — NativeWind compile-time transform never sees runtime-assembled strings. Use full static strings or cva.
- **NativeWind in plugins:** `plugins: [require("nativewind/preset")]` — WRONG. Must be `presets: [require("nativewind/preset")]`.
- **styled() HOC:** Removed in NativeWind v4. Use `className` prop directly on primitives.
- **Wrong Metro wrapper order:** `withNativeWind(withStorybook(...))` — WRONG. Must be `withStorybook(withNativeWind(...))`.
- **Missing global.css import in Storybook:** `.rnstorybook/preview.tsx` must import `../global.css` independently from the app's import.
- **tailwindcss@^4.x:** NativeWind v4 is built against Tailwind v3 API. Tailwind v4 breaks NativeWind.
- **Wrong Phosphor package:** `@phosphor-icons/react-native` does NOT exist. Use `phosphor-react-native`.
- **Expo SDK 55 without NativeWind v5:** SDK 55 dropped Legacy Architecture. NativeWind v4 + SDK 55 is MEDIUM confidence. Use SDK 54 until confirmed.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Conditional Tailwind classes | Custom class string builder | `cn()` (clsx + tailwind-merge) | tailwind-merge handles conflicting class override correctly; custom builders miss edge cases |
| Variant components | Nested ternaries in className | `cva` (class-variance-authority) | cva enforces complete static class strings, compatible with NativeWind v4 compile-time constraint |
| Font variant strings | Manual font key strings | Typed token constants | Font key strings must exactly match `useFonts` keys; typed constants catch mismatches at compile time |
| Metro config composition | Manual mergeConfig | `withNativeWind` + `withStorybook` chaining | Metro's `mergeConfig` is shallow and does not compose resolvers; the provided wrappers handle this correctly |
| Storybook entry point toggle | File edits or comments | `EXPO_PUBLIC_STORYBOOK` env var + withStorybook `enabled` flag | The `enabled` flag strips all Storybook code from the bundle when false — manual toggling leaks Storybook into production |

---

## Common Pitfalls

### Pitfall 1: Wrong Metro Composition Order (Storybook + NativeWind)

**What goes wrong:** Both `withNativeWind` and `withStorybook` modify `config.resolver.resolveRequest`. Metro's `mergeConfig` performs shallow merges, so the first wrapper's resolver is silently overwritten.

**Why it happens:** Natural instinct is to apply Storybook last as the "outer" wrapper. This is backwards.

**How to avoid:** Always: `withStorybook(withNativeWind(config, nativeWindOptions), storybookOptions)`.

**Warning signs:** Components render but are completely unstyled in Storybook. App works but Storybook styles do not apply. Metro starts without error but classes have no effect.

**Confidence:** HIGH (confirmed in Storybook RN GitHub issue #652)

---

### Pitfall 2: NativeWind v4 Dynamic Class Strings

**What goes wrong:** NativeWind's Babel transform resolves classes at compile time by static analysis. Template literals assembled at runtime are never seen by the transform.

**How to avoid:** Use `cva` for all variant logic. Use ternaries with complete class strings: `isError ? "text-red-500" : "text-rose-500"`. Never: `` `text-${color}-500` ``.

**Warning signs:** Variant styles silently do not apply. No console error. Works in web preview but not on device.

---

### Pitfall 3: Cormorant Garamond Has No Expo Google Fonts Package

**What goes wrong:** `@expo-google-fonts/cormorant-garamond` does not exist as a current npm package. Attempting to install it fails or installs an outdated/incompatible version.

**How to avoid:** Download Cormorant Garamond `.ttf` files directly from Google Fonts (fonts.google.com/specimen/Cormorant+Garamond). Place in `/assets/fonts/`. Load via `expo-font` `useFonts()` hook.

**Required weights:** At minimum Regular (400), SemiBold (600), Italic. Check morph-maternity-design-system.html for the exact weights used.

**Warning signs:** Install fails with "package not found". Or installs version 0.4.1 which is misaligned with current Expo SDK.

---

### Pitfall 4: Font Key Names Must Match Tailwind Config Exactly

**What goes wrong:** The string passed as the key in `useFonts({})` must exactly match the font family value in `tailwind.config.ts`. If they differ (case, spacing, hyphen vs space), the NativeWind `font-display` class resolves to a family that is not loaded, and React Native silently falls back to system font.

**How to avoid:** Define font keys as constants in `tokens/typography.ts` and reference the same constant in both `useFonts()` and `tailwind.config.ts` `fontFamily` extension.

**Warning signs:** `console.warn: fontFamily 'CormorantGaramond' is not a system font` in Metro output. Storybook stories and app show San Francisco / Roboto instead of brand fonts.

---

### Pitfall 5: global.css Must Be Imported in TWO Places

**What goes wrong:** NativeWind requires `global.css` imported at the app root entry AND separately in `.rnstorybook/preview.tsx`. Storybook runs in a separate Metro context and does not inherit the app's imports.

**How to avoid:**
- App: `import "../global.css"` in `app/_layout.tsx`
- Storybook: `import "../global.css"` in `.rnstorybook/preview.tsx`

**Warning signs:** App styles work; Storybook shows completely unstyled components. Or vice versa.

---

### Pitfall 6: Expo SDK 55 + NativeWind v4 Compatibility Unknown

**What goes wrong:** Expo SDK 55 (current as of March 2026) dropped Legacy Architecture support entirely. NativeWind v4 is officially confirmed for SDK 54. NativeWind maintainers have noted challenges pegging NativeWind to Expo SDK releases.

**How to avoid:** Use SDK 53 or SDK 54 for this project. Check NativeWind GitHub discussions/issues before any SDK upgrade.

**Warning signs:** NativeWind styles not applying after SDK upgrade. Peer dependency warnings from `expo install`.

---

### Pitfall 7: Storybook v10 Changed Config Directory Name

**What goes wrong:** Storybook v7 used `.storybook/`. Storybook v10 uses `.rnstorybook/`. Any tutorial or template from 2024 or earlier references `.storybook/` which no longer maps to where Storybook v10 looks.

**How to avoid:** Ensure all file paths, imports, and `metro.config.js` `configPath` reference `.rnstorybook/`.

---

### Pitfall 8: Missing Storybook v10 Peer Dependencies

**What goes wrong:** `@storybook/react-native` v10 requires `@gorhom/bottom-sheet >=4`, `react-native-gesture-handler >=2`, and `react-native-reanimated >=2` as peer dependencies. These are NEW requirements not present in v7. Missing them causes runtime crashes when Storybook UI tries to render.

**How to avoid:** Install the full set: `npx expo install @gorhom/bottom-sheet react-native-gesture-handler react-native-reanimated`.

---

### Pitfall 9: tailwind.config.ts Content Paths Missing Storybook Files

**What goes wrong:** Tailwind's content scanner must include `.rnstorybook/**` paths. If story files use Tailwind classes in their decorators or wrappers, those classes are purged in production unless the file paths are in the `content` array.

**How to avoid:**
```typescript
content: [
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
  "./.rnstorybook/**/*.{ts,tsx}",  // must include Storybook v10 directory
],
```

---

## Code Examples

### Smoke Test Component (verify NativeWind works before token work)

```typescript
// src/components/SmokeTest.tsx
// Source: NativeWind v4 getting started
import { View, Text } from "react-native";

export function SmokeTest() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-8">
      <View className="bg-rose-500 rounded-lg p-4 mb-4">
        <Text className="text-white font-bold text-lg">
          NativeWind v4 is working
        </Text>
      </View>
      <Text className="text-neutral-600 text-sm">
        If this text is styled, the pipeline is correct.
      </Text>
    </View>
  );
}
```

Run on device BEFORE writing any tokens. If the rose background renders, NativeWind is configured correctly.

### Barrel Export Skeleton (src/index.ts)

```typescript
// src/index.ts — populated per phase; skeleton established in Phase 1
// Phase 1: utils only
export { cn } from "./utils/cn";
// Phase 2 will add: export * from "./components/primitives";
// Phase 3 will add: export * from "./components/forms";
```

### Token Spacing (4px grid)

```typescript
// tokens/spacing.ts — must span space-1 through space-48 per FOUN-05
export const spacing = {
  "1":  4,
  "2":  8,
  "3":  12,
  "4":  16,
  "5":  20,
  "6":  24,
  "8":  32,
  "10": 40,
  "12": 48,
  "16": 64,
  "20": 80,
  "24": 96,
  "32": 128,
  "40": 160,
  "48": 192,
} as const;
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Storybook v7 on-device addons (`@storybook/addon-ondevice-controls` etc.) | Controls/actions built into @storybook/react-native v10 core | v8–v10 (2024–2025) | Fewer packages to install; no separate addon packages needed |
| Storybook config in `.storybook/` | Config in `.rnstorybook/` | v8+ | All paths and imports must use new directory name |
| Storybook Metro: `@storybook/react-native/metro-preset` | `withStorybook` from `@storybook/react-native/metro/withStorybook` | v8+ | New functional wrapper API with `enabled` flag for bundle stripping |
| `nativewind/babel` plugin-only approach (v2/v3) | `jsxImportSource: "nativewind"` + `nativewind/babel` preset (v4) | NativeWind v4.0 (2024) | Both are now required together; old plugin-only approach is broken |
| NativeWind `styled()` HOC | Direct `className` prop on RN primitives | NativeWind v4.0 (2024) | `styled()` is removed; use className directly |
| Expo SDK 52 (RN 0.76, New Architecture optional) | Expo SDK 54 (RN 0.81, New Architecture default) | SDK 53/54 (2024–2025) | New Architecture is now default; Legacy Architecture still available in SDK 54 but not SDK 55 |

**Deprecated/outdated (do not follow):**
- Any tutorial referencing `@storybook/addon-ondevice-controls` as a separate install — it is now included in v10 core
- NativeWind setup guides using `plugins: [require("nativewind/preset")]` — must be `presets:`
- References to `@phosphor-icons/react-native` — correct package is `phosphor-react-native`
- Storybook v7 "entry point hijacking" (modifying `package.json` main field) — v10 uses `withStorybook` + env var toggle

---

## Open Questions

1. **Exact Expo SDK version to target**
   - What we know: SDK 54 is officially confirmed for NativeWind v4. SDK 55 dropped Legacy Architecture; NativeWind v4 + SDK 55 compatibility is MEDIUM confidence.
   - What's unclear: Has NativeWind v4.2.3+ been tested on SDK 55 (RN 0.83, New Architecture only)?
   - Recommendation: Start with SDK 54. Check `github.com/nativewind/nativewind/discussions` before SDK 55 upgrade.

2. **Storybook v10 `liteMode` option**
   - What we know: v10 introduced a `liteMode` option to reduce bundle size by mocking UI dependencies. May remove the need for `@gorhom/bottom-sheet`.
   - What's unclear: Does liteMode affect Storybook functionality needed for design review (controls panel)?
   - Recommendation: Try standard install first. If bundle size is a concern, evaluate liteMode in a follow-up spike.

3. **Cormorant Garamond exact weights needed**
   - What we know: Must load from local `.ttf` files. `useFonts` key names must match `tailwind.config.ts` values.
   - What's unclear: Which specific weight/style variants does `morph-maternity-design-system.html` reference?
   - Recommendation: Read the HTML spec during FOUN-04 task. Download all referenced variants from fonts.google.com/specimen/Cormorant+Garamond.

4. **Expo Router vs plain Expo (navigation choice)**
   - What we know: CONTEXT.md leaves this to Claude's discretion. Storybook v10 has first-class Expo Router support via `app/storybook.tsx` route.
   - What's unclear: A design system project may not need Expo Router at all in v1 — it is not a navigation app.
   - Recommendation: Use Expo Router (with the blank-typescript template that includes it). The `app/storybook.tsx` pattern for Storybook v10 is cleaner than the non-Router toggle approach, and Expo Router is the current default template.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Jest with jest-expo preset |
| Config file | `package.json` jest field (or `jest.config.js`) — Wave 0 creates |
| Quick run command | `npx jest --testPathPattern "smoke" --passWithNoTests` |
| Full suite command | `npx jest` |

**Note:** Phase 1 validation is primarily visual (on-device smoke test) and structural (project compiles, Metro starts, Storybook loads). Unit tests for configuration files are not meaningful. The Nyquist validation for this phase is a smoke-test component test verifying the project builds and NativeWind class applies.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUN-01 | Project builds without errors | Build check | `npx expo export --platform ios --non-interactive` | ❌ Wave 0 |
| FOUN-02 | NativeWind smoke test: component with className renders with brand color | Visual / smoke | `npx jest tests/smoke.test.tsx` | ❌ Wave 0 |
| FOUN-03 | Color tokens resolve to expected hex values | Unit | `npx jest tests/tokens/colors.test.ts` | ❌ Wave 0 |
| FOUN-04 | Font loading does not throw errors | Integration | Manual: useFonts returns true on device | Manual only |
| FOUN-05 | Spacing tokens all defined (space-1 through space-48) | Unit | `npx jest tests/tokens/spacing.test.ts` | ❌ Wave 0 |
| FOUN-06 | Radius tokens all defined | Unit | `npx jest tests/tokens/radius.test.ts` | ❌ Wave 0 |
| FOUN-07 | Shadow tokens all defined | Unit | `npx jest tests/tokens/shadows.test.ts` | ❌ Wave 0 |
| FOUN-08 | Breakpoints configured | Unit | `npx jest tests/tokens/grid.test.ts` | ❌ Wave 0 |
| FOUN-09 | Storybook loads without crash | Manual / smoke | `EXPO_PUBLIC_STORYBOOK=true npx expo start` then verify device | Manual only |
| FOUN-10 | Toggle: EXPO_PUBLIC_STORYBOOK=true shows Storybook, false shows app | Manual | Visual inspection on device | Manual only |
| FOUN-11 | Storybook stories render with brand fonts (not system font) | Manual | Visual inspection: Cormorant Garamond renders in stories | Manual only |
| FOUN-12 | cn() and cva utilities function correctly | Unit | `npx jest tests/utils/cn.test.ts` | ❌ Wave 0 |
| FOUN-13 | Barrel exports: components importable from src/index.ts | Unit | `npx jest tests/exports.test.ts` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npx jest --testPathPattern "tokens|utils" --passWithNoTests`
- **Per wave merge:** `npx jest`
- **Phase gate:** Full suite green + manual smoke test on device before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `tests/smoke.test.tsx` — basic render test for SmokeTest component (FOUN-02)
- [ ] `tests/tokens/colors.test.ts` — asserts all required palette colors are defined (FOUN-03)
- [ ] `tests/tokens/spacing.test.ts` — asserts space-1 through space-48 are defined (FOUN-05)
- [ ] `tests/tokens/radius.test.ts` — asserts all radius tokens defined (FOUN-06)
- [ ] `tests/tokens/shadows.test.ts` — asserts all shadow tokens defined (FOUN-07)
- [ ] `tests/tokens/grid.test.ts` — asserts breakpoints configured (FOUN-08)
- [ ] `tests/utils/cn.test.ts` — asserts cn() merges classes correctly (FOUN-12)
- [ ] `tests/exports.test.ts` — asserts src/index.ts exports cn (FOUN-13)
- [ ] Framework install: `npx expo install jest-expo` + `npm install --save-dev @testing-library/react-native` (if not already in template)
- [ ] `jest.config.js` or package.json jest preset: `"preset": "jest-expo"`

---

## Sources

### Primary (HIGH confidence)
- nativewind.dev/docs/getting-started/installation — current NativeWind v4 install steps, babel.config.js, metro.config.js, tailwindcss@^3.4.17 pinning
- github.com/storybookjs/react-native/issues/652 — confirmed `withStorybook(withNativeWind(...))` composition order
- github.com/storybookjs/react-native — README, v10 setup, .rnstorybook directory, withStorybook Metro API
- `npm info` commands run 2026-03-15 — confirmed package versions: nativewind 4.2.3, tailwindcss 4.2.1 (CLI), expo 55.0.6, @storybook/react-native 10.2.3, class-variance-authority 0.7.1, clsx 2.1.1, tailwind-merge 3.5.0, phosphor-react-native 3.0.3

### Secondary (MEDIUM confidence)
- expo.dev/blog/storybook-and-expo — Storybook 9/10 Expo integration, withStorybook Metro, app/storybook.tsx route pattern
- callstack.com/blog/how-to-cleanly-swap-between-react-native-storybook-10-and-your-app — env var toggle, bundle stripping via enabled flag
- github.com/nativewind/nativewind/discussions/1604 — official NativeWind + Expo SDK version compatibility, SDK 54 as recommended target
- storybookjs.github.io/react-native/docs/intro/configuration/metro-configuration/ — withStorybook API options (enabled, configPath, liteMode)

### Tertiary (LOW confidence — verify before implementation)
- NativeWind v4 + Expo SDK 55 compatibility — search results suggest challenges; official confirmation not found
- @storybook/react-native v10 addon package names — verify against current package list at storybookjs.github.io
- Cormorant Garamond exact weights in morph-maternity-design-system.html — must read HTML spec to confirm

---

## Metadata

**Confidence breakdown:**
- Standard Stack (versions): HIGH — confirmed via live npm info commands on 2026-03-15
- NativeWind v4 config: HIGH — verified against current nativewind.dev docs
- Storybook v10 setup: MEDIUM — API confirmed from GitHub README and blog posts; official docs partially inaccessible (404s on sub-pages)
- Metro composition order: HIGH — confirmed in official GitHub issue with maintainer response
- Expo SDK selection: MEDIUM — SDK 54 + NativeWind v4 confirmed; SDK 55 compatibility unconfirmed
- Font loading: HIGH — stable Expo behavior, unchanged across SDK versions
- Design token pipeline: HIGH — well-established pattern from project-level research

**Research date:** 2026-03-15
**Valid until:** 2026-04-15 (30 days for NativeWind/Storybook; both are actively developed)
**Key versions to re-verify before implementation:** expo SDK target, @storybook/react-native (active canary releases), nativewind (v5 is in active development)
