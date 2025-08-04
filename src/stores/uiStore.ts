// src/stores/uiStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const useSidebar = create<UIState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () => {
        const t = get().theme === "dark" ? "light" : "dark";
        set({ theme: t });
        document.documentElement.classList.toggle("dark", t === "dark");
        localStorage.setItem("theme", t);
      },
      setTheme: (t) => {
        set({ theme: t });
        document.documentElement.classList.toggle("dark", t === "dark");
        localStorage.setItem("theme", t);
      },
      isOpen: true,
      toggleSidebar: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: "ui" }
  )
);
