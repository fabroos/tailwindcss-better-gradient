# Publishing Guide for `tailwindcss-better-gradient`

Complete guide for publishing the Tailwind CSS Better Gradient plugin to npm.

## Package Overview

This package provides both:
- **CSS-based plugin** (`index.css`) - Primary method for Tailwind CSS v4 using `@utility` directives
- **JavaScript plugin** (`dist/index.js`) - Backward compatibility for Tailwind v3

**Current Version:** `0.0.8`  
**Package Name:** `tailwindcss-better-gradient`  
**Registry:** https://www.npmjs.com/package/tailwindcss-better-gradient

## Pre-Publishing Checklist

### ✅ Package Structure Verification

Verify these files exist and are correct:

- [x] `index.css` - CSS-based plugin (Tailwind v4)
- [x] `index.ts` - TypeScript source
- [x] `dist/index.js` - Compiled JavaScript (auto-generated)
- [x] `dist/index.d.ts` - TypeScript definitions (auto-generated)
- [x] `README.md` - Documentation
- [x] `LICENSE` - MIT License
- [x] `package.json` - Package configuration

### ✅ Package.json Verification

Check that `package.json` includes:

```json
{
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "style": "index.css",
  "files": ["dist", "index.css", "README.md", "LICENSE"],
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  }
}
```

### ✅ Build Verification

Ensure the TypeScript compiles successfully:

```bash
cd packages/tailwindcss-better-gradient
pnpm run build  # or npm run build
```

This should:
- Compile `index.ts` → `dist/index.js`
- Generate `dist/index.d.ts` type definitions
- Show no errors

### ✅ Test Before Publishing

Test the package locally:

```bash
# From package directory
cd packages/tailwindcss-better-gradient

# Build the package
pnpm run build

# Test in playground
cd ../../apps/playground
pnpm run build

# Should complete without errors
```

## Publishing Process

### Step 1: Navigate to Package Directory

```bash
cd packages/tailwindcss-better-gradient
```

### Step 2: Verify Package Contents

```bash
# Dry run to see what will be published
npm pack --dry-run

# Expected output should show:
# - dist/index.js
# - dist/index.d.ts
# - dist/index.d.ts.map
# - index.css
# - README.md
# - LICENSE
# - package.json
```

### Step 3: Check npm Login Status

```bash
# Verify you're logged in
npm whoami

# If not logged in:
npm login
# Enter: username, password, email, OTP (if 2FA enabled)
```

### Step 4: Check Current Version on npm

```bash
# Check what version is currently published
npm view tailwindcss-better-gradient version

# View full package info
npm view tailwindcss-better-gradient
```

### Step 5: Update Version

Choose the appropriate version bump:

```bash
# Patch version (bug fixes, patches)
npm version patch   # 0.0.8 → 0.0.9

# Minor version (new features, non-breaking)
npm version minor   # 0.0.8 → 0.1.0

# Major version (breaking changes)
npm version major   # 0.0.8 → 1.0.0

# Or manually edit package.json, then:
git add package.json
git commit -m "Bump version to X.X.X"
```

**Version Bump Guidelines:**
- **Patch** (`0.0.X`): Bug fixes, documentation updates, minor improvements
- **Minor** (`0.X.0`): New features, new utilities, non-breaking changes
- **Major** (`X.0.0`): Breaking changes, API changes, major refactors

### Step 6: Build and Verify

```bash
# The prepublishOnly script will run this automatically, but verify first:
pnpm run build

# Check for any TypeScript errors
# Verify dist/ folder contains:
# - index.js
# - index.d.ts
# - index.d.ts.map
```

### Step 7: Publish to npm

```bash
# Make sure you're in the package directory
cd packages/tailwindcss-better-gradient

# Publish (public package)
npm publish --access public

# The prepublishOnly hook will automatically:
# 1. Run `npm run build` to compile TypeScript
# 2. Ensure dist/ folder is up to date
# 3. Then publish the package
```

### Step 8: Verify Publication

```bash
# Check the published version
npm view tailwindcss-better-gradient version

# View full package details
npm view tailwindcss-better-gradient

# Visit on npm website
# https://www.npmjs.com/package/tailwindcss-better-gradient
```

### Step 9: Git Tagging (Recommended)

```bash
# From repository root
cd /Users/fabroos/dev/personal/tailwindcss-bettershadow

# Create a git tag matching the version
git tag v0.0.8

# Push tag to remote (if remote is configured)
git push origin v0.0.8

# Or push all tags
git push --tags
```

## Quick Publish Command

For quick updates after making changes:

