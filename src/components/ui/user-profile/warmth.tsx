import type { CSSProperties, ReactNode } from 'react';
import BubbleTooltip from '@/components/ui/bubble-tooltip.tsx';
import { getWarmthColor } from '@/lib/utils.ts';

type WarmthProps = {
  value: number;
};

const WARMTH_TOOLTIP_TEXT =
  '매너온도는 당근 사용자로부터 받은 칭찬, 후기, 비매너 평가, 운영자 제재 등을 종합해서 만든 매너 지표예요.';

export default function Warmth({ value }: WarmthProps): ReactNode {
  const warmthColor = getWarmthColor(value);
  const warmthStyle = {
    '--warmth-color': warmthColor,
    '--warmth-progress': `${Math.min(Math.max(value, 0), 99)}%`,
  } as CSSProperties;

  return (
    <div className="warmth" style={warmthStyle}>
      <strong className="warmth-value">
        {value.toFixed(1)}°C <span aria-hidden="true">😊</span>
      </strong>
      <span className="warmth-bar" />
      <BubbleTooltip
        content={WARMTH_TOOLTIP_TEXT}
        triggerLabel="매너온도 설명 보기"
      >
        매너온도
      </BubbleTooltip>
    </div>
  );
}
