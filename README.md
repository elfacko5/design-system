# Design System

A React + TypeScript component library built on a three-tier [Style Dictionary](https://styledictionary.com/) token pipeline, documented in [Storybook](https://storybook.js.org/), and sourced from a single Figma file. 34 components, light + dark themes, zero CSS-in-JS.

> Looking for the Figma-to-code conventions this repo follows? See [`CLAUDE.md`](./CLAUDE.md).

## Install

This package isn't published to a registry yet — consume it as a local/workspace dependency:

```bash
npm install
npm run build   # tokens/ -> dist/tokens.css, tokens.dark.css, tokens.d.ts, etc.
```

## Usage

Import the base stylesheet once at your app root, then use components like any other React components. Every component reads its colors, spacing, and typography from CSS custom properties — there's no theme provider to configure.

```tsx
import 'design-system/tokens.css';
import 'design-system/tokens.dark.css'; // optional — only needed if you support dark mode
import { Button, Card, TextField } from 'design-system';

function App() {
  return (
    <Card headline="Welcome">
      <TextField label="Email" placeholder="you@example.com" />
      <Button variant="primary">Continue</Button>
    </Card>
  );
}
```

### Dark mode

Dark mode is pure CSS — no JavaScript theme switching required. `tokens.dark.css` overrides every color variable inside a `[data-theme="dark"]` selector and a `prefers-color-scheme: dark` media query. To force dark mode explicitly, set an attribute on `<html>`:

```html
<html data-theme="dark"></html>
```

Components never branch on theme in their code — they only ever read `var(--color-*)` / `var(--component-*)`. The token values flip; the component markup does not.

## Token architecture

Tokens flow through three tiers and compile into `dist/`. Never skip a tier:

| Tier | Location | Rule |
|---|---|---|
| Core | `tokens/core/` | Raw values only (`color.primary.500`). Never referenced directly in component CSS. |
| Semantic | `tokens/semantic/` | Intent-based roles (`color.action.primary.default`). Reusable across many components. |
| Component | `tokens/component/` | Per-component values, only when the component's design genuinely diverges from the semantic default. |

```bash
npm run build         # one-shot token build
npm run build:watch   # rebuild on any tokens/**/*.json change
```

Build outputs:

- `dist/tokens.css` — every CSS custom property, flattened, under `:root`
- `dist/tokens.dark.css` — dark-mode overrides for every token (semantic *and* component tier) that defines a `darkValue`
- `dist/tokens.d.ts` / `dist/tokens.js` — typed/runtime token access from JS
- `dist/_tokens.scss` — SCSS variables, for consumers not using the CSS file directly

## Components

Every component ships as `ComponentName.tsx`, `.css`, `.stories.tsx`, `.test.tsx`, and an `index.ts` barrel, under `src/components/`. All are re-exported from the package root.

**Actions & inputs** — Button, ButtonGroup, IconButton, Fab, Checkbox, Radio, Toggle, TextField, SearchField, SegmentedControl, Dropdown, Picker

**Content & display** — Card, ArticleCard, Badge, Chip, Tag, ListItem, EmptyState, MediaPlaceholder, Container, Accordion, PaginationDots

**Feedback & overlays** — Dialog, Toast

**Navigation & structure** — TopAppBar, SectionHeader, SectionFooter, SheetTopBar, TabBar (+ TabBarItem)

**Chat** — ChatBubble, ChatInput, ChatLoadingIndicator

Run `npm run dev` and open Storybook to browse every component with its variants, states, and a light/dark toggle.

## Scope notes

A handful of things were deliberately left out of this library, disclosed here for visibility:

- **Native OS chrome** — iOS/Android status bars, native calendar/date-wheel overlays, and other platform-native surfaces aren't reproduced; they don't translate to a web component library. `Picker` covers the *collapsed trigger* for a date/time field, not the native wheel picker itself.
- **Radio's border/fill colors are inferred**, not pixel-verified — Figma renders that control as a flattened image asset that couldn't be sampled directly.
- **TabBar's "with plus" raised center-button variant** isn't implemented — the Figma source for that variant didn't have enough decomposable detail to reproduce accurately.
- Every component's top doc-comment states its source Figma node ID and calls out any inferred value or intentional deviation from Figma's literal default.

## Scripts

| Script | What it does |
|---|---|
| `npm run build` | Build design tokens (`tokens/` → `dist/`) |
| `npm run build:watch` | Rebuild tokens on file change |
| `npm run build:lib` | Bundle the component library (tsup) |
| `npm run dev` | Run Storybook locally |
| `npm run build-storybook` | Build a static Storybook site |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Run the test suite once (Vitest + Testing Library) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Lint with ESLint |
| `npm run lint:fix` | Lint and auto-fix |
| `npm run format` | Format `src/` with Prettier |
| `npm run format:check` | Check formatting without writing |

CI (`.github/workflows/ci.yml`) runs the token build, typecheck, test suite, library build, and Storybook build on every push/PR to `main`.

## Releasing

Versioning follows [Semantic Versioning](https://semver.org/); changes are logged by hand in [`CHANGELOG.md`](./CHANGELOG.md) (Keep a Changelog format) since this repo doesn't use an automated changeset tool.

To cut a release:

1. Move the relevant `[Unreleased]` entries in `CHANGELOG.md` into a new `## [x.y.z] - YYYY-MM-DD` section.
2. Bump `"version"` in `package.json` to match.
3. Commit, then tag and push: `git tag vx.y.z && git push origin vx.y.z`.
4. `.github/workflows/release.yml` runs on tag push — it builds, typechecks, tests, and (if configured) publishes to npm.

Publishing is not live yet. Before the release workflow can actually push a package, someone with repo access needs to:

- Remove `"private": true` from `package.json` (and confirm the `"name"` field is the real, available package name).
- Add an `NPM_TOKEN` secret to the repo (Settings → Secrets and variables → Actions).

Until then, tagging a release still gives you a verified, tested build — the publish step will simply fail without those two things in place, which is intentional so nothing ships by accident.

`npm run prepublishOnly` (build + typecheck + test + build:lib) also runs automatically before any local `npm publish`, as a last-resort guard.

## Contributing

Read `CLAUDE.md` before adding or editing a component — it defines the token-tier rules, naming conventions, and required files (component + styles + story + test) that keep this library consistent. Every new component should:

1. Pull exact specs from the source Figma file (linked in `CLAUDE.md`) — never guess a value.
2. Add tokens at the correct tier, referencing semantic tokens rather than raw hex/px where possible.
3. Include a `darkValue` for any component-tier color token, unless it's a status/alert color or a focus-ring color (those are intentionally theme-invariant across this library).
4. Ship with a Storybook story and a test file.
5. Document its Figma node ID and any inferred or deviated value in its top doc-comment.
