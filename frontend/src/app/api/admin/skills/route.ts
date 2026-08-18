import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { skillsData as fallbackCategories } from "@/constants/skills";

async function ensureSkillsSeeded() {
  const count = await prisma.skillCategory.count().catch(() => 0);
  if (count === 0) {
    for (const cat of fallbackCategories) {
      await prisma.skillCategory.create({
        data: {
          title: cat.title,
          iconName: cat.iconName || "Code",
          skills: cat.skills || [],
        },
      }).catch((e) => console.warn("Failed to seed skill category:", e));
    }
  }
}

export async function GET() {
  try {
    await ensureSkillsSeeded();
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
    await ensureSkillsSeeded();
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
    await ensureSkillsSeeded();
    const body = await req.json();
    const { id, title, iconName, skills } = body;

    if (!id || id.startsWith("fallback-")) {
      // Find by title or create
      const existing = await prisma.skillCategory.findFirst({ where: { title } });
      if (existing) {
        const updated = await prisma.skillCategory.update({
          where: { id: existing.id },
          data: {
            title,
            iconName: iconName || "Code",
            skills: Array.isArray(skills) ? skills : [],
          },
        });
        return NextResponse.json({ success: true, category: updated });
      }

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
    await ensureSkillsSeeded();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Category ID missing" }, { status: 400 });
    }

    if (!id.startsWith("fallback-")) {
      await prisma.skillCategory.delete({ where: { id } });
    } else {
      const idx = parseInt(id.replace("fallback-", ""), 10);
      const fallbackCat = fallbackCategories[idx];
      if (fallbackCat) {
        const found = await prisma.skillCategory.findFirst({ where: { title: fallbackCat.title } });
        if (found) {
          await prisma.skillCategory.delete({ where: { id: found.id } });
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
