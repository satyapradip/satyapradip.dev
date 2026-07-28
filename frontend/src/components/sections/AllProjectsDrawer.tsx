"use client";

import React, { useState } from "react";
import { X, ExternalLink, Github, Layers, Sparkles, Filter } from "lucide-react";
import { projectsData } from "@/constants/projects";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface AllProjectsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * AllProjectsDrawer Component
 * 
 * Provides a side-scrolling drawer / interactive gallery displaying the entire portfolio
 * project archive, complete with category filter pills, tech stack tags, live links, and GitHub repos.
 */
export function AllProjectsDrawer({ open, onOpenChange }: AllProjectsDrawerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "FULL-STACK", "AI/ML", "DEVOPS", "PRODUCTIVITY"];

  // Filter projects based on selected category tag
  const filteredProjects = projectsData.filter((project) => {
    if (selectedCategory === "ALL") return true;
    if (selectedCategory === "FULL-STACK")
      return project.techStack.some((t) => ["React", "Node.js", "Express", "Next.js", "MongoDB", "Prisma"].includes(t));
    if (selectedCategory === "AI/ML")
      return project.techStack.some((t) => ["Gemini API", "OpenAI", "PyTorch", "NLP", "Python"].includes(t));
    if (selectedCategory === "DEVOPS")
      return project.techStack.some((t) => ["Docker", "WebSockets", "Redis", "AWS"].includes(t));
    if (selectedCategory === "PRODUCTIVITY")
      return project.techStack.some((t) => ["CLI", "Zustand", "Dnd-Kit", "Git Hooks"].includes(t));
    return true;
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl bg-surface border-l-3 border-on-surface p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
      >
        {/* Drawer Header */}
        <div>
          <SheetHeader className="text-left border-b-3 border-on-surface pb-6 mb-6 flex flex-row items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-sans text-[10px] font-black uppercase tracking-wider bg-primary-container px-2 py-0.5 brutalist-border">
                  COMPLETE ARCHIVE
                </span>
              </div>
              <SheetTitle className="font-display font-black text-2xl sm:text-3xl text-on-surface uppercase tracking-tight">
                ALL PROJECTS & EXPERIMENTS
              </SheetTitle>
            </div>
          </SheetHeader>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            <Filter className="h-4 w-4 text-on-surface shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`font-sans font-bold text-xs uppercase px-4 py-2 brutalist-border brutalist-shadow-sm transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary-container text-on-primary-container font-black"
                    : "bg-surface text-on-surface hover:bg-secondary-container"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Side-Scrolling / Vertical Grid Card Stream */}
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-surface p-6 brutalist-border brutalist-shadow brutalist-shadow-hover relative overflow-hidden"
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    {project.badge && (
                      <span className="font-sans text-[10px] font-bold uppercase tracking-wider bg-secondary-container text-on-surface px-2.5 py-0.5 brutalist-border inline-block mb-2">
                        {project.badge}
                      </span>
                    )}
                    <h3 className="font-display font-black text-xl text-on-surface">
                      {project.title}
                    </h3>
                    <p className="font-display font-bold text-xs text-secondary uppercase">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View GitHub repo for ${project.title}`}
                        className="p-2 bg-surface brutalist-border hover:bg-primary-container transition-colors cursor-pointer"
                      >
                        <Github className="h-4 w-4 text-on-surface" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View live demo for ${project.title}`}
                        className="p-2 bg-secondary-container brutalist-border hover:bg-tertiary hover:text-on-tertiary transition-colors cursor-pointer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="font-sans text-xs text-on-surface leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t-2 border-dashed border-on-surface/30">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-sans text-[11px] font-bold bg-surface-container-low text-on-surface px-2 py-0.5 border border-on-surface"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="mt-8 pt-4 border-t-3 border-on-surface text-center">
          <p className="font-sans text-xs font-bold text-on-surface/70 uppercase">
            Showing {filteredProjects.length} of {projectsData.length} projects
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
