import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { ContactForm } from '@/components/forms/ContactForm';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Building2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Powerteck | Sales, Support & Factory Location',
  description:
    'Get in touch with Powerteck India for sales inquiries, bulk order quotations, OEM partnerships, or technical support.',
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E50914] text-xs font-semibold mb-3 border border-red-200">
            <MessageSquare className="w-3.5 h-3.5" /> Direct Support & Inquiries
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Connect With Our Engineering & Sales Desk
          </h1>
          <p className="text-base text-slate-600 mt-3 leading-relaxed">
            Have questions regarding product compatibility, bulk purchase pricing, or custom OEM manufacturing? Reach out through any of our direct communication channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Contact Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-6">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                Direct Contact Points
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-red-50 text-[#E50914] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Sales & Quotations Phone
                    </div>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-base font-bold text-slate-900 hover:text-[#E50914] transition-colors"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                    <div className="text-xs text-slate-400 mt-0.5">Mon–Sat (9 AM to 6:30 PM IST)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      WhatsApp Quick Support
                    </div>
                    <div className="text-base font-bold text-slate-900">
                      {siteConfig.whatsappDisplay}
                    </div>
                    <div className="mt-2">
                      <WhatsAppButton
                        size="sm"
                        label="Open WhatsApp Chat"
                        className="text-xs px-3 py-1.5"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Email Addresses
                    </div>
                    <div className="text-sm font-semibold text-slate-800">
                      Sales: <a href={`mailto:${siteConfig.salesEmail}`} className="text-[#E50914] hover:underline">{siteConfig.salesEmail}</a>
                    </div>
                    <div className="text-sm font-semibold text-slate-800 mt-0.5">
                      Support: <a href={`mailto:${siteConfig.supportEmail}`} className="text-[#E50914] hover:underline">{siteConfig.supportEmail}</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Manufacturing & Registered Office
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed mt-0.5">
                      {siteConfig.companyName} Electronics India<br />
                      {siteConfig.address.street},<br />
                      {siteConfig.address.city}, {siteConfig.address.state} – {siteConfig.address.pincode}, {siteConfig.address.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Distributorship Notice */}
            <div className="bg-[#292929] text-white rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E50914] uppercase tracking-wider">
                <Building2 className="w-4 h-4" /> Channel Distribution
              </div>
              <h4 className="text-base font-bold">Authorized Dealership Enquiries</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Interested in stocking Powerteck Air Coolers, Fans, and Kitchen Appliances in your region? Mention &quot;Dealership&quot; in the contact form or connect directly with our regional distribution manager.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
