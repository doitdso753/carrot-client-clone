import type { SearchFilterRange } from '@/types/search-filter';

type SelectedRange = {
  maximum: number;
  minimum: number;
};

// 선택 코드 기반 범위값 계산
export function getSelectedRange(
  selectedCodes: readonly string[] | undefined,
  range: SearchFilterRange,
): SelectedRange {
  return {
    maximum: Number(selectedCodes?.[1] ?? range.maximum + range.step),
    minimum: Number(selectedCodes?.[0] ?? range.minimum - range.step),
  };
}

// 전체 범위 선택 여부 확인
export function isEntireRange(
  minimum: number,
  maximum: number,
  range: SearchFilterRange,
): boolean {
  return (
    minimum === range.minimum - range.step &&
    maximum === range.maximum + range.step
  );
}

// 범위값의 선택 코드 배열 변환
export function serializeSelectedRange(
  minimum: number,
  maximum: number,
  range: SearchFilterRange,
): string[] {
  return isEntireRange(minimum, maximum, range)
    ? []
    : [String(minimum), String(maximum)];
}
