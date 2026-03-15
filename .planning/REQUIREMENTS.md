# Requirements: Morph Maternity Design System

**Defined:** 2026-03-15
**Core Value:** Developers building the Momcare app can assemble any screen using design system components without ever writing one-off styles — every pixel traces back to a design token.

## v1 Requirements

### Foundation & Infrastructure

- [x] **FOUN-01**: Expo + React Native + TypeScript project is scaffolded and builds successfully
- [x] **FOUN-02**: NativeWind v4 is installed and configured (tailwind.config.ts with preset, babel.config.js, metro.config.js, global.css) — verified with a smoke-test component
- [ ] **FOUN-03**: All Morph Maternity color tokens are defined in tailwind.config.ts (Rose, Cream, Sage, Neutral palettes, Status colors, Semantic tokens)
- [ ] **FOUN-04**: All typography tokens are configured (Cormorant Garamond, DM Sans, DM Mono fonts loaded; type scale xs–6xl; font weights 300–600; line heights)
- [ ] **FOUN-05**: All spacing tokens are defined (4px base grid, space-1 through space-48)
- [ ] **FOUN-06**: All radius tokens are defined (radius-none through radius-full)
- [ ] **FOUN-07**: All shadow/elevation tokens are defined (shadow-xs through shadow-2xl, shadow-inner)
- [ ] **FOUN-08**: Grid system breakpoints are configured (mobile 4-col, tablet 8-col, desktop 12-col)
- [ ] **FOUN-09**: Storybook React Native v7 is installed and runs on-device via Expo Dev Client
- [ ] **FOUN-10**: Storybook toggle pattern is established (env-var EXPO_PUBLIC_STORYBOOK separates app from Storybook entry point)
- [ ] **FOUN-11**: Storybook global decorator loads fonts before any story renders
- [ ] **FOUN-12**: `cva` (class-variance-authority) is installed and a variant coding convention is documented
- [ ] **FOUN-13**: Barrel exports (`index.ts`) are established and all components are importable from the root

### Primitives

- [ ] **PRIM-01**: `Text` component renders with correct font family, size, weight, and color from design tokens — via `variant` prop (display, heading, body, label, caption, mono)
- [ ] **PRIM-02**: `Badge` component renders status indicators in all variants (success, warning, error, info, neutral) with correct colors from design tokens
- [ ] **PRIM-03**: `Icon` component wraps Phosphor Icons with standardized size tokens (sm 16px, md 20px, lg 24px, xl 32px, 2xl 48px) and color prop
- [ ] **PRIM-04**: All primitive components have Storybook stories with full controls and accessibility documentation

### Form Components

- [ ] **FORM-01**: `TextInput` component renders with label, placeholder, error state, disabled state — all styled with Morph Maternity tokens; minimum 44pt touch target
- [ ] **FORM-02**: `PasswordInput` component extends TextInput with show/hide toggle (Phosphor eye icon)
- [ ] **FORM-03**: `SearchBar` component with leading search icon, clear button, and focused/unfocused states
- [ ] **FORM-04**: `Textarea` component with multiline support, character count (optional), and all states (default, focused, error, disabled)
- [ ] **FORM-05**: `Checkbox` component with checked, unchecked, indeterminate, and disabled states; minimum 44pt touch target
- [ ] **FORM-06**: `Dropdown` (Select) component with trigger, overlay list, selected state, and disabled state
- [ ] **FORM-07**: `DatePickerInput` — custom-built styled date picker matching Morph Maternity brand (no native OS picker)
- [ ] **FORM-08**: `TimePickerInput` — custom-built styled time picker matching Morph Maternity brand (no native OS picker)
- [ ] **FORM-09**: `FormSectionHeader` component renders category heading with optional description text
- [ ] **FORM-10**: `FilterChip` component — interactive pill for filter selection, with selected/unselected states
- [ ] **FORM-11**: `FormActionRow` component renders a row of form action buttons (e.g., Cancel / Submit) with correct spacing
- [ ] **FORM-12**: All form components have Storybook stories with full controls, variant demonstrations, and accessibility documentation

### Action & Button Components

- [ ] **ACTN-01**: `Button` component — Primary variant: filled rose background, correct typography, loading state, disabled state, minimum 44pt touch target
- [ ] **ACTN-02**: `Button` component — Secondary/Outline variant: bordered, transparent background, all states
- [ ] **ACTN-03**: `IconTextButton` — Button with leading or trailing Phosphor icon slot
- [ ] **ACTN-04**: `FAB` (Floating Action Button) — circular, rose-primary, with icon slot, standard and mini sizes
- [ ] **ACTN-05**: `BottomActionBar` — fixed-to-bottom bar containing primary/secondary action buttons with safe area inset
- [ ] **ACTN-06**: `ToggleSwitch` — iOS-style toggle with on/off states styled with Morph Maternity colors
- [ ] **ACTN-07**: `TextLinkPair` — inline text with an adjacent tappable link (e.g., "Already have an account? Sign in")
- [ ] **ACTN-08**: `OnboardingNavRow` — progress/step indicator row for onboarding flows (back/next/skip)
- [ ] **ACTN-09**: All action components have Storybook stories with full controls and accessibility documentation

### Navigation Components

- [ ] **NAV-01**: `TopAppBar` — header bar with title, optional back button (Phosphor icon), optional action icon slot; safe area aware
- [ ] **NAV-02**: `BottomNavBar` — tab bar with 3–5 items using compound component pattern (`<BottomNavBar.Item>`); active/inactive states; safe area inset
- [ ] **NAV-03**: `LanguageToggle` — compact toggle for switching app language (e.g., EN / BM); styled as pill or segmented control
- [ ] **NAV-04**: All navigation components have Storybook stories with full controls and accessibility documentation

