'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { mockBulkEnquiries, mockOEMEnquiries } from '@/data/mockEnquiries';
import { Badge } from '@/components/ui/Badge';
import {
  Package,
  Layers,
  Inbox,
  Cpu,
  Plus,
  ArrowUpRight,
  Building2,
  MessageSquare,
  Star,
} from 'lucide-react';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';

export default function AdminOverviewPage() {
  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const totalCategories = categories.length;
  const totalBulkEnquiries = mockBulkEnquiries.length;
  const totalOEMEnquiries = mockOEMEnquiries.length;

  const [reviewStats, setReviewStats] = useState<{ total: number; pending: number; approved: number }>({
    total: 0,
    pending: 0,
    approved: 0,
  });

  useEffect(() => {
    fetch('/api/admin/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews && Array.isArray(data.reviews)) {
          const pending = data.reviews.filter((r: { status: string }) => r.status === 'pending').length;
          const approved = data.reviews.filter((r: { status: string }) => r.status === 'approved').length;
          setReviewStats({
            total: data.reviews.length,
            pending,
            approved,
          });
        }
      })
      .catch((err) => {
        console.error('Failed to load review stats in admin overview:', err);
      });
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <AdminHeader
        title="Operations & Catalogue Overview"
        subtitle="Live snapshot of manufacturing inventory, catalogue pricing, customer reviews and incoming B2B inquiries"
        actionButton={
          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/reviews"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Star className="w-4 h-4 fill-white" />
              <span>Reviews ({reviewStats.pending} Pending)</span>
            </Link>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E50914] hover:bg-[#c40811] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Link>
          </div>
        }
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-7xl">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* Card 1: Total Products */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Catalogue
              </span>
              <div className="p-2 rounded-lg bg-red-50 text-[#E50914]">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900">{totalProducts}</span>
              <span className="text-[11px] text-emerald-600 font-semibold">{inStockCount} In Stock</span>
            </div>
            <div className="text-[11px] text-slate-400">
              {totalCategories} active categories
            </div>
          </div>

          {/* Card 2: Bulk Enquiries */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Bulk Orders
              </span>
              <div className="p-2 rounded-lg bg-red-50 text-[#E50914]">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900">{totalBulkEnquiries}</span>
              <Badge variant="warning">Action Needed</Badge>
            </div>
            <div className="text-[11px] text-slate-400">
              Wholesale procurement
            </div>
          </div>

          {/* Card 3: OEM Requests */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                OEM RFPs
              </span>
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Cpu className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900">{totalOEMEnquiries}</span>
              <span className="text-[11px] font-semibold text-[#E50914]">High Priority</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Custom specifications
            </div>
          </div>

          {/* Card 4: Customer Reviews (Real moderation count) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Customer Reviews
              </span>
              <div className="p-2 rounded-lg bg-amber-50 text-amber-500">
                <Star className="w-4 h-4 fill-amber-500" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900">{reviewStats.total}</span>
              {reviewStats.pending > 0 ? (
                <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  {reviewStats.pending} Pending
                </span>
              ) : (
                <span className="text-[11px] text-emerald-600 font-semibold">All Moderated</span>
              )}
            </div>
            <div className="text-[11px] text-slate-400">
              {reviewStats.approved} approved live
            </div>
          </div>

          {/* Card 5: Categories */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Categories
              </span>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900">{totalCategories}</span>
              <span className="text-[11px] text-slate-500 font-medium">All Live</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Appliances & fans
            </div>
          </div>
        </div>

        {/* Two-Column Middle Grid: Recent Enquiries & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Recent Incoming B2B Inquiries */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Recent Incoming Enquiries</h3>
                <p className="text-xs text-slate-500">Latest wholesale quotes and OEM specifications</p>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs font-semibold text-[#E50914] hover:underline"
              >
                View All Enquiries →
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {mockBulkEnquiries.map((enq) => (
                <div key={enq.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{enq.companyName}</span>
                      <Badge variant={enq.status === 'new' ? 'warning' : 'secondary'}>
                        {enq.status.toUpperCase()}
                      </Badge>
                      <span className="text-[11px] text-slate-400">Bulk • {enq.city}</span>
                    </div>
                    <div className="text-xs text-slate-600">
                      Req: <span className="font-semibold text-slate-800">{enq.quantity} units</span> of {enq.productName}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Contact: {enq.fullName} ({enq.mobile})
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <WhatsAppButton
                      phoneNumber={enq.mobile}
                      customMessage={`Hello ${enq.fullName} from ${enq.companyName}, this is regarding your bulk enquiry for ${enq.quantity} units of ${enq.productName}.`}
                      size="sm"
                      label="Reply on WA"
                      className="text-xs px-3 py-1.5"
                    />
                  </div>
                </div>
              ))}

              {mockOEMEnquiries.map((enq) => (
                <div key={enq.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{enq.companyName}</span>
                      <Badge variant="navy">OEM / R&D</Badge>
                      <span className="text-[11px] text-slate-400">{enq.city}</span>
                    </div>
                    <div className="text-xs text-slate-600">
                      Category: <span className="font-semibold text-slate-800">{enq.targetProductCategory}</span> ({enq.estimatedVolumePerMonth})
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Contact: {enq.fullName} ({enq.mobile})
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <WhatsAppButton
                      phoneNumber={enq.mobile}
                      customMessage={`Hello ${enq.fullName} from ${enq.companyName}, our power electronics engineering team has reviewed your OEM requirements for ${enq.targetProductCategory}.`}
                      size="sm"
                      label="Reply on WA"
                      className="text-xs px-3 py-1.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Quick Actions
              </h3>
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/admin/products/new"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4 text-[#E50914]" />
                    <span>Add New Product to Catalogue</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/admin/settings"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Configure WhatsApp Number</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>

                <Link
                  href="/admin/enquiries"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-[#E50914]" />
                    <span>Manage All Inquiries & RFPs</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </div>

            {/* Pricing Logic Rules Info */}
            <div className="bg-[#292929] text-white rounded-2xl p-6 space-y-3 shadow-sm border border-white/5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#E50914]">
                Automated Pricing System
              </div>
              <h4 className="text-base font-bold">INR Commercial Rules Active</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                All prices are verified for non-negative values and strictly validated so Selling Price never exceeds MRP. Fictional discounts are eliminated and hidden when prices match.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
