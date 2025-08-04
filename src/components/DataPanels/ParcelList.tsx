import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/common/Button";
import { useParcelStore } from "../../stores/parcelStore";

interface Parcel {
id: string;
name: string;
area: number;
}

interface Props {
parcels: Parcel[];
onSelect: (parcel: Parcel) => void;
}

export default function ParcelList() {
  const parcels = useParcelStore((s) => s.parcels);
  const selectParcel = useParcelStore((s) => s.selectParcel);

  if (!parcels.length) return null;

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="absolute top-0 left-0 z-40 h-full w-[300px] bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 shadow-xl p-4 overflow-y-auto"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">📦 Parcel List</h2>
      <ul className="space-y-2">
        {parcels.map((parcel) => (
          <li
            key={parcel.id}
            onClick={() => selectParcel(parcel)}
            className="px-3 py-2 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-white"
          >
            🧱 {parcel.name || parcel.id}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}