import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cesium3DView from "./pages/MapDashboard/3DView";
import DashboardLayout from "./components/layout/DashboardLayout";
import TeamChat from "./pages/team/TeamChat";
import GpsTracker from "./pages/gps/GpsTracker";
import DataCollection from "./pages/data/DataCollection";
import AllDataPage from "./pages/data/AllData";
import ActivityLogPage from "./pages/dashboard/ActivityLog";
import ProjectManagementPage from "./pages/dashboard/ProjectManage";
import SettingsPage from "./pages/settings/SettingsPage";
import Dashboard from "./pages/dashboard/Dashboard";
import DroneMapping from "./pages/drone/DroneMapping";
import FieldOpsPage from "./pages/dashboard/FieldOps";
import 'leaflet/dist/leaflet.css';
import LayersPage from "./pages/Layers/LayersPage";
import ExportImportPage from "./pages/data/ExportImport";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/3d-view" element={<Cesium3DView />} />
        <Route path="/dashboard" element={ <DashboardLayout><Dashboard /></DashboardLayout>}/>
        <Route path="/team-chat" element={<DashboardLayout><TeamChat /></DashboardLayout>} />
        <Route path="/gps-tracker" element={<DashboardLayout><GpsTracker /></DashboardLayout>} />
        <Route path="/data-collection" element={<DashboardLayout><DataCollection /></DashboardLayout>} />
        <Route path="/all-data" element={<DashboardLayout><AllDataPage /></DashboardLayout>} />
        <Route path="/activity-log" element={<DashboardLayout><ActivityLogPage /></DashboardLayout>} />
        <Route path="/project-management" element={<DashboardLayout><ProjectManagementPage/></DashboardLayout>} />
        <Route path="/drone-mapping" element={<DashboardLayout><DroneMapping /></DashboardLayout>} />
        <Route path="/fieldops-page" element={<DashboardLayout><FieldOpsPage /></DashboardLayout>} />
        <Route path="/layers" element={<DashboardLayout><LayersPage /></DashboardLayout>} />
        <Route path="/exportimport-Page" element={<DashboardLayout><ExportImportPage /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />


        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
