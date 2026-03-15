# Domain Pitfalls: React Native Design System

**Domain:** React Native design system — Expo + NativeWind v4 + Storybook RN v7
**Project:** Morph Maternity Design System
**Researched:** 2026-03-15
**Confidence note:** Web tools unavailable. All findings drawn from training data (cutoff Aug 2025) covering NativeWind v4 stable, Expo SDK 51/52, and Storybook RN v7. Flagged where post-Aug 2025 changes may have occurred.

---

## Critical Pitfalls

Mistakes that cause rewrites, days of lost work, or broken builds that are hard to diagnose.

---

### Pitfall 1: Using NativeWind v2/v3 Tutorials for a v4 Project

**What goes wrong:** NativeWind v4 is a ground-up rewrite. The core mental model changed: v4 uses a Babel/SWC transform that compiles className to StyleSheet at build time, replacing the runtime CSS-in-JS approach of v2. Tutorials published before mid-2024 — and the majority of blog posts, YouTube guides, and Stack Overflow answers — describe v2/v3 setup. Following them for a v4 project produces subtle, maddening failures: styles silently do nothing, theme values don't apply, and dynamic class strings break entirely.

**Why it happens:** NativeWind v4 was in beta for a long time. The npm registry still surfaces older versions. Search engines return outdated tutorials. The package name (`nativewind`) is the same, so developers don't notice the version difference until things fail.

**Consequences:**
- `withNativeWind` wrapper in `metro.config.js` is v4-specific; v2 used a different Metro config approach. Mixing them causes Metro bundler crashes.
- In v4, `styled()` HOC from v2 is gone. Code using it silently fails or throws.
- v4 requires `preset: 'nativewind/babel'` in `babel.config.js` — not `nativewind/babel-plugin` (v2 name). Wrong name = no styles, no error.
- `cssInterop` (v4 API) has no equivalent in v2 tutorials.

**Prevention:**
- Pin to exact NativeWind v4 version from day one: `nativewind@^4.0.0`.
- Use ONLY the official NativeWind v4 docs at `nativewind.dev/v4/`.
- Add a comment in `babel.config.js` and `metro.config.js` noting "v4 config — do not follow v2/v3 tutorials".
- When searching for help, always append "nativewind v4" to queries. Discard any result that shows `styled()` wrapper usage.

**Detection:**
- Classes applied but no visual effect → likely v2 tutorial config mixed into v4 project
- `Error: Cannot find module 'nativewind/babel-plugin'` → using v2 plugin name
- `styled is not a function` → v2 API used in v4 project

**Phase to address:** Phase 1 (Foundation setup) — get this right before a single component is built.

---

### Pitfall 2: NativeWind v4 Dynamic Class Strings Are Not Supported

**What goes wrong:** A foundational NativeWind v4 constraint that catches most component authors: you cannot construct class names dynamically with string concatenation or template literals. NativeWind's Babel transform resolves classes at compile time by statically analyzing source. If a class string is assembled at runtime, the transform never sees it, the style is not generated, and nothing renders.

**Why it happens:** This is a Tailwind-by-design constraint (Tailwind has the same limitation for web). But coming from a web background or from React Native StyleSheet (which is fully dynamic), developers instinctively write variant logic as string construction.

**Consequences:**

```typescript
// BROKEN — string concatenated at runtime, NativeWind never generates the class
const color = isError ? 'red' : 'rose';
<Text className={`text-${color}-500`} />

// CORRECT — full class strings present in source, Babel transform sees them
<Text className={isError ? 'text-red-500' : 'text-rose-500'} />
```

This affects every component that has color variants, size variants, state variants (disabled, error, focused). It is the single most common source of "my variants don't work" bugs in design system components.

**Prevention:**
- Establish a `variants` pattern using `clsx`/`cva` from day one. Never construct partial class strings.
- Document the pattern in a `CONTRIBUTING.md` before any components are written.
- Use `class-variance-authority` (cva) which is well-suited to NativeWind v4: define all variant classes as complete strings in the cva definition.
- Add an ESLint rule or code review checklist item: "No template literals inside `className`."

**Detection:**
- Variant styles don't apply even though className is correct at runtime
- Works in Storybook (sometimes) but not on device — due to different transform pipelines
- Console shows no error; styles just silently do nothing

**Phase to address:** Phase 1 (establish coding conventions) and Phase 2 (first components). Must be established before the first variant component is written.

