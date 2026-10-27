'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ProductReview, ProductReviewStats } from '@/lib/types';
import { StarRating } from './StarRating';
import { ReviewCard } from './ReviewCard';
import { ReviewForm } from './ReviewForm';
import { Star, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ProductReviewsSectionProps {
  productId: string;
  productName: string;
}

export function ProductReviewsSection({
  productId,
  productName,
}: ProductReviewsSectionProps) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [stats, setStats] = useState<ProductReviewStats>({
    averageRating: 0,
    totalReviews: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const reloadReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setReviews(data.reviews || []);
          if (data.stats) setStats(data.stats);
        }
      }
    } catch (err) {
      console.warn('Failed to reload reviews:', err);
    }
  }, [productId]);

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        const res = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success) {
            setReviews(data.reviews || []);
            if (data.stats) setStats(data.stats);
          }
        }
      } catch (err) {
        console.warn('Failed to fetch reviews:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  return (
    <section className="mt-12 pt-10 border-t border-slate-200" id="reviews">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-bold text-[#E50914] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Verified Customer Feedback</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#171717] tracking-tight">
            Customer Reviews & Ratings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real feedback from verified buyers and institutional clients.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowForm(!showForm)}
          className="text-xs font-bold border-slate-300 hover:border-[#E50914] hover:text-[#E50914]"
        >
          <MessageSquarePlus className="w-4 h-4 mr-1.5 text-[#E50914]" />
          {showForm ? 'Hide Review Form' : 'Write a Review'}
        </Button>
      </div>

      {/* Review Form (Expandable) */}
      {showForm && (
        <div className="mb-10">
          <ReviewForm
            productId={productId}
            productName={productName}
            onSuccess={() => {
              reloadReviews();
            }}
          />
        </div>
      )}

      {/* Review Score & Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 p-6 sm:p-8 rounded-2xl bg-[#F8F9FA] border border-slate-200">
        {/* Left Column: Overall Rating */}
        <div className="md:col-span-5 flex flex-col justify-center items-center text-center md:border-r md:border-slate-200 md:pr-8">
          <div className="text-4xl sm:text-5xl font-extrabold text-[#171717] tracking-tight">
            {stats.totalReviews > 0 ? stats.averageRating.toFixed(1) : '—'}
          </div>
          <div className="my-2">
            <StarRating
              rating={stats.averageRating}
              size="md"
              showText={false}
            />
          </div>
          <div className="text-xs text-slate-500 font-medium">
            {stats.totalReviews > 0 ? (
              <span>Based on {stats.totalReviews} verified {stats.totalReviews === 1 ? 'review' : 'reviews'}</span>
            ) : (
              <span>No customer reviews published yet</span>
            )}
          </div>
        </div>

        {/* Right Column: Star Rating Distribution Breakdown */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.distribution[star as 1 | 2 | 3 | 4 | 5] || 0;
            const percentage = stats.totalReviews > 0 ? Math.round((count / stats.totalReviews) * 100) : 0;

            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-medium text-slate-600 shrink-0">
                  {star} Star
                </span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-slate-500 font-mono text-[11px] shrink-0">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Cards List */}
      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400">
          Loading customer reviews...
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-2xl border border-dashed border-slate-200 text-center space-y-3 bg-white">
          <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Star className="w-5 h-5 text-slate-300" />
          </div>
          <h3 className="text-sm font-bold text-slate-700">No Reviews Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Be the first to share your experience with {productName}.
          </p>
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => setShowForm(true)}
            className="text-xs font-bold mt-1"
          >
            Write the First Review
          </Button>
        </div>
      )}
    </section>
  );
}
