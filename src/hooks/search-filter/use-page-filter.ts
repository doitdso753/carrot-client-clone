import {
  useEffect,
  useReducer,
  useRef,
  useState,
  type Dispatch,
  type Reducer,
} from 'react';

type UsePageFilterReturn<TFilterState, TFilterAction> = [
  TFilterState,
  Dispatch<TFilterAction>,
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

export default function usePageFilter<TFilterState, TFilterAction>(
  storageKey: string,
  initialState: TFilterState,
  isFilterState: (value: unknown) => value is TFilterState,
  reducer: Reducer<TFilterState, TFilterAction>,
  createReplaceAction: (filterState: TFilterState) => TFilterAction,
): UsePageFilterReturn<TFilterState, TFilterAction> {
  const [filterState, dispatch] = useReducer(reducer, initialState);
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
      dispatch(
        createReplaceAction(
          getStoredFilterState(storageKey, initialState, isFilterState),
        ),
      );
    } else {
      localStorage.removeItem(storageKey);
    }

    setIsHydrated(true);
  }, [createReplaceAction, initialState, isFilterState, storageKey]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(storageKey, JSON.stringify(filterState));
  }, [filterState, isHydrated, storageKey]);

  return [filterState, dispatch];
}
