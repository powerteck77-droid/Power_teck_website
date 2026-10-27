'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductReview, ReviewStatus } from '@/lib/types';
import { StarRating } from '@/components/reviews/StarRating';
import { products } from '@/data/products';
import {
  CheckCircle2,
  XCircle,
  Trash2,
  Filter,
  Search,
  MessageSquare,
  RefreshCw,
} from 'lucide-react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | ReviewStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const reloadReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reviews');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setReviews(data.reviews || []);
        }
      }
    } catch (err) {
      console.warn('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const res = await fetch('/api/admin/reviews');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success) {
            setReviews(data.reviews || []);
          }
        }
      } catch (err) {
        console.warn('Failed to load reviews:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleModerate = async (id: string, newStatus: 'approved' | 'rejected') => {
    setActionLoadingId(id);
    setNotification(null);
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ type: 'success', message: `Review marked as ${newStatus}` });
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      } else {
        setNotification({ type: 'error', message: data.error || 'Action failed' });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setNotification({ type: 'error', message: msg });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this review permanently?')) {
      return;
    }

    setActionLoadingId(id);
    setNotification(null);
    try {
      const res = await fetch(`/api/admin/reviews?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ type: 'success', message: 'Review deleted successfully' });
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } else {
        setNotification({ type: 'error', message: data.error || 'Deletion failed' });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setNotification({ type: 'error', message: msg });
    } finally {
      setActionLoadingId(null);
    }
  };

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;
  const rejectedCount = reviews.filter((r) => r.status === 'rejected').length;

  const filteredReviews = reviews.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const product = products.find((p) => p.id === r.productId);
      const matchProduct = product?.name.toLowerCase().includes(q) || product?.model.toLowerCase().includes(q);
      const matchReviewer = r.reviewerName.toLowerCase().includes(q) || r.comment.toLowerCase().includes(q);
      return matchProduct || matchReviewer;
    }
    return true;
  });

  return (
    <div className="flex flex-col flex-1">
      <AdminHeader
        title="Customer Ratings & Reviews Moderation"
        subtitle="Manage, verify, and moderate customer reviews submitted across the Powerteck catalogue"
        actionButton={
          <button
            type="button"
            onClick={reloadReviews}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#E50914]' : ''}`} />
            <span>Refresh</span>
          </button>
        }
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {/* Status notification */}
        {notification && (
          <div
            className={`p-4 rounded-xl flex items-center justify-between text-xs font-semibold ${
              notification.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            <span>{notification.message}</span>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-slate-500 hover:text-slate-900 text-sm"
            >
              ✕
            </button>
          </div>
        )}

        {/* Top Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`p-4 rounded-xl border text-left transition-all ${
              statusFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider font-semibold opacity-70">
              Total Reviews
            </div>
            <div className="text-2xl font-extrabold mt-1">{reviews.length}</div>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('pending')}
            className={`p-4 rounded-xl border text-left transition-all ${
              statusFilter === 'pending'
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200 hover:border-amber-300'
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider font-semibold opacity-70 flex items-center justify-between">
              <span>Pending Moderation</span>
              {pendingCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </div>
            <div className="text-2xl font-extrabold mt-1 text-amber-600 group-hover:text-amber-700">
              {pendingCount}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('approved')}
            className={`p-4 rounded-xl border text-left transition-all ${
              statusFilter === 'approved'
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider font-semibold opacity-70">
              Published Approved
            </div>
            <div className="text-2xl font-extrabold mt-1 text-emerald-600">
              {approvedCount}
            </div>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('rejected')}
            className={`p-4 rounded-xl border text-left transition-all ${
              statusFilter === 'rejected'
                ? 'bg-rose-700 text-white border-rose-700 shadow-sm'
                : 'bg-white text-slate-800 border-slate-200 hover:border-rose-300'
            }`}
          >
            <div className="text-[11px] uppercase tracking-wider font-semibold opacity-70">
              Rejected
            </div>
            <div className="text-2xl font-extrabold mt-1 text-rose-600">
              {rejectedCount}
            </div>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product, model, or customer..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs font-semibold text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Showing:</span>
            <span className="font-bold text-slate-900 capitalize">{statusFilter} Reviews</span>
            <span className="text-slate-400">({filteredReviews.length})</span>
          </div>
        </div>

        {/* Reviews Moderation Table / List */}
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-400">
            Loading reviews repository...
          </div>
        ) : filteredReviews.length > 0 ? (
          <div className="space-y-3">
            {filteredReviews.map((review) => {
              const product = products.find((p) => p.id === review.productId);
              const isActionLoading = actionLoadingId === review.id;

              return (
                <div
                  key={review.id}
                  className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 hover:border-slate-300 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          {review.reviewerName}
                        </span>
                        {review.reviewerEmail && (
                          <span className="text-xs text-slate-400 font-mono">
                            &lt;{review.reviewerEmail}&gt;
                          </span>
                        )}
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            review.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : review.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {review.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Product: <strong>{product ? product.name : review.productId}</strong>
                        {product?.model && ` (${product.model})`}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <StarRating rating={review.rating} size="sm" showText={false} />
                      <span className="text-xs font-bold text-slate-700">
                        {review.rating} / 5
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-IN') : ''}
                      </span>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                    &ldquo;{review.comment}&rdquo;
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    {review.status !== 'approved' && (
                      <button
                        type="button"
                        disabled={isActionLoading}
                        onClick={() => handleModerate(review.id, 'approved')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-2xs disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve & Publish</span>
                      </button>
                    )}

                    {review.status !== 'rejected' && (
                      <button
                        type="button"
                        disabled={isActionLoading}
                        onClick={() => handleModerate(review.id, 'rejected')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors shadow-2xs disabled:opacity-50"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={isActionLoading}
                      onClick={() => handleDelete(review.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold transition-colors disabled:opacity-50"
                      aria-label="Delete review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 space-y-2">
            <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No Reviews Found</h3>
            <p className="text-xs text-slate-500">
              No reviews match the current status filter ({statusFilter}).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
