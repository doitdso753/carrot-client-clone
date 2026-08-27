import type { ReactNode } from 'react';
import LocalProfileBoardItem from '@/components/local-profile/local-profile-board-item.tsx';
import ListEmptyState from '@/components/ui/list-empty-state.tsx';
import type { LocalProfileItem } from '@/types/local-profile';

type LocalProfileBoardListProps = {
  items: LocalProfileItem[];
  region: string;
};

// 지도형 동네업체 화면에서 사용하는 전용 업체 목록
export default function LocalProfileBoardList({
  items,
  region,
}: LocalProfileBoardListProps): ReactNode {
  return (
    <section className="local-profile-board-list-content list-content">
      {items.length > 0 ? (
        <ul className="local-profile-board-list">
          {items.map((item) => (
            <LocalProfileBoardItem item={item} key={item.id} />
          ))}
        </ul>
      ) : (
        <ListEmptyState region={region} />
      )}
    </section>
  );
}
