# Development Guide

Quick reference for development workflows and available tools.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build everything
pnpm build

# Run tests
pnpm test
```

## Available Scripts

### Root Level Scripts

```bash
# Development
pnpm dev                    # Start playground dev server
pnpm build                  # Build package + playground
pnpm build:package          # Build only the package
pnpm build:playground       # Build only the playground

# Code Quality
pnpm typecheck              # Type check TypeScript
pnpm lint                   # Run linter
pnpm format                 # Format code with Prettier
pnpm format:check           # Check formatting without fixing

# Version Management
pnpm changeset              # Add a new changeset
pnpm version                # Version packages based on changesets
pnpm version:packages       # Alias for version (used in CI)
pnpm release                # Build and publish to npm

# Utilities
pnpm clean                  # Clean build artifacts
pnpm test                   # Build and test everything
```

### Package Scripts

```bash
cd packages/tailwindcss-better-gradient

pnpm build                  # Compile TypeScript
pnpm typecheck              # Type check without emitting
pnpm clean                  # Remove dist folder
```

## Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes**
   - Edit `index.ts` for TypeScript changes
   - Edit `index.css` for CSS utilities
   - Test in `apps/playground`

3. **Add a changeset**
   ```bash
   pnpm changeset
   ```
   - Select the package
   - Choose change type (patch/minor/major)
   - Describe the change

4. **Format and check**
   ```bash
   pnpm format
   pnpm typecheck
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push
   ```

### Testing Changes

```bash
# Build the package
pnpm build:package

# Test in playground
pnpm dev

# Or build playground
pnpm build:playground
```

## Version Management with Changesets

### Adding a Changeset

When you make changes that should be released:

```bash
pnpm changeset
```

This creates a file in `.changeset/` describing your changes.

### Versioning

When ready to release:

```bash
pnpm version
```

This will:
- Update package versions based on changesets
- Update CHANGELOG.md
- Remove used changeset files

### Publishing

After versioning:

```bash
pnpm release
```

Or manually:
```bash
cd packages/tailwindcss-better-gradient
npm publish --access public
```

## Code Formatting

We use Prettier for consistent code formatting.

```bash
# Format all files
pnpm format

# Check formatting
pnpm format:check
```

Configuration is in `.prettierrc`.

## Type Checking

```bash
# Type check without building
pnpm typecheck
```

This runs `tsc --noEmit` to check for type errors without generating files.

## CI/CD

### GitHub Actions

- **CI Workflow** (`.github/workflows/ci.yml`):
  - Runs on push/PR to main
  - Type checks
  - Builds package and playground
  - Checks formatting

- **Release Workflow** (`.github/workflows/release.yml`):
  - Runs on push to main
  - Creates release PR or publishes to npm
  - Uses changesets for version management

### Setup Required

For automated releases, add these secrets to GitHub:
- `NPM_TOKEN` - npm authentication token

## Project Structure

```
.
├── .changeset/              # Changeset files
├── .github/workflows/       # GitHub Actions
├── apps/
│   └── playground/          # Demo app
├── packages/
│   └── tailwindcss-better-gradient/
│       ├── index.ts         # TypeScript source
│       ├── index.css        # CSS-based plugin
│       ├── dist/            # Compiled output
│       └── package.json
├── CHANGELOG.md             # Auto-generated changelog
├── CONTRIBUTING.md          # Contribution guide
└── package.json             # Root workspace config
```

## Tools Used

- **Changesets** - Version management and changelog generation
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **pnpm** - Package manager
- **GitHub Actions** - CI/CD

## Node Version

Specified in `.nvmrc`: Node.js 20

Use `nvm use` to switch to the correct version.

## Troubleshooting

### Build Fails

```bash
# Clean and rebuild
pnpm clean
pnpm build
```

### Type Errors

```bash
# Check types
pnpm typecheck

# Rebuild types
pnpm build:package
```

### Formatting Issues

```bash
# Auto-fix formatting
pnpm format
```

## Resources

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Prettier Documentation](https://prettier.io/docs/en/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [pnpm Documentation](https://pnpm.io/)

