import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectsData } from "@/constants/projects";
import { skillsData } from "@/constants/skills";
import { experienceData } from "@/constants/experience";
import { educationData } from "@/constants/education";
import { certificationsData } from "@/constants/certifications";

export async function GET() {
  try {
    const [projectCount, skillCount, expCount, eduCount, certCount] = await Promise.all([
      prisma.project.count().catch(() => 0),
      prisma.skillCategory.count().catch(() => 0),
      prisma.experience.count().catch(() => 0),
      prisma.education.count().catch(() => 0),
      prisma.certification.count().catch(() => 0),
    ]);

    const totalProjects = projectCount > 0 ? projectCount : projectsData.length;
    const totalSkills = skillCount > 0 ? skillCount : skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);
    const totalExperience = expCount > 0 ? expCount : experienceData.length;
    const totalAcademic = (eduCount > 0 ? eduCount : 1) + (certCount > 0 ? certCount : certificationsData.length);

    return NextResponse.json({
      success: true,
      stats: {
        totalProjects,
        totalSkills,
        totalExperience,
        totalAcademic,
        systemStatus: "Operational",
        dbConnected: true,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        stats: {
          totalProjects: projectsData.length,
          totalSkills: skillsData.reduce((acc, cat) => acc + cat.skills.length, 0),
          totalExperience: experienceData.length,
          totalAcademic: 1 + certificationsData.length,
          systemStatus: "Fallback Mode",
          dbConnected: false,
        },
      },
      { status: 500 }
    );
  }
}
