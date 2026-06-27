import { getSettings } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-28 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Contact</p>
        <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">Start a private conversation.</h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
          Use the form for general inquiries or message us directly on WhatsApp for faster assistance.
        </p>

        <div className="mt-10 grid gap-4">
          <div className="rounded-3xl border border-white/10 bg-carbon-card p-6">
            <p className="text-sm text-white/50">WhatsApp</p>
            <p className="mt-2 text-white">{settings.whatsappNumber}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-carbon-card p-6">
            <p className="text-sm text-white/50">Instagram</p>
            <p className="mt-2 text-white">@{settings.instagramHandle}</p>
          </div>
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
