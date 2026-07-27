import { useState } from 'react';

export type CurrentLocationRequestStatus =
  | 'idle'
  | 'requesting'
  | 'granted'
  | 'error';

export type CurrentLocationErrorCode =
  | 'GEOLOCATION_UNSUPPORTED'
  | 'PERMISSION_DENIED'
  | 'POSITION_UNAVAILABLE'
  | 'REQUEST_TIMEOUT'
  | 'UNKNOWN_ERROR';

type UseCurrentLocationRequestReturn = {
  locationErrorCode: CurrentLocationErrorCode | null;
  locationRequestStatus: CurrentLocationRequestStatus;
  requestCurrentLocation: () => void;
};

function getCurrentLocationErrorCode(
  error: GeolocationPositionError,
): CurrentLocationErrorCode {
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

export default function useCurrentLocationRequest(): UseCurrentLocationRequestReturn {
  const [locationErrorCode, setLocationErrorCode] =
    useState<CurrentLocationErrorCode | null>(null);
  const [locationRequestStatus, setLocationRequestStatus] =
    useState<CurrentLocationRequestStatus>('idle');

  const requestCurrentLocation = (): void => {
    if (!navigator.geolocation) {
      setLocationErrorCode('GEOLOCATION_UNSUPPORTED');
      setLocationRequestStatus('error');
      return;
    }

    setLocationErrorCode(null);
    setLocationRequestStatus('requesting');
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationErrorCode(null);
        setLocationRequestStatus('granted');
      },
      (error) => {
        setLocationErrorCode(getCurrentLocationErrorCode(error));
        setLocationRequestStatus('error');
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    );
  };

  return {
    locationErrorCode,
    locationRequestStatus,
    requestCurrentLocation,
  };
}
