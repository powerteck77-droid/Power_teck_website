'use client';

import React, { useState } from 'react';
import { categories as initialCategories } from '@/data/categories';
import { products } from '@/data/products';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/Button';
import { Plus, Layers, Trash2, CheckCircle2 } from 'lucide-react';
import { slugify } from '@/lib/utils';

export default function AdminCategoriesPage() {
  const [categoryList, setCategoryList] = useState(initialCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  });
  const [notification, setNotification] = useState<string | null>(null);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;

    const created = {
      id: `cat-${Date.now()}`,
      name: newCategory.name,
      slug: slugify(newCategory.name),
      description: newCategory.description,
      imageUrl: newCategory.imageUrl,
      productCount: 0,
    };

    setCategoryList((prev) => [...prev, created]);
    setShowAddModal(false);
    setNewCategory({
      name: '',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    });
    setNotification(`Category "${created.name}" created.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDeleteCategory = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      setCategoryList((prev) => prev.filter((c) => c.id !== id));
      setNotification(`Category "${name}" removed.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <AdminHeader
        title="Category Management"
        subtitle="Manage product groupings, descriptions, and catalog taxonomy"
        actionButton={
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
            className="gap-1.5 bg-[#E50914] hover:bg-[#c40811] text-white shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create Category</span>
          </Button>
        }
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {notification && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notification}</span>
          </div>
        )}

        {/* Add Category Modal / Form Drawer */}
        {showAddModal && (
          <form
            onSubmit={handleAddCategory}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-4 max-w-2xl"
          >
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#E50914]" />
              <span>Create New Product Category</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newCategory.name}
                onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Desert Air Coolers"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description / Purpose
              </label>
              <textarea
                rows={2}
                value={newCategory.description}
                onChange={(e) => setNewCategory((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Brief summary of products in this category..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Header Image URL
              </label>
              <input
                type="url"
                value={newCategory.imageUrl}
                onChange={(e) => setNewCategory((prev) => ({ ...prev, imageUrl: e.target.value }))}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] focus:bg-white"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="bg-[#E50914] hover:bg-[#c40811] text-white">
                Save Category
              </Button>
            </div>
          </form>
        )}

        {/* Categories List Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Category Name</th>
                <th className="py-3.5 px-4">Slug Identifier</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Assigned Products</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categoryList.map((category) => {
                const assignedCount = products.filter(
                  (p) => p.categoryId === category.id
                ).length;

                return (
                  <tr key={category.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={category.imageUrl}
                          alt={category.name}
                          className="w-9 h-9 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                        />
                        <span className="font-bold text-slate-900">{category.name}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {category.slug}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 max-w-sm">
                      <span className="line-clamp-2 leading-relaxed">{category.description}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {assignedCount} Models
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteCategory(category.id, category.name)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
