import type { ReactNode } from 'react';

import type { GroupItem } from '@/types/group';

type GroupDetailMainProps = {
  item: GroupItem;
};

export default function GroupDetailMain({
  item,
}: GroupDetailMainProps): ReactNode {
  return (
    <div className="group-detail-main" aria-label="모임 상세 콘텐츠">
    </div>
  );
}
