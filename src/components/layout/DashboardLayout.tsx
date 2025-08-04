// src/components/layout/DashboardLayout.tsx
import { ReactNode } from "react";
import { AppTopbar } from "../../components/layout/Topbar/AppTopbar";
import { MainSidebar } from "../../components/layout/Sidebar/MainSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[280px] bg-white border-r border-gray-200 dark:bg-slate-900 dark:border-slate-700">
        <MainSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <AppTopbar />

        {/* Page Body */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </main>
    </div>
  );
}