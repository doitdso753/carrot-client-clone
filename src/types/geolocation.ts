export type GeolocationStatus = 'idle' | 'requesting' | 'granted' | 'error';

export type GeolocationErrorCode =
  | 'GEOLOCATION_UNSUPPORTED'
  | 'PERMISSION_DENIED'
  | 'POSITION_UNAVAILABLE'
  | 'REQUEST_TIMEOUT'
  | 'UNKNOWN_ERROR';

export type GeolocationState = {
  errorCode: GeolocationErrorCode | null;
  isLoading: boolean;
  request: () => void;
  status: GeolocationStatus;
};
