import type { CSSProperties, ReactNode } from 'react';
import { getWarmthColor } from '@/lib/utils.ts';

type WarmthBadgeProps = {
  value: number;
};

export default function WarmthBadge({ value }: WarmthBadgeProps): ReactNode {
  const warmthColor = getWarmthColor(value);
  const warmthStyle = {
    '--warmth-background-color': `color-mix(in srgb, ${warmthColor} 12.16%, transparent)`,
    '--warmth-color': warmthColor,
  } as CSSProperties;

  return (
    <span className="warmth-badge" style={warmthStyle}>
      {value.toFixed(1)}°C
    </span>
  );
}
