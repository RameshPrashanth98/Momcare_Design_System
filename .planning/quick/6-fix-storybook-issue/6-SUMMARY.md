---
phase: quick-6
plan: 01
subsystem: ui
tags: [storybook, package.json, scripts, vite, expo]

# Dependency graph
requires: []
provides:
  - "npm run storybook now launches browser-based Vite Storybook on port 6006"
  - "npm run storybook:rn launches Expo/Metro React Native Storybook"
affects: [storybook, developer-workflow]

# Tech tracking
tech-stack:
  added: []
  patterns: []

key-files:
  created: []
  modified:
    - package.json

key-decisions:
  - "[Quick-6]: storybook script name convention aligned — storybook=web Vite, storybook:rn=Expo/Metro; matches standard Storybook CLI expectations"

patterns-established: []

requirements-completed: [QUICK-6]

# Metrics
duration: 3min
completed: 2026-03-15
---

# Quick Task 6: Fix Storybook Issue Summary

**Inverted storybook script names corrected in package.json — `npm run storybook` now opens browser-based Vite Storybook on port 6006 and `npm run storybook:rn` starts Expo/Metro**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-15T17:00:00Z
- **Completed:** 2026-03-15T17:03:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Renamed `storybook` script from Expo/Metro command to `storybook dev -p 6006 --config-dir .storybook`
- Renamed `storybook:web` to `storybook:rn` to hold the Expo/Metro command (`cross-env EXPO_PUBLIC_STORYBOOK=true expo start`)
- `build-storybook:web` and `main` field left unchanged as required

## Task Commits

1. **Task 1: Rename Storybook scripts in package.json** - `6256a09` (fix)

**Plan metadata:** (see final metadata commit)

## Files Created/Modified

- `package.json` - Two script entries renamed: `storybook` now points to web Vite Storybook; `storybook:rn` (was `storybook:web`) now points to Expo/Metro

## Decisions Made

- Script key `storybook:web` dropped in favour of `storybook:rn` to align with the conventional `:rn` suffix used across React Native + Storybook projects; no other names or values changed.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Developers can now run `npm run storybook` to open the browser-based component explorer on http://localhost:6006
- React Native Storybook is accessible via `npm run storybook:rn`
- No blockers for continued Phase 1 work

## Self-Check

- [x] package.json exists and scripts are correct — verified via node verification script (output: "OK - all checks passed")
- [x] Commit 6256a09 exists in git log
- [x] `storybook:web` key no longer exists in package.json
- [x] `main` field remains `expo-router/entry`

## Self-Check: PASSED

---
*Phase: quick-6*
*Completed: 2026-03-15*
