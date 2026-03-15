# Technology Stack

**Project:** Morph Maternity Design System
**Researched:** 2026-03-15
**Confidence note:** External web access was unavailable during this session (WebSearch, WebFetch, and Brave Search all blocked). All version numbers and setup details are drawn from training data with knowledge cutoff August 2025. Verify pinned versions against `npm info <package> version` before locking in `package.json`.

---

## Recommended Stack

### Core Runtime

| Technology | Version (verify) | Purpose | Why |
|------------|-----------------|---------|-----|
| Expo SDK | 51 or 52 | Managed workflow runtime | SDK 51 shipped with React Native 0.74; SDK 52 with RN 0.76 (New Architecture on by default). Use whichever the Momcare app targets — the design system must match exactly. |
| React Native | 0.74 – 0.76 | Native rendering engine | Bundled with Expo SDK; do not install separately. Version is dictated by Expo SDK choice. |
| React | 18.x | UI layer | Bundled with Expo; do not manage separately. |
| TypeScript | 5.x | Type safety | Expo's default template ships with TS 5. Design systems live longer and grow larger than apps — strict types are non-negotiable. |
| Node.js | 20 LTS | Build tooling runtime | Expo CLI and Metro require Node >= 18; 20 LTS is the safe default. |

### Styling Layer

| Technology | Version (verify) | Purpose | Why |
|------------|-----------------|---------|-----|
| NativeWind | 4.x | Tailwind CSS utility classes for React Native | The only production-ready Tailwind-syntax styling solution for RN. v4 is a complete rewrite using CSS Variables under the hood and ships with full Expo Router compatibility. |
| Tailwind CSS | 3.4.x | NativeWind's CSS processor | NativeWind v4 still processes against Tailwind v3 (not v4 — Tailwind v4 has different internals; NativeWind tracks it separately). Do NOT upgrade to Tailwind CSS v4 until NativeWind explicitly supports it. |
| tailwindcss | 3.4.x | Config + JIT compiler | Pin to 3.4 to avoid NativeWind breakage from Tailwind v4 API changes. |

**CRITICAL — NativeWind v4 is NOT backward-compatible with v2/v3:**
- v2/v3 used a Babel plugin that transformed classnames at compile time
- v4 uses a CSS-like runtime with a Metro transform and CSS variable support
- The `className` prop is now handled by a new JSX transform — you must configure both Babel and Metro correctly
- `styled()` HOC from v2 is removed; use `className` prop directly on primitives
- Arbitrary values (`w-[123px]`) now work reliably in v4

### Component Documentation

| Technology | Version (verify) | Purpose | Why |
|------------|-----------------|---------|-----|
| Storybook for React Native | 7.6.x | On-device component explorer | The official `@storybook/react-native` package. v7 supports Expo out of the box and no longer requires a separate web companion. |
| @storybook/addon-ondevice-controls | 7.x | Controls addon for on-device | Lets you tweak props live on the device — essential for component library work. |
| @storybook/addon-ondevice-actions | 7.x | Actions addon | Log interaction callbacks on device. |
| @storybook/addon-ondevice-backgrounds | 7.x | Background switcher | Test components on different backgrounds. |
| @storybook/addon-ondevice-notes | 7.x | Per-story notes | Inline usage documentation alongside controls. |

**Note on Storybook v8:** As of mid-2025, `@storybook/react-native` v8 was in active development / early releases. Verify whether v8 is stable before adopting. v7.6.x is the safe production choice if v8 is still RC.

### Design Token Infrastructure

