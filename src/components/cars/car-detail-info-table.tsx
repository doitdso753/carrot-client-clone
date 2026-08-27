import type { ReactNode } from 'react';
import { ChevronRightThinIcon } from '@/assets/icons';
import type { CarDetailInfoRow } from '@/types/cars';

type CarDetailInfoTableProps = {
  title: string;
  rows: CarDetailInfoRow[];
  linkLabel?: string;
};

export default function CarDetailInfoTable({
  title,
  rows,
  linkLabel,
}: CarDetailInfoTableProps): ReactNode {
  return (
    <section className="car-detail-section">
      <h2>{title}</h2>
      <dl className="car-detail-info-list">
        {rows.map((row, index) => (
          <div
            className="car-detail-info-row"
            key={
              row.id ??
              (typeof row.label === 'string' ? row.label : `row-${index}`)
            }
          >
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
      {linkLabel && (
        <button className="car-detail-text-link" type="button">
          {linkLabel}
          <ChevronRightThinIcon />
        </button>
      )}
    </section>
  );
}
