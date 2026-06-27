'use client';

import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';

export default function AdminLoginModal() {
  const router = useRouter();
  const showLoginModal = useAdminStore((state) => state.showLoginModal);
  const setShowModal = useAdminStore((state) => state.setShowModal);
  const resetClicks = useAdminStore((state) => state.resetClicks);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    void useAdminStore.persist.rehydrate();
  }, []);

  if (!showLoginModal) return null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');

    if (attempts >= 3) {
      setError('Too many attempts. Reload the page to try again.');
      setBusy(false);
      return;
    }

    const response = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = (await response.json()) as { ok?: boolean; message?: string };

    if (!response.ok || !data.ok) {
      setAttempts((current) => current + 1);
      setError(data.message || 'Invalid credentials');
      setBusy(false);
      return;
    }

    sessionStorage.setItem('avior-admin-token', 'authorized');
    setBusy(false);
    setShowModal(false);
    resetClicks();
    router.push('/admin');
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 px-4">
      <form
        onSubmit={onSubmit}
        className={`w-full max-w-sm rounded-3xl border border-white/10 bg-carbon-card p-6 shadow-2xl ${
          error ? 'animate-shake' : ''
        }`}
      >
        <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Admin Access</p>
        <h2 className="mt-2 font-display text-3xl text-white">Private Entry</h2>
        <p className="mt-2 text-sm text-white/60">Use the team credentials to continue.</p>

        <div className="mt-6 space-y-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full rounded-2xl border border-white/10 bg-carbon-deep px-4 py-3 text-white outline-none focus:border-gold"
            placeholder="Password"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="btn-gold-outline flex-1 rounded-full px-4 py-3 text-sm"
          >
            Cancel
          </button>
          <button type="submit" disabled={busy} className="btn-gold flex-1 rounded-full px-4 py-3 text-sm disabled:opacity-60">
            {busy ? 'Checking...' : 'Unlock'}
          </button>
        </div>
      </form>
    </div>
  );
}
