# Feature Landscape

**Domain:** React Native Design System — Maternal Healthcare Mobile App
**Project:** Morph Maternity Design System (Momcare)
**Researched:** 2026-03-15
**Confidence:** MEDIUM — based on training-data knowledge of NativeBase v3, Tamagui, RN Paper v5, Shopify Restyle, Gluestack UI; web tools unavailable during research session

---

## What Production React Native Design Systems Include

The five most-referenced production React Native design systems as of 2025 are:

- **React Native Paper v5** (Google Material Design 3) — theming via `Provider`, compound component patterns, accessibility-first
- **NativeBase v3 / Gluestack UI v2** (successor) — utility-class props, compound components, token-driven, strong form support
- **Tamagui v1** — compile-time optimization, cross-platform (RN + web), variant-first API
- **Shopify Restyle** — typed theming, no runtime overhead, constraint-based props, design-token-first
- **Gluestack UI v2** — headless components, NativeWind-compatible, accessibility via ARIA props

These inform what "table stakes" means in this ecosystem.

---

## Table Stakes

Features users (developers consuming this system) expect. Missing = system feels incomplete or unsafe to use in production.

### Foundation Layer

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Design token system | Without tokens, components diverge from design spec; all production systems have this | Low | Must match `morph-maternity-design-system.html` exactly |
| Typography scale | Font families, sizes, weights, line heights as reusable primitives | Low | Cormorant Garamond (display), DM Sans (body), DM Mono (code) |
| Color palette tokens | Semantic naming (primary, surface, error) + raw values | Low | Rose, Cream, Sage palettes; critical that error/warning states are distinguishable |
| Spacing scale | Consistent spacing units (4px base grid or 8px); applied via NativeWind classes | Low | Tailwind default scale works; extend with brand-specific values |
| Shadow / elevation tokens | iOS shadow + Android elevation must be parallel | Low | React Native requires both properties; NativeWind v4 handles this |
| Border radius tokens | Rounded corners consistent across all surfaces | Low | Buttons, cards, inputs must share vocabulary |

### Core Interactive Primitives

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Pressable base with feedback | Every tap target needs visual feedback (opacity, ripple, scale) | Low-Med | Use RN `Pressable` + NativeWind; Android ripple vs iOS opacity fade are different |
| Disabled state handling | Form and button disabled states must be visually and functionally distinct | Low | `accessibilityState={{ disabled }}` required alongside visual treatment |
| Loading state on buttons | Submit actions must show in-progress feedback | Low | Spinner inside button; lock further presses |
| Focus ring / outline | Keyboard/switch-access navigation requires visible focus | Med | Critical for healthcare accessibility; often missed in custom systems |
| Text truncation control | Single-line and multi-line truncation with ellipsis | Low | `numberOfLines` prop must be standard |

### Form Components (All Table Stakes for Healthcare)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Text input with label | Every form in every app; label above or floating | Low | Must support error, disabled, required states |
| Error message display | WCAG 2.1 AA requires errors be perceivable (not color-only) | Low | Error text below input + icon; never just red border |
| Required field indicator | Legal/medical forms require explicit required marking | Low | Asterisk + accessible label |
| Password input with toggle | Universal expectation; eye icon shows/hides | Low | `secureTextEntry` toggle in RN |
| Textarea (multiline) | Notes, comments, medical history fields | Low | Controlled height or auto-grow |
| Checkbox with label | Consent, multi-select; must be tappable on label not just box | Low | Healthcare consent forms are critical use case |
| Toggle switch | Binary on/off settings | Low | Must have accessible label; thumb position alone is insufficient |
| Dropdown / Select | Single-value selection from a list | Med | React Native has no native `<select>`; requires Modal or ActionSheet pattern |
| Search bar | App-wide search pattern | Low | Clear button, debounced input ready |
| Form section header | Grouping fields in long forms (demographic, clinical) | Low | Semantic heading, not just styled text |
| Form action row | Save/Cancel or Next/Back row at bottom of forms | Low | Consistent placement is a UX requirement |

### Navigation Components

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Bottom navigation bar | Standard mobile nav pattern; 3-5 items | Low-Med | Active indicator, icon + label; must handle safe area insets |
| Top app bar | Screen title, back, contextual actions | Low | Integrates with navigation library's header |
| Badge / notification dot | Unread count on nav items | Low | Should accept numeric or boolean "has-unread" prop |

