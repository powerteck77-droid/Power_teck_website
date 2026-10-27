import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { BulkOrderForm } from '@/components/forms/BulkOrderForm';
import {
  Building2,
  Truck,
  Percent,
  ShieldCheck,
  Headphones,
  FileSpreadsheet,
} from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Bulk Order & Wholesale Procurement | Powerteck India',
  description:
    'Request bulk quantity pricing, distributor supply, and direct factory rates for Air Coolers, Ceiling Fans, and Home Appliances.',
};

export default function BulkOrderPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E50914] text-xs font-semibold mb-3 border border-red-200">
            <Building2 className="w-3.5 h-3.5" /> B2B Wholesale & Distributor Supply
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Direct Factory Bulk Orders & Tiered Wholesale Pricing
          </h1>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            We support retail appliance dealers, wholesale distributors, institutions, and corporate procurement with flexible MOQs, scheduled seasonal deliveries, and direct factory discounts.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Bulk Form */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="p-8 bg-white rounded-2xl">Loading Form...</div>}>
              <BulkOrderForm />
            </Suspense>
          </div>

          {/* Right: B2B Benefits & Procurement FAQs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                Why Procure Direct From Powerteck?
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Volume Slab Discounts</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Transparent slab pricing for 50+, 250+, 1000+, and 5000+ unit orders with guaranteed quarterly price locks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-red-50 text-[#E50914] shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Scheduled JIT Deliveries</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Keep lean inventory. We can hold finished stock and dispatch on your weekly or monthly assembly schedules.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-700 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Batch Inspection Reports</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Every dispatch includes batch test certificates (Hi-Pot, Efficiency, Ripple, and Burn-In QA logs).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-700 shrink-0">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Dedicated Account Manager</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      Single point of contact for purchase orders, GST invoices, logistics tracking, and expedited sample requests.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Procurement Guidelines Card */}
            <div className="bg-[#292929] text-white rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E50914] uppercase tracking-wider">
                <FileSpreadsheet className="w-4 h-4" /> Have an RFP or Bill of Materials?
              </div>
              <h4 className="text-base font-bold">Upload / Email Your BOM Directly</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you have an extensive list of part numbers or custom specifications, email your Excel sheet directly to our sales desk.
              </p>
              <div className="pt-1">
                <a
                  href={`mailto:${siteConfig.salesEmail}?subject=BOM Request for Bulk Procurement`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all"
                >
                  Email: {siteConfig.salesEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
