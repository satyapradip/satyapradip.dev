"use client";

import React from "react";
import { educationData } from "@/constants/education";
import { certificationsData } from "@/constants/certifications";

export function Education() {
  return (
    <section className="bg-on-surface py-20 md:py-28 px-5 md:px-20 text-surface border-t-3 border-on-surface my-12" id="academic">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Title & Rotated 9.29 SGPA Badge */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-none mb-8 text-surface tracking-tight">
            ACADEMIC<br />TRACK<br />RECORD
          </h2>
          <div className="bg-primary-container text-on-primary-container p-8 brutalist-border border-surface brutalist-shadow -rotate-3 inline-block self-start">
            <p className="font-display font-black text-5xl md:text-6xl mb-1">
              {educationData.cgpa}
            </p>
            <p className="font-sans font-bold text-xs md:text-sm uppercase tracking-wider">
              AVERAGE SGPA / CGPA
            </p>
          </div>
        </div>

        {/* Right Column: University & Certifications Cards */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Education Card */}
          <div className="bg-surface text-on-surface p-8 md:p-10 brutalist-border brutalist-shadow-sm flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 font-display font-black text-xl border-2 border-on-surface">
              ED
            </div>
            <div>
              <h4 className="font-display font-black text-xl md:text-2xl uppercase mb-2 text-on-surface">
                {educationData.institution}
              </h4>
              <p className="font-sans font-bold text-base text-secondary mb-1">
                {educationData.degree}
              </p>
              <p className="font-sans text-sm text-on-surface/80 mb-4">
                {educationData.period} | Current SGPA: {educationData.cgpa}/10
              </p>
              <p className="font-sans text-sm text-on-surface/80 italic border-l-4 border-secondary-container pl-4 py-1">
                Specialization in Artificial Intelligence and Machine Learning with consistent academic top rank.
              </p>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="bg-surface text-on-surface p-8 md:p-10 brutalist-border brutalist-shadow-sm flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 font-display font-black text-xl border-2 border-on-surface">
              CE
            </div>
            <div className="w-full">
              <h4 className="font-display font-black text-xl md:text-2xl uppercase mb-6 text-on-surface">
                CERTIFICATIONS & TRAININGS
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificationsData.map((cert) => (
                  <div key={cert.id} className="p-4 bg-surface-container-low brutalist-border">
                    <p className="font-sans font-bold text-xs text-primary uppercase mb-1">
                      {cert.issuer}
                    </p>
                    <p className="font-sans font-bold text-sm uppercase text-on-surface">
                      {cert.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
