import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectsData as fallbackProjects } from "@/constants/projects";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function ensureProjectsSeeded() {
  const count = await prisma.project.count().catch(() => 0);
  if (count === 0) {
    for (let i = 0; i < fallbackProjects.length; i++) {
      const p = fallbackProjects[i];
      await prisma.project.create({
        data: {
          title: p.title,
          subtitle: p.subtitle,
          description: p.description,
          badge: p.badge || null,
          techStack: p.techStack || [],
          features: p.features || [],
          liveUrl: p.liveUrl || null,
          githubUrl: p.githubUrl || null,
          imageUrl: p.imageUrl || p.image || null,
          featured: p.featured ?? (p.variant === "featured" || i < 3),
          order: p.order ?? i,
        },
      }).catch((e) => console.warn("Failed to seed project:", e));
    }
  }
}

export async function GET() {
  try {
    await ensureProjectsSeeded();
    const list = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    if (list && list.length > 0) {
      return NextResponse.json(
        { success: true, projects: list },
        { headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }
    const formattedFallback = fallbackProjects.map((p, idx) => ({
      id: `fallback-${p.id}`,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      badge: p.badge || null,
      techStack: p.techStack,
      features: p.features,
      liveUrl: p.liveUrl || null,
      githubUrl: p.githubUrl || null,
      imageUrl: p.imageUrl || p.image || null,
      featured: p.featured ?? (p.variant === "featured" || idx < 3),
      order: p.order ?? idx,
    }));
    return NextResponse.json(
      { success: true, projects: formattedFallback },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.warn("Prisma projects fetch error, using fallback data:", error);
    const formattedFallback = fallbackProjects.map((p, idx) => ({
      id: `fallback-${p.id}`,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      badge: p.badge || null,
      techStack: p.techStack,
      features: p.features,
      liveUrl: p.liveUrl || null,
      githubUrl: p.githubUrl || null,
      imageUrl: p.imageUrl || p.image || null,
      featured: p.featured ?? (p.variant === "featured" || idx < 3),
      order: p.order ?? idx,
    }));
    return NextResponse.json(
      { success: true, projects: formattedFallback },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
