"use client";

import React from "react";
import { ExternalLink, Terminal, Github } from "lucide-react";
import { projectsData } from "@/constants/projects";

export function Projects() {
  const [project1, project2, project3] = projectsData;

  return (
    <section className="bg-secondary py-20 md:py-28 px-5 md:px-20 border-y-3 border-on-surface my-12" id="projects">
      <div className="max-w-[1280px] mx-auto">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="font-display font-black text-5xl md:text-7xl text-surface leading-none mb-4">
              FEATURED<br />WORK
            </h2>
            <p className="font-sans text-lg text-surface max-w-xl opacity-90 leading-relaxed border-l-4 border-surface pl-4">
              Building the future, one commit at a time. Explore my most significant technical achievements.
            </p>
          </div>
          <a
            href="https://github.com/satyapradip"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface text-on-surface font-sans font-bold text-xs uppercase px-8 py-4 brutalist-border brutalist-shadow-sm brutalist-shadow-hover flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            VIEW GITHUB
          </a>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Project 1 */}
          {project1 && (
            <div className="group">
              <div className="brutalist-border bg-surface overflow-hidden brutalist-shadow transition-transform group-hover:-translate-y-2">
                <div className="h-64 md:h-80 relative overflow-hidden bg-primary-container/20 p-8 flex flex-col justify-between border-b-3 border-on-surface">
                  <div className="flex flex-wrap gap-2 z-10">
                    {project1.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="bg-primary-container text-on-surface px-3 py-1 brutalist-border font-sans font-bold text-xs uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="z-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-surface px-2.5 py-1 border border-on-surface">
                      {project1.subtitle}
                    </span>
                    <h4 className="font-display font-black text-3xl text-on-surface mt-2">
                      {project1.title}
                    </h4>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex justify-between items-center bg-surface">
                  <p className="font-sans text-sm text-on-surface max-w-md line-clamp-2">
                    {project1.description}
                  </p>
                  <div className="flex gap-3">
                    {project1.liveUrl && (
                      <a
                        href={project1.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 brutalist-border bg-secondary-container text-on-surface hover:bg-primary-container transition-colors brutalist-shadow-sm"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="h-5 w-5 stroke-[2.5]" />
                      </a>
                    )}
                    {project1.githubUrl && (
                      <a
                        href={project1.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 brutalist-border bg-surface text-on-surface hover:bg-secondary-container transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Terminal className="h-5 w-5 stroke-[2.5]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project 2 */}
          {project2 && (
            <div className="group">
              <div className="brutalist-border bg-surface overflow-hidden brutalist-shadow transition-transform group-hover:-translate-y-2">
                <div className="h-64 md:h-80 relative overflow-hidden bg-tertiary-container/30 p-8 flex flex-col justify-between border-b-3 border-on-surface">
                  <div className="flex flex-wrap gap-2 z-10">
                    {project2.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="bg-tertiary-container text-on-surface px-3 py-1 brutalist-border font-sans font-bold text-xs uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="z-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-tertiary bg-surface px-2.5 py-1 border border-on-surface">
                      {project2.subtitle}
                    </span>
                    <h4 className="font-display font-black text-3xl text-on-surface mt-2">
                      {project2.title}
                    </h4>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex justify-between items-center bg-surface">
                  <p className="font-sans text-sm text-on-surface max-w-md line-clamp-2">
                    {project2.description}
                  </p>
                  <div className="flex gap-3">
                    {project2.liveUrl && (
                      <a
                        href={project2.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 brutalist-border bg-tertiary text-on-tertiary hover:bg-tertiary-container hover:text-on-surface transition-colors brutalist-shadow-sm"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="h-5 w-5 stroke-[2.5]" />
                      </a>
                    )}
                    {project2.githubUrl && (
                      <a
                        href={project2.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 brutalist-border bg-surface text-on-surface hover:bg-tertiary-container transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Terminal className="h-5 w-5 stroke-[2.5]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Project 3 (Full Width Featured Card) */}
          {project3 && (
            <div className="group lg:col-span-2">
              <div className="brutalist-border bg-surface overflow-hidden brutalist-shadow transition-transform group-hover:-translate-y-2 flex flex-col md:flex-row">
                <div className="h-64 md:h-auto md:w-1/2 p-8 bg-surface-container-high border-b-3 md:border-b-0 md:border-r-3 border-on-surface flex flex-col justify-between">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project3.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-secondary-container text-on-surface px-3 py-1 brutalist-border font-sans font-bold text-xs uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary-container px-3 py-1 brutalist-border">
                      {project3.subtitle}
                    </span>
                    <h3 className="font-display font-black text-3xl md:text-4xl text-on-surface mt-3">
                      {project3.title}
                    </h3>
                  </div>
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-between bg-surface">
                  <p className="font-sans text-base text-on-surface mb-8 leading-relaxed">
                    {project3.description}
                  </p>
                  <div className="flex items-center gap-4">
                    {project3.liveUrl && (
                      <a
                        href={project3.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-on-surface text-surface px-6 py-3 font-sans font-bold text-xs uppercase brutalist-shadow-sm hover:bg-primary-container hover:text-on-surface transition-colors flex items-center gap-2"
                      >
                        <span>LIVE DEMO</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project3.githubUrl && (
                      <a
                        href={project3.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 brutalist-border hover:bg-secondary-container transition-colors"
                        aria-label="GitHub Repo"
                      >
                        <Terminal className="h-5 w-5 stroke-[2.5]" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
