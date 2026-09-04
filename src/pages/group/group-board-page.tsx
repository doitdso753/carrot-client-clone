import type { ReactNode } from 'react';
import { useParams } from 'react-router';
import GroupBoardContent from '@/components/group/group-board-content.tsx';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search.tsx';
import RootLayout from '@/layouts/root-layout.tsx';
import { GROUP_ITEMS } from '@/types/group';

export default function GroupBoardPage(): ReactNode {
  const { categoryCode = 'all', itemId } = useParams();
  const item = GROUP_ITEMS.find(({ id }) => id === Number(itemId));

  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col">
        <HeaderWithSearch activeCategoryCode="group" />
        {item && <GroupBoardContent categoryCode={categoryCode} item={item} />}
      </div>
    </RootLayout>
  );
}
