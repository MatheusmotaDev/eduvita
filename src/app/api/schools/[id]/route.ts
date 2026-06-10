import { NextResponse } from 'next/server';
import pool from '@/shared/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // As the schema is highly normalized in PostgreSQL, we do a join
    const result = await pool.query(`
      SELECT e.*, 
             m.no_municipio, uf.sg_uf,
             row_to_json(a.*) as infraestrutura_alimentacao,
             row_to_json(be.*) as infraestrutura_bem_estar,
             row_to_json(ps.*) as profissionais_saude,
             row_to_json(am.*) as ambiente_escolar,
             row_to_json(mp.*) as material_pedagogico
      FROM escola e
      JOIN municipio m ON e.co_municipio = m.co_municipio
      JOIN estado uf ON m.co_uf = uf.co_uf
      LEFT JOIN infraestrutura_alimentacao a ON e.co_entidade = a.co_entidade
      LEFT JOIN infraestrutura_bem_estar be ON e.co_entidade = be.co_entidade
      LEFT JOIN profissionais_saude ps ON e.co_entidade = ps.co_entidade
      LEFT JOIN ambiente_escolar am ON e.co_entidade = am.co_entidade
      LEFT JOIN material_pedagogico mp ON e.co_entidade = mp.co_entidade
      WHERE e.co_entidade = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const r = result.rows[0];
    const mapped = {
      co_entidade: r.co_entidade,
      no_entidade: r.no_entidade,
      ds_endereco: r.ds_endereco,
      tp_dependencia: r.tp_dependencia,
      municipio: {
        no_municipio: r.no_municipio,
        estado: { sg_uf: r.sg_uf }
      },
      infraestrutura_alimentacao: r.infraestrutura_alimentacao,
      infraestrutura_bem_estar: r.infraestrutura_bem_estar,
      profissionais_saude: r.profissionais_saude,
      ambiente_escolar: r.ambiente_escolar,
      material_pedagogico: r.material_pedagogico
    };
    
    return NextResponse.json(mapped);
  } catch (error) {
    console.error('Error fetching school details:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
