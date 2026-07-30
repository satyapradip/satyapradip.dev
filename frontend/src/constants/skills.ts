import { SkillCategory } from "@/types";

export const skillsData: SkillCategory[] = [
  {
    title: "Backend",
    iconName: "Server",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT", "RBAC", "MVC Architecture", "Security & Helmet"],
  },
  {
    title: "Frontend",
    iconName: "Layout",
    skills: ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS v4", "Redux Toolkit", "Responsive UI"],
  },
  {
    title: "AI & ML",
    iconName: "Cpu",
    skills: ["Gemini API", "OpenAI API", "Prompt Engineering", "AI Pipelines", "LLM Integration"],
  },
  {
    title: "Database",
    iconName: "Database",
    skills: ["MongoDB", "PostgreSQL", "Supabase", "Mongoose", "Schema Design", "Indexing"],
  },
  {
    title: "Developer Tools",
    iconName: "Wrench",
    skills: ["Git & GitHub", "Docker", "Postman", "VS Code", "npm / npx", "Vercel"],
  },
];

export const skillCategories = skillsData;
