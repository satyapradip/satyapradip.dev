"use client";

import React, { useEffect, useState } from "react";
import { Briefcase, Calendar, MapPin, ExternalLink, CheckCircle2, TrendingUp } from "lucide-react";
import { experienceData } from "@/constants/experience";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ExperienceItem } from "@/types";

/**
 * Experience Component
 * 
 * Renders the work experience timeline, detailing roles, quantified impact metrics,
 * tech stack used, and case study links.
 */
export function Experience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(experienceData);

  useEffect(() => {
    fetch("/api/experience")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.experiences) && data.experiences.length > 0) {
          setExperiences(data.experiences);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch experience from API, using fallback:", err);
      });
  }, []);

  return (
    <section id="experience" className="py-16 md:py-24 w-full max-w-360 mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Section Header */}
      <RevealOnScroll direction="up">
        <SectionHeading title="EXPERIENCE" subtitle="CAREER & QUANTIFIED IMPACT" />
      </RevealOnScroll>

      <div className="mt-8 space-y-8">
        {experiences.map((item, index) => (
          <RevealOnScroll key={item.id || index} direction="up" delay={index * 150}>
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
              {item.highlights && item.highlights.length > 0 && (
                <div className="space-y-3 mb-6">
                  <h5 className="font-display font-bold text-xs uppercase tracking-wider text-on-surface flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-tertiary" /> KEY CONTRIBUTIONS & QUANTIFIED IMPACT:
                  </h5>
                  <ul className="space-y-2.5">
                    {item.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-tertiary shrink-0 mt-1" />
                        <span className="font-sans text-sm text-on-surface leading-relaxed">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Badges & Action Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t-3 border-on-surface pt-4">
                <div className="flex flex-wrap gap-2">
                  {item.techStack?.map((tech) => (
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
