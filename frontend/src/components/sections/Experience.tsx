"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, ExternalLink, CheckCircle2, TrendingUp } from "lucide-react";
import { experienceData } from "@/constants/experience";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

/**
 * Experience Component
 * 
 * Renders the work experience timeline, detailing roles, quantified impact metrics,
 * tech stack used, and case study links.
 */
export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 w-full max-w-[1440px] mx-auto">
      {/* Section Header */}
      <RevealOnScroll direction="up">
        <SectionHeading title="EXPERIENCE" subtitle="CAREER & QUANTIFIED IMPACT" />
      </RevealOnScroll>

      <div className="mt-8 space-y-8">
        {experienceData.map((item, index) => (
          <RevealOnScroll key={item.id} direction="up" delay={index * 150}>
            <div className="bg-surface p-6 md:p-8 brutalist-border brutalist-shadow relative overflow-hidden">
              
              {/* Top Bar: Company Name & Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b-3 border-on-surface pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-tertiary" />
                    <h3 className="font-display font-black text-2xl text-on-surface uppercase">
                      {item.role}
                    </h3>
                  </div>
                  <h4 className="font-display font-bold text-lg text-secondary mt-1">
                    {item.company}
                  </h4>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 font-sans font-bold text-xs bg-primary-container text-on-primary-container px-3 py-1.5 brutalist-border">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.year}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-sans font-bold text-xs bg-surface-container-high text-on-surface px-3 py-1.5 brutalist-border">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-3 mb-6">
                <h5 className="font-display font-bold text-xs uppercase tracking-wider text-on-surface flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-tertiary" /> KEY CONTRIBUTIONS & QUANTIFIED IMPACT:
                </h5>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-tertiary shrink-0 mt-1" />
                    <span className="font-sans text-sm text-on-surface leading-relaxed">
                      Engineered production MERN stack web applications with secure JWT authentication and state management.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-tertiary shrink-0 mt-1" />
                    <span className="font-sans text-sm text-on-surface leading-relaxed">
                      Architected 10+ RESTful APIs following strict MVC design patterns, reducing average backend latency by <strong>35%</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-tertiary shrink-0 mt-1" />
                    <span className="font-sans text-sm text-on-surface leading-relaxed">
                      Optimized MongoDB index structures and query performance, managing <strong>5,000+</strong> active user records seamlessly.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-tertiary shrink-0 mt-1" />
                    <span className="font-sans text-sm text-on-surface leading-relaxed">
                      Collaborated via Git version control, active peer code reviews, and Agile sprint workflows.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Tech Stack Badges & Action Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t-3 border-on-surface pt-4">
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-sans text-xs font-bold bg-surface-container-low text-on-surface px-2.5 py-1 brutalist-border"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>

                {item.caseStudyUrl && (
                  <a
                    href={item.caseStudyUrl}
                    className="inline-flex items-center gap-2 font-sans font-bold text-xs uppercase bg-tertiary text-on-tertiary px-4 py-2 brutalist-border brutalist-shadow-sm brutalist-shadow-hover cursor-pointer ml-auto"
                  >
                    <span>CASE STUDY</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
