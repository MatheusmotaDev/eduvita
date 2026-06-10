export interface Denuncia {
  id: string;
  co_entidade: number;
  no_entidade: string;
  descricao: string;
  status: 'PENDENTE' | 'EM_ANALISE' | 'RESOLVIDO';
  created_at: string;
}

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; 
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

export async function getDenuncias(): Promise<Denuncia[]> {
  const res = await fetch(`${getBaseUrl()}/api/denuncias`);
  if (!res.ok) return [];
  return res.json();
}

export async function createDenuncia(denuncia: Partial<Denuncia>) {
  const res = await fetch(`${getBaseUrl()}/api/denuncias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(denuncia),
  });
  if (!res.ok) throw new Error('Falha ao criar denúncia');
  return res.json();
}

export async function updateDenuncia(id: string, descricao: string) {
  const res = await fetch(`${getBaseUrl()}/api/denuncias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ descricao }),
  });
  if (!res.ok) throw new Error('Falha ao atualizar denúncia');
  return res.json();
}

export async function deleteDenuncia(id: string) {
  const res = await fetch(`${getBaseUrl()}/api/denuncias/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Falha ao excluir denúncia');
  return true;
}
