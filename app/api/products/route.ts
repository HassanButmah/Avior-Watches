import { NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/data';
import type { Product } from '@/lib/types';

export async function GET() {
  return NextResponse.json({ ok: true, products: await getProducts() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Product;
  const products = await getProducts();

  if (products.some((product) => product.id === body.id)) {
    return NextResponse.json({ ok: false, message: 'Product ID already exists' }, { status: 400 });
  }

  await saveProducts([...products, body]);
  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request) {
  const body = (await request.json()) as Product;
  const products = await getProducts();
  const index = products.findIndex((product) => product.id === body.id);

  if (index === -1) {
    return NextResponse.json({ ok: false, message: 'Product not found' }, { status: 404 });
  }

  products[index] = body;
  await saveProducts(products);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const body = (await request.json()) as { id?: number };
  const id = Number(body.id);
  const products = await getProducts();
  const next = products.filter((product) => product.id !== id);

  if (next.length === products.length) {
    return NextResponse.json({ ok: false, message: 'Product not found' }, { status: 404 });
  }

  await saveProducts(next);
  return NextResponse.json({ ok: true });
}

