import React from "react";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Satyapradip Das",
    alternateName: ["Satyapradip"],
    jobTitle: "Full-Stack Developer & AI-ML Engineer",
    description:
      "Full-Stack Developer and AI-ML Engineer specializing in React, Next.js, Node.js, Python, MERN stack, and Machine Learning integrations.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://satyapradip.dev",
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://satyapradip.dev"}/uploads/profile-photo.jpg`,
    sameAs: [
      "https://github.com/satyapradip",
      "https://linkedin.com/in/satyapradip",
    ],
    knowsAbout: [
      "Full-Stack Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "Machine Learning",
      "MERN Stack",
      "MongoDB",
      "PostgreSQL",
      "Docker",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Computer Science & Engineering University",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
