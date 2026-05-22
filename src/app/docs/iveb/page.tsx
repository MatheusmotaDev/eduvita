import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { BookOpen, Calculator, Info, Target } from "lucide-react";

export default function DocsPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-neutral-900 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary-600" />
            Documentação: Metodologia IVEB
          </h1>
          <p className="text-lg text-neutral-500 mt-2">
            Entenda como o EduVita calcula o Índice de Vulnerabilidade Escolar do Brasil de forma transparente.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary-500" />
              O que é o IVEB?
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              O Índice de Vulnerabilidade Escolar do Brasil (IVEB) é uma métrica algorítmica proprietária desenvolvida pela equipe do EduVita. Seu objetivo principal é traduzir milhares de dados brutos de infraestrutura do INEP em um indicador único de fácil interpretação para a sociedade e gestores públicos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary-500" />
              Como o cálculo é feito?
            </h2>
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-100 mb-4">
              <p className="text-neutral-700 font-medium mb-3">
                A nota do IVEB vai de <strong className="text-success-600">0 (Zero Vulnerabilidade)</strong> a <strong className="text-critical-600">10 (Vulnerabilidade Extrema)</strong>.
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-600 ml-2">
                <li>O sistema avalia cada escola da rede municipal individualmente.</li>
                <li>Atribui-se "pontos de penalidade" para a ausência de recursos críticos.</li>
                <li><strong>+4 Pontos:</strong> Falta de banheiro acessível (PNE).</li>
                <li><strong>+3 Pontos:</strong> Falta de cozinha.</li>
                <li><strong>+3 Pontos:</strong> Falta de refeitório adequado.</li>
              </ul>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              Se a soma de penalidades de uma escola atingir ou ultrapassar <strong>4 pontos</strong>, ela é categorizada internamente como uma <span className="font-semibold text-critical-600">Escola Crítica</span>.
            </p>
            <p className="text-neutral-600 leading-relaxed mt-2">
              O IVEB final do município é calculado pela proporção de Escolas Críticas em relação ao total de escolas da rede, multiplicada por 10. Por exemplo: se 50% das escolas de uma cidade são críticas, o IVEB daquela cidade será <strong>5.0</strong>.
            </p>
          </section>

          <section>
            <div className="bg-primary-50 p-6 rounded-lg border border-primary-100 flex gap-4">
              <Info className="h-6 w-6 text-primary-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary-900 mb-1">Transparência Ativa</h3>
                <p className="text-primary-800 text-sm leading-relaxed">
                  Todos os dados que alimentam este cálculo são públicos e provenientes dos Microdados do Censo Escolar. O EduVita atua apenas como processador matemático para facilitar auditorias cívicas.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </DashboardLayout>
  );
}
