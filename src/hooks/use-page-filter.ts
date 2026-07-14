import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

export type PageFilterState = {
  selectedCategoryCodes: string[];
  selectedOptionCodes: string[];
};

type UsePageFilterReturn = [
  PageFilterState,
  Dispatch<SetStateAction<PageFilterState>>,
];

const EMPTY_FILTER_STATE: PageFilterState = {
  selectedCategoryCodes: [],
  selectedOptionCodes: [],
};

const INITIAL_PATHNAME = window.location.pathname;
const NAVIGATION_ENTRY = performance.getEntriesByType('navigation')[0] as
  PerformanceNavigationTiming | undefined;

let isInitialFilterHydrationAvailable = NAVIGATION_ENTRY?.type === 'reload';

function getStoredFilterState(storageKey: string): PageFilterState {
  const storedValue = localStorage.getItem(storageKey);

  if (!storedValue) {
    return EMPTY_FILTER_STATE;
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    if (
      typeof parsedValue === 'object' &&
      parsedValue !== null &&
      'selectedCategoryCodes' in parsedValue &&
      'selectedOptionCodes' in parsedValue &&
      Array.isArray(parsedValue.selectedCategoryCodes) &&
      parsedValue.selectedCategoryCodes.every(
        (code) => typeof code === 'string',
      ) &&
      Array.isArray(parsedValue.selectedOptionCodes) &&
      parsedValue.selectedOptionCodes.every((code) => typeof code === 'string')
    ) {
      return {
        selectedCategoryCodes: parsedValue.selectedCategoryCodes,
        selectedOptionCodes: parsedValue.selectedOptionCodes,
      };
    }
  } catch {
    localStorage.removeItem(storageKey);
  }

  return EMPTY_FILTER_STATE;
}

export default function usePageFilter(storageKey: string): UsePageFilterReturn {
  const [filterState, setFilterState] =
    useState<PageFilterState>(EMPTY_FILTER_STATE);
  const [isHydrated, setIsHydrated] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;
    const canRestoreFilter =
      isInitialFilterHydrationAvailable &&
      INITIAL_PATHNAME === window.location.pathname;

    isInitialFilterHydrationAvailable = false;

    if (canRestoreFilter) {
      setFilterState(getStoredFilterState(storageKey));
    } else {
      localStorage.removeItem(storageKey);
    }

    setIsHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(storageKey, JSON.stringify(filterState));
  }, [filterState, isHydrated, storageKey]);

  return [filterState, setFilterState];
}
