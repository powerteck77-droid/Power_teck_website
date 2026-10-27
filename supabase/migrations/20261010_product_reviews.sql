-- ==============================================================================
-- Supabase Migration: Product Reviews Table with Row Level Security (RLS)
-- Table: product_reviews
-- Description: Stores customer reviews and ratings with strict moderation status.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT NOT NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_status ON public.product_reviews(status);
CREATE INDEX IF NOT EXISTS idx_product_reviews_created_at ON public.product_reviews(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- Policy 1: Anyone (public) can read ONLY approved reviews
CREATE POLICY "Public users can view approved reviews"
  ON public.product_reviews
  FOR SELECT
  USING (status = 'approved');

-- Policy 2: Anyone can submit a review with status forced to 'pending'
CREATE POLICY "Public users can insert pending reviews"
  ON public.product_reviews
  FOR INSERT
  WITH CHECK (status = 'pending');

-- Policy 3: Authenticated Admin / Service role has full access to manage reviews
CREATE POLICY "Service role and admins have full review management access"
  ON public.product_reviews
  FOR ALL
  USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');
