# Tailwind CSS Better Gradient Plugin

A powerful Tailwind CSS plugin that creates beautiful gradient backgrounds with precise control over direction and color. Uses OKLCH color space for smooth, natural-looking gradients with an API that matches Tailwind's gradient utilities.

## Features

- 🎨 Works with all Tailwind colors
- 📐 8 directional options (cardinal + diagonal)
- 🌈 Smooth OKLCH-based gradients
- 🎯 Natural easing curves with exact gradient stop positions (not linear like Tailwind defaults)
- 🎛️ Multiple easing functions (linear, ease-in/out/in-out variants)
- 🔧 Fully composable utilities
- ⚡ Zero dependencies (except Tailwind CSS)
- 🎚️ Configurable steps (2-24) for perfect smoothness control
- 🎭 Explicit API matching Tailwind's `bg-gradient-to-*`, `from-*`, `to-*` pattern

## Installation

```bash
npm install tailwindcss-better-gradient
```

## Configuration

### Tailwind CSS v4

For Tailwind v4, use the JavaScript plugin in your `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss';
import betterGradient from 'tailwindcss-better-gradient';

export default {
  plugins: [betterGradient],
} satisfies Config;
```

### Tailwind CSS v3

For Tailwind v3, you can still use the JavaScript plugin:

```javascript
module.exports = {
  theme: {
    extend: {
      betterGradient: {
        steps: 6, // Number of gradient stops (default: 6)
      },
    },
  },
  plugins: [require('tailwindcss-better-gradient')],
};
```

## Usage

### Basic Examples

```html
<!-- Fade FROM color to transparent (new explicit API) -->
<div class="fade-from-blue-500 fade-to-b">Content here</div>

<!-- Fade TO color from transparent -->
<div class="fade-to-purple-500 fade-to-r">Content here</div>

<!-- With custom steps: Ultra smooth 12-step gradient -->
<div class="fade-from-blue-500 fade-to-b fade-12">Content here</div>

<!-- With custom easing: Linear fade -->
<div class="fade-from-blue-500 fade-to-b fade-linear-6">Content here</div>

<!-- With easing and steps: Ease-in cubic with 12 steps -->
<div class="fade-from-purple-500 fade-to-b fade-ease-in-cubic-12">Content here</div>

<!-- Using background color variable (for shadcn/ui users) -->
<div class="fade fade-to-b">Content here</div>
```

### API Reference

#### Directions

The API matches Tailwind's `bg-gradient-to-*` pattern:

- `fade-to-t` - Fade to top (0deg)
- `fade-to-b` - Fade to bottom (180deg)
- `fade-to-l` - Fade to left (270deg)
- `fade-to-r` - Fade to right (90deg)
- `fade-to-tr` - Fade to top right (45deg)
- `fade-to-tl` - Fade to top left (315deg)
- `fade-to-br` - Fade to bottom right (135deg)
- `fade-to-bl` - Fade to bottom left (225deg)

**Legacy support:** The old `fade-t`, `fade-b`, `fade-l`, `fade-r`, etc. still work for backward compatibility.

#### Colors

- `fade-from-{color}` - Fade from color to transparent
  - Example: `fade-from-blue-500`, `fade-from-red-600`, `fade-from-slate-900`
- `fade-to-{color}` - Fade from transparent to color
  - Example: `fade-to-blue-500`, `fade-to-purple-400`

#### Steps

Control gradient smoothness with step utilities. All steps from 2 to 24 are available:

- `fade-2` - 2 stops (minimal, sharp transition)
- `fade-3` - 3 stops
- `fade-4` - 4 stops
- `fade-5` - 5 stops
- `fade-6` - 6 stops (default, balanced)
- `fade-7` - 7 stops
- `fade-8` - 8 stops
- `fade-9` - 9 stops
- `fade-10` - 10 stops
- `fade-11` - 11 stops
- `fade-12` - 12 stops (very smooth)
- `fade-13` - 13 stops
- `fade-14` - 14 stops
- `fade-15` - 15 stops
- `fade-16` - 16 stops
- `fade-17` - 17 stops
- `fade-18` - 18 stops
- `fade-19` - 19 stops
- `fade-20` - 20 stops
- `fade-21` - 21 stops
- `fade-22` - 22 stops
- `fade-23` - 23 stops
- `fade-24` - 24 stops (ultra smooth, maximum quality)

