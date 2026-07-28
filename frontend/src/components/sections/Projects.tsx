"use client";

import React, { useState } from "react";
import { ExternalLink, Terminal, Github, Layers, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { projectsData } from "@/constants/projects";
import { AllProjectsDrawer } from "@/components/sections/AllProjectsDrawer";

/**
 * Projects Component
 * 
 * Showcases Satyapradip's top featured projects with deep-dive technical features,
 * architecture highlights, live demos, GitHub repositories, and a prominent button
 * triggering the side-scrolling "View All Projects" gallery drawer.
 */
export function Projects() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const featuredProjects = projectsData.slice(0, 3);

  const [project1, project2, project3] = featuredProjects;

  return (
    <section className="bg-secondary py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 border-y-3 border-on-surface my-12" id="projects">
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-sans text-xs font-black uppercase tracking-wider bg-primary-container px-3 py-1 brutalist-border text-on-primary-container">
                FEATURED WORK
              </span>
            </div>
            <h2 className="font-display font-black text-5xl md:text-7xl text-surface leading-none mb-4 tracking-tight">
              FEATURED<br />PROJECTS
            </h2>
            <p className="font-sans text-base md:text-lg text-surface max-w-xl opacity-90 leading-relaxed border-l-4 border-surface pl-4">
              Building scalable systems, one commit at a time. Explore my featured technical implementations and production architectures.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="bg-primary-container text-on-primary-container font-sans font-bold text-xs uppercase px-6 py-4 brutalist-border brutalist-shadow-sm brutalist-shadow-hover flex items-center gap-2 cursor-pointer"
            >
              <Layers className="h-4 w-4" />
              <span>VIEW ALL PROJECTS ({projectsData.length})</span>
            </button>

            <a
              href="https://github.com/satyapradip"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface text-on-surface font-sans font-bold text-xs uppercase px-6 py-4 brutalist-border brutalist-shadow-sm brutalist-shadow-hover flex items-center gap-2 cursor-pointer"
            >
              <Github className="h-4 w-4" />
              <span>GITHUB PROFILE</span>
            </a>
          </div>
        </div>

        {/* Top Grid: Project 1 & Project 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Featured Project 1: Employee Management System */}
          <div className="bg-primary-container p-6 md:p-8 brutalist-border brutalist-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="font-sans text-xs font-black uppercase tracking-wider bg-surface px-3 py-1 brutalist-border text-on-surface">
                  {project1.badge || "ENTERPRISE"}
                </span>
                <span className="font-mono text-xs font-bold text-on-surface">01 // MULTI-TENANT</span>
              </div>

              <h3 className="font-display font-black text-3xl md:text-4xl text-on-surface mb-2">
                {project1.title}
              </h3>
              <p className="font-display font-bold text-sm text-on-primary-container uppercase mb-4">
                {project1.subtitle}
              </p>
              <p className="font-sans text-sm text-on-surface mb-6 leading-relaxed">
                {project1.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project1.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-sans text-xs font-bold bg-surface text-on-surface px-3 py-1 brutalist-border"
                  >
                    #{tech}
                  </span>
                ))}
              </div>

              {/* Feature Highlights */}
              <div className="border-t-2 border-on-surface/40 pt-4 mb-6">
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                  KEY HIGHLIGHTS:
                </h4>
                <ul className="space-y-1">
                  {project1.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-semibold text-on-surface">
                      <CheckCircle2 className="h-3.5 w-3.5 text-on-surface shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 border-t-3 border-on-surface pt-4">
              {project1.liveUrl && (
                <a
                  href={project1.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface text-on-surface font-sans font-bold text-xs uppercase px-5 py-3 brutalist-border brutalist-shadow-sm brutalist-shadow-hover flex items-center gap-2 cursor-pointer"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {project1.githubUrl && (
                <a
                  href={project1.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary-container text-on-surface font-sans font-bold text-xs uppercase px-5 py-3 brutalist-border brutalist-shadow-sm brutalist-shadow-hover flex items-center gap-2 cursor-pointer"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>REPOSITORIES</span>
                </a>
              )}
            </div>
          </div>

          {/* Featured Project 2: ApnaDoctor AI */}
          <div className="bg-tertiary-container p-6 md:p-8 brutalist-border brutalist-shadow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="font-sans text-xs font-black uppercase tracking-wider bg-surface px-3 py-1 brutalist-border text-on-surface">
                  {project2.badge || "HEALTHCARE AI"}
                </span>
                <span className="font-mono text-xs font-bold text-on-surface">02 // GEMINI AI</span>
              </div>

              <h3 className="font-display font-black text-3xl md:text-4xl text-on-surface mb-2">
                {project2.title}
              </h3>
              <p className="font-display font-bold text-sm text-secondary uppercase mb-4">
                {project2.subtitle}
              </p>
              <p className="font-sans text-sm text-on-surface mb-6 leading-relaxed">
                {project2.description}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project2.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-sans text-xs font-bold bg-surface text-on-surface px-3 py-1 brutalist-border"
                  >
                    #{tech}
                  </span>
                ))}
              </div>

              {/* Feature Highlights */}
              <div className="border-t-2 border-on-surface/40 pt-4 mb-6">
                <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-on-surface mb-2">
                  KEY HIGHLIGHTS:
                </h4>
                <ul className="space-y-1">
                  {project2.features.slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-semibold text-on-surface">
                      <CheckCircle2 className="h-3.5 w-3.5 text-on-surface shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 border-t-3 border-on-surface pt-4">
              {project2.liveUrl && (
                <a
                  href={project2.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface text-on-surface font-sans font-bold text-xs uppercase px-5 py-3 brutalist-border brutalist-shadow-sm brutalist-shadow-hover flex items-center gap-2 cursor-pointer"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {project2.githubUrl && (
                <a
                  href={project2.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary-container text-on-surface font-sans font-bold text-xs uppercase px-5 py-3 brutalist-border brutalist-shadow-sm brutalist-shadow-hover flex items-center gap-2 cursor-pointer"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>REPOSITORIES</span>
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Featured Project 3: Maya Voice AI */}
        <div className="bg-surface-container-high p-6 md:p-8 brutalist-border brutalist-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="flex justify-between items-start mb-4">
                <span className="font-sans text-xs font-black uppercase tracking-wider bg-tertiary text-on-tertiary px-3 py-1 brutalist-border">
                  {project3.badge || "VOICE & NLP"}
                </span>
                <span className="font-mono text-xs font-bold text-on-surface">03 // PYTHON NLP</span>
              </div>

              <h3 className="font-display font-black text-3xl md:text-4xl text-on-surface mb-2">
                {project3.title}
              </h3>
              <p className="font-display font-bold text-sm text-secondary uppercase mb-4">
                {project3.subtitle}
              </p>
              <p className="font-sans text-sm text-on-surface mb-6 leading-relaxed max-w-2xl">
                {project3.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project3.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-sans text-xs font-bold bg-surface text-on-surface px-3 py-1 brutalist-border"
                  >
                    #{tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-4 border-t-3 lg:border-t-0 lg:border-l-3 border-on-surface pt-6 lg:pt-0 lg:pl-8">
              <button
                onClick={() => setDrawerOpen(true)}
                className="w-full bg-primary-container text-on-primary-container font-sans font-bold text-xs uppercase px-6 py-4 brutalist-border brutalist-shadow-sm brutalist-shadow-hover flex items-center justify-center gap-2 cursor-pointer mb-2"
              >
                <Layers className="h-4 w-4" />
                <span>EXPLORE ALL PROJECTS ({projectsData.length})</span>
              </button>

              <div className="flex flex-wrap gap-2 w-full justify-end">
                {project3.liveUrl && (
                  <a
                    href={project3.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-surface text-on-surface font-sans font-bold text-xs uppercase px-4 py-2.5 brutalist-border brutalist-shadow-sm brutalist-shadow-hover flex items-center gap-2 cursor-pointer"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                {project3.githubUrl && (
                  <a
                    href={project3.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary-container text-on-surface font-sans font-bold text-xs uppercase px-4 py-2.5 brutalist-border brutalist-shadow-sm brutalist-shadow-hover flex items-center gap-2 cursor-pointer"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GITHUB</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Side-Scrolling Gallery Drawer for All Non-Featured Projects */}
      <AllProjectsDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </section>
  );
}
