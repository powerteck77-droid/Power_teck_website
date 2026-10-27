import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { validatePricing } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const query = searchParams.get('q')?.toLowerCase();

    let items = [...products];

    if (category && category !== 'all') {
      items = items.filter(
        (p) => p.categoryId === category || p.categoryName.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (query) {
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.model.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({ success: true, count: items.length, products: items });
  } catch {
    return NextResponse.json({ error: 'Failed to retrieve products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, model, mrp, sellingPrice } = body;

    if (!name || !model || mrp === undefined || sellingPrice === undefined) {
      return NextResponse.json(
        { error: 'Product name, model, MRP, and selling price are required.' },
        { status: 400 }
      );
    }

    const priceValidation = validatePricing(Number(mrp), Number(sellingPrice));
    if (!priceValidation.valid) {
      return NextResponse.json({ error: priceValidation.error }, { status: 400 });
    }

    const newProduct = {
      ...body,
      id: `pt-${Date.now()}`,
      mrp: Number(mrp),
      sellingPrice: Number(sellingPrice),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('products').insert([newProduct]);
      if (error) {
        console.warn('Supabase product insert warning:', error.message);
      }
    }

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
