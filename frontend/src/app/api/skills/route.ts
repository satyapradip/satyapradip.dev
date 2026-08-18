import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { skillsData as fallbackCategories } from "@/constants/skills";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
    if (list && list.length > 0) {
      return NextResponse.json(
        { success: true, skillCategories: list },
        { headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }
    const formatted = fallbackCategories.map((c, idx) => ({
      id: `fallback-${idx}`,
      title: c.title,
      iconName: c.iconName || "Code",
      skills: c.skills,
    }));
    return NextResponse.json(
      { success: true, skillCategories: formatted },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.warn("Prisma skills fetch error, using fallback data:", error);
    const formatted = fallbackCategories.map((c, idx) => ({
      id: `fallback-${idx}`,
      title: c.title,
      iconName: c.iconName || "Code",
      skills: c.skills,
    }));
    return NextResponse.json(
      { success: true, skillCategories: formatted },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
