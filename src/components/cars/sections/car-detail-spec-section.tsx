import type { ReactNode } from 'react';
import CarDetailInfoTable from '@/components/cars/car-detail-info-table.tsx';
import type { CarDetailInfoRow, CarListItem } from '@/types/cars';

type CarDetailSpecSectionProps = {
  item: CarListItem;
};

export default function CarDetailSpecSection({
  item,
}: CarDetailSpecSectionProps): ReactNode {
  const rows: CarDetailInfoRow[] = [
    { label: '차종', value: item.vehicleInfo.bodyType },
    {
      label: '연식 / 등록일',
      value: `${item.modelYearText} / ${item.vehicleInfo.registrationDate}`,
    },
    { label: '주행거리', value: item.mileageText },
    { label: '배기량', value: item.vehicleInfo.displacement },
    { label: '연료', value: item.vehicleInfo.fuel },
    { label: '변속기', value: item.vehicleInfo.transmission },
  ];

  return <CarDetailInfoTable title="상세 정보" rows={rows} />;
}
