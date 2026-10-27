'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const displayImages = images && images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image View */}
      <div className="relative aspect-4/3 sm:aspect-16/10 w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shadow-xs flex items-center justify-center p-4">
        <img
          src={displayImages[activeIndex]}
          alt={`${productName} view ${activeIndex + 1}`}
          className="w-full h-full object-contain transition-all duration-300"
        />
        <div className="absolute bottom-3 right-3 bg-slate-900/70 text-white text-[11px] px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1">
          <ZoomIn className="w-3 h-3" />
          <span>Verified Product Photo</span>
        </div>
      </div>

      {/* Thumbnail Row */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={cn(
                'relative w-20 h-20 rounded-lg overflow-hidden border-2 bg-slate-50 p-1 shrink-0 transition-all cursor-pointer flex items-center justify-center',
                activeIndex === idx
                  ? 'border-[#E50914] ring-2 ring-[#E50914]/20 shadow-xs'
                  : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400'
              )}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
