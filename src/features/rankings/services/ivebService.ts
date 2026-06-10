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

export async function getCityVulnerabilities(): Promise<CityVulnerability[]> {
  const res = await fetch('/api/rankings', { next: { revalidate: 3600 } });
  if (!res.ok) {
    console.error('Falha ao buscar rankings do IVEB');
    return [];
  }
  return res.json();
}
