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
