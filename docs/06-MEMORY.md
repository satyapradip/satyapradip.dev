# Memory — Project Context

## Satyapradip Das — Portfolio Website

> This file serves as persistent context for any AI agent or developer working on this project.
> It captures decisions made, current state, gotchas, and important references.

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Name** | Satyapradip Das — Portfolio |
| **Type** | Personal portfolio website |
| **Monorepo** | `e:\portfolio\` with `frontend/` and `backend/` subdirectories |
| **Status** | In development — scaffolded, not yet built |

---

## 2. Current State (as of 2026-07-27)

### Frontend (`/frontend`)
- **Framework:** Next.js 16.2.12 (App Router)
- **React:** 19.2.4
- **Styling:** Tailwind CSS v4 + `@tailwindcss/postcss`
- **UI Library:** shadcn/ui (New York style) — components installed:
  - `Button`, `Card`, `Input`, `Dialog`, `DropdownMenu`, `Avatar`, `Sheet`
- **TypeScript:** 5.x with strict mode, `@/*` path alias → `./src/*`
- **PostCSS:** configured in `postcss.config.mjs` using `@tailwindcss/postcss`
- **Page:** Currently a placeholder `page.tsx` with "Welcome to my Portfolio"
- **Fonts:** Geist Sans and Geist Mono from Next.js defaults (to be replaced)

### Backend (`/backend`)
- **Framework:** Express 5.2.1 + TypeScript 7.x
- **Database:** MongoDB via Mongoose 9
- **Auth:** JWT + bcrypt
- **Security:** Helmet, CORS, rate limiting
- **File uploads:** Multer + Cloudinary
- **Validation:** Zod 4
- **Structure:** MVC — controllers, models, routes, middleware, config
- **Purpose:** Future admin panel for dynamic content management
- **Status:** Scaffolded but not actively used for the portfolio frontend

---

## 3. Key Decisions Made

| Decision | Choice | Date | Reason |
|---|---|---|---|
| Color palette | Warm beige (#F8F4EE) | 2026-07-27 | Premium, calm aesthetic — differentiates from typical dark mode portfolios |
| Font stack | Space Grotesk + Inter + Cormorant Garamond | 2026-07-27 | Display + body + editorial — premium feel |
| Animation lib | Framer Motion (primary) + GSAP (hero only) | 2026-07-27 | FM for general use, GSAP only for complex hero effects |
| Data strategy | TypeScript constants (static) | 2026-07-27 | No API needed; SSG-friendly; zero runtime cost |
| Deployment | Vercel | 2026-07-27 | Zero-config Next.js hosting |
| UI components | shadcn/ui (New York) | 2026-07-27 | Already installed; accessible; customizable |
| Tailwind version | v4 with `@theme inline` | 2026-07-27 | Already configured in the project |
| Contact form | EmailJS (client-side) | 2026-07-27 | No backend needed for form submission |
| Scrolling | Lenis | 2026-07-27 | Smooth, premium scrolling |
| Backend role | Admin panel only (future) | 2026-07-27 | Portfolio frontend is fully static |
| Agent Workflow | Planner → Worker → Multi-Reviewer Synthesis → Haiku output | 2026-07-27 | User specified custom multi-agent review architecture |

---

## 3.1 Agent Working Architecture

```
                                      ┌──────────────┐
                                 ┌───>│  Reviewer 1  ├───┐
                                 │    │(Resident Agt)│   │
                                 │    └──────────────┘   │
┌──────┐    ┌─────────┐    ┌─────┴──┐ ┌──────────────┐   │   ┌───────────┐    ┌───────┐
│ Task │───>│ Planner │───>│ Worker │──> Reviewer 2  ├───┼──>│Synthesise │───>│ Pass? │
└──────┘    └────┬────┘    └─────┬──┘ └──────────────┘   │   └───────────┘    └───┬───┘
                 │               ▲    ┌──────────────┐   │                        │
                 │               │    │ Reviewer N   ├───┘                        │
                 │               └────┼──────────────┼───────── Feedback (No) ────┤
                 │                    └──────────────┘                            │
                 ▼                                                                ▼ (Yes)
           ┌─────────────┐                                                 ┌──────────────┐
           │Plan Reviewer│<───────────────── Results ──────────────────────┤Turn into     │
           └──────┬──────┘                                                 │haiku         │
                  │                                                        └──────┬───────┘
                  ▼                                                               │
            Plan Feedback                                                         ▼
                  └───────────────────────────────> Send to User <────────────────┘
```

**Flow Description:**
1. **Task**: User request enters the flow.
2. **Planner**: Creates execution strategy, sends plan to **Worker** (resident) and **Plan Reviewer**.
3. **Worker (Resident Agent)**: Implements code/changes, then dispatches to parallel reviewers (`Reviewer 1` resident, `Reviewer 2..N` workers).
4. **Reviewers (1..N)**: Verify code quality, design system compliance, type safety, responsiveness, performance, and rule adherence.
5. **Synthesise**: Aggregates all reviewer findings.
6. **Pass? Gate**:
   - **NO**: Routes structured feedback back to **Worker** for automated fix iteration.
   - **YES**: Forwards verified results to **Plan Reviewer** AND passes response through **Turn into Haiku** step before sending final output to the user!


## 4. Known Gotchas

### Tailwind CSS v4 `@theme` Warning
- **Issue:** VS Code CSS linter flags `@theme` as "Unknown at rule"
- **Fix:** `.vscode/settings.json` with `"css.lint.unknownAtRules": "ignore"`
- **Status:** ✅ Fixed

### shadcn/ui Color Format
- **Issue:** shadcn/ui was initialized with zinc palette using HSL format (`240 10% 3.9%`)
- **Action required:** Replace all HSL-space-separated values with the new hex-based warm beige palette
- The `@theme inline` block and `@layer base` variables must be updated simultaneously

### Next.js 16 + React 19
- Uses React Server Components by default
- `"use client"` must be added to any component using hooks, state, or browser APIs
- Framer Motion components require `"use client"`

### Geist Fonts
- Currently using `--font-geist-sans` and `--font-geist-mono` from Next.js defaults
- These will be replaced with Space Grotesk, Inter, and Cormorant Garamond
- The `@theme inline` block references `--font-geist-sans` — must update to new font variables

### Build Permission Issue
- `npm run build` may encounter ACL permission errors on Windows
- Workaround: run commands from a terminal with appropriate permissions

---

## 5. Personal Data Reference

> Source of truth for all hardcoded content.

### Identity
- **Full Name:** Satyapradip Das
- **Title:** Full Stack Developer & AI Engineer
- **Tagline:** "Building scalable web applications, AI-powered products and backend systems focused on performance, security and user experience."

### Stats
- Experience: 1+ years
- Projects: 15+
- Technologies: 30+
- CGPA: 9.29

### Current
- Full Stack Intern @ The Corporate Pot (2026, Remote)
- B.Tech CSE (AI & ML) @ Brainware University (Expected 2027)

### Featured Projects
1. **Employee Management System** — Enterprise Multi-Tenant Platform (React, Node, MongoDB, JWT, RBAC)
2. **ApnaDoctor** — Healthcare AI (Gemini, OpenAI, Supabase, TypeScript)
3. **Maya Voice AI** — Python voice assistant

### Certifications
- OCI AI Foundations
- Samsung AI
- Advanced Software Engineering
- Python + DSA

### Achievements
- TOP 10% Academic Excellence
- Smart India Hackathon — Participant
- NEXATHON — Finalist

### GitHub Stats
- 350+ Commits
- 100+ Problems Solved
- 15+ Projects

### Social Links
- GitHub: (to be provided)
- LinkedIn: (to be provided)
- Email: (to be provided)
- Resume: `/resume.pdf` in public folder

---

## 6. File Map (Existing)

```
e:\portfolio\
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css          ← Design tokens (needs update)
│   │   │   ├── layout.tsx           ← Root layout (needs font update)
│   │   │   ├── page.tsx             ← Placeholder (needs rebuild)
│   │   │   └── favicon.ico
│   │   ├── components/
│   │   │   └── ui/                  ← shadcn components (6 installed)
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── input.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── dropdown-menu.tsx
│   │   │       ├── avatar.tsx
│   │   │       └── sheet.tsx
│   │   └── lib/
│   │       └── utils.ts             ← cn() helper
│   ├── public/                      ← Static assets
│   ├── components.json              ← shadcn config (New York style)
│   ├── next.config.ts               ← Empty config
│   ├── postcss.config.mjs           ← @tailwindcss/postcss
│   ├── tsconfig.json                ← Strict, @/* alias
│   └── package.json                 ← Dependencies
│
├── backend/
│   └── src/
│       ├── server.ts
│       ├── config/db.ts
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       └── routes/
│
├── .vscode/
│   └── settings.json                ← CSS linter config (unknownAtRules: ignore)
│
└── docs/                            ← This documentation
    ├── 01-PRD.md
    ├── 02-ARCHITECTURE.md
    ├── 03-DESIGN.md
    ├── 04-PHASES.md
    ├── 05-RULES.md
    └── 06-MEMORY.md
```

---

## 7. Directories to Create

These directories don't exist yet and will be created during Phase 1:

```
frontend/src/
├── constants/        ← All static data
├── types/            ← TypeScript interfaces
├── hooks/            ← Custom React hooks
├── components/
│   ├── layout/       ← Navbar, Footer
│   ├── sections/     ← All page sections
│   └── shared/       ← Reusable animated wrappers
└── public/
    └── assets/
        ├── images/   ← Profile photo, project screenshots
        └── icons/    ← Custom SVGs (if needed)
```

---

## 8. Dependencies to Add

| Package | Version | Phase | Purpose |
|---|---|---|---|
| `framer-motion` | latest | 2 | Scroll reveals, layout animations |
| `lenis` | latest | 2 | Smooth scrolling |
| `react-icons` | latest | 4 | Brand/tech logos |
| `emailjs-com` | latest | 5 | Contact form |
| `gsap` | latest | 5 | Hero text effects |
| `@vercel/analytics` | latest | 6 | Production analytics |

---

## 9. Update Log

| Date | Change | By |
|---|---|---|
| 2026-07-27 | Initial project scaffolding (frontend + backend) | User |
| 2026-07-27 | Renamed packages from portfolio-frontend/backend to frontend/backend | Agent |
| 2026-07-27 | Added shadcn/ui components (button, card, input, dialog, dropdown-menu, avatar, sheet) | User |
| 2026-07-27 | Fixed @theme CSS linter warning with .vscode/settings.json | Agent |
| 2026-07-27 | Created full documentation suite (PRD, Architecture, Design, Phases, Rules, Memory) | Agent |
