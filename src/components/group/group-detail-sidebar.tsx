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
      <section className="group-detail-profile">
        <img src={item.imageUrl} alt="" />
        <div className="group-detail-profile-text">
          <h1>{item.title}</h1>
          <p>
            멤버 {item.memberCount} · {item.category.categoryName}
          </p>
        </div>
      </section>

    </aside>
  );
}
