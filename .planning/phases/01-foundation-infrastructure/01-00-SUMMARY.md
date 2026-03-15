---
phase: 01-foundation-infrastructure
plan: "00"
subsystem: testing

tags: [jest, jest-expo, react-native, expo, typescript, nativewind, tailwind-merge, clsx]

# Dependency graph
requires: []
provides:
  - jest.config.js with jest-expo preset and ESM-package transformIgnorePatterns
  - tests/smoke.test.tsx — SmokeTest component render stub
  - tests/tokens/colors.test.ts — color palette completeness stubs
  - tests/tokens/spacing.test.ts — 4px grid spacing token stubs
  - tests/tokens/radius.test.ts — radius token stubs
  - tests/tokens/shadows.test.ts — shadow token stubs
  - tests/tokens/grid.test.ts — Tailwind breakpoint stubs
  - tests/utils/cn.test.ts — cn() utility behavior stubs
  - tests/exports.test.ts — barrel export stub
affects:
  - 01-01 (Expo scaffold — installs jest-expo so jest.config.js activates)
  - 01-02 (Design tokens — stubs fail RED until token files exist)
  - 01-03 (cn utility — stubs fail RED until src/utils/cn.ts exists)
  - 01-04 (Storybook — SmokeTest stub fails RED until component exists)

# Tech tracking
tech-stack:
  added: [jest-expo (preset — installed by later plan)]
  patterns:
    - "Wave 0 stub pattern: test files created before implementation, intentionally fail RED"
    - "transformIgnorePatterns covers all ESM-only packages used in the design system"

key-files:
  created:
    - jest.config.js
    - tests/smoke.test.tsx
    - tests/tokens/colors.test.ts
    - tests/tokens/spacing.test.ts
    - tests/tokens/radius.test.ts
    - tests/tokens/shadows.test.ts
    - tests/tokens/grid.test.ts
    - tests/utils/cn.test.ts
    - tests/exports.test.ts
  modified: []

key-decisions:
  - "jest-expo preset used — only viable option for React Native + Expo Jest compatibility"
  - "transformIgnorePatterns explicitly includes nativewind, tailwind-merge, clsx, class-variance-authority to handle ESM-only packages under CommonJS Jest"
  - "setupFilesAfterFramework left empty (not setupFilesAfterFramework with typo) — will be populated in Plan 01 after @testing-library/jest-native is installed"

patterns-established:
  - "Wave 0 stub pattern: all test files created before any implementation; stubs fail RED on module-not-found errors until implementation plans run"
  - "Test directory layout: tests/ root for integration tests, tests/tokens/ for token files, tests/utils/ for utility helpers"

requirements-completed: [FOUN-01, FOUN-02, FOUN-03, FOUN-05, FOUN-06, FOUN-07, FOUN-08, FOUN-12, FOUN-13]

# Metrics
duration: 2min
completed: 2026-03-15
---

# Phase 1 Plan 0: Test Infrastructure Summary

**Jest test scaffold with jest-expo preset and 8 RED stub files covering tokens, cn utility, SmokeTest component, and barrel exports**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-15T14:29:19Z
- **Completed:** 2026-03-15T14:31:00Z
- **Tasks:** 2
- **Files modified:** 9 (1 config + 8 test stubs)

## Accomplishments

- jest.config.js created with jest-expo preset, correct testMatch glob, and transformIgnorePatterns covering all ESM-only packages (nativewind, tailwind-merge, clsx, class-variance-authority)
- 8 Wave 0 test stub files created across tests/, tests/tokens/, tests/utils/ — all intentionally fail RED until implementation plans execute
- All subsequent Phase 1 plans can immediately reference their verify commands against pre-existing stub paths

## Task Commits

Each task was committed atomically:

1. **Task 1: Jest configuration** - `a032837` (chore)
2. **Task 2: Test stub files** - `938e3cf` (test)

**Plan metadata:** (included in final docs commit)

## Files Created/Modified

- `jest.config.js` — Jest configuration using jest-expo preset with ESM-package transform allowlist
- `tests/smoke.test.tsx` — SmokeTest component render assertion (fails RED: module not found)
- `tests/tokens/colors.test.ts` — rose, cream, sage, neutral, status palette checks (fails RED: module not found)
- `tests/tokens/spacing.test.ts` — 4px grid space-1 through space-48 checks (fails RED: module not found)
- `tests/tokens/radius.test.ts` — none through full radius token checks (fails RED: module not found)
- `tests/tokens/shadows.test.ts` — xs through inner shadow token checks (fails RED: module not found)
- `tests/tokens/grid.test.ts` — tailwind.config screen breakpoint checks (fails RED: module not found)
- `tests/utils/cn.test.ts` — cn() merge, dedup, conditional, null handling (fails RED: module not found)
- `tests/exports.test.ts` — barrel export cn function check (fails RED: module not found)

## Decisions Made

- jest-expo preset chosen as it is the only Jest preset with full Expo + React Native compatibility
- transformIgnorePatterns constructed to allow nativewind, tailwind-merge, clsx, and class-variance-authority through Babel transform — these are ESM-only packages that Jest (CommonJS) cannot consume raw without transformation
- Test directory layout established: tests/ root, tests/tokens/ for design token tests, tests/utils/ for utility function tests

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None. jest.config.js and all 8 stub files created without issues. Stubs fail RED as expected (module not found) — this is correct Wave 0 behavior.

## User Setup Required

None - no external service configuration required. jest-expo will be installed in Plan 01 (Expo scaffold).

## Next Phase Readiness

- jest.config.js is ready; will activate once Plan 01 runs `npx expo install jest-expo`
- All 8 test stubs are in place; each subsequent plan's verify commands can reference them immediately
- No blockers — Wave 0 complete, ready for Plan 01 (Expo project scaffold)

---
*Phase: 01-foundation-infrastructure*
*Completed: 2026-03-15*

## Self-Check: PASSED

| Item | Status |
|------|--------|
| jest.config.js | FOUND |
| tests/smoke.test.tsx | FOUND |
| tests/tokens/colors.test.ts | FOUND |
| tests/tokens/spacing.test.ts | FOUND |
| tests/tokens/radius.test.ts | FOUND |
| tests/tokens/shadows.test.ts | FOUND |
| tests/tokens/grid.test.ts | FOUND |
| tests/utils/cn.test.ts | FOUND |
| tests/exports.test.ts | FOUND |
| Commit a032837 | FOUND |
| Commit 938e3cf | FOUND |
