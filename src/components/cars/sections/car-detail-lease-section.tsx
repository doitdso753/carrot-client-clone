import { useState, type ReactNode } from 'react';
import CarDetailInfoTable from '@/components/cars/car-detail-info-table.tsx';
import CarDetailInfoValue from '@/components/cars/car-detail-info-value.tsx';
import CustomSelect, {
  type CustomSelectOption,
} from '@/components/ui/form/custom-select.tsx';
import type { CarDetailInfoRow, CarLeaseInfo } from '@/types/types';

type CarDetailLeaseSectionProps = {
  leaseInfo: CarLeaseInfo;
};

type LeaseAmountType = 'beforeMaturity' | 'afterMaturity';

const LEASE_AMOUNT_OPTIONS: readonly CustomSelectOption<LeaseAmountType>[] = [
  { label: '만기 후 금액', value: 'afterMaturity' },
  { label: '만기 전 금액', value: 'beforeMaturity' },
];

export default function CarDetailLeaseSection({
  leaseInfo,
}: CarDetailLeaseSectionProps): ReactNode {
  const [amountType, setAmountType] =
    useState<LeaseAmountType>('afterMaturity');
  const selectedAmount =
    amountType === 'afterMaturity'
      ? leaseInfo.maturityAmount
      : leaseInfo.earlyTerminationAmount;
  let rows: CarDetailInfoRow[];
  rows = [
    {
      label: '남은 개월 수',
      value: `${leaseInfo.remainingMonths}개월`,
    },
    {
      label: '승계 후 총 월 납입금',
      value: leaseInfo.totalMonthlyPayment,
    },
    {
      label: '인수금',
      value: (
        <CarDetailInfoValue
          tooltip="판매자에게 지급해야 할 금액이에요."
          tooltipLabel="인수금 설명"
        >
          {leaseInfo.acquisitionPayment}
        </CarDetailInfoValue>
      ),
    },
    {
      id: 'lease-amount',
      label: (
        <CustomSelect
          ariaLabel="리스 금액 기준"
          options={LEASE_AMOUNT_OPTIONS}
          value={amountType}
          onChange={setAmountType}
        />
      ),
      value: (
        <CarDetailInfoValue
          tooltip="렌트(리스)사에 지급해야 할 구매 비용(잔존가치 - 보증금)"
          tooltipLabel="리스 금액 설명"
        >
          {selectedAmount}
        </CarDetailInfoValue>
      ),
    },
    {
      label: '총 인수 비용',
      value: (
        <CarDetailInfoValue
          tooltip="차량을 인수하고 만기 때까지 운행했을 때 발생하는 총비용이에요."
          tooltipLabel="총 인수 비용 설명"
        >
          {leaseInfo.totalAcquisitionCost}
        </CarDetailInfoValue>
      ),
    },
  ];

  return <CarDetailInfoTable title="리스 정보" rows={rows} />;
}
