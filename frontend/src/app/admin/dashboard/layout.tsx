"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Cpu,
  Briefcase,
  GraduationCap,
  Globe,
  LogOut,
  Menu,
  X,
  Search,
  ShieldCheck,
  Inbox,
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Messages Inbox", href: "/admin/dashboard/messages", icon: Inbox },
  { name: "Profile Manager", href: "/admin/dashboard/profile", icon: User },
  { name: "Projects Manager", href: "/admin/dashboard/projects", icon: FolderKanban },
  { name: "Skills Manager", href: "/admin/dashboard/skills", icon: Cpu },
  { name: "Experience Manager", href: "/admin/dashboard/experience", icon: Briefcase },
  { name: "Academic & Certs", href: "/admin/dashboard/academic", icon: GraduationCap },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#18181B] flex flex-col md:flex-row font-sans selection:bg-[#F26522] selection:text-white">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#18181B] text-white border-b-4 border-[#18181B]">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#F26522] border-2 border-white font-extrabold text-white flex items-center justify-center text-sm">
            SD
          </div>
          <span className="font-bold tracking-tight text-sm uppercase">Admin Portal</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 border-2 border-white bg-[#F26522] text-white active:translate-y-0.5"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#18181B] text-white flex flex-col justify-between border-r-4 border-[#18181B] transition-transform duration-300 transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-zinc-800">
            <Link href="/admin/dashboard" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-[#F26522] border-2 border-white font-extrabold text-white flex items-center justify-center text-lg shadow-[3px_3px_0px_0px_#FFFFFF] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
                SD
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-tight uppercase leading-none text-white">
                  Satyapradip
                </h1>
                <span className="text-[10px] font-mono tracking-widest text-[#F26522] uppercase font-bold">
                  Management Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 border-2 font-bold text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-[#F26522] text-white border-white shadow-[3px_3px_0px_0px_#FFFFFF] translate-x-1"
                      : "bg-[#27272A] text-zinc-300 border-zinc-700 hover:bg-[#3F3F46] hover:text-white hover:border-zinc-500"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-zinc-800 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center space-x-2 w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs border-2 border-zinc-600 shadow-[2px_2px_0px_0px_#52525B] active:translate-y-0.5 transition-transform"
          >
            <Globe size={14} />
            <span>View Public Site</span>
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center justify-center space-x-2 w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs border-2 border-white shadow-[2px_2px_0px_0px_#FFFFFF] active:translate-y-0.5 transition-transform"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b-4 border-[#18181B] shadow-[0px_4px_0px_0px_#18181B]">
          <div className="flex items-center space-x-3 w-72 bg-[#FAF6EE] px-3 py-2 border-2 border-[#18181B] focus-within:ring-2 focus-within:ring-[#F26522]">
            <Search size={16} className="text-zinc-500" />
            <input
              type="text"
              placeholder="Search dashboard..."
              className="bg-transparent text-xs font-semibold text-[#18181B] outline-none w-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-[#F26522]/10 border-2 border-[#F26522] px-3 py-1.5 text-xs font-bold text-[#F26522]">
              <ShieldCheck size={16} />
              <span>Admin Verified</span>
            </div>

            <div className="flex items-center space-x-3 bg-[#FAF6EE] p-1.5 pr-4 border-2 border-[#18181B]">
              <div className="w-8 h-8 bg-[#18181B] text-white font-black flex items-center justify-center text-xs">
                SD
              </div>
              <div className="text-left">
                <p className="text-xs font-black tracking-tight leading-none text-[#18181B]">
                  {session?.user?.name || "Satyapradip Das"}
                </p>
                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  {session?.user?.email || "admin@satyapradip.dev"}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Component */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
