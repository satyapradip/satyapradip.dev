"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Mail, Send, CheckCircle2, Copy, Check, Loader2, AlertCircle, FileText } from "lucide-react";
import { personalData } from "@/constants/personal";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

/**
 * Contact Component
 * 
 * Provides an interactive contact section featuring:
 * 1. High-impact banner with direct mail CTA, Resume button & email copy feature
 * 2. Accessible message form with loading state, validation, and feedback notifications
 */
export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  
  const [contactInfo, setContactInfo] = useState({
    email: personalData.contact.email,
    phone: personalData.contact.phone,
    resumeUrl: personalData.contact.resumeUrl,
  });

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.profile) {
          setContactInfo((prev) => ({
            email: data.profile.email || prev.email,
            phone: data.profile.phone || prev.phone,
            resumeUrl: data.profile.resumeUrl || prev.resumeUrl,
          }));
        }
      })
      .catch((err) => console.warn("Failed to load contact info from profile API", err));
  }, []);

  /**
   * Copies email address to system clipboard with user feedback
   */
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  /**
   * Form submit handler with real API submission to /api/contact
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill out all required fields.");
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMsg(data.error || "Failed to send message.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact">
      {/* Crimson CTA Banner */}
      <section className="bg-tertiary py-20 md:py-28 text-center text-on-tertiary">
        <RevealOnScroll direction="up" className="w-full max-w-360 mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-[80px] text-on-tertiary leading-none mb-6 uppercase tracking-tighter">
            READY TO<br />BUILD BIG?
          </h2>
          <p className="font-sans text-base md:text-lg text-on-tertiary opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s architect a solution that scales. Stop dealing with technical debt and start shipping production features your users love.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${contactInfo.email}`}
              aria-label={`Send email to ${contactInfo.email}`}
              className="inline-flex items-center gap-3 bg-surface text-on-surface px-8 py-4 brutalist-border brutalist-shadow font-display font-black text-lg uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
            >
              <span>HIRE ME NOW</span>
              <ArrowUpRight className="h-6 w-6 stroke-3" />
            </a>

            <a
              href={`tel:${contactInfo.phone}`}
              aria-label={`Call ${contactInfo.phone}`}
              className="inline-flex items-center gap-2 bg-emerald-400 text-[#18181B] px-6 py-4 brutalist-border brutalist-shadow font-display font-bold text-sm uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
            >
              <span>CALL: {contactInfo.phone}</span>
            </a>

            <a
              href={contactInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Resume PDF"
              className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-6 py-4 brutalist-border brutalist-shadow font-display font-bold text-sm uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
            >
              <FileText className="h-5 w-5 stroke-[2.5]" />
              <span>VIEW RESUME</span>
            </a>

            <button
              onClick={handleCopyEmail}
              aria-label="Copy email address to clipboard"
              className="inline-flex items-center gap-2 bg-secondary-container text-on-surface px-6 py-4 brutalist-border brutalist-shadow font-display font-bold text-sm uppercase hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 text-secondary stroke-3" />
                  <span>COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5 stroke-[2.5]" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>
        </RevealOnScroll>
      </section>

      {/* Direct Contact Form Section */}
      <section className="py-16 md:py-24 w-full max-w-360 mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <RevealOnScroll direction="up" className="max-w-2xl mx-auto bg-surface p-6 md:p-12 brutalist-border brutalist-shadow">
          <h3 className="font-display font-black text-2xl md:text-3xl uppercase text-on-surface mb-2">
            SEND A DIRECT MESSAGE
          </h3>
          <p className="font-sans text-sm text-on-surface/80 mb-8">
            Have a project in mind or an open role? Call me at{" "}
            <a href={`tel:${contactInfo.phone}`} className="font-bold underline text-primary">
              {contactInfo.phone}
            </a>{" "}
            or email directly at{" "}
            <a
              href={`mailto:${contactInfo.email}`}
              className="font-bold underline text-primary focus-visible:outline-none"
            >
              {contactInfo.email}
            </a>
          </p>

          {/* Form Error Banner */}
          {errorMsg && (
            <div className="bg-tertiary-container/30 border-2 border-tertiary p-4 mb-6 flex items-center gap-3 text-tertiary font-sans font-bold text-xs uppercase">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success State */}
          {submitted ? (
            <div className="bg-secondary-container p-8 brutalist-border text-center flex flex-col items-center gap-4">
              <CheckCircle2 className="h-12 w-12 text-secondary stroke-[2.5]" />
              <h4 className="font-display font-black text-2xl text-on-surface uppercase">
                MESSAGE SENT SUCCESSFULLY!
              </h4>
              <p className="font-sans text-sm text-on-surface max-w-md">
                Thank you for reaching out, Satyapradip will review your message and respond within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 font-display font-bold text-xs uppercase bg-surface text-on-surface px-6 py-3 brutalist-border brutalist-shadow-sm brutalist-shadow-hover cursor-pointer"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="contact-name" className="block font-sans font-bold text-xs uppercase mb-2 text-on-surface">
                  YOUR NAME <span className="text-tertiary">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  aria-required="true"
                  placeholder="Satyapradip Das"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-4 bg-surface-container-low brutalist-border font-sans text-sm focus:outline-none focus:bg-primary-container/20 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block font-sans font-bold text-xs uppercase mb-2 text-on-surface">
                  YOUR EMAIL <span className="text-tertiary">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  aria-required="true"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-4 bg-surface-container-low brutalist-border font-sans text-sm focus:outline-none focus:bg-primary-container/20 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-sans font-bold text-xs uppercase mb-2 text-on-surface">
                  PROJECT DETAILS / MESSAGE <span className="text-tertiary">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  aria-required="true"
                  rows={4}
                  placeholder="Tell me about your project, timeline, or open role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-surface-container-low brutalist-border font-sans text-sm focus:outline-none focus:bg-primary-container/20 resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                aria-label="Send Message"
                className="w-full bg-primary-container text-on-primary-container font-sans font-bold text-sm uppercase py-4 brutalist-border brutalist-shadow brutalist-shadow-hover flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <span>SEND MESSAGE</span>
                    <Send className="h-4 w-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          )}
        </RevealOnScroll>
      </section>
    </div>
  );
}
