import React from "react";

// Layout components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Shared Interactive Components
import { CursorSpotlight } from "@/components/shared/CursorSpotlight";

// Section components
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Education } from "@/components/sections/Education";
import { Certifications } from "@/components/sections/Certifications";
import { Achievements } from "@/components/sections/Achievements";
import { GitHubStats } from "@/components/sections/GitHubStats";
import { Contact } from "@/components/sections/Contact";

/**
 * Home Page (Root Layout Container)
 * 
 * Assembles all 12 page sections in sequence along with interactive ambient effects
 * to produce a seamless, single-page portfolio scrolling experience.
 */
export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-surface font-sans text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      {/* Ambient Mouse Cursor Spotlight Overlay */}
      <CursorSpotlight />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 space-y-4">
        {/* Section 1: Hero Header */}
        <Hero />

        {/* Section 2: Continuous Tech Stack Marquee */}
        <TechStack />

        {/* Section 3: About & Key Stats */}
        <About />

        {/* Section 4: Technical Skills Grid */}
        <Skills />

        {/* Section 5: Experience Timeline */}
        <Experience />

        {/* Section 6: Featured Projects Showcase */}
        <Projects />

        {/* Section 7: Engineering Process Workflow */}
        <Process />

        {/* Section 8: Academic Background */}
        <Education />

        {/* Section 9: Verified Certifications */}
        <Certifications />

        {/* Section 10: Honors & Awards */}
        <Achievements />

        {/* Section 11: Developer Activity & GitHub Metrics */}
        <GitHubStats />

        {/* Section 12: Contact & Social Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
