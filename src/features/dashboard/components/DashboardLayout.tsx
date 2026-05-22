"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-neutral-100 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* 
        Ajuste Mobile: 
        - Removemos o pl-[280px] no mobile.
        - Ele passa a existir apenas em telas lg (lg:pl-[280px]) 
      */}
      <div className="flex flex-1 flex-col w-full lg:pl-[280px] transition-all duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        
        {/* Padding menor no mobile (p-4) e maior no desktop (lg:p-8) */}
        <main className="flex-1 overflow-auto p-4 lg:p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
