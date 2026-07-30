"use client";

import React, { useEffect, useState } from "react";
import { Cpu, Plus, Trash2, Save, RefreshCw, CheckCircle2, AlertCircle, X } from "lucide-react";

interface SkillCategoryItem {
  id: string;
  title: string;
  iconName: string;
  skills: string[];
}

export default function SkillsManagerPage() {
  const [categories, setCategories] = useState<SkillCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    title: "",
    iconName: "Code",
    skillsInput: "",
  });

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/skills");
      const data = await res.json();
      if (data.success) {
        setCategories(data.skillCategories);
      }
    } catch (e) {
      console.error("Failed to load skills", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const skillsArray = form.skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          iconName: form.iconName,
          skills: skillsArray,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Skill category added successfully!" });
        setModalOpen(false);
        fetchSkills();
      } else {
        setMessage({ type: "error", text: data.error || "Failed to create category." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Delete this skill category?")) return;
    try {
      const res = await fetch(`/api/admin/skills?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Skill category deleted." });
        fetchSkills();
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete category." });
    }
  };

  const handleAddSkillToCategory = async (cat: SkillCategoryItem, newSkill: string) => {
    if (!newSkill.trim()) return;
    const updatedSkills = Array.from(new Set([...cat.skills, newSkill.trim()]));
    try {
      const res = await fetch("/api/admin/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...cat, skills: updatedSkills }),
      });
      const data = await res.json();
      if (data.success) {
        fetchSkills();
      }
    } catch (err) {
      console.error("Failed to update skills", err);
    }
  };

  const handleRemoveSkillFromCategory = async (cat: SkillCategoryItem, skillToRemove: string) => {
    const updatedSkills = cat.skills.filter((s) => s !== skillToRemove);
    try {
      const res = await fetch("/api/admin/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...cat, skills: updatedSkills }),
      });
      const data = await res.json();
      if (data.success) {
        fetchSkills();
      }
    } catch (err) {
      console.error("Failed to remove skill", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-600 text-xs font-black uppercase tracking-wider mb-1">
            <Cpu size={16} />
            <span>Technical Capabilities</span>
          </div>
          <h1 className="text-2xl font-black uppercase text-[#18181B]">Skills Manager</h1>
          <p className="text-xs text-zinc-600 font-medium mt-1">
            Group skills into category groups (Languages, Frontend, Backend, AI/ML, DevOps, Databases).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchSkills}
            className="p-3 bg-[#FAF6EE] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-zinc-100"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => {
              setForm({ title: "", iconName: "Code", skillsInput: "" });
              setModalOpen(true);
            }}
            className="flex items-center space-x-2 px-5 py-3 bg-amber-400 text-[#18181B] font-black text-xs uppercase tracking-wider border-2 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] hover:bg-amber-300 active:translate-y-0.5 transition-all"
          >
            <Plus size={16} />
            <span>Add Category</span>
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

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 p-12 bg-white border-4 border-[#18181B] text-center font-bold text-xs text-zinc-500">
            Loading technical skills...
          </div>
        ) : (
          categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b-2 border-[#18181B] pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-amber-400 border-2 border-[#18181B] flex items-center justify-center font-black text-[#18181B]">
                    ⚡
                  </div>
                  <h3 className="font-black text-sm uppercase text-[#18181B]">{cat.title}</h3>
                </div>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-1.5 bg-rose-100 text-rose-700 border-2 border-[#18181B] hover:bg-rose-600 hover:text-white"
                  title="Delete category"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-[#FAF6EE] border-2 border-[#18181B] text-xs font-mono font-bold text-[#18181B]"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkillFromCategory(cat, skill)}
                      className="hover:text-rose-600 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Inline Add Skill Input */}
              <div className="pt-3 border-t border-zinc-200 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Add skill tag..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSkillToCategory(cat, (e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                  className="flex-1 bg-[#FAF6EE] border-2 border-[#18181B] p-2 text-xs font-bold"
                />
                <span className="text-[10px] text-zinc-400 font-mono font-bold">Press Enter</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-4 border-[#18181B] shadow-[8px_8px_0px_0px_#F26522] w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#18181B] pb-3">
              <h2 className="text-lg font-black uppercase">Add Skill Category</h2>
              <button onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase mb-1">Category Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                  placeholder="e.g. AI & Machine Learning"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={form.skillsInput}
                  onChange={(e) => setForm({ ...form, skillsInput: e.target.value })}
                  className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                  placeholder="PyTorch, TensorFlow, LangChain, OpenAI"
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
                  className="px-5 py-2 bg-amber-400 text-[#18181B] font-black text-xs uppercase border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
