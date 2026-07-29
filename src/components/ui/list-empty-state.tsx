import type { ReactNode } from 'react';

type ListEmptyStateProps = {
  region: string;
};

function getLegalDong(region: string): string {
  const regionParts = region.trim().split(/\s+/);

  return regionParts[regionParts.length - 1] ?? region;
}

export default function ListEmptyState({
  region,
}: ListEmptyStateProps): ReactNode {
  const legalDong = getLegalDong(region);

  return (
    <div className="list-empty-state">
      <strong>{legalDong} 근처에 게시글이 없어요.</strong>
      <p>검색어를 수정하시거나, 다른 조건으로 검색해주세요.</p>
    </div>
  );
}
