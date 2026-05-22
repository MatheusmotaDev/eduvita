import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { ComplianceClient } from "@/features/compliance/components/ComplianceClient";
import { FileCheck } from "lucide-react";

export const revalidate = 0;

export default function ConformidadePage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-neutral-900 flex items-center gap-2">
          <FileCheck className="h-6 w-6 text-primary-600" />
          Auditoria de Conformidade Legal
        </h1>
        <p className="text-base text-neutral-500 mt-1">
          Monitoramento de adequação das unidades escolares perante a Lei Brasileira de Inclusão (LBI).
        </p>
      </div>
      
      <ComplianceClient />
    </DashboardLayout>
  );
}
