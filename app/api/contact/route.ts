import { NextRequest } from 'next/server';
import { z } from 'zod';
import { apiSuccess, handleApiError } from '@/lib/api-utils';
import { logger } from '@/lib/logger';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.parse(body);

    logger.info('Contact form submission', {
      name: parsed.name,
      email: parsed.email,
      subject: parsed.subject,
    });

    return apiSuccess({
      message: 'Thank you for your message. We will get back to you within 24 hours.',
    });
  } catch (error) {
    return handleApiError(error);
  }
}
