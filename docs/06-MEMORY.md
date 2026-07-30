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
| **Status** | Public portfolio, responsive layout, Admin Portal, NextAuth authentication, Local File Uploads, Visitor Messages Inbox, and Dynamic DB storage complete |

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
- **Responsive Wide Screen Scaling**: Standardized container widths to `w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16` across all section components.
- **Resume Action Buttons**: Integrated prominent **`RESUME` / `VIEW RESUME`** buttons in `Navbar`, `Hero`, and `Contact` sections dynamically linking to your uploaded resume file.
- **Global Cursor Pointer**: Enforced `cursor: pointer !important` on all interactive buttons, links, inputs, and cards in `globals.css`.
- **Multi-Stop Ambient Cursor Spotlight**: Built `CursorSpotlight.tsx` with a multi-tone radial gradient (Amber `#f5a623`, Crimson `#bd0041`, Teal `#00696e`).
- **"View All Projects" Side-Scrolling Gallery**: Built `AllProjectsDrawer.tsx` allowing visitors to explore non-featured projects with category filter tabs (**ALL**, **FULL-STACK**, **AI/ML**, **DEVOPS**, **PRODUCTIVITY**).
- **Dynamic Public Profile Integration**: Connected `Hero.tsx`, `Navbar.tsx`, and `About.tsx` to public `/api/profile` to render uploaded profile photos, dynamic bio, tagline, and resume PDF link.

### 3.2 Completed Admin, Uploads & Visitor Inbox (Phases 7, 8, 9)
- **Prisma ORM & MongoDB Schemas**: Created `prisma/schema.prisma` with models for `User`, `Profile`, `Project`, `SkillCategory`, `Experience`, `Education`, `Certification`, and `Message`.
- **NextAuth Security & Bcrypt Authentication**: Configured `src/lib/auth.ts` with zero hardcoded plain-text passwords in source code, supporting case-insensitive bcrypt hashed user authentication.
- **Local File Upload Engine**: Built `/api/admin/upload` allowing direct local system uploads for Profile Photo and Resume PDF files into `public/uploads/`.
- **Visitor Messages Inbox System**: Built `/api/contact` (public submission API) and `/admin/dashboard/messages` inbox manager with unread badges, email reply shortcuts, and delete actions.
- **Admin Management Modules**: Built full CRUD management pages for Profile, Projects, Skills, Work Experience, and Academics & Certs.

---

## 4. Key Decisions Made

| Decision | Choice | Date | Reason |
|---|---|---|---|
| Color palette | Warm beige (`#faf8ff`) & Neo-Brutalist accents | 2026-07-27 | High-impact developer aesthetic |
| Font stack | Space Grotesk + Montserrat + Work Sans | 2026-07-27 | Display headlines + body + labels |
| Data strategy | Dynamic DB API query with static constants fallback | 2026-07-29 | Instant CMS updates + resilient SSG fallback |
| File Uploads | Local system storage in `public/uploads/` | 2026-07-30 | Direct local photo and resume file management |
| Visitor Inbox | Database + local backup JSON file storage | 2026-07-30 | Zero message loss even if database is offline |
| Authentication | NextAuth (Credentials + GitHub OAuth) with bcrypt | 2026-07-30 | Secure session management with zero plain-text passwords |

---

## 5. Contact & Owner Reference

- **Full Name:** Satyapradip Das
- **Title:** Full Stack Developer & AI Engineer
- **Email:** satyapradip7602@gmail.com
- **Phone:** +91 7602629919
- **Tagline:** "Building scalable web applications, AI-powered products and backend systems focused on performance, security and user experience."
- **Stats:** 1+ Years Experience · 15+ Projects · 30+ Technologies · 9.59 CGPA
- **Current Role:** Full Stack Intern @ The Corporate Pot (2026, Remote)
- **Education:** B.Tech CSE (AI & ML) @ Brainware University (Expected 2027)

---

## 6. File Map & Directory Structure

```
e:\portfolio\
├── frontend/
│   ├── public/
│   │   └── uploads/                  # Local system uploaded photos & PDFs
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css           ← Design tokens, brutalist styles, focus outlines
│   │   │   ├── layout.tsx            ← Root layout (fonts, metadata, providers)
│   │   │   ├── page.tsx              ← Public landing page
│   │   │   ├── admin/                # Admin Management Portal
│   │   │   │   ├── login/page.tsx    # Secure admin login
│   │   │   │   ├── dashboard/page.tsx# Dashboard metrics & shortcuts
│   │   │   │   ├── dashboard/messages/# Visitor Messages Inbox
│   │   │   │   ├── dashboard/profile/ # Profile & File Upload Manager
│   │   │   │   └── layout.tsx        # Admin sidebar & header layout
│   │   │   └── api/
│   │   │       ├── auth/[...nextauth]/route.ts # NextAuth handler
│   │   │       ├── profile/route.ts  # Public profile data API
│   │   │       ├── contact/route.ts  # Public visitor contact API
│   │   │       └── admin/            # Protected CRUD & file upload endpoints
│   │   ├── components/
│   │   │   ├── layout/ (Navbar, Footer with Admin link)
│   │   │   ├── sections/ (12 content sections + AllProjectsDrawer)
│   │   │   ├── shared/ (CursorSpotlight, AnimatedCounter, RevealOnScroll)
│   │   │   └── admin/ (Dashboard widgets: StatCard, QuickActions, SystemHealth)
│   │   ├── lib/
│   │   │   ├── auth.ts               # NextAuth configuration
│   │   │   └── prisma.ts             # Prisma client helper
│   │   ├── constants/                # Fallback data files
│   │   └── types/                    # Shared TypeScript interfaces
│   └── package.json
│
└── docs/                             ← Documentation suite
    ├── 01-PRD.md
    ├── 02-ARCHITECTURE.md
    ├── 03-DESIGN.md
    ├── 04-PHASES.md
    ├── 05-RULES.md
    └── 06-MEMORY.md
```