### Feedback & Status

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Badge / status chip | Status labeling (e.g., "Confirmed", "Pending") | Low | Color-coded with accessible label; not color-only |
| Loading states | Any async operation needs a loading representation | Low | Spinner component and skeleton variant |
| Empty state | Lists/screens with no data need a non-blank fallback | Low | Icon + message + optional CTA |

### Layout & Shell

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Safe area handling | Status bar and home-indicator insets vary by device | Low | `react-native-safe-area-context` integration; not optional |
| Scrollable content area | Forms and data lists must scroll | Low | Wraps `ScrollView` with consistent padding |
| Section divider | Visual grouping in lists and forms | Low | Horizontal rule + optional label |
| Keyboard avoidance | Form inputs must not be hidden by soft keyboard | Med | `KeyboardAvoidingView` behavior differs iOS vs Android; requires testing |

---

## Differentiators

Features that elevate this system above a basic component kit. Not universally expected, but make the system excellent.

### Developer Experience

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Variant-first prop API | `variant="primary"` beats `className="bg-rose-500 px-4 py-2 rounded-full"` on every component | Med | Pattern from Tamagui/RN Paper; requires `cva` (class-variance-authority) or equivalent |
| Storybook with controls | Visual regression baseline; design handoff without Figma access | Med | RN Storybook v7+ supports on-device + web target |
| Consistent `testID` prop forwarding | Every component should forward `testID` for E2E tests | Low | Required by teams using Detox or Maestro |
| `ref` forwarding on all inputs | Allows focus management across form fields | Low | `React.forwardRef` on every input component |
| `style` prop escape hatch | For edge cases, allow NativeWind `className` passthrough | Low | Without this, every edge case requires a new component |

### Healthcare-Specific Excellence

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| High-contrast mode readiness | MOH apps may serve users with visual impairments | Med | All color decisions must pass 4.5:1 contrast; test with APCA or WCAG contrast tools |
| Large touch targets (44pt minimum) | WCAG 2.1 SC 2.5.5; critical for users with motor impairments or using device while managing a newborn | Low | Apply `minHeight: 44` and `minWidth: 44` to all interactive elements |
| Error prevention patterns | Medical apps: confirm destructive actions, validate dates/times before submission | Med | Confirmation dialogs, inline validation on blur |
| Bilingual / RTL readiness | Language toggle in scope; MOH may serve multilingual populations | Med | Text must scale; RTL layout flip capability for Arabic/Malay etc |
| Date picker with range validation | Appointment booking requires date constraints (not past dates, not too far future) | High | RN has no native date picker; third-party (react-native-date-picker or DateTimePicker) required |
| Timeline component | Pregnancy/prenatal care has inherent temporal structure | High | Custom component; no standard library provides a medical timeline |

### Data Display Excellence

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Structured data display | Key-value pairs, lab results, appointment details — must be consistent | Med | Not just a `<View>` with text; needs label/value semantic pairing |
| Skeleton loading screens | Better perceived performance than spinners for data-heavy screens | Med | Animated placeholder matching content shape |
| Calendar view | Appointment scheduling is core to clinic apps | High | Complex: month navigation, day selection, appointment indicators |

### Onboarding Patterns

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Onboarding nav row | Step indicators + Next/Back unique to onboarding flows | Low-Med | Progress dots or step numbers; consistent layout container |
| Text link pair | "Already have an account? Sign in" — common pattern | Low | Inline mixed text + link; needs accessible role |

---

## Anti-Features

Features to explicitly NOT build in v1.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Dark mode theme | Out of scope (PROJECT.md); adds token complexity with no current need | One light theme; dark mode tokens can be added in v2 |
| Custom icon set | Brand confirmation required; premature commitment causes rework | Defer; document the TBD decision; use placeholder icons in Storybook |
| Animation sequences (Reanimated) | Basic RN Animated is sufficient; complex sequences add bundle weight | Use `Animated.timing` for simple fade/scale; no Reanimated in v1 |
| Web-first responsive layout | React Native / Expo only; Storybook web target is preview, not production | Do not add `md:` breakpoints; mobile dimensions only |
| Snackbar / Toast library | Not in component list; scope creep | Use OS-level alerts for now or defer to v2 |
| Data table with sorting | Complex, heavy; not in the explicit component list | Use simple list layouts for data display |
| Theming switcher / multi-brand | Single Morph Maternity brand; no tenant theming | One token set; no theme context provider complexity |
| Internationalization framework | Language toggle changes locale but component library should not own i18n logic | Accept `label` props as strings; let app layer handle translations |

