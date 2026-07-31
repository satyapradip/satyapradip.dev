# Deployment & Production Operations Guide

## Satyapradip Das — Portfolio Website & Admin Management Portal

---

## 1. Overview & Production Architecture

The Satyapradip Das Portfolio Website & Admin Portal is architected for zero-downtime serverless deployment using **Vercel** and **MongoDB Atlas**.

```
[ Visitor / Admin Browser ]
            │
            ▼
┌───────────────────────────────┐
│     Vercel Edge Network       │  (HTTPS / SSL Auto-Renewal)
│ ┌───────────────────────────┐ │
│ │  Next.js 16 (App Router)  │ │
│ │  - Server Components      │ │
│ │  - API Routes / NextAuth  │ │
│ └─────────────┬─────────────┘ │
└───────────────┼───────────────┘
                │ Prisma ORM Client
                ▼
┌───────────────────────────────┐
│   MongoDB Atlas Cloud DB      │  (Multi-region, SSL Encrypted)
│   - Users & Sessions          │
│   - Projects & Profile        │
│   - Skills, Exp, Messages     │
└───────────────────────────────┘
```

---

## 2. Prerequisites Checklist

Before beginning deployment, ensure you have access to:
- [x] **Node.js v20+** installed locally
- [x] **Git** installed locally
- [x] A **GitHub** account
- [x] A **MongoDB Atlas** account (Free M0 Tier)
- [x] A **Vercel** account (Free Hobby Tier)

---

## 3. Step-by-Step Deployment Procedure

---

### Step 1: Set Up MongoDB Cloud Database (Atlas)

1. Sign in to **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**.
2. Click **Build a Database** and select the **M0 FREE** shared cluster.
3. Choose a cloud provider region close to your primary audience (e.g., `aws / ap-south-1` for India or `us-east-1`).
4. **Configure Database Credentials**:
   - Go to **Security** → **Database Access** → **Add New Database User**.
   - Select **Password** authentication.
   - Set **Username**: `satyapradip`
   - Set **Password**: `Generate a strong password and save it securely`.
   - Set User Privileges: `Read and write to any database`.
5. **Configure Network Access**:
   - Go to **Security** → **Network Access** → **Add IP Address**.
   - Select **ALLOW ACCESS FROM ANYWHERE (`0.0.0.0/0`)** so serverless Vercel edge functions can reach your database.
6. **Obtain Connection String**:
   - Go to **Database** → **Connect** → **Drivers**.
   - Copy your connection string. It formatted as:
     ```text
     mongodb+srv://satyapradip:<PASSWORD>@cluster0.XXXXX.mongodb.net/portfolio?retryWrites=true&w=majority
     ```
   - Replace `<PASSWORD>` with your database user password.

---

### Step 2: Environment Variables Reference

Your application requires 4 core environment variables in production:

| Variable Name | Required | Description / Example |
|---|---|---|
| `DATABASE_URL` | **YES** | `mongodb+srv://satyapradip:pass@cluster.mongodb.net/portfolio?retryWrites=true&w=majority` |
| `NEXTAUTH_SECRET` | **YES** | 32+ character random string for signing JWT tokens. |
| `NEXTAUTH_URL` | **YES** | Live domain URL: `https://satyapradip.vercel.app` |
| `NEXT_PUBLIC_SITE_URL` | **YES** | Public site URL for OpenGraph/SEO: `https://satyapradip.vercel.app` |

#### How to Generate a Secure `NEXTAUTH_SECRET`
Run this command in PowerShell or Git Bash:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Step 3: Seed Cloud Database (Local One-Time Setup)

Run the Prisma schema push and database seed locally to populate your cloud database with default initial data and admin user credentials.

In PowerShell inside your project folder (`e:\portfolio\frontend`):

```powershell
# Set temporary cloud connection string for PowerShell session
$env:DATABASE_URL="mongodb+srv://satyapradip:YOUR_PASSWORD@cluster0.XXXXX.mongodb.net/portfolio?retryWrites=true&w=majority"

# Push Prisma schema to MongoDB Atlas
npx prisma db push

# Execute database seeding script
npx prisma db seed
```

