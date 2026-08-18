import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { personalData } from "@/constants/personal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst().catch(() => null);
    if (profile) {
      return NextResponse.json(
        {
          success: true,
          profile: {
            ...profile,
            email: personalData.contact.email,
            phone: personalData.contact.phone,
          },
        },
        { headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }
    return NextResponse.json(
      {
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
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    return NextResponse.json(
      {
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
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
