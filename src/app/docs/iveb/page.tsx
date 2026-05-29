import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { BookOpen, FileText, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export default function DocsIvebPage() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-neutral-200">
        
        {/* Header */}
        <div className="border-b border-neutral-200 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold font-display text-neutral-900">Documentação: Metodologia IVEB</h1>
          </div>
          <p className="text-lg text-neutral-500">
            Entenda como o EduVita calcula o Índice de Vulnerabilidade Escolar do Brasil de forma transparente.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary-500" />
            O que é o IVEB?
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            O <strong>Índice de Vulnerabilidade Escolar do Brasil (IVEB)</strong> é uma métrica desenvolvida pela equipe do EduVita. Seu objetivo é traduzir os dados brutos de infraestrutura do INEP em um indicador único e de fácil interpretação para a sociedade e gestores públicos.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning-500" />
            Como o cálculo é feito?
          </h2>
          <div className="bg-warning-50 border-l-4 border-warning-500 p-4 rounded-r-lg">
            <p className="text-warning-800 text-sm font-medium">
              A nota do IVEB vai de 0 (Zero Vulnerabilidade) a 10 (Vulnerabilidade Extrema). 
              <strong> Atenção:</strong> quanto menor a nota, melhor — diferente de rankings escolares comuns, uma nota alta aqui indica maior vulnerabilidade.
            </p>
          </div>
          <p className="text-neutral-600 leading-relaxed">
            O sistema avalia cada escola da rede municipal individualmente, atribuindo pontos de penalidade pela ausência de recursos considerados críticos:
          </p>
          
          <ul className="space-y-3 bg-neutral-50 p-6 rounded-xl border border-neutral-100">
            <li className="flex items-center gap-3 text-neutral-700">
              <span className="flex items-center justify-center bg-critical-100 text-critical-700 font-bold px-2 py-1 rounded text-sm">+4 pontos</span>
              Ausência de banheiro acessível (PNE)
            </li>
            <li className="flex items-center gap-3 text-neutral-700">
              <span className="flex items-center justify-center bg-critical-100 text-critical-700 font-bold px-2 py-1 rounded text-sm">+3 pontos</span>
              Ausência de cozinha
            </li>
            <li className="flex items-center gap-3 text-neutral-700">
              <span className="flex items-center justify-center bg-critical-100 text-critical-700 font-bold px-2 py-1 rounded text-sm">+3 pontos</span>
              Ausência de refeitório adequado
            </li>
          </ul>

          <p className="text-neutral-600 leading-relaxed">
            Quando a soma de penalidades de uma escola atinge ou ultrapassa <strong>4 pontos</strong>, ela é classificada como <strong>Escola Crítica</strong>. Vale notar que a ausência de banheiro acessível sozinha (4 pts) já é suficiente para essa classificação.
          </p>
          
          <p className="text-neutral-600 leading-relaxed">
            O IVEB final do município é calculado pela proporção de Escolas Críticas em relação ao total de escolas da rede, multiplicada por 10. 
            <br/><br/>
            <span className="bg-primary-50 text-primary-800 px-3 py-2 rounded-lg text-sm block border border-primary-100">
              <strong>Exemplo Prático:</strong> Se 50% das escolas de uma cidade são críticas, o IVEB será 5.0. Verificando com dados reais: Recife (PE) tem 357 escolas críticas de 1.064 no total, resultando em um IVEB de aproximadamente 3.4.
            </span>
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-success-500" />
            Transparência e fonte dos dados
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            Todos os dados que alimentam este cálculo são públicos e provenientes dos Microdados do Censo Escolar (INEP). O EduVita realiza apenas o processamento matemático desses dados para facilitar auditorias cívicas e análises de políticas públicas. Para verificar os cálculos de forma independente, consulte o portal do INEP.
          </p>
        </section>

      </div>
    </DashboardLayout>
  );
}
