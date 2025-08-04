
// import { motion } from "framer-motion";
// import { Card, CardContent } from "../../components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";

// export default function DroneMapping() {
//   return (
//     <div className="h-full p-6 space-y-6 overflow-y-auto">
//       {/* Page Header */}
//       <h2 className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">🛰️ Drone Mapping (Future Feature)</h2>

//       {/* Callout for future scope */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//         className="p-6 border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl"
//       >
//         <h3 className="mb-2 text-xl font-semibold text-yellow-800 dark:text-yellow-300">This section is a placeholder for future integration with drone mapping capabilities.</h3>
//         <ul className="pl-5 space-y-2 text-sm text-yellow-700 list-disc dark:text-yellow-200">
//           <li>Connecting to drone APIs for flight planning and data capture.</li>
//           <li>Displaying drone flight paths and imagery overlays.</li>
//           <li>Processing drone data for creating detailed maps or 3D models.</li>
//           <li>Integrating with specific drone hardware and software requires significant development and access to relevant APIs.</li>
//           <li>This functionality is beyond the scope of this basic web application.</li>
//         </ul>
//       </motion.div>

//       {/* You can keep any mock cards/tables/map previews below if needed */}
//     </div>
//   );
// }

// src/pages/drone/DroneMapping.tsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import { Card, CardContent } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { SparklesCore } from "../../components/ui/sparkles";

mapboxgl.accessToken = "your_mapbox_access_token"; // Replace with a valid token

const dummyMissions = [
  {
    id: 1,
    name: "Survey Flight - Zone A",
    date: "2025-06-25",
    duration: "15 min",
    status: "Completed",
  },
  {
    id: 2,
    name: "Boundary Mapping - East Field",
    date: "2025-06-22",
    duration: "22 min",
    status: "In Progress",
  },
];

const droneStats = [
  { label: "Total Flights", value: 14 },
  { label: "Completed", value: 10 },
  { label: "In Progress", value: 3 },
  { label: "Aborted", value: 1 },
];

export default function DroneMapping() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [69.3451, 30.3753],
      zoom: 4,
    });

    return () => map.remove();
  }, []);

  return (
    <div className="relative h-full overflow-y-auto">
      {/* Particle Background */}
      <div className="absolute inset-0 -z-10">
        <SparklesCore
          background="transparent"
          minSize={1}
          maxSize={3.5}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#38bdf8" // sky blue
        />
      </div>

      <div className="relative p-6 space-y-6">
        <h2 className="text-3xl font-bold text-cyan-700 dark:text-cyan-300">
          🚁 Drone Mapping (Future Feature)
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl"
        >
          <h3 className="mb-2 text-xl font-semibold text-yellow-800 dark:text-yellow-300">
            This section is a placeholder for future drone mapping features.
          </h3>
          <ul className="pl-5 space-y-1 text-sm text-yellow-700 list-disc dark:text-yellow-200">
            <li>Connect to drone APIs for real-time control and telemetry.</li>
            <li>Show live drone paths, captured imagery, and overlays.</li>
            <li>Generate 3D terrain, NDVI maps, and geospatial analytics.</li>
            <li>Future integration with drone hardware/software SDKs.</li>
          </ul>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {droneStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border shadow-md bg-white/70 dark:bg-slate-800/80 dark:border-slate-700">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mini Map Preview */}
        <div className="h-64 overflow-hidden border rounded-xl dark:border-slate-700">
          <div ref={mapRef} className="w-full h-full" />
        </div>

        {/* Dummy Mission Table */}
        <div className="overflow-hidden border shadow-sm rounded-xl dark:border-slate-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mission Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyMissions.map((mission) => (
                <TableRow key={mission.id}>
                  <TableCell>{mission.name}</TableCell>
                  <TableCell>{mission.date}</TableCell>
                  <TableCell>{mission.duration}</TableCell>
                  <TableCell>{mission.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
