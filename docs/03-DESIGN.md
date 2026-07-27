# Design System

## Satyapradip Das — Portfolio Website

---

## 1. Design Philosophy

**Modern + Premium + Calm + Developer-first**

Inspired by: **Linear** · **Vercel** · **Raycast** · **Stripe**
— but with **warm beige** instead of dark mode.

The design should feel like a premium software product page, not a college student portfolio.

---

## 2. Color Palette

### Primary Palette

| Token | Hex | Usage |
|---|---|---|
| `--background` | `#F8F4EE` | Page background — warm linen beige |
| `--card` | `#FFFDF9` | Card surfaces — near-white warm |
| `--primary` | `#151515` | Primary text, headings — rich black |
| `--secondary` | `#5C564F` | Body text, captions — warm gray |
| `--accent` | `#C88A3D` | CTAs, highlights, hover states — warm gold |
| `--border` | `#E6DDD2` | Card borders, dividers — subtle warm |
| `--success` | `#2D6A4F` | Status indicators, checkmarks — forest green |

### Extended Palette

| Token | Hex | Usage |
|---|---|---|
| `--accent-light` | `#F5E6D0` | Accent backgrounds, badges |
| `--accent-dark` | `#A06E2B` | Accent hover states |
| `--muted` | `#A39A8E` | Disabled states, metadata |
| `--surface-hover` | `#F3EDE5` | Card hover background |
| `--overlay` | `rgba(21,21,21,0.6)` | Modal/dialog overlays |

### CSS Variables (globals.css)

```css
@theme inline {
  --color-background: #F8F4EE;
  --color-foreground: #151515;
  --color-card: #FFFDF9;
  --color-card-foreground: #151515;
  --color-primary: #151515;
  --color-primary-foreground: #FFFDF9;
  --color-secondary: #5C564F;
  --color-secondary-foreground: #FFFDF9;
  --color-accent: #C88A3D;
  --color-accent-foreground: #FFFDF9;
  --color-muted: #A39A8E;
  --color-muted-foreground: #5C564F;
  --color-border: #E6DDD2;
  --color-input: #E6DDD2;
  --color-ring: #C88A3D;
  --color-success: #2D6A4F;
}
```

---

## 3. Typography

### Font Stack

| Role | Font | Weight | Fallback |
|---|---|---|---|
| **Hero / Display** | Space Grotesk | 700 (Bold) | system-ui, sans-serif |
| **Body** | Inter | 400, 500, 600 | system-ui, sans-serif |
| **Section Titles** | Cormorant Garamond | 600 (SemiBold) | Georgia, serif |
| **Code / Mono** | Geist Mono | 400 | monospace |

### Type Scale

| Element | Font | Size (desktop) | Size (mobile) | Weight | Tracking |
|---|---|---|---|---|---|
| Hero name | Space Grotesk | 72px / 4.5rem | 40px / 2.5rem | 700 | -0.02em |
| Hero title | Space Grotesk | 48px / 3rem | 28px / 1.75rem | 700 | -0.01em |
| Section heading | Cormorant Garamond | 40px / 2.5rem | 28px / 1.75rem | 600 | 0 |
| Card title | Inter | 24px / 1.5rem | 20px / 1.25rem | 600 | -0.01em |
| Body large | Inter | 18px / 1.125rem | 16px / 1rem | 400 | 0 |
| Body | Inter | 16px / 1rem | 15px / 0.9375rem | 400 | 0 |
| Caption | Inter | 14px / 0.875rem | 13px / 0.8125rem | 500 | 0.01em |
| Badge / Tag | Inter | 12px / 0.75rem | 12px / 0.75rem | 600 | 0.04em |

### Loading (next/font)

```tsx
import { Space_Grotesk, Inter, Cormorant_Garamond } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const cormorant = Cormorant_Garamond({ weight: ["600"], subsets: ["latin"], variable: "--font-heading" });
```

---

## 4. Spacing System

Base unit: **4px**

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Tight gaps |
| `--space-2` | 8px | Icon gaps, badge padding |
| `--space-3` | 12px | Inline spacing |
| `--space-4` | 16px | Card padding (small), gaps |
| `--space-6` | 24px | Card padding (standard) |
| `--space-8` | 32px | Section inner padding |
| `--space-12` | 48px | Section gap |
| `--space-16` | 64px | Section vertical padding |
| `--space-24` | 96px | Major section separators |
| `--space-32` | 128px | Hero vertical padding |

---

## 5. Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 6px | Badges, tags, pills |
| `--radius-md` | 10px | Buttons, inputs |
| `--radius-lg` | 16px | Cards |
| `--radius-xl` | 24px | Large feature cards |
| `--radius-full` | 9999px | Avatar, circular elements |

