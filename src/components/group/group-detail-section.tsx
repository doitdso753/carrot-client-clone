import type { ReactNode } from 'react';
import { ChevronRightThinIcon } from '@/assets/icons';

type GroupDetailSectionProps = {
  children: ReactNode;
  title: string;
};

export default function GroupDetailSection({
  children,
  title,
}: GroupDetailSectionProps): ReactNode {
  return (
    <section className="group-detail-section">
      <header className="group-detail-section-header">
        <h2>{title}</h2>
        <button className="group-detail-section-more-button" type="button">
          <span>더보기</span>
          <ChevronRightThinIcon />
        </button>
      </header>
      {children}
    </section>
  );
}
