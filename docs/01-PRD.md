# Product Requirements Document (PRD)

## Satyapradip Das — Full Stack & AI Engineer Portfolio

---

## 1. Product Vision

Build a **premium, developer-first portfolio website** that positions Satyapradip Das as a production-ready Full Stack & AI Engineer — not a typical college student with a project list.

The site should feel like a **professional product page** (think Linear, Vercel, Stripe, Raycast) with a warm beige aesthetic instead of dark mode. Every section must reinforce credibility: real internship experience, strong academics, certifications, and production-quality projects.

**One-line pitch:** _A recruiter should understand Satyapradip's strengths in under 60 seconds._

---

## 2. Target Audience

| Audience | What they care about |
|---|---|
| **Tech Recruiters** | Quick scan: role, skills, experience, projects |
| **Hiring Managers** | Depth: architecture decisions, code quality, engineering process |
| **Startup Founders** | Versatility: can this person ship end-to-end? |
| **Peers / Community** | Credibility: open source, certifications, achievements |

---

## 3. Core Sections & Requirements

### 3.1 Navigation
- Sticky top navbar with smooth scroll anchors
- Logo/name on left, section links on right
- Mobile: hamburger → sheet/drawer (shadcn `Sheet`)
- Scroll progress indicator bar
- Active section highlighting on scroll

### 3.2 Hero
- **Name:** "SATYAPRADIP DAS" — large, bold, Space Grotesk
- **Title:** "FULL STACK & AI ENGINEER"
- **Tagline:** "Building scalable web applications, AI-powered products and backend systems focused on performance, security and user experience."
- **CTAs:** `View Projects` (primary), `Resume` (outline), `Contact` (ghost)
- **Stats Row:** 1+ Years Experience · 15+ Projects · 30+ Technologies · 9.29 CGPA
- **Right side:** Professional photo with subtle border/frame
- **Animations:** Fade-up staggered text, counter animation for stats

### 3.3 Tech Stack Ribbon
- Continuously scrolling horizontal ribbon (marquee)
- Grouped by category with subtle dividers
- Categories: Frontend · Backend · AI/ML · Database · DevOps
- Smooth infinite loop, pause on hover
- Subtle glassmorphism pill styling

### 3.4 About Me
- **Headline:** "WHO I AM"
- Short, punchy paragraph (not boring bio)
- **Currently:** Checklist-style items with checkmarks
  - ✓ Full Stack Intern @ The Corporate Pot
  - ✓ B.Tech CSE (AI & ML)
  - ✓ Building AI products
  - ✓ Learning System Design

### 3.5 Skills
- **Large cards** (not tiny icons)
- Categories: Backend · Frontend · AI · Database · Developer Tools
- Each card lists technologies in that category
- Hover animation: subtle tilt + border glow (accent color)
- Card layout: 2-3 columns desktop, 1 column mobile

### 3.6 Experience
- **Vertical timeline** layout
- Each entry: year, company, role, location, and a list of work highlights
- Checkmark-style bullet points
- "Read Case Study →" link on each entry
- Currently only 1 entry (The Corporate Pot, 2026)

### 3.7 Featured Projects (Main Attraction)
- **3 large project cards**, each taking significant screen space
- Each card includes:
  - Project name and one-line description
  - Screenshot/mockup (large, prominent)
  - Tech badges
  - Action buttons: Live · GitHub · Case Study
  - Feature highlights below (pills or tags)
- Projects:
  1. **Employee Management System** — Enterprise Multi-Tenant Platform
  2. **ApnaDoctor** — Healthcare AI (Gemini/OpenAI + Supabase)
  3. **Maya Voice AI** — Python voice assistant (dark themed card)

### 3.8 Engineering Process
- **Numbered vertical flow** (01 → 06)
- Steps: Problem Analysis → Architecture Design → Backend Development → Frontend Development → Testing → Deployment
- Clean, minimal styling — looks like an engineer's workflow
- Connecting lines/arrows between steps

### 3.9 Education
- Large card with university name, degree, CGPA prominently displayed
- Brainware University · B.Tech AI & ML · CGPA 9.29 · Expected 2027

### 3.10 Certifications
- Horizontal scrollable cards or grid
- OCI AI Foundations · Samsung AI · Advanced Software Engineering · Python + DSA
- Each card: cert name, issuer, optional badge/icon

### 3.11 Achievements
- Visual stat cards (not plain text)
- TOP 10% Academic Excellence
- Smart India Hackathon Participant
- NEXATHON Finalist

### 3.12 GitHub Stats
- Animated counters: 350+ Commits · 100+ Problems Solved · 15+ Projects · 100% Passion
- Optional: GitHub contribution graph embed

### 3.13 Contact
- Headline: "Let's Build Something Amazing"
- Links: Email · LinkedIn · GitHub · Resume
- Contact form (EmailJS or Resend integration)
- Minimal, clean layout

### 3.14 Footer
- "Built with" tech badges: Next.js · TypeScript · Framer Motion · Tailwind · Vercel
- Copyright line
- Social links

---

## 4. Non-Functional Requirements

| Requirement | Target |
|---|---|
| **Lighthouse Performance** | > 90 |
| **First Contentful Paint** | < 1.5s |
| **Accessibility** | WCAG AA compliant |
| **SEO** | Proper meta, OG tags, structured data |
| **Responsive** | Desktop (12-col) → Tablet (2-col) → Mobile (1-col) |
| **Browser Support** | Chrome, Firefox, Safari, Edge (latest 2 versions) |

---

## 5. Success Criteria

1. Recruiter can identify role, skills, and experience within 60 seconds
2. All projects have live demos and GitHub links
3. Site loads under 2 seconds on 4G
4. Mobile experience is fully usable with large touch targets
5. Animations are smooth (60fps) and not excessive
6. Contact form successfully sends emails
