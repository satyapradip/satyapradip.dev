"use client";

import React, { useEffect, useState } from "react";
import { Award, ShieldCheck, CheckCircle } from "lucide-react";
import { certificationsData } from "@/constants/certifications";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

interface CertificationItem {
  id?: string;
  title: string;
  issuer: string;
  credentialUrl?: string | null;
}

/**
 * Certifications Component
 * 
 * Displays verified professional certifications in artificial intelligence,
 * cloud architecture, and software engineering.
 */
export function Certifications() {
  const [certs, setCerts] = useState<CertificationItem[]>(certificationsData);

  useEffect(() => {
    fetch("/api/academic")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.certifications) && data.certifications.length > 0) {
          setCerts(data.certifications);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch certifications from API, using fallback:", err);
      });
  }, []);

  return (
    <section id="certifications" className="py-16 md:py-24 w-full max-w-360 mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      {/* Section Header */}
      <RevealOnScroll direction="up">
        <SectionHeading title="CERTIFICATIONS" subtitle="CREDENTIALS & DEGREES" />
      </RevealOnScroll>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {certs.map((cert, index) => (
          <RevealOnScroll key={cert.id || index} direction="up" delay={index * 100}>
            <div className="bg-surface p-6 brutalist-border brutalist-shadow brutalist-shadow-hover flex items-start gap-4 h-full">
              {/* Badge Icon */}
              <div className="p-3 bg-primary-container brutalist-border shrink-0">
                <ShieldCheck className="h-6 w-6 text-on-surface" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-sans text-[10px] font-black uppercase tracking-wider bg-secondary-container px-2 py-0.5 brutalist-border">
                    VERIFIED
                  </span>
                </div>
                <h3 className="font-display font-black text-lg text-on-surface leading-snug">
                  {cert.title}
                </h3>
                <p className="font-sans text-xs font-bold text-secondary uppercase mt-1">
                  ISSUED BY: {cert.issuer}
                </p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-sans text-[11px] font-bold text-primary underline mt-2 hover:opacity-80"
                  >
                    View Credential →
                  </a>
                )}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
