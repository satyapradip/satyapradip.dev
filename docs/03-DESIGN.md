# Design System — Neo-Brutalist High-Contrast Developer Theme & Admin Portal

## Satyapradip Das — Portfolio & Admin Management Portal

---

## 1. Public Portfolio Design Specs

**Neo-Brutalist + High-Contrast + Developer-First + Punchy Typography**

- **Borders & Shadows:** 3px solid dark borders (`#151b29`), 6px offset hard shadows (`box-shadow: 6px 6px 0px #151b29`).
- **Color Palette:**
  - Surface Background: `#faf8ff` with radial dot matrix grid (`radial-gradient(#d4d9ed 1px, transparent 1px)` with `background-size: 24px 24px`)
  - Primary Container: `#f5a623` (Vibrant Gold)
  - Secondary Container: `#61f4fd` (Electric Cyan)
  - Tertiary CTA: `#bd0041` (Crimson)
  - Surface High: `#e2e8fc` (Light Periwinkle)
- **Typography Stack:** Montserrat (Display 700/800/900) & Work Sans (Body/Labels).

---

## 2. Admin Management Portal Design Specs (Reference Layout)

The Admin Portal (`/admin/dashboard`) follows a high-density, sharp Neo-Brutalist dashboard layout matching the reference system architecture:

```
┌─────────────────────────┬────────────────────────────────────────────────────────┐
│ Portfolio Admin         │  🔍 Search projects or logs...    🔔 AdminPanel (👤) │
│ Management Portal       ├────────────────────────────────────────────────────────┤
│                         │                                                        │
│ ┌─────────────────────┐ │  Welcome back, Satyapradip!                            │
│ │ 🎛️ Dashboard         │ │  ════════════════════════════                        │
│ └─────────────────────┘ │                                                        │
│ 📁 Projects             │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│ 💼 Experience           │ │TOTAL PROJECTS│ │SKILLS TRACKED│ │  EXP ENTRIES │      │
│ 🧠 Skills               │ │      12      │ │      24      │ │      3       │      │
│ ⚙️ Settings             │ └──────────────┘ └──────────────┘ └──────────────┘      │
│                         │                                                        │
│                         │ Recent Projects                 Quick Actions          │
│                         │ ──────────────────────────────  ─────────────────────  │
│                         │ [📋] Employee Mgmt System       [+ ADD NEW PROJECT  ]  │
│                         │      [EDIT]  [DELETE]           [📄 UPDATE RESUME   ]  │
│                         │                                 [↗ VIEW PUBLIC SITE ]  │
│ ┌─────────────────────┐ │ [📋] ApnaDoctor                                        │
│ │ 👤 S. Das (ADMIN)   │ │      [EDIT]  [DELETE]           System Health          │
│ └─────────────────────┘ │                                 Storage [██████████]   │
└─────────────────────────┴────────────────────────────────────────────────────────┘
```

### 2.1 Admin Sidebar Navigation
- **Background:** Deep Dark `#151b29`
- **Active Navigation Item:** Warm Gold `#835500` / `#f5a623` background with 3px solid border offset.
- **User Profile Pill:** Footer avatar container displaying "S. Das — SUPER ADMIN".

### 2.2 Dashboard Top Header & Search Bar
- **Search Input:** 2px brutalist-bordered search field with keyboard shortcut hints.
- **Header Greeting:** `Welcome back, Satyapradip!` rendered in heavy Montserrat 900 typography with amber accent underline.

### 2.3 Metric Summary Widgets
Four 3px-bordered stat cards with top accent indicator bars:
1. **TOTAL PROJECTS**: Gold accent bar, dynamic counter, `+2 THIS MONTH` pill.
2. **SKILLS TRACKED**: Amber accent bar, dynamic count.
3. **EXP. ENTRIES**: Crimson accent bar, senior roles badge.
4. **TOTAL COMMITS**: Dark accent bar, `SYSTEM SYNCED` badge.

### 2.4 Recent Projects Table & Action Buttons
Each project card displays:
- Icon badge (Category identifier)
- Title & updated timestamp
- Tech stack tag preview
- Action button pair: `[EDIT]` in Electric Cyan (`#61f4fd`), `[DELETE]` in Light Pink (`#ff99a5`) with 2px brutalist borders.

### 2.5 Quick Actions Sidebar & System Health Meters
- **Quick Action Buttons:**
  - `[+] ADD NEW PROJECT`: Solid Yellow (`#f5a623`) button with plus icon.
  - `[📄] UPDATE RESUME`: Solid Electric Cyan (`#61f4fd`) button with document icon.
  - `[↗] VIEW PUBLIC SITE`: Clean Off-White (`#ffffff`) button with external link icon.
- **System Health:** Server Load & Storage capacity visual progress meters.

---

## 3. All Projects Side-Scrolling Gallery Design Specs

For visitors on the main page who want to explore non-featured projects:
- **Trigger Button:** "View All Projects (X)" button in the Projects section.
- **Drawer Layout:** High-contrast right side-scrolling drawer or modal gallery.
- **Card Format:** Horizontal card carousel with full filter tabs (All, Full-Stack, AI, Mobile, DevOps).
