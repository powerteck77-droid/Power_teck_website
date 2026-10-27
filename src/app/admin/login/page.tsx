'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@powerteck.in');
  const [password, setPassword] = useState('powerteck2026');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      if (email && password) {
        router.push('/admin');
      } else {
        setErrorMessage('Please provide valid administrator credentials.');
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#292929] text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        {/* Exact Homepage White Logo */}
        <Link href="/" className="inline-block hover:opacity-90 transition-opacity" aria-label="Powerteck Public Site">
          <img
            src="/branding/powerteck-logo-white.png"
            alt="Powerteck"
            className="w-[220px] sm:w-[240px] h-auto max-h-[62px] object-contain mx-auto"
          />
        </Link>
        <div className="pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-slate-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E50914]" />
            <span>Authorized Management Portal</span>
          </div>
          <h2 className="text-xl font-bold text-white pt-2">Sign in to Operations Hub</h2>
          <p className="text-xs text-slate-400 mt-1">
            Product catalog management, wholesale RFPs, customer reviews, and pricing rules.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#242424] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          {errorMessage && (
            <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl flex items-center gap-2.5 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@powerteck.in"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#1e1e1e] border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#1e1e1e] border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                className="w-full text-xs font-bold bg-[#E50914] hover:bg-[#c40811] text-white shadow-md shadow-red-950/40"
              >
                <span>Access Management Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-white/10 text-center space-y-2">
            <div className="text-[11px] text-slate-400">
              Demo Credentials Pre-Filled for Local Evaluation
            </div>
            <Link href="/" className="text-xs text-slate-300 hover:text-white font-semibold flex items-center justify-center gap-1">
              <span>← Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
