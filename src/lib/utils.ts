export function getElapsedTimeText(date: Date | string | number): string {
  const targetDate = new Date(date);
  const now = new Date();
  const diffMilliseconds = Math.max(0, now.getTime() - targetDate.getTime());
  const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));

  if (diffMinutes < 60) {
    return `${Math.max(1, diffMinutes)}분전`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours}시간전`;
  }

  const diffDays = Math.floor(diffHours / 24);

  if (diffDays < 30) {
    return `${diffDays}일전`;
  }

  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths < 12) {
    return `${diffMonths}개월전`;
  }

  return `${Math.floor(diffMonths / 12)}년전`;
}

export function getLegalDong(region: string): string {
  const regionParts = region.trim().split(/\s+/);

  return regionParts[regionParts.length - 1] ?? region;
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
