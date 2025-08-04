// src/pages/gps/GpsTracker.tsx

import { useState } from "react";
import { TrackedUser } from "../../types/gps";
import { motion } from "framer-motion";
import { ScrollArea } from "../../components/ui/ScrollArea";
import { cn } from "../../utils/cn";
import { User, MapPin, Clock, Navigation } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const dummyUsers: TrackedUser[] = [
  {
    id: "1",
    name: "Ali Raza",
    avatar: "/avatars/user1.png",
    online: true,
    lastLocation: { lat: 33.6844, lng: 73.0479, timestamp: new Date().toISOString() },
    path: [],
  },
  {
    id: "2",
    name: "Fatima Khan",
    avatar: "/avatars/user2.png",
    online: false,
    lastLocation: { lat: 24.8607, lng: 67.0011, timestamp: new Date().toISOString() },
    path: [],
  },
];

export default function GpsTracker() {
  const [activeUser, setActiveUser] = useState<TrackedUser | null>(dummyUsers[0]);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-tr from-cyan-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="z-10 w-64 bg-white border-r shadow-md dark:bg-slate-900 dark:border-slate-700"
      >
        <div className="p-4 border-b dark:border-slate-700">
          <h2 className="flex items-center gap-2 text-lg font-bold text-cyan-700 dark:text-cyan-300">
            <Navigation className="w-5 h-5" /> GPS Tracker
          </h2>
        </div>
        <ScrollArea className="h-full">
          <ul className="divide-y divide-gray-200 dark:divide-slate-700">
            {dummyUsers.map((user) => (
              <li
                key={user.id}
                className={cn(
                  "flex items-center gap-3 p-4 cursor-pointer transition hover:bg-cyan-50 dark:hover:bg-slate-800",
                  activeUser?.id === user.id && "bg-cyan-100 dark:bg-slate-800"
                )}
                onClick={() => setActiveUser(user)}
              >
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 border rounded-full dark:border-slate-600"
                  />
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900",
                      user.online ? "bg-green-500" : "bg-gray-400"
                    )}
                  ></span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Last seen: {new Date(user.lastLocation.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </motion.aside>

      {/* Profile + Map */}
      <div className="relative flex-1 overflow-hidden">
        {activeUser ? (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <img
                  src={activeUser.avatar}
                  className="w-10 h-10 border rounded-full dark:border-slate-600"
                  alt={activeUser.name}
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{activeUser.name}</p>
                  <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" /> Last updated: {new Date(activeUser.lastLocation.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                  <MapPin className="w-4 h-4" /> Lat: {activeUser.lastLocation.lat.toFixed(4)}, Lng: {activeUser.lastLocation.lng.toFixed(4)}
                </p>
              </div>
            </div>

            {/* Leaflet Map */}
           <div className="flex-1 h-[calc(100%-72px)]">
  <MapContainer
    center={[activeUser.lastLocation.lat, activeUser.lastLocation.lng]}
    zoom={13}
    scrollWheelZoom={false}
    className="z-0 w-full h-full rounded-none"
  >

                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="© OpenStreetMap contributors"
                />
                <CircleMarker
                  center={[activeUser.lastLocation.lat, activeUser.lastLocation.lng]}
                  radius={12}
                  pathOptions={{
                    color: activeUser.online ? "#22c55e" : "#9ca3af", // green or gray
                    fillOpacity: 0.8,
                  }}
                />
              </MapContainer>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a user to view location
          </div>
        )}
      </div>
    </div>
  );
}
