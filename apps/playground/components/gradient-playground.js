/**
 * Gradient Playground Web Component
 * An interactive playground for testing gradient configurations
 *
 * Usage:
 * <gradient-playground
 *   default-direction="to-b"
 *   default-color="purple-500"
 *   default-steps="6"
 *   height="h-64"
 *   show-code="true"
 * ></gradient-playground>
 */

(function () {
  'use strict';

  class GradientPlayground extends HTMLElement {
    constructor() {
      super();
      this.direction = 'fade-b';
      this.color = 'fade-purple-500';
      this.steps = 'fade-6';
      this.background = 'bg-white';
      this.useBetterGradient = true;
      this.sizePixels = 256; // Default to 256px (equivalent to h-64)
    }

    static get observedAttributes() {
      return [
        'default-direction',
        'default-color',
        'default-steps',
        'default-background',
        'default-size',
        'height',
        'show-code',
      ];
    }

    connectedCallback() {
      const directionAttr = this.getAttribute('default-direction') || 'to-b';
      const colorAttr = this.getAttribute('default-color') || 'purple-500';
      const stepsAttr = this.getAttribute('default-steps') || '6';
      const backgroundAttr = this.getAttribute('default-background') || 'bg-white';
      const useBetterAttr = this.getAttribute('use-better-gradient');

      // Handle direction: remove 'to-' prefix if present, then add 'fade-'
      if (directionAttr.startsWith('fade-')) {
        this.direction = directionAttr;
      } else {
        const directionValue = directionAttr.startsWith('to-')
          ? directionAttr.substring(3)
          : directionAttr;
        this.direction = `fade-${directionValue}`;
      }

      this.color = colorAttr.startsWith('fade-') ? colorAttr : `fade-${colorAttr}`;
      this.steps = stepsAttr.startsWith('fade-') ? stepsAttr : `fade-${stepsAttr}`;
      // Handle both color classes and image URLs
      this.background = backgroundAttr.startsWith('http')
        ? backgroundAttr
        : backgroundAttr.startsWith('bg-')
          ? backgroundAttr
          : `bg-${backgroundAttr}`;
      this.useBetterGradient = useBetterAttr !== null ? useBetterAttr !== 'false' : true;

      // Handle size - convert Tailwind classes to pixels or use pixel value
      const sizeAttr = this.getAttribute('default-size') || this.getAttribute('height') || '256';
      if (sizeAttr.includes('px')) {
        this.sizePixels = parseInt(sizeAttr.replace('px', ''), 10) || 256;
      } else if (sizeAttr.startsWith('h-')) {
        // Convert Tailwind height classes to pixels
        const heightMap = {
          'h-32': 128,
          'h-48': 192,
          'h-64': 256,
          'h-80': 320,
          'h-96': 384,
        };
        this.sizePixels = heightMap[sizeAttr] || 256;
      } else {
        this.sizePixels = parseInt(sizeAttr, 10) || 256;
      }

      this.render();
      this.attachEventListeners();
    }

    attributeChangedCallback() {
      if (this.isConnected) {
        this.render();
        this.attachEventListeners();
      }
    }

    getHeight() {
      return `${this.sizePixels}px`;
    }

    getShowCode() {
      return this.getAttribute('show-code') !== 'false';
    }

    getDirections() {
      return [
        { value: 'fade-t', label: 'Top (t)' },
        { value: 'fade-b', label: 'Bottom (b)' },
        { value: 'fade-r', label: 'Right (r)' },
        { value: 'fade-l', label: 'Left (l)' },
        { value: 'fade-tr', label: 'Top Right (tr)' },
        { value: 'fade-tl', label: 'Top Left (tl)' },
        { value: 'fade-br', label: 'Bottom Right (br)' },
        { value: 'fade-bl', label: 'Bottom Left (bl)' },
      ];
    }

    getColors() {
      return [
        { value: 'fade-purple-500', label: 'Purple 500' },
        { value: 'fade-blue-500', label: 'Blue 500' },
        { value: 'fade-red-500', label: 'Red 500' },
        { value: 'fade-green-500', label: 'Green 500' },
        { value: 'fade-pink-500', label: 'Pink 500' },
        { value: 'fade-yellow-500', label: 'Yellow 500' },
        { value: 'fade-indigo-500', label: 'Indigo 500' },
        { value: 'fade-teal-500', label: 'Teal 500' },
        { value: 'fade-rose-600', label: 'Rose 600' },
        { value: 'fade-emerald-500', label: 'Emerald 500' },
        { value: 'fade-amber-500', label: 'Amber 500' },
        { value: 'fade-black', label: 'Black' },
        { value: 'fade-white', label: 'White' },
      ];
    }

    getSteps() {
      return [
        { value: 'fade-2', label: '2 - Quick fade' },
        { value: 'fade-3', label: '3 - Quick fade' },
        { value: 'fade-4', label: '4 - Balanced' },
        { value: 'fade-5', label: '5 - Balanced' },
        { value: 'fade-6', label: '6 - Default (balanced)' },
        { value: 'fade-8', label: '8 - Smooth' },
        { value: 'fade-10', label: '10 - Smooth' },
        { value: 'fade-12', label: '12 - Very smooth' },
        { value: 'fade-16', label: '16 - Ultra smooth' },
        { value: 'fade-20', label: '20 - Ultra smooth' },
        { value: 'fade-24', label: '24 - Maximum smoothness' },
      ];
    }

    getBackgrounds() {
      return [
        { value: 'bg-white', label: 'White', type: 'color' },
        { value: 'bg-gray-50', label: 'Gray 50', type: 'color' },
        { value: 'bg-gray-100', label: 'Gray 100', type: 'color' },
        { value: 'bg-gray-200', label: 'Gray 200', type: 'color' },
        { value: 'bg-gray-800', label: 'Gray 800', type: 'color' },
        { value: 'bg-gray-900', label: 'Gray 900', type: 'color' },
        { value: 'bg-black', label: 'Black', type: 'color' },
        { value: 'bg-purple-50', label: 'Purple 50', type: 'color' },
        { value: 'bg-blue-50', label: 'Blue 50', type: 'color' },
        { value: 'bg-red-50', label: 'Red 50', type: 'color' },
        { value: 'bg-green-50', label: 'Green 50', type: 'color' },
        { value: 'bg-yellow-50', label: 'Yellow 50', type: 'color' },
        { value: 'bg-pink-50', label: 'Pink 50', type: 'color' },
        {
          value:
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
          label: 'Mountain Landscape',
          type: 'image',
        },
        {
          value:
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop',
          label: 'Ocean Waves',
          type: 'image',
        },
        {
          value:
            'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=800&fit=crop',
          label: 'Forest Path',
          type: 'image',
        },
        {
          value:
            'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=800&fit=crop',
          label: 'Desert Sunset',
          type: 'image',
        },
        {
          value:
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=800&fit=crop',
          label: 'City Skyline',
          type: 'image',
        },
        {
          value:
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
          label: 'Abstract Pattern',
          type: 'image',
        },
      ];
    }

    convertToNormalGradient() {
      // Convert fade-b to bg-gradient-to-b
      let normalDirection = this.direction;
      if (normalDirection.startsWith('fade-')) {
        // Remove 'fade-' prefix and add 'bg-gradient-to-' prefix
        const directionValue = normalDirection.replace('fade-', '');
        normalDirection = `bg-gradient-to-${directionValue}`;
      } else if (!normalDirection.startsWith('bg-gradient-to-')) {
        // If it's just 'to-b' or similar, remove 'to-' prefix and add 'bg-gradient-to-'
        const directionValue = normalDirection.startsWith('to-')
          ? normalDirection.substring(3)
          : normalDirection;
        normalDirection = `bg-gradient-to-${directionValue}`;
      }

      // Convert fade-purple-500 to purple-500
      let normalColor = this.color;
      if (normalColor.startsWith('fade-')) {
        normalColor = normalColor.replace('fade-', '');
      }

      return {
        direction: normalDirection,
        color: normalColor,
        classes: `${normalDirection} from-${normalColor} to-transparent`,
      };
    }

    updatePreview() {
      const preview = this.querySelector('#preview');
      const previewContainer = this.querySelector('#preview-container');
      const codeOutput = this.querySelector('#code-output');

      if (!preview) return;

      // Set classes based on gradient type - directly set className to ensure clean state
      if (this.useBetterGradient) {
        preview.className = `fade ${this.direction} ${this.color} ${this.steps} h-full`;
      } else {
        const normalGradient = this.convertToNormalGradient();
        preview.className = `${normalGradient.classes} h-full`;
      }

      // Update background container size
      if (previewContainer) {
        // Remove all height classes and set pixel height
        previewContainer.className = previewContainer.className
          .split(' ')
          .filter(cls => !cls.startsWith('h-'))
          .join(' ');
        previewContainer.style.height = `${this.sizePixels}px`;
        const backgrounds = this.getBackgrounds();
        const selectedBg = backgrounds.find(bg => bg.value === this.background);
        const isImage = selectedBg?.type === 'image' || this.background.startsWith('http');

        // Remove all bg-* classes and background-image styles
        previewContainer.className = previewContainer.className
          .split(' ')
          .filter(
            cls => !cls.startsWith('bg-') && !cls.startsWith('from-') && !cls.startsWith('to-')
          )
          .join(' ');
        previewContainer.style.backgroundImage = '';
        previewContainer.style.backgroundSize = '';
        previewContainer.style.backgroundPosition = '';

        if (isImage) {
          // Apply image background
          previewContainer.style.backgroundImage = `url(${this.background})`;
          previewContainer.style.backgroundSize = 'cover';
          previewContainer.style.backgroundPosition = 'center';
        } else {
          // Apply color background class
          previewContainer.classList.add(this.background);
        }
      }

      // Update code output
      if (codeOutput) {
        if (this.useBetterGradient) {
          const classes = `fade ${this.color} ${this.direction} ${this.steps}`;
          codeOutput.textContent = `<div class="${classes}"></div>`;
        } else {
          const normalGradient = this.convertToNormalGradient();
          codeOutput.textContent = `<div class="${normalGradient.classes}"></div>`;
        }
      }
    }

    attachEventListeners() {
      const directionSelect = this.querySelector('#direction');
      const colorSelect = this.querySelector('#color');
      const stepsSelect = this.querySelector('#steps');
      const backgroundSelect = this.querySelector('#background');
      const gradientToggle = this.querySelector('#gradient-toggle');

      if (directionSelect) {
        directionSelect.value = this.direction;
        directionSelect.addEventListener('change', e => {
          this.direction = e.target.value;
          this.updatePreview();
        });
      }

      if (colorSelect) {
        colorSelect.value = this.color;
        colorSelect.addEventListener('change', e => {
          this.color = e.target.value;
          this.updatePreview();
        });
      }

      if (stepsSelect) {
        stepsSelect.value = this.steps;
        stepsSelect.addEventListener('change', e => {
          this.steps = e.target.value;
          this.updatePreview();
        });
      }

      if (backgroundSelect) {
        backgroundSelect.value = this.background;
        backgroundSelect.addEventListener('change', e => {
          this.background = e.target.value;
          this.updatePreview();
        });
      }

      if (gradientToggle) {
        gradientToggle.checked = this.useBetterGradient;
        gradientToggle.addEventListener('change', e => {
          this.useBetterGradient = e.target.checked;
          this.updatePreview();
        });
      }

      // Handle size slider
      const sizeSlider = this.querySelector('#size-slider');
      const sizeLabel = this.querySelector('#size-label');
      if (sizeSlider && sizeLabel) {
        sizeSlider.min = 100;
        sizeSlider.max = 800;
        sizeSlider.value = this.sizePixels;
        sizeLabel.textContent = `${this.sizePixels}px`;

        sizeSlider.addEventListener('input', e => {
          this.sizePixels = parseInt(e.target.value, 10);
          sizeLabel.textContent = `${this.sizePixels}px`;
          this.updatePreview();
        });
      }
    }

    render() {
      const showCode = this.getShowCode();

      const directions = this.getDirections();
      const colors = this.getColors();
      const steps = this.getSteps();
      const backgrounds = this.getBackgrounds();

      // Get initial preview classes
      const initialPreviewClasses = this.useBetterGradient
        ? `fade ${this.color} ${this.direction} ${this.steps}`
        : this.convertToNormalGradient().classes;

      this.innerHTML = `
        <!-- Gradient Type Toggle -->
        <div class="mb-6 flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div>
            <label for="gradient-toggle" class="block text-sm font-medium text-gray-700 mb-1">
              Gradient Type
            </label>
            <p class="text-xs text-gray-500">
              ${this.useBetterGradient ? 'Better Gradient (Eased)' : 'Normal Tailwind Gradient (Linear)'}
            </p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="gradient-toggle"
              class="sr-only peer"
              ${this.useBetterGradient ? 'checked' : ''}
            />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-700">
              ${this.useBetterGradient ? 'Better' : 'Normal'}
            </span>
          </label>
        </div>

        <div class="block grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <!-- Direction Control -->
          <div>
            <label for="direction" class="block text-sm font-medium text-gray-700 mb-2">Direction</label>
            <select
              id="direction"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              ${directions
                .map(
                  dir =>
                    `<option value="${dir.value}" ${dir.value === this.direction ? 'selected' : ''}>${this.escapeHtml(
                      dir.label
                    )}</option>`
                )
                .join('')}
            </select>
          </div>

          <!-- Color Control -->
          <div>
            <label for="color" class="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <select
              id="color"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              ${colors
                .map(
                  col =>
                    `<option value="${col.value}" ${col.value === this.color ? 'selected' : ''}>${this.escapeHtml(
                      col.label
                    )}</option>`
                )
                .join('')}
            </select>
          </div>

          <!-- Steps Control -->
          <div>
            <label for="steps" class="block text-sm font-medium text-gray-700 mb-2">Steps (Smoothness)</label>
            <select
              id="steps"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              ${steps
                .map(
                  step =>
                    `<option value="${step.value}" ${step.value === this.steps ? 'selected' : ''}>${this.escapeHtml(
                      step.label
                    )}</option>`
                )
                .join('')}
            </select>
          </div>

          <!-- Background Control -->
          <div>
            <label for="background" class="block text-sm font-medium text-gray-700 mb-2">Background</label>
            <select
              id="background"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              ${backgrounds
                .map(
                  bg =>
                    `<option value="${bg.value}" ${bg.value === this.background ? 'selected' : ''}>${this.escapeHtml(
                      bg.label
                    )}</option>`
                )
                .join('')}
            </select>
          </div>
        </div>

        <!-- Size Control -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <label for="size-slider" class="block text-sm font-medium text-gray-700">Height</label>
            <span id="size-label" class="text-sm text-gray-600 font-mono">${this.sizePixels}px</span>
          </div>
          <input
            type="range"
            id="size-slider"
            min="100"
            max="800"
            value="${this.sizePixels}"
            step="1"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
        </div>

        <!-- Preview Area -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Preview</label>
          <div id="preview-container" class="${
            this.background.startsWith('http') ? '' : this.background
          } rounded-lg overflow-hidden border-2 border-gray-200" style="height: ${this.sizePixels}px;${
            this.background.startsWith('http')
              ? ` background-image: url(${this.escapeHtml(
                  this.background
                )}); background-size: cover; background-position: center;`
              : ''
          }">
            <div id="preview" class="${initialPreviewClasses} h-full"></div>
          </div>
        </div>

        ${
          showCode
            ? `
        <!-- Code Display -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Generated Classes</label>
          <div class="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <code id="code-output" class="text-green-400">&lt;div class="${initialPreviewClasses}"&gt;&lt;/div&gt;</code>
          </div>
        </div>
        `
            : ''
        }
      `;
    }

    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  }

  // Register the custom element
  if (!customElements.get('gradient-playground')) {
    customElements.define('gradient-playground', GradientPlayground);
  }
})();
