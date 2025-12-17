'use client';

import { GradientPlayground } from '@/components/gradient-playground';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CopyButton } from '@/components/ui/copy-button';

export default function Home() {
  const installationCommands = {
    pnpm: 'pnpm add tailwindcss-better-gradient',
    bun: 'bun add tailwindcss-better-gradient',
    npm: 'npm install tailwindcss-better-gradient',
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">tailwindcss-better-gradient</h1>
          <p className="text-lg text-muted-foreground">
            A Tailwind CSS plugin for creating beautiful gradients control
          </p>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Installation</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pnpm" className="w-full">
              <TabsList>
                <TabsTrigger value="pnpm">pnpm</TabsTrigger>
                <TabsTrigger value="bun">bun</TabsTrigger>
                <TabsTrigger value="npm">npm</TabsTrigger>
              </TabsList>
              {Object.entries(installationCommands).map(([key, command]) => (
                <TabsContent key={key} value={key} className="mt-4">
                  <div className="flex items-center justify-between gap-4 p-4 bg-muted rounded-md">
                    <code className="text-sm font-mono flex-1">{command}</code>
                    <CopyButton text={command} />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
        <GradientPlayground />

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  Works with all Tailwind colors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Seamlessly integrate with any color from your Tailwind palette. Use any color
                  scale like blue-500, red-600, or slate-900.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📐</span>8 Directions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Full directional control with cardinal and diagonal options. Matches Tailwind's
                  gradient API pattern.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🌈</span>
                  OKLCH Gradients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Smooth, perceptually uniform color transitions using OKLCH color space for
                  natural-looking gradients.
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Natural Easing Curves
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Exact gradient stop positions with natural easing curves. Not linear like Tailwind
                  defaults - optimized for smooth visual transitions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎛️</span>
                  Multiple Easing Functions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose from linear, ease-in/out/in-out variants with quadratic, cubic, and quartic
                  options.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎚️</span>
                  Configurable Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Control smoothness with 2-24 gradient stops. Perfect balance between quality and
                  CSS size.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔧</span>
                  Fully Composable
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Mix and match utilities just like Tailwind. Combine directions, colors, steps, and
                  easing functions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Zero Dependencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lightweight plugin with no external dependencies. Only requires Tailwind CSS.
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 ">
                  <span className="text-2xl">🎭</span>
                  Tailwind-like API
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Familiar API matching Tailwind's bg-gradient-to-*, from-*, to-* pattern. Easy to
                  learn and use.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <p>
              Created by{' '}
              <a
                href="https://github.com/fabroos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
              >
                fabroos
              </a>
            </p>
            <p>
              Inspired by{' '}
              <a
                href="https://smooth-overlays.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
              >
                Smooth Gradient Overlays
              </a>{' '}
              by{' '}
              <a
                href="https://github.com/shuding"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
              >
                Shu Ding
              </a>
            </p>
            <p>
              Photo by{' '}
              <a
                href="https://unsplash.com/@samferrara?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
              >
                Samuel Ferrara
              </a>{' '}
              on{' '}
              <a
                href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium"
              >
                Unsplash
              </a>
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
