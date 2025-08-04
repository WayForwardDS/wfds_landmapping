        import { useEffect, useState } from "react";
        import { MapContainer } from "../../components/gis/MapControls/MapContainer";
        import { LayerToggle } from "../../components/gis/MapControls/LayerToggle";
        import { DrawTools } from "../../components/gis/MapControls/DrawTools";
        import { MeasurementTool } from "../../components/gis/MapControls/MeasurementTool";
        import { CRSSelector } from "../../components/gis/MapControls/CRSSelector";
        import DashboardLayout from "../../components/layout/DashboardLayout";
        import ParcelList from "../../components/DataPanels/ParcelList";
        import AttributeTable from "../../components/DataPanels/AttributeTable";
        import LandImportWizard from "../../features/land-management/hooks/LandImportWizard";

        const mockParcels = [
        { id: "1", name: "Parcel A", area: 450 },
        { id: "2", name: "Parcel B", area: 320 },
        { id: "3", name: "Parcel C", area: 780 }
        ];

        export default function MapDashboard() {
        const [selectedParcel, setSelectedParcel] = useState(null);

        useEffect(() => {
        document.title = "Land Mapping Dashboard";
        }, []);

        return (
        <DashboardLayout>
        <div className="relative w-full h-full overflow-hidden">
        <MapContainer />

            <div className="absolute z-30 space-y-3 top-4 left-4">
            <LayerToggle />
            <DrawTools />
            <MeasurementTool />
            <CRSSelector />
            </div>
        <div className="absolute z-40 top-4 right-4">
        <LandImportWizard />
        </div>

            <ParcelList parcels={mockParcels} onSelect={setSelectedParcel} />
            <AttributeTable selectedParcel={selectedParcel} />
        </div>
        </DashboardLayout>
        );
        }
