import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { Header } from "@/features/dashboard/components/Header";
import { DashboardClient } from "@/features/dashboard/components/DashboardClient";
import { Button } from "@/shared/ui/Button";
import { Download } from "lucide-react";
import { getDashboardMetrics } from "@/features/schools/services/schoolService";

export const revalidate = 0; // Forçar a renderização dinâmica no servidor

export default async function Home() {
  const metrics = await getDashboardMetrics();

  return (
    <div className="flex h-screen w-full bg-neutral-100">
      <Sidebar />
      
      <div className="flex flex-1 flex-col pl-[280px]">
        <Header />
        
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl font-bold text-neutral-900">Dashboard Nacional</h1>
              <p className="text-base text-neutral-500">
                Visão consolidada da infraestrutura e bem-estar nas escolas públicas (Base: <strong>{metrics.total} unidades</strong>)
              </p>
            </div>
            <Button variant="primary">
              <Download className="mr-2 h-5 w-5" />
              Exportar Relatório
            </Button>
          </div>
          
          <DashboardClient metrics={metrics} />
        </main>
      </div>
    </div>
  );
}