---

### Pitfall 3: Expo Managed Workflow Babel Config Conflicts

**What goes wrong:** Expo managed workflow owns the Babel and Metro configuration. NativeWind v4 requires specific modifications to both. If these modifications are applied incorrectly — wrong order in the plugins array, missing `withNativeWind` in metro config, or conflicting with `babel-preset-expo` — the result ranges from silent style failures to Metro bundler crashes that produce cryptic error messages pointing at internal Metro files rather than the actual misconfiguration.

**Why it happens:** Expo's `babel-preset-expo` must remain the base preset. NativeWind v4 adds to it. The exact integration point matters: NativeWind's preset must come after `babel-preset-expo` in the config, and `withNativeWind` wraps the entire Metro config. Getting the nesting wrong is easy.

**Consequences:**
- NativeWind transform doesn't run → all classes silently do nothing
- Metro bundler crashes with internal module resolution errors
- CSS variables (used for design tokens) not processed
- `tailwind.config.js` `content` paths not scanned → custom tokens missing

**Prevention:**

Exact correct `babel.config.js` for NativeWind v4 + Expo:
```javascript
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

Exact correct `metro.config.js`:
```javascript
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

- Commit these files immediately after setup and mark them as "do not edit without testing."
- Run `npx expo start --clear` after any change to either file.
- Add `global.css` with `@tailwind base; @tailwind components; @tailwind utilities;` — NativeWind v4 requires this CSS entry point.

**Detection:**
- Styles work in isolation but token colors don't apply
- `npx expo start` exits immediately with a Metro error mentioning `require` or module resolution
- Adding a new Tailwind class has no effect even after restarting Metro

**Phase to address:** Phase 1 (project scaffold). Verify with a smoke-test component before proceeding.

---

### Pitfall 4: Storybook RN v7 Entry Point Conflicts With Expo Router

**What goes wrong:** Storybook React Native v7 requires hijacking the app entry point (`index.js` or the Expo entry) to mount the Storybook UI instead of the app. With Expo Router (file-based routing), the entry point is managed by `expo-router/entry` and cannot simply be replaced. Naively following the Storybook RN v7 docs — which assume a non-Expo-Router project — breaks Expo Router navigation globally and is difficult to undo.

**Why it happens:** Expo Router made `app/` directory the canonical entry point. Storybook RN v7 was designed for projects using a manual `AppRegistry.registerComponent` entry. The two systems fight over who owns the root component.

**Consequences:**
- Storybook works but the app doesn't load (router never initializes)
- App works but Storybook doesn't render stories
- Both broken when switching between modes requires manual file edits that are easy to forget or get wrong

**Prevention:**
- Use the environment variable toggle pattern: `EXPO_PUBLIC_STORYBOOK=true npx expo start` conditionally mounts Storybook.
- In `app/index.tsx` (or the Expo Router root), check the env var and render `StorybookUIRoot` vs normal app.
- Do NOT modify `package.json` `main` to point at Storybook entry — this breaks Expo Router.
- Keep Storybook stories in a `src/stories/` directory entirely outside the `app/` router directory.
- The Storybook RN v7 `@storybook/react-native` package provides a `StorybookUIRoot` export specifically for this toggle pattern.

**Detection:**
- App shows blank screen after Storybook setup
- Expo Router logs "No routes matched" after Storybook integration
- Having to manually comment/uncomment code to switch between app and Storybook

**Phase to address:** Phase 1 (Storybook scaffold). Establish the toggle pattern before writing any stories.

---

### Pitfall 5: Storybook RN v7 Metro Resolver Conflicts With NativeWind

**What goes wrong:** Storybook RN v7 adds its own Metro configuration (`@storybook/react-native/metro-preset`) for story file discovery. When combined with NativeWind's `withNativeWind` Metro wrapper, the two can interfere: wrong composition order, missing story globs not being resolved, or the NativeWind CSS transform not applying inside Storybook's sandbox.

**Why it happens:** Both tools modify Metro's resolver and transformer config. Composing two Metro config wrappers requires careful ordering and understanding which wrapper should be outermost.

**Consequences:**
- Stories load but have unstyled components (NativeWind transform not running in Storybook context)
- Story discovery fails silently — stories exist but Storybook shows "no stories found"
- Metro crashes on startup when both configs are active

