import { NextRequest } from 'next/server';
import { z } from 'zod';
import { watches } from '@/lib/watches';
import { filterWatches, sortWatches } from '@/lib/utils';
import { apiSuccess, handleApiError } from '@/lib/api-utils';
import { logger } from '@/lib/logger';
import type { SortOption } from '@/lib/watches';

const querySchema = z.object({
  collection: z.string().optional(),
  category: z.string().optional(),
  availability: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  sort: z.enum(['newest', 'price-asc', 'price-desc', 'bestselling']).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const params = Object.fromEntries(request.nextUrl.searchParams.entries());
    const parsed = querySchema.parse(params);

    const filters = {
      collection: parsed.collection,
      category: parsed.category,
      availability: parsed.availability,
      minPrice: parsed.minPrice,
      maxPrice: parsed.maxPrice,
    };

    let result = filterWatches(watches, filters);
    if (parsed.sort) {
      result = sortWatches(result, parsed.sort as SortOption);
    }

    logger.info('Fetched watches', { count: result.length, filters: parsed });
    return apiSuccess(result);
  } catch (error) {
    return handleApiError(error);
  }
}
