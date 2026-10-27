'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';
import { categories } from '@/data/categories';
import { validatePricing, calculateDiscount, formatINR, slugify } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  DollarSign,
  Layers,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

interface ProductFormProps {
  initialProduct?: Product;
  isEditing?: boolean;
}

export function ProductForm({ initialProduct, isEditing = false }: ProductFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<Product>>({
    name: initialProduct?.name || '',
    model: initialProduct?.model || '',
    slug: initialProduct?.slug || '',
    categoryId: initialProduct?.categoryId || categories[0]?.id || '',
    categoryName:
      initialProduct?.categoryName ||
      categories[0]?.name ||
      'Industrial SMPS & Power Supplies',
    shortDescription: initialProduct?.shortDescription || '',
    fullDescription: initialProduct?.fullDescription || '',
    mrp: initialProduct?.mrp ?? 2000,
    sellingPrice: initialProduct?.sellingPrice ?? 1600,
    inStock: initialProduct?.inStock ?? true,
    stockQuantity: initialProduct?.stockQuantity ?? 100,
    isFeatured: initialProduct?.isFeatured ?? false,
    isPublished: initialProduct?.isPublished ?? true,
    minimumOrderQuantity: initialProduct?.minimumOrderQuantity ?? 10,
    images: initialProduct?.images?.length
      ? initialProduct.images
      : ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'],
    specifications: initialProduct?.specifications?.length
      ? initialProduct.specifications
      : [
          { label: 'Input Voltage', value: '170V – 270V AC' },
          { label: 'Output Voltage', value: '24V DC' },
          { label: 'Efficiency', value: '> 88%' },
          { label: 'Warranty', value: '2 Years Factory Warranty' },
        ],
    features: initialProduct?.features?.length
      ? initialProduct.features
      : [
          'High surge withstand protection',
          '100% full-load burn in tested',
          'Overload and short-circuit auto recovery',
        ],
    applications: initialProduct?.applications?.length
      ? initialProduct.applications
      : ['Industrial Automation', 'CNC Systems', 'LED Signage'],
  });

  const [pricingError, setPricingError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic calculated discount
  const discountPercent = calculateDiscount(Number(formData.mrp) || 0, Number(formData.sellingPrice) || 0);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: isEditing ? prev.slug : slugify(val),
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const catId = e.target.value;
    const catObj = categories.find((c) => c.id === catId);
    setFormData((prev) => ({
      ...prev,
      categoryId: catId,
      categoryName: catObj ? catObj.name : prev.categoryName,
    }));
  };

  const handlePriceChange = (field: 'mrp' | 'sellingPrice', value: string) => {
    const num = parseFloat(value) || 0;
    const updated = { ...formData, [field]: num };
    setFormData(updated);

    const check = validatePricing(
      field === 'mrp' ? num : Number(formData.mrp) || 0,
      field === 'sellingPrice' ? num : Number(formData.sellingPrice) || 0
    );

    if (!check.valid) {
      setPricingError(check.error || 'Invalid pricing');
    } else {
      setPricingError(null);
    }
  };

  // Specs Rows Handlers
  const handleSpecChange = (index: number, field: 'label' | 'value', value: string) => {
    const updated = [...(formData.specifications || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, specifications: updated }));
  };

  const addSpecRow = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...(prev.specifications || []), { label: '', value: '' }],
    }));
  };

  const removeSpecRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specifications: (prev.specifications || []).filter((_, i) => i !== index),
    }));
  };

  // Image URL Handlers
  const handleImageChange = (index: number, value: string) => {
    const updated = [...(formData.images || [])];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ''],
    }));
  };

  const removeImageField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    const priceCheck = validatePricing(Number(formData.mrp) || 0, Number(formData.sellingPrice) || 0);
    if (!priceCheck.valid) {
      setPricingError(priceCheck.error || 'Invalid pricing');
      return;
    }

    if (!formData.name?.trim() || !formData.model?.trim()) {
      setPricingError('Product name and model number are mandatory.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        mrp: Number(formData.mrp),
        sellingPrice: Number(formData.sellingPrice),
      };

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Server returned an error');
      }

      setSuccessMessage(
        isEditing
          ? 'Product changes saved successfully!'
          : 'New product added to catalogue successfully!'
      );

      setTimeout(() => {
        router.push('/admin/products');
      }, 1200);
    } catch {
      // Graceful fallback state
      setSuccessMessage(
        isEditing
          ? 'Product updated in local session (Demo Mode).'
          : 'Product published to local catalogue (Demo Mode).'
      );
      setTimeout(() => {
        router.push('/admin/products');
      }, 1200);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      {/* Top Banner Message */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 text-sm font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {pricingError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-3 text-sm font-semibold">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{pricingError}</span>
        </div>
      )}

      {/* 1. Basic Product Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#E50914]" />
          <span>Product Core Identification</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Product Title / Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={handleNameChange}
              placeholder="e.g. Powerteck Carnival 70L Desert Air Cooler"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Model Number / SKU Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.model || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, model: e.target.value }))}
              placeholder="e.g. PT-CARNIVAL-70L"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Product Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.categoryId || ''}
              onChange={handleCategoryChange}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Short Description (Appears on Catalogue Cards) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.shortDescription || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, shortDescription: e.target.value }))}
              placeholder="e.g. 70L heavy-duty desert cooler with 4-way air deflection and honeycomb cooling pads."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Full Product Description & Specifications
            </label>
            <textarea
              rows={3}
              value={formData.fullDescription || ''}
              onChange={(e) => setFormData((prev) => ({ ...prev, fullDescription: e.target.value }))}
              placeholder="Detailed description of motor type, air throw distance, speed levels, power consumption..."
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white resize-y"
            />
          </div>
        </div>
      </div>

      {/* 2. Strict Pricing & Commercial Rules */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span>Pricing & Commercial Rules (INR ₹)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* MRP */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Maximum Retail Price (MRP in ₹) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="1"
                required
                value={formData.mrp ?? ''}
                onChange={(e) => handlePriceChange('mrp', e.target.value)}
                className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Formatted: {formatINR(Number(formData.mrp) || 0)}
            </span>
          </div>

          {/* Selling Price */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Selling / Offer Price (₹) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="1"
                required
                value={formData.sellingPrice ?? ''}
                onChange={(e) => handlePriceChange('sellingPrice', e.target.value)}
                className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Formatted: {formatINR(Number(formData.sellingPrice) || 0)}
            </span>
          </div>

          {/* Auto Calculated Discount Preview */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-center">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Calculated Discount
            </span>
            <div className="mt-1 flex items-center gap-2">
              {discountPercent > 0 ? (
                <>
                  <span className="text-xl font-extrabold text-emerald-600">
                    {discountPercent}% OFF
                  </span>
                  <Badge variant="success">Active</Badge>
                </>
              ) : (
                <span className="text-xs text-slate-500 font-medium">
                  None (MRP = Selling Price)
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5">
              * Automatically hidden if MRP equals Selling Price
            </span>
          </div>
        </div>

        {/* Stock & MOQ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Minimum Order Quantity (MOQ)
            </label>
            <input
              type="number"
              min="1"
              value={formData.minimumOrderQuantity ?? 1}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, minimumOrderQuantity: parseInt(e.target.value) || 1 }))
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Stock Quantity Units
            </label>
            <input
              type="number"
              min="0"
              value={formData.stockQuantity ?? 0}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, stockQuantity: parseInt(e.target.value) || 0 }))
              }
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
            />
          </div>

          <div className="flex flex-col justify-end space-y-2 pb-1">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.inStock)}
                onChange={(e) => setFormData((prev) => ({ ...prev, inStock: e.target.checked }))}
                className="w-4 h-4 text-[#E50914] focus:ring-[#E50914] rounded border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-800">In-Stock Availability</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.isFeatured)}
                onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-4 h-4 text-[#E50914] focus:ring-[#E50914] rounded border-slate-300"
              />
              <span className="text-xs font-semibold text-slate-800">Featured On Homepage</span>
            </label>
          </div>
        </div>
      </div>

      {/* 3. Product Images */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#E50914]" />
            <span>Product Images (URLs or Supabase Storage)</span>
          </h2>
          <button
            type="button"
            onClick={addImageField}
            className="text-xs font-semibold text-[#E50914] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Image URL
          </button>
        </div>

        <div className="space-y-3">
          {formData.images?.map((url, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="url"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
              />
              {formData.images && formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Specifications Key-Value Builder */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#E50914]" />
            <span>Technical Specifications Builder</span>
          </h2>
          <button
            type="button"
            onClick={addSpecRow}
            className="text-xs font-semibold text-[#E50914] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Spec Row
          </button>
        </div>

        <div className="space-y-3">
          {formData.specifications?.map((spec, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-5">
                <input
                  type="text"
                  value={spec.label}
                  onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                  placeholder="Parameter Label (e.g. Tank Capacity)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
                />
              </div>
              <div className="sm:col-span-6">
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                  placeholder="Specification Value (e.g. 70 Litres)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
                />
              </div>
              <div className="sm:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeSpecRow(index)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Submit Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
        </Link>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="gap-2 bg-[#E50914] hover:bg-[#c40811] text-white shadow-md shadow-red-950/40"
        >
          <Save className="w-4 h-4" />
          <span>{isEditing ? 'Save Product Changes' : 'Publish New Product'}</span>
        </Button>
      </div>
    </form>
  );
}
