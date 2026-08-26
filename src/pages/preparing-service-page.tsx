import { useEffect, useRef, type ReactNode } from 'react';
import { useNavigate } from 'react-router';

export default function PreparingServicePage(): ReactNode {
  const navigate = useNavigate();
  const hasAlertedRef = useRef(false);

  useEffect(() => {
    if (hasAlertedRef.current) {
      return;
    }

    hasAlertedRef.current = true;
    window.alert('준비중 입니다...');
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
}
