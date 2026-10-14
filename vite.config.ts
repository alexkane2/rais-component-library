/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from "vite";
import angular from "@analogjs/vite-plugin-angular";
import { resolve } from "path";
import { existsSync, readdirSync, rmSync } from "node:fs";

// dist/elements is the committed custom elements bundle (npm run build:elements).
// Vite would empty all of dist/ before building, so clear it here and keep that folder.
const keepElementsBundle = (): Plugin => ({
  name: "keep-dist-elements",
  apply: "build",
  buildStart() {
    const outDir = resolve(__dirname, "dist");
    if (!existsSync(outDir)) return;
    for (const entry of readdirSync(outDir)) {
      if (entry !== "elements") rmSync(resolve(outDir, entry), { recursive: true, force: true });
    }
  },
});

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  base: "./",
  plugins: [angular(), keepElementsBundle()],
  build: {
    outDir: "dist",
    emptyOutDir: false
  },
  server: {
    port: 3000,
    allowedHosts: true
  },
  publicDir: "public",
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});