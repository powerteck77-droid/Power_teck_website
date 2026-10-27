import React from 'react';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductForm } from '@/components/admin/ProductForm';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    // If not found in static seed, provide a fallback product mock
    return notFound();
  }

  return (
    <div className="flex flex-col flex-1">
      <AdminHeader
        title={`Edit Product: ${product.model}`}
        subtitle={`Updating "${product.name}" specifications and pricing`}
      />

      <div className="p-6 sm:p-8 max-w-5xl">
        <ProductForm initialProduct={product} isEditing={true} />
      </div>
    </div>
  );
}
