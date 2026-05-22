"use client"
import { Search, Bell, User, Loader2 } from "lucide-react";
import { Input } from "@/shared/ui/Input";
import { useState, useEffect } from "react";
import { searchSchools } from "@/features/schools/services/schoolService";
import { SchoolDrawer } from "@/features/schools/components/SchoolDrawer";

export function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length > 2) {
        setLoading(true);
        const data = await searchSchools(query);
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 500); // Debounce de 500ms
    
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-neutral-300 bg-white px-8 shadow-sm">
        <div className="flex items-center">
          <span className="text-sm font-semibold text-neutral-500">
            Visão Geral / <span className="text-neutral-900">Dashboard Nacional</span>
          </span>
        </div>
        
        <div className="flex w-full max-w-md items-center relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <Input 
            type="text" 
            placeholder="Buscar escola por nome..." 
            className="pl-10 bg-neutral-100 border-transparent focus-visible:bg-white w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          
          {/* Menu Dropdown de Resultados */}
          {(results.length > 0 || loading) && query.length > 2 && (
            <div className="absolute top-12 w-full rounded-md border border-neutral-200 bg-white shadow-xl z-50 max-h-80 overflow-y-auto">
              {loading ? (
                <div className="p-4 flex justify-center text-primary-500">
                  <Loader2 className="animate-spin h-5 w-5" />
                </div>
              ) : (
                <ul className="py-2">
                  {results.map((school) => (
                    <li 
                      key={school.co_entidade}
                      className="px-4 py-3 hover:bg-neutral-50 cursor-pointer border-b border-neutral-100 last:border-0 transition-colors"
                      onClick={() => {
                        setSelectedSchool(school.co_entidade);
                        setQuery("");
                        setResults([]);
                      }}
                    >
                      <div className="font-semibold text-sm text-neutral-900">{school.no_entidade}</div>
                      <div className="text-xs text-neutral-500 mt-0.5">
                        {school.municipio?.no_municipio} - {school.municipio?.estado?.sg_uf}
                      </div>
                    </li>
                  ))}
                  {results.length === 0 && !loading && (
                    <li className="px-4 py-3 text-sm text-neutral-500 text-center">Nenhuma escola encontrada.</li>
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-neutral-500 hover:text-neutral-900 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-critical-500 ring-2 ring-white"></span>
          </button>
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary-100 text-primary-700 transition-colors hover:bg-primary-300">
            <User className="h-4 w-4" />
          </div>
        </div>
      </header>

      {/* Chamada do Drawer que abre ao selecionar uma escola */}
      <SchoolDrawer schoolId={selectedSchool} onClose={() => setSelectedSchool(null)} />
    </>
  );
}
