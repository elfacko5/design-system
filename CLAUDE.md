# Design System — Claude Code conventions

This file teaches Claude Code how this design system is structured so every
session stays consistent without re-explaining the setup.

## Stack

- **Tokens**: JSON (3 tiers) → Style Dictionary v4 → `dist/`
- **Components**: React + TypeScript
- **Styling**: CSS custom properties from `dist/tokens.css` (no Tailwind, no CSS-in-JS)
- **Docs**: Storybook
- **Bundler**: tsup

## Token tiers — never skip a tier

| Tier | Folder | Rule |
|------|--------|------|
| Core | `tokens/core/` | Raw values only. Never reference in component CSS. |
| Semantic | `tokens/semantic/` | Intent-based roles. Use these in components. |
| Component | `tokens/component/` | Per-component overrides only when needed. |

**Components consume semantic tokens** (`var(--color-action-primary-default)`),
not core tokens (`var(--color-primary-500)`). Only use component tokens
(`var(--component-button-border-radius)`) when the component's value genuinely
diverges from the semantic default.

## Naming conventions (match Figma exactly)

- Colors: `{group}.{stop}` → `primary.500`, `neutral.white`, `gray.400`
- CSS vars: kebab-case → `--color-primary-500`, `--color-action-primary-default`
- TS tokens: camelCase → `tokens.color.primary["500"]`

## Component rules

Every component must:
1. Consume only CSS custom properties — no hardcoded hex, no hardcoded px
2. Have variants typed as a union: `type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'`
3. Export a Storybook story alongside the component file
4. Be accessible: keyboard navigable, `aria-*` where needed, visible focus ring
   using `var(--color-border-focus)`

## File structure

```
tokens/
  core/         → colors.json, typography.json, dimension.json
  semantic/     → tokens.json
  component/    → tokens.json
dist/
  tokens.css    → all CSS custom properties (import this in your app root)
  tokens.dark.css → dark mode overrides (import after tokens.css)
  tokens.d.ts   → TypeScript types + token() and cssVar() helpers
src/
  components/
    Button/
      Button.tsx
      Button.stories.tsx
      Button.test.tsx
      index.ts
sd.config.js    → Style Dictionary build config
```

## Running the token build

```bash
npm run build       # one-shot
npm run build:watch # rebuild on token file changes
```

## Dark mode

Dark mode is handled entirely via CSS custom property overrides in
`dist/tokens.dark.css`. No JavaScript theme switching is needed unless the
user wants to manually toggle — in that case set `data-theme="dark"` on `<html>`.

Components never branch on a theme — they always read `var(--color-*)`.
The token values flip; the component code does not.

## Figma source

File: https://www.figma.com/design/I4voEv2YL7XZHdb23PLWt0/
Inspected values (ground truth):
- Button fill → `--color-primary-500: #3d3e9f`
- Button label → `--color-neutral-50: #f9fafb`, Inter Medium 16px
- Button shape → `border-radius: 9999px`
- Button size  → 48px height, px-24, py-12
- Toggle       → 52×32px
- Section header → 36px height
