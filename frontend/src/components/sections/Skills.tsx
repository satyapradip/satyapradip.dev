"use client";

import React, { useEffect, useState } from "react";
import {
  Monitor,
  Smartphone,
  Cpu,
  Cloud,
  Code,
  Database,
  Server,
  Layout,
  Wrench,
  Terminal,
  Layers,
  Globe,
  Shield,
  Sparkles,
  Bot,
} from "lucide-react";
import { skillsData } from "@/constants/skills";

interface SkillCategoryItem {
  id?: string;
  title: string;
  iconName?: string;
  skills: string[];
}

const colorPalettes = [
  "bg-secondary-container",
  "bg-tertiary-container",
  "bg-primary-container",
  "bg-surface-container-highest",
  "bg-secondary-container",
  "bg-tertiary-container",
];

function getCategoryIcon(iconName: string | undefined, index: number) {
  const normalized = (iconName || "").toLowerCase().trim();
  const bg = colorPalettes[index % colorPalettes.length];

  if (normalized === "server" || normalized.includes("backend")) return { Icon: Server, bg };
  if (normalized === "layout" || normalized.includes("frontend")) return { Icon: Layout, bg };
  if (normalized === "cpu" || normalized.includes("ai") || normalized.includes("ml")) return { Icon: Cpu, bg };
  if (normalized === "database" || normalized.includes("db") || normalized.includes("sql")) return { Icon: Database, bg };
  if (normalized === "wrench" || normalized.includes("tool") || normalized.includes("devops")) return { Icon: Wrench, bg };
  if (normalized === "terminal" || normalized.includes("cli")) return { Icon: Terminal, bg };
  if (normalized === "cloud" || normalized.includes("aws") || normalized.includes("docker")) return { Icon: Cloud, bg };
  if (normalized === "smartphone" || normalized.includes("mobile") || normalized.includes("app")) return { Icon: Smartphone, bg };
  if (normalized === "code" || normalized.includes("language")) return { Icon: Code, bg };
  if (normalized === "shield" || normalized.includes("security")) return { Icon: Shield, bg };
  if (normalized === "globe" || normalized.includes("web")) return { Icon: Globe, bg };
  if (normalized === "layers") return { Icon: Layers, bg };
  if (normalized === "bot") return { Icon: Bot, bg };
  if (normalized === "monitor") return { Icon: Monitor, bg };

  const defaultIcons = [Monitor, Smartphone, Cpu, Cloud, Code, Database, Server, Wrench];
  const Icon = defaultIcons[index % defaultIcons.length];
  return { Icon, bg };
}

export function Skills() {
  const [categories, setCategories] = useState<SkillCategoryItem[]>(skillsData);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.skillCategories) && data.skillCategories.length > 0) {
          setCategories(data.skillCategories);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch skills from API, retaining fallback state:", err);
      });
  }, []);

  return (
    <section className="py-20 w-full max-w-360 mx-auto px-4 sm:px-6 md:px-8 lg:px-12" id="skills">
      <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-16 uppercase tracking-tight text-on-surface">
        MY <span className="bg-primary-container px-3 py-1 brutalist-border text-on-primary-container">SKILLS</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => {
          const { Icon, bg } = getCategoryIcon(category.iconName || category.title, index);

          return (
            <div
              key={category.id || category.title || index}
              className="bg-surface p-8 brutalist-border brutalist-shadow transition-all duration-200 hover:-translate-y-2 hover:shadow-[8px_8px_0px_#151b29] flex flex-col justify-between h-full"
            >
              <div>
                <div
                  className={`w-16 h-16 ${bg} brutalist-border flex items-center justify-center mb-6 brutalist-shadow-sm`}
                >
                  <Icon className="h-8 w-8 text-on-surface stroke-[2.5]" />
                </div>
                <h3 className="font-display font-black text-2xl uppercase mb-4 text-on-surface">
                  {category.title}
                </h3>
              </div>

              <ul className="flex flex-wrap gap-2 pt-2">
                {category.skills?.map((skill, sIdx) => (
                  <li
                    key={`${skill}-${sIdx}`}
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
