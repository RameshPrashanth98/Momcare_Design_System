# Project Research Summary

**Project:** Morph Maternity Design System
**Domain:** React Native Internal Component Library — Maternal Healthcare Mobile App
**Researched:** 2026-03-15
**Confidence:** MEDIUM-HIGH (training data, knowledge cutoff Aug 2025; external web tools unavailable during research)

---

## Executive Summary

The Morph Maternity Design System is an internal React Native component library built on Expo SDK + NativeWind v4 + Storybook React Native v7. This is a well-understood domain — production design system patterns from React Native Paper, Gluestack UI, and Shopify Restyle provide clear blueprints. The recommended approach is a strict token-first architecture: all brand values (colors, typography, spacing, radius, shadows) live in typed TypeScript token files that feed into `tailwind.config.ts`, which NativeWind then exposes as Tailwind class names across all components. Components consume only class names — never raw token values — creating a single update point for design changes.

The healthcare context adds non-negotiable constraints that differentiate this system from generic component libraries: WCAG 2.1 AA accessibility compliance, 44pt minimum touch targets, color-independent error communication, and strict form validation patterns for clinical data entry. All of these must be designed into components from the start, not retrofitted. The Morph Maternity brand (Cormorant Garamond display, DM Sans body, rose/cream/sage palette) also adds font loading complexity in Expo that must be resolved in Phase 1 before any typography components are built.

The primary risk in this project is the NativeWind v4 migration surface: v4 is a ground-up rewrite from v2/v3 with completely different Babel, Metro, and CSS configuration. The majority of tutorials, blog posts, and Stack Overflow answers describe v2/v3 patterns. Following outdated documentation produces silent style failures that are difficult to diagnose. Phase 1 must establish and lock the correct v4 configuration — including a smoke test of the NativeWind + Storybook + Expo combination — before any component development begins. The date/time picker is a secondary risk requiring an early architectural decision (native OS picker vs custom component) because it blocks the form component phase.

---

## Key Findings

### Recommended Stack

The stack is largely pre-determined by the project (Expo + NativeWind v4) and has no serious contenders. The main decisions within the stack are version selection and configuration approach. Expo SDK 51 or 52 (matching the Momcare app exactly) runs React Native 0.74–0.76 and React 18; do not install these independently. NativeWind v4 must be pinned against Tailwind CSS v3.4.x — Tailwind v4 is not yet supported by NativeWind. Storybook React Native v7.6.x is the stable on-device choice; v8 may be stable by March 2026 but requires verification before adoption.

