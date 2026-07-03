# Changelog

All notable changes to this project are documented in this file. The format
is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Fixed

- `tokens/semantic/tokens.json`: `text.primary` and `text.secondary` corrected
  to `neutral.800`/`neutral.500` (were `neutral.900`/`neutral.600`) to match
  the real Figma title/subtitle text values, found while wiring up Figma
  variable dark-mode bindings.

### Changed (Figma)

- Added a `Dark` mode directly to the existing `semantic` Figma variable
  collection (rather than maintaining a separate standalone collection),
  covering `color/surface/*`, `color/action/*` (brand, neutral, danger), and
  five new theme-adaptive text variables (`color/text/primary`, `secondary`,
  `muted`, `disabled`, `inverse`) that didn't exist before.
- Rebound thousands of previously-hardcoded fill/stroke/text colors across
  all 34 shipped components to these semantic variables, so selecting a
  frame and toggling "Apply variable mode" to Dark now actually reflects the
  real dark theme. Status colors (danger/warning/success/info), brand
  accents, and decorative/demo-placeholder content were intentionally left
  untouched, matching the same invariance already used on the code side.
- Removed the standalone "Design Tokens (from code)" collection (40
  variables) — superseded by the `semantic` collection's own Dark mode.

## [0.1.0] - 2026-07-02

Initial release. 34 components, sourced from the team's Figma file
node-by-node, built on a 3-tier Style Dictionary token pipeline with full
light/dark theme support.

### Added

- Token pipeline: `tokens/core`, `tokens/semantic`, `tokens/component` →
  `dist/tokens.css`, `tokens.dark.css`, `tokens.d.ts`, `tokens.js`, `_tokens.scss`.
- Components: Accordion, ArticleCard, Badge, Button, ButtonGroup, Card,
  ChatBubble, ChatInput, ChatLoadingIndicator, Checkbox, Chip, Container,
  Dialog, Dropdown, EmptyState, Fab, IconButton, ListItem, MediaPlaceholder,
  PaginationDots, Picker, Radio, SearchField, SectionFooter, SectionHeader,
  SegmentedControl, SheetTopBar, TabBar, TabBarItem, Tag, TextField, Toast,
  Toggle, TopAppBar.
- Storybook with a light/dark theme toggle for every component.
- Vitest + Testing Library test suite (one file per component).
- ESLint (flat config, TypeScript + React + Hooks rules) and Prettier.
- GitHub Actions CI: token build, typecheck, test, library build, Storybook build.
- `prepublishOnly` script (build + typecheck + test + build:lib) as a guard against publishing a broken build.
- `.github/workflows/release.yml` — tag-triggered build/test/publish workflow (publishing itself stays inert until `private: true` is removed and an `NPM_TOKEN` secret is added).
- "Releasing" section in `README.md` documenting the version/tag/publish process.
- `TopAppBar` gained an optional `progress` prop (thin progress track under the title row), sourced from the Figma "Navigation" pattern page's "Hierarchy Level 2 with progress bar" config.
- A Figma Variables collection ("Design Tokens (from code)") synced from the semantic token tier, giving designers a Light/Dark mode toggle in Figma that matches `tokens.css` / `tokens.dark.css`.

### Fixed

- Dark-mode CSS build was silently dropping every component-tier `darkValue`
  (only semantic-tier overrides ever reached `tokens.dark.css`) — component
  dark-mode colors now actually apply.
- `ListItem`'s leading-icon swatch used a color combination that fell to
  2.31:1 contrast (below the 3:1 WCAG minimum for meaningful icons); it now
  uses a dedicated, audited token.
- `Toast`'s headline/paragraph/button text incorrectly picked up a dark-mode
  override that put near-white text on its (intentionally theme-invariant)
  light pastel background; reverted.
- `Picker` rendered as inert, non-interactive markup despite representing a
  clickable date/time trigger; its segments are now real, keyboard-accessible
  buttons.
- `actions/checkout` and `actions/setup-node` bumped to v6 in CI/release
  workflows to clear a Node 20 runner-deprecation warning.

### Known limitations

- Native OS chrome (status bars, native date/calendar wheel overlays) isn't
  reproduced — out of scope for a web component library.
- `Radio`'s border/fill colors are inferred, not pixel-verified against Figma.
- `TabBar`'s "with plus" raised center-button variant isn't implemented.

[Unreleased]: https://github.com/elfacko5/design-system/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/elfacko5/design-system/releases/tag/v0.1.0
