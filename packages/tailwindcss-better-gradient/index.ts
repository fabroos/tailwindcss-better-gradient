// Runtime imports use proper export paths (works with package.json exports)
// @ts-expect-error - TypeScript can't resolve package.json exports, but runtime will work
const plugin = require('tailwindcss/plugin');

// Type imports from dist (TypeScript needs direct path for types)
import type { PluginAPI } from 'tailwindcss/dist/plugin.d.mts';

/**
 * Easing functions for gradient opacity curves
 * Based on Robert Penner's easing equations
 */
type EasingFunction = (t: number) => number;

const EASING_FUNCTIONS: Record<string, EasingFunction> = {
  linear: (t: number) => t,
  'ease-in-quad': (t: number) => t * t,
  'ease-out-quad': (t: number) => t * (2 - t),
  'ease-in-out-quad': (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  'ease-in-cubic': (t: number) => t * t * t,
  'ease-out-cubic': (t: number) => 1 - Math.pow(1 - t, 3),
  'ease-in-out-cubic': (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  'ease-in-quart': (t: number) => t * t * t * t,
  'ease-out-quart': (t: number) => 1 - Math.pow(1 - t, 4),
  'ease-in-out-quart': (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
};

const DEFAULT_EASING = 'ease-out-cubic';

/**
 * Gradient stop data matching the exact structure from smooth-overlays
 * Each entry contains positions (in %) and opacities for that number of steps
 * Steps 2-19 are exact from smooth-overlays, steps 20-24 are interpolated
 */
const GRADIENT_DATA: Record<number, { positions: number[]; opacities: number[] }> = {
  2: { positions: [0, 100], opacities: [1.0, 0.0] },
  3: { positions: [0, 50, 100], opacities: [1.0, 0.13, 0.0] },
  4: { positions: [0, 33, 67, 100], opacities: [1.0, 0.3, 0.04, 0.0] },
  5: { positions: [0, 25, 50, 75, 100], opacities: [1.0, 0.42, 0.13, 0.02, 0.0] },
  6: { positions: [0, 20, 40, 60, 80, 100], opacities: [1.0, 0.51, 0.22, 0.06, 0.01, 0.0] },
  7: { positions: [0, 17, 33, 50, 67, 83, 100], opacities: [1.0, 0.58, 0.3, 0.13, 0.04, 0.0, 0.0] },
  8: {
    positions: [0, 14, 29, 43, 57, 71, 86, 100],
    opacities: [1.0, 0.63, 0.36, 0.19, 0.08, 0.02, 0.0, 0.0],
  },
  9: {
    positions: [0, 13, 25, 38, 50, 63, 75, 88, 100],
    opacities: [1.0, 0.67, 0.42, 0.24, 0.13, 0.05, 0.02, 0.0, 0.0],
  },
  10: {
    positions: [0, 11, 22, 33, 44, 56, 67, 78, 89, 100],
    opacities: [1.0, 0.7, 0.47, 0.3, 0.17, 0.09, 0.04, 0.01, 0.0, 0.0],
  },
  11: {
    positions: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    opacities: [1.0, 0.73, 0.51, 0.34, 0.22, 0.13, 0.06, 0.03, 0.01, 0.0, 0.0],
  },
  12: {
    positions: [0, 9, 18, 27, 36, 45, 55, 64, 73, 82, 91, 100],
    opacities: [1.0, 0.75, 0.55, 0.38, 0.26, 0.16, 0.09, 0.05, 0.02, 0.01, 0.0, 0.0],
  },
  13: {
    positions: [0, 8, 17, 25, 33, 42, 50, 58, 67, 75, 83, 92, 100],
    opacities: [1.0, 0.77, 0.58, 0.42, 0.3, 0.2, 0.13, 0.07, 0.04, 0.02, 0.0, 0.0, 0.0],
  },
  14: {
    positions: [0, 8, 15, 23, 31, 38, 46, 54, 62, 69, 77, 85, 92, 100],
    opacities: [1.0, 0.79, 0.61, 0.46, 0.33, 0.23, 0.16, 0.1, 0.06, 0.03, 0.01, 0.0, 0.0, 0.0],
  },
  15: {
    positions: [0, 7, 14, 21, 29, 36, 43, 50, 57, 64, 71, 79, 86, 93, 100],
    opacities: [
      1.0, 0.8, 0.63, 0.49, 0.36, 0.27, 0.19, 0.13, 0.08, 0.05, 0.02, 0.01, 0.0, 0.0, 0.0,
    ],
  },
  16: {
    positions: [0, 7, 13, 20, 27, 33, 40, 47, 53, 60, 67, 73, 80, 87, 93, 100],
    opacities: [
      1.0, 0.81, 0.65, 0.51, 0.39, 0.3, 0.22, 0.15, 0.1, 0.06, 0.04, 0.02, 0.01, 0.0, 0.0, 0.0,
    ],
  },
  17: {
    positions: [0, 6, 13, 19, 25, 31, 38, 44, 50, 56, 63, 69, 75, 81, 88, 94, 100],
    opacities: [
      1.0, 0.82, 0.67, 0.54, 0.42, 0.32, 0.24, 0.18, 0.13, 0.08, 0.05, 0.03, 0.02, 0.01, 0.0, 0.0,
      0.0,
    ],
  },
  18: {
    positions: [0, 6, 11, 17, 22, 28, 33, 39, 44, 50, 56, 61, 67, 72, 78, 83, 89, 94, 100],
    opacities: [
      1.0, 0.84, 0.7, 0.58, 0.47, 0.38, 0.3, 0.23, 0.17, 0.13, 0.09, 0.06, 0.04, 0.02, 0.01, 0.0,
      0.0, 0.0, 0.0,
    ],
  },
  19: {
    positions: [0, 5, 11, 16, 21, 26, 32, 37, 42, 47, 53, 58, 63, 68, 74, 79, 84, 89, 95, 100],
    opacities: [
      1.0, 0.85, 0.72, 0.6, 0.49, 0.4, 0.32, 0.25, 0.19, 0.15, 0.11, 0.07, 0.05, 0.03, 0.02, 0.01,
      0.0, 0.0, 0.0, 0.0,
    ],
  },
  // Steps 20-24: Interpolated based on the pattern from steps 2-19
  20: {
    positions: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
    opacities: [
      1.0, 0.86, 0.74, 0.63, 0.53, 0.44, 0.36, 0.29, 0.23, 0.18, 0.14, 0.1, 0.07, 0.05, 0.03, 0.02,
      0.01, 0.0, 0.0, 0.0, 0.0,
    ],
  },
  21: {
    positions: [
      0, 5, 10, 14, 19, 24, 29, 33, 38, 43, 48, 52, 57, 62, 67, 71, 76, 81, 86, 90, 95, 100,
    ],
    opacities: [
      1.0, 0.87, 0.75, 0.64, 0.54, 0.45, 0.37, 0.3, 0.24, 0.19, 0.15, 0.11, 0.08, 0.06, 0.04, 0.03,
      0.02, 0.01, 0.0, 0.0, 0.0, 0.0,
    ],
  },
  22: {
    positions: [
      0, 5, 9, 14, 18, 23, 27, 32, 36, 41, 45, 50, 55, 59, 64, 68, 73, 77, 82, 86, 91, 95, 100,
    ],
    opacities: [
      1.0, 0.88, 0.76, 0.65, 0.55, 0.46, 0.38, 0.31, 0.25, 0.2, 0.16, 0.12, 0.09, 0.07, 0.05, 0.03,
      0.02, 0.01, 0.0, 0.0, 0.0, 0.0, 0.0,
    ],
  },
  23: {
    positions: [
      0, 4, 9, 13, 18, 22, 27, 31, 36, 40, 45, 49, 54, 58, 63, 67, 72, 76, 81, 85, 90, 94, 99, 100,
    ],
    opacities: [
      1.0, 0.89, 0.77, 0.66, 0.56, 0.47, 0.39, 0.32, 0.26, 0.21, 0.17, 0.13, 0.1, 0.07, 0.05, 0.04,
      0.03, 0.02, 0.01, 0.0, 0.0, 0.0, 0.0, 0.0,
    ],
  },
  24: {
    positions: [
      0, 4, 8, 13, 17, 21, 25, 30, 34, 38, 43, 47, 51, 56, 60, 64, 69, 73, 77, 82, 86, 90, 95, 99,
      100,
    ],
    opacities: [
      1.0, 0.9, 0.78, 0.67, 0.57, 0.48, 0.4, 0.33, 0.27, 0.22, 0.18, 0.14, 0.11, 0.08, 0.06, 0.04,
      0.03, 0.02, 0.01, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
    ],
  },
};

/**
 * Generates gradient stops matching the exact structure from smooth-overlays
 *
 * Inspired by Smooth Gradient Overlays by Shu Ding
 * @see https://smooth-overlays.vercel.app/
 *
 * @param steps - Number of gradient stops (must match available data: 3-19)
 * @param reverse - If true, fade from transparent to color (0 to 1), otherwise from color to transparent (1 to 0)
 * @param easingName - Name of the easing function to use (default: 'ease-out-cubic')
 * @returns Formatted gradient stops string
 */
function generateGradientStops(
  steps: number,
  reverse = false,
  easingName: string = DEFAULT_EASING
): string {
  const stops: string[] = [];
  const easing = EASING_FUNCTIONS[easingName] || EASING_FUNCTIONS[DEFAULT_EASING];

  // Get predefined data for this step count, or fall back to evenly spaced
  const data = GRADIENT_DATA[steps];

  if (data && easingName === DEFAULT_EASING) {
    // Use exact positions and opacities from the data (only for default easing)
    for (let i = 0; i < data.positions.length; i++) {
      let opacity = data.opacities[i];
      if (reverse) {
        // Reverse: use opacity from the end of the array (fade TO color: 0% to 100% goes from 0 to 1)
        opacity = data.opacities[data.opacities.length - 1 - i];
      }
      stops.push(
        `oklch(from var(--fade-oklch) l c h / ${opacity.toFixed(2)}) ${data.positions[i]}%`
      );
    }
  } else {
    // Generate stops with custom easing or for step counts not in data
    // Use the predefined positions if available, otherwise evenly spaced
    const positions = data
      ? data.positions
      : Array.from({ length: steps + 1 }, (_, i) => (i / steps) * 100);

    for (let i = 0; i < positions.length; i++) {
      const position = positions[i] / 100; // Convert to 0-1 range
      let opacity: number;

      if (reverse) {
        opacity = easing(position);
      } else {
        opacity = 1 - easing(position);
      }

      stops.push(`oklch(from var(--fade-oklch) l c h / ${opacity.toFixed(2)}) ${positions[i]}%`);
    }
  }

  return stops.join(', ');
}

// Create the plugin function
const pluginFunction = plugin(function ({ addUtilities, matchUtilities, theme }: PluginAPI) {
  // Add directional utilities (fade-to-* matches Tailwind's bg-gradient-to-* pattern)
  addUtilities({
    '.fade-to-t': {
      '--fade-angle': '0deg',
    },
    '.fade-to-b': {
      '--fade-angle': '180deg',
    },
    '.fade-to-r': {
      '--fade-angle': '90deg',
    },
    '.fade-to-l': {
      '--fade-angle': '270deg',
    },
    '.fade-to-tr': {
      '--fade-angle': '45deg',
    },
    '.fade-to-tl': {
      '--fade-angle': '315deg',
    },
    '.fade-to-br': {
      '--fade-angle': '135deg',
    },
    '.fade-to-bl': {
      '--fade-angle': '225deg',
    },
    // Legacy support: keep old names for backward compatibility
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

  // Add easing utilities using matchUtilities
  // This allows users to use fade-ease-[linear], fade-ease-[ease-in-cubic], etc.
  // These utilities override the background-image with the specified easing for default steps
  matchUtilities(
    {
      'fade-ease': (value: string): Record<string, string> => {
        const easingName = value;
        if (!EASING_FUNCTIONS[easingName]) {
          return {};
        }

        // Generate gradient stops for default steps with this easing
        const gradientStops = generateGradientStops(defaultSteps, false, easingName);
        return {
          '--fade-easing': easingName,
          'background-image': `linear-gradient(var(--fade-angle, 0deg), ${gradientStops}) !important`,
        };
      },
    },
    {
      // Support arbitrary values and predefined easing names
      values: Object.keys(EASING_FUNCTIONS).reduce(
        (acc, key) => {
          // Support both with and without dashes: "ease-in-cubic" and "ease-in-cubic"
          const normalizedKey = key.replace(/-/g, '-');
          acc[normalizedKey] = key;
          return acc;
        },
        {} as Record<string, string>
      ),
      supportsNegativeValues: false,
    }
  );

  // Get default steps from config
  const defaultSteps = theme('betterGradient.steps', 6) as number;

  // Add base fade utility (uses default steps)
  const defaultGradientStops = generateGradientStops(defaultSteps);
  addUtilities({
    '.fade': {
      '--fade-oklch': 'var(--color-background, white)',
      '--fade-easing': DEFAULT_EASING,
      'background-image': `linear-gradient(var(--fade-angle, 0deg), ${defaultGradientStops})`,
      'background-repeat': 'no-repeat',
    },
  });

  // Helper function to flatten color palette into paths and values
  // Returns an object like { 'blue-500': '#3b82f6', 'red-600': '#dc2626', ... }
  function flattenColors(colors: Record<string, any>, prefix = ''): Record<string, string> {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(colors)) {
      const path = prefix ? `${prefix}-${key}` : key;

      if (typeof value === 'string') {
        // Found a color value
        result[path] = value;
      } else if (value && typeof value === 'object') {
        // Nested object, recurse
        Object.assign(result, flattenColors(value, path));
      }
    }

    return result;
  }

  // Create explicit utilities for each color (fade FROM color)
  // Note: These use default easing, but can be overridden with fade-ease-* utilities
  const defaultGradientStopsForColors = generateGradientStops(defaultSteps, false);
  const colors = theme('colors') as Record<string, any>;
  const flattenedColors = flattenColors(colors);

  const colorUtilities: Record<string, Record<string, string>> = {};
  for (const [colorPath, colorValue] of Object.entries(flattenedColors)) {
    // Fade FROM color (fade-from-blue-500) - fade from color to transparent
    colorUtilities[`.fade-from-${colorPath}`] = {
      '--fade-oklch': colorValue,
      '--fade-easing': DEFAULT_EASING,
      'background-image': `linear-gradient(var(--fade-angle, 0deg), ${defaultGradientStopsForColors})`,
      'background-repeat': 'no-repeat',
    };

    // Fade TO color (fade-to-blue-500) - fade from transparent to color
    const gradientStopsTo = generateGradientStops(defaultSteps, true);
    colorUtilities[`.fade-to-${colorPath}`] = {
      '--fade-oklch': colorValue,
      '--fade-easing': DEFAULT_EASING,
      'background-image': `linear-gradient(var(--fade-angle, 0deg), ${gradientStopsTo})`,
      'background-repeat': 'no-repeat',
    };
  }
  addUtilities(colorUtilities);

  // Create explicit utilities for each step with each easing
  // Generate utilities like fade-[2]-ease-[linear], fade-[2]-ease-[ease-in-cubic], etc.
  const stepValues: Record<string, string> = {};
  for (let i = 2; i <= 24; i++) {
    stepValues[i.toString()] = i.toString();
  }

  matchUtilities(
    {
      fade: (value: string): Record<string, string> => {
        const steps = parseInt(value, 10);
        if (isNaN(steps) || steps < 1) {
          return {
            'background-image': '',
          };
        }

        // Generate with default easing (can be overridden by fade-ease-* utilities)
        const gradientStops = generateGradientStops(steps);
        return {
          'background-image': `linear-gradient(var(--fade-angle, 0deg), ${gradientStops}) !important`,
        };
      },
    },
    {
      values: stepValues,
    }
  );

  // Create utilities for step + easing combinations
  // Format: fade-{easing}-{steps} e.g., fade-linear-6, fade-in-cubic-12
  // We'll generate common combinations for all easings with steps 2-24
  const easingStepUtilities: Record<string, Record<string, string>> = {};
  for (const easingName of Object.keys(EASING_FUNCTIONS)) {
    for (let step = 2; step <= 24; step++) {
      const gradientStops = generateGradientStops(step, false, easingName);
      // Create class name: fade-{easing}-{step}
      // e.g., fade-linear-6, fade-ease-in-cubic-12
      const className = `.fade-${easingName}-${step}`;
      easingStepUtilities[className] = {
        'background-image': `linear-gradient(var(--fade-angle, 0deg), ${gradientStops}) !important`,
      };
    }
  }
  addUtilities(easingStepUtilities);
});

// Export for CommonJS - handle both Tailwind v3 (function) and v4 (object) formats
// Tailwind v3: plugin() returns a function directly, expects function in plugins array
// Tailwind v4: plugin() returns an object with { handler, config }, expects object in plugins array
// For maximum compatibility, if we get an object with handler, we extract the handler for v3 compatibility
// @ts-ignore - module.exports is available at runtime in CommonJS
if (typeof pluginFunction === 'function') {
  // Tailwind v3 format - export function directly
  // @ts-ignore
  module.exports = pluginFunction;
} else if (pluginFunction && typeof pluginFunction === 'object' && 'handler' in pluginFunction) {
  // Tailwind v4 format - plugin() returned an object
  // For v3 compatibility, extract the handler function
  // Tailwind v3 can accept the handler function directly
  // @ts-ignore
  module.exports =
    typeof pluginFunction.handler === 'function' ? pluginFunction.handler : pluginFunction;
} else {
  // Fallback - export whatever we got
  // @ts-ignore
  module.exports = pluginFunction;
}
