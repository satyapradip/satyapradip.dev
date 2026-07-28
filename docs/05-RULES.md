# Project Rules & Behavioral Guidelines

## Satyapradip Das — Portfolio Website & Admin Management Portal

---

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
- All props must have explicit interfaces in `src/types/index.ts`
- Use `type` for data shapes, `interface` for component props
- Prefer `const` assertions for static data: `as const`
- No `enum` — use `const` objects or union types instead

### React / Next.js
- **Server Components by default** — only add `"use client"` when necessary
- Extract client interactivity into small client components
- Use `next/image` for all images — never raw `<img>`
- Use `next/font` for all fonts — never `<link>` tags
- Use `next/link` for internal navigation

### File Naming & Imports
- Components: `PascalCase.tsx`
- Hooks & Utilities: `camelCase.ts`
- Use `@/` path aliases — never relative paths like `../../`

---

## 2. Styling Rules (Tailwind CSS v4 & Neo-Brutalist System)

- Use Tailwind utility classes exclusively — no inline `style` props unless dynamic (e.g., cursor coordinates)
- Use design tokens from `@theme inline` in `globals.css`
- Standard Neo-Brutalist elements:
  - 3px solid dark borders (`#151b29` / `border-on-surface`)
  - Hard offset box shadows (`box-shadow: 6px 6px 0px #151b29` or `4px 4px 0px #151b29`)
  - Accent colors: Gold (`#f5a623`), Cyan (`#61f4fd`), Crimson (`#bd0041`)
- Keyboard Accessibility: Focus outline (`:focus-visible`) must be visible on all interactive elements.

---

## 3. Admin Panel & NextAuth Security Rules

1. **Strict Route Protection:**
   - Every API route under `/api/admin/*` MUST perform session verification using `getServerSession(authOptions)`.
   - Unauthenticated API requests MUST return HTTP `401 Unauthorized`.
   - Accessing `/admin/dashboard/*` without a session MUST redirect to `/admin/login`.

2. **Credential Safety & Environment Configuration:**
   - Admin passwords must be hashed using `bcrypt`. Never store plaintext credentials.
   - Secrets (`NEXTAUTH_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `DATABASE_URL`) loaded from `.env`.

3. **Featured Projects Constraint Rule:**
   - The public landing page displays **3 to 4 featured projects**.
   - Toggling `featured: true` on a project when 4 are featured prompts the user or un-features the oldest entry.

4. **Resilient Data Fallback Strategy:**
   - Public rendering MUST NEVER crash if database connection fails.
   - Dynamic data fetchers in `src/lib/data.ts` MUST wrap queries in `try/catch` and fall back to static records in `src/constants/`.

---

## 4. Animation & Interaction Rules

- **Framer Motion** for scroll reveals, staggered children, and layout transitions.
- **CSS** for micro-interactions, marquee ribbons, and hover offsets.
- **Cursor Spotlight**: Disabled on coarse touch pointers for performance.

---

## 5. Performance & Accessibility Rules

- All images must have explicit `alt` text.
- All buttons and links must have `aria-label` when text is not self-explanatory.
- Color contrast meets WCAG AA standards.
- Keyboard navigation supported across all public sections and admin management tools.
