import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    ok: true,
    clientSecret: 'pi_placeholder_client_secret',
    stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  });
}

