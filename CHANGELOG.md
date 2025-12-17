# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Changesets for version management
- Development scripts for building and testing
- Comprehensive publish guide

## [0.0.8] - 2024-11-22

### Added

- CSS-based functional utilities for Tailwind CSS v4
- Support for `@utility` directives
- `index.css` file with all gradient utilities
- `style` field in package.json

### Changed

- Primary distribution method is now CSS-based (Tailwind v4)
- JavaScript plugin kept for backward compatibility
- Plugin export changed to CommonJS (`module.exports`)
- Updated README with Tailwind v4 CSS import instructions

### Fixed

- Plugin loading issues with Tailwind v4
- Export path resolution errors
- CommonJS/ESM compatibility issues

## [0.0.7] - 2024-11-22

### Added

- CSS-based plugin implementation
- Functional utilities using `@utility` directives

## [0.0.6] - 2024-11-22

### Fixed

- CommonJS exports for Tailwind v4 compatibility
- Plugin structure to match Tailwind v4 expectations

## [0.0.5] - 2024-11-22

### Fixed

- `flattenColorPalette` import handling
- Dynamic import resolution

## [0.0.4] - 2024-11-22

### Fixed

- Export paths to use package.json exports
- Import paths for Tailwind v4 structure

## [0.0.3] - 2024-11-22

### Added

- TypeScript conversion
- Type definitions (`dist/index.d.ts`)
- TypeScript build configuration

### Changed

- Converted from JavaScript to TypeScript
- Updated build process

[Unreleased]: https://github.com/fabroos/tailwindcss-better-gradient/compare/v0.0.8...HEAD
[0.0.8]: https://github.com/fabroos/tailwindcss-better-gradient/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/fabroos/tailwindcss-better-gradient/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/fabroos/tailwindcss-better-gradient/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/fabroos/tailwindcss-better-gradient/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/fabroos/tailwindcss-better-gradient/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/fabroos/tailwindcss-better-gradient/compare/v0.0.2...v0.0.3








