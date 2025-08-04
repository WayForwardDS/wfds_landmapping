import { useState } from "react";
import { FileTextIcon, DownloadIcon, EyeIcon } from "lucide-react";
import { motion } from "framer-motion";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";

const dummyData = [
  {
    id: 1,
    name: "Site Survey - June",
    uploadedBy: "James Kollie",
    date: "2025-06-25",
    size: "2.4 MB",
    type: "CSV",
  },
  {
    id: 2,
    name: "Boundary Coordinates",
    uploadedBy: "Samuel Doe",
    date: "2025-06-20",
    size: "1.1 MB",
    type: "GeoJSON",
  },
];

export default function AllDataPage() {
  const [search, setSearch] = useState("");

  const filteredData = dummyData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const fileTypeColor = {
    CSV: "bg-green-100 text-green-700",
    GeoJSON: "bg-blue-100 text-blue-700",
    KML: "bg-purple-100 text-purple-700",
  };

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#0d141c] dark:text-white">
          📁 All Uploaded Data
        </h2>
      </div>

      <Input
        placeholder="🔍 Search by file name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="overflow-hidden bg-white border shadow-xl rounded-2xl dark:bg-slate-800 dark:border-slate-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, idx) => (
              <motion.tr
                key={item.id}
                className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <TableCell className="flex items-center gap-2 font-medium text-gray-800 dark:text-gray-100">
                  <FileTextIcon className="w-5 h-5 text-slate-500" />
                  {item.name}
                </TableCell>
                <TableCell>{item.uploadedBy}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${fileTypeColor[item.type as keyof typeof fileTypeColor] || "bg-gray-100 text-gray-600"}`}
                  >
                    {item.type}
                  </span>
                </TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button size="sm" className="transition-all duration-200 hover:scale-105">
                    <EyeIcon className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="secondary" className="transition-all duration-200 hover:scale-105">
                    <DownloadIcon className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
