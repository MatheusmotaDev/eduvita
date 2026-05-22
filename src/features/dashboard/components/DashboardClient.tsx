"use client";

import { useState } from "react";
import { KPICard } from "@/features/dashboard/components/KPICard";
import { HeartHandshake, Leaf, Utensils, Accessibility } from "lucide-react";
import { SchoolDataGrid } from "./SchoolDataGrid";
import { SchoolDrawer } from "@/features/schools/components/SchoolDrawer";

export function DashboardClient({ metrics }: { metrics: Record<string, number | string> }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);

  const toggleFilter = (filter: string) => {
    setActiveFilter(prev => prev === filter ? null : filter);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title="Sem Acessibilidade"
          value={metrics.noAcessCount}
          trend="down"
          trendValue={`Representa ${metrics.noAcessPct}% da base`}
          context="Escolas sem banheiro adaptado (PNE)"
          icon={Accessibility}
          status="critical"
          isActive={activeFilter === 'no_acess'}
          onClick={() => toggleFilter('no_acess')}
        />
        
        <KPICard 
          title="Apoio Psicológico"
          value={`${metrics.psiPct}%`}
          trend="up"
          trendValue="Com psicólogo"
          context="Escolas com profissional de saúde no quadro"
          icon={HeartHandshake}
          status="warning"
          isActive={activeFilter === 'psi'}
          onClick={() => toggleFilter('psi')}
        />
        
        <KPICard 
          title="Segurança Alimentar"
          value={`${metrics.alimPct}%`}
          trend="up"
          trendValue="Baseado no Censo"
          context="Com cozinha e refeitório operantes"
          icon={Utensils}
          status="success"
          isActive={activeFilter === 'alim'}
          onClick={() => toggleFilter('alim')}
        />
        
        <KPICard 
          title="Ambientes Saudáveis"
          value={`${metrics.verdePct}%`}
          trend="neutral"
          trendValue="Sem variação"
          context="Com área verde no ambiente escolar"
          icon={Leaf}
          status="neutral"
          isActive={activeFilter === 'verde'}
          onClick={() => toggleFilter('verde')}
        />
      </div>

      <SchoolDataGrid 
        filterType={activeFilter} 
        onSelectSchool={(id) => setSelectedSchoolId(id)} 
      />

      {selectedSchoolId !== null && (
        <SchoolDrawer 
          schoolId={selectedSchoolId} 
          onClose={() => setSelectedSchoolId(null)} 
        />
      )}
    </>
  );
}
