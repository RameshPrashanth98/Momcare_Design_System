---
phase: quick-5
plan: 5
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - .storybook/main.ts
  - .storybook/preview.ts
autonomous: true
requirements: [QUICK-5]

must_haves:
  truths:
    - "npm run storybook:web starts Storybook 10 without errors"
    - "npm run build-storybook:web completes without errors"
    - "All 9 web stories (Welcome + 8 token stories) render correctly"
    - "a11y addon tab is visible and functional"
    - "Controls tab is visible"
  artifacts:
    - path: "package.json"
      provides: "Storybook 10 package versions, addon-essentials removed"
      contains: "storybook.*10\\.2\\.19"
    - path: ".storybook/main.ts"
      provides: "Storybook 10 config without addon-essentials"
    - path: ".storybook/preview.ts"
      provides: "Preview config compatible with Storybook 10"
  key_links:
    - from: ".storybook/main.ts"
      to: "@storybook/react-vite"
      via: "framework.name"
    - from: ".storybook/preview.ts"
      to: "@storybook/react"
      via: "Preview type import"
---

<objective>
Upgrade web Storybook from v8.6.x to v10.2.19.

Purpose: Storybook 10 removes addon-essentials (now in core), improves performance, and is the current stable release. The upgrade keeps all 9 existing web stories functional and the a11y addon working.
Output: Updated package.json, main.ts, and preview.ts compatible with Storybook 10.
</objective>

<execution_context>
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@.planning/quick/5-upgrade-web-storybook-from-v8-to-v10/5-PLAN.md
@package.json
@.storybook/main.ts
@.storybook/preview.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update package.json to Storybook 10</name>
  <files>package.json</files>
  <action>
    Make the following changes to package.json:

    In `dependencies`:
    - Change `"storybook": "^8.6.0"` to `"storybook": "^10.2.19"`

    In `devDependencies`:
    - Change `"@storybook/addon-a11y": "^8.6.18"` to `"@storybook/addon-a11y": "^10.2.19"`
    - Change `"@storybook/react": "^8.6.18"` to `"@storybook/react": "^10.2.19"`
    - Change `"@storybook/react-vite": "^8.6.18"` to `"@storybook/react-vite": "^10.2.19"`
    - REMOVE `"@storybook/addon-essentials": "^8.6.14"` entirely — this package does not exist at v10; controls/actions/backgrounds/viewport are now built into the storybook core package

    Do NOT touch: `@storybook/react-native` (on-device RN Storybook, separate), `vite` (already at ^6.4.1 which Storybook 10 supports), or any other deps.

    Then run: `npm install` to update node_modules and package-lock.json.
  </action>
  <verify>
    <automated>node -e "const p = require('./package.json'); console.log(p.dependencies.storybook, p.devDependencies['@storybook/react'], p.devDependencies['@storybook/addon-essentials'])"</automated>
  </verify>
  <done>
    package.json shows storybook ^10.2.19, @storybook/react ^10.2.19, no @storybook/addon-essentials key.
    npm install completes without peer dependency errors.
  </done>
</task>

<task type="auto">
  <name>Task 2: Update .storybook/main.ts and preview.ts for v10</name>
  <files>.storybook/main.ts, .storybook/preview.ts</files>
  <action>
    Update `.storybook/main.ts`:
    - Remove `"@storybook/addon-essentials"` from the `addons` array — it no longer exists at v10
    - Keep `"@storybook/addon-a11y"` in addons
    - Keep `framework`, `stories`, and `viteFinal` unchanged
    - The resulting addons array should be: `["@storybook/addon-a11y"]`

    Update `.storybook/preview.ts`:
    - The `Preview` type import from `"@storybook/react"` is still valid in v10 — no change needed there
    - Keep `parameters`, `globals`, and the default export exactly as-is — the controls matchers, a11y config, and designTokens globals are all compatible with v10
    - No changes required to preview.ts unless the import fails after npm install (check with the verify step)

    After editing, do a smoke-check build (not full build, just confirm no config parse errors):
    Run: `npx storybook build --config-dir .storybook --output-dir storybook-static --quiet 2>&1 | head -40`
  </action>
  <verify>
    <automated>npx storybook build --config-dir .storybook --output-dir storybook-static 2>&1 | tail -5</automated>
  </verify>
  <done>
    .storybook/main.ts addons array contains only @storybook/addon-a11y.
    storybook build completes without errors (exit code 0, output shows "Build complete" or similar success message).
    storybook-static/ directory is created with index.html present.
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>
    Storybook upgraded to v10.2.19. package.json updated, addon-essentials removed, main.ts addons trimmed, build verified.
  </what-built>
  <how-to-verify>
    1. Run: `npm run storybook:web` — Storybook dev server should start on http://localhost:6006
    2. Open http://localhost:6006 in a browser
    3. Confirm the sidebar shows all 9 stories (Design System/Welcome + 8 token stories)
    4. Open any story — confirm it renders without errors
    5. Check the bottom panel tabs — "Controls" and "Accessibility" tabs should be visible
    6. Click the "Accessibility" tab — a11y checks should run and show results
    7. Run: `npm run build-storybook:web` — confirm it exits with code 0 and storybook-static/ is populated
  </how-to-verify>
  <resume-signal>Type "approved" if all 7 checks pass, or describe any issues found</resume-signal>
</task>

</tasks>

<verification>
- package.json: storybook at ^10.2.19, no addon-essentials, @storybook/addon-a11y at ^10.2.19
- .storybook/main.ts: addons: ["@storybook/addon-a11y"] only
- storybook build completes (storybook-static/index.html exists)
- storybook dev server starts and all 9 stories load
- Controls and Accessibility tabs visible in UI panel
</verification>

<success_criteria>
`npm run storybook:web` starts without errors on Storybook 10. `npm run build-storybook:web` completes successfully. All 9 web stories render. a11y tab visible and running checks. Controls tab visible.
</success_criteria>

<output>
After completion, create `.planning/quick/5-upgrade-web-storybook-from-v8-to-v10/5-SUMMARY.md`
</output>
