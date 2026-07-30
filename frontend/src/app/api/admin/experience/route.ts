import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { experienceData as fallbackExperiences } from "@/constants/experience";

export async function GET() {
  try {
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
      techStack: [],
      caseStudyUrl: null,
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
      techStack: [],
      caseStudyUrl: null,
    }));
    return NextResponse.json({ success: true, experiences: formatted });
  }
}

export async function POST(req: Request) {
  try {
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
    const body = await req.json();
    const { id, year, company, role, location, highlights, techStack, caseStudyUrl } = body;

    if (!id || id.startsWith("fallback-")) {
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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Experience ID missing" }, { status: 400 });
    }

    if (!id.startsWith("fallback-")) {
      await prisma.experience.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
