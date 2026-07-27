import { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "employee-management-system",
    title: "Employee Management System",
    subtitle: "Enterprise Multi-Tenant Platform",
    description:
      "A comprehensive multi-tenant employee management platform with secure JWT authentication, role-based access control (RBAC), and automated workflow dashboards.",
    badge: "Enterprise",
    techStack: ["React", "Node.js", "MongoDB", "Express", "JWT", "RBAC"],
    features: [
      "Multi-Tenant Isolation",
      "Secure Auth (JWT + Cookies)",
      "REST APIs with Rate Limiting",
      "Dashboard Analytics",
      "MVC Architecture",
      "Scalable Backend Design",
    ],
    liveUrl: "https://employee-mgmt-demo.vercel.app",
    githubUrl: "https://github.com/satyapradip/employee-management-system",
    caseStudyUrl: "#case-study-employee-mgmt",
    variant: "featured",
  },
  {
    id: "apnadoctor-ai",
    title: "ApnaDoctor AI",
    subtitle: "Healthcare Intelligence Platform",
    description:
      "AI-driven healthcare assistant leveraging Gemini API and OpenAI to provide triage insights, symptom analysis, and instant patient query support.",
    badge: "Healthcare AI",
    techStack: ["Next.js", "TypeScript", "Gemini API", "OpenAI", "Supabase"],
    features: [
      "AI Symptom Triage",
      "Medical Document Summarization",
      "Real-time Patient Support",
      "Encrypted Data Storage",
    ],
    liveUrl: "https://apnadoctor.vercel.app",
    githubUrl: "https://github.com/satyapradip/apnadoctor",
    caseStudyUrl: "#case-study-apnadoctor",
    variant: "default",
  },
  {
    id: "maya-voice-ai",
    title: "Maya Voice AI",
    subtitle: "Intelligent Voice Assistant",
    description:
      "Python-powered autonomous voice assistant capable of real-time speech synthesis, natural language understanding, and dynamic system task automation.",
    badge: "Voice & NLP",
    techStack: ["Python", "OpenAI Whisper", "PyTorch", "NLP", "AsyncIO"],
    features: [
      "Speech-to-Text Processing",
      "Low Latency Audio Stream",
      "Custom Workflow Automation",
      "Dark Theme Native Audio Visualizer",
    ],
    liveUrl: "https://maya-ai.vercel.app",
    githubUrl: "https://github.com/satyapradip/maya-voice-ai",
    caseStudyUrl: "#case-study-maya",
    variant: "dark",
  },
];
