---
phase: 01-foundation-infrastructure
plan: "04"
subsystem: ui
tags: [cn, clsx, tailwind-merge, cva, class-variance-authority, barrel-export, typescript, nativewind]

requires:
  - phase: 01-01
    provides: clsx, tailwind-merge, class-variance-authority already installed as package deps

provides:
  - cn() utility combining clsx (conditional classes) + tailwind-merge (conflict resolution)
  - src/index.ts barrel export skeleton with phase-by-phase expansion comments
  - docs/conventions/cva-pattern.md enforced coding standard for all 50 v1 components

affects:
  - All Phase 2–6 component files (cn() used for every className construction)
  - All variant-based components (cva pattern is the law)
  - CLAUDE.md and PR reviews (cva-pattern.md is the reference document)

tech-stack:
  added: []
  patterns:
    - "cn() pattern: always use cn() for className — never string concat, template literals, or raw ternaries"
    - "cva pattern: all variant/size/state props defined via cva() with complete static class strings"
    - "VariantProps type export: always export VariantProps<typeof xVariants> for consumer type inference"
    - "Barrel export: all public API exported from src/index.ts — consumers import from single entry point"

key-files:
  created:
    - src/utils/cn.ts (cn() utility — clsx + twMerge combination)
    - src/index.ts (barrel export skeleton with phase-by-phase expansion plan)
    - docs/conventions/cva-pattern.md (enforced coding standard, WRONG/CORRECT examples)
  modified: []

key-decisions:
  - "cn() is the ONLY approved method for className construction — no template literals, no string concat"
  - "cva-pattern.md is enforced from Phase 2 onwards — every variant component must follow it"
  - "src/index.ts is the single public API surface — all consumers import from here, not from deep paths"

patterns-established:
  - "cn() usage: cn(baseClasses, conditionalClass && 'class', className) — standard call signature"
  - "cva definition: cva('base', { variants: {...}, defaultVariants: {...} }) in same file as component"
  - "Barrel export growth: each phase uncomments its export section in src/index.ts"

requirements-completed: [FOUN-12, FOUN-13]

duration: 10min
completed: 2026-03-15
---

# Phase 01 Plan 04: cn() Utility, Barrel Export, and cva Convention Summary

**cn() class-merging utility (clsx + tailwind-merge) with barrel export skeleton and documented cva anti-patterns banning dynamic template literals across all 50 components**

## Performance

- **Duration:** 10 min
- **Started:** 2026-03-15T15:09:00Z
- **Completed:** 2026-03-15T15:19:16Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- cn() utility passes all 4 behavior tests: merging, deduplication (last wins), conditional classes, graceful null/undefined handling
- src/index.ts barrel export skeleton with commented phase-by-phase expansion plan for Phases 2–6
- cva-pattern.md convention document with explicit WRONG examples (template literals, string concat, bare ternaries) and CORRECT alternatives (cn() ternary, cva compound variants, object syntax)
- Full 47-test suite passes; tsc --noEmit exits 0

## Task Commits

Each task was committed atomically:

1. **Task 1: cn() utility and barrel export** - `af17201` (feat)
2. **Task 2: cva convention documentation** - `4e235b3` (docs)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `src/utils/cn.ts` — cn() combining clsx + twMerge; JSDoc with NEVER template literal warning
- `src/index.ts` — barrel export skeleton: Phase 1 exports active, Phases 2–6 commented with section headers
- `docs/conventions/cva-pattern.md` — enforced standard for all variant components; NativeWind compile-time rationale, WRONG/CORRECT sections, naming convention table, VariantProps type export pattern

## Decisions Made

- **cn() as sole className method.** Template literals and string concatenation produce no styles under NativeWind v4 compile-time transform. cn() is the only approved constructor — documented as NEVER in both cn.ts JSDoc and cva-pattern.md.
- **cva-pattern.md is enforced, not advisory.** Marked "ENFORCED" in document header. Applies to every component with variant/size/state prop starting Phase 2.
- **Barrel export commented skeleton.** Future phases uncomment their section in src/index.ts as components are built — preserves single import surface without breaking consumers mid-phase.

## Deviations from Plan

None - plan executed exactly as written. Test stubs existed from Plan 00 (Wave 0 pattern). Implementation matched spec precisely.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- cn() ready for use in all Phase 2–6 components — tested and type-safe
- cva-pattern.md convention established — Phase 2 component implementors read this before writing any variant component
- src/index.ts barrel export ready — Phase 2 uncomments the primitives section when Text/Badge/Icon are built
- All 47 tests passing — clean baseline for Phase 2

---
*Phase: 01-foundation-infrastructure*
*Completed: 2026-03-15*
