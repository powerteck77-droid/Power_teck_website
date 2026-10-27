import React from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductForm } from '@/components/admin/ProductForm';

export default function AddProductPage() {
  return (
    <div className="flex flex-col flex-1">
      <AdminHeader
        title="Add New Product"
        subtitle="Create a new power electronics model, set verified MRP / Selling Price, and configure specs"
      />

      <div className="p-6 sm:p-8 max-w-5xl">
        <ProductForm isEditing={false} />
      </div>
    </div>
  );
}
