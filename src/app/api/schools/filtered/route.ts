import { NextResponse } from 'next/server';
import pool from '@/shared/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filterType = searchParams.get('filterType');
  const stateId = searchParams.get('stateId');
  const cityId = searchParams.get('cityId');
  const pageStr = searchParams.get('page') || '0';
  
  try {
    const page = parseInt(pageStr, 10);
    const limit = 30;
    const offset = page * limit;

    let queryParams: any[] = [];
    let paramIndex = 1;
    let whereClauses: string[] = [];

    if (filterType === 'no_acess') {
      whereClauses.push('be.in_banheiro_pne = false');
    } else if (filterType === 'psi') {
      whereClauses.push('ps.qt_prof_psicologo > 0');
    } else if (filterType === 'alim') {
      whereClauses.push('a.in_cozinha = true AND a.in_refeitorio = true');
    } else if (filterType === 'verde') {
      whereClauses.push('am.in_area_verde = true');
    }

    if (stateId && stateId !== 'null') {
      whereClauses.push(`m.co_uf = $${paramIndex++}`);
      queryParams.push(stateId);
    }
    
    if (cityId && cityId !== 'null') {
      whereClauses.push(`e.co_municipio = $${paramIndex++}`);
      queryParams.push(cityId);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
    
    // Add offset and limit params
    queryParams.push(limit);
    const limitParam = `$${paramIndex++}`;
    queryParams.push(offset);
    const offsetParam = `$${paramIndex++}`;

    const result = await pool.query(`
      SELECT e.co_entidade, e.no_entidade, e.co_municipio,
             m.no_municipio, uf.sg_uf, uf.co_uf,
             row_to_json(a.*) as infraestrutura_alimentacao,
             row_to_json(be.*) as infraestrutura_bem_estar,
             row_to_json(ps.*) as profissionais_saude,
             row_to_json(am.*) as ambiente_escolar
      FROM escola e
      JOIN municipio m ON e.co_municipio = m.co_municipio
      JOIN estado uf ON m.co_uf = uf.co_uf
      JOIN infraestrutura_alimentacao a ON e.co_entidade = a.co_entidade
      JOIN infraestrutura_bem_estar be ON e.co_entidade = be.co_entidade
      JOIN profissionais_saude ps ON e.co_entidade = ps.co_entidade
      JOIN ambiente_escolar am ON e.co_entidade = am.co_entidade
      ${whereSql}
      ORDER BY e.no_entidade ASC
      LIMIT ${limitParam} OFFSET ${offsetParam}
    `, queryParams);
    
    const mapped = result.rows.map(r => ({
      co_entidade: r.co_entidade,
      no_entidade: r.no_entidade,
      co_municipio: r.co_municipio,
      municipio: {
        co_uf: r.co_uf,
        no_municipio: r.no_municipio,
        estado: { sg_uf: r.sg_uf }
      },
      infraestrutura_alimentacao: r.infraestrutura_alimentacao,
      infraestrutura_bem_estar: r.infraestrutura_bem_estar,
      profissionais_saude: r.profissionais_saude,
      ambiente_escolar: r.ambiente_escolar
    }));
    
    return NextResponse.json(mapped);
  } catch (error) {
    console.error('Error fetching filtered schools:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
