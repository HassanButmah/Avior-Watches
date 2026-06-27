'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Settings } from '@/lib/types';

export default function SettingsForm({ settings }: { settings: Settings }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [state, setState] = useState(settings);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    const response = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });

    if (response.ok) {
      router.refresh();
    }

    setSaving(false);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border border-white/10 bg-carbon-card p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm text-white/60">WhatsApp Number</span>
          <input
            value={state.whatsappNumber}
            onChange={(e) => setState({ ...state, whatsappNumber: e.target.value })}
            className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/60">Instagram Handle</span>
          <input
            value={state.instagramHandle}
            onChange={(e) => setState({ ...state, instagramHandle: e.target.value })}
            className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm text-white/60">USD to ILS</span>
          <input
            value={state.usdToIls}
            onChange={(e) => setState({ ...state, usdToIls: Number(e.target.value) })}
            type="number"
            step="0.01"
            className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-white/60">Free Shipping Threshold</span>
          <input
            value={state.freeShippingThreshold}
            onChange={(e) => setState({ ...state, freeShippingThreshold: Number(e.target.value) })}
            type="number"
            step="1"
            className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm text-white/60">Announcement Text</span>
        <textarea
          value={state.announcementBar.text}
          onChange={(e) =>
            setState({
              ...state,
              announcementBar: { ...state.announcementBar, text: e.target.value },
            })
          }
          rows={3}
          className="rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
        />
      </label>

      <label className="flex items-center gap-3 text-white/70">
        <input
          type="checkbox"
          checked={state.announcementBar.enabled}
          onChange={(e) =>
            setState({
              ...state,
              announcementBar: { ...state.announcementBar, enabled: e.target.checked },
            })
          }
        />
        Show announcement bar
      </label>

      <button type="submit" disabled={saving} className="btn-gold rounded-full px-5 py-3 text-sm disabled:opacity-60">
        {saving ? 'Saving...' : 'Save settings'}
      </button>
    </form>
  );
}
