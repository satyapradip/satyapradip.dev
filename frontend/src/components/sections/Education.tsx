"use client";

import React, { useEffect, useState } from "react";
import { educationData } from "@/constants/education";
import { GraduationCap, BookOpen, CheckCircle2 } from "lucide-react";

interface EducationItem {
  id?: string;
  institution: string;
  degree: string;
  cgpa: string;
  period: string;
  highlights?: string[];
}

const coreCoursework = [
  "Data Structures & Algorithms",
  "Artificial Intelligence & Machine Learning",
  "Database Management Systems (SQL & NoSQL)",
  "Operating Systems & Computer Networks",
  "Object-Oriented Programming (OOPs)",
  "Full-Stack Web Architecture & Cloud Systems",
];

export function Education() {
  const [edu, setEdu] = useState<EducationItem>(educationData);

  useEffect(() => {
    fetch("/api/academic")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.education) && data.education.length > 0) {
          setEdu(data.education[0]);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch academic data from API, using fallback:", err);
      });
  }, []);

  return (
    <section className="bg-on-surface py-20 md:py-28 text-surface border-t-3 border-on-surface my-12" id="academic">
      <div className="w-full max-w-360 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Title & Rotated SGPA Badge */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <span className="font-sans text-xs font-black uppercase tracking-wider bg-primary-container text-on-primary-container px-3 py-1 brutalist-border inline-block self-start mb-3">
            HIGHER EDUCATION
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-none mb-8 text-surface tracking-tight">
            ACADEMIC<br />TRACK<br />RECORD
          </h2>
          <div className="bg-primary-container text-on-primary-container p-8 brutalist-border border-surface brutalist-shadow -rotate-3 inline-block self-start">
            <p className="font-display font-black text-5xl md:text-6xl mb-1">
              {edu.cgpa || educationData.cgpa}
            </p>
            <p className="font-sans font-bold text-xs md:text-sm uppercase tracking-wider">
              CUMULATIVE CGPA / 10
            </p>
          </div>
        </div>

        {/* Right Column: University & Coursework Cards */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Degree & University Card */}
          <div className="bg-surface text-on-surface p-8 md:p-10 brutalist-border brutalist-shadow-sm flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 font-display font-black text-xl border-2 border-on-surface">
              <GraduationCap className="h-8 w-8 text-on-secondary" />
            </div>
            <div>
              <span className="font-sans font-bold text-xs uppercase px-2.5 py-1 bg-secondary-container text-on-surface brutalist-border inline-block mb-3">
                BACHELOR OF TECHNOLOGY
              </span>
              <h4 className="font-display font-black text-xl md:text-2xl uppercase mb-2 text-on-surface">
                {edu.institution || educationData.institution}
              </h4>
              <p className="font-sans font-bold text-base text-secondary mb-1">
                {edu.degree || educationData.degree}
              </p>
              <p className="font-sans text-sm text-on-surface/80 mb-4">
                {edu.period || educationData.period} | Overall Score: <span className="font-bold text-on-surface">{edu.cgpa || educationData.cgpa} / 10 CGPA</span>
              </p>
              <p className="font-sans text-sm text-on-surface/80 italic border-l-4 border-secondary-container pl-4 py-1">
                Specialization in Artificial Intelligence & Machine Learning with consistent top academic standing.
              </p>
            </div>
          </div>

          {/* Academic Coursework & Disciplines Card */}
          <div className="bg-surface text-on-surface p-8 md:p-10 brutalist-border brutalist-shadow-sm flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 font-display font-black text-xl border-2 border-on-surface">
              <BookOpen className="h-8 w-8 text-on-tertiary" />
            </div>
            <div className="w-full">
              <h4 className="font-display font-black text-xl md:text-2xl uppercase mb-2 text-on-surface">
                CORE COMPUTER SCIENCE COURSEWORK
              </h4>
              <p className="font-sans text-xs text-secondary uppercase font-bold tracking-wider mb-6">
                THEORETICAL FOUNDATIONS & PRACTICAL APPLICATION
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {coreCoursework.map((course, index) => (
                  <div key={index} className="p-3.5 bg-surface-container-low brutalist-border flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="font-sans font-bold text-xs uppercase text-on-surface">
                      {course}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
