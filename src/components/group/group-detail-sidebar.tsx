import type { ReactNode } from 'react';
import type { GroupItem } from '@/types/group';

type GroupDetailSidebarProps = {
  item: GroupItem;
};

export default function GroupDetailSidebar({
  item,
}: GroupDetailSidebarProps): ReactNode {
  return (
    <aside className="group-detail-sidebar" aria-label="모임 상세 메뉴">

    </aside>
  );
}
