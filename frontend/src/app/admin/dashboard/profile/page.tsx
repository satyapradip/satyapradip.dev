"use client";

import React, { useEffect, useState } from "react";
import { User, Save, CheckCircle2, AlertCircle, RefreshCw, Upload, FileText, Image as ImageIcon, ExternalLink, Loader2 } from "lucide-react";

export default function ProfileManagerPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error" | "warning"; text: string } | null>(null);

  const [form, setForm] = useState({
    name: "",
    role: "",
    tagline: "",
    bio: "",
    photoUrl: "",
    resumeUrl: "",
  });

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      if (data.success && data.profile) {
        setForm({
          name: data.profile.name || "",
          role: data.profile.role || "",
          tagline: data.profile.tagline || "",
          bio: data.profile.bio || "",
          photoUrl: data.profile.photoUrl || "",
          resumeUrl: data.profile.resumeUrl || "",
        });
      }
    } catch (e) {
      console.error("Failed to load profile", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleFileUpload = async (file: File, type: "photo" | "resume") => {
    if (!file) return;

    if (type === "photo") setUploadingPhoto(true);
    else setUploadingResume(true);

    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.url) {
        if (type === "photo") {
          setForm((prev) => ({ ...prev, photoUrl: data.url }));
          setMessage({ type: "success", text: "Photo uploaded successfully! Remember to save changes." });
        } else {
          setForm((prev) => ({ ...prev, resumeUrl: data.url }));
          setMessage({ type: "success", text: "Resume uploaded successfully! Remember to save changes." });
        }
      } else {
        setMessage({ type: "error", text: data.error || "File upload failed." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to upload file." });
    } finally {
      if (type === "photo") setUploadingPhoto(false);
      else setUploadingResume(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        if (data.warning) {
          setMessage({ type: "warning", text: `Profile updated! ${data.warning}` });
        } else {
          setMessage({ type: "success", text: "Profile details updated successfully!" });
        }
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update profile." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "An unexpected error occurred." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#F26522] text-xs font-black uppercase tracking-wider mb-1">
            <User size={16} />
            <span>Identity & Personal Details</span>
          </div>
          <h1 className="text-2xl font-black uppercase text-[#18181B]">Profile Manager</h1>
          <p className="text-xs text-zinc-600 font-medium mt-1">
            Update your public name, tagline, bio summary, upload photo, and attach resume PDF.
          </p>
        </div>

        <button
          onClick={fetchProfile}
          disabled={loading}
          className="p-2 bg-[#FAF6EE] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-[#F26522] hover:text-white transition-colors"
          title="Reload Profile Data"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Alert message */}
      {message && (
        <div
          className={`p-4 border-4 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] flex items-center space-x-3 text-xs font-black ${
            message.type === "success"
              ? "bg-emerald-100 text-emerald-900 border-emerald-900"
              : message.type === "warning"
              ? "bg-amber-100 text-amber-900 border-amber-900"
              : "bg-rose-100 text-rose-900 border-rose-900"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-black uppercase text-[#18181B] mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-[#F26522]"
              placeholder="e.g. SATYAPRADIP DAS"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-black uppercase text-[#18181B] mb-2">
              Title / Primary Role *
            </label>
            <input
              type="text"
              required
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-[#F26522]"
              placeholder="e.g. FULL STACK & AI ENGINEER"
            />
          </div>
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-xs font-black uppercase text-[#18181B] mb-2">
            Hero Tagline *
          </label>
          <input
            type="text"
            required
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-[#F26522]"
            placeholder="Brief punchy summary displayed under your role"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-black uppercase text-[#18181B] mb-2">
            About Me Bio *
          </label>
          <textarea
            required
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-3 text-xs font-bold outline-none focus:ring-2 focus:ring-[#F26522]"
            placeholder="Write a concise paragraph detailing your experience and focus..."
          />
        </div>

        {/* Local File Upload Section */}
        <div className="p-6 bg-[#FAF6EE] border-4 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] space-y-6">
          <h2 className="text-sm font-black uppercase text-[#18181B] tracking-tight flex items-center space-x-2">
            <Upload size={18} className="text-[#F26522]" />
            <span>Local System File Uploads</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Photo Upload Box */}
            <div className="bg-white p-4 border-2 border-[#18181B] space-y-3">
              <label className="block text-xs font-black uppercase text-[#18181B] flex items-center space-x-1.5">
                <ImageIcon size={14} className="text-[#F26522]" />
                <span>Upload Profile Photo</span>
              </label>

              <div className="flex items-center space-x-3">
                {form.photoUrl && (
                  <img
                    src={form.photoUrl}
                    alt="Photo Preview"
                    className="w-12 h-12 object-cover border-2 border-[#18181B]"
                  />
                )}
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center space-x-2 p-2.5 bg-[#FAF6EE] border-2 border-dashed border-[#18181B] hover:bg-[#F26522] hover:text-white transition-colors text-xs font-bold text-[#18181B]">
                    {uploadingPhoto ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        <span>Choose Photo</span>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingPhoto}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, "photo");
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              <input
                type="text"
                value={form.photoUrl}
                onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2 text-[11px] font-mono font-bold"
                placeholder="Or paste photo URL / path"
              />
            </div>

            {/* Resume PDF Upload Box */}
            <div className="bg-white p-4 border-2 border-[#18181B] space-y-3">
              <label className="block text-xs font-black uppercase text-[#18181B] flex items-center space-x-1.5">
                <FileText size={14} className="text-[#F26522]" />
                <span>Upload Resume (PDF / DOC)</span>
              </label>

              <div className="flex items-center space-x-3">
                {form.resumeUrl && (
                  <a
                    href={form.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-[#FAF6EE] border-2 border-[#18181B] text-[#F26522] hover:bg-[#F26522] hover:text-white transition-colors"
                    title="View current resume file"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center space-x-2 p-2.5 bg-[#FAF6EE] border-2 border-dashed border-[#18181B] hover:bg-[#F26522] hover:text-white transition-colors text-xs font-bold text-[#18181B]">
                    {uploadingResume ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload size={16} />
                        <span>Choose Resume File</span>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    disabled={uploadingResume}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, "resume");
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              <input
                type="text"
                value={form.resumeUrl}
                onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                className="w-full bg-[#FAF6EE] border-2 border-[#18181B] p-2 text-[11px] font-mono font-bold"
                placeholder="Or paste resume PDF URL / path"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t-2 border-[#18181B] flex justify-end">
          <button
            type="submit"
            disabled={saving || uploadingPhoto || uploadingResume}
            className="flex items-center space-x-2 px-6 py-3 bg-[#F26522] text-white font-black text-xs uppercase tracking-wider border-2 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] hover:bg-[#d95314] active:translate-y-0.5 transition-all disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? "Saving Changes..." : "Save Profile Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