---

## 6. Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(21,21,21,0.04)` | Subtle card shadow |
| `--shadow-md` | `0 4px 12px rgba(21,21,21,0.06)` | Card default |
| `--shadow-lg` | `0 8px 24px rgba(21,21,21,0.08)` | Card hover / elevated |
| `--shadow-xl` | `0 16px 48px rgba(21,21,21,0.10)` | Featured project cards |
| `--shadow-glow` | `0 0 24px rgba(200,138,61,0.15)` | Accent glow on hover |

---

## 7. Component Patterns

### Cards

```
┌─────────────────────────────────┐
│                                 │  background: var(--card)
│   Card Content                  │  border: 1px solid var(--border)
│                                 │  border-radius: var(--radius-lg)
│                                 │  padding: var(--space-6)
│                                 │  shadow: var(--shadow-md)
└─────────────────────────────────┘

Hover state:
  shadow → var(--shadow-lg)
  transform: translateY(-2px)
  border-color: var(--accent) at 30% opacity
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### Buttons

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| Primary | `--accent` | `white` | none | darken 10%, shadow-glow |
| Outline | transparent | `--primary` | `--border` | `--surface-hover` bg |
| Ghost | transparent | `--secondary` | none | `--surface-hover` bg |

### Badges / Tech Pills

```
background: var(--accent-light)
color: var(--accent-dark)
padding: 4px 12px
border-radius: var(--radius-sm)
font-size: 12px
font-weight: 600
letter-spacing: 0.04em
text-transform: uppercase
```

### Section Headings

```
font-family: Cormorant Garamond
font-size: 40px
font-weight: 600
color: var(--primary)
margin-bottom: 48px
text-align: center (or left on certain sections)

Optional accent underline:
  width: 48px
  height: 3px
  background: var(--accent)
  margin-top: 12px
```

---

## 8. Layout Grid

| Breakpoint | Columns | Gutter | Container Max Width |
|---|---|---|---|
| Desktop (≥1280px) | 12 | 24px | 1200px |
| Laptop (≥1024px) | 12 | 20px | 960px |
| Tablet (≥768px) | 6 | 16px | 720px |
| Mobile (< 768px) | 1 | 16px | 100% - 32px padding |

Container: centered with `max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8`

---

## 9. Animation Specifications

### Scroll Reveal (default)

```
initial:   { opacity: 0, y: 30 }
animate:   { opacity: 1, y: 0 }
transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
trigger:   IntersectionObserver at 20% visibility
once:      true (animate only on first appearance)
```

### Stagger Children

```
container: { staggerChildren: 0.1 }
child:     same as scroll reveal
```

### Counter Animation

```
duration: 2 seconds
easing:  easeOut
trigger: when element enters viewport
format:  number + suffix (e.g., "15+", "9.29")
```

### Card Hover Tilt

```
max rotation: 5deg on X/Y axis
perspective:  1000px
transition:   transform 0.15s ease-out
reset:        smooth return to flat on mouse leave
```

### Magnetic Button

```
range:     50px detection radius
movement:  max 8px displacement toward cursor
transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

### Infinite Scroll (Tech Ribbon)

```
CSS animation: translateX from 0 to -50%
duration: 30s
timing:   linear
iteration: infinite
pause:    on hover
duplicate: content duplicated for seamless loop
```

---

## 10. Iconography

- **Primary:** Lucide Icons (already installed)
- **Secondary:** React Icons (for brand logos — React, Node, etc.)
- **Style:** 20px default, 1.5px stroke weight, match `--secondary` color
- **Tech logos:** Monochrome or subtly tinted to match palette

---

## 11. Imagery

- **Profile photo:** Professional headshot, circular crop with subtle border
- **Project screenshots:** Rounded corners (radius-xl), subtle shadow, slight perspective tilt
- **Mockups:** Browser/laptop frames for project screenshots (optional, generate if needed)
- **No stock photos** — only real screenshots and generated assets
- **Format:** WebP via next/image, with blur placeholder

---

## 12. Responsive Behavior

### Navigation
- Desktop: horizontal link bar
- Mobile: hamburger → full-screen sheet (shadcn Sheet)
- Sticky with blur backdrop: `backdrop-filter: blur(12px)`

### Hero
- Desktop: 2-column (text left, photo right)
- Mobile: stacked (text → photo → stats)

### Project Cards
- Desktop: large cards, alternating layout
- Mobile: full-width stacked cards

### Skills
- Desktop: 3-column grid
- Tablet: 2-column
- Mobile: 1-column full-width cards

### General
- Large touch targets on mobile (min 44×44px)
- Floating contact button (bottom-right) on mobile
- Adequate spacing increases for thumb-friendly scrolling
