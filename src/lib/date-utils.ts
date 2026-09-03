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

export function getMonthText(date: string): string {
  return `${new Date(date).getMonth() + 1}월`;
}

export function getDateDayText(date: string): string {
  return String(new Date(date).getDate());
}

export function formatNumericDate(date: string): string {
  return new Intl.DateTimeFormat('ko-KR', {
    day: 'numeric',
    month: 'numeric',
  }).format(new Date(date));
}
