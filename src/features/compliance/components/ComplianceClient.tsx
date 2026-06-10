"use client";

import { useEffect, useState } from "react";
import { Loader2, FileCheck, XCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/shared/ui/Badge";

import { getDashboardMetrics } from "@/features/schools/services/schoolService";

export function ComplianceClient() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    total: 0,
    compliant: 0,
    nonCompliant: 0,
    percentage: 0
  });

  useEffect(() => {
    async function fetchCompliance() {
      try {
        const metrics = await getDashboardMetrics();
        const total = metrics.total;
        const nonCompliant = metrics.noAcessCount;
        const compliant = total - nonCompliant;
        
        setData({
          total,
          compliant,
          nonCompliant,
          percentage: Number(((compliant / total) * 100).toFixed(1))
        });
      } catch (error) {
        console.error("Erro ao carregar métricas de conformidade:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCompliance();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-neutral-200">
        <Loader2 className="h-10 w-10 text-primary-500 animate-spin mb-4" />
        <p className="text-neutral-500 font-medium">Analisando conformidade jurídica do banco de dados...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center gap-3 text-neutral-600 mb-2">
            <FileCheck className="h-5 w-5" />
            <h3 className="font-semibold">Lei Brasileira de Inclusão (LBI)</h3>
          </div>
          <div className="text-3xl font-display font-bold text-neutral-900 mt-4">
            {data.percentage}%
          </div>
          <p className="text-sm text-neutral-500 mt-1">Taxa de adequação nacional</p>
        </div>

        <div className="bg-success-50 p-6 rounded-xl border border-success-100">
          <div className="flex items-center gap-3 text-success-700 mb-2">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="font-semibold">Em Conformidade</h3>
          </div>
          <div className="text-3xl font-display font-bold text-success-800 mt-4">
            {data.compliant.toLocaleString('pt-BR')}
          </div>
          <p className="text-sm text-success-600 mt-1">Escolas com Banheiro PNE</p>
        </div>

        <div className="bg-critical-50 p-6 rounded-xl border border-critical-100">
          <div className="flex items-center gap-3 text-critical-700 mb-2">
            <XCircle className="h-5 w-5" />
            <h3 className="font-semibold">Irregulares (Risco)</h3>
          </div>
          <div className="text-3xl font-display font-bold text-critical-800 mt-4">
            {data.nonCompliant.toLocaleString('pt-BR')}
          </div>
          <p className="text-sm text-critical-600 mt-1">Infração à acessibilidade</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
        <h3 className="font-display text-xl font-bold text-neutral-900 mb-4">Sobre a Legislação</h3>
        <p className="text-neutral-600 leading-relaxed mb-4">
          A Lei Brasileira de Inclusão da Pessoa com Deficiência (Estatuto da Pessoa com Deficiência), sancionada em 2015, exige que todos os espaços públicos e privados de uso coletivo garantam acessibilidade plena.
        </p>
        <p className="text-neutral-600 leading-relaxed">
          Escolas públicas que não possuem banheiros adaptados (PNE) não apenas oferecem alta vulnerabilidade aos alunos, mas também estão ativamente violando as disposições do <strong>Plano Nacional de Educação (PNE)</strong> e da LBI, sendo passíveis de Ações Civis Públicas por parte do Ministério Público.
        </p>
      </div>
    </div>
  );
}
