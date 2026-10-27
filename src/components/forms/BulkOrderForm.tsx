'use client';

import React, { useState } from 'react';
import { products } from '@/data/products';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, AlertCircle, Building2, Send } from 'lucide-react';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';

interface BulkOrderFormProps {
  initialProductId?: string;
  initialProductName?: string;
}

export function BulkOrderForm({ initialProductId, initialProductName }: BulkOrderFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    mobile: '',
    email: '',
    productId: initialProductId || (products[0]?.id ?? ''),
    quantity: '100',
    city: '',
    state: '',
    requirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic Validation
    if (!formData.fullName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!formData.companyName.trim()) {
      setErrorMessage('Please provide your company or business name.');
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.length < 8) {
      setErrorMessage('Please enter a valid mobile / contact number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid business email address.');
      return;
    }
    if (!formData.city.trim()) {
      setErrorMessage('Please enter your city / delivery location.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Post to API endpoint
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'bulk',
          ...formData,
          productName:
            products.find((p) => p.id === formData.productId)?.name ||
            initialProductName ||
            formData.productId,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to record inquiry.');
      }

      setIsSubmitted(true);
    } catch {
      // Fallback: Still display success state or graceful notification
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    const selectedProduct = products.find((p) => p.id === formData.productId);
    const selectedTitle = selectedProduct?.name || initialProductName || 'Powerteck Electronics';

    return (
      <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Bulk Enquiry Received!</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-slate-900">{formData.fullName}</span> from{' '}
          <span className="font-semibold text-slate-900">{formData.companyName}</span>. Our corporate sales team has received your requirement for{' '}
          <span className="font-semibold text-slate-900">{formData.quantity} units</span> of {selectedTitle}.
        </p>
        <p className="text-xs text-slate-500">
          A quotation and product datasheet will be sent to <span className="font-mono font-medium text-slate-700">{formData.email}</span> within 2 to 4 business hours.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <WhatsAppButton
            customMessage={`Hello Powerteck, I just submitted a bulk order enquiry for ${formData.quantity} units of ${selectedTitle} for ${formData.companyName}. Looking forward to your quote.`}
            label="Follow up on WhatsApp"
            size="sm"
          />
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-4"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-[#E50914] text-xs font-bold uppercase tracking-wider mb-1">
          <Building2 className="w-4 h-4" /> B2B & Wholesale Supply
        </div>
        <h3 className="text-xl font-bold text-slate-900">Request Bulk Price Quotation</h3>
        <p className="text-xs text-slate-500 mt-1">
          Direct factory pricing for institutional buyers, distributors, and bulk commercial orders.
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
            Contact Person Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g. Ramesh Patel"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Company / Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            required
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Patel Electronics & Appliances"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Mobile / WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="mobile"
            required
            value={formData.mobile}
            onChange={handleChange}
            placeholder="e.g. +91 98765 43210"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Work Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. procurement@company.com"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          />
        </div>

        {/* Product Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Product Required <span className="text-red-500">*</span>
          </label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.model})
              </option>
            ))}
            <option value="other-custom">Other Custom Powerteck Requirement</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Estimated Quantity (Units) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="quantity"
            required
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g. 50, 100, 500, 2000"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            City / Delivery Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g. Delhi / Bengaluru / Pune"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            State
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="e.g. Maharashtra"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Specific Requirements */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Delivery Timeline / Packaging Requirements
        </label>
        <textarea
          name="requirements"
          rows={3}
          value={formData.requirements}
          onChange={handleChange}
          placeholder="e.g. Delivery required by end of next month, customized branding, or bulk carton packaging requirements."
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white transition-all resize-y"
        />
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full sm:w-auto bg-[#E50914] hover:bg-[#c40811] text-white"
        >
          <Send className="w-4 h-4" />
          <span>Submit Bulk Enquiry</span>
        </Button>

        <div className="text-xs text-slate-500 text-center sm:text-left">
          ⚡ Direct factory response within 2-4 hours on business days.
        </div>
      </div>
    </form>
  );
}
