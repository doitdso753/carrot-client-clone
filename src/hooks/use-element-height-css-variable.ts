import { useEffect, useRef, type RefObject } from 'react';

export default function useElementHeightCssVariable<T extends HTMLElement>(
  variableName: `--${string}`,
): RefObject<T | null> {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const updateElementHeight = (): void => {
      document.documentElement.style.setProperty(
        variableName,
        `${element.offsetHeight}px`,
      );
    };
    const resizeObserver = new ResizeObserver(updateElementHeight);

    updateElementHeight();
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
      document.documentElement.style.removeProperty(variableName);
    };
  }, [variableName]);

  return elementRef;
}
