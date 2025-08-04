import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText } from "lucide-react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { Textarea } from "../../components/ui/Textarea";

export default function DataCollection() {
  const [file, setFile] = useState<File | null>(null);
  const [datasetName, setDatasetName] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
  };

  const handleSubmit = () => {
    console.log("Submitting:");
    console.log("File:", file);
    console.log("Dataset Name:", datasetName);
    console.log("Description:", description);
  };

  return (
    <motion.div
      className="max-w-3xl p-6 mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">
          📡 Data Collection
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Upload datasets from the field and add metadata for tracking.
        </p>
      </div>

      <motion.div
        className="p-6 space-y-5 bg-white border border-gray-200 shadow-xl rounded-2xl dark:bg-slate-900 dark:border-slate-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* File Drop Area */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload GeoJSON / CSV / SHP file
        </label>
        <div className="relative w-full px-6 py-8 text-center transition border-2 border-gray-300 border-dashed cursor-pointer rounded-xl bg-gray-50 dark:bg-slate-800 dark:border-slate-600 hover:bg-gray-100">
          <input
            type="file"
            accept=".geojson,.csv,.shp"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          {file ? (
            <div className="flex flex-col items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <FileText className="w-6 h-6 mb-1 text-cyan-600" />
              {file.name}
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
              <UploadCloud className="w-10 h-10 mb-2" />
              <p className="text-sm">Click or drag & drop to upload</p>
              <p className="text-xs text-gray-400">Supports .geojson, .csv, .shp</p>
            </div>
          )}
        </div>

        {/* Dataset Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Dataset Name
          </label>
          <Input
            value={datasetName}
            onChange={(e) => setDatasetName(e.target.value)}
            placeholder="e.g., Site Survey - June"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <Textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Details about what this dataset contains..."
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full mt-4 hover:scale-[1.02] transition-transform duration-200"
        >
          📤 Submit Dataset
        </Button>
      </motion.div>
    </motion.div>
  );
}
