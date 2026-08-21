import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronRightIcon } from '@/assets/icons';
import CommunityBoardItem from '@/components/ui/board-list/community-board-item.tsx';
import { POPULAR_COMMUNITY_ITEMS } from '@/types/community-constants.ts';

type CommunityPopularSectionProps = {
  currentItemId: number;
  location: string;
};

export default function CommunityPopularSection({
  currentItemId,
  location,
}: CommunityPopularSectionProps): ReactNode {
  const popularItems = POPULAR_COMMUNITY_ITEMS.filter(
    ({ id }) => id !== currentItemId,
  ).slice(0, 3);

  return (
    <section className="community-detail-popular">
      <header className="community-detail-popular-heading">
        <h2>{location} 근처 동네생활 인기글</h2>
        <Link to="/community">
          더보기
          <ChevronRightIcon />
        </Link>
      </header>
      <ul className="community-detail-popular-list">
        {popularItems.map((item) => (
          <li key={item.id}>
            <Link to={`/community/${item.id}`}>
              <CommunityBoardItem item={item} variant="default" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
