# Satyapradip Das — Portfolio & Admin Management Portal

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.3-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![NextAuth](https://img.shields.io/badge/NextAuth.js-4.24-purple?style=for-the-badge&logo=next.js)](https://next-auth.js.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

A modern, production-grade **Full Stack & AI Engineer Portfolio** and custom **Admin Management Portal**. Engineered with Next.js 16 (App Router), React 19, MongoDB Atlas, Prisma ORM, NextAuth, and Cloudinary.

Designed with a **Neo-Brutalist dark theme aesthetic**, ambient lighting effects, micro-interactions, and a secure real-time dashboard for dynamic content administration.

---

## 🌟 Highlights & Key Features

### 🎨 Public Portfolio Website
- **Neo-Brutalist Design System**: High contrast, crisp borders, ambient spotlight cursor, and smooth scroll animations (`framer-motion` & custom utilities).
- **12 Interactive Content Sections**:
  1. **Hero**: Display typography, title, tagline, interactive status pill, and quick CTAs.
  2. **Tech Stack Ribbon**: Infinite-scroll marquee featuring 30+ technologies.
  3. **About Me**: Bio, current pursuits, and animated metric counters.
  4. **Skills Matrix**: Categorized tech stack cards with dynamic badge rendering.
  5. **Work Experience**: Vertical timeline with impact metrics and case study links.
  6. **Featured Projects**: Highlights 3–4 core projects with live demo and GitHub repository links.
  7. **All Projects Archive**: Side-scrolling drawer for browsing the complete project repository.
  8. **Engineering Process**: 6-step flow from problem analysis to production deployment.
  9. **Academic Background**: Education history, coursework, and distinction highlights.
  10. **Certifications**: Verified credential badges (Oracle AI, Samsung AI, Software Engineering).
  11. **Achievements & Metrics**: Terminal-style activity logger (350+ Commits, 100+ Problems Solved).
  12. **Contact & Socials**: Interactive form with validation, email copy utility, and social links.

### 🔐 Secure Admin Management Portal (`/admin`)
- **Authentication**: NextAuth.js with Credentials (bcrypt hashing) & GitHub OAuth integration.
- **Route Protection**: Middleware-protected dashboard routes and serverless API endpoints.
- **Live Content Management**:
  - **Profile & Photo Manager**: Update bio, role, tagline, photo, and resume via Cloudinary.
  - **Project Manager**: Add, edit, or delete projects; toggle `featured` state; manage live/repo links.
  - **Skills Manager**: Add/remove skill items across 5 distinct tech categories.
  - **Experience & Academic Manager**: Manage work experience, degrees, and CGPA metrics in real time.
  - **Certifications Manager**: Add verified credential cards with certificate URLs.
  - **Inbox & Messages**: Receive visitor contact submissions directly in the admin panel.

### 🛡️ Resilient Architecture & Performance
- **Zero Downtime Fallback Engine**: Attempts real-time MongoDB Atlas API queries; gracefully falls back to static TypeScript constants if the database is initializing.
- **SEO & Accessibility**: Fully dynamic `sitemap.xml`, `robots.txt`, JSON-LD structured data schema, OpenGraph preview cards, and WCAG AA focus compliance.

---

## 🛠️ Technology Stack

| Domain | Technology | Description |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Server Components, Server Actions & Serverless API Routes |
| **Frontend** | React 19, TypeScript | Strict type safety and component modularity |
| **Styling** | Tailwind CSS v4, Lucide Icons | Neo-brutalist theme design system |
| **Database** | MongoDB Atlas, Prisma ORM | Multi-region cloud database & type-safe ORM |
| **Auth** | NextAuth.js (v4) | JWT session management with bcrypt credentials |
| **Media Hosting** | Cloudinary API | Cloud storage for profile photos & resume uploads |
| **Deployment** | Vercel Edge Network | Zero-downtime serverless hosting with SSL |

---

## 📁 Repository Architecture

```text
frontend/src/
├── app/
│   ├── page.tsx                    # Public landing page (12 content sections)
│   ├── layout.tsx                  # Root layout (fonts, metadata, SessionProvider)
│   ├── globals.css                 # Design system tokens & brutalist utilities
│   ├── sitemap.ts / robots.ts      # Dynamic SEO generators
│   │
│   ├── admin/                      # Secure Admin Management Portal
│   │   ├── login/page.tsx          # Login page (Credentials + GitHub)
│   │   ├── dashboard/              # Admin control center
│   │   │   ├── page.tsx            # Dashboard overview & analytics
│   │   │   ├── profile/page.tsx    # Profile & photo upload manager
│   │   │   ├── projects/page.tsx   # Project CRUD & featured toggles
│   │   │   ├── skills/page.tsx     # Skills manager
│   │   │   ├── experience/page.tsx # Work experience manager
│   │   │   └── academic/page.tsx   # Education & certifications manager
│   │   └── layout.tsx              # Dark sidebar & top navbar layout
│   │
│   └── api/                        # Next.js Serverless API Routes
│       ├── auth/[...nextauth]/     # NextAuth authentication handler
│       ├── contact/                # Contact form submission endpoint
│       └── admin/                  # Protected CRUD endpoints for admin panel
│
├── components/                     # Modular UI Components
│   ├── layout/                     # Navbar, Footer, AdminSidebar
│   ├── sections/                   # Hero, Projects, Experience, Skills, Contact, etc.
│   ├── admin/                      # Dashboard cards, modals, quick actions
│   └── shared/                     # CursorSpotlight, AnimatedCounter, RevealOnScroll
│
├── lib/                            # Core Utilities
│   ├── auth.ts                     # NextAuth options & credentials verification
│   ├── prisma.ts                   # Global Prisma Client singleton
│   └── data.ts                     # Unified data fetcher with fallback strategy
│
└── constants/                      # Fallback static datasets (Zero-downtime protection)
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v20+
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB database)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/satyapradip/satyapradip.dev.git
   cd satyapradip.dev/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file inside the `frontend/` directory:
   ```env
   # MongoDB Atlas Connection String
   DATABASE_URL="mongodb+srv://<USER>:<PASSWORD>@<CLUSTER>.mongodb.net/portfolio?retryWrites=true&w=majority"

   # NextAuth Configuration
   NEXTAUTH_SECRET="your-32-character-random-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"

   # Admin Credentials
   ADMIN_EMAIL="admin@example.com"
   ADMIN_PASSWORD="YourSecurePassword123$"

   # Cloudinary Credentials (Optional for uploads)
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   ```

4. **Initialize Database & Seed Initial Data**:
   ```bash
   # Push Prisma schema to MongoDB Atlas
   npx prisma db push

   # Execute database seed script (Creates initial admin user & default content)
   npx prisma db seed
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser. Access the admin dashboard at `http://localhost:3000/admin/login`.

---

## 🌐 Production Deployment (Vercel)

This application is ready for zero-downtime serverless deployment on **Vercel**:

1. Push your code to GitHub.
2. Import the repository on [Vercel](https://vercel.com/new).
3. Set **Root Directory** to `frontend`.
4. Add all environment variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_SITE_URL`, `CLOUDINARY_*`) in Vercel settings.
5. Click **Deploy**. Vercel will run `npm run build` and automatically execute `prisma generate` via `postinstall`.

Detailed instructions are available in [08-DEPLOYMENT.md](docs/08-DEPLOYMENT.md).

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Satyapradip Das** — *Full Stack & AI Engineer*
- **Portfolio**: [https://satyapradip.vercel.app](https://satyapradip.vercel.app)
- **GitHub**: [@satyapradip](https://github.com/satyapradip)
- **LinkedIn**: [Satyapradip Das](https://linkedin.com/in/satyapradip)
- **Email**: `satyapradip7602@gmail.com`
