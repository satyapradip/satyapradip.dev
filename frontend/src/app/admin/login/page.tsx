"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ArrowLeft, ShieldCheck, AlertCircle, Loader2, Github } from "lucide-react";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (result?.error) {
        setErrorMsg("Invalid credentials. Check your email & password.");
        setIsLoading(false);
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGitHubLogin = () => {
    setIsLoading(true);
    signIn("github", { callbackUrl });
  };

  return (
    <div className="w-full max-w-md bg-[#faf8ff] border-3 border-[#1c1b1f] rounded-2xl p-8 shadow-[8px_8px_0px_0px_#1c1b1f] relative overflow-hidden transition-all">
      {/* Top Header Badge */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-[#1c1b1f]">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#1c1b1f] text-white rounded-lg">
            <ShieldCheck className="w-5 h-5 text-[#f5a623]" />
          </div>
          <div>
            <h1 className="font-headline font-bold text-lg text-[#1c1b1f] tracking-wide uppercase">
              Admin Portal
            </h1>
            <p className="text-xs text-stone-600 font-mono">SATYAPRADIP.DEV</p>
          </div>
        </div>
        <span className="px-2.5 py-1 text-[11px] font-bold bg-[#f5a623]/20 text-[#bd0041] border border-[#1c1b1f] rounded-full uppercase tracking-wider">
          RESTRICTED
        </span>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-xl flex items-start gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-sm font-medium leading-snug">{errorMsg}</p>
        </div>
      )}

      {/* Credentials Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-[#1c1b1f] uppercase tracking-wider mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@satyapradip.dev"
              required
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-[#1c1b1f] rounded-xl text-sm font-medium text-[#1c1b1f] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#bd0041] shadow-[2px_2px_0px_0px_#1c1b1f] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1c1b1f] uppercase tracking-wider mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full pl-10 pr-11 py-3 bg-white border-2 border-[#1c1b1f] rounded-xl text-sm font-medium text-[#1c1b1f] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#bd0041] shadow-[2px_2px_0px_0px_#1c1b1f] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-[#1c1b1f] focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 bg-[#1c1b1f] hover:bg-[#bd0041] text-white font-bold text-sm tracking-wider uppercase rounded-xl border-2 border-[#1c1b1f] shadow-[4px_4px_0px_0px_#f5a623] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#f5a623] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#f5a623]" />
              Authenticating...
            </>
          ) : (
            "Authenticate Session"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-stone-300"></div>
        </div>
        <span className="relative px-3 bg-[#faf8ff] text-xs font-bold text-stone-500 uppercase tracking-widest">
          OR
        </span>
      </div>

      {/* GitHub OAuth Button */}
      <button
        type="button"
        onClick={handleGitHubLogin}
        disabled={isLoading}
        className="w-full py-3 px-4 bg-white hover:bg-stone-100 text-[#1c1b1f] font-bold text-xs tracking-wider uppercase rounded-xl border-2 border-[#1c1b1f] shadow-[3px_3px_0px_0px_#1c1b1f] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1c1b1f] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
      >
        <Github className="w-4 h-4" />
        Sign In with GitHub
      </button>

      {/* Return to Landing Page */}
      <div className="mt-8 pt-4 border-t border-stone-200 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-[#bd0041] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Public Portfolio
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-[#f4f0eb] flex items-center justify-center p-4 relative overflow-hidden selection:bg-[#f5a623] selection:text-black">
      {/* Background Subtle Spotlight Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#f5a623]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#bd0041]/10 rounded-full blur-3xl pointer-events-none" />

      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white border-2 border-[#1c1b1f] rounded-2xl p-8 shadow-[6px_6px_0px_0px_#1c1b1f] text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#1c1b1f]" />
            <p className="mt-4 text-xs font-bold text-stone-600 uppercase">Loading Auth Interface...</p>
          </div>
        }
      >
        <LoginFormContent />
      </Suspense>
    </main>
  );
}
