import type { ReactNode } from 'react';
import { CalendarIcon, MileageIcon, WonSignIcon } from '@/assets/icons';
import type { CarListItem } from '@/types/cars';

type CarDetailSpecSummarySectionProps = {
  item: CarListItem;
};

export default function CarDetailSpecSummarySection({
  item,
}: CarDetailSpecSummarySectionProps): ReactNode {
  return (
    <section className="car-detail-spec-summary" aria-label="차량 핵심 정보">
      <div>
        <WonSignIcon />
        <strong>{item.priceText}</strong>
      </div>
      <div>
        <CalendarIcon />
        <strong>{item.modelYearText}</strong>
      </div>
      <div>
        <MileageIcon />
        <strong>{item.mileageText}</strong>
      </div>
    </section>
  );
}
