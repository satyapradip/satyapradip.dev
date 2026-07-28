"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, FileText, Mail } from "lucide-react";
import { personalData } from "@/constants/personal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * Navbar Component
 * 
 * Provides a sticky top navigation bar with brand logo, smooth-scroll anchor links,
 * action CTA buttons (Resume + Hire Me), and responsive mobile drawer menu using shadcn Sheet.
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-50 bg-surface border-b-3 border-on-surface">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 py-4 max-w-[1440px] mx-auto">
        
        {/* Brand Logo */}
        <Link
          href="#"
          className="font-display text-2xl md:text-3xl font-black tracking-tighter text-on-surface cursor-pointer"
        >
          SATYAPRADIP<span className="text-primary-container">.</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-4 lg:gap-6 items-center">
          <a
            className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface hover:bg-secondary-container transition-colors duration-200 px-3 py-1.5 border-2 border-transparent hover:border-on-surface cursor-pointer"
            href="#about"
          >
            ABOUT
          </a>
          <a
            className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface hover:bg-secondary-container transition-colors duration-200 px-3 py-1.5 border-2 border-transparent hover:border-on-surface cursor-pointer"
            href="#skills"
          >
            SKILLS
          </a>
          <a
            className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface hover:bg-secondary-container transition-colors duration-200 px-3 py-1.5 border-2 border-transparent hover:border-on-surface cursor-pointer"
            href="#experience"
          >
            EXPERIENCE
          </a>
          <a
            className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface hover:bg-secondary-container transition-colors duration-200 px-3 py-1.5 border-2 border-transparent hover:border-on-surface cursor-pointer"
            href="#projects"
          >
            PROJECTS
          </a>
          <a
            className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface hover:bg-secondary-container transition-colors duration-200 px-3 py-1.5 border-2 border-transparent hover:border-on-surface cursor-pointer"
            href="#process"
          >
            PROCESS
          </a>
          <a
            className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface hover:bg-secondary-container transition-colors duration-200 px-3 py-1.5 border-2 border-transparent hover:border-on-surface cursor-pointer"
            href="#academic"
          >
            ACADEMIC
          </a>
        </div>

        {/* Desktop Action Buttons: Resume + Hire Me */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={personalData.contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Resume"
          >
            <button className="font-sans font-bold text-xs uppercase tracking-wider bg-primary-container text-on-primary-container brutalist-border px-4 py-2.5 brutalist-shadow-sm brutalist-shadow-hover flex items-center gap-1.5 cursor-pointer">
              <FileText className="h-4 w-4" /> RESUME
            </button>
          </a>
          <a href="#contact">
            <button className="font-sans font-bold text-xs uppercase tracking-wider bg-secondary-container text-on-surface brutalist-border px-5 py-2.5 brutalist-shadow-sm brutalist-shadow-hover cursor-pointer">
              HIRE ME
            </button>
          </a>
        </div>

        {/* Mobile Hamburger Drawer */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href={personalData.contact.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="font-sans font-bold text-xs uppercase bg-primary-container text-on-primary-container brutalist-border px-3 py-2 brutalist-shadow-sm flex items-center gap-1 cursor-pointer">
              <FileText className="h-3.5 w-3.5" /> RESUME
            </button>
          </a>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="p-2 brutalist-border bg-surface cursor-pointer">
                <Menu className="h-5 w-5 text-on-surface" />
                <span className="sr-only">Toggle Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface border-l-3 border-on-surface w-80 p-6 flex flex-col justify-between">
              <SheetHeader className="text-left border-b-3 border-on-surface pb-4">
                <SheetTitle className="font-display font-black text-xl text-on-surface">
                  SATYAPRADIP<span className="text-primary-container">.</span>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-3 my-6">
                <a
                  href="#about"
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-bold text-base p-2.5 brutalist-border bg-surface hover:bg-secondary-container transition-colors cursor-pointer"
                >
                  ABOUT ME
                </a>
                <a
                  href="#skills"
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-bold text-base p-2.5 brutalist-border bg-surface hover:bg-secondary-container transition-colors cursor-pointer"
                >
                  MY SKILLS
                </a>
                <a
                  href="#experience"
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-bold text-base p-2.5 brutalist-border bg-surface hover:bg-secondary-container transition-colors cursor-pointer"
                >
                  EXPERIENCE
                </a>
                <a
                  href="#projects"
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-bold text-base p-2.5 brutalist-border bg-surface hover:bg-secondary-container transition-colors cursor-pointer"
                >
                  FEATURED WORK
                </a>
                <a
                  href="#process"
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-bold text-base p-2.5 brutalist-border bg-surface hover:bg-secondary-container transition-colors cursor-pointer"
                >
                  MY PROCESS
                </a>
                <a
                  href="#academic"
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-bold text-base p-2.5 brutalist-border bg-surface hover:bg-secondary-container transition-colors cursor-pointer"
                >
                  ACADEMIC RECORD
                </a>
              </nav>

              <div className="pt-4 border-t-3 border-on-surface space-y-3">
                <a
                  href={personalData.contact.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                >
                  <button className="w-full font-display font-bold text-sm uppercase bg-primary-container text-on-primary-container brutalist-border p-3 brutalist-shadow flex items-center justify-center gap-2 cursor-pointer mb-2">
                    <FileText className="h-4 w-4" /> VIEW RESUME
                  </button>
                </a>
                <a href="#contact" onClick={() => setMobileOpen(false)}>
                  <button className="w-full font-display font-bold text-sm uppercase bg-tertiary text-on-tertiary brutalist-border p-3.5 brutalist-shadow cursor-pointer">
                    HIRE ME NOW
                  </button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </nav>
  );
}
