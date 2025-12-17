// Gradient stop data matching the exact structure from smooth-overlays
const GRADIENT_DATA: Record<number, { positions: number[]; opacities: number[] }> = {
  2: { positions: [0, 100], opacities: [1.0, 0.0] },
  3: { positions: [0, 50, 100], opacities: [1.0, 0.13, 0.0] },
  4: { positions: [0, 33, 67, 100], opacities: [1.0, 0.3, 0.04, 0.0] },
  5: { positions: [0, 25, 50, 75, 100], opacities: [1.0, 0.42, 0.13, 0.02, 0.0] },
  6: { positions: [0, 20, 40, 60, 80, 100], opacities: [1.0, 0.51, 0.22, 0.06, 0.01, 0.0] },
  8: {
    positions: [0, 14, 29, 43, 57, 71, 86, 100],
    opacities: [1.0, 0.63, 0.36, 0.19, 0.08, 0.02, 0.0, 0.0],
  },
  12: {
    positions: [0, 9, 18, 27, 36, 45, 55, 64, 73, 82, 91, 100],
    opacities: [1.0, 0.75, 0.55, 0.38, 0.26, 0.16, 0.09, 0.05, 0.02, 0.01, 0.0, 0.0],
  },
  16: {
    positions: [0, 7, 13, 20, 27, 33, 40, 47, 53, 60, 67, 73, 80, 87, 93, 100],
    opacities: [
      1.0, 0.81, 0.65, 0.51, 0.39, 0.3, 0.22, 0.15, 0.1, 0.06, 0.04, 0.02, 0.01, 0.0, 0.0, 0.0,
    ],
  },
  20: {
    positions: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
    opacities: [
      1.0, 0.99, 0.98, 0.96, 0.93, 0.89, 0.85, 0.8, 0.74, 0.67, 0.59, 0.51, 0.42, 0.33, 0.24, 0.16,
      0.09, 0.04, 0.01, 0.0, 0.0,
    ],
  },
  24: {
    positions: [
      0, 4.17, 8.33, 12.5, 16.67, 20.83, 25, 29.17, 33.33, 37.5, 41.67, 45.83, 50, 54.17, 58.33,
      62.5, 66.67, 70.83, 75, 79.17, 83.33, 87.5, 91.67, 95.83, 100,
    ],
    opacities: [
      1.0, 0.99, 0.98, 0.97, 0.95, 0.92, 0.89, 0.85, 0.81, 0.76, 0.7, 0.64, 0.57, 0.5, 0.42, 0.34,
      0.27, 0.2, 0.14, 0.09, 0.05, 0.02, 0.01, 0.0, 0.0,
    ],
  },
};

const directionAngles: Record<string, number> = {
  t: 0,
  b: 180,
  l: 270,
  r: 90,
  tl: 315,
  tr: 45,
  bl: 225,
  br: 135,
};

const colorToHSL: Record<string, string> = {
  white: 'hsla(0, 0%, 100%,',
  black: 'hsla(0, 0%, 0%,',
};

// Fallback function for step counts not in GRADIENT_DATA
function generateFallbackStops(steps: number): { positions: number[]; opacities: number[] } {
  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
  const positions: number[] = [];
  const opacities: number[] = [];

  for (let i = 0; i <= steps; i++) {
    const position = (i / steps) * 100;
    const opacity = 1 - easeOutCubic(i / steps);
    positions.push(Math.round(position * 100) / 100);
    opacities.push(Math.round(opacity * 100) / 100);
  }

  return { positions, opacities };
}

function generateGradientStops(steps: number): string[] {
  const stops: string[] = [];
  const data = GRADIENT_DATA[steps] || generateFallbackStops(steps);

  for (let i = 0; i < data.positions.length; i++) {
    const opacity = data.opacities[i];
    stops.push(`${opacity.toFixed(2)}) ${data.positions[i]}%`);
  }

  return stops;
}

export function generateCSS(color: 'white' | 'black', direction: string, steps: number): string {
  const angle = directionAngles[direction] || 180;
  const colorPrefix = colorToHSL[color] || 'hsla(0, 0%, 100%,';
  const gradientStops = generateGradientStops(steps);

  const stopsString = gradientStops.map(stop => `    ${colorPrefix}${stop}`).join(',\n');

  return `linear-gradient(
  ${angle}deg,
${stopsString}
)`;
}

export function getGradientData(steps: number): { positions: number[]; opacities: number[] } {
  return GRADIENT_DATA[steps] || generateFallbackStops(steps);
}
