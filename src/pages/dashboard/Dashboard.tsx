// src/pages/dashboard/Dashboard.tsx
import { Card, CardContent } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { SparklesCore } from "../../components/ui/sparkles";
import {
  FileBarChart2,
  Globe2,
  FolderKanban,
  Users,
} from "lucide-react";

const stats = [
  { label: "Total Projects", value: 12, icon: FolderKanban },
  { label: "Active Field Ops", value: 4, icon: Globe2 },
  { label: "Data Sets", value: 23, icon: FileBarChart2 },
  { label: "Team Members", value: 9, icon: Users },
];

const recentActivities = [
  { id: 1, action: "Uploaded site survey file", user: "Ali Raza", timestamp: "2025-06-25 10:45 AM" },
  { id: 2, action: "Edited project boundaries", user: "Fatima Khan", timestamp: "2025-06-24 2:17 PM" },
  { id: 3, action: "Created new project", user: "Ahmed Noor", timestamp: "2025-06-23 1:00 PM" },
];

const teamLocations = [
  {
    id: 1,
    name: "Ali Raza",
    position: [6.3005, -10.7974],
    location: "Monrovia",
  },
  {
    id: 2,
    name: "Fatima Khan",
    position: [6.4312, -10.7684],
    location: "Paynesville",
  },
  {
    id: 3,
    name: "Ahmed Noor",
    position: [6.2948, -10.7601],
    location: "Sinkor",
  },
];

export default function Dashboard() {
  return (
    <div className="relative h-full overflow-y-auto">
      <div className="absolute inset-0 -z-10">
        <SparklesCore
          background="transparent"
          minSize={1}
          maxSize={2.5}
          particleDensity={120}
          className="w-full h-full"
          particleColor="#00C6FF"
        />
      </div>

      <div className="relative p-6 space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight text-cyan-700 dark:text-cyan-300"
        >
          📊 Dashboard Overview
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-cyan-100 dark:border-cyan-800 shadow-xl hover:scale-[1.02] transition-transform"
            >
              <Card>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                    <p className="text-3xl font-bold text-cyan-800 dark:text-white">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-cyan-600 dark:text-cyan-300" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="w-full h-64 overflow-hidden border border-gray-200 rounded-xl dark:border-slate-700">
          <MapContainer
            center={[6.3, -10.8]}
            zoom={11}
            scrollWheelZoom={false}
            className="z-0 w-full h-full rounded-xl"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {teamLocations.map((team) => (
              <Marker
                key={team.id}
                position={team.position as [number, number]}
                icon={L.icon({
                  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })}
              >
                <Popup>
                  <p className="text-sm font-semibold">{team.name}</p>
                  <p className="text-xs text-gray-500">{team.location}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="overflow-hidden border shadow-sm rounded-xl dark:border-slate-700">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((log, i) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b last:border-none dark:border-slate-700"
                >
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
