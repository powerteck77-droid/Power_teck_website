import React from 'react';
import type { Metadata } from 'next';
import { OEMEnquiryForm } from '@/components/forms/OEMEnquiryForm';
import {
  Cpu,
  Layers,
  Settings2,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Binary,
} from 'lucide-react';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';

export const metadata: Metadata = {
  title: 'OEM & Custom Appliance Manufacturing | Powerteck India',
  description:
    'End-to-end OEM and private-label manufacturing for Air Coolers, Ceiling Fans, BLDC Motors, Mixer Grinders, and Home Appliances in India.',
};

export default function OEMManufacturingPage() {
  const capabilities = [
    {
      title: 'Air Cooler Moulding & Assembly',
      desc: 'High-tonnage injection moulding machines, toughened glass top fittings, dense honeycomb pad assembly, and motorized flap integration.',
      icon: Layers,
    },
    {
      title: '100% Pure Copper Motor Winding',
      desc: 'Precision multi-spindle automatic winding for cooler motors, high-speed 390 RPM fan motors, and heavy-torque 550W–750W mixer grinder motors.',
      icon: Cpu,
    },
    {
      title: 'BLDC Motor & Electronic Drivers',
      desc: 'Turnkey microcontroller-based brushless DC motor driver boards with smart RF remote controls, multi-speed regulation, and LED underlights.',
      icon: Settings2,
    },
    {
      title: 'Kitchen Chimney & Baffle Assemblies',
      desc: 'High-suction 1100–1400 m³/hr chimney motor assemblies, stainless steel baffle filter stamping, and push-button/touch sensor control boards.',
      icon: Flame,
    },
    {
      title: 'Audio Acoustic Cabinet Manufacturing',
      desc: 'CNC routed high-density wooden acoustic enclosures, Bluetooth 5.0 integration, dual subwoofer amplification, and wireless karaoke mic tuning.',
      icon: Binary,
    },
    {
      title: '100% Full-Load & Burn-in QA',
      desc: 'Rigorous electrical dielectric insulation testing, vibration analysis, airflow volume validation (CMM/m³/hr), and thermal stress testing.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E50914] text-xs font-semibold mb-3 border border-red-200">
            <Cpu className="w-3.5 h-3.5" /> OEM & Private-Label Appliance Manufacturing
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Custom Home Appliances Designed & Manufactured in India
          </h1>
          <p className="text-base text-slate-600 mt-4 leading-relaxed">
            From product prototyping and tool mould fabrication to mass assembly and private-label branding, Powerteck partners with leading brands and retail distributors to manufacture dependable, high-volume home appliances.
          </p>
        </div>

        {/* Manufacturing Capabilities Grid */}
        <div className="mb-16">
          <div className="text-xs font-bold text-[#E50914] uppercase tracking-wider mb-2">
            In-House Infrastructure
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
            Comprehensive OEM Capabilities
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3 hover:shadow-md hover:border-slate-300 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-50 text-[#E50914] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{cap.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form and Engagement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <OEMEnquiryForm />
          </div>

          {/* Right: Private Labeling Highlights & NDA Assurance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#292929] text-white rounded-2xl p-7 space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#E50914]">
                Private-Label Branding Options
              </div>
              <h3 className="text-xl font-bold">Brand Customization On Your Terms</h3>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Custom laser engraving or silk-screen branding on metal/plastic enclosures.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Custom printed product packaging boxes, user manuals, and barcode labels.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Custom PCB silkscreen, proprietary firmware strings, and custom output wiring harnesses.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Strict Non-Disclosure Agreement (NDA) ensuring complete IP protection.</span>
                </li>
              </ul>

              <div className="pt-2">
                <WhatsAppButton
                  customMessage="Hello Powerteck, I would like to schedule a private-label OEM discussion for our brand."
                  label="Schedule OEM Call on WhatsApp"
                  className="w-full"
                />
              </div>
            </div>

            {/* Prototype Turnaround Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-3 shadow-xs">
              <h4 className="text-sm font-bold text-slate-900">
                ⚡ Rapid Prototype Turnaround
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                We understand time-to-market is critical. Once specifications are locked, preliminary functional prototypes are assembled and bench-tested within <strong>7 to 10 working days</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
