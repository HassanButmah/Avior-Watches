import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { logger } from '@/lib/logger';

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 400, errors?: Record<string, string[]>) {
  logger.warn('API error', { message, status, errors });
  return NextResponse.json({ success: false, error: message, errors }, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return apiError('Validation failed', 422, error.flatten().fieldErrors as Record<string, string[]>);
  }
  logger.error('Unhandled API error', { error: String(error) });
  return apiError('Internal server error', 500);
}
