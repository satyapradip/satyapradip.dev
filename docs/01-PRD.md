# Product Requirements Document (PRD)

## Satyapradip Das — Full Stack & AI Engineer Portfolio + Admin Management Portal

---

## 1. Product Vision

Build a **premium, developer-first portfolio website & dynamic admin management portal** that positions Satyapradip Das as a production-ready Full Stack & AI Engineer — not a typical college student with a project list.

The public site follows a **Neo-Brutalist warm beige aesthetic** with crisp typography, interactive metrics, and buttery scroll animations. The administrative backend features a **dedicated Neo-Brutalist Admin Dashboard** enabling real-time content management across skills, experience, projects, certifications, academic entries, and profile photo/bio.

**One-line pitch:** _A recruiter understands Satyapradip's technical depth in 60 seconds, while Satyapradip can manage all portfolio content dynamically from a secure, custom-built Admin Portal._

---

## 2. Target Audience

| Audience | What they care about |
|---|---|
| **Tech Recruiters** | Quick scan: role, skills, experience, projects |
| **Hiring Managers** | Depth: architecture decisions, code quality, engineering process |
| **Startup Founders** | Versatility: can this person ship end-to-end? |
| **Portfolio Owner (Satyapradip)** | Full control: ability to instantly update projects, resume, skills, and bio via an admin panel |

---

## 3. Core Sections & Requirements

### 3.1 Navigation & Footer
- Sticky top navbar with smooth scroll anchors
- Logo/name on left, section links on right
- Mobile: hamburger → sheet/drawer (shadcn `Sheet`)
- **Footer Admin Access:** Small, discreet "Admin" button in the footer pointing to `/admin/login`.

### 3.2 Hero
- **Name:** "SATYAPRADIP DAS" — large, bold display typography
- **Title:** "FULL STACK & AI ENGINEER"
- **Tagline:** "Building scalable web applications, AI-powered products and backend systems focused on performance, security and user experience."
- **CTAs:** `View Projects` (primary), `Academic Record` (outline), `Contact` (ghost)
- **Stats Row:** 1+ Years Experience · 15+ Projects · 30+ Technologies · 9.29 CGPA
- **Right side:** Professional photo container with badge highlights

### 3.3 Tech Stack Ribbon
- Continuously scrolling horizontal ribbon (marquee)
- Grouped by category: Frontend · Backend · AI/ML · Database · DevOps

### 3.4 About Me
- **Headline:** "WHO I AM"
- Paragraph bio + current pursuits checklist
- Key stats grid with animated counters

### 3.5 Skills Section (Dynamically Managed)
- Large Neo-Brutalist category cards (Backend, Frontend, AI, Database, Developer Tools)
- Ability to add, edit, or remove skills per category via Admin Panel

### 3.6 Experience Section (Dynamically Managed)
- Vertical timeline layout with checkmark bullets
- Company name, role, period, location, highlights, tech badges, and "Read Case Study →" links
- Ability to add, edit, or remove work experience entries via Admin Panel

### 3.7 Featured Projects & "View All Projects" Side-Scrolling Gallery
- **Featured Projects on Main Page:** Displays 3 to 4 featured project cards.
- Each card includes: Title, description, tech stack badges, live link, GitHub link, project image, and feature badge.
- **"View All Projects" Action:** A prominent button on the main page opening a side-scrolling drawer / interactive gallery displaying all non-featured and archive projects.
- **Admin Management:** Ability to add, edit, remove projects, upload project images, and toggle `featured` state (restricted to max 4 featured projects).

### 3.8 Engineering Process
- Numbered vertical flow (01 → 06) from Problem Analysis to Deployment

### 3.9 Education & Academic Section (Dynamically Managed)
- University name, degree, CGPA, period, and academic distinction highlights
- Ability to add, edit, or remove academic entries via Admin Panel

### 3.10 Certifications (Dynamically Managed)
- Verified credential cards (OCI AI Foundations, Samsung AI, Advanced Software Engineering, Python + DSA)
- Ability to add, edit, or remove certifications via Admin Panel

### 3.11 Achievements & GitHub Activity
- Honors & awards cards + terminal window code activity metrics (350+ Commits, 100+ Problems Solved)

### 3.12 Contact & Social Form
- Interactive contact form with simulated loading state, validation, email copy-to-clipboard button, and accessibility focus outlines

---

## 4. Admin Management Portal Requirements (`/admin`)

### 4.1 Authentication & Security (`NextAuth`)
- **Login Methods:** 
  1. Credentials Login (Email & Password with hashed security)
  2. GitHub OAuth Login via NextAuth (`next-auth`)
- **Route Protection:** All `/admin/*` routes and `/api/admin/*` endpoints strictly protected via NextAuth session middleware.

### 4.2 Admin Dashboard Layout & Features
- **Design Aesthetic:** Neo-Brutalist dark sidebar + dot grid dashboard matching reference layout (`Portfolio Admin Management Portal`).
- **Top Bar:** Search input, notification bell, "Welcome back, Satyapradip!" header.
- **Metric Cards:** Total Projects, Skills Tracked, Experience Entries, Total Commits.
- **Quick Action Bar:** 
  - `[+] ADD NEW PROJECT`
  - `[📄] UPDATE RESUME`
  - `[↗] VIEW PUBLIC SITE`
- **Management Modules:**
  1. **Profile & Image Manager:** Upload/update profile picture, tagline, and bio.
  2. **Skills Manager:** Add/remove skill pills across categories.
  3. **Experience Manager:** Add/edit/delete work experience records.
  4. **Project Manager:** Add/edit/delete projects, manage live/GitHub URLs, upload screenshots, and toggle `featured` status.
  5. **Academic & Certifications Manager:** Add/remove degrees, schooling, CGPA highlights, and verified certificates.

---

## 5. Non-Functional Requirements

| Requirement | Target |
|---|---|
| **Lighthouse Performance** | > 90 |
| **First Contentful Paint** | < 1.5s |
| **Security** | NextAuth JWT sessions, protected API routes, input sanitization |
| **Accessibility** | WCAG AA compliant with keyboard focus outlines & aria-labels |
| **Data Resilience** | Dynamic DB API queries with fallback to TypeScript static constants if API is unavailable |
| **Responsive** | Desktop (12-col) → Tablet (2-col) → Mobile (1-col) |

---

## 6. Success Criteria

1. Admin can log in via Email/Password or GitHub OAuth.
2. Admin can dynamically add, edit, and remove projects, skills, experience, certifications, and profile images.
3. Main portfolio page dynamically displays 3–4 featured projects, while "View All Projects" enables smooth side-scrolling access to all remaining projects.
4. Discreet Admin footer link enables instant login navigation.
5. All public pages maintain 60fps animations and sub-2s load performance.
