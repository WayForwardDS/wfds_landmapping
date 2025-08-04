// src/pages/layers/LayersPage.tsx
import { useState, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { SparklesCore } from "../../components/ui/sparkles";
import { Switch } from "../../components/ui/Switch";
import { Button } from "../../components/ui/button";
import { UploadCloud } from "lucide-react";

const baseLayers = [
  {
    id: "osm",
    name: "Base Map (OpenStreetMap)",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors",
  },
  {
    id: "satellite",
    name: "Satellite View",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenTopoMap",
  },
  {
    id: "terrain",
    name: "Terrain",
    url: "https://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
    attribution: "&copy; Stamen Design",
  },
];

export default function LayersPage() {
  const [activeLayerId, setActiveLayerId] = useState("osm");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`📁 Selected file: ${file.name}`);
      // In future: parse and display uploaded GeoJSON/KML layer
    }
  };

  const activeLayer = baseLayers.find((layer) => layer.id === activeLayerId);

  return (
    <div className="relative h-full overflow-y-auto">
      {/* Background Sparkles */}
      <div className="absolute inset-0 -z-10">
        <SparklesCore
          background="transparent"
          minSize={1}
          maxSize={2.5}
          className="w-full h-full"
          particleColor="#00C6FF"
        />
      </div>

      <div className="relative flex flex-col p-6 space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
        {/* Sidebar Layer Controls */}
        <div className="w-full space-y-6 lg:w-1/4">
          <h3 className="text-xl font-bold text-cyan-700 dark:text-cyan-300">
            🧩 Layer Controls
          </h3>

          {baseLayers.map((layer) => (
            <div
              key={layer.id}
              className="flex items-center justify-between px-4 py-2 bg-white border rounded-lg shadow-sm dark:bg-slate-800 dark:border-slate-700"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {layer.name}
              </span>
              <Switch
  checked={activeLayerId === layer.id}
  onChange={() => setActiveLayerId(layer.id)}
/>

            </div>
          ))}

          {/* Upload Custom Layer Button */}
          <div className="pt-4">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".geojson,.kml,.zip"
              onChange={handleFileChange}
            />
            <Button
              variant="default"
              size="md"
              onClick={handleUploadClick}
              className="w-full animate-bounce bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:scale-[1.03] transition-all"
            >
              <UploadCloud className="w-4 h-4 mr-2" /> Upload Custom Layer
            </Button>
          </div>
        </div>

        {/* Map Preview Area */}
        <div className="w-full lg:w-3/4 border rounded-xl overflow-hidden h-[500px] dark:border-slate-700">
          <MapContainer
            center={[6.4281, -9.4295]}
            zoom={7}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            {activeLayer && (
              <TileLayer
                key={activeLayer.id} // 🔁 Force rerender
                attribution={activeLayer.attribution}
                url={activeLayer.url}
              />
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
