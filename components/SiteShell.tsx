'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Settings } from '@/lib/types';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import WhatsAppButton from './WhatsAppButton';
import AdminLoginModal from './AdminLoginModal';
import LoadingScreen from './LoadingScreen';

export default function SiteShell({ children, settings }: { children: ReactNode; settings: Settings }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLoader(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen visible={showLoader} />
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? 'min-h-screen bg-carbon' : 'min-h-screen'}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton settings={settings} />}
      {!isAdminRoute && <CartDrawer settings={settings} />}
      {!isAdminRoute && <AdminLoginModal />}
    </>
  );
}
