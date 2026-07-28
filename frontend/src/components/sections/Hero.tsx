"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Code2, FileText, Terminal, Mail, Sparkles } from "lucide-react";
import { personalData } from "@/constants/personal";

/**
 * Hero Component
 * 
 * Displays the primary landing header: name, availability pill, title badge, tagline,
 * profile avatar, commit count badge, and prominent CTA buttons including Resume download.
 */
export function Hero() {
  return (
    <header className="relative overflow-hidden py-12 md:py-24 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 w-full max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-12">
      
      {/* Left Column: Hero Text */}
      <div className="order-2 lg:order-1 lg:col-span-7">
        
        {/* Availability Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-secondary-container text-on-surface brutalist-border mb-6 shadow-xs">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full -ml-5" />
          <span className="font-sans font-bold text-xs uppercase tracking-wider">
            AVAILABLE FOR FULL-STACK & AI ROLES
          </span>
        </div>

        <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.95] tracking-tight mb-6 text-on-surface">
          SATYAPRADIP<br />
          <span className="text-outline-variant italic stroke-on-surface">DAS</span>
        </h1>

        <div className="mb-6 inline-block">
          <h2 className="font-display font-bold text-base sm:text-lg md:text-xl text-on-surface bg-primary-container px-4 py-2 brutalist-border shadow-xs">
            FULL-STACK DEVELOPER / AI-ML ENGINEER
          </h2>
        </div>

        <p className="font-sans text-base sm:text-lg text-on-surface max-w-2xl mb-8 border-l-4 border-on-surface pl-6 py-2 leading-relaxed">
          I have hands-on experience in MERN stack, AWS, and CI/CD, focused on building scalable web and mobile applications with a deep passion for Machine Learning integrations.
        </p>

        {/* Action CTAs: View Code, Resume, Hire Me */}
        <div className="flex flex-wrap gap-4 items-center">
          <a
            className="bg-tertiary text-on-tertiary font-sans font-bold text-sm uppercase px-6 py-3.5 brutalist-border brutalist-shadow brutalist-shadow-hover flex items-center gap-2 cursor-pointer"
            href="#projects"
          >
            <span>VIEW MY CODE</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </a>

          <a
            className="bg-primary-container text-on-primary-container font-sans font-bold text-sm uppercase px-6 py-3.5 brutalist-border brutalist-shadow brutalist-shadow-hover flex items-center gap-2 cursor-pointer"
            href={personalData.contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Resume PDF"
          >
            <FileText className="h-4 w-4 stroke-[2.5]" />
            <span>RESUME</span>
          </a>

          <a
            className="bg-secondary-container text-on-surface font-sans font-bold text-sm uppercase px-6 py-3.5 brutalist-border brutalist-shadow brutalist-shadow-hover flex items-center gap-2 cursor-pointer"
            href="#contact"
          >
            <Mail className="h-4 w-4 stroke-[2.5]" />
            <span>HIRE ME</span>
          </a>
        </div>
      </div>

      {/* Right Column: Avatar & 10K+ Commits Badge */}
      <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end relative">
        <div className="relative">
          {/* Main Avatar Container */}
          <div className="w-64 h-64 md:w-88 md:h-88 lg:w-96 lg:h-96 rounded-full brutalist-border overflow-hidden bg-surface-container-high relative z-10 p-2 bg-surface shadow-md">
            <div className="w-full h-full rounded-full overflow-hidden bg-primary-container/20 flex flex-col items-center justify-center text-center p-6 border-2 border-on-surface">
              <div className="h-28 w-28 md:h-32 md:w-32 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-display font-black text-3xl md:text-4xl border-3 border-on-surface brutalist-shadow mb-2">
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
          <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-primary-container p-4 md:p-5 brutalist-border brutalist-shadow -rotate-6 z-20">
            <p className="font-display font-black text-2xl md:text-3xl leading-tight text-on-surface">
              10K+
            </p>
            <p className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface">
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
