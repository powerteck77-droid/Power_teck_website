'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { siteConfig } from '@/lib/siteConfig';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import {
  MessageSquare,
  Database,
  CheckCircle2,
  AlertTriangle,
  Save,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    whatsappNumber: siteConfig.whatsappNumber,
    whatsappDisplay: siteConfig.whatsappDisplay,
    phone: siteConfig.phone,
    phoneDisplay: siteConfig.phoneDisplay,
    salesEmail: siteConfig.salesEmail,
    supportEmail: siteConfig.supportEmail,
    street: siteConfig.address.street,
    city: siteConfig.address.city,
    state: siteConfig.address.state,
    pincode: siteConfig.address.pincode,
  });

  const [savedNotification, setSavedNotification] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  return (
    <div className="flex flex-col flex-1">
      <AdminHeader
        title="Admin & Communication Settings"
        subtitle="Configure business WhatsApp click-to-chat numbers, factory details, and database connections"
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-4xl">
        {savedNotification && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 text-xs font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Settings updated in local session successfully!</span>
          </div>
        )}

        {/* 1. WhatsApp Configuration Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <span>WhatsApp Click-to-Chat Configuration</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              All &quot;Buy Now&quot; and consultation triggers on product pages direct to this configured number.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                WhatsApp API Number (E.164, without &apos;+&apos; or spaces) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                placeholder="e.g. 919876543210"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Target URL: https://wa.me/{settings.whatsappNumber}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Display Format Label
              </label>
              <input
                type="text"
                value={settings.whatsappDisplay}
                onChange={(e) => setSettings({ ...settings, whatsappDisplay: e.target.value })}
                placeholder="e.g. +91 98765 43210"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Direct Phone & Email Contacts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Voice Call Phone Number
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Sales Desk Email
                </label>
                <input
                  type="email"
                  value={settings.salesEmail}
                  onChange={(e) => setSettings({ ...settings, salesEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Factory & Dispatch Address
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Street / Industrial Plot
                </label>
                <input
                  type="text"
                  value={settings.street}
                  onChange={(e) => setSettings({ ...settings, street: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">City</label>
                <input
                  type="text"
                  value={settings.city}
                  onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">State</label>
                <input
                  type="text"
                  value={settings.state}
                  onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Pincode</label>
                <input
                  type="text"
                  value={settings.pincode}
                  onChange={(e) => setSettings({ ...settings, pincode: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" size="md" className="gap-2 bg-[#E50914] hover:bg-[#c40811] text-white shadow-xs">
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </Button>
          </div>
        </form>

        {/* 2. Supabase Integration Readiness Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Database className="w-5 h-5 text-[#E50914]" />
                <span>Supabase PostgreSQL & Storage Status</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Integration status of remote persistence, Auth, and media storage
              </p>
            </div>

            <div
              className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                isSupabaseConfigured
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}
            >
              {isSupabaseConfigured ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Configured & Active</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Local Mock Mode Active</span>
                </>
              )}
            </div>
          </div>

          <div className="text-xs text-slate-600 space-y-3">
            <p>
              To connect your live Supabase cloud database, provide the environment variables in your local <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-900">.env.local</code> file:
            </p>

            <pre className="bg-[#292929] text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-white/5">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
`}
            </pre>

            <p className="text-[11px] text-slate-400">
              🔒 Security Rule: Service-role credentials must never be prefixed with <code>NEXT_PUBLIC_</code> or exposed to browser client components.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
