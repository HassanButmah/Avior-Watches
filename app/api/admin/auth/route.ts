import { NextRequest, NextResponse } from 'next/server';

const attempts = new Map<string, { count: number; until: number }>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const record = attempts.get(ip);

  if (record && record.until > now && record.count >= 5) {
    return NextResponse.json({ ok: false, message: 'Too many attempts. Try again later.' }, { status: 429 });
  }

  const body = (await request.json()) as { username?: string; password?: string };
  const username = body.username?.trim();
  const password = body.password?.trim();

  const validUsername = process.env.ADMIN_USERNAME || 'admin';
  const validPassword = process.env.ADMIN_PASSWORD || 'avior2025';

  if (username !== validUsername || password !== validPassword) {
    const next = record && record.until > now ? { count: record.count + 1, until: record.until } : { count: 1, until: now + 10 * 60 * 1000 };
    attempts.set(ip, next);
    return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 });
  }

  attempts.delete(ip);
  return NextResponse.json({ ok: true });
}

