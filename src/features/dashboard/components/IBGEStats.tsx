"use client";

import { useEffect, useState } from "react";
import { getMacroRegioes } from "../services/ibgeService";
import { MapPin } from "lucide-react";

export function IBGEStats() {
  const [regioes, setRegioes] = useState<{ id: number; nome: string; sigla: string }[]>([]);

  useEffect(() => {
    getMacroRegioes().then((data) => setRegioes(data));
  }, []);

  if (regioes.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <span className="text-sm font-semibold text-neutral-500 mr-2 flex items-center">
        <MapPin className="h-4 w-4 mr-1" />
        Regiões Cobertas (Dados IBGE):
      </span>
      {regioes.map((regiao) => (
        <span key={regiao.id} className="px-2 py-1 text-xs font-semibold bg-primary-50 text-primary-700 rounded-md border border-primary-100">
          {regiao.nome} ({regiao.sigla})
        </span>
      ))}
    </div>
  );
}
