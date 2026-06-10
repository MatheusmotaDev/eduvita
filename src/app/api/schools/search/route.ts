import { NextResponse } from 'next/server';
import pool from '@/shared/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  
  try {
    if (q) {
      // Search logic
      const result = await pool.query(`
        SELECT e.co_entidade, e.no_entidade, e.ds_endereco, 
               m.no_municipio, uf.sg_uf
        FROM escola e
        JOIN municipio m ON e.co_municipio = m.co_municipio
        JOIN estado uf ON m.co_uf = uf.co_uf
        WHERE e.no_entidade ILIKE $1
        LIMIT 8
      `, [`%${q.toUpperCase()}%`]);
      
      const mapped = result.rows.map(r => ({
        co_entidade: r.co_entidade,
        no_entidade: r.no_entidade,
        ds_endereco: r.ds_endereco,
        municipio: {
          no_municipio: r.no_municipio,
          estado: { sg_uf: r.sg_uf }
        }
      }));
      return NextResponse.json(mapped);
    }

    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
