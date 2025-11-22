/**
 * Gradient Comparison Web Component
 * A reusable web component for comparing gradients side by side
 *
 * Usage:
 * <gradient-comparison
 *   left-label="Tailwind Default"
 *   left-classes="bg-gradient-to-b from-purple-500 to-transparent"
 *   right-label="Better Gradient"
 *   right-classes="fade fade-purple-500 fade-b"
 *   height="h-64"
 *   show-code="true"
 * ></gradient-comparison>
 */

(function () {
  'use strict';

  // Gradient Comparison Web Component
  class GradientComparison extends HTMLElement {
    constructor() {
      super();
    }

    static get observedAttributes() {
      return [
        'left-label',
        'left-classes',
        'left-description',
        'right-label',
        'right-classes',
        'right-description',
        'height',
        'show-code',
      ];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    getHeight() {
      return this.getAttribute('height') || 'h-64';
    }

    getShowCode() {
      return this.getAttribute('show-code') !== 'false';
    }

    render() {
      const leftLabel = this.getAttribute('left-label') || 'Left';
      const leftClasses = this.getAttribute('left-classes') || '';
      const leftDescription = this.getAttribute('left-description') || '';
      const rightLabel = this.getAttribute('right-label') || 'Right';
      const rightClasses = this.getAttribute('right-classes') || '';
      const rightDescription = this.getAttribute('right-description') || '';
      const height = this.getHeight();
      const showCode = this.getShowCode();

      const heightClass = height.startsWith('h-') ? height : `h-${height}`;

      this.innerHTML = `
        <div class="block mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="flex flex-col gap-2">
            <div class="font-semibold text-gray-700 text-sm">${this.escapeHtml(leftLabel)}</div>
            <div class="rounded-lg overflow-hidden border-2 border-gray-200 relative ${heightClass}">
              <div class="${leftClasses} w-full h-full"></div>
            </div>
            ${
              showCode
                ? `<div class="bg-gray-50 p-3 rounded text-xs font-mono text-gray-700 break-all">${this.escapeHtml(
                    leftClasses
                  )}</div>`
                : ''
            }
            ${
              leftDescription
                ? `<div class="text-sm text-gray-600 leading-relaxed">${this.escapeHtml(leftDescription)}</div>`
                : ''
            }
          </div>
          <div class="flex flex-col gap-2">
            <div class="font-semibold text-gray-700 text-sm">${this.escapeHtml(rightLabel)}</div>
            <div class="rounded-lg overflow-hidden border-2 border-gray-200 relative ${heightClass}">
              <div class="${rightClasses} w-full h-full"></div>
            </div>
            ${
              showCode
                ? `<div class="bg-gray-50 p-3 rounded text-xs font-mono text-gray-700 break-all">${this.escapeHtml(
                    rightClasses
                  )}</div>`
                : ''
            }
            ${
              rightDescription
                ? `<div class="text-sm text-gray-600 leading-relaxed">${this.escapeHtml(rightDescription)}</div>`
                : ''
            }
          </div>
        </div>
      `;
    }

    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  }

  // Register the custom element
  if (!customElements.get('gradient-comparison')) {
    customElements.define('gradient-comparison', GradientComparison);
  }
})();
