# Implementation Phases

## Satyapradip Das — Portfolio Website

---

## Overview

The build is organized into **6 phases**, each producing a deployable increment. No phase should take more than a single focused session. Each phase builds on the previous one.

---

## Phase 1: Foundation & Design System

**Goal:** Set up the design tokens, fonts, global styles, and shared components.

### Tasks

- [ ] Update `globals.css` with the warm beige color palette (replace zinc theme)
- [ ] Configure `@theme inline` with new design tokens
- [ ] Set up Google Fonts in `layout.tsx` (Space Grotesk, Inter, Cormorant Garamond)
- [ ] Create `constants/` directory with all data files:
  - `personal.ts` — name, title, bio, social links
  - `projects.ts` — project data
  - `skills.ts` — skill categories
  - `experience.ts` — work entries
  - `education.ts` — education details
  - `certifications.ts` — cert entries
  - `achievements.ts` — achievement data
  - `techStack.ts` — tech ribbon items
- [ ] Create `types/index.ts` — shared TypeScript interfaces
- [ ] Create `lib/fonts.ts` — font loader exports
- [ ] Create `SectionHeading` shared component
- [ ] Create `RevealOnScroll` shared component (Framer Motion)
- [ ] Verify the design tokens render correctly

### Deliverable
Blank page with correct fonts, colors, and the design system wired up. Constants files populated with real data.

---

## Phase 2: Layout & Hero

**Goal:** Build the Navbar, Hero section, and Footer — the first and last things a visitor sees.

### Tasks

- [ ] Build `Navbar` — sticky, blur backdrop, section links, mobile hamburger (shadcn Sheet)
- [ ] Build `Hero` — two-column layout:
  - Left: name, title, tagline, CTA buttons
  - Right: professional photo placeholder
  - Bottom: stats row with `AnimatedCounter`
- [ ] Build `Footer` — tech badges, copyright, social links
- [ ] Wire up smooth scrolling (install Lenis)
- [ ] Add scroll progress indicator to Navbar
- [ ] Implement `MagneticButton` for CTAs
- [ ] Add hero text entrance animations (Framer Motion, staggered)
- [ ] Test responsive layout (desktop → tablet → mobile)

### Deliverable
Full hero experience with navigation. Site looks "real" at first glance.

---

## Phase 3: Content Sections (Part 1)

**Goal:** Build the content-heavy middle sections: Tech Stack, About, Skills, Experience.

### Tasks

- [ ] Build `TechStack` ribbon — infinite horizontal scroll, grouped by category
- [ ] Build `About` — "WHO I AM" with checklist items
- [ ] Build `Skills` — large category cards with hover tilt animation:
  - Backend · Frontend · AI · Database · Developer Tools
- [ ] Build `Experience` — vertical timeline with checkmark bullets
  - The Corporate Pot entry with "Read Case Study →" link
- [ ] Add `RevealOnScroll` to all sections
- [ ] Add `CardTilt` hover effect to skill cards
- [ ] Test section spacing and visual rhythm

### Deliverable
Scrollable page with 4 fully built content sections. Animations trigger on scroll.

---

## Phase 4: Content Sections (Part 2)

**Goal:** Build the remaining content sections: Projects, Process, Education, Certs, Achievements, GitHub.

### Tasks

- [ ] Build `Projects` — 3 large featured project cards:
  - Employee Management System (enterprise styled)
  - ApnaDoctor (AI badge prominent, laptop mockup)
  - Maya Voice AI (dark themed card variant)
  - Each card: screenshot, tech badges, action buttons, feature tags
- [ ] Generate project screenshot images (use `generate_image` tool)
- [ ] Build `Process` — numbered vertical flow (01→06)
- [ ] Build `Education` — large card with CGPA highlight
- [ ] Build `Certifications` — card grid
- [ ] Build `Achievements` — visual stat cards (TOP 10%, hackathon badges)
- [ ] Build `GitHubStats` — animated counter grid (350+ commits, etc.)
- [ ] Add `RevealOnScroll` to all new sections

### Deliverable
Complete page with all 14 sections. Full scroll experience.

---

## Phase 5: Contact, Interactivity & Polish

**Goal:** Wire up the contact form, add advanced animations, polish everything.

### Tasks

- [ ] Build `Contact` — form + social links
- [ ] Integrate EmailJS or Resend for form submission
- [ ] Add cursor spotlight effect (GSAP, subtle mouse glow)
- [ ] Add gradient border animation on featured project cards
- [ ] Add image reveal animation on project screenshots
- [ ] Fine-tune all animation timings and easing curves
- [ ] Add `aria-label` attributes for accessibility
- [ ] Add keyboard navigation support
- [ ] Review and polish spacing, alignment, typography across all breakpoints
- [ ] Add loading states and error handling for contact form

### Deliverable
Fully interactive, polished portfolio with working contact form.

---

## Phase 6: SEO, Performance & Deployment

**Goal:** Optimize for production. Ship it.

### Tasks

- [ ] Add comprehensive metadata in `layout.tsx`:
  - Title, description, keywords
  - Open Graph tags (og:image, og:title, og:description)
  - Twitter Card tags
  - Canonical URL
- [ ] Generate and add `og-image.png` (social preview)
- [ ] Add `robots.txt` and `sitemap.xml`
- [ ] Add structured data (JSON-LD Person schema)
- [ ] Run Lighthouse audit — target 90+ on all metrics
- [ ] Optimize images (ensure all use `next/image`)
- [ ] Lazy load below-the-fold sections
- [ ] Dynamic import GSAP (only loaded for hero)
- [ ] Add Vercel Analytics snippet
- [ ] Final cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Final mobile testing (different viewport sizes)
- [ ] Deploy to Vercel
- [ ] Verify production build

### Deliverable
Production-deployed portfolio at a custom domain, fully optimized.

---

## Dependencies to Install (by Phase)

| Phase | Packages |
|---|---|
| 1 | (none — fonts via next/font, shadcn already installed) |
| 2 | `framer-motion`, `lenis` |
| 3 | (none) |
| 4 | `react-icons` (for brand logos) |
| 5 | `emailjs-com` or `resend`, `gsap` |
| 6 | `@vercel/analytics` |

---

## Timeline Estimate

| Phase | Effort |
|---|---|
| Phase 1 | ~2 hours |
| Phase 2 | ~3 hours |
| Phase 3 | ~3 hours |
| Phase 4 | ~4 hours |
| Phase 5 | ~3 hours |
| Phase 6 | ~2 hours |
| **Total** | **~17 hours** |
