import React from 'react';
import { formatINR, calculateDiscount } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ProductPricingProps {
  mrp: number;
  sellingPrice: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDiscountBadge?: boolean;
  className?: string;
}

export function ProductPricing({
  mrp,
  sellingPrice,
  size = 'md',
  showDiscountBadge = true,
  className,
}: ProductPricingProps) {
  const discountPercent = calculateDiscount(mrp, sellingPrice);
  const hasDiscount = discountPercent > 0 && mrp > sellingPrice;

  const sizeClasses = {
    sm: {
      selling: 'text-sm font-bold text-slate-900',
      mrp: 'text-xs text-slate-400 line-through',
      badge: 'text-[10px] px-1.5 py-0.2',
    },
    md: {
      selling: 'text-lg font-bold text-slate-900',
      mrp: 'text-xs text-slate-400 line-through',
      badge: 'text-xs px-2 py-0.5',
    },
    lg: {
      selling: 'text-2xl font-extrabold text-slate-900',
      mrp: 'text-sm text-slate-400 line-through',
      badge: 'text-xs px-2.5 py-0.5',
    },
    xl: {
      selling: 'text-3xl font-extrabold text-slate-900 tracking-tight',
      mrp: 'text-base text-slate-400 line-through',
      badge: 'text-sm px-3 py-1 font-bold',
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={cn('flex items-baseline flex-wrap gap-x-2.5 gap-y-1', className)}>
      <span className={currentSize.selling}>{formatINR(sellingPrice)}</span>

      {hasDiscount && (
        <>
          <span className={currentSize.mrp}>{formatINR(mrp)}</span>
          {showDiscountBadge && (
            <Badge variant="success" className={cn('bg-emerald-100/90 text-emerald-800 border-emerald-300', currentSize.badge)}>
              {discountPercent}% OFF
            </Badge>
          )}
        </>
      )}

      {/* When MRP equals Selling Price, do not render fictional discount badges or crossed-out MRP */}
    </div>
  );
}
