import type { ReactNode } from 'react';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search.tsx';
import RootLayout from '@/layouts/root-layout.tsx';
import CommunityContent from '@/pages/community/community-content.tsx';

export default function CommunityPage(): ReactNode {
  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col">
        <HeaderWithSearch activeCategoryCode="community" />
        <CommunityContent />
      </div>
    </RootLayout>
  );
}
