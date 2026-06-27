'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const items = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    sessionStorage.removeItem('avior-admin-token');
    router.push('/');
  }

  return (
    <aside className="border-b border-white/10 bg-carbon-card lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 lg:block">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-gold/70">Admin</p>
          <h1 className="mt-2 font-display text-3xl text-white">AVIOR</h1>
        </div>
        <button onClick={logout} className="btn-gold-outline rounded-full px-4 py-2 text-xs lg:mt-6">
          Logout
        </button>
      </div>

      <nav className="grid gap-2 px-4 py-4 lg:px-6">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.25em] transition ${
                active ? 'bg-gold text-black' : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

