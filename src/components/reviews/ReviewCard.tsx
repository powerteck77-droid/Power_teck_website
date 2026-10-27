import React from 'react';
import { ProductReview } from '@/lib/types';
import { StarRating } from './StarRating';
import { CheckCircle2, User } from 'lucide-react';

interface ReviewCardProps {
  review: ProductReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formattedDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return (
    <div className="p-4 sm:p-5 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs uppercase border border-slate-200">
            {review.reviewerName ? review.reviewerName.charAt(0) : <User className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-[#171717]">
                {review.reviewerName}
              </span>
              <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium border border-emerald-200/60">
                <CheckCircle2 className="w-2.5 h-2.5" /> Verified
              </span>
            </div>
            {formattedDate && (
              <span className="text-[11px] text-slate-400 font-normal">
                {formattedDate}
              </span>
            )}
          </div>
        </div>

        <StarRating rating={review.rating} size="xs" showText={false} />
      </div>

      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
        {review.comment}
      </p>
    </div>
  );
}
