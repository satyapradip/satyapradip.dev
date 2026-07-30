import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { educationData as fallbackEducation } from "@/constants/education";
import { certificationsData as fallbackCerts } from "@/constants/certifications";

export async function GET() {
  try {
    const [eduList, certList] = await Promise.all([
      prisma.education.findMany().catch(() => []),
      prisma.certification.findMany().catch(() => []),
    ]);

    const education =
      eduList.length > 0
        ? eduList
        : [
            {
              id: "fallback-edu-0",
              institution: fallbackEducation.institution,
              degree: fallbackEducation.degree,
              cgpa: fallbackEducation.cgpa,
              period: fallbackEducation.period,
              highlights: fallbackEducation.highlights || [],
            },
          ];

    const certs =
      certList.length > 0
        ? certList
        : fallbackCerts.map((c, idx) => ({
            id: `fallback-cert-${idx}`,
            title: c.title,
            issuer: c.issuer,
            credentialUrl: null,
          }));

    return NextResponse.json({ success: true, education, certifications: certs });
  } catch (error) {
    return NextResponse.json({
      success: true,
      education: [
        {
          id: "fallback-edu-0",
          institution: fallbackEducation.institution,
          degree: fallbackEducation.degree,
          cgpa: fallbackEducation.cgpa,
          period: fallbackEducation.period,
          highlights: fallbackEducation.highlights || [],
        },
      ],
      certifications: fallbackCerts.map((c, idx) => ({
        id: `fallback-cert-${idx}`,
        title: c.title,
        issuer: c.issuer,
        credentialUrl: null,
      })),
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, ...itemData } = body;

    if (type === "education") {
      const created = await prisma.education.create({
        data: {
          institution: itemData.institution,
          degree: itemData.degree,
          cgpa: itemData.cgpa || "",
          period: itemData.period || "",
          highlights: Array.isArray(itemData.highlights) ? itemData.highlights : [],
        },
      });
      return NextResponse.json({ success: true, education: created });
    } else if (type === "certification") {
      const created = await prisma.certification.create({
        data: {
          title: itemData.title,
          issuer: itemData.issuer,
          credentialUrl: itemData.credentialUrl || null,
        },
      });
      return NextResponse.json({ success: true, certification: created });
    }

    return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID missing" }, { status: 400 });
    }

    if (!id.startsWith("fallback-")) {
      if (type === "education") {
        await prisma.education.delete({ where: { id } });
      } else if (type === "certification") {
        await prisma.certification.delete({ where: { id } });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
