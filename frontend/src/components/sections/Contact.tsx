"use client";

import React, { useState } from "react";
import { ArrowUpRight, Mail, Send, CheckCircle2 } from "lucide-react";
import { personalData } from "@/constants/personal";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div id="contact">
      {/* Crimson CTA Banner */}
      <section className="bg-tertiary py-24 md:py-32 px-5 md:px-20 text-center text-on-tertiary">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-[84px] text-on-tertiary leading-none mb-8 uppercase tracking-tighter">
            READY TO<br />BUILD BIG?
          </h2>
          <p className="font-sans text-base md:text-lg text-on-tertiary opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s architect a solution that scales. Stop dealing with bugs and start shipping features that your users will love.
          </p>
          <a
            href={`mailto:${personalData.contact.email}`}
            className="inline-flex items-center gap-4 bg-surface text-on-surface px-10 py-5 brutalist-border brutalist-shadow font-display font-black text-xl uppercase hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
          >
            <span>HIRE ME</span>
            <ArrowUpRight className="h-7 w-7 stroke-[3]" />
          </a>
        </div>
      </section>

      {/* Direct Contact Form Section */}
      <section className="py-20 px-5 md:px-20 max-w-[1280px] mx-auto">
        <div className="max-w-2xl mx-auto bg-surface p-8 md:p-12 brutalist-border brutalist-shadow">
          <h3 className="font-display font-black text-3xl uppercase text-on-surface mb-2">
            SEND A DIRECT MESSAGE
          </h3>
          <p className="font-sans text-sm text-on-surface/80 mb-8">
            Have a project in mind or an open role? Fill out the form below or email me directly at{" "}
            <a href={`mailto:${personalData.contact.email}`} className="font-bold underline text-primary">
              {personalData.contact.email}
            </a>
          </p>

          {submitted ? (
            <div className="bg-secondary-container p-6 brutalist-border text-center flex flex-col items-center gap-3">
              <CheckCircle2 className="h-10 w-10 text-secondary stroke-[2.5]" />
              <h4 className="font-display font-black text-xl text-on-surface uppercase">
                MESSAGE SENT SUCCESSFULLY!
              </h4>
              <p className="font-sans text-sm text-on-surface">
                Thank you for reaching out. I will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-sans font-bold text-xs uppercase mb-2 text-on-surface">
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Satyapradip Das"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-4 bg-surface-container-low brutalist-border font-sans text-sm focus:outline-none focus:bg-primary-container/20"
                />
              </div>

              <div>
                <label className="block font-sans font-bold text-xs uppercase mb-2 text-on-surface">
                  YOUR EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-4 bg-surface-container-low brutalist-border font-sans text-sm focus:outline-none focus:bg-primary-container/20"
                />
              </div>

              <div>
                <label className="block font-sans font-bold text-xs uppercase mb-2 text-on-surface">
                  PROJECT DETAILS / MESSAGE
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your project, timeline, or open role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-surface-container-low brutalist-border font-sans text-sm focus:outline-none focus:bg-primary-container/20 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-container text-on-primary-container font-sans font-bold text-sm uppercase py-4 brutalist-border brutalist-shadow brutalist-shadow-hover flex items-center justify-center gap-2"
              >
                <span>SEND MESSAGE</span>
                <Send className="h-4 w-4 stroke-[2.5]" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
