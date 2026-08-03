import type { ReactNode } from 'react';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search.tsx';
import RootLayout from '@/layouts/root-layout.tsx';
import CarsContent from '@/pages/cars/cars-content.tsx';

export default function CarsPage(): ReactNode {
  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col">
        <HeaderWithSearch activeCategoryCode="cars" />
        <CarsContent />
      </div>
    </RootLayout>
  );
}
