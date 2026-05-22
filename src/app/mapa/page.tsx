import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { MapClient } from "@/features/map/components/MapClient";
import { Map } from "lucide-react";

export const revalidate = 0;

export default function MapaPage() {
  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900 flex items-center gap-2">
            <Map className="h-6 w-6 text-primary-600" />
            Mapa de Vulnerabilidade
          </h1>
          <p className="text-base text-neutral-500 mt-1">
            Visualização térmica do Índice de Vulnerabilidade Escolar (IVEB) nas capitais do Brasil.
          </p>
        </div>
      </div>
      
      <MapClient />
    </DashboardLayout>
  );
}
