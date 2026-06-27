'use client';

import Link from 'next/link';
import { useAdminStore } from '@/store/adminStore';

export default function Footer() {
  const incrementClick = useAdminStore((state) => state.incrementClick);

  return (
    <footer className="border-t border-white/10 bg-carbon-deep">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="font-display text-3xl tracking-[0.35em] text-gold">AVIOR</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
            Luxury watches and accessories shaped into a modern commerce experience.
          </p>
        </div>

        <div className="grid gap-3 text-sm text-white/70">
          <Link href="/collections">Collections</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="grid gap-3 text-sm text-white/55">
          <button type="button" onClick={incrementClick} className="text-left text-white transition hover:text-gold">
            خليل
          </button>
        </div>
      </div>
    </footer>
  );
}
