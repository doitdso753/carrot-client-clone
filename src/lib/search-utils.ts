import { getLegalDong } from '@/lib/utils.ts';

export function includesSearchKeyword(
  keyword: string,
  values: readonly (string | undefined)[],
): boolean {
  const normalizedKeyword = keyword.trim().toLocaleLowerCase();

  if (!normalizedKeyword) {
    return true;
  }

  return values.some((value) =>
    value?.toLocaleLowerCase().includes(normalizedKeyword),
  );
}

export function includesRegion(
  region: string,
  values: readonly (string | undefined)[],
): boolean {
  const legalDong = getLegalDong(region).trim();

  if (!legalDong) {
    return true;
  }

  return values.some((value) => value?.includes(legalDong));
}
