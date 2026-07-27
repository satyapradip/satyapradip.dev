"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-50 bg-surface border-b-3 border-on-surface">
      <div className="flex justify-between items-center w-full px-5 md:px-20 py-4 max-w-[1280px] mx-auto">
        
        {/* Brand Logo */}
        <Link
          href="#"
          className="font-display text-2xl md:text-3xl font-black tracking-tighter text-on-surface"
        >
          SATYAPRADIP<span className="text-primary-container">.</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          <a
            className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface hover:bg-secondary-container transition-colors duration-200 px-3 py-1.5 border-2 border-transparent hover:border-on-surface"
            href="#skills"
          >
            SKILLS
          </a>
          <a
            className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface hover:bg-secondary-container transition-colors duration-200 px-3 py-1.5 border-2 border-transparent hover:border-on-surface"
            href="#projects"
          >
            PROJECTS
          </a>
          <a
            className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface hover:bg-secondary-container transition-colors duration-200 px-3 py-1.5 border-2 border-transparent hover:border-on-surface"
            href="#process"
          >
            PROCESS
          </a>
          <a
            className="font-sans font-bold text-xs uppercase tracking-wider text-on-surface hover:bg-secondary-container transition-colors duration-200 px-3 py-1.5 border-2 border-transparent hover:border-on-surface"
            href="#academic"
          >
            ACADEMIC
          </a>
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <a href="#contact">
            <button className="font-sans font-bold text-xs uppercase tracking-wider bg-secondary-container text-on-surface brutalist-border px-6 py-2.5 brutalist-shadow-sm brutalist-shadow-hover">
              HIRE ME
            </button>
          </a>
        </div>

        {/* Mobile Hamburger Drawer */}
        <div className="md:hidden flex items-center gap-3">
          <a href="#contact">
            <button className="font-sans font-bold text-xs uppercase bg-secondary-container text-on-surface brutalist-border px-4 py-2 brutalist-shadow-sm">
              HIRE ME
            </button>
          </a>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="p-2 brutalist-border bg-surface">
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

              <nav className="flex flex-col gap-4 my-8">
                <a
                  href="#skills"
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-bold text-lg p-3 brutalist-border bg-surface hover:bg-secondary-container transition-colors"
                >
                  MY SKILLS
                </a>
                <a
                  href="#projects"
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-bold text-lg p-3 brutalist-border bg-surface hover:bg-secondary-container transition-colors"
                >
                  FEATURED WORK
                </a>
                <a
                  href="#process"
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-bold text-lg p-3 brutalist-border bg-surface hover:bg-secondary-container transition-colors"
                >
                  MY PROCESS
                </a>
                <a
                  href="#academic"
                  onClick={() => setMobileOpen(false)}
                  className="font-display font-bold text-lg p-3 brutalist-border bg-surface hover:bg-secondary-container transition-colors"
                >
                  ACADEMIC RECORD
                </a>
              </nav>

              <div className="pt-4 border-t-3 border-on-surface">
                <a href="#contact" onClick={() => setMobileOpen(false)}>
                  <button className="w-full font-display font-bold text-sm uppercase bg-tertiary text-on-tertiary brutalist-border p-4 brutalist-shadow">
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
