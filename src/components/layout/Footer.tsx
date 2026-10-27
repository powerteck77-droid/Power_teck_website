'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';
import { categories } from '@/data/categories';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';

export function Footer() {
  const pathname = usePathname();

  // Hide public footer in admin portal
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-[#242424] text-slate-300 border-t border-white/10">
      {/* Pre-Footer CTA Banner */}
      <div className="border-b border-white/10 bg-[#292929] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-[#E50914] text-xs font-semibold mb-2 border border-red-500/20">
                <Cpu className="w-3.5 h-3.5" /> OEM & Private Label Appliance Manufacturing
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Looking for Wholesale Supply, OEM Branding or Dealership?
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
                Partner directly with Powerteck for high-volume Air Coolers, Ceiling Fans, Mixer Grinders, and custom electrical appliances.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/oem-manufacturing"
                className="px-5 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#c40811] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm"
              >
                OEM Enquiry Form
              </Link>
              <WhatsAppButton
                variant="whatsapp"
                size="md"
                label="WhatsApp Enquiry"
                className="px-5 py-2.5 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/branding/powerteck-logo-white.png"
                alt="Powerteck Logo"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pr-6">
              {siteConfig.description}
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Pure Copper Motor Winding & Tested Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0" />
                <span>Direct Factory Ex-Pricing & Dedicated Warranty Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Product Catalogue
                </Link>
              </li>
              <li>
                <Link href="/oem-manufacturing" className="hover:text-white transition-colors">
                  OEM Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/bulk-order" className="hover:text-white transition-colors">
                  Bulk Order Enquiry
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Powerteck
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Categories
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Factory & Sales
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                <span>
                  {siteConfig.address.street}, {siteConfig.address.city},{' '}
                  {siteConfig.address.state} – {siteConfig.address.pincode},{' '}
                  {siteConfig.address.country}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E50914] shrink-0" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E50914] shrink-0" />
                <a
                  href={`mailto:${siteConfig.salesEmail}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.salesEmail}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{siteConfig.businessHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 {siteConfig.companyName} Industries India. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-400 transition-colors">
              Terms & Warranty
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/admin" className="text-slate-500 hover:text-slate-300 transition-colors">
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
