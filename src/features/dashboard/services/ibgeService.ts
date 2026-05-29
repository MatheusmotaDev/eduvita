// src/features/dashboard/services/ibgeService.ts

export async function getMacroRegioes() {
  try {
    const res = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/regioes");
    if (!res.ok) throw new Error("Erro ao buscar IBGE");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
