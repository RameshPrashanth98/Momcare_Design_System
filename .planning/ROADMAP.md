# Roadmap: Morph Maternity Design System

## Overview

Build a complete React Native component library for the Momcare maternal health app — starting from project scaffolding and design token configuration, progressing through primitives, forms, actions, navigation, data display, and finally layout shells. Each phase delivers a verified, Storybook-documented layer that the next phase composes from. The system is complete when every Momcare screen can be assembled from design system components without any one-off styles.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation & Infrastructure** - Scaffold project, configure NativeWind v4, define all design tokens, establish Storybook
- [ ] **Phase 2: Core Primitives** - Build Text, Badge, and Icon components — the atomic building blocks all other components compose from
- [ ] **Phase 3: Form Components** - Build all input and form control components for healthcare data entry
- [ ] **Phase 4: Actions & Navigation** - Build button variants, FAB, and navigation bars composed from primitives
- [ ] **Phase 5: Data Display** - Build data cards, lists, timeline, and calendar for clinical data visualization
- [ ] **Phase 6: Layout & Shell** - Build screen wrappers, scrollable areas, and structural layout components

## Phase Details

### Phase 1: Foundation & Infrastructure
**Goal**: Developers have a working Expo + NativeWind v4 project with all Morph Maternity design tokens live in Tailwind config, Storybook running on-device, and a verified smoke test confirming styles apply correctly
**Depends on**: Nothing (first phase)
**Requirements**: FOUN-01, FOUN-02, FOUN-03, FOUN-04, FOUN-05, FOUN-06, FOUN-07, FOUN-08, FOUN-09, FOUN-10, FOUN-11, FOUN-12, FOUN-13
**Success Criteria** (what must be TRUE):
  1. A smoke-test component renders on-device using only NativeWind Tailwind class names drawn from Morph Maternity color and typography tokens — no raw values, no StyleSheet
  2. Storybook opens on-device via `EXPO_PUBLIC_STORYBOOK=true` and displays a token showcase story with correct brand colors and all three fonts (Cormorant Garamond, DM Sans, DM Mono) rendered
  3. Every design token category (color, typography, spacing, radius, shadow, grid) is defined in `tailwind.config.ts` with values that exactly match the `morph-maternity-design-system.html` spec
  4. All components are importable from the barrel export `index.ts` root without path aliasing
  5. The `cva` variant pattern and `cn()` utility are established with a documented coding convention that bans dynamic template literal class strings
**Plans**: 5 plans

Plans:
- [x] 01-00-PLAN.md — Test infrastructure: Jest config + all Phase 1 test stubs (Wave 0)
- [ ] 01-01-PLAN.md — Expo SDK 54 scaffold, NativeWind v4 config (babel/metro/global.css), SmokeTest component
- [ ] 01-02-PLAN.md — All design token TypeScript files + tailwind.config.ts full wiring
- [ ] 01-03-PLAN.md — Storybook v10 on-device setup, font decorator, TokenShowcase story, env-var toggle
- [ ] 01-04-PLAN.md — cn() utility, cva convention documented, barrel export skeleton

### Phase 2: Core Primitives
**Goal**: Text, Badge, and Icon components exist as fully-typed, token-driven, Storybook-documented building blocks that all subsequent phases compose from
**Depends on**: Phase 1
**Requirements**: PRIM-01, PRIM-02, PRIM-03, PRIM-04
**Success Criteria** (what must be TRUE):
  1. A developer can render any typography variant (display, heading, body, label, caption, mono) by passing a single `variant` prop to `<Text>` — no manual font or size class needed
  2. `<Badge>` communicates status using both color and a text label across all five variants (success, warning, error, info, neutral) — color alone is never the only indicator
  3. `<Icon>` renders any Phosphor icon at standardized size tokens (sm/md/lg/xl/2xl) via a `size` prop and accepts a `color` prop — no raw pixel values at call sites
  4. All three primitive components are browsable in Storybook with controls for every prop and documented accessibility roles and labels
**Plans**: TBD

Plans:
- [ ] 02-01: Text component — all variants, sizes, weights via cva; Storybook story with controls
- [ ] 02-02: Badge component — all status variants with color + text label; Storybook story
- [ ] 02-03: Icon component — Phosphor Icons wrapper with size tokens and color prop; Storybook story

### Phase 3: Form Components
**Goal**: All form input and control components required for clinical data entry are built, accessible, and Storybook-documented — with WCAG 2.1 AA error communication and minimum 44pt touch targets throughout
**Depends on**: Phase 2
**Requirements**: FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06, FORM-07, FORM-08, FORM-09, FORM-10, FORM-11, FORM-12
**Success Criteria** (what must be TRUE):
  1. `<TextInput>` renders with visible label, shows an error state using both a colored border and an error text+icon (not color alone), and meets 44pt minimum touch target — and all other inputs (PasswordInput, SearchBar, Textarea) extend this base pattern
  2. `<DatePickerInput>` and `<TimePickerInput>` open fully custom brand-styled pickers (no native OS picker chrome visible) and return structured date/time values
  3. `<Checkbox>`, `<Dropdown>`, `<FilterChip>`, and `<ToggleSwitch>` each reflect their interaction state (checked/unchecked/selected/active) visually and via `accessibilityState` — operable without color vision
  4. All form components forward `ref` and support `returnKeyType="next"` enabling focus-chain navigation across long clinical forms
  5. All 12 form components have Storybook stories demonstrating every state (default, focused, error, disabled) with controls
