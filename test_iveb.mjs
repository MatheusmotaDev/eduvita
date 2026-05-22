import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf-8');
let SUPABASE_URL = '';
let SUPABASE_KEY = '';

envFile.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) SUPABASE_URL = line.split('=')[1].trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) SUPABASE_KEY = line.split('=')[1].trim();
});

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function test() {
  console.log("Testando busca da cidade: SÃO PAULO");
  const { data: cityData, error } = await supabase
    .from('municipio')
    .select('co_municipio, no_municipio')
    .limit(10);
    
  console.log("CityData:", cityData);
  console.log("Error:", error);

  if (cityData && cityData.length > 0) {
    const co = cityData[0].co_municipio;
    console.log("Testando busca de escolas para co_municipio:", co);
    const { data: schools, error: sErr } = await supabase
      .from('escola')
      .select(`
        co_entidade,
        infraestrutura_bem_estar!inner(in_banheiro_pne),
        infraestrutura_alimentacao!inner(in_cozinha, in_refeitorio)
      `)
      .eq('co_municipio', co)
      .limit(2);
    
    console.log("Schools:", JSON.stringify(schools, null, 2));
    console.log("School Error:", sErr);
  }
}

test();