Upon success, you will see output:
`🌱 Seeding completed successfully. Admin account created.`

---

### Step 4: Push Code to GitHub Repository

1. Open your terminal in the root workspace folder `e:\portfolio`.
2. Initialize git and commit all changes:
   ```bash
   git init
   git add .
   git commit -m "Production release build v1.0.0"
   ```
3. Create a repository on GitHub named `satyapradip-portfolio`.
4. Link and push your branch:
   ```bash
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/satyapradip-portfolio.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 5: Deploy to Vercel

1. Log in to **[Vercel](https://vercel.com)** with your GitHub account.
2. Click **Add New...** → **Project**.
3. Select `satyapradip-portfolio` from your GitHub repository list and click **Import**.
4. Configure Build Settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: Click **Edit** and select `frontend` *(CRITICAL: Your Next.js app lives inside the `frontend` folder)*.
5. Expand **Environment Variables** and add all 4 production variables:
   - `DATABASE_URL` = `mongodb+srv://...`
   - `NEXTAUTH_SECRET` = `<YOUR_32_CHAR_SECRET>`
   - `NEXTAUTH_URL` = `https://<YOUR_APP_NAME>.vercel.app`
   - `NEXT_PUBLIC_SITE_URL` = `https://<YOUR_APP_NAME>.vercel.app`
6. Click **Deploy**.

Vercel will run `npm run build` and automatically execute `prisma generate` via the `postinstall` script in `package.json`. Deployment will complete in under 2 minutes.

---

## 4. Post-Deployment Verification Checklist

Verify your production deployment by testing the following URLs:

- [ ] **Public Homepage**: `https://<YOUR_APP_NAME>.vercel.app` (Loads smoothly with custom fonts and animations)
- [ ] **Dynamic API Profile Route**: `https://<YOUR_APP_NAME>.vercel.app/api/profile` (Returns `{ success: true, profile: ... }`)
- [ ] **Robots Directive**: `https://<YOUR_APP_NAME>.vercel.app/robots.txt` (Shows allowed/disallowed rules)
- [ ] **Sitemap XML**: `https://<YOUR_APP_NAME>.vercel.app/sitemap.xml` (Valid XML map)
- [ ] **Admin Login Portal**: `https://<YOUR_APP_NAME>.vercel.app/admin/login`
- [ ] **Admin Dashboard Protection**: Navigating directly to `/admin/dashboard` redirects unauthenticated users to `/admin/login`.

---

## 5. Custom Domain Configuration (Optional / Future)

When you purchase a custom domain (e.g., `satyapradip.dev` or `satyapradip.com`):

1. Log in to **Vercel** → Select Project → **Settings** → **Domains**.
2. Type your domain `satyapradip.dev` and click **Add**.
3. Log in to your Domain Registrar (e.g., Namecheap, GoDaddy) and add the DNS records specified by Vercel:
   - **Type `A`**: `@` → `76.76.21.21`
   - **Type `CNAME`**: `www` → `cname.vercel-dns.com`
4. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` in Vercel Environment Variables to `https://satyapradip.dev`.

---

## 6. Troubleshooting & FAQs

### Q1: Vercel build fails with `PrismaClientInitializationError`
- **Cause**: Missing `DATABASE_URL` in Vercel environment variables or incorrect password.
- **Fix**: Verify `DATABASE_URL` in Vercel settings and confirm network access `0.0.0.0/0` is enabled in MongoDB Atlas.

### Q2: Admin login returns `401 Unauthorized` or session expires immediately
- **Cause**: `NEXTAUTH_SECRET` is missing or `NEXTAUTH_URL` does not match your current domain.
- **Fix**: Set `NEXTAUTH_URL` to exact protocol and domain (e.g. `https://satyapradip.vercel.app`).

### Q3: Uploaded profile photos disappear after Vercel redeployment
- **Cause**: Serverless hosts (like Vercel) have read-only filesystems in production.
- **Fix**: For cloud image persistence in production, upload photos via external storage (e.g. Cloudinary, AWS S3) or enter external HTTPS image URLs in the Profile Manager dashboard.
