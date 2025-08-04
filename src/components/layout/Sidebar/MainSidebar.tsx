import {
  MapIcon,
  UsersIcon,
  LayersIcon,
  SettingsIcon,
  ImportIcon,
  UploadIcon,
  MessageSquareIcon,
  RadarIcon,
  Globe2Icon,
  ClipboardListIcon,
  NotebookIcon,
  WaypointsIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../common/Button";
import { useSidebar } from "../../../stores/uiStore";
import clsx from "clsx";

const navItems = [
  { label: "Dashboard", icon: MapIcon, path: "/dashboard" },
  { label: "Field Ops", icon: UsersIcon, path: "/fieldops-page" },
  { label: "Layers", icon: LayersIcon, path: "/layers" },
  { label: "Import", icon: ImportIcon, path: "/exportimport-Page" },
  { label: "Export", icon: UploadIcon, path: "/export" },
  { label: "Drone Mapping", icon: RadarIcon, path: "/drone-mapping" },
  { label: "GPS Tracker", icon: Globe2Icon, path: "/gps-tracker" },
  { label: "Data Collection", icon: ClipboardListIcon, path: "/data-collection" },
  { label: "All Data", icon: NotebookIcon, path: "/all-data" },
  { label: "Activity Log", icon: WaypointsIcon, path: "/activity-log" },
  { label: "Project Mgmt", icon: NotebookIcon, path: "/project-management" },
  { label: "Team & Chat", icon: MessageSquareIcon, path: "/team-chat" },
  { label: "Settings", icon: SettingsIcon, path: "/settings" },
];

export const MainSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <motion.aside
      initial={{ width: 72 }}
      animate={{ width: isOpen ? 240 : 72 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "h-screen bg-white border-r shadow-md dark:bg-slate-900 dark:border-slate-700",
        "flex flex-col transition-all overflow-hidden"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="overflow-hidden text-xl font-bold tracking-wide transition-all duration-200 text-cyan-600 whitespace-nowrap">
          {isOpen ? "LandMapper" : "LM"}
        </span>
        <Button
  variant="ghost"
  size="sm"
  onClick={toggleSidebar}
  className="w-10 h-10 p-0 rounded-full"
>

          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1 px-2 mt-2 overflow-y-auto scrollbar-hide">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = pathname.startsWith(path);
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={clsx(
                "flex items-center w-full gap-3 px-3 py-2 rounded-md transition-all",
                isActive
                  ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-800 dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
              )}
            >
              <Icon size={20} className="shrink-0" />
              {isOpen && <span className="text-sm truncate">{label}</span>}
            </button>
          );
        })}
      </nav>
    </motion.aside>
  );
};
