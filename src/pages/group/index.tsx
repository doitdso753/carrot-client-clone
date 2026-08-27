import type { ReactNode } from 'react';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search.tsx';
import RootLayout from '@/layouts/root-layout.tsx';
import GroupContent from '@/pages/group/group-content.tsx';

export default function GroupPage(): ReactNode {
  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col">
        <HeaderWithSearch activeCategoryCode="group" />
        <GroupContent />
      </div>
    </RootLayout>
  );
}