---

## Component API Patterns

How props and variants should be structured based on production system conventions.

### Pattern 1: Variant + Size Props (Universal)

Every visual component should use `variant` and `size` as the primary differentiation axes, not raw className strings.

```typescript
// Recommended pattern (from RN Paper, Gluestack, Tamagui)
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  isDisabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onPress: () => void
  children: React.ReactNode
  testID?: string
  className?: string  // NativeWind escape hatch
}

// NOT recommended — forces caller to know tokens
<Button className="bg-rose-500 px-4 rounded-full" />

// Recommended
<Button variant="primary" size="md" />
```

**Rationale:** Variant-based APIs prevent token drift. When the designer updates the primary button color, one change in the Button component updates every usage. This is how all production systems (RN Paper, Gluestack v2, Tamagui) structure components.

### Pattern 2: Controlled + Uncontrolled Inputs

Form inputs must support both controlled (React state) and uncontrolled (ref-based) patterns.

```typescript
type TextInputProps = {
  // Controlled
  value?: string
  onChangeText?: (text: string) => void
  // Uncontrolled
  defaultValue?: string
  // State
  label: string
  placeholder?: string
  error?: string        // Error message text (not just boolean)
  isRequired?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
  // Accessibility
  accessibilityLabel?: string  // Falls back to label if not provided
  testID?: string
}
```

**Rationale:** NativeBase and RN Paper both expose this pattern. Healthcare forms use React Hook Form or Formik, which require controlled inputs.

### Pattern 3: Compound Components for Complex UI

Navigation bars, form rows, and data cards should use compound component patterns rather than mega-prop objects.

```typescript
// Compound pattern (from RN Paper's BottomNavigation)
<BottomNav>
  <BottomNav.Item
    icon={<HomeIcon />}
    label="Home"
    isActive={currentRoute === 'home'}
    onPress={() => navigate('home')}
  />
  <BottomNav.Item ... />
</BottomNav>

// Avoid: array-of-objects prop pattern
<BottomNav items={[{ icon: ..., label: ..., route: ... }]} />
```

**Rationale:** Compound components are more composable, type-safe per item, and allow per-item customization without an ever-growing items object schema.

### Pattern 4: Render Props for Icon Slots

Icon slots should accept `ReactNode` or render props, not icon name strings.

```typescript
// Recommended
<TextInput leftIcon={<SearchIcon size={20} color={colors.muted} />} />

// Not recommended (ties to one icon library)
<TextInput leftIconName="search" />
```

**Rationale:** Icon library is TBD (PROJECT.md). Render props are library-agnostic.

### Pattern 5: Forwarded Refs on All Inputs

Every input component must use `React.forwardRef` so consumers can programmatically focus fields.

```typescript
const TextInput = React.forwardRef<TextInput, TextInputProps>((props, ref) => {
  return <RNTextInput ref={ref} ... />
})
```

**Rationale:** Healthcare forms often have long sequences; programmatic focus management (e.g., move to next field on submit, scroll-to-error) requires refs.

### Pattern 6: Accessibility Props as First-Class

Do not treat accessibility as an afterthought. Every component definition should include `accessibilityLabel`, `accessibilityRole`, and `accessibilityState` in its interface.

```typescript
// Badge component
type BadgeProps = {
  label: string
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral'
  // Accessibility — status conveyed via text, not color alone
  accessibilityLabel?: string  // "Appointment confirmed" not just "green badge"
}
```

---

## Feature Dependencies

```
Design Tokens
  └── Typography scale → All text-bearing components
  └── Color palette → All visual components
  └── Spacing scale → All layout components

Pressable base primitive
  └── Primary button
  └── Secondary button
  └── Icon text button
  └── FAB
  └── Bottom nav item
  └── Checkbox
  └── Toggle switch
  └── Text link pair

Text Input (base)
  └── Password input (extends with toggle)
  └── Search bar (extends with clear + search icon)
  └── Textarea (extends with multiline)
  └── Date picker input (extends with picker modal)
  └── Time picker input (extends with picker modal)

Badge / Status chip
  └── Bottom nav badge (notification dot variant)
  └── Data display status column

Safe area provider (react-native-safe-area-context)
  └── Mobile shell
  └── Bottom nav bar
  └── Bottom action bar
  └── FAB positioning
```

