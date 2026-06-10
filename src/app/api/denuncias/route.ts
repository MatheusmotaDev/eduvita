import { NextResponse } from 'next/server';
import pool from '@/shared/lib/db';

// CREATE
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { co_entidade, no_entidade, descricao } = body;
    
    // As in Supabase, using gen_random_uuid() or similar for ID in postgres.
    const result = await pool.query(
      `INSERT INTO denuncias (id, co_entidade, no_entidade, descricao, status, created_at)
       VALUES (gen_random_uuid(), $1, $2, $3, 'Pendente', NOW()) RETURNING *`,
      [co_entidade, no_entidade, descricao]
    );
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating denuncia:', error);
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}

// READ
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT * FROM denuncias ORDER BY created_at DESC`
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching denuncias:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
