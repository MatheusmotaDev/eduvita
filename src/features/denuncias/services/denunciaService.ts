export interface Denuncia {
  id: string;
  co_entidade: number;
  no_entidade: string;
  descricao: string;
  status: string;
  created_at: string;
}

// CREATE
export async function createDenuncia(co_entidade: number, no_entidade: string, descricao: string) {
  const res = await fetch('/api/denuncias', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ co_entidade, no_entidade, descricao })
  });
  if (!res.ok) throw new Error('Falha ao criar denúncia');
  return res.json();
}

// READ
export async function getDenuncias() {
  const res = await fetch('/api/denuncias', { cache: 'no-store' });
  if (!res.ok) throw new Error('Falha ao buscar denúncias');
  return res.json() as Promise<Denuncia[]>;
}

// UPDATE
export async function updateDenuncia(id: string, novaDescricao: string) {
  const res = await fetch(`/api/denuncias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descricao: novaDescricao })
  });
  if (!res.ok) throw new Error('Falha ao atualizar denúncia');
  return res.json();
}

// DELETE
export async function deleteDenuncia(id: string) {
  const res = await fetch(`/api/denuncias/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Falha ao apagar denúncia');
  return res.json();
}
