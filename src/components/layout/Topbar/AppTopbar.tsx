// src/components/layout/Topbar/AppTopbar.tsx
import { Sun, Moon, UserCircle } from "lucide-react";
import Button from "../../common/Button";
import { useSidebar } from "../../../stores/uiStore";
import { motion } from "framer-motion";

export const AppTopbar = () => {
const { theme, toggleTheme } = useSidebar();

return (
<motion.header
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4 }}
className="flex items-center justify-between px-4 bg-white border-b shadow-sm h-14 dark:bg-slate-900 dark:border-slate-700"
>
<h1 className="text-lg font-semibold tracking-wide text-cyan-700 dark:text-cyan-300">
Web-Based Land Mapping System
</h1>
  <div className="flex items-center gap-2">
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
    >
      {theme === "dark" ? (
        <Sun className="text-yellow-400" />
      ) : (
        <Moon className="text-gray-800" />
      )}
    </Button>

    <Button variant="ghost" size="icon" className="rounded-full">
      <UserCircle className="text-cyan-500" />
    </Button>
  </div>
</motion.header>
);
};