**Prevention:**
- NativeWind's `withNativeWind` must be the outermost wrapper: `withNativeWind(storybookConfig, ...)`.
- Verify NativeWind styles render correctly in at least one story before building the full component library.
- Use Storybook's `main.js` `stories` glob carefully — must match actual file paths.
- Test the combined Metro config with `--clear` on first setup.

**Detection:**
- Components render but all appear unstyled in Storybook
- `console.warn: StyleSheet.create called with invalid styles` errors in Storybook output
- Stories listed as "0 stories" despite `.stories.tsx` files existing

**Phase to address:** Phase 1 (Storybook scaffold + NativeWind integration). Requires a combined smoke test.

---

### Pitfall 6: Custom Font Loading Race Condition in Expo

**What goes wrong:** Expo's `useFonts` hook (from `expo-font`) is asynchronous. If any component renders before fonts finish loading, React Native falls back to the system font. In a design system with `Cormorant Garamond`, `DM Sans`, and `DM Mono` as brand fonts, this means every component can silently render with wrong typography — and developers may not notice because system fonts are visually similar enough to pass a quick glance.

**Why it happens:** React Native has no equivalent to CSS `font-display`. Font loading is imperative. The common pattern of wrapping the app in `<AppLoading>` or using `SplashScreen.preventAutoHideAsync()` solves the app-level race condition, but Storybook stories load independently and bypass the app's font loading gate.

**Consequences:**
- Storybook stories render with system fonts even when fonts are "working" in the app
- Screenshots and design review taken from Storybook are misleading
- Components look correct on first render but flash unstyled text on reload
- Font family names in NativeWind theme must exactly match the loaded font asset name (case-sensitive, including weight variant names)

**Prevention:**
- Use `expo-font` with `SplashScreen.preventAutoHideAsync()` in the app root — this is the correct pattern.
- In Storybook, create a decorator that loads fonts via `useFonts` before rendering any story. Register it as a global decorator in `.storybook/preview.js`.
- Font family names in `tailwind.config.js` must exactly match the `useFonts` key strings — test this explicitly.

Correct `useFonts` key naming (affects NativeWind `fontFamily` class resolution):
```javascript
useFonts({
  'CormorantGaramond-Regular': require('../assets/fonts/CormorantGaramond-Regular.ttf'),
  'CormorantGaramond-Italic': require('../assets/fonts/CormorantGaramond-Italic.ttf'),
  'DMSans-Regular': require('../assets/fonts/DMSans-Regular.ttf'),
  'DMSans-Medium': require('../assets/fonts/DMSans-Medium.ttf'),
  'DMMono-Regular': require('../assets/fonts/DMMono-Regular.ttf'),
});
```

- In `tailwind.config.js`, the `fontFamily` token values must exactly match these key strings.

**Detection:**
- Text renders in San Francisco (iOS) or Roboto (Android) instead of brand fonts
- Storybook typography looks different from device screenshots
- `console.warn: fontFamily 'CormorantGaramond' is not a system font` — React Native logs this; watch for it

**Phase to address:** Phase 1 (design tokens + fonts setup). Must be verified before any typography components are built.

---

### Pitfall 7: NativeWind v4 Theme Tokens Not Applying in Dark Mode or Platform Variants

**What goes wrong:** NativeWind v4 supports CSS custom properties for theming. When design tokens are defined as CSS variables in `global.css` and referenced in `tailwind.config.js`, they work on web but may not apply on native without explicit setup. The Morph Maternity design system is light-only for v1, so dark mode is out of scope — but platform variants (iOS vs Android) still affect color rendering, shadow implementation, and border radius behavior.

**Why it happens:** CSS variables are a web feature. NativeWind v4 bridges them to native via its transform, but the bridge requires the CSS entry point (`global.css`) to be properly imported at the app root. Missing that import means tokens are undefined.

**Consequences:**
- Custom token colors (`bg-rose-primary`, `text-cream-50`) render as transparent or fallback on native
- Shadows defined with `shadow-*` classes behave differently on iOS vs Android (iOS uses box-shadow, Android uses elevation)
- Border radius values from custom tokens may not apply if the CSS variable bridge isn't active

**Prevention:**
- Import `global.css` at the root of the app (e.g., in `app/_layout.tsx` for Expo Router): `import '../global.css';`
- Also import `global.css` in Storybook's `preview.js` — it won't be auto-discovered.
- For shadows: define two variants — `shadow-ios` and `shadow-android` — or use NativeWind's platform prefix (`ios:shadow-sm android:elevation-2`).
- Test each token category (color, spacing, radius, typography) on both platforms before declaring Phase 1 complete.

