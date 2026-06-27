import { getSettings } from '@/lib/data';
import OrderSuccessClient from '@/components/OrderSuccessClient';

export default async function OrderSuccessPage() {
  const settings = await getSettings();
  return <OrderSuccessClient settings={settings} />;
}

