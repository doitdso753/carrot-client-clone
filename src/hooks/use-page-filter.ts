import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

type UsePageFilterReturn<TFilterState> = [
  TFilterState,
  Dispatch<SetStateAction<TFilterState>>,
];

const INITIAL_PATHNAME = window.location.pathname;
const NAVIGATION_ENTRY = performance.getEntriesByType('navigation')[0] as
  PerformanceNavigationTiming | undefined;

let isInitialFilterHydrationAvailable = NAVIGATION_ENTRY?.type === 'reload';

function getStoredFilterState<TFilterState>(
  storageKey: string,
  initialState: TFilterState,
  isFilterState: (value: unknown) => value is TFilterState,
): TFilterState {
  const storedValue = localStorage.getItem(storageKey);

  if (!storedValue) {
    return initialState;
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    if (isFilterState(parsedValue)) {
      return parsedValue;
    }
  } catch {
    localStorage.removeItem(storageKey);
  }

  return initialState;
}

export default function usePageFilter<TFilterState>(
  storageKey: string,
  initialState: TFilterState,
  isFilterState: (value: unknown) => value is TFilterState,
): UsePageFilterReturn<TFilterState> {
  const [filterState, setFilterState] = useState<TFilterState>(initialState);
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
      setFilterState(
        getStoredFilterState(storageKey, initialState, isFilterState),
      );
    } else {
      localStorage.removeItem(storageKey);
    }

    setIsHydrated(true);
  }, [initialState, isFilterState, storageKey]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(storageKey, JSON.stringify(filterState));
  }, [filterState, isHydrated, storageKey]);

  return [filterState, setFilterState];
}
