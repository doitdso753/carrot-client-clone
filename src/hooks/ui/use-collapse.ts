import { useCallback, useState } from 'react';

type UseCollapseReturn = {
  collapse: () => void;
  expand: () => void;
  isExpanded: boolean;
  toggleCollapse: () => void;
};

export default function useCollapse(
  initialIsExpanded = false,
): UseCollapseReturn {
  const [isExpanded, setIsExpanded] = useState(initialIsExpanded);

  const collapse = useCallback((): void => {
    setIsExpanded(false);
  }, []);

  const expand = useCallback((): void => {
    setIsExpanded(true);
  }, []);

  const toggleCollapse = useCallback((): void => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  }, []);

  return {
    collapse,
    expand,
    isExpanded,
    toggleCollapse,
  };
}
