import type { ReactNode } from 'react';
import CarDetailInfoTable from '@/components/cars/car-detail-info-table.tsx';
import CarDetailInfoValue from '@/components/cars/car-detail-info-value.tsx';
import type { CarDetailInfoRow, CarSaleInfo } from '@/types/cars';

type CarDetailSaleSectionProps = {
  saleInfo: CarSaleInfo;
};

export default function CarDetailSaleSection({
  saleInfo,
}: CarDetailSaleSectionProps): ReactNode {
  const rows: CarDetailInfoRow[] = [
    { label: '이전 등록 비용', value: saleInfo.registrationCost },
    {
      label: '직거래로 아끼는 비용',
      value: (
        <CarDetailInfoValue
          tooltip="딜러에게 구매할 경우 발생하는 추가 비용을 아낄 수 있어요."
          tooltipLabel="직거래 절감 비용 설명"
        >
          <strong className="car-detail-saving">
            {saleInfo.directTradeSavings}
          </strong>
        </CarDetailInfoValue>
      ),
    },
  ];

  return (
    <CarDetailInfoTable
      title="매물 정보"
      rows={rows}
      linkLabel="보험료 계산 및 대출한도 조회"
    />
  );
}
