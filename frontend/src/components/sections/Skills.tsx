"use client";

import React from "react";
import { Monitor, Smartphone, Cpu, Cloud, Code, Database } from "lucide-react";
import { skillsData } from "@/constants/skills";

const iconMap = [
  { icon: Monitor, bg: "bg-secondary-container" },
  { icon: Smartphone, bg: "bg-tertiary-container" },
  { icon: Cpu, bg: "bg-primary-container" },
  { icon: Cloud, bg: "bg-surface-container-highest" },
  { icon: Code, bg: "bg-secondary-container" },
  { icon: Database, bg: "bg-tertiary-container" },
];

export function Skills() {
  return (
    <section className="py-20 px-5 md:px-20 max-w-[1280px] mx-auto" id="skills">
      <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-16 uppercase tracking-tight text-on-surface">
        MY <span className="bg-primary-container px-3 py-1 brutalist-border text-on-primary-container">SKILLS</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillsData.map((category, index) => {
          const IconConfig = iconMap[index % iconMap.length];
          const IconComponent = IconConfig.icon;

          return (
            <div
              key={category.title}
              className="bg-surface p-8 brutalist-border brutalist-shadow transition-all duration-200 hover:-translate-y-2 hover:shadow-[8px_8px_0px_#151b29]"
            >
              <div
                className={`w-16 h-16 ${IconConfig.bg} brutalist-border flex items-center justify-center mb-6 brutalist-shadow-sm`}
              >
                <IconComponent className="h-8 w-8 text-on-surface stroke-[2.5]" />
              </div>
              <h3 className="font-display font-black text-2xl uppercase mb-4 text-on-surface">
                {category.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="font-sans font-bold text-xs uppercase px-2.5 py-1 bg-surface-container-low border-2 border-on-surface"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
