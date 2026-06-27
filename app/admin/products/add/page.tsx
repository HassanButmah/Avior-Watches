import { getProducts } from '@/lib/data';
import ProductForm from '@/components/ProductForm';

export default async function AdminAddProductPage() {
  const products = await getProducts();
  const nextId = Math.max(0, ...products.map((product) => product.id)) + 1;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Add product</p>
      <h1 className="mt-4 font-display text-5xl text-white">Create a new item</h1>
      <div className="mt-8">
        <ProductForm mode="create" product={{ id: nextId, name: '', nameAr: '', category: 'watches', price: 0, image: '/images/watch-assembled.jpg', description: '', descriptionAr: '', features: [], inStock: true }} />
      </div>
    </div>
  );
}
