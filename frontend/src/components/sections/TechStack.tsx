"use client";

import React from "react";
import { techStackRibbonData } from "@/constants/techStack";

export function TechStack() {
  return (
    <div className="w-full bg-on-surface py-6 overflow-hidden whitespace-nowrap brutalist-border border-l-0 border-r-0 my-8">
      <div className="inline-block animate-marquee">
        {/* Set 1 */}
        <span className="inline-flex items-center gap-10 md:gap-14 mx-6">
          {techStackRibbonData.map((tech, index) => (
            <span
              key={`tech-1-${index}`}
              className="inline-flex items-center gap-3 font-display font-black text-lg md:text-xl uppercase tracking-wider text-surface"
            >
              <span className="h-3 w-3 rounded-full bg-primary-container inline-block" />
              <span>{tech.name}</span>
            </span>
          ))}
        </span>
        {/* Set 2 (Repeat for Seamless Loop) */}
        <span className="inline-flex items-center gap-10 md:gap-14 mx-6">
          {techStackRibbonData.map((tech, index) => (
            <span
              key={`tech-2-${index}`}
              className="inline-flex items-center gap-3 font-display font-black text-lg md:text-xl uppercase tracking-wider text-surface"
            >
              <span className="h-3 w-3 rounded-full bg-secondary-container inline-block" />
              <span>{tech.name}</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
