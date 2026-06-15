# RAIS Component Library

An Angular 19 component library built on [PrimeNG](https://primeng.org/) and developed in [Storybook](https://storybook.js.org/). Components live in `src/components/`, each with its own template, styles, and `*.stories.ts` file. Design tokens (generated from Figma) live in `src/index.css`.

## Getting started

```bash
npm install
```

## Storybook (primary workflow)

Storybook is where components are developed and previewed in isolation:

```bash
npm run storybook        # dev server with live reload
npm run build-storybook  # static build
```

Visual regression is published via Chromatic:

```bash
npm run chromatic
```

## Local playground (optional)

A minimal Vite + Angular app is included for previewing components outside Storybook. Edit `src/app.component.ts` to import and render any component, then:

```bash
npm run dev      # http://localhost:3000
npm run build    # production build to dist/
```

## Project structure

```
.
├── .storybook/           # Storybook config
├── src/
│   ├── components/        # Components (one folder each: .ts / .html / .scss / .stories.ts)
│   ├── index.css         # Design system tokens (generated from Figma)
│   ├── app.component.ts  # Local playground root
│   ├── app.config.ts     # Angular providers (PrimeNG theme, animations)
│   └── main.ts           # Playground bootstrap entry
├── public/               # Static assets
└── vite.config.ts        # Vite + Vitest (Storybook test) config
```

## Tooling

- **Framework:** Angular 19 (standalone components)
- **UI base:** PrimeNG 19 with the `@primeuix/themes` Aura preset
- **Build:** Vite (via `@analogjs/vite-plugin-angular`)
- **Docs/dev:** Storybook 10
- **Testing:** Vitest + Playwright (Storybook test addon) — `npm run lint` for ESLint
