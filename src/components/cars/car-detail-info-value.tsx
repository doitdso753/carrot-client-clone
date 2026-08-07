import type { ReactNode } from 'react';
import { InfoIcon } from '@/assets/icons';
import BubbleTooltip from '@/components/ui/bubble-tooltip.tsx';

type CarDetailInfoValueProps = {
  children: ReactNode;
  tooltip: string;
  tooltipLabel: string;
};

export default function CarDetailInfoValue({
  children,
  tooltip,
  tooltipLabel,
}: CarDetailInfoValueProps): ReactNode {
  return (
    <span className="car-detail-info-value">
      {children}
      <BubbleTooltip
        content={tooltip}
        placement="bottom"
        triggerLabel={tooltipLabel}
      >
        <InfoIcon />
      </BubbleTooltip>
    </span>
  );
}
