"use client";

import React from "react";
import { processStepsData } from "@/constants/process";

export function Process() {
  return (
    <section className="py-20 px-5 md:px-20 max-w-[1280px] mx-auto" id="process">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Process Steps */}
        <div>
          <h2 className="font-display font-black text-5xl md:text-6xl mb-2 text-on-surface">
            MY
          </h2>
          <h3 className="font-display font-black text-5xl md:text-6xl text-tertiary mb-12 tracking-tight">
            PROCESS
          </h3>

          <div className="space-y-10">
            {processStepsData.slice(0, 4).map((step) => (
              <div key={step.stepNumber} className="flex gap-6 items-start group">
                <span className="font-display font-black text-4xl md:text-5xl text-outline-variant group-hover:text-primary transition-colors">
                  {step.stepNumber}
                </span>
                <div>
                  <h4 className="font-display font-black text-xl md:text-2xl uppercase mb-2 text-on-surface">
                    {step.title}
                  </h4>
                  <p className="font-sans text-sm md:text-base text-on-surface/80 max-w-md leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Visual Card */}
        <div className="relative flex justify-center">
          <div className="brutalist-border brutalist-shadow -rotate-2 overflow-hidden bg-surface max-w-md w-full">
            <div className="p-8 bg-surface-container-low border-b-3 border-on-surface">
              <span className="font-sans font-bold text-xs uppercase bg-primary-container text-on-primary-container px-3 py-1 brutalist-border inline-block mb-4">
                ENGINEER WORKFLOW
              </span>
              <h4 className="font-display font-black text-2xl uppercase text-on-surface mb-2">
                PRODUCTION-READY SOFTWARE
              </h4>
              <p className="font-sans text-sm text-on-surface/80 leading-relaxed">
                From technical requirement analysis to automated deployment pipelines, every phase is engineered for performance, security, and scalability.
              </p>
            </div>
            <div className="p-6 bg-primary-fixed border-t-3 border-on-surface flex items-center justify-between">
              <p className="font-sans font-bold uppercase text-xs text-on-surface">
                Phase: Development Strategy
              </p>
              <span className="h-3 w-3 rounded-full bg-success animate-pulse" />
            </div>
          </div>

          {/* Floating Rotated Badge */}
          <div className="absolute -top-8 -right-4 md:-right-8 w-24 h-24 bg-tertiary-container brutalist-border brutalist-shadow rounded-full flex items-center justify-center font-display font-black text-xl text-on-surface rotate-12">
            GO!
          </div>
        </div>

      </div>
    </section>
  );
}
