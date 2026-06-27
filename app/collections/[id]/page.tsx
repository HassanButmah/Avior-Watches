import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProducts, getSettings, getProductById } from '@/lib/data';
import ProductDetail from '@/components/ProductDetail';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: product.id.toString() }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProductById(Number(params.id));
  if (!product) return { title: 'Product not found | Avior' };
  return {
    title: `${product.name} | Avior`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const [settings, product] = await Promise.all([getSettings(), getProductById(Number(params.id))]);

  if (!product) notFound();

  return <ProductDetail product={product} settings={settings} />;
}

