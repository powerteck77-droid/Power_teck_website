import { ProductReview, ProductReviewStats, ReviewStatus } from './types';
import { supabase, isSupabaseConfigured } from './supabase';

/**
 * In-memory fallback review storage when Supabase is not yet connected.
 * In a production deployment with configured SUPABASE_URL and KEY, Supabase PostgreSQL is queried directly.
 */
let memoryReviews: ProductReview[] = [];

/**
 * Calculate statistical distribution and average for a list of approved reviews
 */
export function calculateReviewStats(reviews: ProductReview[]): ProductReviewStats {
  const approved = reviews.filter((r) => r.status === 'approved');
  const totalReviews = approved.length;

  const distribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  if (totalReviews === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
      distribution,
    };
  }

  let sum = 0;
  for (const review of approved) {
    const star = Math.min(5, Math.max(1, Math.round(review.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[star] = (distribution[star] || 0) + 1;
    sum += review.rating;
  }

  const averageRating = Number((sum / totalReviews).toFixed(1));

  return {
    averageRating,
    totalReviews,
    distribution,
  };
}

/**
 * Fetch approved reviews for a specific product (sanitizing reviewer email for privacy)
 */
export async function getApprovedReviews(productId: string): Promise<ProductReview[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('id, product_id, reviewer_name, rating, comment, status, created_at')
        .eq('product_id', productId)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase getApprovedReviews error:', error.message);
      } else if (data) {
        return data.map((item) => ({
          id: item.id,
          productId: item.product_id,
          reviewerName: item.reviewer_name,
          rating: item.rating,
          comment: item.comment,
          status: item.status as ReviewStatus,
          createdAt: item.created_at,
        }));
      }
    } catch (e) {
      console.warn('Supabase query failed, falling back to memory store:', e);
    }
  }

  // Memory fallback (email omitted for public safety)
  return memoryReviews
    .filter((r) => r.productId === productId && r.status === 'approved')
    .map((r) => ({
      ...r,
      reviewerEmail: undefined, // Never expose email to public
    }))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

/**
 * Get review stats for a single product
 */
export async function getProductReviewStats(productId: string): Promise<ProductReviewStats> {
  const reviews = await getApprovedReviews(productId);
  return calculateReviewStats(reviews);
}

/**
 * Get review stats for all products simultaneously (for product cards and catalogue)
 */
export async function getAllProductsReviewStats(): Promise<Record<string, ProductReviewStats>> {
  const result: Record<string, ProductReviewStats> = {};

  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase
        .from('product_reviews')
        .select('product_id, rating, status')
        .eq('status', 'approved');

      if (data) {
        const grouped: Record<string, ProductReview[]> = {};
        for (const item of data) {
          if (!grouped[item.product_id]) grouped[item.product_id] = [];
          grouped[item.product_id].push({
            id: '',
            productId: item.product_id,
            reviewerName: '',
            rating: item.rating,
            comment: '',
            status: 'approved',
            createdAt: '',
          });
        }

        for (const [pid, list] of Object.entries(grouped)) {
          result[pid] = calculateReviewStats(list);
        }
        return result;
      }
    } catch (e) {
      console.warn('Supabase batch stats query failed:', e);
    }
  }

  // Memory fallback grouping
  const grouped: Record<string, ProductReview[]> = {};
  for (const item of memoryReviews.filter((r) => r.status === 'approved')) {
    if (!grouped[item.productId]) grouped[item.productId] = [];
    grouped[item.productId].push(item);
  }

  for (const [pid, list] of Object.entries(grouped)) {
    result[pid] = calculateReviewStats(list);
  }

  return result;
}

/**
 * Submit a customer review (defaults to 'pending' status for admin moderation)
 */
export async function submitProductReview(input: {
  productId: string;
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  comment: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  // Server-side validation
  if (!input.productId || !input.reviewerName?.trim() || !input.reviewerEmail?.trim() || !input.comment?.trim()) {
    return { success: false, error: 'All fields are required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.reviewerEmail.trim())) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  const numericRating = Math.round(Number(input.rating));
  if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
    return { success: false, error: 'Rating must be an integer between 1 and 5 stars.' };
  }

  if (input.comment.trim().length < 5) {
    return { success: false, error: 'Please write a review comment with at least 5 characters.' };
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .insert({
          product_id: input.productId,
          reviewer_name: input.reviewerName.trim(),
          reviewer_email: input.reviewerEmail.trim(),
          rating: numericRating,
          comment: input.comment.trim(),
          status: 'pending',
        })
        .select('id')
        .single();

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, id: data?.id };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Database insert failed';
      return { success: false, error: msg };
    }
  }

  // Memory fallback
  const newReview: ProductReview = {
    id: 'rev-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    productId: input.productId,
    reviewerName: input.reviewerName.trim(),
    reviewerEmail: input.reviewerEmail.trim(),
    rating: numericRating,
    comment: input.comment.trim(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  memoryReviews.unshift(newReview);
  return { success: true, id: newReview.id };
}

/**
 * Admin: Fetch all reviews across statuses (pending, approved, rejected)
 */
export async function adminGetAllReviews(): Promise<ProductReview[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data.map((item) => ({
          id: item.id,
          productId: item.product_id,
          reviewerName: item.reviewer_name,
          reviewerEmail: item.reviewer_email,
          rating: item.rating,
          comment: item.comment,
          status: item.status as ReviewStatus,
          createdAt: item.created_at,
        }));
      }
    } catch (e) {
      console.warn('Supabase admin review query failed:', e);
    }
  }

  return [...memoryReviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Admin: Moderate a review (approve or reject)
 */
export async function adminModerateReview(
  id: string,
  status: 'approved' | 'rejected'
): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('product_reviews')
        .update({ status })
        .eq('id', id);

      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Database update failed';
      return { success: false, error: msg };
    }
  }

  const review = memoryReviews.find((r) => r.id === id);
  if (review) {
    review.status = status;
    return { success: true };
  }
  return { success: false, error: 'Review not found' };
}

/**
 * Admin: Delete a review permanently
 */
export async function adminDeleteReview(id: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('product_reviews').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Database delete failed';
      return { success: false, error: msg };
    }
  }

  memoryReviews = memoryReviews.filter((r) => r.id !== id);
  return { success: true };
}
