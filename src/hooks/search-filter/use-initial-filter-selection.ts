import { useEffect, useRef } from 'react';
import type {
  InitialFilterCodeMap,
  SearchFilterChangeHandlers,
  SearchFilterSectionKey,
} from '@/types/search-filter';

type UseInitialFilterSelectionOptions = {
  actions: SearchFilterChangeHandlers;
  initialFilterCodes?: InitialFilterCodeMap;
};

export default function useInitialFilterSelection({
  actions,
  initialFilterCodes,
}: UseInitialFilterSelectionOptions): void {
  const hasAppliedInitialSelection = useRef(false);

  useEffect(() => {
    // 중복 초기화 방지
    if (hasAppliedInitialSelection.current) {
      return;
    }

    // 초기화 완료 처리
    hasAppliedInitialSelection.current = true;

    // 섹션별 초기 선택값 적용
    for (const key of Object.keys(
      initialFilterCodes ?? {},
    ) as SearchFilterSectionKey[]) {
      const code = initialFilterCodes?.[key];

      if (code) {
        actions.onSectionSelectionChange(key, [code]);
      }
    }
  }, [actions, initialFilterCodes]);
}
