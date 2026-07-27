export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export const processStepsData: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Problem Analysis",
    description: "Understanding user requirements, identifying constraints, technical scope, and system goals.",
  },
  {
    stepNumber: "02",
    title: "Architecture Design",
    description: "Designing database schema, REST API contracts, security protocols, and state management models.",
  },
  {
    stepNumber: "03",
    title: "Backend Development",
    description: "Building robust, scalable server routes with authentication, rate limiting, and MVC structure.",
  },
  {
    stepNumber: "04",
    title: "Frontend Development",
    description: "Crafting pixel-perfect, accessible, responsive user interfaces with seamless state integration.",
  },
  {
    stepNumber: "05",
    title: "Testing & QA",
    description: "Unit testing, API validation, cross-browser responsiveness, and edge-case verification.",
  },
  {
    stepNumber: "06",
    title: "Deployment & CI/CD",
    description: "Setting up production builds, environment configurations, edge caching, and automated deployment.",
  },
];
