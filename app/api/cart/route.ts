import { NextRequest } from 'next/server';
import { z } from 'zod';
import { apiSuccess, handleApiError } from '@/lib/api-utils';
import { logger } from '@/lib/logger';

const cartItemSchema = z.object({
  watchId: z.string().min(1),
  quantity: z.number().int().min(1).max(10).default(1),
});

const cartSchema = z.object({
  action: z.enum(['add', 'remove', 'update', 'clear']),
  item: cartItemSchema.optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = cartSchema.parse(body);

    logger.info('Cart action', { action: parsed.action, watchId: parsed.item?.watchId });

    return apiSuccess({
      message: `Cart ${parsed.action} successful`,
      action: parsed.action,
      item: parsed.item,
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  return apiSuccess({ message: 'Cart API ready. Use client-side Zustand store for cart state.' });
}
