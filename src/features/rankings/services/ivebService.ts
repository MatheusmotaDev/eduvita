export interface CityVulnerability {
  co_municipio: number;
  no_municipio: string;
  sg_uf: string;
  lat: number;
  lng: number;
  ivebScore: number;
  totalSchools: number;
  criticalSchools: number;
}

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; 
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

export async function getCityVulnerabilities(): Promise<CityVulnerability[]> {
  const res = await fetch(`${getBaseUrl()}/api/rankings`, { next: { revalidate: 3600 } });
  if (!res.ok) {
    console.error('Falha ao buscar rankings do IVEB');
    return [];
  }
  return res.json();
}
