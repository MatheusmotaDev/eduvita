import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { DenunciasClient } from "@/features/denuncias/components/DenunciasClient";

export default function DenunciasPage() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-neutral-900">Ouvidoria e Alertas</h1>
          <p className="text-neutral-500 mt-1">
            Gerencie os alertas e denúncias de infraestrutura registrados no sistema.
          </p>
        </div>
        <DenunciasClient />
      </div>
    </DashboardLayout>
  );
}
