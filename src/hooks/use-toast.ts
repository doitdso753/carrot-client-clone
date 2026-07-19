import { useCallback, useEffect, useRef, useState } from 'react';

type UseToastReturn = {
  hideMessage: () => void;
  isVisible: boolean;
  showMessage: () => void;
};

export default function useToast(durationMilliseconds = 2000): UseToastReturn {
  const timeoutRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const clearMessageTimer = useCallback((): void => {
    if (!timeoutRef.current) {
      return;
    }

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const hideMessage = useCallback((): void => {
    clearMessageTimer();
    setIsVisible(false);
  }, [clearMessageTimer]);

  const showMessage = useCallback((): void => {
    // 연속으로 복사해도 마지막 복사 시점 기준으로 사라지게 합니다.
    clearMessageTimer();
    setIsVisible(true);
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
      timeoutRef.current = null;
    }, durationMilliseconds);
  }, [clearMessageTimer, durationMilliseconds]);

  useEffect(() => {
    return () => {
      clearMessageTimer();
    };
  }, [clearMessageTimer]);

  return {
    hideMessage,
    isVisible,
    showMessage,
  };
}
