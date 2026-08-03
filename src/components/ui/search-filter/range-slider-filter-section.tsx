import { useId, type CSSProperties, type ReactNode } from 'react';
import useRangeSlider from '@/hooks/use-range-slider.ts';

type RangeSliderFilterSectionProps = {
  maximum: number;
  maximumValue: number;
  minimum: number;
  minimumValue: number;
  step: number;
  suffix: string;
  title: string;
  onApply: () => void;
  onChange: (minimumValue: number, maximumValue: number) => void;
};

export default function RangeSliderFilterSection({
  maximum,
  maximumValue,
  minimum,
  minimumValue,
  step,
  suffix,
  title,
  onApply,
  onChange,
}: RangeSliderFilterSectionProps): ReactNode {
  const minimumInputId = useId();
  const maximumInputId = useId();
  const {
    controlMaximum,
    controlMinimum,
    maximumPosition,
    minimumPosition,
    rangeLabel,
    handleMaximumChange,
    handleMinimumChange,
  } = useRangeSlider({
    maximum,
    maximumValue,
    minimum,
    minimumValue,
    step,
    suffix,
    onChange,
  });
  const sliderStyle = {
    '--range-end': `${maximumPosition}%`,
    '--range-start': `${minimumPosition}%`,
  } as CSSProperties;

  return (
    <section className="search-filter-section range-slider-filter-section">
      <h3>{title}</h3>
      <div className="range-slider-filter-content">
        <p className="range-slider-filter-value">
          {rangeLabel}
        </p>
        <div className="range-slider" style={sliderStyle}>
          <span className="range-slider-track" aria-hidden="true" />
          <label className="sr-only" htmlFor={minimumInputId}>
            {title} 최솟값
          </label>
          <input
            aria-valuetext={`${minimumValue.toLocaleString()}${suffix}`}
            id={minimumInputId}
            max={controlMaximum}
            min={controlMinimum}
            step={step}
            type="range"
            value={minimumValue}
            onChange={(event) => handleMinimumChange(Number(event.target.value))}
          />
          <label className="sr-only" htmlFor={maximumInputId}>
            {title} 최댓값
          </label>
          <input
            aria-valuetext={`${maximumValue.toLocaleString()}${suffix}`}
            id={maximumInputId}
            max={controlMaximum}
            min={controlMinimum}
            step={step}
            type="range"
            value={maximumValue}
            onChange={(event) => handleMaximumChange(Number(event.target.value))}
          />
        </div>
      </div>
      <button
        className="search-filter-apply-button"
        type="button"
        onClick={onApply}
      >
        적용하기
      </button>
    </section>
  );
}