**Plans**: TBD

Plans:
- [ ] 03-01: TextInput base — label, placeholder, error (text+icon), disabled, readonly, ref forwarding, 44pt target
- [ ] 03-02: TextInput extensions — PasswordInput (show/hide toggle), SearchBar (leading icon, clear), Textarea (multiline, char count)
- [ ] 03-03: Selection controls — Checkbox (checked/unchecked/indeterminate/disabled), Dropdown/Select (overlay list, states)
- [ ] 03-04: Custom pickers — DatePickerInput and TimePickerInput (custom-built, brand-styled, no native OS picker)
- [ ] 03-05: Form structure — FormSectionHeader, FilterChip, FormActionRow; Storybook stories for all form components

### Phase 4: Actions & Navigation
**Goal**: All button variants, FAB, and navigation bars are built as safe-area-aware, fully-accessible components composed from Phase 2 primitives
**Depends on**: Phase 2 (primitives), Phase 3 (for BottomActionBar context)
**Requirements**: ACTN-01, ACTN-02, ACTN-03, ACTN-04, ACTN-05, ACTN-06, ACTN-07, ACTN-08, ACTN-09, NAV-01, NAV-02, NAV-03, NAV-04
**Success Criteria** (what must be TRUE):
  1. Primary and Secondary `<Button>` variants render correctly, show a loading spinner during async operations, appear visually disabled when disabled, and meet 44pt touch target — operable with a single tap without style side effects
  2. `<BottomNavBar>` renders 3–5 tab items using the compound component pattern (`<BottomNavBar.Item>`), correctly applies safe area bottom inset on both iOS and Android, and shows active/inactive state without color as the only indicator
  3. `<TopAppBar>` renders a page title with optional back button and action icon slot, is safe-area-aware at the top of the screen, and works correctly on both iOS and Android
  4. All 13 action and navigation components have Storybook stories with full controls and documented accessibility props
**Plans**: TBD

Plans:
- [ ] 04-01: Button components — Primary, Secondary/Outline variants with loading, disabled, 44pt target; cva variant pattern
- [ ] 04-02: Extended actions — IconTextButton, FAB (standard + mini), BottomActionBar (safe area), ToggleSwitch, TextLinkPair, OnboardingNavRow
- [ ] 04-03: Navigation components — TopAppBar, BottomNavBar (compound pattern, safe area), LanguageToggle; Storybook stories for all

### Phase 5: Data Display
**Goal**: DataCard, ListItem, Timeline, and Calendar components exist as fully custom, brand-styled, Storybook-documented components capable of visualizing clinical and appointment data
**Depends on**: Phase 2, Phase 3 (DatePickerInput interaction pattern), Phase 4
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, DATA-05
**Success Criteria** (what must be TRUE):
  1. `<DataCard>` renders a labeled data value (e.g., appointment date, vital stat) using design tokens with correct typography hierarchy — label distinct from value
  2. `<ListItem>` renders in a FlatList with leading icon/avatar slot, primary and secondary text lines, and a trailing action slot — all slots optional and composable
  3. `<Timeline>` renders an ordered list of prenatal events with date, title, and description in a vertically connected layout — no third-party timeline library used
  4. `<Calendar>` renders a monthly calendar grid, highlights the selected date, and marks event dates — custom-built with no external calendar library
  5. All five data display components have Storybook stories with controls demonstrating real clinical data scenarios
**Plans**: TBD

Plans:
- [ ] 05-01: DataCard and ListItem — token-driven, composable slots, Storybook stories
- [ ] 05-02: Timeline component — custom vertical timeline, ordered events, date/title/description
- [ ] 05-03: Calendar component — custom monthly grid, date selection, event markers; Storybook stories for all data display components

### Phase 6: Layout & Shell
**Goal**: Screen-level wrapper and structural layout components exist to compose complete Momcare screens from design system components — verified barrel export confirms the full system is importable
**Depends on**: Phase 4 (navigation), Phase 5 (data display)
**Requirements**: LAYO-01, LAYO-02, LAYO-03, LAYO-04, LAYO-05
**Success Criteria** (what must be TRUE):
  1. `<MobileShell>` wraps any screen content with correct safe area insets on both iOS and Android, applies background color from tokens, and manages status bar styling
  2. `<ScrollableContent>` provides a scrollable content area with correct horizontal padding and supports a pull-to-refresh slot — keyboard avoidance works when a focused input sits inside
  3. `<SectionDivider>` and `<EmptyFooter>` render correctly inside MobileShell alongside real screen content
  4. Every v1 component is importable from the single barrel `src/index.ts` with a single named import — verified by a Storybook integration story that mounts multiple components simultaneously
**Plans**: TBD

Plans:
- [ ] 06-01: MobileShell and ScrollableContent — safe area, status bar, keyboard avoidance, pull-to-refresh slot
- [ ] 06-02: SectionDivider, EmptyFooter; barrel export verification; Storybook integration story

## Progress

**Execution Order:**
Phases execute strictly in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Infrastructure | 1/5 | In progress | - |
| 2. Core Primitives | 0/3 | Not started | - |
| 3. Form Components | 0/5 | Not started | - |
| 4. Actions & Navigation | 0/3 | Not started | - |
| 5. Data Display | 0/3 | Not started | - |
| 6. Layout & Shell | 0/2 | Not started | - |
