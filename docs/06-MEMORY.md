# Memory — Persistent Project Context

## Satyapradip Das — Portfolio Website & Admin Management Portal

> This file serves as persistent context for any AI agent or developer working on this project.
> It captures architectural decisions, current state, completed features, gotchas, and working protocols.

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Name** | Satyapradip Das — Portfolio & Admin Management Portal |
| **Type** | Personal portfolio website + Dynamic Admin Management Portal |
| **Monorepo** | `e:\portfolio\` with `frontend/` (Next.js 16) and `backend/` (Express/MongoDB) |
| **Status** | Public portfolio & responsive layout complete (Phases 1–5); Admin Panel & NextAuth infrastructure ready for next phase |

---

## 2. Agent Working Architecture (Multi-Agent Review Pipeline)

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
1. **Task**: User request enters the execution pipeline.
2. **Planner**: Creates strategy and dispatches plan to **Worker** (resident agent) and **Plan Reviewer**.
3. **Worker (Resident Agent)**: Executes code modifications, dispatches to parallel reviewers (`Reviewer 1` resident, `Reviewer 2..N` workers).
4. **Reviewers (1..N)**: Evaluates architecture, design tokens, type safety, responsiveness, performance, and accessibility.
5. **Synthesise**: Aggregates all reviewer findings.
6. **Pass? Gate**:
   - **NO**: Routes structured feedback back to **Worker** for automated fix iteration.
   - **YES**: Forwards verified results to **Plan Reviewer** AND passes response through **Turn into Haiku** step before sending final output to the user!

---

## 3. Current State & Completed Features

### 3.1 Completed Frontend Features
- **Responsive Wide Screen Scaling**: Standardized container widths to `w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16` across all 12 section components, eliminating awkward side white gaps on 14-inch, 16-inch laptops, and 4K displays.
- **Resume Action Buttons**: Integrated prominent **`RESUME` / `VIEW RESUME`** buttons in `Navbar`, `Hero`, and `Contact` sections pointing to `/resume.pdf`.
- **Global Cursor Pointer**: Enforced `cursor: pointer !important` on all interactive buttons, links, inputs, and cards in `globals.css`.
- **Multi-Stop Ambient Cursor Spotlight**: Built `CursorSpotlight.tsx` with a multi-tone radial gradient (Amber `#f5a623`, Crimson `#bd0041`, Teal `#00696e`) visible over both light beige backgrounds and dark sections.
- **"View All Projects" Side-Scrolling Gallery**: Built `AllProjectsDrawer.tsx` allowing visitors to explore non-featured and archive projects with category filter tabs (**ALL**, **FULL-STACK**, **AI/ML**, **DEVOPS**, **PRODUCTIVITY**).
- **Quantified Work Experience Impact**: Updated `Experience.tsx` highlights with verified metrics ("Reduced backend API response latency by 35%", "Managed 5,000+ active user records").
- **Recruiter Availability Status**: Added live green pulsing availability pill in `Hero.tsx` ("AVAILABLE FOR FULL-STACK & AI ROLES").

### 3.2 Completed Backend Features & Fixes
- **TypeScript Runner Upgrade**: Replaced legacy `ts-node-dev` with `tsx watch src/server.ts` in `package.json`, fixing the Node.js v24 `TypeError: Cannot read properties of undefined (reading 'fileExists')` bug.
- **MongoDB Atlas URI Target**: Updated `.env` connection string to explicitly target `/portfolio?retryWrites=true&w=majority`.
- **Windows DNS Override**: Added `dns.setDefaultResultOrder("ipv4first")` and Google/Cloudflare DNS resolver fallback (`8.8.8.8` / `1.1.1.1`) in `config/db.ts` to resolve `querySrv ECONNREFUSED` errors on Windows local networks.

---

## 4. Key Decisions Made

