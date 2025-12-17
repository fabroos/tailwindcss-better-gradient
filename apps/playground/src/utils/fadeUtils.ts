export const colors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'slate',
];

export const directions = [
  { value: 't', label: 'Top', icon: '↑' },
  { value: 'b', label: 'Bottom', icon: '↓' },
  { value: 'l', label: 'Left', icon: '←' },
  { value: 'r', label: 'Right', icon: '→' },
  { value: 'tl', label: 'Top Left', icon: '↖' },
  { value: 'tr', label: 'Top Right', icon: '↗' },
  { value: 'bl', label: 'Bottom Left', icon: '↙' },
  { value: 'br', label: 'Bottom Right', icon: '↘' },
];

export const steps = [2, 4, 6, 8, 12, 16, 20, 24];

export const easings = [
  { value: 'ease-out-cubic', label: 'Ease Out Cubic' },
  { value: 'linear', label: 'Linear' },
  { value: 'ease-in-quad', label: 'Ease In Quad' },
  { value: 'ease-out-quad', label: 'Ease Out Quad' },
  { value: 'ease-in-out-quad', label: 'Ease In Out Quad' },
  { value: 'ease-in-cubic', label: 'Ease In Cubic' },
  { value: 'ease-in-out-cubic', label: 'Ease In Out Cubic' },
  { value: 'ease-in-quart', label: 'Ease In Quart' },
  { value: 'ease-out-quart', label: 'Ease Out Quart' },
  { value: 'ease-in-out-quart', label: 'Ease In Out Quart' },
];

// Color class map - using new API (fade-from-*)
const fadeColorMap: Record<string, string> = {
  red: 'fade-from-red-500',
  orange: 'fade-from-orange-500',
  amber: 'fade-from-amber-500',
  yellow: 'fade-from-yellow-500',
  lime: 'fade-from-lime-500',
  green: 'fade-from-green-500',
  emerald: 'fade-from-emerald-500',
  teal: 'fade-from-teal-500',
  cyan: 'fade-from-cyan-500',
  sky: 'fade-from-sky-500',
  blue: 'fade-from-blue-500',
  indigo: 'fade-from-indigo-500',
  violet: 'fade-from-violet-500',
  purple: 'fade-from-purple-500',
  fuchsia: 'fade-from-fuchsia-500',
  pink: 'fade-from-pink-500',
  rose: 'fade-from-rose-500',
  slate: 'fade-from-slate-500',
  'slate-900': 'fade-from-slate-900',
  black: 'fade-from-black',
  white: 'fade-from-white',
};

// Direction class map - using new API (fade-to-*)
const fadeDirectionMap: Record<string, string> = {
  t: 'fade-to-t',
  b: 'fade-to-b',
  l: 'fade-to-l',
  r: 'fade-to-r',
  tl: 'fade-to-tl',
  tr: 'fade-to-tr',
  bl: 'fade-to-bl',
  br: 'fade-to-br',
};

// Step class map
const fadeStepMap: Record<number, string> = {
  2: 'fade-2',
  4: 'fade-4',
  6: '', // Default step, no class needed
  8: 'fade-8',
  12: 'fade-12',
  16: 'fade-16',
  20: 'fade-20',
  24: 'fade-24',
};

// Get explicit fade color class
export function getFadeColorClass(color: string): string {
  return fadeColorMap[color] || 'fade-from-blue-500';
}

// Get explicit fade direction class
export function getFadeDirectionClass(direction: string): string {
  return fadeDirectionMap[direction] || 'fade-to-b';
}

// Get explicit fade step class (returns empty string for default step 6)
export function getFadeStepClass(step: number): string {
  // Step 6 is default, no class needed
  if (step === 6) return '';
  // For all other steps (2-24), generate the class name
  if (step >= 2 && step <= 24) {
    return `fade-${step}`;
  }
  // Fallback to empty string for invalid steps
  return '';
}

// Tailwind gradient direction map
const tailwindGradientDirectionMap: Record<string, string> = {
  t: 'bg-gradient-to-t',
  b: 'bg-gradient-to-b',
  l: 'bg-gradient-to-l',
  r: 'bg-gradient-to-r',
  tl: 'bg-gradient-to-tl',
  tr: 'bg-gradient-to-tr',
  bl: 'bg-gradient-to-bl',
  br: 'bg-gradient-to-br',
};

// Get simple Tailwind gradient class (standard Tailwind gradient, not fade utilities)
export function getSimpleGradientClass(color: string, direction: string): string {
  const gradientDirection = tailwindGradientDirectionMap[direction] || 'bg-gradient-to-b';

  // Map colors to Tailwind color classes
  let colorClass = '';
  if (color === 'white') {
    colorClass = 'from-white/100 to-white/0';
  } else if (color === 'black') {
    colorClass = 'from-black/100 to-black/0';
  } else {
    // For other colors, use the color-500 variant
    colorClass = `from-${color}-500/100 to-${color}-500/0`;
  }

  return `${gradientDirection} ${colorClass}`;
}

// Helper function to get explicit fade classes by combining color, direction, step, and easing
export function getFadeClass(
  color: string,
  direction: string,
  step: number,
  easing: string = 'ease-out-cubic'
): string {
  // Handle special cases where color needs to be different (e.g., slate-900 for non-default steps)
  let actualColor = color;
  if (color === 'slate' && step !== 6) {
    // For slate with non-default steps, use slate-900
    actualColor = 'slate-900';
  }

  const colorClass = getFadeColorClass(actualColor);
  const directionClass = getFadeDirectionClass(direction);

  // Determine step/easing class based on combination:
  // - Default step (6) + default easing: no class needed
  // - Default step (6) + custom easing: fade-{easing}-6 (uses pre-generated class)
  // - Non-default step + default easing: fade-[step]
  // - Non-default step + custom easing: fade-{easing}-{step} (replaces both)
  let stepEasingClass = '';

  if (step === 6 && easing === 'ease-out-cubic') {
    // Both default, no class needed
    stepEasingClass = '';
  } else if (step === 6 && easing !== 'ease-out-cubic') {
    // Default step with custom easing - use fade-{easing}-6 format
    stepEasingClass = `fade-${easing}-6`;
  } else if (step !== 6 && easing === 'ease-out-cubic') {
    // Non-default step with default easing
    stepEasingClass = getFadeStepClass(step);
  } else {
    // Non-default step with custom easing - use combined format
    stepEasingClass = `fade-${easing}-${step}`;
  }

  // Combine classes, filtering out empty strings
  return [colorClass, directionClass, stepEasingClass].filter(Boolean).join(' ');
}
