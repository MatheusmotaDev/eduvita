export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; 
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

// Busca rápida no Header
export async function searchSchools(query: string) {
  if (!query) return [];
  const res = await fetch(`${getBaseUrl()}/api/schools/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  return res.json();
}

// Perfil completo da escola
export async function getSchoolDetails(id: number) {
  const res = await fetch(`${getBaseUrl()}/api/schools/${id}`);
  if (!res.ok) return null;
  return res.json();
}

// Métricas agregadas reais para o Dashboard (Etapa 5)
export async function getDashboardMetrics() {
  const res = await fetch(`${getBaseUrl()}/api/schools/metrics`);
  if (!res.ok) {
    return {
      total: 1, noAcessCount: 0, noAcessPct: '0,0',
      psiPct: '0,0', alimPct: '0,0', verdePct: '0,0'
    };
  }
  return res.json();
}

// Filtro de escolas para a grade
export async function getFilteredSchools(filterType: string | null, stateId: number | null = null, cityId: number | null = null, page: number = 0) {
  const params = new URLSearchParams();
  if (filterType) params.set('filterType', filterType);
  if (stateId) params.set('stateId', String(stateId));
  if (cityId) params.set('cityId', String(cityId));
  params.set('page', String(page));

  const res = await fetch(`${getBaseUrl()}/api/schools/filtered?${params.toString()}`);
  if (!res.ok) return [];
  return res.json();
}

export async function getStates() {
  const res = await fetch(`${getBaseUrl()}/api/locations?type=states`);
  if (!res.ok) return [];
  return res.json();
}

export async function getCitiesByState(coUf: number) {
  const res = await fetch(`${getBaseUrl()}/api/locations?type=cities&uf=${coUf}`);
  if (!res.ok) return [];
  return res.json();
}