---

## Accessibility Considerations for Healthcare Apps

Healthcare apps have elevated accessibility requirements beyond standard consumer apps. MOH (Ministry of Health) context implies potential government accessibility compliance.

### Non-Negotiables

| Requirement | Standard | Implementation |
|-------------|----------|----------------|
| Minimum 44pt touch targets | WCAG 2.1 SC 2.5.5 | `minHeight: 44, minWidth: 44` on all Pressable wrappers |
| Color-independent error communication | WCAG 2.1 SC 1.4.1 | Error text + icon, not red border alone |
| Contrast ratio 4.5:1 for text | WCAG 2.1 SC 1.4.3 (AA) | Verify Rose palette text combinations against Cream backgrounds |
| Screen reader labels on all interactive elements | WCAG 2.1 SC 4.1.2 | `accessibilityLabel` on every Pressable, input, and navigation item |
| Focus management in forms | WCAG 2.1 SC 3.3 | `ref` forwarding + `returnKeyType="next"` on inputs |
| Status not conveyed by color alone | WCAG 2.1 SC 1.4.1 | Badges must have text labels, not just color coding |

### Healthcare-Specific Risks

| Risk | Consequence | Mitigation |
|------|-------------|------------|
| Date picker with no validation | Patient books past appointment or wrong year | Always enforce `minimumDate` / `maximumDate` constraints |
| Ambiguous status badge colors | Clinician misreads appointment status | Use explicit text labels (not just dot colors); include status in `accessibilityLabel` |
| Form submit without confirmation | Patient accidentally submits wrong data | Confirmation step for destructive or final-submit actions |
| Language toggle mid-session | UI state/form data may not survive locale switch | Language toggle must not reset form state |
| Small tap targets for elderly/postpartum users | Missed taps, frustration | Err toward larger targets (48pt+) in form interactions |

---

## MVP Recommendation

### Phase 1 — Foundations (must be first; everything depends on this)
1. Design token system (NativeWind theme extension)
2. Typography primitives
3. Color tokens with semantic naming
4. Spacing and radius tokens

### Phase 2 — Core Primitives (unblocks all other phases)
5. Pressable base with feedback states
6. Button (primary, secondary, icon-text)
7. Badge / status chip
8. Toggle switch
9. Text link pair

### Phase 3 — Forms (largest group; healthcare critical path)
10. Text input (label, error, required, disabled)
11. Password input
12. Textarea
13. Search bar
14. Checkbox
15. Dropdown / Select
16. Form section header
17. Form action row
18. Filter dropdown chips

### Phase 4 — Navigation
19. Bottom nav bar (with safe area)
20. Top app bar
21. Language toggle
22. Onboarding nav row

### Phase 5 — Data Display
23. Data display components (key-value, list)
24. Timeline component
25. Calendar component

### Phase 6 — Layout & Shell
26. Mobile shell
27. Scrollable content area
28. Bottom action bar
29. FAB
30. Section divider
31. Empty / info footer

**Defer to v2:**
- Skeleton loading screens (valuable but not blocking any MVP screen)
- Dark mode token layer
- Custom icon system (confirm brand guidelines first)
- Calendar (if timeline is sufficient for v1 appointment display)

---

## Sources

- Knowledge of React Native Paper v5 component API (HIGH confidence — well-documented, stable)
- Knowledge of NativeBase v3 / Gluestack UI v2 API patterns (MEDIUM confidence — Gluestack v2 migration patterns less verified)
- Knowledge of Tamagui v1 variant system (MEDIUM confidence — API stable as of training data)
- Knowledge of Shopify Restyle design token approach (HIGH confidence — stable, open source)
- WCAG 2.1 guidelines for accessibility requirements (HIGH confidence — stable standard)
- PROJECT.md — primary source for component list and constraints (HIGH confidence — first-party)
- Web tools unavailable during this research session; findings are training-data based and should be verified against current library documentation before implementation
