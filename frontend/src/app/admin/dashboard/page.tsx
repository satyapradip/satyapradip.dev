"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Cpu,
  Briefcase,
  GraduationCap,
  Plus,
  ExternalLink,
  User,
  Activity,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Inbox,
} from "lucide-react";

interface StatsData {
  totalProjects: number;
  totalSkills: number;
  totalExperience: number;
  totalAcademic: number;
  systemStatus: string;
  dbConnected: boolean;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (e) {
      console.error("Failed to load dashboard stats", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-[#18181B] text-white p-6 sm:p-8 border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#F26522] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="inline-block bg-[#F26522] text-white px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-white mb-2">
            Overview Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
            Welcome back, Satyapradip! 👋
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl font-medium">
            Manage portfolio projects, skills, work experiences, profile details, and educational credentials from your command center.
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2.5 bg-white text-[#18181B] font-bold text-xs border-2 border-[#18181B] shadow-[3px_3px_0px_0px_#F26522] hover:bg-zinc-100 active:translate-y-0.5 transition-all disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-white p-6 border-4 border-[#18181B] shadow-[5px_5px_0px_0px_#18181B] hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black text-zinc-500 uppercase">Projects</span>
            <div className="p-2 bg-[#F26522] text-white border-2 border-[#18181B]">
              <FolderKanban size={20} />
            </div>
          </div>
          <p className="text-3xl font-black text-[#18181B] mt-4">
            {loading ? "..." : stats?.totalProjects ?? 0}
          </p>
          <p className="text-xs font-bold text-zinc-600 mt-1">Total Portfolio Showcase Items</p>
          <Link
            href="/admin/dashboard/projects"
            className="inline-flex items-center text-xs font-black text-[#F26522] mt-4 hover:underline"
          >
            Manage Projects →
          </Link>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-6 border-4 border-[#18181B] shadow-[5px_5px_0px_0px_#18181B] hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black text-zinc-500 uppercase">Skill Items</span>
            <div className="p-2 bg-amber-400 text-[#18181B] border-2 border-[#18181B]">
              <Cpu size={20} />
            </div>
          </div>
          <p className="text-3xl font-black text-[#18181B] mt-4">
            {loading ? "..." : stats?.totalSkills ?? 0}
          </p>
          <p className="text-xs font-bold text-zinc-600 mt-1">Cataloged Technical Skills</p>
          <Link
            href="/admin/dashboard/skills"
            className="inline-flex items-center text-xs font-black text-[#F26522] mt-4 hover:underline"
          >
            Manage Skills →
          </Link>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-6 border-4 border-[#18181B] shadow-[5px_5px_0px_0px_#18181B] hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black text-zinc-500 uppercase">Experience</span>
            <div className="p-2 bg-emerald-400 text-[#18181B] border-2 border-[#18181B]">
              <Briefcase size={20} />
            </div>
          </div>
          <p className="text-3xl font-black text-[#18181B] mt-4">
            {loading ? "..." : stats?.totalExperience ?? 0}
          </p>
          <p className="text-xs font-bold text-zinc-600 mt-1">Work History Timeline Records</p>
          <Link
            href="/admin/dashboard/experience"
            className="inline-flex items-center text-xs font-black text-[#F26522] mt-4 hover:underline"
          >
            Manage Timeline →
          </Link>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-6 border-4 border-[#18181B] shadow-[5px_5px_0px_0px_#18181B] hover:-translate-y-1 transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-black text-zinc-500 uppercase">Academic & Certs</span>
            <div className="p-2 bg-indigo-400 text-[#18181B] border-2 border-[#18181B]">
              <GraduationCap size={20} />
            </div>
          </div>
          <p className="text-3xl font-black text-[#18181B] mt-4">
            {loading ? "..." : stats?.totalAcademic ?? 0}
          </p>
          <p className="text-xs font-bold text-zinc-600 mt-1">Degrees & Verified Credentials</p>
          <Link
            href="/admin/dashboard/academic"
            className="inline-flex items-center text-xs font-black text-[#F26522] mt-4 hover:underline"
          >
            Manage Credentials →
          </Link>
        </div>
      </div>

      {/* Quick Actions & System Health Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions Panel */}
        <div className="lg:col-span-2 bg-white p-6 border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#18181B] pb-4">
            <h2 className="text-lg font-black uppercase text-[#18181B] tracking-tight">Quick Actions</h2>
            <span className="text-xs font-mono font-bold text-zinc-500">Shortcuts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/dashboard/messages"
              className="flex items-center space-x-3 p-4 bg-[#FAF6EE] border-2 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#F26522] hover:text-white transition-colors group"
            >
              <div className="p-2 bg-[#F26522] text-white border border-[#18181B] group-hover:bg-white group-hover:text-[#F26522]">
                <Inbox size={18} />
              </div>
              <div>
                <p className="text-sm font-black uppercase">Visitor Messages Inbox</p>
                <p className="text-xs font-medium text-zinc-600 group-hover:text-white/90">
                  Read & reply to contact submissions
                </p>
              </div>
            </Link>

            <Link
              href="/admin/dashboard/projects?action=new"
              className="flex items-center space-x-3 p-4 bg-[#FAF6EE] border-2 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#18181B] hover:text-white transition-colors group"
            >
              <div className="p-2 bg-[#18181B] text-white border border-[#18181B] group-hover:bg-white group-hover:text-[#18181B]">
                <Plus size={18} />
              </div>
              <div>
                <p className="text-sm font-black uppercase">Add New Project</p>
                <p className="text-xs font-medium text-zinc-600 group-hover:text-white/90">
                  Publish project details & links
                </p>
              </div>
            </Link>

            <Link
              href="/admin/dashboard/profile"
              className="flex items-center space-x-3 p-4 bg-[#FAF6EE] border-2 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#18181B] hover:text-white transition-colors group"
            >
              <div className="p-2 bg-[#18181B] text-white border border-[#18181B] group-hover:bg-white group-hover:text-[#18181B]">
                <User size={18} />
              </div>
              <div>
                <p className="text-sm font-black uppercase">Update Bio & Resume</p>
                <p className="text-xs font-medium text-zinc-600 group-hover:text-white/90">
                  Modify personal summary & photo
                </p>
              </div>
            </Link>

            <Link
              href="/admin/dashboard/skills"
              className="flex items-center space-x-3 p-4 bg-[#FAF6EE] border-2 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-amber-400 transition-colors group"
            >
              <div className="p-2 bg-amber-400 text-[#18181B] border border-[#18181B] group-hover:bg-[#18181B] group-hover:text-white">
                <Cpu size={18} />
              </div>
              <div>
                <p className="text-sm font-black uppercase">Manage Tech Skills</p>
                <p className="text-xs font-medium text-zinc-600">Update categories & skill tags</p>
              </div>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="flex items-center space-x-3 p-4 bg-[#FAF6EE] border-2 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-emerald-400 transition-colors group"
            >
              <div className="p-2 bg-emerald-400 text-[#18181B] border border-[#18181B] group-hover:bg-[#18181B] group-hover:text-white">
                <ExternalLink size={18} />
              </div>
              <div>
                <p className="text-sm font-black uppercase">Preview Public Site</p>
                <p className="text-xs font-medium text-zinc-600">Open website in a new tab</p>
              </div>
            </Link>
          </div>
        </div>

        {/* System Health Panel */}
        <div className="bg-white p-6 border-4 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#18181B] pb-4">
            <h2 className="text-lg font-black uppercase text-[#18181B] tracking-tight">System Health</h2>
            <Activity size={20} className="text-[#F26522]" />
          </div>

          <div className="space-y-4 text-xs font-bold">
            {/* Status 1 */}
            <div className="flex items-center justify-between p-3 bg-[#FAF6EE] border-2 border-[#18181B]">
              <span className="text-zinc-600">Database Driver</span>
              <span className="flex items-center space-x-1.5 text-emerald-700 font-black">
                <CheckCircle2 size={14} />
                <span>MongoDB Prisma</span>
              </span>
            </div>

            {/* Status 2 */}
            <div className="flex items-center justify-between p-3 bg-[#FAF6EE] border-2 border-[#18181B]">
              <span className="text-zinc-600">Authentication</span>
              <span className="flex items-center space-x-1.5 text-emerald-700 font-black">
                <CheckCircle2 size={14} />
                <span>NextAuth Credentials</span>
              </span>
            </div>

            {/* Status 3 */}
            <div className="flex items-center justify-between p-3 bg-[#FAF6EE] border-2 border-[#18181B]">
              <span className="text-zinc-600">System Mode</span>
              <span className="flex items-center space-x-1.5 text-[#F26522] font-black uppercase">
                {stats?.dbConnected ? "MongoDB Active" : "Fallback Active"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
