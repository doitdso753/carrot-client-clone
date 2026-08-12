import type { ReactNode } from 'react';
import useTooltip from '@/hooks/ui/use-tooltip.ts';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

type BubbleTooltipProps = {
  children: ReactNode;
  content: ReactNode;
  placement?: TooltipPlacement;
  triggerLabel?: string;
};

export default function BubbleTooltip({
  children,
  content,
  placement = 'bottom',
  triggerLabel,
}: BubbleTooltipProps): ReactNode {
  const { isOpen, tooltipRef, toggleTooltip } = useTooltip<HTMLSpanElement>();

  return (
    <span className="bubble-tooltip" ref={tooltipRef}>
      <button
        aria-expanded={isOpen}
        aria-label={triggerLabel}
        className="bubble-tooltip-trigger"
        type="button"
        onClick={toggleTooltip}
      >
        {children}
      </button>
      {isOpen && (
        <span
          className={`bubble-tooltip-bubble bubble-tooltip-bubble--${placement}`}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
}
