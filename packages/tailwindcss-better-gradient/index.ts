// Runtime imports use proper export paths (works with package.json exports)
// @ts-expect-error - TypeScript can't resolve package.json exports, but runtime will work
const plugin = require('tailwindcss/plugin');

// Type imports from dist (TypeScript needs direct path for types)
import type { PluginAPI } from 'tailwindcss/dist/plugin.d.mts';

/**
 * Generates gradient stops with an easing curve for smooth fades
 * 
 * Inspired by Smooth Gradient Overlays by Shu Ding
 * @see https://smooth-overlays.vercel.app/
 * 
 * @param steps - Number of gradient stops
 * @returns Formatted gradient stops string
 */
function generateGradientStops(steps: number): string {
  const stops: string[] = [];

  // Easing function for smooth opacity transition (ease-out cubic)
  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

  for (let i = 0; i <= steps; i++) {
    const position = i / steps; // 0 to 1
    const opacity = 1 - easeOutCubic(position); // 1 to 0 with easing
    const percentage = Math.round(position * 100);

    stops.push(`oklch(from var(--fade-oklch) l c h / ${opacity.toFixed(2)}) ${percentage}%`);
  }

  return stops.join(', ');
}

// @ts-ignore - module.exports is available at runtime in CommonJS
module.exports = plugin(function ({ addUtilities, matchUtilities, theme }: PluginAPI) {
  // Add directional utilities
  addUtilities({
    '.fade-t': {
      '--fade-angle': '0deg',
    },
    '.fade-b': {
      '--fade-angle': '180deg',
    },
    '.fade-r': {
      '--fade-angle': '90deg',
    },
    '.fade-l': {
      '--fade-angle': '270deg',
    },
    '.fade-tr': {
      '--fade-angle': '45deg',
    },
    '.fade-tl': {
      '--fade-angle': '315deg',
    },
    '.fade-br': {
      '--fade-angle': '135deg',
    },
    '.fade-bl': {
      '--fade-angle': '225deg',
    },
  });

  // Get default steps from config
  const defaultSteps = theme('betterGradient.steps', 6) as number;

  // Add base fade utility (uses default steps)
  const defaultGradientStops = generateGradientStops(defaultSteps);
  addUtilities({
    '.fade': {
      '--fade-oklch': 'var(--color-background, white)',
      'background-image': `linear-gradient(var(--fade-angle, 0deg), ${defaultGradientStops})`,
      'background-repeat': 'no-repeat',
    },
  });

  // Add color utilities with full gradient (works with Tailwind's color palette)
  // This creates utilities like fade-blue-500, fade-red-600, etc.
  // Temporarily disabled - investigating Tailwind v4 compatibility
  // TODO: Re-enable color utilities once flattenColorPalette import issue is resolved

  // Add dynamic step utilities (fade-6, fade-12, etc.)
  matchUtilities(
    {
      fade: (value: string) => {
        const steps = parseInt(value, 10);
        if (isNaN(steps) || steps < 1) {
          return {
            'background-image': '',
          };
        }

        const gradientStops = generateGradientStops(steps);
        return {
          'background-image': `linear-gradient(var(--fade-angle, 0deg), ${gradientStops}) !important`,
        };
      },
    },
    {
      values: {
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        8: '8',
        10: '10',
        12: '12',
        16: '16',
        20: '20',
        24: '24',
      },
    }
  );
});
