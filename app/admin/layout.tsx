import AdminGuard from '@/components/AdminGuard';
import AdminSidebar from '@/components/AdminSidebar';
import type { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-carbon lg:flex">
        <AdminSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </AdminGuard>
  );
}