| Decision | Choice | Date | Reason |
|---|---|---|---|
| Color palette | Warm beige (`#faf8ff`) & Neo-Brutalist accents | 2026-07-27 | High-impact developer aesthetic |
| Font stack | Space Grotesk + Montserrat + Work Sans | 2026-07-27 | Display headlines + body + labels |
| Data strategy | Dynamic DB API query with static constants fallback | 2026-07-29 | Instant CMS updates + resilient SSG fallback |
| Admin Panel Design | Neo-Brutalist Dashboard matching mock | 2026-07-29 | Dark sidebar, metric cards, quick actions, health meters |
| Authentication | NextAuth (Credentials + GitHub OAuth) | 2026-07-29 | Secure session management for `/admin/*` routes |
| Featured Projects Limit| Max 3–4 featured projects on landing page | 2026-07-29 | Prevents cluttered hero feed |
| All Projects View | Side-scrolling drawer / gallery modal | 2026-07-29 | Smooth access to non-featured archive projects |
| Footer Admin Link | Discreet button in Footer | 2026-07-29 | Fast login navigation for site owner |

---

## 5. Detailed Next Steps (Phases 6–9)

- **Phase 6: SEO, Performance & Production Polish**: OpenGraph metadata, `robots.txt`, `sitemap.xml`, JSON-LD Person schema.
- **Phase 7: NextAuth Authentication & Database Setup**: NextAuth handler (`/api/auth/[...nextauth]`), Credentials & GitHub OAuth providers, Prisma/MongoDB schema definitions.
- **Phase 8: Admin Dashboard UI & CRUD Managers**: `/admin/dashboard` layout matching mockup, Profile/Photo Manager, Skills Manager, Experience Manager, Projects Manager (with `featured` toggle), Academics & Certs Manager.
- **Phase 9: Dynamic Portfolio Data Sync**: Connect `lib/data.ts` to query database APIs with static `constants/` fallback.

---

## 6. Personal Data Reference

- **Full Name:** Satyapradip Das
- **Title:** Full Stack Developer & AI Engineer
- **Tagline:** "Building scalable web applications, AI-powered products and backend systems focused on performance, security and user experience."
- **Stats:** 1+ Years Experience · 15+ Projects · 30+ Technologies · 9.29 CGPA
- **Current Role:** Full Stack Intern @ The Corporate Pot (2026, Remote)
- **Education:** B.Tech CSE (AI & ML) @ Brainware University (Expected 2027)

---

## 7. File Map & Directory Structure

```
e:\portfolio\
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css          ← Design tokens, brutalist styles, focus outlines
│   │   │   ├── layout.tsx           ← Root layout (fonts, metadata, providers)
│   │   │   ├── page.tsx             ← Public page (12 sections + CursorSpotlight)
│   │   │   ├── admin/               # Admin Management Portal
│   │   │   │   ├── login/page.tsx   # Login (Credentials + GitHub OAuth)
│   │   │   │   ├── dashboard/page.tsx # Dashboard metrics & quick actions
│   │   │   │   └── layout.tsx       # Admin sidebar & header layout
│   │   │   └── api/
│   │   │       ├── auth/[...nextauth]/route.ts # NextAuth handler
│   │   │       └── admin/            # Protected CRUD API endpoints
│   │   ├── components/
│   │   │   ├── layout/ (Navbar, Footer with Admin link)
│   │   │   ├── sections/ (12 content sections + AllProjectsDrawer)
│   │   │   ├── shared/ (CursorSpotlight, AnimatedCounter, RevealOnScroll)
│   │   │   └── admin/ (Dashboard widgets: StatCard, QuickActions, SystemHealth)
│   │   ├── lib/
│   │   │   ├── auth.ts              # NextAuth configuration
│   │   │   └── data.ts              # Unified data fetcher with fallback logic
│   │   ├── constants/               # Fallback data files
│   │   └── types/                   # Shared TypeScript interfaces
│   └── package.json
│
├── backend/                         ← Express 5 + MongoDB backend API
│
└── docs/                            ← Documentation suite
    ├── 01-PRD.md
    ├── 02-ARCHITECTURE.md
    ├── 03-DESIGN.md
    ├── 04-PHASES.md
    ├── 05-RULES.md
    └── 06-MEMORY.md
```