### Data Display Components

- [ ] **DATA-01**: `DataCard` — card container for displaying a labeled data value (e.g., appointment date, stat)
- [ ] **DATA-02**: `ListItem` — row component for list views with leading icon/avatar slot, primary/secondary text, trailing action slot
- [ ] **DATA-03**: `Timeline` — vertical timeline component rendering ordered events with date, title, description; custom-built (no library equivalent)
- [ ] **DATA-04**: `Calendar` — monthly calendar view for appointment selection; custom-built; highlights selected date and events
- [ ] **DATA-05**: All data display components have Storybook stories with full controls and accessibility documentation

### Layout & Shell Components

- [ ] **LAYO-01**: `MobileShell` — full-screen layout wrapper providing safe area insets, status bar management, and background color from tokens
- [ ] **LAYO-02**: `ScrollableContent` — scrollable content area with correct padding, optional pull-to-refresh slot
- [ ] **LAYO-03**: `SectionDivider` — horizontal rule with optional centered label; styled with design tokens
- [ ] **LAYO-04**: `EmptyFooter` — bottom-of-page info area for empty states or informational notes
- [ ] **LAYO-05**: All layout components have Storybook stories with full controls and usage documentation

## v2 Requirements

### Extended Components

- **V2-01**: Dark mode / theming support — v1 is light-only; dark mode requires NativeWind v4 `dark:` variant setup
- **V2-02**: Web Storybook target — `@storybook/react-native-web-addon` for CI screenshot diffing
- **V2-03**: Animation system — shared entrance/exit animations using React Native Reanimated
- **V2-04**: `Avatar` component — circular image/initials component with size variants
- **V2-05**: `Toast` / notification component — transient feedback messages
- **V2-06**: `Modal` / `Drawer` — overlay components with backdrop and animation
- **V2-07**: `Tooltip` / `Popover` — contextual information overlay
- **V2-08**: Published NPM package — semantic versioning, changelogs, external consumer support

### Extended Form Components

- **V2-09**: `RadioGroup` — radio button group component
- **V2-10**: `Slider` — range input component
- **V2-11**: `FileUpload` — image/document picker component

## Out of Scope

| Feature | Reason |
|---------|--------|
| React web components | This is React Native / Expo only — web Storybook preview is a future v2 addition |
| StyleSheet-only styling | All components use NativeWind v4 className — no mixed styling approach |
| Native OS date/time pickers | Cannot be styled with NativeWind; custom pickers are required for brand consistency |
| Tailwind CSS v4 | NativeWind v4 is built against Tailwind v3 API — pin at ^3.4.x |
| Dark mode | Morph Maternity brand is light-only; dark mode deferred to v2 |
| Published NPM package | Internal Momcare app use only in v1 |
| Authentication / business logic | Pure UI layer — no app logic in the design system |
| Complex animations (Reanimated) | Basic RN Animated is sufficient in v1 |
| React Native Web parity | On-device render is the source of truth; web parity is v2 scope |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUN-01 | Phase 1 | Complete |
| FOUN-02 | Phase 1 | Complete |
| FOUN-03 | Phase 1 | Pending |
| FOUN-04 | Phase 1 | Pending |
| FOUN-05 | Phase 1 | Pending |
| FOUN-06 | Phase 1 | Pending |
| FOUN-07 | Phase 1 | Pending |
| FOUN-08 | Phase 1 | Pending |
| FOUN-09 | Phase 1 | Pending |
| FOUN-10 | Phase 1 | Pending |
| FOUN-11 | Phase 1 | Pending |
| FOUN-12 | Phase 1 | Pending |
| FOUN-13 | Phase 1 | Pending |
| PRIM-01 | Phase 2 | Pending |
| PRIM-02 | Phase 2 | Pending |
| PRIM-03 | Phase 2 | Pending |
| PRIM-04 | Phase 2 | Pending |
| FORM-01 | Phase 3 | Pending |
| FORM-02 | Phase 3 | Pending |
| FORM-03 | Phase 3 | Pending |
| FORM-04 | Phase 3 | Pending |
| FORM-05 | Phase 3 | Pending |
| FORM-06 | Phase 3 | Pending |
| FORM-07 | Phase 3 | Pending |
| FORM-08 | Phase 3 | Pending |
| FORM-09 | Phase 3 | Pending |
| FORM-10 | Phase 3 | Pending |
| FORM-11 | Phase 3 | Pending |
| FORM-12 | Phase 3 | Pending |
| ACTN-01 | Phase 4 | Pending |
| ACTN-02 | Phase 4 | Pending |
| ACTN-03 | Phase 4 | Pending |
| ACTN-04 | Phase 4 | Pending |
| ACTN-05 | Phase 4 | Pending |
| ACTN-06 | Phase 4 | Pending |
| ACTN-07 | Phase 4 | Pending |
| ACTN-08 | Phase 4 | Pending |
| ACTN-09 | Phase 4 | Pending |
| NAV-01 | Phase 4 | Pending |
| NAV-02 | Phase 4 | Pending |
| NAV-03 | Phase 4 | Pending |
| NAV-04 | Phase 4 | Pending |
| DATA-01 | Phase 5 | Pending |
| DATA-02 | Phase 5 | Pending |
| DATA-03 | Phase 5 | Pending |
| DATA-04 | Phase 5 | Pending |
| DATA-05 | Phase 5 | Pending |
| LAYO-01 | Phase 6 | Pending |
| LAYO-02 | Phase 6 | Pending |
| LAYO-03 | Phase 6 | Pending |
| LAYO-04 | Phase 6 | Pending |
| LAYO-05 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 50 total
- Mapped to phases: 50
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-15*
*Last updated: 2026-03-15 after roadmap creation — traceability table fully populated*
