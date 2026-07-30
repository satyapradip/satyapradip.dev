import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { personalData } from "@/constants/personal";

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst().catch(() => null);
    if (profile) {
      return NextResponse.json({
        success: true,
        profile: {
          ...profile,
          email: personalData.contact.email,
          phone: personalData.contact.phone,
        },
      });
    }
    return NextResponse.json({
      success: true,
      profile: {
        name: personalData.name,
        role: personalData.role,
        tagline: personalData.tagline,
        bio: personalData.bio,
        email: personalData.contact.email,
        phone: personalData.contact.phone,
        photoUrl: "/photo.jpg",
        resumeUrl: personalData.contact.resumeUrl,
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      profile: {
        name: personalData.name,
        role: personalData.role,
        tagline: personalData.tagline,
        bio: personalData.bio,
        email: personalData.contact.email,
        phone: personalData.contact.phone,
        photoUrl: "/photo.jpg",
        resumeUrl: personalData.contact.resumeUrl,
      },
    });
  }
}
