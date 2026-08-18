"use client";

import React from "react";
import { Cpu, ShieldCheck, Zap, GitBranch, CheckCircle2 } from "lucide-react";

const engineeringPrinciples = [
  {
    stepNumber: "01",
    title: "MODULAR & CLEAN ARCHITECTURE",
    description:
      "Decoupled components, robust TypeScript definitions, and single-responsibility handlers engineered for maintainability.",
    icon: Cpu,
  },
  {
    stepNumber: "02",
    title: "SECURITY & DATA INTEGRITY",
    description:
      "Type-safe validation, authenticated middleware boundaries, secure environment secrets, and resilient database queries.",
    icon: ShieldCheck,
  },
  {
    stepNumber: "03",
    title: "PERFORMANCE & FLUID UX",
    description:
      "Zero-layout-shift state hydration, optimized asset delivery, responsive layouts, and instant client feedback.",
    icon: Zap,
  },
  {
    stepNumber: "04",
    title: "AUTOMATED CI/CD & CLOUD DEPLOYMENT",
    description:
      "Version-controlled workflows, automated build checks, and seamless cloud deployments across Vercel, AWS, and Docker.",
    icon: GitBranch,
  },
];

export function Process() {
  return (
    <section className="py-20 w-full max-w-360 mx-auto px-4 sm:px-6 md:px-8 lg:px-12" id="process">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Principles */}
        <div>
          <span className="font-sans text-xs font-black uppercase tracking-wider bg-secondary-container px-3 py-1 brutalist-border text-on-surface inline-block mb-3">
            SYSTEMS & STANDARDS
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl mb-2 text-on-surface tracking-tight">
            ENGINEERING
          </h2>
          <h3 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-tertiary mb-12 tracking-tight">
            PHILOSOPHY
          </h3>

          <div className="space-y-8">
            {engineeringPrinciples.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.stepNumber} className="flex gap-5 items-start group">
                  <span className="font-display font-black text-3xl md:text-4xl text-outline-variant group-hover:text-primary transition-colors shrink-0">
                    {item.stepNumber}
                  </span>
                  <div>
                    <h4 className="font-display font-black text-lg md:text-xl uppercase mb-1.5 text-on-surface flex items-center gap-2">
                      <Icon className="h-4 w-4 text-tertiary" />
                      {item.title}
                    </h4>
                    <p className="font-sans text-sm text-on-surface/80 max-w-md leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Architecture Showcase Card */}
        <div className="relative flex justify-center">
          <div className="brutalist-border brutalist-shadow -rotate-1 overflow-hidden bg-surface max-w-md w-full">
            <div className="p-8 bg-surface-container-low border-b-3 border-on-surface">
              <span className="font-sans font-bold text-xs uppercase bg-primary-container text-on-primary-container px-3 py-1 brutalist-border inline-block mb-4">
                DEVELOPER STANDARD
              </span>
              <h4 className="font-display font-black text-2xl uppercase text-on-surface mb-2">
                PRODUCTION-READY SYSTEMS
              </h4>
              <p className="font-sans text-sm text-on-surface/80 leading-relaxed mb-4">
                Every application is engineered with end-to-end type safety, modern UI responsiveness, and scalable database architecture.
              </p>

              <div className="space-y-2 pt-2 border-t-2 border-on-surface/30">
                <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Next.js 16 App Router & Server Actions</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>MongoDB Atlas + Prisma Type-Safe ORM</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Authenticated NextAuth Security Boundaries</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary-container border-t-3 border-on-surface flex items-center justify-between">
              <p className="font-sans font-bold uppercase text-xs text-on-primary-container">
                Status: Verified Production Standards
              </p>
              <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Rotated Badge */}
          <div className="absolute -top-6 -right-4 md:-right-6 bg-tertiary text-on-tertiary brutalist-border brutalist-shadow px-4 py-2 font-display font-black text-xs uppercase tracking-wider rotate-6">
            100% TYPE-SAFE
          </div>
        </div>

      </div>
    </section>
  );
}
