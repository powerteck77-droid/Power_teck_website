import { NextRequest, NextResponse } from 'next/server';
import { getApprovedReviews, getProductReviewStats, submitProductReview } from '@/lib/reviews';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Missing productId parameter' },
        { status: 400 }
      );
    }

    const reviews = await getApprovedReviews(productId);
    const stats = await getProductReviewStats(productId);

    return NextResponse.json({
      success: true,
      reviews,
      stats,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to retrieve reviews';
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, reviewerName, reviewerEmail, rating, comment } = body;

    // Validate inputs
    if (!productId || !reviewerName || !reviewerEmail || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: 'All fields (name, email, rating, comment) are required.' },
        { status: 400 }
      );
    }

    const result = await submitProductReview({
      productId,
      reviewerName,
      reviewerEmail,
      rating: Number(rating),
      comment,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Submission failed' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your review has been submitted for moderation and will appear once approved by our team.',
        reviewId: result.id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Invalid request body';
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
