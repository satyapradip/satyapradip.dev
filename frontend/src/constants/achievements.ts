import { AchievementItem, GitHubStats } from "@/types";

export const achievementsData: AchievementItem[] = [
  {
    title: "TOP 10%",
    label: "Academic Excellence",
    badgeText: "High Distinction",
    description: "Maintained a top rank with CGPA 9.29 across all semesters.",
  },
  {
    title: "SIH",
    label: "Smart India Hackathon",
    badgeText: "Participant",
    description: "Engineered innovative tech solution under competitive 36-hour hackathon conditions.",
  },
  {
    title: "NEXATHON",
    label: "State-Level Hackathon",
    badgeText: "Finalist",
    description: "Shortlisted among top engineering teams for AI-driven application prototype.",
  },
];

export const githubStatsData: GitHubStats = {
  commits: "350+",
  problemsSolved: "100+",
  projectsBuilt: "15+",
  passion: "100%",
};