**Detection:**
- Custom token class applied but color shows as transparent or white
- Shadows visible on iOS but not Android (or vice versa)
- Works in Storybook web preview but not on device

**Phase to address:** Phase 1 (token validation). Add a token showcase story that renders every color, spacing, and typography token.

---

### Pitfall 8: Date/Time Picker Cross-Platform Inconsistency

**What goes wrong:** React Native has no built-in DateTimePicker component. The ecosystem solution (`@react-native-community/datetimepicker`) renders the native OS picker, which means iOS and Android look and behave completely differently — and neither matches a web design spec. The Momcare app requires date picker and time picker input components that are consistent with the Morph Maternity design system.

**Why it happens:** Native date pickers are OS UI — they use OS theming, not app theming. You cannot style them with NativeWind or any CSS. The iOS picker is a modal wheel; the Android picker is a dialog. Neither is easily branded.

**Consequences:**
- A custom-styled date picker requires building a full calendar component from scratch (significant scope)
- Using native pickers means accepting that date/time inputs will not match brand specs
- Third-party calendar components (`react-native-calendars`, `react-native-date-picker`) add significant bundle weight and may have their own styling systems incompatible with NativeWind

**Prevention:**
- Make a deliberate decision early: native OS picker (fast, accessible, off-brand) vs custom component (on-brand, significant build effort).
- For a healthcare app, accessibility of the native picker may outweigh brand consistency — document this tradeoff explicitly.
- If custom picker is required: build it as a modal with a scrollable list of dates/times using FlatList + NativeWind styling. Scope this as a separate, larger feature.
- `react-native-date-picker` (mrousavy) provides a more consistent cross-platform experience with some theming options — evaluate before building from scratch.
- Do NOT attempt to style the native OS picker with NativeWind or StyleSheet — it cannot be done.

**Detection:**
- Design review feedback: "the date picker doesn't match the design"
- iOS and Android screenshots show different UIs for the same component
- Attempting to add `className` to `DateTimePicker` — it accepts no such prop

**Phase to address:** Phase 3 or 4 (form components). Requires its own research spike before implementation.

---

### Pitfall 9: Storybook Web Preview vs On-Device Rendering Divergence

**What goes wrong:** Storybook React Native v7 supports two rendering modes: on-device (within Expo Go or a dev build) and web (via a companion web app). Developers naturally gravitate toward the web preview because it's faster to iterate. However, NativeWind styles, font rendering, shadow behavior, and touch interactions on web preview do not faithfully represent on-device behavior. Design decisions made purely from Storybook web preview will contain errors visible only on device.

**Why it happens:** Storybook web preview renders React Native components in a browser using `react-native-web`. NativeWind v4 on web and on native have different style resolution paths. Shadows, typography metrics, and layout flex behavior all differ between environments.

**Consequences:**
- Component looks pixel-perfect in web Storybook, broken on iOS
- Font sizes subtly wrong (web uses CSS rem; native uses device pixels)
- `Text` line heights, letter spacing, and font weight rendering differ across platforms
- Web preview becomes the de facto design reference even though it's not the actual target

**Prevention:**
- Establish a policy: **the on-device render is the source of truth**, not the Storybook web preview.
- Always verify components on both iOS simulator and Android emulator before marking them complete.
- Use Storybook web preview for rapid iteration only, not for design sign-off.
- Take design sign-off screenshots from a real device or iOS simulator, not from browser.

**Detection:**
- "Looks fine in Storybook" but issues reported when testing in Expo Go
- Font rendering looks different between web preview screenshots and device screenshots

**Phase to address:** Phase 1 (establish review protocol) and ongoing throughout all phases.

---

### Pitfall 10: `cssInterop` Not Applied to Third-Party Components

**What goes wrong:** NativeWind v4 only applies className-to-style transformation to components that have been registered with `cssInterop`. The built-in React Native components (`View`, `Text`, `Image`, `Pressable`, etc.) are pre-registered by NativeWind. Third-party components are not. Passing `className` to a third-party component does nothing unless `cssInterop` is explicitly called.

**Why it happens:** This is correct by design — NativeWind can't know the prop shape of every third-party component. But it means every third-party UI element used in the design system needs an explicit wrapper or `cssInterop` registration.

