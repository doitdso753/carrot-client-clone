import type { ReactNode } from 'react';
import RootLayout from '@/layouts/root-layout.tsx';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search.tsx';
import LocalProfileContent from '@/pages/local-profile/local-profile-content.tsx';

export default function LocalProfilePage(): ReactNode {
  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col">
        <HeaderWithSearch activeCategoryCode="localProfile" />
        <LocalProfileContent />
      </div>
    </RootLayout>
  );
}
