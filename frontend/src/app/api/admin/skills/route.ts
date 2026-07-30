import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { skillsData as fallbackCategories } from "@/constants/skills";

export async function GET() {
  try {
    const list = await prisma.skillCategory.findMany();
    if (list.length > 0) {
      return NextResponse.json({ success: true, skillCategories: list });
    }
    const formatted = fallbackCategories.map((c, idx) => ({
      id: `fallback-${idx}`,
      title: c.title,
      iconName: c.iconName || "Code",
      skills: c.skills,
    }));
    return NextResponse.json({ success: true, skillCategories: formatted });
  } catch (error) {
    const formatted = fallbackCategories.map((c, idx) => ({
      id: `fallback-${idx}`,
      title: c.title,
      iconName: c.iconName || "Code",
      skills: c.skills,
    }));
    return NextResponse.json({ success: true, skillCategories: formatted });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, iconName, skills } = body;

    const created = await prisma.skillCategory.create({
      data: {
        title,
        iconName: iconName || "Code",
        skills: Array.isArray(skills) ? skills : [],
      },
    });

    return NextResponse.json({ success: true, category: created });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, iconName, skills } = body;

    if (!id || id.startsWith("fallback-")) {
      const created = await prisma.skillCategory.create({
        data: {
          title,
          iconName: iconName || "Code",
          skills: Array.isArray(skills) ? skills : [],
        },
      });
      return NextResponse.json({ success: true, category: created });
    }

    const updated = await prisma.skillCategory.update({
      where: { id },
      data: {
        title,
        iconName: iconName || "Code",
        skills: Array.isArray(skills) ? skills : [],
      },
    });

    return NextResponse.json({ success: true, category: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Category ID missing" }, { status: 400 });
    }

    if (!id.startsWith("fallback-")) {
      await prisma.skillCategory.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
