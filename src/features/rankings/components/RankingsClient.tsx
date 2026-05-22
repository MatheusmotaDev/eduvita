"use client";

import { useEffect, useState } from "react";
import { CityVulnerability, getCityVulnerabilities } from "@/features/rankings/services/ivebService";
import { Loader2, Trophy, AlertTriangle, ArrowUp, ArrowDown, MapPin } from "lucide-react";
import { Badge } from "@/shared/ui/Badge";

export function RankingsClient() {
  const [rankings, setRankings] = useState<CityVulnerability[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCityVulnerabilities().then(data => {
      setRankings(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-neutral-200">
        <Loader2 className="h-10 w-10 text-primary-500 animate-spin mb-4" />
        <p className="text-neutral-500 font-medium">Processando métricas municipais...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-100 bg-neutral-50">
        <h2 className="text-lg font-bold font-display text-neutral-900 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary-600" />
          Ranking Nacional IVEB
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Capitais ordenadas da maior vulnerabilidade escolar (Piores condições) para a menor.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-neutral-50/50 border-b border-neutral-200 text-xs uppercase font-semibold text-neutral-500">
              <th className="py-4 px-6">Posição</th>
              <th className="py-4 px-6">Município</th>
              <th className="py-4 px-6 text-center">Nota IVEB (0-10)</th>
              <th className="py-4 px-6 text-center">Escolas Base</th>
              <th className="py-4 px-6 text-right">Escolas Críticas</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((city, index) => {
              const isWorst = index < 3;
              const isBest = index > rankings.length - 4;
              
              return (
                <tr key={city.co_municipio} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-neutral-900">
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                        isWorst ? 'bg-critical-100 text-critical-700' : isBest ? 'bg-success-100 text-success-700' : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        {index + 1}
                      </span>
                      {isWorst && <ArrowDown className="h-4 w-4 text-critical-500" />}
                      {isBest && <ArrowUp className="h-4 w-4 text-success-500" />}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-neutral-400" />
                      <span className="font-semibold text-neutral-900">{city.no_municipio}</span>
                      <span className="text-xs text-neutral-500 font-medium">({city.sg_uf})</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Badge variant={city.ivebScore >= 6 ? 'critical' : city.ivebScore >= 3 ? 'warning' : 'success'}>
                      {city.ivebScore.toFixed(1)}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-center text-neutral-600 font-medium">
                    {city.totalSchools}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-neutral-900 font-semibold">{city.criticalSchools}</span>
                      {city.criticalSchools > 0 && (
                        <AlertTriangle className="h-4 w-4 text-warning-500" />
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
