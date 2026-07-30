"use client";

import React, { useEffect, useState } from "react";
import { GraduationCap, Award, Plus, Trash2, RefreshCw, CheckCircle2, AlertCircle, ExternalLink, X } from "lucide-react";

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  cgpa: string;
  period: string;
  highlights: string[];
}

interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  credentialUrl?: string | null;
}

export default function AcademicManagerPage() {
  const [activeTab, setActiveTab] = useState<"education" | "certifications">("education");
  const [educationList, setEducationList] = useState<EducationItem[]>([]);
  const [certList, setCertList] = useState<CertificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Education form state
  const [eduForm, setEduForm] = useState({
    institution: "",
    degree: "",
    cgpa: "",
    period: "",
    highlight: "",
  });

  // Certification form state
  const [certForm, setCertForm] = useState({
    title: "",
    issuer: "",
    credentialUrl: "",
  });

  const fetchAcademic = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/academic");
      const data = await res.json();
      if (data.success) {
        setEducationList(data.education);
        setCertList(data.certifications);
      }
    } catch (e) {
      console.error("Failed to load academic records", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAcademic();
  }, []);

  const handleAddEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/academic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "education",
          institution: eduForm.institution,
          degree: eduForm.degree,
          cgpa: eduForm.cgpa,
          period: eduForm.period,
          highlights: [eduForm.highlight],
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Education record added!" });
        setModalOpen(false);
        fetchAcademic();
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleAddCert = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/academic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "certification",
          title: certForm.title,
          issuer: certForm.issuer,
          credentialUrl: certForm.credentialUrl || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Certification record added!" });
        setModalOpen(false);
        fetchAcademic();
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, type: "education" | "certification") => {
    if (!confirm(`Delete this ${type} entry?`)) return;
    try {
      const res = await fetch(`/api/admin/academic?id=${id}&type=${type}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: `${type} deleted.` });
        fetchAcademic();
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete item." });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-black uppercase tracking-wider mb-1">
            <GraduationCap size={16} />
            <span>Degrees & Credentials</span>
          </div>
          <h1 className="text-2xl font-black uppercase text-[#18181B]">Academic & Certifications</h1>
          <p className="text-xs text-zinc-600 font-medium mt-1">
            Manage degree records, academic distinctions (CGPA), and verified professional certifications.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchAcademic}
            className="p-3 bg-[#FAF6EE] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-zinc-100"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center space-x-2 px-5 py-3 bg-indigo-500 text-white font-black text-xs uppercase tracking-wider border-2 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] hover:bg-indigo-400 active:translate-y-0.5 transition-all"
          >
            <Plus size={16} />
            <span>Add {activeTab === "education" ? "Education" : "Certification"}</span>
          </button>
        </div>
      </div>

      {/* Tabs selector */}
      <div className="flex space-x-3">
        <button
          onClick={() => setActiveTab("education")}
          className={`flex items-center space-x-2 px-5 py-2.5 font-black text-xs uppercase border-2 border-[#18181B] transition-all ${
            activeTab === "education"
              ? "bg-[#18181B] text-white shadow-[4px_4px_0px_0px_#F26522]"
              : "bg-white text-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-zinc-100"
          }`}
        >
          <GraduationCap size={16} />
          <span>Education ({educationList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("certifications")}
          className={`flex items-center space-x-2 px-5 py-2.5 font-black text-xs uppercase border-2 border-[#18181B] transition-all ${
            activeTab === "certifications"
              ? "bg-[#18181B] text-white shadow-[4px_4px_0px_0px_#F26522]"
              : "bg-white text-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-zinc-100"
          }`}
        >
          <Award size={16} />
          <span>Certifications ({certList.length})</span>
        </button>
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

      {/* Tab 1: Education Content */}
      {activeTab === "education" && (
        <div className="space-y-4">
          {loading ? (
            <div className="p-12 bg-white border-4 border-[#18181B] text-center font-bold text-xs text-zinc-500">
              Loading education records...
            </div>
          ) : (
            educationList.map((edu) => (
              <div
                key={edu.id}
                className="bg-white border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-900 border border-[#18181B] text-[10px] font-mono font-black">
                      {edu.period}
                    </span>
                    {edu.cgpa && (
                      <span className="px-2 py-0.5 bg-amber-300 text-[#18181B] border border-[#18181B] text-[10px] font-mono font-black">
                        CGPA: {edu.cgpa}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-black uppercase text-[#18181B]">{edu.degree}</h3>
                  <p className="text-xs font-bold text-zinc-600">{edu.institution}</p>
                </div>

                <button
                  onClick={() => handleDelete(edu.id, "education")}
                  className="p-2 bg-rose-100 text-rose-700 border-2 border-[#18181B] hover:bg-rose-600 hover:text-white"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Certifications Content */}
      {activeTab === "certifications" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {loading ? (
            <div className="col-span-2 p-12 bg-white border-4 border-[#18181B] text-center font-bold text-xs text-zinc-500">
              Loading certifications...
            </div>
          ) : (
            certList.map((cert) => (
              <div
                key={cert.id}
                className="bg-white border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] p-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="inline-block px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-mono font-bold uppercase mb-2">
                    Verified Credential
                  </span>
                  <h3 className="text-base font-black uppercase text-[#18181B]">{cert.title}</h3>
                  <p className="text-xs font-bold text-zinc-600 mt-1">Issuer: {cert.issuer}</p>
                </div>

                <div className="pt-3 border-t-2 border-[#18181B] flex items-center justify-between">
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-black text-indigo-600 hover:underline"
                    >
                      <span>Verify Link</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-[10px] text-zinc-400 font-mono">No link provided</span>
                  )}

                  <button
                    onClick={() => handleDelete(cert.id, "certification")}
                    className="p-1.5 bg-rose-100 text-rose-700 border-2 border-[#18181B] hover:bg-rose-600 hover:text-white"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-4 border-[#18181B] shadow-[8px_8px_0px_0px_#F26522] w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#18181B] pb-3">
              <h2 className="text-lg font-black uppercase">
                Add {activeTab === "education" ? "Education Record" : "Certification"}
              </h2>
              <button onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {activeTab === "education" ? (
              <form onSubmit={handleAddEdu} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Degree / Specialization *</label>
                  <input
                    type="text"
                    required
                    value={eduForm.degree}
                    onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                    placeholder="B.Tech Computer Science Engineering (AI & ML)"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Institution Name *</label>
                  <input
                    type="text"
                    required
                    value={eduForm.institution}
                    onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                    placeholder="Brainware University"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">CGPA / Score</label>
                    <input
                      type="text"
                      value={eduForm.cgpa}
                      onChange={(e) => setEduForm({ ...eduForm, cgpa: e.target.value })}
                      className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                      placeholder="9.29"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">Period / Year</label>
                    <input
                      type="text"
                      value={eduForm.period}
                      onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                      className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                      placeholder="2022 — 2026"
                    />
                  </div>
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
                    className="px-5 py-2 bg-indigo-500 text-white font-black text-xs uppercase border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAddCert} className="space-y-4">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Certification Title *</label>
                  <input
                    type="text"
                    required
                    value={certForm.title}
                    onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Issuer *</label>
                  <input
                    type="text"
                    required
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                    placeholder="Amazon Web Services"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Credential Link (URL)</label>
                  <input
                    type="text"
                    value={certForm.credentialUrl}
                    onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2.5 text-xs font-bold"
                    placeholder="https://..."
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
                    className="px-5 py-2 bg-indigo-500 text-white font-black text-xs uppercase border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]"
                  >
                    Save Certification
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
