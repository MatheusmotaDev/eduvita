import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { RankingsClient } from "@/features/rankings/components/RankingsClient";
import { Trophy } from "lucide-react";

export const revalidate = 0;

export default function RankingsPage() {
  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-neutral-900 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary-600" />
            Rankings Municipais
          </h1>
          <p className="text-base text-neutral-500 mt-1">
            Métricas de desempenho agregado comparando o sistema educacional entre cidades.
          </p>
        </div>
      </div>
      
      <RankingsClient />
    </DashboardLayout>
  );
}