**Core technologies:**
- **Expo SDK 51/52**: Managed workflow runtime — must match the Momcare app's Expo version exactly; version mismatch causes peer dependency conflicts
- **NativeWind v4**: Tailwind utility classes for React Native — the only production-ready Tailwind-syntax styling solution for RN; v4 is a complete rewrite with CSS variable support
- **Tailwind CSS 3.4.x**: NativeWind's CSS processor — pin to 3.4; do NOT upgrade to Tailwind v4 until NativeWind explicitly supports it
- **Storybook React Native v7**: On-device component explorer — correct choice for a RN-only project; use `@storybook/react-native`, not `@storybook/react`
- **TypeScript 5.x**: Type safety throughout — non-negotiable for a design system that will outlive individual contributors
- **class-variance-authority (cva)**: Variant prop management — prevents dynamic class string construction (a hard constraint of NativeWind v4's compile-time transform)
- **clsx + tailwind-merge**: The `cn()` utility — handles conditional and merged class names correctly in all components

**Critical version constraint:** Do not use `styled()` HOC (removed in NativeWind v4), `nativewind/babel` plugin (v2 approach), or Tailwind CSS v4. All three silently break the styling system.

### Expected Features

The component scope is well-defined by the project specification. Research confirms the component list is correctly scoped for a healthcare app — form-heavy, data-display-rich, navigation-standard. The feature dependency tree is clear: tokens must precede primitives, primitives must precede composites, safe area context must precede any navigation component.

**Must have (table stakes):**
- Design token system (colors, typography, spacing, radius, shadows) — everything else depends on this
- Text input with label, error state, required indicator, disabled state — healthcare forms require this
- Pressable base with visual feedback and 44pt minimum touch targets — non-negotiable WCAG 2.1
- Button variants (primary, secondary, ghost, destructive) with loading and disabled states
- Form components: Textarea, Password input, Checkbox, Dropdown/Select, Search bar
- Bottom navigation bar with safe area handling — standard mobile nav pattern
- Badge / status chip with text labels (not color-only) — clinical status communication
- Error states that are not color-dependent (text + icon, not just red border)
- Keyboard avoidance for forms — required on both iOS and Android

**Should have (differentiators for healthcare excellence):**
- Variant-first prop API (`variant="primary"`, `size="md"`) rather than raw className strings — prevents token drift
- `ref` forwarding on all inputs — enables programmatic focus management across long clinical forms
- `testID` prop forwarding on all components — enables E2E testing with Detox/Maestro
- Timeline component — prenatal care has inherent temporal structure; no standard library provides this
- Skeleton loading screens — better perceived performance for data-heavy clinical screens
- Bilingual / RTL layout readiness — MOH context may serve multilingual populations

**Defer to v2+:**
- Dark mode token layer — not in scope; adds token complexity with no current need
- Custom icon set — icon library is TBD; premature commitment causes rework
- Complex animation sequences (Reanimated) — basic RN Animated sufficient for v1
- Calendar component — evaluate whether Timeline component covers v1 appointment display needs
- Snackbar / Toast library — use OS alerts for now
- Internationalization framework — accept label props as strings; let app layer handle translations

### Architecture Approach

The architecture is a strict 4-layer pipeline: (1) TypeScript token files as the single source of brand truth, (2) `tailwind.config.ts` extending the Tailwind theme with token values, (3) NativeWind JSX transform converting class names to StyleSheet at build time, and (4) components consuming only Tailwind class names. Components never import token files directly. Each component lives in its own folder (`ComponentName.tsx`, `ComponentName.types.ts`, `ComponentName.stories.tsx`, `index.ts`) co-located with its Storybook story. A 9-layer build dependency graph governs the implementation order.

**Major components and architecture layers:**
1. **Token system (`tokens/*.ts`)**: Plain TypeScript constants for all brand values — framework-agnostic, typed, single update point
2. **Primitive components (`src/components/primitives/`)**: Text, Icon, Badge — unstyled or minimally styled bases that accept `className` for extension
3. **Form components (`src/components/forms/`)**: All inputs, TextInput as base with PasswordInput/SearchBar/DatePickerInput extending it
4. **Action components (`src/components/actions/`)**: Buttons, FAB, ToggleSwitch — composed from Pressable and Text primitives
5. **Navigation components (`src/components/navigation/`)**: BottomNavBar, TopAppBar — depend on primitives and safe area context
6. **Data display (`src/components/data-display/`)**: Timeline, Calendar, StatCard — highest complexity, built last
7. **Layout / shell (`src/components/layout/`)**: MobileShell, ScrollableContent — wraps everything; depends on navigation layer

**Key patterns to enforce:**
- `cn()` utility (clsx + tailwind-merge) on every component for conditional class merging
- `React.forwardRef` on every input component
- Variant-first props via `cva` — never dynamic template literal class strings
- Named exports only — no default exports (enables tree-shaking, prevents renaming inconsistency)
- Accessibility props (`accessibilityLabel`, `accessibilityRole`, `accessibilityState`) as first-class interface members, not spread via `...rest`

### Critical Pitfalls

1. **NativeWind v4 outdated tutorial trap** — The majority of search results describe v2/v3 configuration (`styled()` HOC, `nativewind/babel` plugin, different Metro setup). Following them produces silent style failures. Mitigation: use only `nativewind.dev/v4` documentation; add comments in `babel.config.js` and `metro.config.js` marking them as v4 configs; discard any result showing `styled()` wrapper usage.

2. **Dynamic class string construction** — NativeWind v4 resolves classes at compile time. Template literals like `` `text-${color}-500` `` are never seen by the transform; styles silently do nothing. Mitigation: establish `cva` as the variant pattern before writing the first variant component; add a code review checklist item banning template literals inside `className`.

3. **Babel / Metro config conflicts** — Expo's managed workflow and NativeWind v4 each require precise Babel and Metro configuration. Wrong order or missing wrappers cause Metro crashes or silent style failures. Mitigation: lock the exact working `babel.config.js` and `metro.config.js` into the repo after Phase 1 smoke test; run `npx expo start --clear` after any config change.

4. **Storybook entry point conflict with Expo Router** — Storybook RN v7 needs to hijack the app entry point, but Expo Router owns it. Naively following Storybook docs breaks routing. Mitigation: use the `EXPO_PUBLIC_STORYBOOK=true` env-var toggle pattern; never modify `package.json` `main` to point at Storybook; keep all stories outside the `app/` directory.

5. **Custom font loading race condition** — `useFonts` is async; components render with system fonts until fonts load. Storybook stories bypass the app-level font loading gate. Mitigation: `SplashScreen.preventAutoHideAsync()` in the app root; font-loading decorator in `.storybook/preview.tsx`; verify font key names in `useFonts` match exactly the token values in `tailwind.config.ts`.

---

## Implications for Roadmap

Based on the combined research, 6 phases are recommended. The ordering is strictly driven by the build dependency graph identified in ARCHITECTURE.md and the Phase 1 concentration of all critical pitfalls.

### Phase 1: Foundation & Infrastructure

**Rationale:** Every component depends on the token system. Every component is developed in Storybook. Every style depends on the NativeWind + Metro + Babel configuration being correct. All 5 critical pitfalls manifest here. Nothing else can start until this is verified with a smoke test. This is the highest-risk phase and must be treated as blocking.

**Delivers:**
- Expo project scaffold with NativeWind v4 fully configured and verified
- Design token TypeScript files for all 7 token categories (colors, typography, spacing, radius, shadows, borders, grid)
- `tailwind.config.ts` extending Tailwind theme with all Morph Maternity brand values
- Storybook React Native v7 running on-device with env-var toggle, NativeWind styles working inside stories
- Font loading setup for Cormorant Garamond, DM Sans, DM Mono with Storybook decorator
- Token showcase stories confirming every color, spacing, and typography token renders correctly on both iOS and Android
- `cn()` utility and `cva` variant pattern documented and enforced

**Addresses:** Design token system, typography scale, color palette, spacing, shadows, border radius
**Avoids:** Pitfalls 1 (v2/v3 tutorial trap), 2 (dynamic classes), 3 (Babel/Metro config), 4 (Storybook entry), 5 (font loading race), 7 (token not applying), 12 (Tailwind content paths), 16 (missing global.css in Storybook)

### Phase 2: Core Primitives

**Rationale:** Text, Badge, Icon, and the Pressable feedback primitive are building blocks for every other component. Navigation, forms, and actions all compose from these. The WCAG touch target requirement must be encoded in the Pressable base here — it cannot be retrofitted across 30+ components later.

**Delivers:**
- Text primitive (all font variants, sizes, weights; semantic heading hierarchy)
- Badge / status chip (color + text label, not color-alone; accessible status communication)
- Pressable base (44pt minimum, feedback states: opacity iOS, ripple Android, disabled)
- ToggleSwitch, TextLinkPair
- Decision checkpoint on icon library (this phase is gated by that decision; see Research Flags)

**Addresses:** Pressable base, Badge, Text truncation, disabled state handling, minimum touch targets
**Avoids:** Pitfall 2 (dynamic classes — cva established here for variants), Pitfall 14 (flex defaults)

### Phase 3: Form Components

**Rationale:** Forms are the largest component group and represent the healthcare critical path. Text input is the base from which PasswordInput, SearchBar, DatePickerInput, and Textarea all extend. The group must be built in order: base input first, then extensions. Date/time picker requires an early architectural decision (native OS vs custom) that must be resolved before this phase begins.

**Delivers:**
- TextInput (label, error state with text+icon, required indicator, disabled, readonly)
- PasswordInput, Textarea, SearchBar (all extending TextInput)
- Checkbox, Dropdown/Select, FormSectionHeader, FormActionRow, FilterChips
- DatePickerInput and TimePickerInput (after architectural decision on native vs custom)
- `ref` forwarding and `returnKeyType="next"` on all inputs for focus chain management
- Error prevention patterns (inline validation on blur, confirmation for destructive submits)

**Addresses:** All form table stakes, WCAG error communication, keyboard avoidance, focus management
**Avoids:** Pitfall 8 (date picker cross-platform — resolved by pre-phase decision), Pitfall 10 (cssInterop on any third-party picker)

### Phase 4: Actions & Navigation

**Rationale:** Buttons, FAB, and BottomNavBar are all composed from Phase 2 primitives. Navigation components depend on safe area context being correctly integrated. This phase is well-understood and low-risk after Phase 2 is solid.

**Delivers:**
- Button (all variants: primary, secondary, outline, ghost, destructive) with loading and disabled states
- FAB, BottomActionBar, OnboardingNavRow
- BottomNavBar with safe area insets, badge support, active indicators
- TopAppBar, LanguageToggle

**Addresses:** Button variants, bottom nav, top app bar, badge on nav items, loading states
**Avoids:** Pitfall 15 (Platform.OS style checks — use NativeWind `ios:`/`android:` variants)

### Phase 5: Data Display

**Rationale:** Data display components (Timeline, StatCard, Calendar) are the most complex and have the most bespoke logic. They depend on primitives and form components being stable. Timeline in particular is a custom component with no library equivalent — it needs dedicated implementation time. Calendar's scope should be evaluated against the Timeline component before committing.

**Delivers:**
- StatCard, structured data display (key-value pairs)
- Timeline component (pregnancy/prenatal temporal structure)
- Calendar component (if scoped in) or deferred to v2

**Addresses:** Data display excellence, appointment visualization
**Avoids:** Pitfall 9 (web Storybook vs native divergence — especially critical for layout-sensitive components like Calendar)

### Phase 6: Layout & Shell

**Rationale:** Shell components (MobileShell, ScrollableContent) wrap navigation, so they must come after navigation components are stable. This phase is primarily integration and assembly work — lower complexity than earlier phases but requires all previous layers to be solid.

**Delivers:**
- MobileShell (header/content/footer slot composition)
- ScrollableContent with keyboard avoidance
- SectionDivider, EmptyFooter
- Full component export barrel (`src/index.ts`) verified

**Addresses:** Safe area shell, scrollable content areas, empty states
**Avoids:** Pitfall 4 (Storybook entry — shell must not interfere with Storybook mounting)

---

### Phase Ordering Rationale

- **Phases 1-2 are strictly sequential** due to NativeWind configuration and token dependencies — no component work can start until Phase 1 smoke test passes.
- **Phase 3 (Forms) precedes Phase 4 (Navigation)** because form inputs are the healthcare app's core interaction surface and have the most complex accessibility requirements; navigation is lower complexity.
- **Phase 5 (Data Display) follows Phase 4** because Timeline and Calendar use primitives, inputs (date picker), and layout patterns from all prior phases.
- **Phase 6 (Shell) is last** because it wraps everything and its correctness depends on all contained components being stable.

### Research Flags

Phases requiring deeper research or a spike before implementation:

- **Phase 1 — NativeWind v4 + Storybook combined Metro config**: The exact composition order of `withNativeWind` and any Storybook Metro preset is a MEDIUM-confidence finding. Run a spike on Day 1 of Phase 1; do not assume it works without a verified smoke test. Check current NativeWind v4 docs and `@storybook/react-native` GitHub releases for post-Aug 2025 changes.
- **Phase 3 — Date/Time Picker**: Requires a dedicated research spike before the phase begins. Decision needed: native OS picker (`@react-native-community/datetimepicker`) vs `react-native-date-picker` (mrousavy) vs custom built from FlatList + NativeWind. Each has different scope, brand consistency, and accessibility trade-offs.
- **Phase 2 — Icon Library**: Icon library is TBD per project spec. This decision gates Phase 2 (IconTextButton, FAB) and Phase 4 (TopAppBar). Needs resolution before Phase 2 begins. If using a third-party icon library, `cssInterop` registration is required (Pitfall 10).

Phases with well-established patterns (skip deep research):

- **Phase 4 (Actions/Navigation)**: Standard RN patterns; compound component pattern for BottomNavBar is well-documented.
- **Phase 6 (Layout/Shell)**: Slot-based composition is a standard pattern; no novel technical challenges after Phases 1-5 are complete.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | MEDIUM | Core technology choices are certain; specific version compatibility (NativeWind v4 + Tailwind v3.4 + Expo SDK 52) should be verified with `npm info` commands before locking `package.json`. Storybook v8 status unknown. |
| Features | HIGH | Component list is first-party (PROJECT.md). Production design system patterns from RN Paper, Gluestack, Restyle are well-understood. WCAG 2.1 is a stable standard. |
| Architecture | HIGH | Token pipeline and component composition patterns are standard and validated across multiple production systems. NativeWind v4 preset/plugin distinction is a documented breaking change with high confidence. |
| Pitfalls | HIGH | NativeWind v4 compile-time constraints (dynamic classes, cssInterop) are behavioral facts of the transform design. Font loading race condition and date picker cross-platform issues are structural React Native limitations. Storybook/Expo Router conflict is MEDIUM — may have improved post-Aug 2025. |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **Exact package versions**: All version numbers are from training data (cutoff Aug 2025). Run `npm info nativewind version`, `npm info @storybook/react-native version`, `npm info expo version` before creating `package.json`. NativeWind v4 + Tailwind v4 compatibility may have shipped by March 2026.
- **Storybook v8 stability**: As of training data, `@storybook/react-native` v8 was in active development. Verify whether v8 is now stable — it may simplify Expo Router integration.
- **Expo Router + Storybook integration**: The env-var toggle pattern is MEDIUM confidence. Current `@storybook/react-native` GitHub releases may have a simpler official solution for Expo Router projects.
- **Cormorant Garamond Google Fonts package**: May or may not be available as `@expo-google-fonts/cormorant-garamond`. If unavailable, manual `.ttf` file loading in `/assets/fonts/` is the fallback. Verify before Phase 1.
- **Icon library selection**: TBD by project stakeholders. Decision needed before Phase 2. Common options: `@expo/vector-icons` (bundled with Expo, no cssInterop needed), `lucide-react-native`, `react-native-heroicons`. Each has different `cssInterop` requirements.

---

## Sources

### Primary (HIGH confidence)
- PROJECT.md — first-party source for component list, brand spec, and project constraints
- NativeWind v4 documentation (training data, nativewind.dev/v4) — compile-time transform behavior, breaking changes from v2/v3
- WCAG 2.1 guidelines — stable accessibility standard, no version concerns
- React Native core API — `forwardRef`, `Pressable`, `accessibilityRole` patterns
- Expo documentation — Metro config, Babel config, font loading, managed workflow constraints

### Secondary (MEDIUM confidence)
- Storybook React Native v7 documentation (training data) — CSF3 format, addon config, Expo Router integration
- React Native Paper v5 / Gluestack UI v2 / Shopify Restyle — component API patterns for variant-first design

### Tertiary (LOW confidence — verify before implementation)
- Specific NativeWind v4 Metro config composition with Storybook — may have changed post-Aug 2025
- Storybook v8 RN stability status — unknown as of training data cutoff
- NativeWind v4 + Tailwind CSS v4 compatibility — may have shipped by March 2026

---

*Research completed: 2026-03-15*
*Ready for roadmap: yes*
