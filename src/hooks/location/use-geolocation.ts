import { useState } from 'react';
import type {
  GeolocationErrorCode,
  GeolocationState,
  GeolocationStatus,
} from '@/types/geolocation.ts';

function getGeolocationErrorCode(
  error: GeolocationPositionError,
): GeolocationErrorCode {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return 'PERMISSION_DENIED';
    case error.POSITION_UNAVAILABLE:
      return 'POSITION_UNAVAILABLE';
    case error.TIMEOUT:
      return 'REQUEST_TIMEOUT';
    default:
      return 'UNKNOWN_ERROR';
  }
}

export default function useGeolocation(): GeolocationState {
  const [errorCode, setErrorCode] = useState<GeolocationErrorCode | null>(null);
  const [status, setStatus] = useState<GeolocationStatus>('idle');

  const request = (): void => {
    if (!navigator.geolocation) {
      setErrorCode('GEOLOCATION_UNSUPPORTED');
      setStatus('error');
      return;
    }

    setErrorCode(null);
    setStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      () => {
        setErrorCode(null);
        setStatus('granted');
      },
      (error) => {
        setErrorCode(getGeolocationErrorCode(error));
        setStatus('error');
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    );
  };

  return {
    errorCode,
    isLoading: status === 'requesting',
    request,
    status,
  };
}
