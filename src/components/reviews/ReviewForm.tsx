'use client';

import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, AlertCircle, Send } from 'lucide-react';

interface ReviewFormProps {
  productId: string;
  productName: string;
  onSuccess?: () => void;
}

export function ReviewForm({ productId, productName, onSuccess }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !email.trim() || !comment.trim()) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (comment.trim().length < 5) {
      setErrorMessage('Please provide a comment of at least 5 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          reviewerName: name.trim(),
          reviewerEmail: email.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setIsSubmitted(true);
      setName('');
      setEmail('');
      setComment('');
      setRating(5);
      onSuccess?.();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-emerald-900">
          Review Submitted for Moderation
        </h4>
        <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
          Thank you for reviewing <strong>{productName}</strong>! Your review has been received and will be published once approved by our verification team.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-2 text-xs font-semibold text-emerald-800 hover:underline"
        >
          Submit another review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-6 rounded-2xl bg-[#F8F9FA] border border-slate-200 space-y-4">
      <div>
        <h4 className="text-sm sm:text-base font-bold text-[#171717]">
          Write a Customer Review
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Share your experience with this Powerteck appliance. Your email will remain private.
        </p>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Star Rating Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 block">
          Your Rating <span className="text-[#E50914]">*</span>
        </label>
        <div className="flex items-center gap-3">
          <StarRating
            rating={rating}
            size="md"
            interactive={true}
            onRatingChange={setRating}
            showText={false}
          />
          <span className="text-xs font-bold text-slate-700">
            {rating} of 5 Stars
          </span>
        </div>
      </div>

      {/* Name and Email Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 block">
            Your Full Name <span className="text-[#E50914]">*</span>
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ramesh Kumar"
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 block">
            Email Address <span className="text-[#E50914]">*</span>
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. ramesh@example.com"
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914]"
          />
        </div>
      </div>

      {/* Review Comment */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-700 block">
          Review & Feedback <span className="text-[#E50914]">*</span>
        </label>
        <textarea
          rows={3}
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us about cooling performance, build quality, airflow, or delivery..."
          className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#E50914]"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={isSubmitting}
        className="w-full sm:w-auto text-xs px-6 py-2.5 font-bold"
      >
        <Send className="w-3.5 h-3.5 mr-1.5" />
        Submit Review for Verification
      </Button>
    </form>
  );
}
