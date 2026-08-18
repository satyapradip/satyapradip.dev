"use client";

import React from "react";
import { GitCommit, Code, Terminal, GitBranch, Cpu } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

/**
 * GitHubStats Component
 * 
 * Renders developer metric counters (commits, algorithms solved, projects built, public repositories)
 * inside a terminal code window styling.
 */
export function GitHubStats() {
  return (
    <section id="github-stats" className="py-16 md:py-24 w-full max-w-360 mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Section Header */}
      <RevealOnScroll direction="up">
        <SectionHeading title="ACTIVITY & METRICS" subtitle="CODE HIGHLIGHTS" />
      </RevealOnScroll>

      <RevealOnScroll direction="up" className="mt-8">
        <div className="bg-surface brutalist-border brutalist-shadow p-6 md:p-8">
          
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between border-b-3 border-on-surface pb-4 mb-8 bg-surface-container-high p-3 brutalist-border">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-tertiary border border-on-surface" />
              <span className="w-3 h-3 rounded-full bg-primary-container border border-on-surface" />
              <span className="w-3 h-3 rounded-full bg-secondary-container border border-on-surface" />
            </div>
            <div className="flex items-center gap-2 font-mono font-bold text-xs text-on-surface">
              <Terminal className="h-4 w-4" /> satyapradip ~ git stats --summary
            </div>
            <div className="w-12" />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            {/* Metric 1: Commits */}
            <div className="bg-surface-container-low p-6 brutalist-border text-center flex flex-col justify-between">
              <div>
                <GitCommit className="h-7 w-7 text-tertiary mx-auto mb-2" />
                <div className="font-display font-black text-3xl md:text-4xl text-[#18181B]">
                  <AnimatedCounter target={650} suffix="+" />
                </div>
              </div>
              <p className="font-sans font-black text-xs uppercase tracking-wider text-[#18181B] mt-2">
                GITHUB COMMITS
              </p>
            </div>

            {/* Metric 2: DSA Problems Solved */}
            <div className="bg-primary-container p-6 brutalist-border text-center flex flex-col justify-between">
              <div>
                <Code className="h-7 w-7 text-on-surface mx-auto mb-2" />
                <div className="font-display font-black text-3xl md:text-4xl text-[#18181B]">
                  <AnimatedCounter target={100} suffix="+" />
                </div>
              </div>
              <p className="font-sans font-black text-xs uppercase tracking-wider text-[#18181B] mt-2">
                DSA PROBLEMS
              </p>
            </div>

            {/* Metric 3: Production Projects */}
            <div className="bg-secondary-container p-6 brutalist-border text-center flex flex-col justify-between">
              <div>
                <Cpu className="h-7 w-7 text-on-surface mx-auto mb-2" />
                <div className="font-display font-black text-3xl md:text-4xl text-[#18181B]">
                  <AnimatedCounter target={15} suffix="+" />
                </div>
              </div>
              <p className="font-sans font-black text-xs uppercase tracking-wider text-[#18181B] mt-2">
                PROJECTS BUILT
              </p>
            </div>

            {/* Metric 4: Public Repositories */}
            <div className="bg-tertiary-container p-6 brutalist-border text-center flex flex-col justify-between">
              <div>
                <GitBranch className="h-7 w-7 text-on-surface mx-auto mb-2" />
                <div className="font-display font-black text-3xl md:text-4xl text-[#18181B]">
                  <AnimatedCounter target={20} suffix="+" />
                </div>
              </div>
              <p className="font-sans font-black text-xs uppercase tracking-wider text-[#18181B] mt-2">
                PUBLIC REPOSITORIES
              </p>
            </div>

          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