```bash
cd packages/tailwindcss-better-gradient
pnpm run build && npm version patch && npm publish --access public
```

This will:
1. Build TypeScript
2. Bump patch version
3. Publish to npm

## Post-Publishing

### Update Documentation

- [ ] Verify README.md is up to date
- [ ] Check that examples work with latest version
- [ ] Consider adding CHANGELOG.md for tracking changes

### Announce Release (Optional)

- Update GitHub releases if using GitHub
- Announce on social media/community channels
- Update any documentation sites

## Package Structure Details

### Files Included in npm Package

The `files` field in `package.json` controls what gets published:

```json
"files": [
  "dist",        // Compiled JavaScript and TypeScript definitions
  "index.css",   // CSS-based plugin for Tailwind v4
  "README.md",   // Documentation
  "LICENSE"      // MIT License
]
```

**Excluded (automatically):**
- `node_modules/`
- `index.ts` (source, not needed in package)
- `tsconfig.json` (build config, not needed)
- `.git/` and other dotfiles
- `dist/` source maps (optional, but included for better DX)

### Package Entry Points

- **`main`**: `dist/index.js` - JavaScript plugin (CommonJS)
- **`types`**: `dist/index.d.ts` - TypeScript definitions
- **`style`**: `index.css` - CSS-based plugin (Tailwind v4)

## Troubleshooting

### Error: "You do not have permission to publish"

**Solutions:**
```bash
# Verify login
npm whoami

# Check if package name is taken
npm view tailwindcss-better-gradient

# If taken by someone else, consider scoped package:
# Update package.json name to: @fabroos/tailwindcss-better-gradient
```

### Error: "Cannot publish over previously published versions"

**Solution:**
```bash
# Version already exists, bump to next version
npm version patch  # or minor/major
npm publish --access public
```

### Error: "Package path ./dist/plugin.js is not exported"

**Solution:**
- This was fixed in v0.0.4 by using proper export paths
- Ensure you're using `tailwindcss/plugin` not `tailwindcss/dist/plugin.js`
- Check that imports use package.json exports correctly

### Error: "y is not a function"

**Solution:**
- This was fixed in v0.0.6 by using CommonJS exports (`module.exports`)
- Ensure `index.ts` uses `module.exports = plugin(...)` not `export default`
- Verify compiled output uses `module.exports`

### Build Errors

**TypeScript compilation fails:**
```bash
# Check TypeScript version
pnpm list typescript

# Clear and rebuild
rm -rf dist/
pnpm run build
```

**Missing type definitions:**
```bash
# Install missing types
pnpm add -D @types/node  # if using require()
```

## Version History

- `0.0.8` - CSS-based functional utilities for Tailwind v4
- `0.0.7` - CSS-based implementation added
- `0.0.6` - Fixed CommonJS exports for Tailwind v4 compatibility
- `0.0.5` - Fixed flattenColorPalette import
- `0.0.4` - Fixed export paths for Tailwind v4
- `0.0.3` - Initial TypeScript conversion
- `0.0.2` - Initial release

## Best Practices

### 1. Always Test Before Publishing

```bash
# Test locally in playground
cd apps/playground
pnpm run build

# Test package installation
cd /tmp
mkdir test-install && cd test-install
npm init -y
npm install tailwindcss-better-gradient
# Verify it works
```

### 2. Use Semantic Versioning

- **MAJOR** (`X.0.0`): Breaking changes
- **MINOR** (`0.X.0`): New features, backward compatible
- **PATCH** (`0.0.X`): Bug fixes, patches

### 3. Write Clear Commit Messages

```bash
git commit -m "feat: add new fade-bg utility"
git commit -m "fix: correct gradient stop calculation"
git commit -m "docs: update README with v4 instructions"
```

### 4. Keep Changelog Updated

Consider maintaining a `CHANGELOG.md`:

```markdown
## [0.0.8] - 2024-11-22

### Added
- CSS-based functional utilities for Tailwind v4
- Support for @utility directives

### Changed
- Primary distribution method is now CSS-based
- JavaScript plugin kept for backward compatibility
```

## Automated Publishing (Future)

Consider setting up GitHub Actions for automated publishing:

```yaml
# .github/workflows/publish.yml
name: Publish to npm
on:
  release:
    types: [created]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          registry-url: 'https://registry.npmjs.org'
      - run: pnpm install
      - run: cd packages/tailwindcss-better-gradient && npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [Tailwind CSS v4 Plugin Docs](https://tailwindcss.com/docs/adding-custom-styles#functional-utilities)
- [Package.json Files Field](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#files)
