'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import type { Settings } from '@/lib/types';
import { MessageIcon } from './Icons';

export default function WhatsAppButton({ settings }: { settings: Settings }) {
  const pathname = usePathname();
  if (pathname !== '/' && pathname !== '/about') return null;

  const href = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl animate-pulse-gold"
      aria-label="Contact on WhatsApp"
    >
      <MessageIcon className="h-6 w-6" />
    </Link>
  );
}