**Consequences:**
- Icon libraries: passing `className="text-rose-500"` to an icon component has no effect unless wrapped
- `react-native-calendars`, picker components, and other third-party UI: all NativeWind classes silently do nothing
- Developers spend time debugging "why doesn't color work" when the component simply isn't registered

**Prevention:**
- Create wrapper components for any third-party UI that needs NativeWind styling.
- Use `cssInterop(ThirdPartyComponent, { className: 'style' })` when wrapping is not appropriate.
- Document which components in the design system are wrappers vs native RN components.
- Test NativeWind class application explicitly for every new component category.

**Detection:**
- `className` prop accepted (no TypeScript error) but style not applied
- No error thrown — silent failure

**Phase to address:** Phase 2+ (any phase where third-party components are introduced).

---

## Moderate Pitfalls

---

### Pitfall 11: TypeScript Props Not Enforcing NativeWind className

**What goes wrong:** Component props typed as `{ className?: string }` are correct, but do not enforce that the string contains only valid Tailwind classes. The Tailwind CSS IntelliSense VSCode extension helps, but doesn't prevent invalid or mistyped class names at compile time.

**Prevention:**
- Accept that runtime type safety for Tailwind class strings is not achievable without specialized tools.
- Configure `tailwindcss-react-native` VSCode extension for autocomplete (verify it supports v4).
- Write snapshot tests for each component variant so that class changes are detected in CI.
- Use `cva` (class-variance-authority) for variant components — it enforces variant keys even if not the class strings themselves.

**Phase to address:** Phase 1 (TypeScript conventions).

---

### Pitfall 12: `tailwind.config.js` Content Paths Missing Storybook Story Files

**What goes wrong:** NativeWind/Tailwind scans `content` paths to discover classes. If `*.stories.tsx` files are not included, classes used only in stories (e.g., story wrappers, background colors in decorators) are purged and those classes don't generate styles.

**Prevention:**
```javascript
content: [
  "./app/**/*.{js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
  "./src/stories/**/*.{js,jsx,ts,tsx}",  // explicitly include stories
  "./.storybook/**/*.{js,jsx,ts,tsx}",   // include storybook config
],
```

**Detection:**
- A class works in the app but not in Storybook stories
- Adding a class to a story wrapper has no effect

**Phase to address:** Phase 1 (Tailwind config).

---

### Pitfall 13: Expo SDK Version Lock-In for NativeWind and Storybook

**What goes wrong:** NativeWind v4 and Storybook RN v7 both have peer dependencies on specific Expo SDK versions. Expo SDK releases (typically 2x/year) can break both tools' peer dependencies simultaneously, forcing a coordinated upgrade at an inconvenient time.

**Prevention:**
- Lock the Expo SDK version at project start and do not upgrade during active development.
- Check NativeWind v4 and `@storybook/react-native` changelogs/issues for Expo SDK compatibility before any upgrade.
- Use `expo install` for all Expo-adjacent packages — it resolves compatible versions automatically.

**Phase to address:** Phase 1 (dependency management). Add a `VERSIONS.md` note documenting locked versions.

---

### Pitfall 14: Flex Layout Differences Between Expo Web and Native

**What goes wrong:** React Native's flex model defaults differ from CSS flexbox. `flexDirection` defaults to `'column'` (not `'row'`). `alignItems` defaults to `'stretch'`. These defaults are correct in RN but differ from web defaults, causing layout bugs for developers with web backgrounds.

NativeWind v4 on native uses RN's flex defaults; on web preview it uses CSS flexbox. This means layout components can look different between platforms.

**Prevention:**
- Always explicitly set `flex-row` or `flex-col` — never rely on direction defaults.
- Test layout components on native, not just web preview.
- Document layout component flex behavior in Storybook controls.

**Phase to address:** Phase 2 (primitive layout components).

---

## Minor Pitfalls

---

### Pitfall 15: `Platform.OS` Checks Inside NativeWind className Strings

**What goes wrong:** NativeWind v4 provides `ios:` and `android:` platform prefixes as Tailwind variants. Some developers reach for `Platform.OS === 'ios' ? 'class-a' : 'class-b'` instead. This is the dynamic class string problem (Pitfall 2) in a platform-specific guise, and the ternary creates dynamic strings that aren't statically analyzable.

**Prevention:**
- Use NativeWind v4 platform variants: `ios:shadow-sm android:elevation-2`.
- Reserve `Platform.OS` checks for logic (not styles) inside component code.