| Technology | Version (verify) | Purpose | Why |
|------------|-----------------|---------|-----|
| tailwind.config.js (project file) | N/A | Token registry | All Morph Maternity tokens (colors, spacing, radius, shadow, typography) live here as `theme.extend` values. This is the single source of truth. |
| expo-font | bundled with Expo | Custom font loading | Required to load Cormorant Garamond, DM Sans, and DM Mono. |
| @expo-google-fonts/* | latest | Google Fonts packages for DM Sans / DM Mono | Pre-built Expo-compatible packages for the two body typefaces. Cormorant Garamond may need manual font file loading if not available as a Google Fonts Expo package. |

### Testing

| Technology | Version (verify) | Purpose | Why |
|------------|-----------------|---------|-----|
| Jest | 29.x | Unit test runner | Expo's default; `expo/jest-preset` handles React Native transform. |
| @testing-library/react-native | 12.x | Component testing utilities | Standard for RN component tests. Pairs with Jest. |

### Build / Tooling

| Technology | Version (verify) | Purpose | Why |
|------------|-----------------|---------|-----|
| Expo CLI | latest | Dev server, build orchestration | `npx expo start` starts Metro; `npx expo export` for production. |
| Metro | bundled with Expo | JS bundler | Do not install or configure Metro independently unless NativeWind's metro config requires a wrapper (it does — see setup below). |
| Babel | 7.x | JS transform | `babel-preset-expo` is the base; NativeWind adds `nativewind/babel` on top. |
| ESLint | 8.x | Linting | Expo ships with `eslint-config-expo`. |
| Prettier | 3.x | Code formatting | No RN-specific config needed; use standard Prettier config. |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Styling | NativeWind v4 | StyleSheet API | Decision already made; StyleSheet has no design-token story without extra tooling |
| Styling | NativeWind v4 | Tamagui | Tamagui is powerful but has heavy compiler, steep learning curve, and complex Expo integration; overkill for a single-app internal library |
| Styling | NativeWind v4 | Gluestack UI v2 | Gluestack now uses NativeWind internally — using Gluestack would layer an opinion over an opinion; go direct |
| Styling | NativeWind v4 | React Native StyleSheet + design tokens | Verbose, no Tailwind syntax, harder handoff from design to code |
| Component docs | Storybook RN | Chromatic (web-only) | Decision already made; on-device Storybook is correct for RN |
| Component docs | Storybook RN | Storybook web + RN Web adapter | RN Web adds significant complexity and the app is RN-only |
| Fonts | @expo-google-fonts | expo-font manual loading | Google Fonts packages reduce boilerplate; fall back to manual only for Cormorant Garamond if not available |
| Testing | Jest + RNTL | Detox (E2E) | Detox is for E2E; design system needs unit/component tests, not device automation |
| State (if needed) | React Context | Redux / Zustand | Design system should have zero global state; Context only for theming if needed |

---

## Installation

### 1. Initialize Expo project (if starting fresh)

```bash
npx create-expo-app@latest my-design-system --template blank-typescript
cd my-design-system
```

### 2. Install NativeWind v4 and Tailwind CSS

```bash
npx expo install nativewind@^4.0.0 react-native-reanimated react-native-safe-area-context
npm install --save-dev tailwindcss@^3.4.0
npx tailwindcss init
```

**Why `react-native-reanimated`:** NativeWind v4 depends on it for animation support in certain utilities. Install it even if you don't use Reanimated directly.

### 3. Configure Tailwind (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind v4: point at ALL component files
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Morph Maternity tokens go here — see FEATURES.md / ARCHITECTURE.md
      colors: {
        // rose, cream, sage palettes from brand spec
      },
      fontFamily: {
        display: ["CormorantGaramond-Regular"],
        body: ["DMSans-Regular"],
        mono: ["DMMono-Regular"],
      },
      // spacing, radius, shadow extensions...
    },
  },
  plugins: [],
};
```

### 4. Configure Babel (`babel.config.js`)

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
    plugins: [
      // NativeWind v4 no longer needs "nativewind/babel" plugin separately
      // The jsxImportSource above replaces the v2/v3 babel plugin approach
      "react-native-reanimated/plugin", // must be last
    ],
  };
};
```

**BREAKING CHANGE from v2/v3:** NativeWind v4 uses `jsxImportSource: "nativewind"` in `babel-preset-expo` options. The old `nativewind/babel` plugin approach from v2 must be removed.

### 5. Configure Metro (`metro.config.js`)

```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

### 6. Create global CSS entry (`global.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 7. Import global CSS in app entry point

```tsx
// _layout.tsx (Expo Router) or App.tsx
import "./global.css";
```

**BREAKING CHANGE from v2/v3:** v4 requires a CSS entry file. There is no purely JS-based initialization path in v4.

### 8. TypeScript: add NativeWind types

In `tsconfig.json`, include NativeWind's type declarations:

```json
{
  "compilerOptions": {
    "types": ["nativewind/types"]
  }
}
```

Or add to your `app.d.ts` / `global.d.ts`:

```ts
/// <reference types="nativewind/types" />
```

This ensures `className` prop is recognized on all React Native core components.

### 9. Install Storybook for React Native

```bash
npx storybook@latest init --type react_native
```

This scaffolds:
- `.storybook/` directory with `main.js` and `preview.js`
- `App.tsx` or `index.js` modified to show Storybook UI
- Required addons installed automatically

Then install on-device addons separately if not auto-installed:

```bash
npm install --save-dev \
  @storybook/addon-ondevice-controls \
  @storybook/addon-ondevice-actions \
  @storybook/addon-ondevice-backgrounds \
  @storybook/addon-ondevice-notes
```

### 10. Configure Storybook entry toggle

Storybook for RN replaces the app entry point. Use an environment variable to switch:

```tsx
// App.tsx
import { STORYBOOK_ENABLED } from "@env"; // or process.env

if (__DEV__ && STORYBOOK_ENABLED === "true") {
  // Dynamically import Storybook
  const StorybookUI = require("./.storybook").default;
  module.exports = StorybookUI;
} else {
  // Normal app
  // ...
}
```

Or use Expo's `APP_VARIANT` / `EXPO_PUBLIC_` environment variable pattern.

### 11. Install fonts

```bash
npx expo install expo-font @expo-google-fonts/dm-sans @expo-google-fonts/dm-mono
```

Cormorant Garamond: check Google Fonts expo package availability. If unavailable, place `.ttf` files in `/assets/fonts/` and load via `expo-font`:

```tsx
await Font.loadAsync({
  "CormorantGaramond-Regular": require("./assets/fonts/CormorantGaramond-Regular.ttf"),
  // ... weights/styles as needed
});
```

### 12. Install testing libraries

```bash
npx expo install jest-expo
npm install --save-dev @testing-library/react-native @testing-library/jest-native
```

In `package.json`:

```json
{
  "jest": {
    "preset": "jest-expo"
  }
}
```

---

## What NOT to Use

| Technology | Why Not |
|------------|---------|
| `nativewind/babel` plugin (v2 style) | Removed in v4; using it alongside `jsxImportSource` causes conflicts |
| Tailwind CSS v4 (`tailwindcss@^4.x`) | NativeWind v4 is built against Tailwind CSS v3 API; Tailwind v4 changed core internals. Do not upgrade until NativeWind officially supports Tailwind v4. |
| `styled()` HOC from NativeWind v2 | Removed in v4. All styling must use `className` prop directly. |
| React Native Web for Storybook rendering | Adds significant complexity for a RN-only project. Use on-device Storybook. |
| Tamagui | Has its own compiler, its own token system, and its own component primitives. Mixing with NativeWind creates two parallel styling systems. |
| Gluestack UI components | Gluestack UI v2 wraps NativeWind — using their primitives means accepting their component API and their version of NativeWind config. Go direct instead. |
| Expo Go for Storybook development | Expo Go has limitations with custom native modules. Use Expo Dev Client (`npx expo install expo-dev-client`) if any native module is added. NativeWind v4 itself works in Expo Go for SDK 50+. |
| `react-native-reanimated` v2 | NativeWind v4 requires Reanimated v3+. The two major versions are not compatible. |

---

## Key NativeWind v4 Breaking Changes Summary

| Area | v2 / v3 Behavior | v4 Behavior |
|------|-----------------|-------------|
| Babel setup | `plugins: ["nativewind/babel"]` | `jsxImportSource: "nativewind"` in babel-preset-expo options |
| CSS entry | Not required | Required — `global.css` with `@tailwind` directives |
| Metro setup | Optional / different API | Required — `withNativeWind(config, { input: "./global.css" })` |
| `styled()` HOC | Available | Removed — use `className` prop on primitives |
| TypeScript | Manual `className` prop extension | `/// <reference types="nativewind/types" />` |
| Arbitrary values | Unreliable in some cases | Reliable via CSS variable approach |
| CSS Variables | Not supported | Supported — theme values compile to CSS custom properties |
| Expo Router | Required extra config | First-class support in v4 |

---

## Version Verification Commands

Run these before creating `package.json` to confirm latest stable versions:

```bash
npm info nativewind version
npm info tailwindcss version
npm info @storybook/react-native version
npm info expo version
npm info react-native version
npm info @testing-library/react-native version
```

---

## Sources

**Confidence note:** All findings are from training data (knowledge cutoff August 2025). External documentation could not be fetched during this research session due to environment restrictions.

| Claim | Confidence | Verification needed |
|-------|-----------|-------------------|
| NativeWind v4 uses `jsxImportSource` not babel plugin | HIGH | Verify against nativewind.dev docs |
| NativeWind v4 requires `global.css` entry file | HIGH | Verify against nativewind.dev getting started |
| NativeWind v4 targets Tailwind CSS v3, not v4 | MEDIUM | Verify — NativeWind v4 Tailwind v4 compat may have shipped by March 2026 |
| Storybook RN v7.6.x is latest stable | MEDIUM | Run `npm info @storybook/react-native version` — v8 may be stable by March 2026 |
| Expo SDK 52 = React Native 0.76 | HIGH | Verify expo.dev/changelog |
| `react-native-reanimated` v3 required by NativeWind v4 | HIGH | Verify nativewind.dev peer deps |
| `styled()` HOC removed in v4 | HIGH | Confirmed in NativeWind v4 migration guide |
