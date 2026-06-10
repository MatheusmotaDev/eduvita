import { NextResponse } from 'next/server';
import pool from '@/shared/lib/db';

// UPDATE
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { descricao } = body;
    
    const result = await pool.query(
      `UPDATE denuncias SET descricao = $1 WHERE id = $2 RETURNING *`,
      [descricao, id]
    );
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating denuncia:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    const result = await pool.query(
      `DELETE FROM denuncias WHERE id = $1`,
      [id]
    );
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting denuncia:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
