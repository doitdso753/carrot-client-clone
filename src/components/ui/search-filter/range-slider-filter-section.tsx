import {
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import useRangeSlider from '@/hooks/use-range-slider.ts';
import { formatThousandsBySuffix } from '@/lib/utils.ts';

type RangeSliderFilterSectionProps = {
  isApplyButtonDisabled?: boolean;
  maximum: number;
  maximumValue: number;
  minimum: number;
  minimumValue: number;
  step: number;
  suffix: string;
  title: string;
  onApply: (minimumValue: number, maximumValue: number) => void;
  onChange?: (minimumValue: number, maximumValue: number) => void;
};

export default function RangeSliderFilterSection({
  isApplyButtonDisabled = false,
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
  const [tempMinimumValue, setTempMinimumValue] = useState(minimumValue);
  const [tempMaximumValue, setTempMaximumValue] = useState(maximumValue);

  useEffect(() => {
    setTempMinimumValue(minimumValue);
    setTempMaximumValue(maximumValue);
  }, [maximumValue, minimumValue]);

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
    maximumValue: tempMaximumValue,
    minimum,
    minimumValue: tempMinimumValue,
    step,
    suffix,
    onChange: (nextMinimumValue, nextMaximumValue) => {
      setTempMinimumValue(nextMinimumValue);
      setTempMaximumValue(nextMaximumValue);
      onChange?.(nextMinimumValue, nextMaximumValue);
    },
  });
  const sliderStyle = {
    '--range-end': `${maximumPosition}%`,
    '--range-start': `${minimumPosition}%`,
  } as CSSProperties;

  return (
    <section className="search-filter-section range-slider-filter-section">
      <h3>{title}</h3>
      <div className="range-slider-filter-content">
        <p className="range-slider-filter-value">{rangeLabel}</p>
        <div className="range-slider" style={sliderStyle}>
          <span className="range-slider-track" aria-hidden="true" />
          <label className="sr-only" htmlFor={minimumInputId}>
            {title} 최솟값
          </label>
          <input
            aria-valuetext={`${formatThousandsBySuffix(
              tempMinimumValue,
              suffix,
            )}${suffix}`}
            id={minimumInputId}
            max={controlMaximum}
            min={controlMinimum}
            step={step}
            type="range"
            value={tempMinimumValue}
            onChange={(event) =>
              handleMinimumChange(Number(event.target.value))
            }
          />
          <label className="sr-only" htmlFor={maximumInputId}>
            {title} 최댓값
          </label>
          <input
            aria-valuetext={`${formatThousandsBySuffix(
              tempMaximumValue,
              suffix,
            )}${suffix}`}
            id={maximumInputId}
            max={controlMaximum}
            min={controlMinimum}
            step={step}
            type="range"
            value={tempMaximumValue}
            onChange={(event) =>
              handleMaximumChange(Number(event.target.value))
            }
          />
        </div>
      </div>
      <button
        className="search-filter-apply-button"
        disabled={isApplyButtonDisabled}
        type="button"
        onClick={() => onApply(tempMinimumValue, tempMaximumValue)}
      >
        적용하기
      </button>
    </section>
  );
}
