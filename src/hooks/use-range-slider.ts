import { useCallback, useMemo } from 'react';
import { formatThousandsBySuffix } from '@/lib/utils.ts';

type UseRangeSliderOptions = {
  maximum: number;
  maximumValue: number;
  minimum: number;
  minimumValue: number;
  step: number;
  suffix: string;
  onChange: (minimumValue: number, maximumValue: number) => void;
};

type UseRangeSliderReturn = {
  controlMaximum: number;
  controlMinimum: number;
  maximumPosition: number;
  minimumPosition: number;
  rangeLabel: string;
  handleMaximumChange: (value: number) => void;
  handleMinimumChange: (value: number) => void;
};

export default function useRangeSlider({
  maximum,
  maximumValue,
  minimum,
  minimumValue,
  step,
  suffix,
  onChange,
}: UseRangeSliderOptions): UseRangeSliderReturn {
  const controlMinimum = minimum - step;
  const controlMaximum = maximum + step;
  const rangeSize = controlMaximum - controlMinimum;
  const minimumPosition = ((minimumValue - controlMinimum) / rangeSize) * 100;
  const maximumPosition = ((maximumValue - controlMinimum) / rangeSize) * 100;

  const rangeLabel = useMemo((): string => {
    const formattedMinimumValue = formatThousandsBySuffix(minimumValue, suffix);
    const formattedMaximumValue = formatThousandsBySuffix(maximumValue, suffix);
    const isEntireRange =
      minimumValue === controlMinimum && maximumValue === controlMaximum;

    if (isEntireRange) {
      return '전체';
    }

    if (minimumValue === controlMinimum) {
      return `${formattedMaximumValue}${suffix} 이하`;
    }

    if (maximumValue === controlMaximum) {
      return `${formattedMinimumValue}${suffix} 이상`;
    }

    return `${formattedMinimumValue}${suffix} ~ ${formattedMaximumValue}${suffix}`;
  }, [controlMaximum, controlMinimum, maximumValue, minimumValue, suffix]);

  const handleMinimumChange = useCallback(
    (value: number): void => {
      onChange(Math.min(value, maximumValue - step), maximumValue);
    },
    [maximumValue, onChange, step],
  );

  const handleMaximumChange = useCallback(
    (value: number): void => {
      onChange(minimumValue, Math.max(value, minimumValue + step));
    },
    [minimumValue, onChange, step],
  );

  return {
    controlMaximum,
    controlMinimum,
    maximumPosition,
    minimumPosition,
    rangeLabel,
    handleMaximumChange,
    handleMinimumChange,
  };
}
