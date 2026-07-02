import type { ReactNode } from 'react';
import Header from '@/layouts/header';
import RootLayout from '@/layouts/root-layout';
import DashboardContent from './dashboard-content';

export default function DashboardPage(): ReactNode {
  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col py-10">
        <Header />
        <DashboardContent />
      </div>
    </RootLayout>
  );
}
