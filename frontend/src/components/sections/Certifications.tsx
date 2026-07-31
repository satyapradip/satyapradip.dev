"use client";

import React from "react";
import { Award, ShieldCheck, CheckCircle } from "lucide-react";
import { certificationsData } from "@/constants/certifications";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

/**
 * Certifications Component
 * 
 * Displays verified professional certifications in artificial intelligence,
 * cloud architecture, and software engineering.
 */
export function Certifications() {
  return (
    <section id="certifications" className="py-16 md:py-24 w-full max-w-360 mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Section Header */}
      <RevealOnScroll direction="up">
        <SectionHeading title="CERTIFICATIONS" subtitle="CREDENTIALS & DEGREES" />
      </RevealOnScroll>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {certificationsData.map((cert, index) => (
          <RevealOnScroll key={cert.id} direction="up" delay={index * 100}>
            <div className="bg-surface p-6 brutalist-border brutalist-shadow brutalist-shadow-hover flex items-start gap-4 h-full">
              {/* Badge Icon */}
              <div className="p-3 bg-primary-container brutalist-border shrink-0">
                <ShieldCheck className="h-6 w-6 text-on-surface" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-sans text-[10px] font-black uppercase tracking-wider bg-secondary-container px-2 py-0.5 brutalist-border">
                    VERIFIED
                  </span>
                </div>
                <h3 className="font-display font-black text-lg text-on-surface leading-snug">
                  {cert.title}
                </h3>
                <p className="font-sans text-xs font-bold text-secondary uppercase mt-1">
                  ISSUED BY: {cert.issuer}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
