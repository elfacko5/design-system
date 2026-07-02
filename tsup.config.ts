import { defineConfig } from 'tsup';

/**
 * Bundles src/ into dist/ for consumption as a package.
 *
 * CSS imported by components (e.g. Button.css) is extracted into a single
 * dist/index.css. Consumers need to import both the token output and the
 * component styles:
 *
 *   import 'design-system/tokens.css';
 *   import 'design-system/styles.css';
 *
 * This is separate from the Style Dictionary build (`npm run build`, which
 * produces dist/tokens.css) — run that first, then `npm run build:lib`.
 */
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: false, // don't wipe dist/tokens*.css produced by the token build
  splitting: false,
  treeshake: true,
  minify: false,
});
