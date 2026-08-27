import type { ReactNode } from 'react';
import type { CarListItem } from '@/types/cars';

type CarDetailDescriptionSectionProps = {
  item: CarListItem;
};

export default function CarDetailDescriptionSection({
  item,
}: CarDetailDescriptionSectionProps): ReactNode {
  return (
    <section className="car-detail-section car-detail-description">
      <h2>상세 내용</h2>
      <p>{item.description}</p>
      <p className="car-detail-meta">
        채팅 {item.commentCount} · 관심 {item.favoriteCount} · 조회{' '}
        {item.viewCount}
      </p>
    </section>
  );
}
