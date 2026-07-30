import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { personalData } from "../src/constants/personal";
import { projectsData } from "../src/constants/projects";
import { skillsData } from "../src/constants/skills";
import { experienceData } from "../src/constants/experience";
import { educationData } from "../src/constants/education";
import { certificationsData } from "../src/constants/certifications";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Database Seeding...");

  // 1. Seed Admin User Account
  const adminEmail = process.env.ADMIN_EMAIL || "admin@satyapradip.dev";
  const rawPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      name: personalData.name,
      password: hashedPassword,
    },
  });
  console.log(`✅ Admin user seeded: ${adminUser.email}`);

  // 2. Seed Profile Information
  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) {
    await prisma.profile.create({
      data: {
        name: personalData.name,
        role: personalData.role,
        tagline: personalData.tagline,
        bio: personalData.bio,
        photoUrl: "/photo.png",
        resumeUrl: personalData.contact.resumeUrl,
      },
    });
    console.log("✅ Profile seeded.");
  }

  // 3. Seed Projects
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    for (let i = 0; i < projectsData.length; i++) {
      const proj = projectsData[i];
      await prisma.project.create({
        data: {
          title: proj.title,
          subtitle: proj.subtitle,
          description: proj.description,
          badge: proj.badge,
          techStack: proj.techStack,
          features: proj.features,
          liveUrl: proj.liveUrl,
          githubUrl: proj.githubUrl,
          imageUrl: proj.image,
          featured: proj.variant === "featured" || i < 3,
          order: i,
        },
      });
    }
    console.log(`✅ Seeded ${projectsData.length} projects.`);
  }

  // 4. Seed Skill Categories
  const skillCount = await prisma.skillCategory.count();
  if (skillCount === 0) {
    for (const cat of skillsData) {
      await prisma.skillCategory.create({
        data: {
          title: cat.title,
          iconName: cat.iconName,
          skills: cat.skills,
        },
      });
    }
    console.log(`✅ Seeded ${skillsData.length} skill categories.`);
  }

  // 5. Seed Experience
  const expCount = await prisma.experience.count();
  if (expCount === 0) {
    for (const exp of experienceData) {
      await prisma.experience.create({
        data: {
          year: exp.year,
          company: exp.company,
          role: exp.role,
          location: exp.location,
          highlights: exp.highlights,
          techStack: exp.techStack,
          caseStudyUrl: exp.caseStudyUrl,
        },
      });
    }
    console.log(`✅ Seeded ${experienceData.length} experience entries.`);
  }

  // 6. Seed Education
  const eduCount = await prisma.education.count();
  if (eduCount === 0) {
    await prisma.education.create({
      data: {
        institution: educationData.institution,
        degree: educationData.degree,
        cgpa: educationData.cgpa,
        period: educationData.period,
        highlights: educationData.highlights || [],
      },
    });
    console.log("✅ Seeded education entry.");
  }

  // 7. Seed Certifications
  const certCount = await prisma.certification.count();
  if (certCount === 0) {
    for (const cert of certificationsData) {
      await prisma.certification.create({
        data: {
          title: cert.title,
          issuer: cert.issuer,
          credentialUrl: cert.credentialUrl,
        },
      });
    }
    console.log(`✅ Seeded ${certificationsData.length} certifications.`);
  }

  console.log("🎉 Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
