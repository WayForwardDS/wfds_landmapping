export type GpsCoordinate = {
lat: number;
lng: number;
timestamp: string;
};

export type TrackedUser = {
id: string;
name: string;
avatar: string;
online: boolean;
lastLocation: GpsCoordinate;
path: GpsCoordinate[]; // Historical route
};