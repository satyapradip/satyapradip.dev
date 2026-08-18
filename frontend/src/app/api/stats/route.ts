import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectsData } from "@/constants/projects";
import { skillsData } from "@/constants/skills";
import { experienceData } from "@/constants/experience";
import { educationData } from "@/constants/education";
import { certificationsData } from "@/constants/certifications";
import { personalData } from "@/constants/personal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const [projectCount, skillCats, expCount, eduList, certCount] = await Promise.all([
      prisma.project.count().catch(() => 0),
      prisma.skillCategory.findMany().catch(() => []),
      prisma.experience.count().catch(() => 0),
      prisma.education.findMany().catch(() => []),
      prisma.certification.count().catch(() => 0),
    ]);

    const totalProjects = projectCount > 0 ? projectCount : projectsData.length;
    
    let totalSkills = 0;
    if (skillCats && skillCats.length > 0) {
      totalSkills = skillCats.reduce((acc, cat) => acc + (cat.skills ? cat.skills.length : 0), 0);
    } else {
      totalSkills = skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);
    }

    const totalExperience = expCount > 0 ? expCount : experienceData.length;
    const cgpa = (eduList && eduList.length > 0 && eduList[0].cgpa) ? eduList[0].cgpa : personalData.stats.cgpa;

    return NextResponse.json(
      {
        success: true,
        stats: {
          experienceYears: personalData.stats.experienceYears,
          projectsCompleted: totalProjects,
          technologiesCount: totalSkills,
          cgpa: cgpa,
          totalAcademic: (eduList?.length || 1) + (certCount > 0 ? certCount : certificationsData.length),
        },
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: true,
        stats: {
          experienceYears: personalData.stats.experienceYears,
          projectsCompleted: projectsData.length,
          technologiesCount: skillsData.reduce((acc, cat) => acc + cat.skills.length, 0),
          cgpa: personalData.stats.cgpa,
          totalAcademic: 1 + certificationsData.length,
        },
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  }
}
