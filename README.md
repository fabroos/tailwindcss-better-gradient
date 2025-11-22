# Tailwind CSS Better Gradient Monorepo

A monorepo containing the Tailwind CSS Better Gradient plugin and its playground demo.

## Structure

```
.
├── packages/
│   └── tailwindcss-better-gradient/  # 📦 The plugin package (publishable)
├── apps/
│   └── playground/                    # 🎮 Demo app (not published)
├── package.json                       # Root workspace configuration
└── README.md                          # This file
```

## Package

### `tailwindcss-better-gradient` 📦

The main Tailwind CSS plugin package for creating beautiful gradient backgrounds with directional control.

**Installation:**
```bash
npm install tailwindcss-better-gradient
```

See [packages/tailwindcss-better-gradient/README.md](./packages/tailwindcss-better-gradient/README.md) for detailed documentation.

## App

### `playground` 🎮

Interactive demo app for testing the plugin. This is a development tool and is not published.

**Development:**
```bash
pnpm dev
```

This will start the Vite dev server. The app will open automatically at `http://localhost:3000`.

## Development

### Setup

```bash
# Install dependencies
pnpm install
```

### Build

```bash
# Build all packages
pnpm build

# Build specific app
pnpm build:playground  # Build the playground app
```

### Development Mode

```bash
# Start playground in watch mode
pnpm dev
```

## Workspace Scripts

- `pnpm dev` - Start playground app development server
- `pnpm build` - Build playground app
- `pnpm build:playground` - Build playground app

## License

MIT
