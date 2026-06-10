import { NextResponse } from 'next/server';
import pool from '@/shared/lib/db';

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

export async function GET() {
  try {
    const capitalNames = CAPITALS.map(c => c.no);
    
    // Usando uma query SQL altamente otimizada para agregar as penalidades
    const query = `
      WITH capital_municipios AS (
        SELECT co_municipio, no_municipio 
        FROM municipio 
        WHERE upper(no_municipio) = ANY($1)
      ),
      escola_penalidades AS (
        SELECT 
          e.co_municipio,
          e.co_entidade,
          (CASE WHEN be.in_banheiro_pne = false THEN 4 ELSE 0 END) +
          (CASE WHEN a.in_cozinha = false THEN 3 ELSE 0 END) +
          (CASE WHEN a.in_refeitorio = false THEN 3 ELSE 0 END) AS penalidade
        FROM escola e
        INNER JOIN infraestrutura_bem_estar be ON e.co_entidade = be.co_entidade
        INNER JOIN infraestrutura_alimentacao a ON e.co_entidade = a.co_entidade
        WHERE e.co_municipio IN (SELECT co_municipio FROM capital_municipios)
      ),
      agregado AS (
        SELECT 
          co_municipio,
          COUNT(*) as total_schools,
          SUM(CASE WHEN penalidade >= 4 THEN 1 ELSE 0 END) as critical_schools
        FROM escola_penalidades
        GROUP BY co_municipio
      )
      SELECT 
        cm.no_municipio,
        a.co_municipio,
        a.total_schools::int,
        a.critical_schools::int,
        ROUND((a.critical_schools::numeric / a.total_schools::numeric) * 10, 1) as iveb_score
      FROM agregado a
      JOIN capital_municipios cm ON a.co_municipio = cm.co_municipio
      WHERE a.total_schools >= 50
    `;

    const result = await pool.query(query, [capitalNames]);
    
    const finalResults = result.rows.map(row => {
      const cap = CAPITALS.find(c => c.no === row.no_municipio.toUpperCase());
      return {
        co_municipio: row.co_municipio,
        no_municipio: cap?.no || row.no_municipio,
        sg_uf: cap?.uf || '',
        lat: cap?.lat || 0,
        lng: cap?.lng || 0,
        ivebScore: parseFloat(row.iveb_score),
        totalSchools: row.total_schools,
        criticalSchools: row.critical_schools
      };
    }).sort((a, b) => b.ivebScore - a.ivebScore);

    return NextResponse.json(finalResults);
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return NextResponse.json({ error: 'Failed to compute IVEB' }, { status: 500 });
  }
}
