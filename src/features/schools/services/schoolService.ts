import { supabase } from "@/shared/lib/supabase"

// Busca rápida no Header
export async function searchSchools(query: string) {
  if (!query) return [];
  
  const { data, error } = await supabase
    .from('escola')
    .select(`
      co_entidade,
      no_entidade,
      ds_endereco,
      municipio (no_municipio, estado (sg_uf))
    `)
    .ilike('no_entidade', `%${query.toUpperCase()}%`)
    .limit(8);
    
  if (error) {
    console.error("Erro ao buscar escolas:", error);
    return [];
  }
  
  return data;
}

// Perfil completo da escola
export async function getSchoolDetails(id: number) {
  const { data, error } = await supabase
    .from('escola')
    .select(`
      co_entidade,
      no_entidade,
      ds_endereco,
      tp_dependencia,
      municipio (no_municipio, estado (sg_uf)),
      infraestrutura_alimentacao (*),
      infraestrutura_bem_estar (*),
      profissionais_saude (*),
      ambiente_escolar (*),
      material_pedagogico (*)
    `)
    .eq('co_entidade', id)
    .single();
    
  if (error) {
    console.error("Erro ao buscar detalhes da escola:", error);
    return null;
  }
  
  return data;
}

// Métricas agregadas reais para o Dashboard (Etapa 5)
export async function getDashboardMetrics() {
  const { count: total } = await supabase.from('escola').select('*', { count: 'exact', head: true });
  const totalEscolas = total || 1; // previne divisão por zero

  // 1. Sem Acessibilidade (Falta banheiro PNE)
  const { count: noAcessCount } = await supabase.from('infraestrutura_bem_estar').select('*', { count: 'exact', head: true }).eq('in_banheiro_pne', false);
  
  // 2. Com Psicólogo
  const { count: psiCount } = await supabase.from('profissionais_saude').select('*', { count: 'exact', head: true }).gt('qt_prof_psicologo', 0);
  
  // 3. Segurança Alimentar (Cozinha + Refeitório)
  const { count: alimCount } = await supabase.from('infraestrutura_alimentacao').select('*', { count: 'exact', head: true }).eq('in_cozinha', true).eq('in_refeitorio', true);
  
  // 4. Área Verde
  const { count: verdeCount } = await supabase.from('ambiente_escolar').select('*', { count: 'exact', head: true }).eq('in_area_verde', true);

  return {
    total: totalEscolas,
    noAcessCount: noAcessCount || 0,
    noAcessPct: (((noAcessCount || 0) / totalEscolas) * 100).toFixed(1).replace('.', ','),
    psiPct: (((psiCount || 0) / totalEscolas) * 100).toFixed(1).replace('.', ','),
    alimPct: (((alimCount || 0) / totalEscolas) * 100).toFixed(1).replace('.', ','),
    verdePct: (((verdeCount || 0) / totalEscolas) * 100).toFixed(1).replace('.', ',')
  };
}

// Filtro de escolas para a grade
export async function getFilteredSchools(filterType: string | null, stateId: number | null = null, cityId: number | null = null, page: number = 0) {
  const limit = 30;
  const offset = page * limit;

  let query = supabase
    .from('escola')
    .select(`
      co_entidade,
      no_entidade,
      co_municipio,
      municipio!inner (co_uf, no_municipio, estado!inner (sg_uf)),
      infraestrutura_alimentacao!inner (*),
      infraestrutura_bem_estar!inner (*),
      profissionais_saude!inner (*),
      ambiente_escolar!inner (*)
    `)
    .range(offset, offset + limit - 1)
    .order('no_entidade', { ascending: true });

  if (filterType === 'no_acess') {
    query = query.eq('infraestrutura_bem_estar.in_banheiro_pne', false);
  } else if (filterType === 'psi') {
    query = query.gt('profissionais_saude.qt_prof_psicologo', 0);
  } else if (filterType === 'alim') {
    query = query.eq('infraestrutura_alimentacao.in_cozinha', true).eq('infraestrutura_alimentacao.in_refeitorio', true);
  } else if (filterType === 'verde') {
    query = query.eq('ambiente_escolar.in_area_verde', true);
  }

  if (stateId) {
    query = query.eq('municipio.co_uf', stateId);
  }
  if (cityId) {
    query = query.eq('co_municipio', cityId);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error("Erro ao buscar lista filtrada:", error);
    return [];
  }
  return data;
}

export async function getStates() {
  const { data } = await supabase.from('estado').select('co_uf, sg_uf, no_uf').order('no_uf');
  return data || [];
}

export async function getCitiesByState(coUf: number) {
  const { data } = await supabase.from('municipio').select('co_municipio, no_municipio').eq('co_uf', coUf).order('no_municipio');
  return data || [];
}
