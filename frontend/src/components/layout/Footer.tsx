"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, CheckCircle2, Code2, Cpu } from "lucide-react";
import { personalData } from "@/constants/personal";

export function Footer() {
  return (
    <footer className="bg-on-surface text-surface py-20 border-t-3 border-surface-variant">
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
        
        {/* Column 1: Brand & Status */}
        <div className="md:col-span-1">
          <Link href="#" className="font-display text-3xl font-black text-surface mb-6 inline-block">
            SATYAPRADIP<span className="text-primary-container">.</span>
          </Link>
          <p className="font-sans text-sm text-surface-variant max-w-xs mb-8 leading-relaxed">
            Full-Stack Developer & AI Engineer building high-performance web applications and resilient backend systems.
          </p>
          <div className="flex items-center gap-3 text-primary-container font-sans font-bold text-xs uppercase tracking-wider">
            <span className="w-3 h-3 bg-secondary-container rounded-full animate-pulse" />
            <span>OPEN FOR ROLES & CONTRACTS</span>
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
                Skills & Stack
              </a>
            </li>
            <li>
              <a className="text-surface-variant hover:text-primary-container transition-colors" href="#projects">
                Featured Projects
              </a>
            </li>
            <li>
              <a className="text-surface-variant hover:text-primary-container transition-colors" href="#process">
                Engineering Philosophy
              </a>
            </li>
            <li>
              <a className="text-surface-variant hover:text-primary-container transition-colors" href="#academic">
                Academic Track
              </a>
            </li>
            <li>
              <a className="text-surface-variant hover:text-primary-container transition-colors" href="#contact">
                Contact & Hire
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Core Specializations */}
        <div>
          <h4 className="font-sans font-bold text-xs uppercase text-primary-container mb-6 tracking-widest">
            CORE DOMAINS
          </h4>
          <ul className="space-y-2.5 font-sans text-sm text-surface-variant">
            <li className="flex items-center gap-2">
              <Code2 className="h-3.5 w-3.5 text-primary-container shrink-0" />
              <span>Full-Stack MERN & Next.js</span>
            </li>
            <li className="flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-primary-container shrink-0" />
              <span>AI / ML & LLM Integrations</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary-container shrink-0" />
              <span>Relational & NoSQL Databases</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary-container shrink-0" />
              <span>AWS Cloud & Docker CI/CD</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Social Icons */}
        <div>
          <h4 className="font-sans font-bold text-xs uppercase text-primary-container mb-6 tracking-widest">
            CONNECT
          </h4>
          <div className="flex gap-3">
            <a
              className="w-12 h-12 brutalist-border border-surface flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all"
              href={personalData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              className="w-12 h-12 brutalist-border border-surface flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all"
              href={personalData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              className="w-12 h-12 brutalist-border border-surface flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all"
              href={`mailto:${personalData.contact.email}`}
              aria-label="Send Email"
              title="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom Row */}
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center border-t border-surface-variant/40 pt-8 gap-4">
        <p className="font-sans font-bold text-xs uppercase opacity-70">
          © {new Date().getFullYear()} SATYAPRADIP DAS. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/admin/login"
            className="font-sans font-bold text-xs uppercase text-surface/70 hover:text-primary-container transition-colors cursor-pointer border-b border-dashed border-surface/40 hover:border-primary-container"
          >
            ADMIN PORTAL 🔒
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-xs uppercase tracking-widest">PRODUCTION GRADE</span>
            <div className="w-8 h-8 bg-secondary-container brutalist-border border-surface rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-on-surface stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
