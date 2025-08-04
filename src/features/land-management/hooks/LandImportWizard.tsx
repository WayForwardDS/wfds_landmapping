import { useRef } from "react";
import shp from "shpjs";
import { useParcelStore } from "@/stores/parcelStore";
import { toast } from "react-toastify";
import * as turf from "@turf/turf";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";

export default function LandImportWizard() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const setParcels = useParcelStore((s) => s.setParcels);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase();

    try {
      if (ext === "geojson" || ext === "json") {
        const text = await file.text();
        const geojson = JSON.parse(text);
        processGeoJSON(geojson);
      } else if (ext === "zip") {
        const geojson = await shp(file);
        processGeoJSON(geojson);
      } else {
        toast.error("❌ Unsupported file format. Upload .geojson or .zip shapefile.");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to parse file.");
    }
  };

  const processGeoJSON = (geojson: any) => {
    const features = geojson.features.map((f: any, i: number) => ({
      id: f.id || `parcel-${i + 1}`,
      ...f.properties,
      area: turf.area(f),
    }));
    setParcels(features);
    toast.success(`✅ Imported ${features.length} parcel(s)`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-white border shadow-lg dark:bg-slate-800 rounded-xl dark:border-slate-600 w-fit"
    >
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition rounded-md shadow bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-cyan-600 hover:to-blue-700"
      >
        <Upload className="w-4 h-4" />
        Import Boundary File
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".geojson,.json,.zip"
        onChange={handleFileChange}
        className="hidden"
      />
    </motion.div>
  );
}
