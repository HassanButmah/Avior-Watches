import { NextRequest } from 'next/server';
import { getWatchById } from '@/lib/watches';
import { apiSuccess, apiError, handleApiError } from '@/lib/api-utils';
import { logger } from '@/lib/logger';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const watch = getWatchById(id);

    if (!watch) {
      return apiError('Watch not found', 404);
    }

    logger.info('Fetched watch', { id });
    return apiSuccess(watch);
  } catch (error) {
    return handleApiError(error);
  }
}
