# Morph Maternity Design System

## What This Is

A React Native + Expo component library and design token system for the Momcare app — a maternal health clinic application by MOH (Ministry of Health). Built from the Morph Maternity brand design system, it provides a complete set of styled, accessible, Storybook-documented UI components that the Momcare app consumes directly.

## Core Value

Developers building the Momcare app should be able to assemble any screen using design system components without ever writing one-off styles — every pixel traces back to a design token.

## Requirements

### Validated

(None yet — ship to validate)

### Active

**Foundations**
- [ ] Design tokens implemented as NativeWind / Tailwind theme extensions (colors, typography, spacing, radius, shadow)
- [ ] CSS custom properties mirror for web-target Storybook rendering
- [ ] Fonts configured: Cormorant Garamond (display), DM Sans (body), DM Mono (code)
- [ ] Tailwind config extended with all Morph Maternity tokens

**Navigation Components**
- [ ] Bottom nav bar
- [ ] Top app bar
- [ ] Language toggle

**Primitive / Status Components**
- [ ] Badges & status indicators

**Form Components**
- [ ] Text input field
- [ ] Date picker input
- [ ] Time picker input
- [ ] Dropdown / Select
- [ ] Textarea
- [ ] Checkbox
- [ ] Password input
- [ ] Search bar
- [ ] Form section header
- [ ] Filter dropdown chips
- [ ] Form action row

**Action / Button Components**
- [ ] Primary button
- [ ] Secondary / outline button
- [ ] Icon text button
- [ ] FAB (Floating Action Button)
- [ ] Bottom action bar
- [ ] Toggle switch
- [ ] Text link pair
- [ ] Onboarding nav row

**Data Display Components**
- [ ] Data display components (tables, lists, stats)
- [ ] Timeline & Calendar components

**Layout / Shell Components**
- [ ] Mobile shell
- [ ] Scrollable content area
- [ ] Section divider with label
- [ ] Empty / info footer

**Storybook**
- [ ] Full Storybook docs for every component: controls, variants, usage notes, accessibility info

### Out of Scope

- React web components — this is React Native / Expo only; web-target is Storybook preview only
- Design tokens as standalone NPM package — internal to Momcare app only
- Authentication / business logic — pure UI layer, no app logic
- Custom icon set — icon library to be confirmed against brand guidelines (Phosphor, Feather, or custom)
- Dark mode — not in v1 scope; Morph Maternity brand is light-only
- Animation library — basic React Native Animated is fine; no Reanimated complex sequences in v1

## Context

- **Design reference**: `morph-maternity-design-system.html` — a complete visual spec of all design tokens (colors, typography, spacing, elevation, grid, radius, borders, iconography). This is the source of truth for all token values.
- **Brand**: Morph Maternity — soft, feminine, warm. Rose (primary), Cream (secondary), Sage (accent) palettes. Cormorant Garamond for display, DM Sans for body.
- **App**: Momcare — maternal health clinic app. MOH (Ministry of Health) context suggests a healthcare / government-adjacent product.
- **Component list**: Derived from actual Momcare app screens — these are the exact components needed, not theoretical.
- **Storybook**: React Native Storybook (v7+) with on-device and web rendering.

## Constraints

- **Tech Stack**: React Native + Expo + TypeScript + NativeWind v4 + Storybook — all decisions final
- **Styling**: NativeWind v4 only — no StyleSheet-only components, no inline styles; all classes from Tailwind/NativeWind
- **Tokens**: Must exactly match the HTML spec values — no approximations
- **Iconography**: Icon library TBD — confirm against Morph Maternity brand guidelines before implementing icon components
- **Scope**: Internal Momcare app use only — no external consumers, no semantic versioning requirements for v1

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| NativeWind v4 over bare StyleSheet | User specified Tailwind syntax; NativeWind is the only viable path for RN | — Pending |
| Storybook for documentation | User specified; provides visual regression baseline and design handoff | — Pending |
| Component-first build order (Foundations → Primitives → Forms → Nav → Layout) | Primitives have no dependencies; forms and nav build on primitives | — Pending |
| Icon library deferred | Brand guideline confirmation needed before committing to Phosphor/Feather/custom | — Pending |

---
*Last updated: 2026-03-15 after initialization*
