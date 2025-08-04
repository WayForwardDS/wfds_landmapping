import { ScrollArea } from "../../components/ui/ScrollArea";
import { TrackedUser } from "../../types/gps";
import { motion } from "framer-motion";

type Props = {
  user: TrackedUser | null;
};

export default function PathHistorySidebar({ user }: Props) {
  if (!user) return null;

  return (
    <motion.aside
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      exit={{ x: 100 }}
      className="bg-white border-l w-72 dark:bg-slate-900 dark:border-slate-700"
    >
      <div className="p-4 border-b dark:border-slate-700">
        <h2 className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">
          {user.name}'s Path
        </h2>
      </div>
      <ScrollArea className="h-full">
        <ul className="p-4 space-y-3 text-sm">
          {user.path.length === 0 ? (
            <li className="text-gray-500 dark:text-gray-400">No path history</li>
          ) : (
            user.path.map((loc, idx) => (
              <li key={idx} className="text-gray-700 dark:text-gray-300">
                📍 {loc.lat.toFixed(5)}, {loc.lng.toFixed(5)}
                <div className="text-xs text-gray-400">{new Date(loc.timestamp).toLocaleString()}</div>
              </li>
            ))
          )}
        </ul>
      </ScrollArea>
    </motion.aside>
  );
}
