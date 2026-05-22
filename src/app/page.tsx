import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { Header } from "@/features/dashboard/components/Header";
import { KPICard } from "@/features/dashboard/components/KPICard";
import { Droplets, HeartHandshake, Leaf, Utensils } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { Download } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-screen w-full bg-neutral-100">
      <Sidebar />
      
      <div className="flex flex-1 flex-col pl-[280px]">
        <Header />
        
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl font-bold text-neutral-900">Dashboard Nacional</h1>
              <p className="text-base text-neutral-500">Visão consolidada da infraestrutura e bem-estar nas escolas públicas</p>
            </div>
            <Button variant="primary">
              <Download className="mr-2 h-5 w-5" />
              Exportar Relatório
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard 
              title="Escolas sem Água"
              value="3.492"
              trend="down"
              trendValue="↓ 12% vs ano ant."
              context="Escolas sem acesso à água potável"
              icon={Droplets}
              status="critical"
            />
            
            <KPICard 
              title="Apoio Psicológico"
              value="15,7%"
              trend="up"
              trendValue="↑ 2,1% vs ano ant."
              context="Escolas com psicólogo no quadro"
              icon={HeartHandshake}
              status="warning"
            />
            
            <KPICard 
              title="Segurança Alimentar"
              value="82,4%"
              trend="up"
              trendValue="↑ 5% vs ano ant."
              context="Com cozinha e refeitório"
              icon={Utensils}
              status="success"
            />
            
            <KPICard 
              title="Ambientes Saudáveis"
              value="41,2%"
              trend="neutral"
              trendValue="0% vs ano ant."
              context="Com área verde ou plantio"
              icon={Leaf}
              status="neutral"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl bg-white p-6 shadow-sm border border-neutral-200 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <MapIconPlaceholder />
                <p className="text-neutral-500 font-semibold mt-4">Área reservada para o Mapa de Calor (Etapa 5)</p>
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm border border-neutral-200 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <TrophyIconPlaceholder />
                <p className="text-neutral-500 font-semibold mt-4">Rankings de Municípios (Etapa 5)</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Ícones temporários para o Mock
function MapIconPlaceholder() {
  return (
    <svg className="mx-auto h-12 w-12 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  )
}
function TrophyIconPlaceholder() {
  return (
    <svg className="mx-auto h-12 w-12 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
}
