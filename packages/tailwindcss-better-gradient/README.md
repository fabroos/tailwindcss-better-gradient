# Tailwind CSS Better Gradient Plugin

A powerful Tailwind CSS plugin that creates beautiful gradient backgrounds with precise control over direction and color. Uses OKLCH color space for smooth, natural-looking gradients.

## Features

- 🎨 Works with all Tailwind colors
- 📐 8 directional options (cardinal + diagonal)
- 🌈 Smooth OKLCH-based gradients
- 🎯 Natural easing curve (not linear like Tailwind defaults)
- 🔧 Fully composable utilities
- ⚡ Zero dependencies (except Tailwind CSS)
- 🎚️ Configurable steps (2-24) for perfect smoothness control

## Installation

```bash
npm install tailwindcss-better-gradient
```

## Configuration

### Tailwind CSS v4 (CSS-based)

Import the plugin CSS file in your main CSS file:

```css
@import 'tailwindcss';
@import 'tailwindcss-better-gradient';
```

That's it! No JavaScript configuration needed.

### Tailwind CSS v3 (JavaScript plugin)

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

```html
<!-- Basic: Fade from blue to transparent, top to bottom -->
<div class="fade-blue-500 fade-b">Content here</div>

<!-- With custom steps: Ultra smooth 12-step gradient -->
<div class="fade-blue-500 fade-b fade-12">Content here</div>

<!-- Or a util for shadcn users that use the --background-color variable -->
<div class="fade">Content here</div>
<!-- or -->
<div class="fade fade-b">Content here</div>
```

### Directions

- `fade-t` - Top (0deg)
- `fade-b` - Bottom (180deg)
- `fade-l` - Left (270deg)
- `fade-r` - Right (90deg)
- `fade-tr` - Top Right (45deg)
- `fade-tl` - Top Left (315deg)
- `fade-br` - Bottom Right (135deg)
- `fade-bl` - Bottom Left (225deg)

## Credits

This plugin was inspired by [Smooth Gradient Overlays](https://smooth-overlays.vercel.app/) by [Shu Ding](https://github.com/shuding). The concept of using easing curves for smooth gradient transitions comes from their excellent work.

## License

MIT
