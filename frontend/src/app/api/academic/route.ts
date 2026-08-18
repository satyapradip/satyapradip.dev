import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { educationData as fallbackEducation } from "@/constants/education";
import { certificationsData as fallbackCerts } from "@/constants/certifications";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function ensureAcademicSeeded() {
  const [eduCount, certCount] = await Promise.all([
    prisma.education.count().catch(() => 0),
    prisma.certification.count().catch(() => 0),
  ]);

  if (eduCount === 0) {
    await prisma.education.create({
      data: {
        institution: fallbackEducation.institution,
        degree: fallbackEducation.degree,
        cgpa: fallbackEducation.cgpa,
        period: fallbackEducation.period,
        highlights: fallbackEducation.highlights || [],
      },
    }).catch((e) => console.warn("Failed to seed education:", e));
  }

  if (certCount === 0) {
    for (const cert of fallbackCerts) {
      await prisma.certification.create({
        data: {
          title: cert.title,
          issuer: cert.issuer,
          credentialUrl: cert.credentialUrl || null,
        },
      }).catch((e) => console.warn("Failed to seed certification:", e));
    }
  }
}

export async function GET() {
  try {
    await ensureAcademicSeeded();
    const [eduList, certList] = await Promise.all([
      prisma.education.findMany().catch(() => []),
      prisma.certification.findMany().catch(() => []),
    ]);

    const education =
      eduList && eduList.length > 0
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
      certList && certList.length > 0
        ? certList
        : fallbackCerts.map((c, idx) => ({
            id: `fallback-cert-${idx}`,
            title: c.title,
            issuer: c.issuer,
            credentialUrl: null,
          }));

    return NextResponse.json(
      { success: true, education, certifications: certs },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.warn("Prisma academic fetch error, using fallback data:", error);
    return NextResponse.json(
      {
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
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
