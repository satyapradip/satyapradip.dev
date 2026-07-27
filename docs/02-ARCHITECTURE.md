# Architecture

## Satyapradip Das — Portfolio Website

---

## 1. High-Level Architecture

```
┌──────────────────────────────────────────────────────┐
│                     VERCEL (CDN)                     │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │              Next.js 16 (App Router)           │  │
│  │                                                │  │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────────┐  │  │
│  │  │  Pages   │  │Components│  │   Hooks      │  │  │
│  │  │  (RSC)   │  │  (Client)│  │   (Client)   │  │  │
│  │  └────┬─────┘  └────┬─────┘  └──────┬──────┘  │  │
│  │       │              │               │         │  │
│  │  ┌────┴──────────────┴───────────────┴──────┐  │  │
│  │  │            Shared Libraries              │  │  │
│  │  │  constants/ · lib/ · types/              │  │  │
│  │  └─────────────────────────────────────────-┘  │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  External Services:                                  │
│  ├── EmailJS / Resend (contact form)                 │
│  ├── Vercel Analytics                                │
│  └── Cloudinary (images, optional)                   │
│                                                      │
│  Backend (future admin panel):                       │
│  ├── Express + MongoDB (existing /backend)           │
│  └── REST API for dynamic content management         │
└──────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture

### 2.1 Framework: Next.js 16 (App Router)

- **React Server Components (RSC)** for static content (hero, about, education)
- **Client Components** only where interactivity is needed (animations, forms, scroll tracking)
- **Static Site Generation (SSG)** — the portfolio is entirely static at build time
- No API routes needed for the public site (contact form uses client-side EmailJS)

### 2.2 Directory Structure

```
frontend/src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, providers)
│   ├── page.tsx                # Home page (composes all sections)
│   ├── globals.css             # Design tokens + Tailwind v4 theme
│   └── favicon.ico
│
├── components/
│   ├── ui/                     # shadcn/ui primitives (Button, Card, etc.)
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav with scroll progress
│   │   └── Footer.tsx          # Built-with badges, copyright
│   ├── sections/
│   │   ├── Hero.tsx            # Hero with photo, stats, CTAs
│   │   ├── TechStack.tsx       # Infinite scrolling ribbon
│   │   ├── About.tsx           # Who I am + currently doing
│   │   ├── Skills.tsx          # Large skill category cards
│   │   ├── Experience.tsx      # Vertical timeline
│   │   ├── Projects.tsx        # 3 featured project cards
│   │   ├── Process.tsx         # Engineering process flow
│   │   ├── Education.tsx       # University + CGPA card
│   │   ├── Certifications.tsx  # Cert cards grid
│   │   ├── Achievements.tsx    # Stat highlight cards
│   │   ├── GitHubStats.tsx     # Animated counters
│   │   └── Contact.tsx         # Form + social links
│   └── shared/
│       ├── SectionHeading.tsx  # Reusable section title (Cormorant Garamond)
│       ├── AnimatedCounter.tsx # Number counting animation
│       ├── RevealOnScroll.tsx  # Fade-up intersection observer wrapper
│       ├── MagneticButton.tsx  # Magnetic hover effect button
│       └── CardTilt.tsx        # 3D tilt effect wrapper
│
├── hooks/
│   ├── useScrollProgress.ts   # Track page scroll percentage
│   ├── useInView.ts           # Intersection observer hook
│   ├── useMediaQuery.ts       # Responsive breakpoint hook
│   └── useMagneticEffect.ts   # Mouse-follow magnetic effect
│
├── lib/
│   ├── utils.ts               # cn() helper (already exists)
│   ├── fonts.ts               # Google Font loaders
│   └── email.ts               # EmailJS / Resend client
│
├── constants/
│   ├── personal.ts            # Name, title, bio, social links
│   ├── projects.ts            # Project data (title, desc, tech, links)
│   ├── skills.ts              # Skill categories and items
│   ├── experience.ts          # Work experience entries
│   ├── education.ts           # Education details
│   ├── certifications.ts      # Certification entries
│   ├── achievements.ts        # Achievement data
│   └── techStack.ts           # Tech stack items for ribbon
│
├── types/
│   └── index.ts               # TypeScript interfaces
│
└── public/
    ├── assets/
    │   ├── images/             # Project screenshots, profile photo
    │   └── icons/              # Custom SVG icons if needed
    ├── resume.pdf              # Downloadable resume
    └── og-image.png            # Open Graph social preview
