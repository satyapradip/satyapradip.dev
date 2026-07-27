"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, Coffee, CheckCircle2 } from "lucide-react";
import { personalData } from "@/constants/personal";

export function Footer() {
  return (
    <footer className="bg-on-surface text-surface py-20 px-5 md:px-20 border-t-3 border-surface-variant">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
        
        {/* Column 1: Brand & Status */}
        <div className="md:col-span-1">
          <Link href="#" className="font-display text-3xl font-black text-surface mb-6 inline-block">
            SATYAPRADIP<span className="text-primary-container">.</span>
          </Link>
          <p className="font-sans text-sm text-surface-variant max-w-xs mb-8 leading-relaxed">
            A full-stack developer building robust, scalable digital platforms and web applications based in Kolkata.
          </p>
          <div className="flex items-center gap-3 text-primary-container font-sans font-bold text-xs uppercase tracking-wider">
            <span className="w-3 h-3 bg-secondary-container rounded-full animate-pulse" />
            <span>OPEN FOR OFFERS</span>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div>
          <h4 className="font-sans font-bold text-xs uppercase text-primary-container mb-6 tracking-widest">
            NAVIGATION
          </h4>
          <ul className="space-y-3 font-sans text-sm">
            <li>
              <a className="text-surface-variant hover:text-primary-container transition-colors" href="#skills">
                Skills
              </a>
            </li>
            <li>
              <a className="text-surface-variant hover:text-primary-container transition-colors" href="#projects">
                Projects
              </a>
            </li>
            <li>
              <a className="text-surface-variant hover:text-primary-container transition-colors" href="#process">
                Process
              </a>
            </li>
            <li>
              <a className="text-surface-variant hover:text-primary-container transition-colors" href="#academic">
                Academic Track
              </a>
            </li>
            <li>
              <a className="text-surface-variant hover:text-primary-container transition-colors" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Buy Me A Coffee Button */}
        <div>
          <h4 className="font-sans font-bold text-xs uppercase text-primary-container mb-6 tracking-widest">
            SUPPORT
          </h4>
          <button className="bg-primary-container text-on-primary-container p-4 brutalist-border border-surface brutalist-shadow-sm flex items-center gap-3 font-sans font-bold text-xs uppercase hover:translate-y-1 hover:shadow-none transition-all">
            <Coffee className="h-5 w-5 stroke-[2.5]" />
            <span>BUY ME A COFFEE</span>
          </button>
        </div>

        {/* Column 4: Social Icons */}
        <div>
          <h4 className="font-sans font-bold text-xs uppercase text-primary-container mb-6 tracking-widest">
            SOCIALS
          </h4>
          <div className="flex gap-4">
            <a
              className="w-12 h-12 brutalist-border border-surface flex items-center justify-center hover:bg-surface hover:text-on-surface transition-all"
              href={personalData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              className="w-12 h-12 brutalist-border border-surface flex items-center justify-center hover:bg-surface hover:text-on-surface transition-all"
              href={personalData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              className="w-12 h-12 brutalist-border border-surface flex items-center justify-center hover:bg-surface hover:text-on-surface transition-all"
              href={`mailto:${personalData.contact.email}`}
              aria-label="Send Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom Row */}
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center border-t border-surface-variant/40 pt-8">
        <p className="font-sans font-bold text-xs uppercase opacity-70">
          © {new Date().getFullYear()} SATYAPRADIP DAS. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <span className="font-sans font-bold text-xs uppercase tracking-widest">BUILD SOLID</span>
          <div className="w-9 h-9 bg-secondary-container brutalist-border border-surface rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-on-surface stroke-[2.5]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
