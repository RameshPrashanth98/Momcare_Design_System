---
phase: 1
slug: foundation-infrastructure
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-15
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest with jest-expo preset |
| **Config file** | `jest.config.js` — Wave 0 installs |
| **Quick run command** | `npx jest --testPathPattern "tokens|utils" --passWithNoTests` |
| **Full suite command** | `npx jest` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx jest --testPathPattern "tokens|utils" --passWithNoTests`
- **After every plan wave:** Run `npx jest`
- **Before `/gsd:verify-work`:** Full suite must be green + manual on-device smoke test passed
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 0 | FOUN-01 | Build check | `npx expo export --platform ios --non-interactive` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 0 | FOUN-02 | Smoke | `npx jest tests/smoke.test.tsx` | ❌ W0 | ⬜ pending |
| 1-02-01 | 02 | 1 | FOUN-03 | Unit | `npx jest tests/tokens/colors.test.ts` | ❌ W0 | ⬜ pending |
| 1-02-02 | 02 | 1 | FOUN-05 | Unit | `npx jest tests/tokens/spacing.test.ts` | ❌ W0 | ⬜ pending |
| 1-02-03 | 02 | 1 | FOUN-06 | Unit | `npx jest tests/tokens/radius.test.ts` | ❌ W0 | ⬜ pending |
| 1-02-04 | 02 | 1 | FOUN-07 | Unit | `npx jest tests/tokens/shadows.test.ts` | ❌ W0 | ⬜ pending |
| 1-02-05 | 02 | 1 | FOUN-08 | Unit | `npx jest tests/tokens/grid.test.ts` | ❌ W0 | ⬜ pending |
| 1-03-01 | 03 | 2 | FOUN-04 | Manual | On-device: useFonts returns true | Manual only | ⬜ pending |
| 1-03-02 | 03 | 2 | FOUN-09 | Manual | `EXPO_PUBLIC_STORYBOOK=true npx expo start` then verify device | Manual only | ⬜ pending |
| 1-03-03 | 03 | 2 | FOUN-10 | Manual | Toggle env var, visual inspection on device | Manual only | ⬜ pending |
| 1-03-04 | 03 | 2 | FOUN-11 | Manual | Visual: Cormorant Garamond renders in Storybook stories | Manual only | ⬜ pending |
| 1-04-01 | 04 | 1 | FOUN-12 | Unit | `npx jest tests/utils/cn.test.ts` | ❌ W0 | ⬜ pending |
| 1-04-02 | 04 | 1 | FOUN-13 | Unit | `npx jest tests/exports.test.ts` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/smoke.test.tsx` — basic render test for SmokeTest component (FOUN-02)
- [ ] `tests/tokens/colors.test.ts` — asserts all required palette colors are defined (FOUN-03)
- [ ] `tests/tokens/spacing.test.ts` — asserts space-1 through space-48 are defined (FOUN-05)
- [ ] `tests/tokens/radius.test.ts` — asserts all radius tokens defined (FOUN-06)
- [ ] `tests/tokens/shadows.test.ts` — asserts all shadow tokens defined (FOUN-07)
- [ ] `tests/tokens/grid.test.ts` — asserts breakpoints configured (FOUN-08)
- [ ] `tests/utils/cn.test.ts` — asserts cn() merges classes correctly (FOUN-12)
- [ ] `tests/exports.test.ts` — asserts src/index.ts exports cn (FOUN-13)
- [ ] `jest.config.js` — `"preset": "jest-expo"` configuration
- [ ] Framework install: `npx expo install jest-expo` + `npm install --save-dev @testing-library/react-native`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Font loading: useFonts returns true | FOUN-04 | Requires physical/sim device with font assets present | Run app on device, check no font error in console |
| Storybook loads without crash | FOUN-09 | Requires Expo Dev Client on device | `EXPO_PUBLIC_STORYBOOK=true npx expo start`, open on device |
| Storybook env toggle | FOUN-10 | Visual: two distinct app entry points | Toggle `EXPO_PUBLIC_STORYBOOK`, verify each renders correctly |
| Brand fonts render in Storybook stories | FOUN-11 | Visual: font rendering differs from system font | Open token showcase story, verify Cormorant Garamond visible |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
