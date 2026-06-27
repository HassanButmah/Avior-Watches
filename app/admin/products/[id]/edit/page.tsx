import { notFound } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { getProductById } from '@/lib/data';

export default async function AdminEditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(Number(params.id));

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Edit product</p>
      <h1 className="mt-4 font-display text-5xl text-white">Update catalog entry</h1>
      <div className="mt-8">
        <ProductForm mode="update" product={product} />
      </div>
    </div>
  );
}

