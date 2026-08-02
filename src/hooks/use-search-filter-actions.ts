import { useCallback, useMemo, type Dispatch } from 'react';
import type {
  SearchFilterFieldName,
  SearchFilterSectionKey,
} from '@/types/search-filter-configs.ts';
import type {
  SearchFilterChangeActions,
} from '@/types/search-filter-state.ts';
import {
  isPriceInputField,
  type SearchFilterAction,
} from '@/reducers/search-filter-reducer.ts';

type UseSearchFilterActionsOptions = {
  isAppliedPriceRangeClearedOnInput: boolean;
  dispatch: Dispatch<SearchFilterAction>;
};

export default function useSearchFilterActions({
  isAppliedPriceRangeClearedOnInput,
  dispatch,
}: UseSearchFilterActionsOptions): SearchFilterChangeActions {
  const handleCodesChange = useCallback(
    (key: SearchFilterSectionKey, codes: string[]): void => {
      dispatch({ type: 'setCodes', key, codes });
    },
    [dispatch],
  );

  const handleSectionCodeToggle = useCallback(
    (key: SearchFilterSectionKey, code: string): void => {
      dispatch({ type: 'toggleCode', key, code });
    },
    [dispatch],
  );

  const handleSectionValueChange = useCallback(
    (key: SearchFilterSectionKey, value: string): void => {
      handleCodesChange(key, [value]);
    },
    [handleCodesChange],
  );

  const handleSectionFieldChange = useCallback(
    (
      _key: SearchFilterSectionKey,
      field: SearchFilterFieldName,
      value: string,
    ): void => {
      if (field === 'selectedPrice') {
        dispatch({ type: 'selectPrice', value });
        return;
      }

      if (!isPriceInputField(field)) {
        return;
      }

      dispatch({
        type: 'changePriceField',
        field,
        value,
        isAppliedPriceRangeCleared: isAppliedPriceRangeClearedOnInput,
      });
    },
    [dispatch, isAppliedPriceRangeClearedOnInput],
  );

  return useMemo(
    () => ({
      onSectionCodesChange: handleCodesChange,
      onSectionCodeToggle: handleSectionCodeToggle,
      onSectionFieldChange: handleSectionFieldChange,
      onSectionValueChange: handleSectionValueChange,
    }),
    [
      handleCodesChange,
      handleSectionCodeToggle,
      handleSectionFieldChange,
      handleSectionValueChange,
    ],
  );
}
