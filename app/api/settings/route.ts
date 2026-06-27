import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/data';
import type { Settings } from '@/lib/types';

export async function GET() {
  return NextResponse.json({ ok: true, settings: await getSettings() });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as Settings;
  await saveSettings(body);
  return NextResponse.json({ ok: true });
}

