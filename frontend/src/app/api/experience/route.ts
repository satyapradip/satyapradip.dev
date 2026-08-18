import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { experienceData as fallbackExperiences } from "@/constants/experience";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function ensureExperienceSeeded() {
  const count = await prisma.experience.count().catch(() => 0);
  if (count === 0) {
    for (const exp of fallbackExperiences) {
      await prisma.experience.create({
        data: {
          year: exp.year,
          company: exp.company,
          role: exp.role,
          location: exp.location,
          highlights: exp.highlights || [],
          techStack: exp.techStack || [],
          caseStudyUrl: exp.caseStudyUrl || null,
        },
      }).catch((e) => console.warn("Failed to seed experience:", e));
    }
  }
}

export async function GET() {
  try {
    await ensureExperienceSeeded();
    const list = await prisma.experience.findMany();
    if (list && list.length > 0) {
      return NextResponse.json(
        { success: true, experiences: list },
        { headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }
    const formatted = fallbackExperiences.map((e, idx) => ({
      id: `fallback-${idx}`,
      year: e.year,
      company: e.company,
      role: e.role,
      location: e.location,
      highlights: e.highlights || [],
      techStack: e.techStack || [],
      caseStudyUrl: e.caseStudyUrl || null,
    }));
    return NextResponse.json(
      { success: true, experiences: formatted },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.warn("Prisma experience fetch error, using fallback data:", error);
    const formatted = fallbackExperiences.map((e, idx) => ({
      id: `fallback-${idx}`,
      year: e.year,
      company: e.company,
      role: e.role,
      location: e.location,
      highlights: e.highlights || [],
      techStack: e.techStack || [],
      caseStudyUrl: e.caseStudyUrl || null,
    }));
    return NextResponse.json(
      { success: true, experiences: formatted },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
