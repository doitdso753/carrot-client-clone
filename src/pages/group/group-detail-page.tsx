import type { ReactNode } from 'react';
import { useParams } from 'react-router';
import GroupDetail from '@/components/group/group-detail.tsx';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search.tsx';
import RootLayout from '@/layouts/root-layout.tsx';
import { GROUP_ITEMS } from '@/types/group';

export default function GroupDetailPage(): ReactNode {
  const { itemId } = useParams();
  const item = GROUP_ITEMS.find(({ id }) => id === Number(itemId));

  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col">
        <HeaderWithSearch activeCategoryCode="group" />
        {item && <GroupDetail item={item} />}
      </div>
    </RootLayout>
  );
}
