import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { experienceData as fallbackExperiences } from "@/constants/experience";

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
    if (list.length > 0) {
      return NextResponse.json({ success: true, experiences: list });
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
    return NextResponse.json({ success: true, experiences: formatted });
  } catch (error) {
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
    return NextResponse.json({ success: true, experiences: formatted });
  }
}

export async function POST(req: Request) {
  try {
    await ensureExperienceSeeded();
    const body = await req.json();
    const { year, company, role, location, highlights, techStack, caseStudyUrl } = body;

    const created = await prisma.experience.create({
      data: {
        year,
        company,
        role,
        location,
        highlights: Array.isArray(highlights) ? highlights : [],
        techStack: Array.isArray(techStack) ? techStack : [],
        caseStudyUrl: caseStudyUrl || null,
      },
    });

    return NextResponse.json({ success: true, experience: created });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await ensureExperienceSeeded();
    const body = await req.json();
    const { id, year, company, role, location, highlights, techStack, caseStudyUrl } = body;

    if (!id || id.startsWith("fallback-")) {
      const existing = await prisma.experience.findFirst({ where: { company, role } });
      if (existing) {
        const updated = await prisma.experience.update({
          where: { id: existing.id },
          data: {
            year,
            company,
            role,
            location,
            highlights: Array.isArray(highlights) ? highlights : [],
            techStack: Array.isArray(techStack) ? techStack : [],
            caseStudyUrl: caseStudyUrl || null,
          },
        });
        return NextResponse.json({ success: true, experience: updated });
      }

      const created = await prisma.experience.create({
        data: {
          year,
          company,
          role,
          location,
          highlights: Array.isArray(highlights) ? highlights : [],
          techStack: Array.isArray(techStack) ? techStack : [],
          caseStudyUrl: caseStudyUrl || null,
        },
      });
      return NextResponse.json({ success: true, experience: created });
    }

    const updated = await prisma.experience.update({
      where: { id },
      data: {
        year,
        company,
        role,
        location,
        highlights: Array.isArray(highlights) ? highlights : [],
        techStack: Array.isArray(techStack) ? techStack : [],
        caseStudyUrl: caseStudyUrl || null,
      },
    });

    return NextResponse.json({ success: true, experience: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await ensureExperienceSeeded();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Experience ID missing" }, { status: 400 });
    }

    if (!id.startsWith("fallback-")) {
      await prisma.experience.delete({ where: { id } });
    } else {
      const idx = parseInt(id.replace("fallback-", ""), 10);
      const fallbackItem = fallbackExperiences[idx];
      if (fallbackItem) {
        const found = await prisma.experience.findFirst({ where: { company: fallbackItem.company, role: fallbackItem.role } });
        if (found) {
          await prisma.experience.delete({ where: { id: found.id } });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
