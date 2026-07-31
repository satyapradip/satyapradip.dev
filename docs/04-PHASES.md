# Implementation Phases

## Satyapradip Das — Portfolio Website & Admin Management Portal

---

## Overview

The project is organized into **9 phases**, producing deployable increments. Phases 1–5 (Foundation, Layout, Content Sections, Contact & UI Polish) are fully completed along with responsive scaling and the side-scrolling project drawer. Phases 7–9 focus on the Admin Management Portal, NextAuth authentication, dynamic DB storage, local file uploads, and the visitor Messages Inbox.

---

## Phase 1: Foundation & Design System — [x] COMPLETED
- [x] Update `globals.css` with warm beige color palette & neo-brutalist utilities
- [x] Configure `@theme inline` with design tokens
- [x] Set up Google Fonts in `layout.tsx` (Space Grotesk, Montserrat, Work Sans)
- [x] Create `constants/` directory with static fallback data files
- [x] Create `types/index.ts` — shared TypeScript interfaces
- [x] Create `lib/fonts.ts` — font loader exports
- [x] Create `SectionHeading` & `RevealOnScroll` shared components

---

## Phase 2: Layout & Hero — [x] COMPLETED
- [x] Build `Navbar` — sticky nav with section anchors, Resume button & mobile drawer
- [x] Build `Hero` — 2-column layout with photo container, availability status pill, Resume CTA & stats row
- [x] Build `Footer` — tech badges, copyright, social links & discreet Admin Portal link
- [x] Wire up smooth scrolling & entrance animations

---

## Phase 3: Content Sections (Part 1) — [x] COMPLETED
- [x] Build `TechStack` ribbon marquee
- [x] Build `About` — "WHO I AM" section with current focus checklist & animated counters
- [x] Build `Skills` — category cards with hover tilt effects
- [x] Build `Experience` — vertical timeline with quantified impact metrics (35% latency reduction, 5k+ records)

---

## Phase 4: Content Sections (Part 2) — [x] COMPLETED
- [x] Build `Projects` — featured project cards with technical architecture badges
- [x] Build `Process` — numbered vertical flow (01→06)
- [x] Build `Education` — university & 9.29 CGPA highlight card
- [x] Build `Certifications` — verified credential cards
- [x] Build `Achievements` — honors & hackathon stat cards
- [x] Build `GitHubStats` — terminal window code activity counters

---

## Phase 5: Contact, Interactivity & Polish — [x] COMPLETED
- [x] Build `Contact` — form with live API submission, database/backup file storage, and email copy button
- [x] Add ambient multi-stop `CursorSpotlight` mouse tracking glow
- [x] Add keyboard `:focus-visible` accessibility focus outlines in `globals.css`
- [x] Add `aria-label` and `htmlFor` accessibility attributes across all interactive elements
- [x] Standardize responsive container width (`w-full max-w-[1440px]`) & padding across all 12 sections
- [x] Enforce global `cursor: pointer !important` across all buttons, links, and cards
- [x] Resolve backend `ts-node-dev` compatibility error by upgrading to `tsx watch` with Windows DNS override

---

## Phase 6: SEO, Performance & Deployment — [x] COMPLETED
- [x] Add comprehensive metadata in `layout.tsx` (OG tags, Twitter Card)
- [x] Add `robots.txt` and `sitemap.xml`
- [x] Add structured data (JSON-LD Person schema)
- [x] Optimize images with `next/image`
- [x] Deploy to Vercel (Production Vercel configuration ready)

---

## Phase 7: Admin Authentication & Database Infrastructure — [x] COMPLETED
- [x] Add `next-auth`, `@prisma/client`, `prisma`, `bcryptjs` dependencies in `package.json`
- [x] Configure `NextAuth` handler supporting Credentials & GitHub OAuth in `app/api/auth/[...nextauth]/route.ts` & `lib/auth.ts`
- [x] Set up database models in `prisma/schema.prisma` (User, Profile, Project, SkillCategory, Experience, Education, Certification, Message)
- [x] Create `lib/prisma.ts` singleton client helper & `prisma/seed.ts` database seeding script
- [x] Build `/admin/login` page matching Neo-Brutalist theme with error handling & loading states
- [x] Create `middleware.ts` protective API route & admin dashboard session guard
- [x] Wrap root layout in `SessionProvider` client `Providers` component
- [x] Sanitize authentication handler to eliminate hardcoded plain-text credentials from source code

---

## Phase 8: Admin Dashboard UI & Content Management Modules — [x] COMPLETED
- [x] Build Admin Layout in `app/admin/dashboard/layout.tsx` (Dark sidebar, search header, user profile pill)
- [x] Build Admin Dashboard in `app/admin/dashboard/page.tsx`:
  - Metric summary cards (Total Projects, Skills, Exp Entries, Academic)
  - Quick Actions bar (Visitor Messages Inbox, Add Project, Update Resume, View Public Site)
  - System Health progress meters
- [x] Build **Profile Manager** (`app/admin/dashboard/profile/page.tsx`): Update profile photo URL, bio, tagline, and attach local system files
- [x] Build **Local System File Upload API** (`app/api/admin/upload/route.ts`): Direct photo and resume PDF file uploads
- [x] Build **Visitor Messages Inbox** (`app/admin/dashboard/messages/page.tsx`): View, mark read, reply, and delete visitor contact form submissions
- [x] Build **Skills Manager** (`app/admin/dashboard/skills/page.tsx`): Add/remove skills per category
- [x] Build **Experience Manager** (`app/admin/dashboard/experience/page.tsx`): Add/edit/delete work experience records
- [x] Build **Project Manager** (`app/admin/dashboard/projects/page.tsx`): Add/edit/delete projects, tech badges, links, images, and `featured` toggle
- [x] Build **Academic & Certs Manager** (`app/admin/dashboard/academic/page.tsx`): Add/remove education & certification entries

---

## Phase 9: Dynamic Portfolio Integration & "View All Projects" Gallery — [x] COMPLETED
- [x] Build `AllProjectsDrawer.tsx` side-scrolling gallery displaying all non-featured projects
- [x] Add "View All Projects" trigger button to main `Projects` section
- [x] Add category filter pills (ALL, FULL-STACK, AI/ML, DEVOPS, PRODUCTIVITY)
- [x] Build `/api/profile` public data endpoint (DB query with `personalData` fallback)
- [x] Connect public site sections (`Hero`, `Navbar`, `About`, `Contact`) to dynamic profile database API

---

## Timeline & Effort

| Phase | Scope | Status |
|---|---|---|
| Phase 1–5 | Foundation, Layout, Content, Polish & Side-Scroll Gallery | Completed |
| Phase 6 | SEO & Production Readiness | Completed |
| Phase 7 | Admin Auth & DB Setup | Completed |
| Phase 8 | Admin Dashboard, File Uploads & Messages Inbox | Completed |
| Phase 9 | Dynamic Portfolio Integration | Completed |
