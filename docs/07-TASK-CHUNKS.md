# Granular Task Chunks (Micro-Task Tracker)

## Satyapradip Das — Portfolio Website

---

## 🎨 FRONTEND TRACK (Public Portfolio)

### Phase 1: Foundation & Setup

- [x] **Chunk 1.1 — Design Tokens & Base CSS (`src/app/globals.css`)**
  - Update `@theme inline` with warm beige palette (`#F8F4EE`, `#151515`, `#C88A3D`, `#E6DDD2`).
  - Configure root CSS variables for background, card, primary, accent, and borders.

- [x] **Chunk 1.2 — Google Fonts Integration (`src/lib/fonts.ts` & `src/app/layout.tsx`)**
  - Load `Space_Grotesk` (Hero), `Inter` (Body), `Cormorant_Garamond` (Headings) via `next/font/google`.
  - Wire font CSS variables into root `<html>` element.

- [x] **Chunk 1.3 — TypeScript Interfaces (`src/types/index.ts`)**
  - Define interfaces: `Project`, `SkillCategory`, `Experience`, `Education`, `Certification`, `Achievement`, `PersonalDetails`.

- [x] **Chunk 1.4 — Static Data Constants (`src/constants/`)**
  - [x] `personal.ts` (Name, title, tagline, stats, social links)
  - [x] `projects.ts` (Employee Management System, ApnaDoctor, Maya Voice AI)
  - [x] `skills.ts` (Backend, Frontend, AI, Database, DevTools)
  - [x] `experience.ts` (The Corporate Pot internship details)
  - [x] `education.ts` (Brainware University B.Tech CSE details)
  - [x] `certifications.ts` (OCI AI, Samsung AI, etc.)
  - [x] `achievements.ts` (Top 10%, SIH, Nexathon)
  - [x] `techStack.ts` (Pills for continuous ribbon)
  - [x] `process.ts` (6-step engineering workflow)

- [x] **Chunk 1.5 — Shared Motion Primitives (`src/components/shared/`)**
  - [x] `SectionHeading.tsx` (Cormorant Garamond heading + accent underline)
  - [x] `RevealOnScroll.tsx` (Framer Motion / IntersectionObserver viewport entrance wrapper)
  - [x] `CardTilt.tsx` (Subtle 3D hover perspective wrapper)

---

### Phase 2: Navigation, Hero & Footer

- [x] **Chunk 2.1 — Navigation Bar (`src/components/layout/Navbar.tsx`)**
  - Sticky glassmorphic navbar with backdrop blur.
  - Desktop anchor links + mobile hamburger drawer (`shadcn Sheet`).
  - Scroll progress bar along top edge.

- [x] **Chunk 2.2 — Hero Section (`src/components/sections/Hero.tsx`)**
  - Left column: Name, title badge, tagline, CTAs (View Projects, Resume, Contact).
  - Right column: Profile photo frame with subtle accent border.

- [x] **Chunk 2.3 — Animated Stat Counter (`src/components/shared/AnimatedCounter.tsx`)**
  - Counter animation for 1+ Years, 15+ Projects, 30+ Techs, 9.29 CGPA.
  - Embed counter row inside `Hero.tsx`.

- [x] **Chunk 2.4 — Footer (`src/components/layout/Footer.tsx`)**
  - Tech badges: Next.js, TypeScript, Framer Motion, Tailwind, Vercel.
  - Copyright line and social icon links.

- [x] **Chunk 2.5 — Page Assembly (`src/app/page.tsx`)**
  - Assemble Navbar, Hero, and Footer into main app layout.

---

### Phase 3: Core Content Sections (Part 1)

- [ ] **Chunk 3.1 — Tech Stack Ribbon (`src/components/sections/TechStack.tsx`)**
- [ ] **Chunk 3.2 — About Me Section (`src/components/sections/About.tsx`)**
- [ ] **Chunk 3.3 — Skills Section (`src/components/sections/Skills.tsx`)**
- [ ] **Chunk 3.4 — Work Experience (`src/components/sections/Experience.tsx`)**

---

### Phase 4: Core Content Sections (Part 2)

- [ ] **Chunk 4.1 — Featured Projects (`src/components/sections/Projects.tsx`)**
- [ ] **Chunk 4.2 — Engineering Process (`src/components/sections/Process.tsx`)**
- [ ] **Chunk 4.3 — Education Section (`src/components/sections/Education.tsx`)**
- [ ] **Chunk 4.4 — Certifications (`src/components/sections/Certifications.tsx`)**
- [ ] **Chunk 4.5 — Achievements (`src/components/sections/Achievements.tsx`)**
- [ ] **Chunk 4.6 — GitHub Stats (`src/components/sections/GitHubStats.tsx`)**

---

### Phase 5: Contact, Interactivity & Polish

- [ ] **Chunk 5.1 — Contact Section (`src/components/sections/Contact.tsx`)**
- [ ] **Chunk 5.2 — Magnetic Button Effect (`src/components/shared/MagneticButton.tsx`)**
- [ ] **Chunk 5.3 — Cursor Glow Effect (`src/components/shared/CursorSpotlight.tsx`)**

---

### Phase 6: SEO, Audit & Deployment

- [ ] **Chunk 6.1 — Metadata & OpenGraph (`src/app/layout.tsx`)**
- [ ] **Chunk 6.2 — Verification & Build Audit**
