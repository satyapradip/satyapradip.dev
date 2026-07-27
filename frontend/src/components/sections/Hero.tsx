"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Code2, Terminal } from "lucide-react";
import { personalData } from "@/constants/personal";

export function Hero() {
  return (
    <header className="relative overflow-hidden py-16 md:py-28 px-5 md:px-20 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
      
      {/* Left Column: Hero Text */}
      <div className="order-2 lg:order-1">
        <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.95] tracking-tight mb-6 text-on-surface">
          SATYAPRADIP<br />
          <span className="text-outline-variant italic stroke-on-surface">DAS</span>
        </h1>

        <div className="mb-8 inline-block">
          <h2 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-on-surface bg-primary-container px-4 py-2 brutalist-border shadow-xs">
            FULL-STACK DEVELOPER / AI-ML ENGINEER
          </h2>
        </div>

        <p className="font-sans text-base sm:text-lg text-on-surface max-w-xl mb-10 border-l-4 border-on-surface pl-6 py-2 leading-relaxed">
          I have hands-on experience in MERN stack, AWS, and CI/CD, focused on building scalable web and mobile applications with a deep passion for Machine Learning integrations.
        </p>

        <div className="flex flex-wrap gap-6 items-center">
          <a
            className="bg-tertiary text-on-tertiary font-sans font-bold text-sm uppercase px-8 py-4 brutalist-border brutalist-shadow brutalist-shadow-hover flex items-center gap-3"
            href="#projects"
          >
            VIEW MY CODE
            <ArrowRight className="h-5 w-5 stroke-[2.5]" />
          </a>
          <a
            className="bg-secondary-container text-on-surface font-sans font-bold text-sm uppercase px-8 py-4 brutalist-border brutalist-shadow brutalist-shadow-hover flex items-center gap-3"
            href="#academic"
          >
            ACADEMIC RECORD
          </a>
        </div>
      </div>

      {/* Right Column: Avatar & 10K+ Commits Badge */}
      <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
        <div className="relative">
          {/* Main Avatar Container */}
          <div className="w-64 h-64 md:w-96 md:h-96 rounded-full brutalist-border overflow-hidden bg-surface-container-high relative z-10 p-2 bg-surface shadow-md">
            <div className="w-full h-full rounded-full overflow-hidden bg-primary-container/20 flex flex-col items-center justify-center text-center p-6 border-2 border-on-surface">
              <div className="h-32 w-32 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-display font-black text-4xl border-3 border-on-surface brutalist-shadow mb-2">
                SD
              </div>
              <h3 className="font-display font-black text-xl text-on-surface uppercase">
                Satyapradip Das
              </h3>
              <p className="font-sans text-xs font-bold text-secondary uppercase mt-1">
                Kolkata, India
              </p>
            </div>
          </div>

          {/* 10K+ Commits Rotated Badge */}
          <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 bg-primary-container p-5 md:p-6 brutalist-border brutalist-shadow -rotate-6 z-20">
            <p className="font-display font-black text-2xl md:text-3xl leading-tight text-on-surface">
              10K+
            </p>
            <p className="font-sans font-bold text-xs md:text-sm uppercase tracking-wider text-on-surface">
              COMMITS
            </p>
          </div>

          {/* Animated Spinning Dashed Decorative Circle */}
          <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border-4 border-dashed border-primary opacity-40 animate-spin-slow pointer-events-none" />
        </div>
      </div>

    </header>
  );
}
