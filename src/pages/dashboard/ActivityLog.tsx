import { useState } from "react";
import { ClockIcon } from "lucide-react";
import { motion } from "framer-motion";
import Input from "../../components/common/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";

const activityData = [
  {
    id: 1,
    action: "Uploaded site survey file",
    user: "Ali Raza",
    timestamp: "2025-06-25 10:45 AM",
  },
  {
    id: 2,
    action: "Edited project boundaries",
    user: "Fatima Khan",
    timestamp: "2025-06-24 2:17 PM",
  },
  {
    id: 3,
    action: "Deleted old drone footage",
    user: "Ahmed Noor",
    timestamp: "2025-06-23 9:30 AM",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function ActivityLogPage() {
  const [search, setSearch] = useState("");

  const filtered = activityData.filter(
    (item) =>
      item.action.toLowerCase().includes(search.toLowerCase()) ||
      item.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#0d141c] dark:text-white">
          📝 Activity Log
        </h2>
      </div>

      <Input
        placeholder="🔍 Search activity or user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="overflow-hidden bg-white border shadow-xl rounded-2xl dark:bg-slate-800 dark:border-slate-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((log, idx) => (
              <motion.tr
                key={log.id}
                className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <TableCell>
                  <span className="inline-block text-sm font-medium text-gray-900 dark:text-gray-100">
                    {log.action}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-blue-800 bg-blue-100 rounded-full dark:bg-blue-800 dark:text-white">
                      {getInitials(log.user)}
                    </div>
                    <span className="text-sm">{log.user}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {log.timestamp}
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}
