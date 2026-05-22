import { supabase } from "@/shared/lib/supabase";

export interface CityVulnerability {
  co_municipio: number;
  no_municipio: string;
  sg_uf: string;
  lat: number;
  lng: number;
  ivebScore: number; // 0 a 10 (10 é mais vulnerável)
  totalSchools: number;
  criticalSchools: number;
}

// Coordenadas estáticas das capitais
export const CAPITALS = [
  { no: 'SÃO PAULO', uf: 'SP', lat: -23.5505, lng: -46.6333 },
  { no: 'RIO DE JANEIRO', uf: 'RJ', lat: -22.9068, lng: -43.1729 },
  { no: 'BELO HORIZONTE', uf: 'MG', lat: -19.9167, lng: -43.9345 },
  { no: 'BRASÍLIA', uf: 'DF', lat: -15.7942, lng: -47.8822 },
  { no: 'SALVADOR', uf: 'BA', lat: -12.9714, lng: -38.5014 },
  { no: 'FORTALEZA', uf: 'CE', lat: -3.7172, lng: -38.5431 },
  { no: 'MANAUS', uf: 'AM', lat: -3.1190, lng: -60.0217 },
  { no: 'CURITIBA', uf: 'PR', lat: -25.4284, lng: -49.2733 },
  { no: 'RECIFE', uf: 'PE', lat: -8.0476, lng: -34.8770 },
  { no: 'PORTO ALEGRE', uf: 'RS', lat: -30.0346, lng: -51.2177 },
  { no: 'BELÉM', uf: 'PA', lat: -1.4558, lng: -48.5044 },
  { no: 'GOIÂNIA', uf: 'GO', lat: -16.6869, lng: -49.2648 },
  { no: 'SÃO LUÍS', uf: 'MA', lat: -2.5391, lng: -44.2829 },
  { no: 'MACEIÓ', uf: 'AL', lat: -9.6662, lng: -35.7351 },
  { no: 'NATAL', uf: 'RN', lat: -5.7945, lng: -35.2110 },
  { no: 'JOÃO PESSOA', uf: 'PB', lat: -7.1195, lng: -34.8450 },
  { no: 'TERESINA', uf: 'PI', lat: -5.0892, lng: -42.8016 },
  { no: 'ARACAJU', uf: 'SE', lat: -10.9472, lng: -37.0731 },
  { no: 'VITÓRIA', uf: 'ES', lat: -20.3155, lng: -40.3128 },
  { no: 'FLORIANÓPOLIS', uf: 'SC', lat: -27.5954, lng: -48.5480 },
  { no: 'CUIABÁ', uf: 'MT', lat: -15.6014, lng: -56.0979 },
  { no: 'CAMPO GRANDE', uf: 'MS', lat: -20.4428, lng: -54.6460 },
  { no: 'PORTO VELHO', uf: 'RO', lat: -8.7612, lng: -63.9039 },
  { no: 'MACAPÁ', uf: 'AP', lat: 0.0389, lng: -51.0664 },
  { no: 'RIO BRANCO', uf: 'AC', lat: -9.9749, lng: -67.8243 },
  { no: 'BOA VISTA', uf: 'RR', lat: 2.8235, lng: -60.6758 },
  { no: 'PALMAS', uf: 'TO', lat: -10.2491, lng: -48.3243 },
];

export async function getCityVulnerabilities(): Promise<CityVulnerability[]> {
  // Simulando cálculo do IVEB baseado em amostragem real
  // Em um cenário de banco massivo, usaríamos uma SQL Function ou View no Supabase
  // Aqui, faremos uma query por cidade para calcular o índice médio.
  
  const results: CityVulnerability[] = [];

  for (const cap of CAPITALS) {
    // 1. Achar o co_municipio da capital
    const { data: cityData, error } = await supabase
      .from('municipio')
      .select('co_municipio')
      .ilike('no_municipio', cap.no)
      .limit(1);

    if (error) {
      console.error(`Erro ao buscar município ${cap.no}:`, error);
    }

    if (cityData && cityData.length > 0) {
      const co_municipio = cityData[0].co_municipio;
      
      // 2. Buscar infraestrutura basica das escolas dessa cidade
      let allSchools: any[] = [];
      let hasMore = true;
      let page = 0;
      const pageSize = 1000;

      while (hasMore) {
        const { data: schools } = await supabase
          .from('escola')
          .select(`
            co_entidade,
            infraestrutura_bem_estar!inner(in_banheiro_pne),
            infraestrutura_alimentacao!inner(in_cozinha, in_refeitorio)
          `)
          .eq('co_municipio', co_municipio)
          .range(page * pageSize, (page + 1) * pageSize - 1);

        if (schools && schools.length > 0) {
          allSchools = allSchools.concat(schools);
          if (schools.length < pageSize) {
            hasMore = false;
          } else {
            page++;
          }
        } else {
          hasMore = false;
        }
      }

      if (allSchools.length >= 50) {
        let criticalCount = 0;
        
        for (const sch of allSchools) {
          const bemEstar = Array.isArray(sch.infraestrutura_bem_estar) ? sch.infraestrutura_bem_estar[0] : sch.infraestrutura_bem_estar;
          const alim = Array.isArray(sch.infraestrutura_alimentacao) ? sch.infraestrutura_alimentacao[0] : sch.infraestrutura_alimentacao;
          
          let penalidade = 0;
          if (!bemEstar?.in_banheiro_pne) penalidade += 4;
          if (!alim?.in_cozinha) penalidade += 3;
          if (!alim?.in_refeitorio) penalidade += 3;
          
          if (penalidade >= 4) {
            criticalCount++;
          }
        }

        // Calculo simples do IVEB (0 a 10)
        // Quanto mais % de escolas críticas, mais perto de 10
        const percentageCritical = criticalCount / allSchools.length;
        const ivebScore = Number((percentageCritical * 10).toFixed(1));

        results.push({
          co_municipio,
          no_municipio: cap.no,
          sg_uf: cap.uf,
          lat: cap.lat,
          lng: cap.lng,
          ivebScore,
          totalSchools: allSchools.length,
          criticalSchools: criticalCount
        });
      }
    }
  }

  // Ordenar da mais vulnerável (maior IVEB) para a menos
  return results.sort((a, b) => b.ivebScore - a.ivebScore);
}
