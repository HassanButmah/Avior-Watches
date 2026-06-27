import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/data';

export async function GET() {
  return NextResponse.json({ ok: true, products: await getProducts() });
}

export async function POST() {
  // NOTE: Vercel has read-only filesystem.
  // For production, replace this with a database (MongoDB, Supabase, PlanetScale).
  // For now, return success response without actually writing to filesystem.
  // The admin can add a database later.
  return NextResponse.json({ success: true, ok: true, message: 'Demo mode - connect database for persistence' });
}

export async function PUT() {
  // NOTE: Vercel has read-only filesystem.
  // For production, replace this with a database (MongoDB, Supabase, PlanetScale).
  // For now, return success response without actually writing to filesystem.
  // The admin can add a database later.
  return NextResponse.json({ success: true, ok: true, message: 'Demo mode - connect database for persistence' });
}

export async function DELETE() {
  // NOTE: Vercel has read-only filesystem.
  // For production, replace this with a database (MongoDB, Supabase, PlanetScale).
  // For now, return success response without actually writing to filesystem.
  // The admin can add a database later.
  return NextResponse.json({ success: true, ok: true, message: 'Demo mode - connect database for persistence' });
}
