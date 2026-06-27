import { getProducts } from '@/lib/data';
import AdminProductsManager from '@/components/AdminProductsManager';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Products</p>
      <h1 className="mt-4 font-display text-5xl text-white">Manage catalog</h1>
      <div className="mt-8">
        <AdminProductsManager products={products} />
      </div>
    </div>
  );
}

