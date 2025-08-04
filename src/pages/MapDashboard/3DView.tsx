// src/pages/MapDashboard/3DView.tsx
import { useEffect, useRef } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { motion } from "framer-motion";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

export default function Cesium3DView() {
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "3D Terrain View";
    if (!viewerRef.current) return;

    const terrainProvider = Cesium.createWorldTerrain();

    const viewer = new Cesium.Viewer(viewerRef.current, {
      terrainProvider,
      shouldAnimate: true,
      timeline: false,
      animation: false,
      baseLayerPicker: false,
    });

    // Optional flyTo
    viewer.scene.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(67.001, 30.2, 2000),
    });

    return () => viewer.destroy();
  }, []);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-full h-screen"
      >
        <div ref={viewerRef} className="w-full h-full" />
      </motion.div>
    </DashboardLayout>
  );
}
