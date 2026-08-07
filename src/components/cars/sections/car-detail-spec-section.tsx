import type { ReactNode } from 'react';
import { CalendarIcon, MileageIcon, WonSignIcon } from '@/assets/icons';
import type { CarListItem } from '@/types/types';

type CarDetailSpecSectionProps = {
  item: CarListItem;
};

export default function CarDetailSpecSection({
  item,
}: CarDetailSpecSectionProps): ReactNode {
  return (
    <section className="car-detail-spec" aria-label="차량 핵심 정보">
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
