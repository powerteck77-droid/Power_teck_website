import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { ProductPricing } from './ProductPricing';
import { WhatsAppButton } from './WhatsAppButton';
import { StarRating } from '@/components/reviews/StarRating';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  reviewStats?: {
    averageRating: number;
    totalReviews: number;
  };
}

export function ProductCard({ product, reviewStats }: ProductCardProps) {
  const primaryImage = product.images[0] || 'https://powerteck.in/wp-content/uploads/2026/01/CARNIVAL-90L-265x331.png';

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden">
      {/* Top Media & Tags */}
      <div className="relative aspect-4/3 w-full bg-slate-50 flex items-center justify-center p-3 overflow-hidden border-b border-slate-100">
        <Link href={`/products/${product.slug}`} className="block w-full h-full flex items-center justify-center">
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-900/85 text-white text-[11px] font-mono tracking-tight font-medium backdrop-blur-xs">
            {product.model}
          </span>
          {product.inStock ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/90 text-white text-[11px] font-medium backdrop-blur-xs">
              <CheckCircle2 className="w-3 h-3" /> In Stock
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-500/90 text-white text-[11px] font-medium backdrop-blur-xs">
              Made to Order
            </span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#E50914]">
            {product.categoryName}
          </span>
          <StarRating
            rating={reviewStats?.averageRating || 0}
            totalReviews={reviewStats?.totalReviews || 0}
            size="xs"
          />
        </div>

        <h3 className="text-sm sm:text-base font-bold text-[#171717] leading-snug line-clamp-2 mb-2 group-hover:text-[#E50914] transition-colors">
          <Link href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
          {product.shortDescription}
        </p>

        {/* Pricing Block */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <ProductPricing
              mrp={product.mrp}
              sellingPrice={product.sellingPrice}
              size="md"
            />
            {product.minimumOrderQuantity && (
              <span className="text-[11px] text-slate-400 font-medium">
                MOQ: {product.minimumOrderQuantity} pcs
              </span>
            )}
          </div>

          {/* Action Row: View Details + WhatsApp Buy Now */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors text-center"
            >
              <span>View Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <WhatsAppButton
              productName={product.name}
              model={product.model}
              sellingPrice={product.sellingPrice}
              size="sm"
              label="Buy on WhatsApp"
              className="w-full text-xs py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
