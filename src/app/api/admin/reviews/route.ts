import { NextRequest, NextResponse } from 'next/server';
import {
  adminGetAllReviews,
  adminModerateReview,
  adminDeleteReview,
} from '@/lib/reviews';

export async function GET() {
  try {
    const reviews = await adminGetAllReviews();
    return NextResponse.json({
      success: true,
      reviews,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to fetch reviews';
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || (status !== 'approved' && status !== 'rejected')) {
      return NextResponse.json(
        { success: false, error: 'Valid review ID and status ("approved" | "rejected") required' },
        { status: 400 }
      );
    }

    const result = await adminModerateReview(id, status);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Moderation failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: `Review status updated to ${status}` });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to update review';
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing review id parameter' },
        { status: 400 }
      );
    }

    const result = await adminDeleteReview(id);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Deletion failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: 'Review deleted successfully' });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to delete review';
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
