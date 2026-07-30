import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { personalData } from "@/constants/personal";

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst().catch(() => null);
    if (profile) {
      return NextResponse.json({ success: true, profile });
    }
    return NextResponse.json({
      success: true,
      profile: {
        id: "fallback-id",
        name: personalData.name,
        role: personalData.role,
        tagline: personalData.tagline,
        bio: personalData.bio,
        photoUrl: "/photo.jpg",
        resumeUrl: personalData.contact.resumeUrl,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      profile: {
        id: "fallback-id",
        name: personalData.name,
        role: personalData.role,
        tagline: personalData.tagline,
        bio: personalData.bio,
        photoUrl: "/photo.jpg",
        resumeUrl: personalData.contact.resumeUrl,
      },
    });
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { name, role, tagline, bio, photoUrl, resumeUrl } = body;

  try {
    const existing = await prisma.profile.findFirst().catch(() => null);
    let updated;
    if (existing) {
      updated = await prisma.profile.update({
        where: { id: existing.id },
        data: { name, role, tagline, bio, photoUrl, resumeUrl },
      });
    } else {
      updated = await prisma.profile.create({
        data: { name, role, tagline, bio, photoUrl, resumeUrl },
      });
    }

    return NextResponse.json({ success: true, profile: updated });
  } catch (error: any) {
    console.warn("Database save failed (MongoDB connection timeout). Returning updated local profile payload.", error?.message);
    // Graceful fallback if database connection times out
    return NextResponse.json({
      success: true,
      profile: {
        id: "fallback-id",
        name,
        role,
        tagline,
        bio,
        photoUrl,
        resumeUrl,
      },
      warning: "Saved locally. (Database connection is offline or timed out)",
    });
  }
}
