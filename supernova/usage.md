# Supernova Agent Rules

When using the codebase, follow these rules:

## Angular Basics

### Standalone Components
- Always use standalone components (`standalone: true` in @Component decorator)
- Import required modules directly in the component's `imports` array
- Do not create or use NgModules

```typescript
@Component({
  selector: "app-example",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `...`,
})
export class ExampleComponent {}
```

### Component Structure
- Use inline templates for simple components (< 50 lines)
- Use inline styles for component-specific CSS
- Place the template before styles in the decorator
- Export components as default only when required by routing

### Template Syntax
- Use `@if` and `@for` control flow syntax (Angular 17+), not `*ngIf` and `*ngFor`
- Use signal-based reactivity where appropriate
- Prefer template expressions over complex logic in templates

```html
<!-- Preferred -->
@if (isVisible) {
  <div>Content</div>
}

@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}

<!-- Avoid -->
<div *ngIf="isVisible">Content</div>
<div *ngFor="let item of items">{{ item.name }}</div>
```

### Data Binding
- Use `[(ngModel)]` for two-way binding with FormsModule
- Use `[property]` for property binding
- Use `(event)` for event binding
- Use `{{ expression }}` for interpolation

### Services and Dependency Injection
- Use `inject()` function instead of constructor injection
- Services should use `providedIn: 'root'` for singleton services

```typescript
export class MyComponent {
  private myService = inject(MyService);
}
```

## Custom Template

This repository is a minimal Angular template with no prescribed UI library. Use it as a blank base to build on.

### UI & Structure
- Use standard HTML elements or add any component library you need
- Import only what you use; keep the app bundle lean
- App shell is minimal: root component and content—structure pages and layout as you like
- Prefer semantic HTML (`<header>`, `<main>`, `<nav>`, `<section>`, etc.) for clarity and accessibility

### Theming & Styling
- Use CSS custom properties in `styles.scss` for global theme tokens (colors, spacing, typography)
- Keep component styles scoped; use shared variables for consistency
- No built-in design system—define or adopt one as needed

## Private component library

This project may use a **private/custom component library**. The package name, import paths, and component names in this section are **placeholders**. When you clone or fork this repo, replace them with your actual library details (package name, barrel paths, and component names).

### How to import

- Import components from the library package configured for this project (see the example below for the placeholder used in this repo).
- Use **standalone** imports: add each component you use into the consuming component’s `imports` array. Do not import entire NgModules unless the library only provides modules.
- Import only the components you need to keep the bundle small.

**Placeholder configuration (replace with your real library):**

| What | Placeholder | You replace with |
|------|-------------|-------------------|
| Package name | `@your-org/your-ui` | Your npm package name (e.g. `@acme/design-system`) |
| Component names | `YourButton`, `YourCard`, etc. | Actual component names from your library |

### Example

```typescript
// Replace @your-org/your-ui and YourButton, YourCard with your library’s package and component names
import { YourButton, YourCard } from "@your-org/your-ui";

@Component({
  standalone: true,
  imports: [CommonModule, YourButton, YourCard],
  template: `
    <your-card>
      <your-button>Action</your-button>
    </your-card>
  `,
})
export class ExampleComponent {}
```

- In templates, use the **selector** your library defines (e.g. `your-button`, `your-card`). If the library uses a different prefix or naming, follow its documentation.
- If the library exposes a barrel (e.g. `@your-org/your-ui`), prefer importing from that barrel. If it uses subpaths (e.g. `@your-org/your-ui/button`), use those paths as documented by the library.

## Code Style

### Naming Conventions
- Components: PascalCase with `Component` suffix (e.g., `LoginFormComponent`)
- Services: PascalCase with `Service` suffix (e.g., `AuthService`)
- Selectors: kebab-case with `app-` prefix (e.g., `app-login-form`)
- Files: kebab-case (e.g., `login-form.component.ts`)

### TypeScript
- Use strict typing, avoid `any` where possible
- Use interfaces for data models
- Use `readonly` for immutable properties
- Prefer `const` over `let`

### Styling
- Use flexbox or CSS grid for layouts
- Use `gap` property for spacing between flex/grid items
- Prefer CSS custom properties for theming values
- Keep styles scoped to components

## File Structure

```
src/
├── app.component.ts      # Root component (AI generates code here)
├── app.config.ts         # Application configuration
├── main.ts               # Bootstrap entry point
├── styles.scss           # Global styles and theme tokens
├── components/           # Shared components
├── services/             # Application services
└── lib/                  # Utilities and helpers
```

## Important Notes

1. The `app.component.ts` is where AI-generated code should be placed
2. Always import `FormsModule` when using `[(ngModel)]`
3. Zone.js is imported in main.ts and required for Angular change detection
4. Add and import only the dependencies and UI pieces you need—the template stays unopinionated
