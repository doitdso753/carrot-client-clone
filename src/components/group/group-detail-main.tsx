import type { ReactNode } from 'react';
import {
  GroupDetailAlbumSection,
} from '@/components/group/sections';
import type { GroupItem } from '@/types/group';

type GroupDetailMainProps = {
  item: GroupItem;
};

export default function GroupDetailMain({
  item,
}: GroupDetailMainProps): ReactNode {
  return (
    <div className="group-detail-main" aria-label="모임 상세 콘텐츠">
      <GroupDetailAlbumSection item={item} />
    </div>
  );
}
