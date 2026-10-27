'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { products as initialProducts } from '@/data/products';
import { categories } from '@/data/categories';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { formatINR, calculateDiscount } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = productList.filter((p) => {
    if (selectedCategory !== 'all' && p.categoryId !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the catalogue?`)) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
      setNotification(`"${name}" was deleted from catalogue.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const toggleStock = (id: string) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  return (
    <div className="flex flex-col flex-1">
      <AdminHeader
        title="Products Catalogue"
        subtitle={`Managing ${productList.length} active appliance & electronics models`}
        actionButton={
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E50914] hover:bg-[#c40811] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {notification && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notification}</span>
          </div>
        )}

        {/* Search & Category Filter Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, model or SKU..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
            >
              <option value="all">All Categories ({productList.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Product / Model</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">MRP (₹)</th>
                  <th className="py-3.5 px-4">Selling Price (₹)</th>
                  <th className="py-3.5 px-4">Discount</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((product) => {
                  const discount = calculateDiscount(product.mrp, product.sellingPrice);

                  return (
                    <tr key={product.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Product Thumbnail & Model */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0] || 'https://powerteck.in/wp-content/uploads/2026/01/CARNIVAL-90L-265x331.png'}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-contain bg-slate-50 p-1 shrink-0 border border-slate-200"
                          />
                          <div>
                            <div className="font-bold text-slate-900 line-clamp-1 max-w-xs">
                              {product.name}
                            </div>
                            <div className="text-[11px] font-mono font-medium text-slate-500">
                              SKU: {product.model}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {product.categoryName}
                      </td>

                      {/* MRP */}
                      <td className="py-3.5 px-4 font-medium text-slate-500">
                        {formatINR(product.mrp)}
                      </td>

                      {/* Selling Price */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {formatINR(product.sellingPrice)}
                      </td>

                      {/* Discount Badge */}
                      <td className="py-3.5 px-4">
                        {discount > 0 && product.mrp > product.sellingPrice ? (
                          <Badge variant="success">{discount}% OFF</Badge>
                        ) : (
                          <span className="text-slate-400 text-[11px]">—</span>
                        )}
                      </td>

                      {/* Stock Status Toggle */}
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => toggleStock(product.id)}
                          className="cursor-pointer"
                        >
                          {product.inStock ? (
                            <Badge variant="success" className="cursor-pointer hover:opacity-80">
                              <CheckCircle2 className="w-3 h-3" /> In Stock ({product.stockQuantity ?? 100})
                            </Badge>
                          ) : (
                            <Badge variant="warning" className="cursor-pointer hover:opacity-80">
                              Made to Order
                            </Badge>
                          )}
                        </button>
                      </td>

                      {/* Action buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            target="_blank"
                            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                            title="View Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="p-2 text-[#E50914] hover:bg-red-50 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              No products match your filter criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
