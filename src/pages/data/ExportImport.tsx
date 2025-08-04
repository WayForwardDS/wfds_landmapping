import { useState, useRef } from "react";
import { SparklesCore } from "../../components/ui/sparkles";
import { Button } from "../../components/ui/button";
import { UploadCloud, Download, FileText } from "lucide-react";
import { Tabs, Tab } from "../../components/ui/Tabs"; 

export default function ExportImportPage() {
const [activeTab, setActiveTab] = useState<"import" | "export">("import");
const [previewFileName, setPreviewFileName] = useState("");
const fileInputRef = useRef<HTMLInputElement>(null);

const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
const file = e.target.files?.[0];
if (file) {
setPreviewFileName(file.name);
}
};

const triggerFileSelect = () => {
fileInputRef.current?.click();
};

return (
<div className="relative h-full overflow-y-auto">
<div className="absolute inset-0 -z-10">
<SparklesCore background="transparent" minSize={1} maxSize={2.5} className="w-full h-full" particleColor="#00C6FF" />
</div>
  <div className="relative px-6 py-8 space-y-6">
    <h2 className="text-3xl font-bold tracking-tight text-cyan-700 dark:text-cyan-300">
      🔁 Export / Import Spatial Data
    </h2>

    <div className="flex items-center space-x-4">
      <Button
        variant={activeTab === "import" ? "default" : "outline"}
        onClick={() => setActiveTab("import")}
        className="transition-all"
      >
        📥 Import
      </Button>
      <Button
        variant={activeTab === "export" ? "default" : "outline"}
        onClick={() => setActiveTab("export")}
        className="transition-all"
      >
        📤 Export
      </Button>
    </div>

    {activeTab === "import" && (
      <div className="p-6 space-y-4 bg-white border rounded-lg shadow-md dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
          Upload Geo Data
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Supported formats: <strong>.geojson, .kml, .zip (shapefiles), .csv, .xlsx</strong>
        </p>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".geojson,.kml,.zip,.csv,.xlsx"
          onChange={handleFileUpload}
        />
        <Button
          onClick={triggerFileSelect}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white w-full hover:scale-[1.02] shadow-md"
        >
          <UploadCloud className="w-4 h-4 mr-2" /> Upload File
        </Button>
        {previewFileName && (
          <div className="flex items-center p-3 mt-3 bg-gray-100 rounded-lg dark:bg-slate-700">
            <FileText className="w-5 h-5 mr-2 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{previewFileName}</span>
          </div>
        )}
      </div>
    )}

    {activeTab === "export" && (
      <div className="p-6 space-y-6 bg-white border rounded-lg shadow-md dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
          Export Your Map Layers
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Select Layers to Export:</label>
            <select className="w-full p-2 border rounded-md dark:bg-slate-700 dark:text-white dark:border-slate-600">
              <option>🧩 All Visible Layers</option>
              <option>📍 GPS Tracks</option>
              <option>📷 Drone Imagery</option>
              <option>🗺️ Survey Data</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Export Format:</label>
            <select className="w-full p-2 border rounded-md dark:bg-slate-700 dark:text-white dark:border-slate-600">
              <option>GeoJSON (.geojson)</option>
              <option>Shapefile (.zip)</option>
              <option>CSV (.csv)</option>
              <option>Excel (.xlsx)</option>
            </select>
          </div>

          <Button
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white w-full hover:scale-[1.02] shadow-md"
          >
            <Download className="w-4 h-4 mr-2" /> Export Now
          </Button>
        </div>
      </div>
    )}
  </div>
</div>
);
}