```

### 2.3 Rendering Strategy

| Section | Rendering | Reason |
|---|---|---|
| Navbar | Client | Scroll tracking, mobile menu state |
| Hero | Server + Client | Static text (RSC), animated counters (Client) |
| TechStack | Client | Infinite scroll animation |
| About | Server | Fully static content |
| Skills | Client | Hover/tilt animations |
| Experience | Client | Scroll-reveal animations |
| Projects | Client | Hover effects, image interactions |
| Process | Client | Scroll-reveal animations |
| Education | Server | Fully static |
| Certifications | Server | Fully static |
| Achievements | Client | Animated counters |
| GitHub Stats | Client | Animated counters |
| Contact | Client | Form state + submission |
| Footer | Server | Fully static |

### 2.4 Animation Architecture

```
Animation Layer
├── Framer Motion (primary)
│   ├── Page transitions
│   ├── Scroll-triggered reveals (fade-up, slide-left)
│   ├── Staggered children
│   ├── Layout animations
│   └── AnimatePresence for mount/unmount
│
├── GSAP (hero only)
│   ├── Hero text split animation
│   ├── Magnetic button effect
│   └── Cursor spotlight
│
└── CSS (micro-interactions)
    ├── Hover states
    ├── Gradient borders
    ├── Card tilt (transform perspective)
    └── Smooth scrolling (Lenis)
```

---

## 3. Backend Architecture (Existing — Future Admin Panel)

The existing backend at `/backend` uses:

- **Express 5** + **TypeScript**
- **MongoDB** via Mongoose 9
- **JWT** authentication + **bcrypt**
- **Helmet** + **CORS** + **Rate Limiting** for security
- **Cloudinary** for image uploads
- **Zod** for validation

This backend is reserved for a **future admin panel** to manage portfolio content dynamically. The public-facing portfolio will be statically generated.

---

## 4. Data Flow

```
┌─────────────┐
│  constants/  │  Static data (TypeScript objects)
└──────┬──────┘
       │ import
       ▼
┌─────────────┐
│  Sections    │  Server Components read constants directly
│  (RSC)       │  Client Components receive via props
└──────┬──────┘
       │ render
       ▼
┌─────────────┐
│  HTML (SSG)  │  Pre-rendered at build time
└──────┬──────┘
       │ deploy
       ▼
┌─────────────┐
│   Vercel     │  CDN-served static files
│   Edge       │
└─────────────┘
```

---

## 5. Key Technical Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **Rendering** | SSG (Static) | Portfolio content is static; fastest possible load |
| **Styling** | Tailwind CSS v4 + CSS variables | Already configured; v4's `@theme` for design tokens |
| **Components** | shadcn/ui (New York) | Already installed; consistent, accessible primitives |
| **Animation** | Framer Motion + GSAP | FM for general animations; GSAP for hero-level effects |
| **Scrolling** | Lenis | Smooth, buttery scrolling experience |
| **Fonts** | next/font (Google) | Zero-CLS font loading |
| **Contact** | EmailJS (client-side) | No server needed; simple integration |
| **Deployment** | Vercel | Zero-config Next.js deployment |
| **Data** | TypeScript constants | Type-safe, no API latency, zero runtime cost |

---

## 6. Performance Strategy

1. **next/font** — self-hosted Google Fonts with zero layout shift
2. **next/image** — automatic WebP/AVIF, lazy loading, responsive srcsets
3. **React Server Components** — zero JS bundle for static sections
4. **Dynamic imports** — `lazy()` for heavy animation libraries (GSAP)
5. **Intersection Observer** — animations only trigger when in viewport
6. **CSS containment** — `contain: layout` on section wrappers
7. **Vercel Edge** — global CDN with automatic caching
