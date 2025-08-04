import { create } from "zustand";

interface Parcel {
  id: string;
  name: string;
  area: number;
  [key: string]: any;
}

interface ParcelStore {
  parcels: Parcel[];
  selectedParcel: Parcel | null;
  setParcels: (data: Parcel[]) => void;
  selectParcel: (parcel: Parcel) => void;
}

export const useParcelStore = create<ParcelStore>((set) => ({
  parcels: [],
  selectedParcel: null,
  setParcels: (data) => set({ parcels: data }),
  selectParcel: (parcel) => set({ selectedParcel: parcel })
}));
