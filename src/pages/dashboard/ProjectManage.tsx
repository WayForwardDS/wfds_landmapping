// src/pages/project/ProjectManagementPage.tsx

import { useState } from "react";
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
import {
  EyeIcon,
  PencilLineIcon,
  BadgeCheckIcon,
  HourglassIcon,
  ClockIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const dummyProjects = [
  {
    id: 1,
    name: "Residential Layout Planning",
    status: "In Progress",
    team: "Ali, Fatima",
    updated: "2025-06-25",
  },
  {
    id: 2,
    name: "Drone Survey Analysis",
    status: "Completed",
    team: "Ahmed, Sara",
    updated: "2025-06-20",
  },
  {
    id: 3,
    name: "Boundary Dispute Mapping",
    status: "Pending",
    team: "Hassan",
    updated: "2025-06-18",
  },
];

const getStatusBadge = (status: string) => {
  const base = "inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full";
  switch (status) {
    case "Completed":
      return <span className={`${base} bg-green-100 text-green-700`}><BadgeCheckIcon className="w-4 h-4 mr-1" /> Completed</span>;
    case "In Progress":
      return <span className={`${base} bg-blue-100 text-blue-700`}><HourglassIcon className="w-4 h-4 mr-1" /> In Progress</span>;
    case "Pending":
      return <span className={`${base} bg-yellow-100 text-yellow-700`}><ClockIcon className="w-4 h-4 mr-1" /> Pending</span>;
    default:
      return status;
  }
};

export default function ProjectManagementPage() {
  const [search, setSearch] = useState("");

  const filtered = dummyProjects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[#0d141c] dark:text-white">📁 Project Management</h2>
        <Button size="sm" className="shadow-md rounded-xl">+ New Project</Button>
      </div>

      <Input
        placeholder="🔍 Search by project name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="overflow-hidden bg-white border shadow-xl rounded-2xl dark:bg-slate-800 dark:border-slate-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((project) => (
              <motion.tr
                key={project.id}
                className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: project.id * 0.05 }}
              >
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{getStatusBadge(project.status)}</TableCell>
                <TableCell>{project.team}</TableCell>
                <TableCell>{project.updated}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button size="sm" className="px-3 text-blue-800 bg-blue-100 rounded-lg hover:bg-blue-200">
                    <EyeIcon className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="px-3 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600">
                    <PencilLineIcon className="w-4 h-4" />
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
