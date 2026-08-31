import type { ReactNode } from 'react';
import type { GroupItem } from '@/types/group';
import { LocationIcon } from '@/assets/icons';
import OpenAppCtaButton from '@/components/ui/open-app-cta-button.tsx';

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

      <section className="group-detail-summary">
        <p>{item.description}</p>
        <button className="group-detail-more-button" type="button">
          더보기
        </button>
        <ul className="car-detail-option-list" aria-label="모임 태그">
          <li className="car-detail-option">
            <LocationIcon />
            <span>{item.location}</span>
          </li>
          <li className="car-detail-option">{item.category.categoryName}</li>
          <li className="car-detail-option">동네 모임</li>
        </ul>
        <OpenAppCtaButton />
      </section>

    </aside>
  );
}
