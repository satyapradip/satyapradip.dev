"use client";

import React, { useEffect, useState } from "react";
import { FolderKanban, Plus, Edit2, Trash2, Star, Save, X, ExternalLink, Github, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string | null;
  techStack: string[];
  features: string[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  imageUrl?: string | null;
  featured: boolean;
  order: number;
}

export default function ProjectsManagerPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    badge: "",
    techStack: "",
    features: "",
    liveUrl: "",
    githubUrl: "",
    imageUrl: "",
    featured: false,
    order: 0,
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (e) {
      console.error("Failed to load projects", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setForm({
      title: "",
      subtitle: "",
      description: "",
      badge: "Full-Stack",
      techStack: "Next.js, TypeScript, Tailwind CSS, Prisma",
      features: "Feature 1, Feature 2, Feature 3",
      liveUrl: "",
      githubUrl: "",
      imageUrl: "",
      featured: true,
      order: projects.length,
    });
    setModalOpen(true);
  };

  const openEditModal = (p: ProjectItem) => {
    setEditingProject(p);
    setForm({
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      badge: p.badge || "",
      techStack: p.techStack ? p.techStack.join(", ") : "",
      features: p.features ? p.features.join(", ") : "",
      liveUrl: p.liveUrl || "",
      githubUrl: p.githubUrl || "",
      imageUrl: p.imageUrl || "",
      featured: p.featured,
      order: p.order || 0,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
      id: editingProject?.id,
      title: form.title,
      subtitle: form.subtitle,
      description: form.description,
      badge: form.badge || null,
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
      liveUrl: form.liveUrl || null,
      githubUrl: form.githubUrl || null,
      imageUrl: form.imageUrl || null,
      featured: form.featured,
      order: Number(form.order) || 0,
    };

    try {
      const method = editingProject ? "PUT" : "POST";
      const res = await fetch("/api/admin/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: `Project ${editingProject ? "updated" : "created"} successfully!` });
        setModalOpen(false);
        fetchProjects();
      } else {
        setMessage({ type: "error", text: data.error || "Operation failed." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "An unexpected error occurred." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project entry?")) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Project deleted successfully." });
        fetchProjects();
      }
    } catch (err: any) {
      setMessage({ type: "error", text: "Failed to delete project." });
    }
  };

  const toggleFeatured = async (p: ProjectItem) => {
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, featured: !p.featured }),
      });
      const data = await res.json();
      if (data.success) {
        fetchProjects();
      }
    } catch (err) {
      console.error("Failed to toggle featured status", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#F26522] text-xs font-black uppercase tracking-wider mb-1">
            <FolderKanban size={16} />
            <span>Portfolio Showcase Management</span>
          </div>
          <h1 className="text-2xl font-black uppercase text-[#18181B]">Projects Manager</h1>
          <p className="text-xs text-zinc-600 font-medium mt-1">
            Add, update, feature, or remove projects displayed in the main showcase and side-scrolling drawer.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchProjects}
            className="p-3 bg-[#FAF6EE] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-zinc-100"
            title="Reload Projects"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center space-x-2 px-5 py-3 bg-[#F26522] text-white font-black text-xs uppercase tracking-wider border-2 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] hover:bg-[#d95314] active:translate-y-0.5 transition-all"
          >
            <Plus size={16} />
            <span>Add New Project</span>
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

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 p-12 bg-white border-4 border-[#18181B] text-center font-bold text-xs text-zinc-500">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-2 p-12 bg-white border-4 border-[#18181B] text-center font-bold text-xs text-zinc-500">
            No project records found. Click "Add New Project" to get started.
          </div>
        ) : (
          projects.map((p) => (
            <div
              key={p.id}
              className="bg-white border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block bg-[#18181B] text-white px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                      {p.badge || "Project"}
                    </span>
                    <h3 className="text-lg font-black uppercase text-[#18181B] leading-tight">{p.title}</h3>
                    <p className="text-xs font-bold text-[#F26522] mt-0.5">{p.subtitle}</p>
                  </div>

                  <button
                    onClick={() => toggleFeatured(p)}
                    className={`p-2 border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] transition-transform active:translate-y-0.5 ${
                      p.featured ? "bg-amber-400 text-[#18181B]" : "bg-zinc-100 text-zinc-400"
                    }`}
                    title={p.featured ? "Featured on Home" : "Click to Feature"}
                  >
                    <Star size={16} className={p.featured ? "fill-[#18181B]" : ""} />
                  </button>
                </div>

                <p className="text-xs font-medium text-zinc-700 mt-3 line-clamp-3 leading-relaxed">
                  {p.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.techStack?.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#FAF6EE] border border-[#18181B] text-[10px] font-mono font-bold text-[#18181B]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t-2 border-[#18181B] flex items-center justify-between">
                <div className="flex items-center space-x-2 text-zinc-500">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="hover:text-[#F26522]">
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="hover:text-[#F26522]">
                      <Github size={16} />
                    </a>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-2 bg-[#FAF6EE] border-2 border-[#18181B] hover:bg-[#18181B] hover:text-white transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 bg-rose-100 border-2 border-[#18181B] text-rose-700 hover:bg-rose-600 hover:text-white transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-4 border-[#18181B] shadow-[8px_8px_0px_0px_#F26522] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[#18181B] pb-4">
              <h2 className="text-xl font-black uppercase text-[#18181B]">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1 hover:bg-zinc-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Subtitle / Impact *</label>
                  <input
                    type="text"
                    required
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Badge (Category)</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                    placeholder="e.g. AI / ML, Full-Stack"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={form.techStack}
                    onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Live Demo URL</label>
                  <input
                    type="text"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">GitHub Repo URL</label>
                  <input
                    type="text"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 text-[#F26522] border-2 border-[#18181B]"
                />
                <label htmlFor="featured" className="text-xs font-black uppercase text-[#18181B]">
                  Featured Project (Shown on home page showcase)
                </label>
              </div>

              <div className="pt-4 border-t-2 border-[#18181B] flex justify-end space-x-3">
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
                  className="px-6 py-2 bg-[#F26522] text-white font-black text-xs uppercase border-2 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B]"
                >
                  {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
