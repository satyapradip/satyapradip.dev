"use client";

import React from "react";
import { Trophy, Star, Target, Sparkles } from "lucide-react";
import { achievementsData } from "@/constants/achievements";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

/**
 * Achievements Component
 * 
 * Displays academic excellence awards, hackathon recognitions, and competitive milestones.
 */
export function Achievements() {
  return (
    <section id="achievements" className="py-16 md:py-24 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 w-full max-w-[1440px] mx-auto">
      {/* Section Header */}
      <RevealOnScroll direction="up">
        <SectionHeading title="HONORS & AWARDS" subtitle="KEY MILESTONES" />
      </RevealOnScroll>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {achievementsData.map((item, index) => (
          <RevealOnScroll key={index} direction="up" delay={index * 120}>
            <div className="bg-surface p-6 brutalist-border brutalist-shadow flex flex-col justify-between h-full relative overflow-hidden">
              
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-black text-xs uppercase px-3 py-1 bg-tertiary text-on-tertiary brutalist-border">
                    {item.badgeText}
                  </span>
                  <Trophy className="h-6 w-6 text-on-surface" />
                </div>

                {/* Main Title / Stat */}
                <h3 className="font-display font-black text-4xl text-on-surface mb-1">
                  {item.title}
                </h3>
                <h4 className="font-display font-bold text-base text-secondary mb-3">
                  {item.label}
                </h4>

                {/* Description */}
                {item.description && (
                  <p className="font-sans text-xs text-on-surface leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Decorative accent bar */}
              <div className="mt-6 pt-3 border-t-2 border-dashed border-on-surface/30 flex items-center gap-1.5 text-secondary">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider">
                  VERIFIED ACHIEVEMENT
                </span>
              </div>

            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
