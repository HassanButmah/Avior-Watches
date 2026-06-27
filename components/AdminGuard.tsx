'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('avior-admin-token');
    if (!token) {
      router.replace('/');
      return;
    }
    setAuthorized(true);
  }, [router, pathname]);

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-carbon text-white/70">
        Verifying access...
      </div>
    );
  }

  return <>{children}</>;
}
