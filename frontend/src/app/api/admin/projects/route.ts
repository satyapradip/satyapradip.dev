import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectsData as fallbackProjects } from "@/constants/projects";

export async function GET() {
  try {
    const list = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    if (list.length > 0) {
      return NextResponse.json({ success: true, projects: list });
    }
    // Transform fallback constants to include string ID
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
      imageUrl: p.imageUrl || null,
      featured: p.featured,
      order: idx,
    }));
    return NextResponse.json({ success: true, projects: formattedFallback });
  } catch (error) {
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
      imageUrl: p.imageUrl || null,
      featured: p.featured,
      order: idx,
    }));
    return NextResponse.json({ success: true, projects: formattedFallback });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, subtitle, description, badge, techStack, features, liveUrl, githubUrl, imageUrl, featured, order } = body;

    const newProject = await prisma.project.create({
      data: {
        title,
        subtitle,
        description,
        badge: badge || null,
        techStack: Array.isArray(techStack) ? techStack : [],
        features: Array.isArray(features) ? features : [],
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        imageUrl: imageUrl || null,
        featured: Boolean(featured),
        order: order || 0,
      },
    });

    return NextResponse.json({ success: true, project: newProject });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, subtitle, description, badge, techStack, features, liveUrl, githubUrl, imageUrl, featured, order } = body;

    if (!id || id.startsWith("fallback-")) {
      // Create new record in DB if updating a fallback item
      const created = await prisma.project.create({
        data: {
          title,
          subtitle,
          description,
          badge: badge || null,
          techStack: Array.isArray(techStack) ? techStack : [],
          features: Array.isArray(features) ? features : [],
          liveUrl: liveUrl || null,
          githubUrl: githubUrl || null,
          imageUrl: imageUrl || null,
          featured: Boolean(featured),
          order: order || 0,
        },
      });
      return NextResponse.json({ success: true, project: created });
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title,
        subtitle,
        description,
        badge: badge || null,
        techStack: Array.isArray(techStack) ? techStack : [],
        features: Array.isArray(features) ? features : [],
        liveUrl: liveUrl || null,
        githubUrl: githubUrl || null,
        imageUrl: imageUrl || null,
        featured: Boolean(featured),
        order: order || 0,
      },
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Project ID missing" }, { status: 400 });
    }

    if (!id.startsWith("fallback-")) {
      await prisma.project.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
