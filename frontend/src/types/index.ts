export interface PersonalDetails {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  currently: string[];
  stats: {
    experienceYears: string;
    projectsCompleted: string;
    technologiesCount: string;
    cgpa: string;
  };
  contact: {
    email: string;
    github: string;
    linkedin: string;
    location: string;
    resumeUrl: string;
  };
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  image?: string;
  variant?: "default" | "featured" | "dark";
}

export interface SkillItem {
  name: string;
  level?: "Expert" | "Proficient" | "Familiar";
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  year: string;
  company: string;
  role: string;
  location: string;
  highlights: string[];
  techStack: string[];
  caseStudyUrl?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  cgpa: string;
  period: string;
  highlights?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

export interface AchievementItem {
  title: string;
  label: string;
  badgeText: string;
  description?: string;
}

export interface GitHubStats {
  commits: string;
  problemsSolved: string;
  projectsBuilt: string;
  passion: string;
}

export interface TechPill {
  name: string;
  category: "Frontend" | "Backend" | "AI" | "Database" | "DevOps";
}
