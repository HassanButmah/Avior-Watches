import { getProducts, getSettings } from '@/lib/data';
import CollectionGrid from '@/components/CollectionGrid';

export default async function CollectionsPage() {
  const [products, settings] = await Promise.all([getProducts(), getSettings()]);
  return <CollectionGrid products={products} settings={settings} />;
}

