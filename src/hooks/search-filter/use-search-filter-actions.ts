import { useCallback, useMemo, type Dispatch } from 'react';
import type {
  SearchFilterFieldName,
  SearchFilterChangeHandlers,
  SearchFilterSectionKey,
} from '@/types/search-filter';
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
}: UseSearchFilterActionsOptions): SearchFilterChangeHandlers {
  const handleSectionSelectionChange = useCallback(
    (key: SearchFilterSectionKey, selectedCodes: string[]): void => {
      dispatch({ type: 'setCodes', key, codes: selectedCodes });
    },
    [dispatch],
  );

  const handleSectionOptionToggle = useCallback(
    (key: SearchFilterSectionKey, optionCode: string): void => {
      dispatch({ type: 'toggleCode', key, code: optionCode });
    },
    [dispatch],
  );

  const handleSectionOptionSelect = useCallback(
    (key: SearchFilterSectionKey, optionCode: string): void => {
      handleSectionSelectionChange(key, [optionCode]);
    },
    [handleSectionSelectionChange],
  );

  const handleSectionInputChange = useCallback(
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
      onSectionSelectionChange: handleSectionSelectionChange,
      onSectionOptionToggle: handleSectionOptionToggle,
      onSectionInputChange: handleSectionInputChange,
      onSectionOptionSelect: handleSectionOptionSelect,
    }),
    [
      handleSectionSelectionChange,
      handleSectionOptionToggle,
      handleSectionInputChange,
      handleSectionOptionSelect,
    ],
  );
}
