import { NextRequest } from 'next/server';
import { getWatchById } from '@/lib/watches';
import { apiSuccess, apiError, handleApiError } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const watchId = request.nextUrl.searchParams.get('watchId');
    if (!watchId) return apiError('watchId is required', 400);

    const watch = getWatchById(watchId);
    if (!watch) return apiError('Watch not found', 404);

    return apiSuccess({
      reviews: watch.reviewList,
      rating: watch.rating,
      totalReviews: watch.reviews,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
