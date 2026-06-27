import { getSettings } from '@/lib/data';
import CartPageClient from '@/components/CartPageClient';

export default async function CartPage() {
  const settings = await getSettings();
  return <CartPageClient settings={settings} />;
}

