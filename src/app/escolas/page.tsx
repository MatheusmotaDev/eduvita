"use client";

import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { SchoolDataGrid } from "@/features/dashboard/components/SchoolDataGrid";
import { SchoolDrawer } from "@/features/schools/components/SchoolDrawer";
import { School } from "lucide-react";
import { useState } from "react";

export default function EscolasPage() {
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-neutral-900 flex items-center gap-2">
          <School className="h-6 w-6 text-primary-600" />
          Perfil de Escola
        </h1>
        <p className="text-base text-neutral-500 mt-1">
          Busque e explore o perfil individual de qualquer escola pública do Brasil.
        </p>
      </div>
      
      {/* Reutilizando o DataGrid sem filtros fixos para permitir a busca livre */}
      <SchoolDataGrid filterType={null} onSelectSchool={setSelectedSchoolId} />

      {selectedSchoolId !== null && (
        <SchoolDrawer 
          schoolId={selectedSchoolId} 
          onClose={() => setSelectedSchoolId(null)} 
        />
      )}
    </DashboardLayout>
  );
}
