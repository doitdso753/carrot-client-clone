export type MapCoordinate = {
  latitude: number;
  longitude: number;
};

export type MapBounds = {
  northEast: MapCoordinate;
  southWest: MapCoordinate;
};

export type MapBoundsChangeSource = 'drag' | 'initial';

export type MapBoundsChangeEvent = {
  bounds: MapBounds;
  source: MapBoundsChangeSource;
};

export type MapRegion = MapCoordinate & {
  addressName: string;
  code: string;
  region1DepthName: string;
  region2DepthName: string;
  region3DepthName: string;
  region4DepthName: string;
};
