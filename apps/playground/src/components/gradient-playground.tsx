'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy-button';
import { getFadeClass, getSimpleGradientClass, easings } from '@/utils/fadeUtils';

export function GradientPlayground() {
  const [selectedSteps, setSelectedSteps] = useState(16); // Default to 16 for smoother gradient
  const [selectedDirection, setSelectedDirection] = useState('b');
  const [selectedEasing, setSelectedEasing] = useState('ease-out-cubic');

  // Simple gradients - standard Tailwind gradients, only change with direction (not steps/easing)
  const lightSimpleClass = useMemo(
    () => getSimpleGradientClass('white', selectedDirection),
    [selectedDirection]
  );
  const darkSimpleClass = useMemo(
    () => getSimpleGradientClass('black', selectedDirection),
    [selectedDirection]
  );

  // Smoothed gradients - change with all controls (direction, steps, easing)
  const lightSmoothedClass = useMemo(
    () => getFadeClass('white', selectedDirection, selectedSteps, selectedEasing),
    [selectedDirection, selectedSteps, selectedEasing]
  );
  const darkSmoothedClass = useMemo(
    () => getFadeClass('black', selectedDirection, selectedSteps, selectedEasing),
    [selectedDirection, selectedSteps, selectedEasing]
  );

  const directions = [
    { value: 't', label: 'Top' },
    { value: 'b', label: 'Bottom' },
    { value: 'l', label: 'Left' },
    { value: 'r', label: 'Right' },
    { value: 'tl', label: 'Top Left' },
    { value: 'tr', label: 'Top Right' },
    { value: 'bl', label: 'Bottom Left' },
    { value: 'br', label: 'Bottom Right' },
  ];

  // Sample image - using Unsplash for a nice landscape image
  const sampleImageUrl =
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format';

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LIGHT Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">LIGHT</h2>

          {/* SMOOTHED */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">SMOOTHED</h3>
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
              <img src={sampleImageUrl} alt="Sample" className="w-full h-full object-cover" />
              <div className={`absolute inset-0 ${lightSmoothedClass}`} />
            </div>
          </div>

          {/* SIMPLE */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">SIMPLE</h3>
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
              <img src={sampleImageUrl} alt="Sample" className="w-full h-full object-cover" />
              <div className={`absolute inset-0 ${lightSimpleClass}`} />
            </div>
          </div>

          {/* CSS OUTPUT */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">CSS OUTPUT</label>
              <CopyButton text={lightSmoothedClass} className="h-8 px-2" />
            </div>
            <code className="block bg-gray-900 text-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto">
              {lightSmoothedClass}
            </code>
          </div>
        </div>

        {/* DARK Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">DARK</h2>

          {/* SMOOTHED */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">SMOOTHED</h3>
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
              <img src={sampleImageUrl} alt="Sample" className="w-full h-full object-cover" />
              <div className={`absolute inset-0 ${darkSmoothedClass}`} />
            </div>
          </div>

          {/* SIMPLE */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700">SIMPLE</h3>
            <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
              <img src={sampleImageUrl} alt="Sample" className="w-full h-full object-cover" />
              <div className={`absolute inset-0 ${darkSimpleClass}`} />
            </div>
          </div>

          {/* CSS OUTPUT */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">CSS OUTPUT</label>
              <CopyButton text={darkSmoothedClass} className="h-8 px-2" />
            </div>
            <code className="block bg-gray-900 text-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto">
              {darkSmoothedClass}
            </code>
          </div>
        </div>

        {/* CONTROLS Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">CONTROLS</h2>

          {/* STEPS */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">STEPS</label>
              <span className="text-sm font-bold text-blue-600">{selectedSteps}</span>
            </div>
            <input
              type="range"
              min="2"
              max="24"
              value={selectedSteps}
              onChange={e => setSelectedSteps(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              step={1}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>2</span>
              <span>24</span>
            </div>
          </div>

          {/* DIRECTION */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">DIRECTION</label>
            <div className="grid grid-cols-3 gap-2">
              {directions.map(dir => (
                <Button
                  key={dir.value}
                  variant={selectedDirection === dir.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDirection(dir.value)}
                  className={`text-xs ${
                    selectedDirection === dir.value ? 'bg-blue-600 hover:bg-blue-700' : ''
                  }`}
                >
                  {dir.label}
                </Button>
              ))}
            </div>
          </div>

          {/* EASING */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">EASING</label>
            <div className="grid grid-cols-2 gap-2">
              {easings.map(easing => (
                <Button
                  key={easing.value}
                  variant={selectedEasing === easing.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedEasing(easing.value)}
                  className={`text-xs ${
                    selectedEasing === easing.value ? 'bg-green-600 hover:bg-green-700' : ''
                  }`}
                >
                  {easing.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
