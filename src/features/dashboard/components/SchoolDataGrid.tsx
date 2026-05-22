"use client";
import { useEffect, useState } from "react";
import { getFilteredSchools, getStates, getCitiesByState } from "@/features/schools/services/schoolService";
import { Button } from "@/shared/ui/Button";
import { MapPin, ArrowRight, Loader2, Filter } from "lucide-react";

export function SchoolDataGrid({ filterType, onSelectSchool }: { filterType: string | null, onSelectSchool: (id: number) => void }) {
  const [schools, setSchools] = useState<Record<string, any>[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Filtros de Localização
  const [states, setStates] = useState<{co_uf: number; sg_uf: string; no_uf: string}[]>([]);
  const [cities, setCities] = useState<{co_municipio: number; no_municipio: string}[]>([]);
  const [selectedState, setSelectedState] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<number | null>(null);

  useEffect(() => {
    getStates().then(setStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      getCitiesByState(selectedState).then(setCities);
    } else {
      setCities([]);
      setSelectedCity(null);
    }
  }, [selectedState]);

  useEffect(() => {
    setSchools([]);
    setPage(0);
    setHasMore(true);
    fetchSchools(0, true);
  }, [filterType, selectedState, selectedCity]);

  const fetchSchools = async (pageNum: number, reset: boolean = false) => {
    setLoading(true);
    const data = await getFilteredSchools(filterType, selectedState, selectedCity, pageNum);
    if (data.length < 30) setHasMore(false);
    
    setSchools(prev => reset ? data : [...prev, ...data]);
    setLoading(false);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchSchools(nextPage);
  };

  const getFilterTitle = () => {
    switch (filterType) {
      case 'no_acess': return 'Escolas Sem Acessibilidade';
      case 'psi': return 'Escolas Com Apoio Psicológico';
      case 'alim': return 'Escolas Com Segurança Alimentar';
      case 'verde': return 'Escolas Com Ambientes Saudáveis';
      default: return 'Todas as Escolas Cadastradas';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 min-h-[400px] flex flex-col">
       <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-neutral-100 pb-4">
         <div>
           <h2 className="text-xl font-bold font-display text-neutral-900 mb-1">
             {getFilterTitle()}
           </h2>
           <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">
             Listando {schools.length} escolas
           </span>
         </div>

         <div className="flex items-center gap-3">
           <div className="flex items-center text-sm font-semibold text-neutral-500 gap-2 mr-2">
             <Filter className="h-4 w-4" /> Filtros:
           </div>
           
           <select 
             className="text-sm border border-neutral-200 rounded-md p-2 bg-neutral-50 text-neutral-700 outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
             value={selectedState || ""}
             onChange={(e) => setSelectedState(e.target.value ? Number(e.target.value) : null)}
           >
             <option value="">Todos os Estados</option>
             {states.map(st => (
               <option key={st.co_uf} value={st.co_uf}>{st.no_uf} ({st.sg_uf})</option>
             ))}
           </select>

           <select 
             className="text-sm border border-neutral-200 rounded-md p-2 bg-neutral-50 text-neutral-700 outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
             value={selectedCity || ""}
             onChange={(e) => setSelectedCity(e.target.value ? Number(e.target.value) : null)}
             disabled={!selectedState}
           >
             <option value="">Todas as Cidades</option>
             {cities.map(city => (
               <option key={city.co_municipio} value={city.co_municipio}>{city.no_municipio}</option>
             ))}
           </select>
         </div>
       </div>

       {schools.length === 0 && !loading ? (
         <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 py-12">
           <MapPin className="h-12 w-12 mb-3 opacity-20" />
           <p>Nenhuma escola encontrada para este filtro.</p>
         </div>
       ) : (
         <div className="overflow-x-auto">
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
             {schools.map(school => (
               <button 
                  key={school.co_entidade} 
                  onClick={() => onSelectSchool(school.co_entidade)}
                  className="flex items-center justify-between text-left p-4 border border-neutral-200 rounded-lg hover:border-primary-400 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                 <div>
                   <h3 className="font-semibold text-neutral-900 truncate max-w-[200px] sm:max-w-[280px]" title={school.no_entidade}>
                     {school.no_entidade}
                   </h3>
                   <p className="text-xs text-neutral-500 mt-1 flex items-center">
                     <MapPin className="h-3 w-3 mr-1" />
                     {school.municipio?.no_municipio} - {school.municipio?.estado?.sg_uf}
                   </p>
                 </div>
                 <ArrowRight className="h-5 w-5 text-neutral-300" />
               </button>
             ))}
           </div>
         </div>
       )}

       {loading && (
         <div className="py-8 flex justify-center">
           <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
         </div>
       )}

       {hasMore && schools.length > 0 && !loading && (
         <div className="mt-8 flex justify-center">
           <Button variant="secondary" onClick={loadMore}>
             Carregar Mais Escolas
           </Button>
         </div>
       )}
    </div>
  )
}
