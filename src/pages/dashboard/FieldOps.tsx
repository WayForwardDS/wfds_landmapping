import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { SparklesCore } from "../../components/ui/sparkles";
// import { Input } from "../../components/ui/input";

// ✅ Dummy team data for Liberia
const allTeamData = [
  {
    id: 1,
    name: "James Kollie",
    location: "Monrovia",
    address: "Paynesville City, Montserrado County, Liberia",
    coords: [6.3156, -10.8074],
    status: "online",
  },
  {
    id: 2,
    name: "Grace Johnson",
    location: "Ganta",
    address: "Ganta City, Nimba County, Liberia",
    coords: [7.2333, -8.9833],
    status: "offline",
  },
  {
    id: 3,
    name: "Samuel Doe",
    location: "Buchanan",
    address: "Port of Buchanan, Grand Bassa County, Liberia",
    coords: [5.8733, -10.0494],
    status: "online",
  },
  {
    id: 4,
    name: "Esther Nagbe",
    location: "Zwedru",
    address: "Zwedru City, Grand Gedeh County, Liberia",
    coords: [6.0667, -8.1333],
    status: "offline",
  },
  {
    id: 5,
    name: "Michael Gbala",
    location: "Harper",
    address: "Harper City, Maryland County, Liberia",
    coords: [4.375, -7.7167],
    status: "online",
  },
];

const markerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function FieldOpsPage() {
  const [filter, setFilter] = useState("all");

  const filteredData =
    filter === "all"
      ? allTeamData
      : allTeamData.filter((member) => member.status === filter);

  return (
    <div className="relative h-full overflow-y-auto">
      {/* Particles */}
      <div className="absolute inset-0 -z-10">
        <SparklesCore
          background="transparent"
          minSize={1}
          maxSize={2.5}
          particleDensity={90}
          className="w-full h-full"
          particleColor="#00C6FF"
        />
      </div>

      <div className="relative p-6 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-cyan-700 dark:text-cyan-300">
          📍 Field Operations – Liberia Map View
        </h2>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border shadow-sm transition ${
              filter === "all" ? "bg-cyan-600 text-white" : "bg-white dark:bg-slate-800"
            }`}
            onClick={() => setFilter("all")}
          >
            Show All
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border shadow-sm transition ${
              filter === "online" ? "bg-green-600 text-white" : "bg-white dark:bg-slate-800"
            }`}
            onClick={() => setFilter("online")}
          >
            Online Only
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border shadow-sm transition ${
              filter === "offline" ? "bg-gray-600 text-white" : "bg-white dark:bg-slate-800"
            }`}
            onClick={() => setFilter("offline")}
          >
            Offline Only
          </button>
        </div>

        {/* Map of Liberia */}
        <div className="w-full overflow-hidden border border-gray-200 h-96 rounded-xl dark:border-slate-700">
          <MapContainer
            center={[6.4281, -9.4295]}
            zoom={7}
            scrollWheelZoom={true}
            className="z-10 w-full h-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            />
            {filteredData.map((member) => (
              <Marker key={member.id} position={member.coords} icon={markerIcon}>
                <Popup>
                  <div className="font-semibold">{member.name}</div>
                  <div className="text-sm text-gray-600">{member.address}</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Team Table */}
        <div className="overflow-hidden border shadow-sm rounded-xl dark:border-slate-700">
          <Table>
            <TableHeader>
              <TableRow className="text-sm font-semibold text-gray-700 bg-cyan-100 dark:bg-slate-800 dark:text-gray-300">
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Location</TableHead>
                <TableHead>Full Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="text-base font-medium">{member.name}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        member.status === "online"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {member.status}
                    </span>
                  </TableCell>
                  <TableCell>{member.location}</TableCell>
                  <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                    {member.address}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