Each step uses exact gradient stop positions and opacity values optimized for natural-looking fades. Higher step counts provide smoother transitions but with slightly larger CSS output.

#### Easing Functions

Control the easing curve of your gradients with these easing functions:

**Available Easing Functions:**

- `linear` - Linear transition (no easing)
- `ease-in-quad` - Quadratic ease-in
- `ease-out-quad` - Quadratic ease-out
- `ease-in-out-quad` - Quadratic ease-in-out
- `ease-in-cubic` - Cubic ease-in
- `ease-out-cubic` - Cubic ease-out (default)
- `ease-in-out-cubic` - Cubic ease-in-out
- `ease-in-quart` - Quartic ease-in
- `ease-out-quart` - Quartic ease-out
- `ease-in-out-quart` - Quartic ease-in-out

**Usage:**

You can combine easing with steps using the format: `fade-{easing}-{steps}`

```html
<!-- Linear fade with 6 steps -->
<div class="fade-from-blue-500 fade-linear-6">Content here</div>

<!-- Ease-in cubic with 12 steps -->
<div class="fade-from-purple-500 fade-ease-in-cubic-12">Content here</div>

<!-- Ease-out quart with 8 steps -->
<div class="fade-from-red-500 fade-ease-out-quart-8">Content here</div>
```

You can also use `fade-ease-[easing-name]` with arbitrary values for the default steps (6):

```html
<!-- Use default steps (6) with custom easing -->
<div class="fade-from-blue-500 fade-ease-[linear]">Content here</div>
```

**Note:** The default easing is `ease-out-cubic`, which provides natural-looking fades. Steps 2-19 use predefined gradient data optimized for this easing. When using other easing functions, the gradients are generated dynamically.

### More Examples

```html
<!-- Diagonal fade from corner -->
<div class="fade-from-slate-900 fade-to-br fade-16">Content here</div>

<!-- Top overlay fade -->
<div class="fade-from-black fade-to-t fade-20">Content here</div>

<!-- Fade to color (transparent to color) -->
<div class="fade-to-blue-500 fade-to-b fade-12">Content here</div>

<!-- Combine with other Tailwind utilities -->
<div class="relative overflow-hidden">
  <div class="absolute inset-0 fade-from-blue-500 fade-to-b fade-12"></div>
  <div class="relative z-10">Your content</div>
</div>
```

## How It Works

This plugin uses exact gradient stop positions and opacity values inspired by [Smooth Gradient Overlays](https://smooth-overlays.vercel.app/). Unlike linear gradients, these gradients use carefully calculated stop positions and opacity curves to create natural-looking fades.

The gradients are generated using OKLCH color space, which provides perceptually uniform color transitions. Each step count (2-24) has predefined stop positions and opacity values optimized for smooth visual transitions:

- **Steps 2-19**: Use exact gradient stop positions and opacity values from smooth-overlays (with default `ease-out-cubic` easing)
- **Steps 20-24**: Interpolated following the same pattern for maximum smoothness
- **Non-linear positioning**: Stop positions are denser at the start (where opacity changes rapidly) and sparser at the end
- **Natural opacity curve**: Default opacity follows an ease-out cubic curve for perceptually smooth transitions
- **Custom easing**: Support for multiple easing functions (linear, ease-in/out/in-out variants) for different visual effects

## Credits

This plugin was inspired by [Smooth Gradient Overlays](https://smooth-overlays.vercel.app/) by [Shu Ding](https://github.com/shuding). The exact gradient stop positions and opacity curves come from their excellent work.

## License

MIT
