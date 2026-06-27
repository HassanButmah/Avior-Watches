import { getSettings } from '@/lib/data';
import SettingsForm from '@/components/SettingsForm';

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Settings</p>
      <h1 className="mt-4 font-display text-5xl text-white">Store controls</h1>
      <div className="mt-8">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}

