// 📄 File: src/components/gps/GpsMap.tsx
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";
import { TrackedUser } from "../../types/gps";

mapboxgl.accessToken = "pk.eyJ1IjoiZ2lzcHJvamVjdCIsImEiOiJja3Z4ZnM5dDQwYjc5MnZwY3NrdHdjNThwIn0.fYWBw2E2bVPG8gJlsv0QoA";

type Props = {
  user: TrackedUser | null;
};

export const GpsMap = ({ user }: Props) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const pathLineRef = useRef<mapboxgl.GeoJSONSource | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !user) return;

    // Initialize map only once
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [user.lastLocation.lng, user.lastLocation.lat],
        zoom: 12,
      });

      mapRef.current.on("load", () => {
        // Add empty path source and line layer
        mapRef.current?.addSource("user-path", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        mapRef.current?.addLayer({
          id: "user-path-line",
          type: "line",
          source: "user-path",
          paint: {
            "line-color": "#00C6FF",
            "line-width": 4,
          },
        });

        pathLineRef.current = mapRef.current?.getSource("user-path") as mapboxgl.GeoJSONSource;
      });
    }

    // Move marker
    if (markerRef.current) markerRef.current.remove();
    markerRef.current = new mapboxgl.Marker({ color: "#00C6FF" })
      .setLngLat([user.lastLocation.lng, user.lastLocation.lat])
      .addTo(mapRef.current!);

    // Fly to position
    mapRef.current.flyTo({
      center: [user.lastLocation.lng, user.lastLocation.lat],
      zoom: 14,
      speed: 1.2,
    });

    // Draw path
    if (pathLineRef.current && user.path.length > 1) {
      pathLineRef.current.setData({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: user.path.map((loc) => [loc.lng, loc.lat]),
            },
            properties: {},
          },
        ],
      });
    }
  }, [user]);

  return <div ref={mapContainerRef} className="w-full h-full shadow rounded-xl" />;
};
