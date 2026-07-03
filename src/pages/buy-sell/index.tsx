import type { ReactNode } from 'react';
import RootLayout from '@/layouts/root-layout';
import HeaderWithSearch from '@/layouts/header-with-search.tsx';

export default function BuySellPage(): ReactNode {
  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col">
        <HeaderWithSearch />
      </div>
    </RootLayout>
  );
}
