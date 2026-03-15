---
phase: quick-6
plan: 01
type: execute
wave: 1
depends_on: []
files_modified: [package.json]
autonomous: true
requirements: [QUICK-6]

must_haves:
  truths:
    - "`npm run storybook` launches the browser-based Vite Storybook on port 6006"
    - "`npm run storybook:rn` launches the Expo/Metro React Native Storybook on port 8081"
    - "`npm run build-storybook:web` continues to work for static builds"
  artifacts:
    - path: "package.json"
      provides: "Corrected script names"
      contains: "\"storybook\": \"storybook dev -p 6006"
  key_links:
    - from: "package.json scripts.storybook"
      to: "storybook dev -p 6006 --config-dir .storybook"
      via: "direct rename"
      pattern: "storybook dev"
---

<objective>
Fix the `npm run storybook` script so it launches the browser-based Vite Storybook on port 6006 instead of the Expo/Metro React Native Storybook on port 8081.

Purpose: Developers running `npm run storybook` expect a browser window, not Expo. The script names are inverted relative to convention.
Output: Corrected package.json with `storybook` pointing to the web Vite Storybook and `storybook:rn` pointing to Expo/Metro.
</objective>

<execution_context>
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@package.json
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rename Storybook scripts in package.json</name>
  <files>package.json</files>
  <action>
In package.json, update the `scripts` section with these exact renames:

Before:
```json
"storybook": "cross-env EXPO_PUBLIC_STORYBOOK=true expo start",
"storybook:web": "storybook dev -p 6006 --config-dir .storybook",
```

After:
```json
"storybook": "storybook dev -p 6006 --config-dir .storybook",
"storybook:rn": "cross-env EXPO_PUBLIC_STORYBOOK=true expo start",
```

The `build-storybook:web` script is unchanged. No other changes to package.json.

Note: The existing STATE.md decision "[Pre-phase]: Storybook entry point uses EXPO_PUBLIC_STORYBOOK env-var toggle — do not modify package.json main field" is NOT violated — only script names change, `main` field stays as `expo-router/entry`.
  </action>
  <verify>
    <automated>node -e "const p=require('./package.json'); const s=p.scripts; if(!s.storybook.includes('storybook dev')) process.exit(1); if(!s['storybook:rn'].includes('EXPO_PUBLIC_STORYBOOK')) process.exit(1); if(s['storybook:web']) process.exit(1); console.log('OK');"</automated>
  </verify>
  <done>
    - `npm run storybook` launches `storybook dev -p 6006 --config-dir .storybook` (Vite web Storybook)
    - `npm run storybook:rn` launches `cross-env EXPO_PUBLIC_STORYBOOK=true expo start` (Expo/Metro)
    - `storybook:web` key no longer exists in package.json
    - `main` field in package.json is still `expo-router/entry`
  </done>
</task>

</tasks>

<verification>
Run the automated verify command in Task 1. Optionally confirm by running `npm run storybook` and checking that the browser opens on http://localhost:6006.
</verification>

<success_criteria>
`npm run storybook` opens browser-based Storybook on port 6006. `npm run storybook:rn` starts Expo/Metro. No package.json fields other than the two script names are modified.
</success_criteria>

<output>
After completion, create `.planning/quick/6-fix-storybook-issue/6-SUMMARY.md`
</output>
