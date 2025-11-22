# Playground

Interactive demo app for the Tailwind CSS Better Gradient plugin.

## Development

```bash
# From the root of the monorepo
pnpm dev

# Or from this directory
pnpm dev
```

This will:

1. Start the Vite dev server
2. Open the app automatically at `http://localhost:3000`
3. Hot reload on file changes

## Structure

```
playground/
├── components/          # Web Components
│   ├── gradient-playground.js
│   └── gradient-comparison.js
├── src/
│   └── input.css        # Tailwind CSS input file
├── dist/
│   └── output.css       # Generated CSS (gitignored)
├── index.html           # Demo page
├── tailwind.config.js    # Tailwind configuration
└── package.json
```

## Components

### `gradient-playground`

Interactive playground component for testing gradient configurations.

```html
<gradient-playground
  default-direction="to-b"
  default-color="purple-500"
  default-steps="6"
  height="h-64"
  show-code="true"
  background-pattern="true"
></gradient-playground>
```

### `gradient-comparison`

Component for comparing gradients side by side.

```html
<gradient-comparison
  left-label="Tailwind Default"
  left-classes="bg-gradient-to-b from-purple-500 to-transparent"
  right-label="Better Gradient"
  right-classes="fade-bg fade-bg-purple-500 fade-bg-to-b"
  height="h-64"
  show-code="true"
  background-pattern="true"
></gradient-comparison>
```
