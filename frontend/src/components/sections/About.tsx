"use client";

import React from "react";
import { CheckCircle2, User, Award, Code2, GraduationCap, Briefcase } from "lucide-react";
import { personalData } from "@/constants/personal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

/**
 * About Component
 * 
 * Displays the "WHO I AM" section presenting Satyapradip's background,
 * key focus areas, current pursuits, and high-level stats in a Neo-Brutalist aesthetic.
 */
export function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 w-full max-w-[1440px] mx-auto">
      {/* Section Header */}
      <RevealOnScroll direction="up">
        <SectionHeading title="WHO I AM" subtitle="ABOUT ME & FOCUS" />
      </RevealOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        
        {/* Left Column: Bio & Current Pursuits */}
        <RevealOnScroll direction="left" className="lg:col-span-7 space-y-6">
          <div className="bg-surface p-6 md:p-8 brutalist-border brutalist-shadow">
            {/* Header Badge */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-container brutalist-border">
                <User className="h-6 w-6 text-on-surface" />
              </div>
              <h3 className="font-display font-black text-2xl text-on-surface">
                PASSIONATE DEVELOPER & AI ENTHUSIAST
              </h3>
            </div>

            {/* Paragraph Bio */}
            <p className="font-sans text-base leading-relaxed text-on-surface mb-6">
              {personalData.bio}
            </p>

            {/* Current Pursuits List */}
            <div className="border-t-3 border-on-surface pt-6">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-secondary mb-4 flex items-center gap-2">
                <Code2 className="h-4 w-4" /> CURRENT FOCUS & RESPONSIBILITIES
              </h4>
              <ul className="space-y-3">
                {personalData.currently.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-tertiary shrink-0 mt-0.5" />
                    <span className="font-sans text-sm font-semibold text-on-surface">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealOnScroll>

        {/* Right Column: Key Stats Grid */}
        <RevealOnScroll direction="right" className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            
            {/* Stat Card 1: Experience */}
            <div className="bg-secondary-container p-6 brutalist-border brutalist-shadow text-center">
              <Briefcase className="h-8 w-8 text-on-surface mx-auto mb-2" />
              <div className="font-display font-black text-3xl md:text-4xl text-on-surface">
                <AnimatedCounter value={personalData.stats.experienceYears} />
              </div>
              <p className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface mt-1">
                YEARS EXPERIENCE
              </p>
            </div>

            {/* Stat Card 2: Projects */}
            <div className="bg-primary-container p-6 brutalist-border brutalist-shadow text-center">
              <Code2 className="h-8 w-8 text-on-surface mx-auto mb-2" />
              <div className="font-display font-black text-3xl md:text-4xl text-on-surface">
                <AnimatedCounter value={personalData.stats.projectsCompleted} />
              </div>
              <p className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface mt-1">
                PROJECTS BUILT
              </p>
            </div>

            {/* Stat Card 3: Technologies */}
            <div className="bg-tertiary-container p-6 brutalist-border brutalist-shadow text-center">
              <Award className="h-8 w-8 text-on-surface mx-auto mb-2" />
              <div className="font-display font-black text-3xl md:text-4xl text-on-surface">
                <AnimatedCounter value={personalData.stats.technologiesCount} />
              </div>
              <p className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface mt-1">
                TECH STACK TOOLS
              </p>
            </div>

            {/* Stat Card 4: Academic Score */}
            <div className="bg-surface-container-high p-6 brutalist-border brutalist-shadow text-center">
              <GraduationCap className="h-8 w-8 text-on-surface mx-auto mb-2" />
              <div className="font-display font-black text-3xl md:text-4xl text-on-surface">
                <AnimatedCounter value={personalData.stats.cgpa} />
              </div>
              <p className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface mt-1">
                OVERALL CGPA
              </p>
            </div>

          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
