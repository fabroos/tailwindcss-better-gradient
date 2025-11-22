# Step-by-Step Guide to Publish `tailwindcss-better-gradient` to npm

## Pre-Publishing Checklist

### 1. Fix Package.json Issues

**Current Issues:**

- ❌ `author` field is empty
- ❌ No LICENSE file (package.json says MIT but no LICENSE file exists)

**Action Required:**

1. Add author information to `packages/tailwindcss-better-gradient/package.json`
2. Create a LICENSE file

### 2. Verify Package Contents

The `files` field in package.json currently includes:

- `index.js` ✅
- `README.md` ✅

This means only these files will be published (good - excludes node_modules, etc.)

## Step-by-Step Publishing Process

### Step 1: Navigate to Package Directory

```bash
cd packages/tailwindcss-better-gradient
```

### Step 2: Verify Package is Ready

```bash
# Check package.json is valid
npm pack --dry-run

# This will show you what files will be included in the package
```

### Step 3: Login to npm

```bash
# If not already logged in
npm login

# Enter your npm credentials:
# - Username
# - Password
# - Email
# - OTP (if 2FA is enabled)
```

### Step 4: Check Package Name Availability

```bash
# Verify the package name is available (or you own it)
npm view tailwindcss-better-gradient

# If it returns 404, the name is available
# If it returns package info, you'll need to update the version
```

### Step 5: Update Version (if needed)

```bash
# If this is a new version, update package.json version
# Options:
npm version patch   # 1.0.0 -> 1.0.1 (bug fixes)
npm version minor   # 1.0.0 -> 1.1.0 (new features)
npm version major   # 1.0.0 -> 2.0.0 (breaking changes)

# Or manually edit package.json
```

### Step 6: Test the Package Locally (Optional but Recommended)

```bash
# Create a test directory
cd /tmp
mkdir test-tailwindcss-better-gradient
cd test-tailwindcss-better-gradient

# Initialize npm project
npm init -y
npm install tailwindcss

# Install your local package
npm install /Users/fabroos/dev/personal/tailwindcss-bettershadow/packages/tailwindcss-better-gradient

# Test that it works
```

### Step 7: Publish to npm

```bash
# Make sure you're in the package directory
cd /Users/fabroos/dev/personal/tailwindcss-bettershadow/packages/tailwindcss-better-gradient

# Publish (public package)
npm publish --access public

# If you have a scoped package (e.g., @yourname/tailwindcss-better-gradient)
# npm publish --access public
```

### Step 8: Verify Publication

```bash
# Check that your package is published
npm view tailwindcss-better-gradient

# Or visit: https://www.npmjs.com/package/tailwindcss-better-gradient
```

### Step 9: Tag Git Release (Optional but Recommended)

```bash
# From the root of your repository
cd /Users/fabroos/dev/personal/tailwindcss-bettershadow

# Create a git tag for the version
git tag v1.0.0
git push origin v1.0.0

# Or push all tags
git push --tags
```

## Post-Publishing

### Update Documentation

- Update README if needed
- Consider adding a CHANGELOG.md for future versions

### Future Updates

When you need to publish updates:

1. Make your changes
2. Update version: `npm version patch|minor|major`
3. `npm publish --access public`
4. `git push && git push --tags`

## Troubleshooting

### Error: "You do not have permission to publish"

- Make sure you're logged in: `npm whoami`
- Check if the package name is taken by someone else
- Consider using a scoped package: `@yourusername/tailwindcss-better-gradient`

### Error: "Package name too similar to existing package"

- npm might suggest an alternative name
- Consider using a scoped package name

### Error: "Invalid package name"

- Package names must be lowercase
- Can contain hyphens but not underscores
- Cannot start with a dot or underscore

## Important Notes

1. **Version Numbering**: Follow semantic versioning (semver)

   - MAJOR.MINOR.PATCH (e.g., 1.0.0)
   - Breaking changes = major version bump
   - New features = minor version bump
   - Bug fixes = patch version bump

2. **Unpublishing**: You can unpublish within 72 hours, but it's discouraged. Better to publish a new version.

3. **Scoped Packages**: If you want to use a scoped name (e.g., `@fabroos/tailwindcss-better-gradient`), update the name in package.json and use `npm publish --access public`
