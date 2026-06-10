import { NextResponse } from 'next/server';
import pool from '@/shared/lib/db';

export async function GET() {
  try {
    // 1. Total de Escolas
    const totalRes = await pool.query('SELECT COUNT(*) FROM escola');
    const totalEscolas = parseInt(totalRes.rows[0].count, 10) || 1;

    // 2. Sem Acessibilidade
    const noAcessRes = await pool.query('SELECT COUNT(*) FROM infraestrutura_bem_estar WHERE in_banheiro_pne = false');
    const noAcessCount = parseInt(noAcessRes.rows[0].count, 10);

    // 3. Com Psicólogo
    const psiRes = await pool.query('SELECT COUNT(*) FROM profissionais_saude WHERE qt_prof_psicologo > 0');
    const psiCount = parseInt(psiRes.rows[0].count, 10);

    // 4. Segurança Alimentar (Cozinha + Refeitório)
    const alimRes = await pool.query('SELECT COUNT(*) FROM infraestrutura_alimentacao WHERE in_cozinha = true AND in_refeitorio = true');
    const alimCount = parseInt(alimRes.rows[0].count, 10);

    // 5. Área Verde
    const verdeRes = await pool.query('SELECT COUNT(*) FROM ambiente_escolar WHERE in_area_verde = true');
    const verdeCount = parseInt(verdeRes.rows[0].count, 10);

    const mapped = {
      total: totalEscolas,
      noAcessCount: noAcessCount || 0,
      noAcessPct: (((noAcessCount || 0) / totalEscolas) * 100).toFixed(1).replace('.', ','),
      psiPct: (((psiCount || 0) / totalEscolas) * 100).toFixed(1).replace('.', ','),
      alimPct: (((alimCount || 0) / totalEscolas) * 100).toFixed(1).replace('.', ','),
      verdePct: (((verdeCount || 0) / totalEscolas) * 100).toFixed(1).replace('.', ',')
    };

    return NextResponse.json(mapped);
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
