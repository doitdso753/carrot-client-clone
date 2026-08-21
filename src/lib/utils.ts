function calculateElapsedMinutes(date: Date | string | number): number {
  const normalizedDate =
    typeof date === 'string' &&
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(date)
      ? date.replace(' ', 'T')
      : date;
  const targetDate = new Date(normalizedDate);
  const now = new Date();
  const diffMilliseconds = Math.max(0, now.getTime() - targetDate.getTime());

  return Math.floor(diffMilliseconds / (1000 * 60));
}

export function getElapsedTimeText(date: Date | string | number): string {
  const diffMinutes = calculateElapsedMinutes(date);

  if (diffMinutes < 60) {
    return `${Math.max(1, diffMinutes)}분 전`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const diffDays = Math.floor(diffHours / 24);

  if (diffDays < 30) {
    return `${diffDays}일 전`;
  }

  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths < 12) {
    return `${diffMonths}개월 전`;
  }

  return `${Math.floor(diffMonths / 12)}년 전`;
}

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
