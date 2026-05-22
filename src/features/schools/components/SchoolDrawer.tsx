import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { getSchoolDetails } from "../services/schoolService";
import { Badge } from "@/shared/ui/Badge";
import { cn } from "@/shared/lib/utils";

interface SchoolDrawerProps {
  schoolId: number | null;
  onClose: () => void;
}

export function SchoolDrawer({ schoolId, onClose }: SchoolDrawerProps) {
  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (schoolId) {
      setLoading(true);
      getSchoolDetails(schoolId).then(data => {
        setSchool(data);
        setLoading(false);
      });
    }
  }, [schoolId]);

  if (!schoolId) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className={cn(
        "fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out translate-x-0"
      )}>
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-neutral-900">Perfil da Escola</h2>
          <button onClick={onClose} className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-8 w-3/4 rounded bg-neutral-200" />
              <div className="h-4 w-1/2 rounded bg-neutral-200" />
              <div className="mt-8 h-32 w-full rounded-lg bg-neutral-100" />
              <div className="mt-4 h-32 w-full rounded-lg bg-neutral-100" />
            </div>
          ) : school ? (
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-bold text-primary-900 leading-tight mb-2">
                  {school.no_entidade}
                </h3>
                <p className="text-sm text-neutral-600 flex items-center gap-2 font-semibold">
                  {school.municipio?.no_municipio} - {school.municipio?.estado?.sg_uf}
                </p>
                <p className="text-sm text-neutral-500 mt-1">{school.ds_endereco}</p>
              </div>

              {(() => {
                const safeGet = (rel: any) => Array.isArray(rel) ? rel[0] : rel;
                const alim = safeGet(school.infraestrutura_alimentacao);
                const bemEstar = safeGet(school.infraestrutura_bem_estar);
                const ambiente = safeGet(school.ambiente_escolar);
                const saude = safeGet(school.profissionais_saude);
                
                return (
                  <>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-neutral-900 border-b pb-2">Alimentação e Saneamento</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <StatusItem label="Água Potável" active={alim?.in_alimentacao} />
                        <StatusItem label="Refeitório" active={alim?.in_refeitorio} />
                        <StatusItem label="Cozinha" active={alim?.in_cozinha} />
                        <StatusItem label="Despensa" active={alim?.in_despensa} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-neutral-900 border-b pb-2">Acessibilidade e Ambientes</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <StatusItem label="Banheiro Acessível (PNE)" active={bemEstar?.in_banheiro_pne} />
                        <StatusItem label="Sala de Atendimento Esp." active={bemEstar?.in_sala_atendimento_especial} />
                        <StatusItem label="Área Verde" active={ambiente?.in_area_verde} />
                        <StatusItem label="Quadra de Esportes" active={ambiente?.in_quadra_esportes} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-neutral-900 border-b pb-2">Apoio e Bem-Estar</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 text-center">
                          <div className="text-3xl font-display font-bold text-primary-700">
                            {saude?.qt_prof_psicologo || 0}
                          </div>
                          <div className="text-xs text-neutral-500 font-semibold uppercase mt-1">Psicólogos</div>
                        </div>
                        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 text-center">
                          <div className="text-3xl font-display font-bold text-primary-700">
                            {saude?.qt_prof_assist_social || 0}
                          </div>
                          <div className="text-xs text-neutral-500 font-semibold uppercase mt-1">Assist. Sociais</div>
                        </div>
                        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 text-center">
                          <div className="text-3xl font-display font-bold text-primary-700">
                            {saude?.qt_prof_nutricionista || 0}
                          </div>
                          <div className="text-xs text-neutral-500 font-semibold uppercase mt-1">Nutricionistas</div>
                        </div>
                        <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-100 text-center">
                          <div className="text-3xl font-display font-bold text-primary-700">
                            {saude?.qt_prof_fonaudiologo || 0}
                          </div>
                          <div className="text-xs text-neutral-500 font-semibold uppercase mt-1">Fonoaudiólogos</div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="text-center py-10 text-neutral-500">Escola não encontrada.</div>
          )}
        </div>
      </div>
    </>
  );
}

function StatusItem({ label, active }: { label: string, active?: boolean }) {
  return (
    <div className="flex flex-col justify-between gap-2 p-3 bg-neutral-50 rounded-lg border border-neutral-100">
      <span className="text-xs text-neutral-500 font-semibold uppercase">{label}</span>
      {active ? (
        <Badge variant="success" className="w-fit">Disponível</Badge>
      ) : (
        <Badge variant="critical" className="w-fit">Indisponível</Badge>
      )}
    </div>
  )
}
