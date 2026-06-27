import { getSettings } from '@/lib/data';
import CheckoutPageClient from '@/components/CheckoutPageClient';

export default async function CheckoutPage() {
  const settings = await getSettings();
  return <CheckoutPageClient settings={settings} />;
}

