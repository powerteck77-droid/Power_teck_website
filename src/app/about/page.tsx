import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Factory,
  CheckCircle2,
  Building2,
  Zap,
  Cpu,
} from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';

export const metadata: Metadata = {
  title: 'About Powerteck Electronics | Manufacturing & Quality Standards',
  description:
    'Learn about Powerteck — manufacturer of high-performance air coolers, ceiling fans, mixer grinders, and home appliances in Delhi, India.',
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E50914] text-xs font-semibold mb-3 border border-red-200">
            <Factory className="w-3.5 h-3.5" /> Manufactured In India • Delhi
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Leading Manufacturer of Electronics & Home Appliances
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            {siteConfig.companyName} is dedicated to building heavy-duty, energy-efficient, and aesthetically refined home appliances. From heavy-duty desert air coolers with toughened glass tops to energy-saving BLDC ceiling fans and heavy-duty kitchen mixers, we manufacture products built for Indian household endurance.
          </p>
        </div>

        {/* Manufacturing Facilities & Quality Protocol */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-bold text-[#E50914] uppercase tracking-wider">
              Quality Assurance Infrastructure
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Rigorous 100% Full-Load Testing Protocol
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              In manufacturing home appliances and electronics, field reliability is non-negotiable. Every unit manufactured at Powerteck passes through an automated testing regimen before dispatch:
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Thermal Burn-In Chambers</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Continuous operation under full electrical load at elevated ambient temperatures to identify any component weakness before shipping.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">High-Voltage Dielectric Breakdown (Hi-Pot)</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Testing insulation resistance between motor windings, chassis, and grounding for complete operator safety.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Airflow & RPM Performance Testing</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Validation of motor speed, air displacement (CMM), noise levels, and vibration dampening on every production batch.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 aspect-4/3 relative">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                alt="Powerteck Facility Quality Control Chamber"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#292929]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm font-bold">State-of-the-Art Appliance Manufacturing</div>
                <div className="text-xs text-slate-300">Delhi, India Facility</div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Pillars */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900">Our Core Principles</h3>
            <p className="text-xs text-slate-500 mt-1">Guiding every manufacturing line and client partnership</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E50914] flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Enduring Durability</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Heavy-gauge virgin plastic bodies, pure copper motor windings, and rust-proof hardware designed for long life.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Engineering Transparency</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clear datasheets, verified component ratings, honest price points, and direct manufacturer warranty support.
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Make in India Commitment</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Strengthening local manufacturing with indigenous tooling, local supply chains, and prompt warranty turnaround.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="bg-[#292929] text-white rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Have a Custom Project or High-Volume Requirement?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Discuss your technical specifications with our engineering team or visit our facility in Delhi.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all"
            >
              Contact Sales Team
            </Link>
            <WhatsAppButton
              size="md"
              label="WhatsApp Consultation"
              className="px-5 py-3 text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
