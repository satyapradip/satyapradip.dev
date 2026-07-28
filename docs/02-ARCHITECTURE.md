# Architecture Document

## Satyapradip Das — Portfolio Website & Admin Management Portal

---

## 1. High-Level Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                          VERCEL HOSTING / EDGE                         │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    Next.js 16 (App Router)                       │  │
│  │                                                                  │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐  │  │
│  │  │ Public Pages │  │ Admin Pages  │  │ NextAuth / API Routes  │  │  │
│  │  │ (RSC/Client) │  │  (/admin/*)  │  │     (/api/admin/*)     │  │  │
│  │  └──────┬───────┘  └──────┬───────┘  └───────────┬────────────┘  │  │
│  │         │                 │                      │               │  │
│  │  ┌──────┴─────────────────┴──────────────────────┴────────────┐  │  │
│  │  │                Data Layer & Fallback Engine                 │  │  │
│  │  │    Prisma ORM / Mongo API  <--->  constants/ Fallback Data   │  │  │
│  │  └────────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
│  External Services:                                                    │
│  ├── NextAuth (Credentials + GitHub OAuth)                             │
│  ├── MongoDB Atlas / Prisma ORM (persistent database storage)          │
│  ├── Cloudinary / Next Image (image storage & optimization)            │
│  └── Vercel Analytics                                                  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Directory Structure

```
frontend/src/
├── app/
│   ├── layout.tsx                # Root layout (fonts, metadata, SessionProvider)
│   ├── page.tsx                  # Public landing page (12 sections + CursorSpotlight)
│   ├── globals.css               # Design tokens, brutalist utilities, focus styles
│   │
│   ├── admin/                    # Admin Management Portal
│   │   ├── login/
│   │   │   └── page.tsx          # Login page (Credentials + GitHub OAuth)
│   │   ├── dashboard/
│   │   │   ├── page.tsx          # Dashboard overview & stats widgets
│   │   │   ├── profile/page.tsx  # Profile & Photo Manager
│   │   │   ├── projects/page.tsx # Projects CRUD & Featured toggle
│   │   │   ├── skills/page.tsx   # Skills Manager
│   │   │   ├── experience/page.tsx # Work Experience Manager
│   │   │   └── academic/page.tsx   # Education & Certifications Manager
│   │   └── layout.tsx            # Admin sidebar & header layout
│   │
│   └── api/                      # Next.js API Routes & NextAuth
│       ├── auth/
│       │   └── [...nextauth]/route.ts # NextAuth handler (Credentials + GitHub)
│       └── admin/
│           ├── profile/route.ts   # GET / PUT profile info & image
│           ├── projects/route.ts  # GET / POST / PUT / DELETE projects
│           ├── skills/route.ts    # GET / POST / DELETE skills
│           ├── experience/route.ts# GET / POST / PUT / DELETE experience
│           ├── academic/route.ts  # GET / POST / DELETE education
│           └── certs/route.ts     # GET / POST / DELETE certifications
│
├── components/
│   ├── ui/                       # shadcn/ui primitives
│   ├── layout/
│   │   ├── Navbar.tsx            # Navigation bar
│   │   ├── Footer.tsx            # Footer with Admin link
│   │   └── AdminSidebar.tsx      # Admin dashboard dark sidebar navigation
│   ├── admin/                    # Admin dashboard UI components
│   │   ├── StatCard.tsx          # Metric cards (Total Projects, Skills, Commits)
│   │   ├── QuickActions.tsx      # Quick action buttons (Add Project, Resume, Public Site)
│   │   ├── SystemHealth.tsx      # Server & Storage health meters
│   │   └── ProjectFormModal.tsx  # Project Add/Edit dialog modal
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx          # Featured 3-4 project cards + "View All Projects" CTA
│   │   ├── AllProjectsDrawer.tsx # Side-scrolling drawer displaying all projects
│   │   └── ... (all 12 content sections)
│   └── shared/
│       ├── CursorSpotlight.tsx   # Ambient mouse glow
│       ├── AnimatedCounter.tsx   # Number counting animation
│       └── RevealOnScroll.tsx    # Intersection observer wrapper
│
├── lib/
│   ├── auth.ts                   # NextAuth options & security helpers
│   ├── prisma.ts                 # Prisma DB client ORM connection
│   ├── data.ts                   # Unified data fetcher (API with SSG constants fallback)
│   └── utils.ts                  # cn() helper
│
├── constants/                    # Fallback static data files
│   ├── personal.ts
│   ├── projects.ts
│   ├── skills.ts
│   ├── experience.ts
│   ├── education.ts
│   ├── certifications.ts
│   └── achievements.ts
│
└── types/
    └── index.ts                  # Shared TypeScript interfaces
```

---

## 3. Database Schema (Prisma / MongoDB)

```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  password  String?  // Hashed password for Credentials login
  name      String?
  image     String?
  createdAt DateTime @default(now())
}

model Profile {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  role        String
  tagline     String
  bio         String
  photoUrl    String
  resumeUrl   String
  updatedAt   DateTime @updatedAt
}

model Project {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  title        String
  subtitle     String
  description  String
  badge        String?
  techStack    String[]
  features     String[]
  liveUrl      String?
  githubUrl    String?
  imageUrl     String?
  featured     Boolean  @default(false)
  order        Int      @default(0)
  createdAt    DateTime @default(now())
}

model SkillCategory {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  iconName  String
  skills    String[]
}

model Experience {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  year         String
  company      String
  role         String
  location     String
  highlights   String[]
  techStack    String[]
  caseStudyUrl String?
}

model Education {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  institution String
  degree      String
  cgpa        String
  period      String
  highlights  String[]
}

model Certification {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  title         String
  issuer        String
  credentialUrl String?
}
```

---

## 4. API Endpoints & Security Architecture

| Endpoint | Method | Protection | Description |
|---|---|---|---|
| `/api/auth/[...nextauth]` | ALL | Public | NextAuth Credentials & GitHub OAuth handler |
| `/api/admin/profile` | GET / PUT | Admin Session | Fetch / update profile details & image |
| `/api/admin/projects` | GET / POST / PUT / DELETE | Admin Session | CRUD operations on projects & featured toggle |
| `/api/admin/skills` | GET / POST / DELETE | Admin Session | Add or remove skill items per category |
| `/api/admin/experience` | GET / POST / PUT / DELETE | Admin Session | CRUD operations on work experience |
| `/api/admin/education` | GET / POST / DELETE | Admin Session | CRUD operations on academic background |
| `/api/admin/certs` | GET / POST / DELETE | Admin Session | CRUD operations on certifications |

---

## 5. Resilient Data Fallback Strategy

To ensure zero downtime and ultra-fast page loads:
1. Public page components invoke `getPortfolioData()`.
2. `getPortfolioData()` attempts to query the database API endpoint.
3. If the database query succeeds, dynamic records are rendered.
4. If database connection is unreachable or offline during local dev/build, it gracefully falls back to the static files in [`constants/`](file:///e:/portfolio/frontend/src/constants).
