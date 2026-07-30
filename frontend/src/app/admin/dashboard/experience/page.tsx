"use client";

import React, { useEffect, useState } from "react";
import { Briefcase, Plus, Edit2, Trash2, Save, X, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";

interface ExperienceItem {
  id: string;
  year: string;
  company: string;
  role: string;
  location: string;
  highlights: string[];
  techStack: string[];
  caseStudyUrl?: string | null;
}

export default function ExperienceManagerPage() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    year: "",
    company: "",
    role: "",
    location: "",
    highlights: "",
    techStack: "",
    caseStudyUrl: "",
  });

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/experience");
      const data = await res.json();
      if (data.success) {
        setExperiences(data.experiences);
      }
    } catch (e) {
      console.error("Failed to load experience", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      year: "2024 — Present",
      company: "",
      role: "",
      location: "Kolkata, India",
      highlights: "Reduced API response times by 35%, Architected microservices",
      techStack: "Next.js, Node.js, PostgreSQL, Docker",
      caseStudyUrl: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (item: ExperienceItem) => {
    setEditingItem(item);
    setForm({
      year: item.year,
      company: item.company,
      role: item.role,
      location: item.location,
      highlights: item.highlights ? item.highlights.join("\n") : "",
      techStack: item.techStack ? item.techStack.join(", ") : "",
      caseStudyUrl: item.caseStudyUrl || "",
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      id: editingItem?.id,
      year: form.year,
      company: form.company,
      role: form.role,
      location: form.location,
      highlights: form.highlights.split("\n").map((h) => h.trim()).filter(Boolean),
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      caseStudyUrl: form.caseStudyUrl || null,
    };

    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/admin/experience", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: `Experience ${editingItem ? "updated" : "added"} successfully!` });
        setModalOpen(false);
        fetchExperience();
      } else {
        setMessage({ type: "error", text: data.error || "Operation failed." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this work experience record?")) return;
    try {
      const res = await fetch(`/api/admin/experience?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Experience deleted." });
        fetchExperience();
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete entry." });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 text-xs font-black uppercase tracking-wider mb-1">
            <Briefcase size={16} />
            <span>Career & Work Timeline</span>
          </div>
          <h1 className="text-2xl font-black uppercase text-[#18181B]">Experience Manager</h1>
          <p className="text-xs text-zinc-600 font-medium mt-1">
            Manage your employment history, internships, key achievements, and quantified impact.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchExperience}
            className="p-3 bg-[#FAF6EE] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-zinc-100"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center space-x-2 px-5 py-3 bg-emerald-400 text-[#18181B] font-black text-xs uppercase tracking-wider border-2 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] hover:bg-emerald-300 active:translate-y-0.5 transition-all"
          >
            <Plus size={16} />
            <span>Add Experience</span>
          </button>
        </div>
      </div>

      {/* Alert */}
      {message && (
        <div
          className={`p-4 border-4 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] flex items-center space-x-3 text-xs font-black ${
            message.type === "success" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-12 bg-white border-4 border-[#18181B] text-center font-bold text-xs text-zinc-500">
            Loading timeline...
          </div>
        ) : (
          experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-[#F26522] text-white text-[10px] font-mono font-bold uppercase border border-[#18181B]">
                    {exp.year}
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-500">{exp.location}</span>
                </div>
                <h3 className="text-lg font-black uppercase text-[#18181B]">{exp.role}</h3>
                <p className="text-xs font-black text-emerald-700 uppercase">{exp.company}</p>

                {/* Highlights Bullet List */}
                <ul className="list-disc list-inside text-xs font-medium text-zinc-700 space-y-1 pt-1">
                  {exp.highlights?.map((h, hIdx) => (
                    <li key={hIdx}>{h}</li>
                  ))}
                </ul>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.techStack?.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-[#FAF6EE] border border-[#18181B] text-[10px] font-mono font-bold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 border-t-2 md:border-t-0 md:border-l-2 border-[#18181B] pt-4 md:pt-0 md:pl-6">
                <button
                  onClick={() => openEditModal(exp)}
                  className="p-2.5 bg-[#FAF6EE] border-2 border-[#18181B] hover:bg-[#18181B] hover:text-white"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="p-2.5 bg-rose-100 text-rose-700 border-2 border-[#18181B] hover:bg-rose-600 hover:text-white"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-4 border-[#18181B] shadow-[8px_8px_0px_0px_#F26522] w-full max-w-xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#18181B] pb-3">
              <h2 className="text-xl font-black uppercase">
                {editingItem ? "Edit Experience" : "Add Experience"}
              </h2>
              <button onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Role Title *</label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Period / Year *</label>
                  <input
                    type="text"
                    required
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1">Highlights (One line per bullet)</label>
                <textarea
                  rows={4}
                  value={form.highlights}
                  onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                  className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                  placeholder="Built microservices handling 5k+ records..."
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1">Tech Stack (Comma separated)</label>
                <input
                  type="text"
                  value={form.techStack}
                  onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                  className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                />
              </div>

              <div className="pt-4 border-t-2 border-[#18181B] flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-zinc-200 border-2 border-[#18181B] text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-emerald-400 text-[#18181B] font-black text-xs uppercase border-2 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B]"
                >
                  {saving ? "Saving..." : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
