// src/pages/gps/MiniMap.tsx
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const getMarkerIcon = (online: boolean) =>
  new L.Icon({
    iconUrl: online ? "/markers/marker-green.png" : "/markers/marker-gray.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

type MiniMapProps = {
  lat: number;
  lng: number;
  online: boolean;
};

export default function MiniMap({ lat, lng, online }: MiniMapProps) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={false}
      dragging={false}
      zoomControl={false}
      doubleClickZoom={false}
      className="w-full h-32 rounded-md"
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[lat, lng]} icon={getMarkerIcon(online)} />
    </MapContainer>
  );
}
