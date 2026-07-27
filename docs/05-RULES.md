# Development Rules

## Satyapradip Das — Portfolio Website

## 0. Agent Workflow Protocol

All work strictly follows the **Multi-Agent Review & Verification Pipeline**:
1. **Planner**: Analyzes incoming tasks, plans execution steps, and prepares verification guidelines.
2. **Worker**: Implements modifications, code, and features strictly following the design system & standards.
3. **Reviewers (1..N)**: Evaluates implementation across parallel checks:
   - *Reviewer 1 (Resident)*: Architectural integrity, design tokens, and PRD alignment.
   - *Reviewer 2..N*: Code syntax, type safety, responsiveness, performance, and accessibility.
4. **Synthesise & Pass? Gate**:
   - If **Pass = No**: Feedback is sent back to the Worker for automated self-correction loop.
   - If **Pass = Yes**: Results are passed to Plan Reviewer and synthesized.
5. **Haiku Output**: Upon successful completion, the response includes a closing Haiku summarizing the milestone/work completed.

---

## 1. Code Standards

### TypeScript
- **Strict mode** enabled — no `any`, no implicit returns
- All props must have explicit interfaces (not inline types)
- Use `type` for data shapes, `interface` for component props
- Prefer `const` assertions for static data: `as const`
- No `enum` — use `const` objects or union types instead

### React / Next.js
- **Server Components by default** — only add `"use client"` when necessary
- Extract client interactivity into small client components, keep parents as RSC
- Use `next/image` for all images — never raw `<img>`
- Use `next/font` for all fonts — never `<link>` tags
- Use `next/link` for internal navigation
- No `useEffect` for data fetching — use RSC or `use()`
- Prefer composition over prop drilling (children pattern)

### File Naming
- Components: `PascalCase.tsx` (e.g., `Hero.tsx`, `SectionHeading.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useInView.ts`)
- Constants: `camelCase.ts` (e.g., `projects.ts`, `skills.ts`)
- Types: `index.ts` in `types/` directory
- Utilities: `camelCase.ts` (e.g., `utils.ts`, `fonts.ts`)

### Imports
- Use `@/` path aliases — never relative paths like `../../`
- Group imports: React → Next → External → Internal → Types → Styles
- No unused imports

---

## 2. Styling Rules

### Tailwind CSS v4
- Use Tailwind utility classes exclusively — no inline `style` props unless absolutely necessary
- Use CSS variables via `@theme inline` in `globals.css` for design tokens
- Never hardcode colors — always reference design tokens (e.g., `text-primary`, `bg-background`)
- Use responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Use `cn()` utility from `lib/utils.ts` for conditional classes

### Component Styling
- No CSS modules — Tailwind only
- No `styled-components` or `emotion`
- Complex animations use Framer Motion `motion` components
- Micro-interactions use Tailwind `transition-*` and `hover:` classes
- Keep class strings readable — break long class lists across lines

### Design Token Usage
```
✓ bg-background        ✗ bg-[#F8F4EE]
✓ text-primary          ✗ text-[#151515]
✓ border-border         ✗ border-[#E6DDD2]
✓ text-accent           ✗ text-[#C88A3D]
```

---

## 3. Component Rules

### Structure
- One component per file
- Keep components under 150 lines — extract sub-components if larger
- Colocate component-specific types at the top of the file
- Export components as named exports (not default) from section components
- `page.tsx` is the only default export

### shadcn/ui
- Use shadcn components for all primitives: `Button`, `Card`, `Input`, `Sheet`, `Dialog`, `Avatar`, `DropdownMenu`
- Don't rebuild what shadcn already provides
- Extend shadcn components via `className` prop — don't fork them
- Follow the New York style variant (already configured)

### Shared Components
- `SectionHeading` — every section title goes through this
- `RevealOnScroll` — wrap all section content for scroll animations
- `AnimatedCounter` — all stat numbers use this
- `CardTilt` — all hoverable cards use this
- `MagneticButton` — hero CTAs use this

---

## 4. Animation Rules

### Principles
- **Smooth, not flashy** — every animation should feel intentional
- **60fps minimum** — use `transform` and `opacity` only (GPU-accelerated)
- **Respect `prefers-reduced-motion`** — disable all animations for users who prefer it
- **Once only** — scroll-triggered animations fire once, never re-trigger
- **Quick** — most animations 300-600ms, never exceed 1s

### Motion Values
```
Default ease:     [0.25, 0.46, 0.45, 0.94]  (ease-out-quad)
Spring:           { stiffness: 100, damping: 15 }
Stagger delay:    0.1s between children
Scroll threshold: 20% element visibility
```

### Library Boundaries
- **Framer Motion** — all scroll reveals, layout animations, presence
- **GSAP** — hero text only (SplitText, magnetic cursor)
- **CSS** — hover effects, transitions, infinite scroll ribbon
- **Lenis** — smooth scroll behavior (global)
- Never mix animation libraries on the same element

---

## 5. Performance Rules

- **No layout shifts** — all images must have explicit `width` and `height`
- **No render waterfalls** — avoid nested client component suspense boundaries
- **Lazy load below the fold** — use `dynamic(() => import(...))` for heavy sections
- **GSAP is hero-only** — dynamically imported, never in the main bundle
- **Images optimized** — WebP via `next/image`, blur placeholders, responsive sizes
- **Bundle size awareness** — check `npm run build` output for large pages
- **No console.log in production** — remove all debug logging before deploy

---

## 6. Accessibility Rules

- All images have descriptive `alt` text
- All buttons and links have `aria-label` when text is not self-explanatory
- Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)
- Focus states visible on all interactive elements (ring style)
- Keyboard navigation works for all sections
- Skip-to-content link at the top
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Each `<section>` has an `id` for anchor linking and `aria-labelledby`

---

## 7. SEO Rules

- Single `<h1>` per page (hero name)
- Proper heading hierarchy: `h1` → `h2` (sections) → `h3` (cards) → `h4`
- Descriptive `<title>` tag: "Satyapradip Das — Full Stack & AI Engineer"
- Meta description under 160 characters
- Open Graph tags for social sharing
- All interactive elements have unique `id` attributes
- Semantic HTML elements throughout

---

## 8. Data Rules

- All content lives in `constants/` — **never hardcode text in JSX**
- Each data file exports a typed array or object
- Personal info centralized in `personal.ts` — used by Hero, Navbar, Footer, Contact
- Project data includes all fields: title, description, tech stack, links, features
- All external URLs stored in constants (social, resume, project links)

---

## 9. Git Rules

- Commit after each completed section/component
- Commit message format: `feat(section): description` or `fix(component): description`
- Examples:
  - `feat(hero): add hero section with stats and CTAs`
  - `feat(skills): add skill category cards with tilt animation`
  - `fix(navbar): fix mobile menu z-index`
  - `chore(deps): add framer-motion`
  - `style(globals): update color palette to warm beige`

---

## 10. Testing Checklist (per section)

- [ ] Desktop layout correct (1440px viewport)
- [ ] Tablet layout correct (768px viewport)
- [ ] Mobile layout correct (375px viewport)
- [ ] Animations trigger properly on scroll
- [ ] Hover effects work on all interactive elements
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Accessible via keyboard
- [ ] Text is readable (contrast, size, spacing)
