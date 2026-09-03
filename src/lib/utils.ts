export function getLegalDong(region: string): string {
  const regionParts = region.trim().split(/\s+/);

  return regionParts[regionParts.length - 1] ?? region;
}

export function getWarmthColor(value: number): string {
  if (value < 36.5) {
    return 'var(--color-warmth-l1)';
  }

  if (value < 37) {
    return 'var(--color-warmth-l2)';
  }

  if (value < 38) {
    return 'var(--color-warmth-l3)';
  }

  if (value < 41) {
    return 'var(--color-warmth-l4)';
  }

  if (value < 52) {
    return 'var(--color-warmth-l5)';
  }

  return 'var(--color-warmth-l6)';
}

export function parseTags(tags: string): string[] {
  return tags
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

export function formatPriceText(price: string): string {
  const numericPrice = Number(price.replace(/\D/g, ''));

  if (!numericPrice) {
    return '0';
  }

  return formatThousandsBySuffix(numericPrice, '원');
}

export function formatThousandsBySuffix(value: number, suffix: string): string {
  return value.toLocaleString('ko-KR', {
    useGrouping: suffix !== '년',
  });
}

export function removeCommaFromString(value: string): string {
  return value.replace(/,/g, '');
}

export function getFullAddress(address: string, addressDetail: string): string {
  return [address, addressDetail].filter(Boolean).join(' ');
}

export async function copyTextToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');

  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