**Phase to address:** Phase 2+ (any component with platform-specific styling).

---

### Pitfall 16: Missing `global.css` Import in Storybook Preview

**What goes wrong:** NativeWind v4 requires `global.css` to be imported at the root. Storybook's preview environment has its own root separate from the app root. If `global.css` is not imported in `.storybook/preview.js`, all NativeWind styles are missing in Storybook.

**Prevention:**
- Add `import '../global.css';` to `.storybook/preview.js` explicitly.
- This is separate from the app-level import and must be maintained independently.

**Phase to address:** Phase 1 (Storybook scaffold).

---

### Pitfall 17: Storybook `@storybook/react-native` vs `@storybook/react` Confusion

**What goes wrong:** Storybook for React Native (`@storybook/react-native`) and Storybook for React (`@storybook/react`) are different packages with different configurations. NPM articles, tutorials, and even some official Storybook pages default to the React (web) package. Installing the wrong one and following its setup guide wastes significant time.

**Prevention:**
- Always verify the package is `@storybook/react-native` in `package.json`.
- All documentation lookups should include "react native" in the query.
- The on-device Storybook server (`@storybook/react-native/server`) is specific to the RN package and has no web equivalent.

**Phase to address:** Phase 1 (Storybook setup).

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Project scaffold (Phase 1) | Babel/Metro config conflict between NativeWind and Expo | Follow v4 docs exactly; smoke test before proceeding |
| Design tokens setup (Phase 1) | CSS variable tokens not applying on native | Import `global.css` at app root AND in Storybook preview |
| Font loading (Phase 1) | Font loading race condition; font name mismatch | Font decorator in Storybook; exact key matching |
| Storybook scaffold (Phase 1) | Entry point conflict with Expo Router | Use env-var toggle pattern, not `package.json` main override |
| First primitive components (Phase 2) | Dynamic className strings for variants | Establish cva pattern before first variant component |
| Third-party icon integration (Phase 2-3) | `cssInterop` not applied | Wrap icon components; test NativeWind color application |
| Form components — date/time (Phase 3-4) | Cross-platform native picker inconsistency | Decide early: native picker vs custom component; spike required |
| Layout components (Phase 2) | Flex direction defaults differ from web | Always explicit `flex-row`/`flex-col`; test on native |
| All component phases | Web Storybook vs native render divergence | On-device render is source of truth; policy established Phase 1 |
| Dependency upgrades (any phase) | Expo SDK upgrade breaks NativeWind + Storybook | Lock SDK version; check compatibility before any upgrade |

---

## Research Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| NativeWind v4 constraints (dynamic classes, cssInterop, Babel config) | HIGH | These are documented behavioral constraints of the compile-time transform design; unlikely to have changed |
| Expo managed workflow Babel/Metro integration | HIGH | Stable integration pattern, well-documented in NativeWind v4 docs (within training data) |
| Storybook RN v7 entry point / Expo Router conflict | MEDIUM | Pattern known from training data; Storybook RN v7 post-Aug 2025 releases may have simplified this |
| Font loading in Expo (race condition, key naming) | HIGH | This is a stable Expo behavior unrelated to NativeWind version |
| Date/time picker cross-platform issues | HIGH | This is a structural React Native limitation, not a library version issue |
| Storybook web preview vs native divergence | HIGH | Inherent to react-native-web rendering, will not change without architectural shift |
| Specific Metro config composition order | MEDIUM | May have changed in post-Aug 2025 NativeWind or Storybook releases — verify against current docs |

---

## Sources

- NativeWind v4 documentation (training data, nativewind.dev/v4) — HIGH confidence for compile-time transform constraints
- Expo documentation on font loading and managed workflow (training data) — HIGH confidence
- Storybook React Native v7 documentation (training data) — MEDIUM confidence; verify current docs for Expo Router integration pattern
- React Native community knowledge on date picker limitations — HIGH confidence (structural platform issue)
- Tailwind CSS content scanning behavior (applies equally to NativeWind) — HIGH confidence

**Verification recommended before Phase 1:**
- Check current NativeWind v4 Expo setup guide at `nativewind.dev` for any config changes post-Aug 2025
- Check `@storybook/react-native` GitHub releases for Expo Router integration updates
- Verify `@react-native-community/datetimepicker` current state and any new theming capabilities
