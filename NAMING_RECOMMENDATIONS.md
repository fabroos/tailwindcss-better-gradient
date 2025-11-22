# Class Naming Recommendations

## Current Naming Analysis

### Current Classes:

- `fade-bg` - Base utility
- `fade-bg-to-t`, `fade-bg-to-b`, `fade-bg-to-l`, `fade-bg-to-r` - Cardinal directions
- `fade-bg-to-tr`, `fade-bg-to-tl`, `fade-bg-to-br`, `fade-bg-to-bl` - Diagonal directions
- `fade-bg-blue-500`, `fade-bg-red-600`, etc. - Color utilities
- `fade-bg-steps-6`, `fade-bg-steps-12`, etc. - Step utilities

## Recommended Naming Options

### Option 1: Shorter & More Tailwind-like ⭐ (Recommended)

**Pros:** Shorter, cleaner, more Tailwind-like, easier to type
**Cons:** Less explicit about being background-related

```css
/* Base */
fade

/* Directions */
fade-t, fade-b, fade-l, fade-r
fade-tr, fade-tl, fade-br, fade-bl

/* Colors */
fade-blue-500, fade-red-600, etc.

/* Steps */
fade-2, fade-3, fade-4, fade-5, fade-6, fade-8, fade-10, fade-12, fade-16, fade-20, fade-24
```

**Usage:**

```html
<div class="fade fade-blue-500 fade-b">Content</div>
<div class="fade fade-blue-500 fade-b fade-12">Ultra smooth</div>
```

### Option 2: Keep "bg" but shorten modifiers

**Pros:** Explicit about background, shorter modifiers
**Cons:** Still somewhat verbose

```css
/* Base */
fade-bg

/* Directions */
fade-bg-t, fade-bg-b, fade-bg-l, fade-bg-r
fade-bg-tr, fade-bg-tl, fade-bg-br, fade-bg-bl

/* Colors */
fade-bg-blue-500, fade-bg-red-600, etc.

/* Steps */
fade-bg-2, fade-bg-3, fade-bg-4, fade-bg-5, fade-bg-6, fade-bg-8, fade-bg-10, fade-bg-12, fade-bg-16, fade-bg-20, fade-bg-24
```

**Usage:**

```html
<div class="fade-bg fade-bg-blue-500 fade-bg-b">Content</div>
<div class="fade-bg fade-bg-blue-500 fade-bg-b fade-bg-12">Ultra smooth</div>
```

### Option 3: More descriptive with "gradient"

**Pros:** Very clear what it does
**Cons:** Longest option, verbose

```css
/* Base */
gradient-fade

/* Directions */
gradient-fade-t, gradient-fade-b, gradient-fade-l, gradient-fade-r
gradient-fade-tr, gradient-fade-tl, gradient-fade-br, gradient-fade-bl

/* Colors */
gradient-fade-blue-500, gradient-fade-red-600, etc.

/* Steps */
gradient-fade-2, gradient-fade-3, etc.
```

### Option 4: Hybrid - Short base, clear modifiers

**Pros:** Short base, clear step naming
**Cons:** Inconsistent naming pattern

```css
/* Base */
fade

/* Directions */
fade-t, fade-b, fade-l, fade-r
fade-tr, fade-tl, fade-br, fade-bl

/* Colors */
fade-blue-500, fade-red-600, etc.

/* Steps - keep "steps" for clarity */
fade-steps-2, fade-steps-3, fade-steps-4, fade-steps-5, fade-steps-6, fade-steps-8, fade-steps-10, fade-steps-12, fade-steps-16, fade-steps-20, fade-steps-24
```

## Comparison Table

| Feature   | Current            | Option 1 ⭐     | Option 2           | Option 3                 | Option 4        |
| --------- | ------------------ | --------------- | ------------------ | ------------------------ | --------------- |
| Base      | `fade-bg`          | `fade`          | `fade-bg`          | `gradient-fade`          | `fade`          |
| Direction | `fade-bg-to-t`     | `fade-t`        | `fade-bg-t`        | `gradient-fade-t`        | `fade-t`        |
| Color     | `fade-bg-blue-500` | `fade-blue-500` | `fade-bg-blue-500` | `gradient-fade-blue-500` | `fade-blue-500` |
| Steps     | `fade-bg-steps-6`  | `fade-6`        | `fade-bg-6`        | `gradient-fade-6`        | `fade-steps-6`  |
| Length    | Long               | Short           | Medium             | Longest                  | Medium          |
| Clarity   | High               | Medium          | High               | Highest                  | High            |

## Recommendation: Option 1 ⭐

**Why Option 1 is best:**

1. **Shorter & Cleaner**: `fade` vs `fade-bg` - saves characters
2. **More Tailwind-like**: Follows Tailwind's pattern of short, concise utilities
3. **Better DX**: Easier to type, less verbose
4. **Still Clear**: Context makes it obvious it's a background fade
5. **Consistent**: All utilities follow the same `fade-*` pattern

**Example comparison:**

```html
<!-- Current -->
<div class="fade-bg fade-bg-blue-500 fade-bg-to-b fade-bg-steps-12">
  <!-- Option 1 (Recommended) -->
  <div class="fade fade-blue-500 fade-b fade-12"></div>
</div>
```

**Character savings:** ~40% shorter!

## Migration Considerations

If changing names:

- This would be a **major version bump** (breaking change)
- Consider providing both names during transition period
- Update all documentation and examples

## Alternative: Keep Current but Improve

If you want to keep current naming but improve it:

- `fade-bg-to-t` → `fade-bg-t` (remove "to")
- `fade-bg-steps-6` → `fade-bg-6` (remove "steps")

This would be a **minor version bump** (non-breaking if you support both).
