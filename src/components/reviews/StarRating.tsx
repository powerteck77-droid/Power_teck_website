'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating?: number;
  totalReviews?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showText?: boolean;
  className?: string;
}

export function StarRating({
  rating = 0,
  totalReviews,
  size = 'sm',
  interactive = false,
  onRatingChange,
  showText = true,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const currentRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = currentRating >= star;
          const isHalf = !isFilled && currentRating >= star - 0.5;

          return (
            <button
              key={star}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRatingChange?.(star)}
              onMouseEnter={() => interactive && setHoverRating(star)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={cn(
                'transition-transform',
                interactive ? 'cursor-pointer hover:scale-115 focus:outline-none' : 'cursor-default'
              )}
              aria-label={interactive ? `Rate ${star} out of 5 stars` : undefined}
            >
              <Star
                className={cn(
                  starSizes[size],
                  isFilled
                    ? 'text-amber-400 fill-amber-400'
                    : isHalf
                    ? 'text-amber-400 fill-amber-400/50'
                    : 'text-slate-300 fill-slate-100'
                )}
              />
            </button>
          );
        })}
      </div>

      {showText && !interactive && (
        <span className="text-xs text-slate-500 font-medium">
          {totalReviews !== undefined && totalReviews > 0 ? (
            <span>
              <strong className="text-slate-800 font-semibold">{rating.toFixed(1)}</strong>
              {' '}({totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'})
            </span>
          ) : (
            <span className="text-slate-400">No reviews yet</span>
          )}
        </span>
      )}
    </div>
  );
}
