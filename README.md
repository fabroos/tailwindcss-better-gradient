# Tailwind CSS Better Gradient

A powerful Tailwind CSS plugin that creates beautiful gradient backgrounds with precise control over direction and color. Uses OKLCH color space for smooth, natural-looking gradients with an API that matches Tailwind's gradient utilities.

## [Installation]

```bash
npm install tailwindcss-better-gradient
```

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

For Tailwind v3, use the JavaScript plugin:

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

## [Try It Live]

Visit the [playground](https://your-playground-url.com) to test the plugin interactively. Generate CSS classes for your gradients with live preview.

## [Features Bento]

- 🎨 **Works with all Tailwind colors** - Use any color from Tailwind's palette
- 📐 **8 directional options** - Cardinal and diagonal directions (top, bottom, left, right, and corners)
- 🌈 **Smooth OKLCH-based gradients** - Perceptually uniform color transitions
- 🎯 **Natural easing curve** - Exact gradient stop positions (not linear like Tailwind defaults)
- 🔧 **Fully composable utilities** - Mix and match classes as needed
- ⚡ **Zero dependencies** - Except Tailwind CSS itself
- 🎚️ **Configurable steps** - Control smoothness with 2-24 steps
- 🎭 **Explicit API** - Matches Tailwind's `bg-gradient-to-*`, `from-*`, `to-*` pattern

### Usage Examples

```html
<!-- Fade FROM color to transparent -->
<div class="fade-from-blue-500 fade-to-b">Content here</div>

<!-- Fade TO color from transparent -->
<div class="fade-to-purple-500 fade-to-r">Content here</div>

<!-- With custom steps: Ultra smooth 12-step gradient -->
<div class="fade-from-blue-500 fade-to-b fade-12">Content here</div>

<!-- Using background color variable (for shadcn/ui users) -->
<div class="fade fade-to-b">Content here</div>
```

### API Reference

#### Directions

- `fade-to-t` - Fade to top (0deg)
- `fade-to-b` - Fade to bottom (180deg)
- `fade-to-l` - Fade to left (270deg)
- `fade-to-r` - Fade to right (90deg)
- `fade-to-tr` - Fade to top right (45deg)
- `fade-to-tl` - Fade to top left (315deg)
- `fade-to-br` - Fade to bottom right (135deg)
- `fade-to-bl` - Fade to bottom left (225deg)

#### Colors

- `fade-from-{color}` - Fade from color to transparent
- `fade-to-{color}` - Fade from transparent to color

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

### How It Works

This plugin uses exact gradient stop positions and opacity values inspired by [Smooth Gradient Overlays](https://smooth-overlays.vercel.app/). Unlike linear gradients, these gradients use carefully calculated stop positions and opacity curves to create natural-looking fades.

The gradients are generated using OKLCH color space, which provides perceptually uniform color transitions. Each step count (2-24) has predefined stop positions and opacity values optimized for smooth visual transitions:

- **Steps 2-19**: Use exact gradient stop positions and opacity values from smooth-overlays
- **Steps 20-24**: Interpolated following the same pattern for maximum smoothness
- **Non-linear positioning**: Stop positions are denser at the start (where opacity changes rapidly) and sparser at the end
- **Natural opacity curve**: Opacity follows an ease-out cubic curve for perceptually smooth transitions

## [CREDITS]

This plugin was inspired by [Smooth Gradient Overlays](https://smooth-overlays.vercel.app/) by [Shu Ding](https://github.com/shuding). The exact gradient stop positions and opacity curves come from their excellent work.

## License

MIT
