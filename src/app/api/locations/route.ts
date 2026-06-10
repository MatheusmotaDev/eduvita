import { NextResponse } from 'next/server';
import pool from '@/shared/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    if (type === 'states') {
      const result = await pool.query('SELECT co_uf, sg_uf, no_uf FROM estado ORDER BY no_uf');
      return NextResponse.json(result.rows);
    } 
    
    if (type === 'cities') {
      const uf = searchParams.get('uf');
      if (!uf) return NextResponse.json({ error: 'UF is required' }, { status: 400 });
      
      const result = await pool.query('SELECT co_municipio, no_municipio FROM municipio WHERE co_uf = $1 ORDER BY no_municipio', [uf]);
      return NextResponse.json(result.rows);
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
