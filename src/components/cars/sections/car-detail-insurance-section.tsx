import type { ReactNode } from 'react';
import CarDetailInfoTable from '@/components/cars/car-detail-info-table.tsx';
import type { CarDetailInfoRow, CarInsuranceInfo } from '@/types/types';

type CarDetailInsuranceSectionProps = {
  insuranceInfo: CarInsuranceInfo;
};

export default function CarDetailInsuranceSection({
  insuranceInfo,
}: CarDetailInsuranceSectionProps): ReactNode {
  const rows: CarDetailInfoRow[] = [
    { label: '내 차 피해', value: insuranceInfo.ownCarDamage },
    { label: '소유자 변경', value: insuranceInfo.ownerChanges },
    { label: '렌트, 영업', value: insuranceInfo.usage },
    { label: '전손, 침수', value: insuranceInfo.totalLossOrFlooding },
  ];

  return (
    <CarDetailInfoTable title="보험 이력 정보" rows={rows} linkLabel="더보기" />
  );
}
