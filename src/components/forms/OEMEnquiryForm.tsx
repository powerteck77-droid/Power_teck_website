'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, AlertCircle, Cpu, Send } from 'lucide-react';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';

export function OEMEnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    mobile: '',
    email: '',
    targetProductCategory: 'Air Coolers & Desert Coolers',
    estimatedVolumePerMonth: '100 - 500 units/mo',
    technicalSpecsRequired: '',
    city: '',
    state: '',
    privateLabelRequired: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.companyName.trim()) {
      setErrorMessage('Please enter your company / brand name.');
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.length < 8) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid corporate email.');
      return;
    }
    if (!formData.technicalSpecsRequired.trim()) {
      setErrorMessage('Please describe the technical specifications or requirements.');
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'oem',
          ...formData,
        }),
      });
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-red-50/60 border border-red-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
        <div className="w-14 h-14 bg-red-100 text-[#E50914] rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">OEM Requirement Submitted</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span>. Our manufacturing engineering team will review your specifications for{' '}
          <span className="font-semibold text-slate-900">{formData.targetProductCategory}</span> and get in touch with feasibility, mould tooling estimates, and prototype lead times.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <WhatsAppButton
            customMessage={`Hello Powerteck, I just submitted an OEM private-label requirement for ${formData.targetProductCategory} (${formData.estimatedVolumePerMonth}) from ${formData.companyName}.`}
            label="Discuss Specs on WhatsApp"
            size="sm"
          />
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-4"
          >
            Submit another OEM enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1">
          <Cpu className="w-4 h-4" /> Engineering & Manufacturing
        </div>
        <h3 className="text-xl font-bold text-slate-900">Submit OEM / Private-Label Specification</h3>
        <p className="text-xs text-slate-500 mt-1">
          From custom cooler moulding to copper motor winding, BLDC driver electronics, and private-label packaging.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Vikram Sen"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Company / Brand Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            required
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Apex Appliances Ltd"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Phone / Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobile"
            required
            value={formData.mobile}
            onChange={handleChange}
            placeholder="e.g. +91 98123 45678"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Corporate Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. procurement@apexappliances.in"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          />
        </div>

        {/* Target Category */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Target Product Category <span className="text-red-500">*</span>
          </label>
          <select
            name="targetProductCategory"
            value={formData.targetProductCategory}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          >
            <option value="Air Coolers & Desert Coolers">Air Coolers & Desert Coolers</option>
            <option value="Decorative & BLDC Ceiling Fans">Decorative & BLDC Ceiling Fans</option>
            <option value="Mixer Grinders & Blenders">Mixer Grinders & Blenders</option>
            <option value="Kitchen Chimneys & Exhaust Systems">Kitchen Chimneys & Exhaust Systems</option>
            <option value="Home Theater & Tower Speakers">Home Theater & Tower Speakers</option>
            <option value="Custom Electric Motors & Coil Winding">Custom Electric Motors & Coil Winding</option>
          </select>
        </div>

        {/* Estimated Volume */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Projected Volume per Month <span className="text-red-500">*</span>
          </label>
          <select
            name="estimatedVolumePerMonth"
            value={formData.estimatedVolumePerMonth}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          >
            <option value="Pilot / Prototyping (< 100 units)">Pilot / Prototyping (&lt; 100 units)</option>
            <option value="100 - 500 units/month">100 - 500 units/month</option>
            <option value="500 - 2,000 units/month">500 - 2,000 units/month</option>
            <option value="2,000 - 10,000 units/month">2,000 - 10,000 units/month</option>
            <option value="10,000+ units/month">10,000+ units/month (High Scale)</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            City / Location
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g. Pune / Chennai / Delhi NCR"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          />
        </div>

        {/* Private Label Checkbox */}
        <div className="flex items-center h-full pt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="privateLabelRequired"
              checked={formData.privateLabelRequired}
              onChange={handleChange}
              className="w-4 h-4 text-[#E50914] rounded border-slate-300 focus:ring-[#E50914]"
            />
            <span className="text-xs font-medium text-slate-700">
              Require custom private-label branding, custom PCB silkscreen & packaging
            </span>
          </label>
        </div>
      </div>

      {/* Technical Specs Required */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Detailed Technical Specifications / Required Features <span className="text-red-500">*</span>
        </label>
        <textarea
          name="technicalSpecsRequired"
          required
          rows={4}
          value={formData.technicalSpecsRequired}
          onChange={handleChange}
          placeholder="Please specify desired appliance type, motor wattage / RPM, tank volume / sweep size, cooling pad type, body color/finish, custom brand logo placement, packaging requirements, and target timeline..."
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all resize-y"
        />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full sm:w-auto"
        >
          <Send className="w-4 h-4" />
          <span>Submit OEM Request</span>
        </Button>

        <div className="text-xs text-slate-500">
          🔒 NDAs can be executed prior to detailed schematic exchange.
        </div>
      </div>
    </form>
  );
}
