import os
import pandas as pd
from dotenv import load_dotenv
from supabase import create_client, Client

# Carrega variáveis de ambiente do projeto Next.js
load_dotenv(".env.local")

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not url or not key:
    raise Exception("Chaves do Supabase não encontradas no .env.local")

supabase: Client = create_client(url, key)

CSV_PATH = "INEP/Tabela_Escola_2025.csv"

def clean_bool(val):
    if pd.isna(val) or val == '' or val == ' ' or val == 'NaN':
        return False
    return str(val).strip() == '1'

def clean_int(val):
    if pd.isna(val) or val == '' or val == ' ':
        return 0
    try:
        return int(float(val))
    except:
        return 0

def run_etl(limit=None):
    print(f"Lendo CSV {'com limite de ' + str(limit) + ' linhas' if limit else 'completo'}...")
    
    # Lendo apenas as colunas necessárias para economizar memória e acelerar o processo
    cols = [
        "CO_REGIAO", "NO_REGIAO",
        "CO_UF", "NO_UF", "SG_UF",
        "CO_MUNICIPIO", "NO_MUNICIPIO",
        "TP_LOCALIZACAO_DIFERENCIADA",
        "CO_ENTIDADE", "NO_ENTIDADE", "DS_ENDERECO", "TP_DEPENDENCIA", "TP_LOCALIZACAO", "TP_SITUACAO_FUNCIONAMENTO",
        "IN_ALIMENTACAO", "IN_REFEITORIO", "IN_COZINHA", "IN_DESPENSA",
        "IN_BANHEIRO_PNE", "IN_BANHEIRO_CHUVEIRO", "IN_SALA_ATENDIMENTO_ESPECIAL", "IN_DORMITORIO_ALUNO",
        "QT_PROF_SAUDE", "QT_PROF_FONAUDIOLOGO", "QT_PROF_NUTRICIONISTA", "QT_PROF_PSICOLOGO", "QT_PROF_ASSIST_SOCIAL", "QT_PROF_TRAD_LIBRAS",
        "IN_MATERIAL_PED_CIENTIFICO", "IN_MATERIAL_PED_INDIGENA", "IN_MATERIAL_PED_QUILOMBOLA", "IN_MATERIAL_PED_EDU_ESP", "IN_MATERIAL_PED_BIL_SURDOS",
        "IN_AREA_VERDE", "IN_AREA_PLANTIO", "IN_PATIO_COBERTO", "IN_PARQUE_INFANTIL", "IN_QUADRA_ESPORTES"
    ]
    
    df = pd.read_csv(CSV_PATH, sep=";", encoding="iso-8859-1", usecols=cols, nrows=limit, dtype=str)
    
    # Filtra apenas escolas ativas (TP_SITUACAO_FUNCIONAMENTO == 1)
    df = df[df['TP_SITUACAO_FUNCIONAMENTO'] == '1']
    df.fillna('', inplace=True)
    
    print(f"Total de escolas ativas prontas para processamento: {len(df)}")
    
    # 1. Inserir Regiões Únicas
    print("Processando Regiões...")
    regioes = df[['CO_REGIAO', 'NO_REGIAO']].drop_duplicates()
    for _, row in regioes.iterrows():
        if row['CO_REGIAO']:
            try:
                supabase.table('regiao').upsert({
                    'co_regiao': int(row['CO_REGIAO']),
                    'no_regiao': row['NO_REGIAO']
                }).execute()
            except Exception: pass
                
    # 2. Inserir Estados Únicos
    print("Processando Estados...")
    estados = df[['CO_UF', 'NO_UF', 'SG_UF', 'CO_REGIAO']].drop_duplicates()
    for _, row in estados.iterrows():
        if row['CO_UF']:
            try:
                supabase.table('estado').upsert({
                    'co_uf': int(row['CO_UF']),
                    'no_uf': row['NO_UF'],
                    'sg_uf': row['SG_UF'],
                    'co_regiao': int(row['CO_REGIAO'])
                }).execute()
            except Exception: pass

    # 3. Inserir Municípios Únicos
    print("Processando Municípios...")
    municipios = df[['CO_MUNICIPIO', 'NO_MUNICIPIO', 'CO_UF']].drop_duplicates()
    for _, row in municipios.iterrows():
        if row['CO_MUNICIPIO']:
            try:
                supabase.table('municipio').upsert({
                    'co_municipio': int(row['CO_MUNICIPIO']),
                    'no_municipio': row['NO_MUNICIPIO'][:100],
                    'co_uf': int(row['CO_UF'])
                }).execute()
            except Exception: pass
                
    # 4. Inserir Localização Diferenciada Única
    print("Processando Localizações Diferenciadas...")
    locais = df[['TP_LOCALIZACAO_DIFERENCIADA']].drop_duplicates()
    for _, row in locais.iterrows():
        if row['TP_LOCALIZACAO_DIFERENCIADA']:
            try:
                supabase.table('localizacao_diferenciada').upsert({
                    'tp_localizacao_diferenciada': int(row['TP_LOCALIZACAO_DIFERENCIADA']),
                    'ds_descricao': f"Tipo {row['TP_LOCALIZACAO_DIFERENCIADA']}"
                }).execute()
            except Exception: pass
                
    # 5. Inserir Escolas e Sub-Tabelas Analíticas
    print("Processando Escolas e dependências (em Lotes)...")
    batch_size = 50
    
    escola_batch, alimentacao_batch, bem_estar_batch = [], [], []
    saude_batch, material_batch, ambiente_batch = [], [], []
    
    for i, row in df.iterrows():
        try:
            co_entidade = int(row['CO_ENTIDADE'])
            
            escola_batch.append({
                'co_entidade': co_entidade,
                'no_entidade': row['NO_ENTIDADE'][:200],
                'ds_endereco': row['DS_ENDERECO'][:200] if row['DS_ENDERECO'] else 'NÃO INFORMADO',
                'tp_dependencia': int(row['TP_DEPENDENCIA']) if row['TP_DEPENDENCIA'] else 0,
                'tp_localizacao': int(row['TP_LOCALIZACAO']) if row['TP_LOCALIZACAO'] else 0,
                'tp_situacao_funcionamento': int(row['TP_SITUACAO_FUNCIONAMENTO']),
                'co_municipio': int(row['CO_MUNICIPIO']) if row['CO_MUNICIPIO'] else 0,
                'tp_localizacao_diferenciada': int(row['TP_LOCALIZACAO_DIFERENCIADA']) if row['TP_LOCALIZACAO_DIFERENCIADA'] else 0
            })
            
            alimentacao_batch.append({
                'co_entidade': co_entidade,
                'in_alimentacao': clean_bool(row['IN_ALIMENTACAO']),
                'in_refeitorio': clean_bool(row['IN_REFEITORIO']),
                'in_cozinha': clean_bool(row['IN_COZINHA']),
                'in_despensa': clean_bool(row['IN_DESPENSA'])
            })
            
            bem_estar_batch.append({
                'co_entidade': co_entidade,
                'in_banheiro_pne': clean_bool(row['IN_BANHEIRO_PNE']),
                'in_banheiro_chuveiro': clean_bool(row['IN_BANHEIRO_CHUVEIRO']),
                'in_sala_atendimento_especial': clean_bool(row['IN_SALA_ATENDIMENTO_ESPECIAL']),
                'in_dormitorio_aluno': clean_bool(row['IN_DORMITORIO_ALUNO'])
            })
            
            saude_batch.append({
                'co_entidade': co_entidade,
                'qt_prof_saude': clean_int(row['QT_PROF_SAUDE']),
                'qt_prof_fonaudiologo': clean_int(row['QT_PROF_FONAUDIOLOGO']),
                'qt_prof_nutricionista': clean_int(row['QT_PROF_NUTRICIONISTA']),
                'qt_prof_psicologo': clean_int(row['QT_PROF_PSICOLOGO']),
                'qt_prof_assist_social': clean_int(row['QT_PROF_ASSIST_SOCIAL']),
                'qt_prof_trad_libras': clean_int(row['QT_PROF_TRAD_LIBRAS'])
            })
            
            material_batch.append({
                'co_entidade': co_entidade,
                'in_material_ped_cientifico': clean_bool(row['IN_MATERIAL_PED_CIENTIFICO']),
                'in_material_ped_indigena': clean_bool(row['IN_MATERIAL_PED_INDIGENA']),
                'in_material_ped_quilombola': clean_bool(row['IN_MATERIAL_PED_QUILOMBOLA']),
                'in_material_ped_edu_esp': clean_bool(row['IN_MATERIAL_PED_EDU_ESP']),
                'in_material_ped_bil_surdos': clean_bool(row['IN_MATERIAL_PED_BIL_SURDOS'])
            })
            
            ambiente_batch.append({
                'co_entidade': co_entidade,
                'in_area_verde': clean_bool(row['IN_AREA_VERDE']),
                'in_area_plantio': clean_bool(row['IN_AREA_PLANTIO']),
                'in_patio_coberto': clean_bool(row['IN_PATIO_COBERTO']),
                'in_parque_infantil': clean_bool(row['IN_PARQUE_INFANTIL']),
                'in_quadra_esportes': clean_bool(row['IN_QUADRA_ESPORTES'])
            })
            
            if len(escola_batch) >= batch_size:
                supabase.table('escola').upsert(escola_batch).execute()
                supabase.table('infraestrutura_alimentacao').upsert(alimentacao_batch).execute()
                supabase.table('infraestrutura_bem_estar').upsert(bem_estar_batch).execute()
                supabase.table('profissionais_saude').upsert(saude_batch).execute()
                supabase.table('material_pedagogico').upsert(material_batch).execute()
                supabase.table('ambiente_escolar').upsert(ambiente_batch).execute()
                
                escola_batch.clear(); alimentacao_batch.clear(); bem_estar_batch.clear()
                saude_batch.clear(); material_batch.clear(); ambiente_batch.clear()
                
        except Exception as e:
            print(f"Erro na linha {i}: {e}")
            continue

    if len(escola_batch) > 0:
        try:
            supabase.table('escola').upsert(escola_batch).execute()
            supabase.table('infraestrutura_alimentacao').upsert(alimentacao_batch).execute()
            supabase.table('infraestrutura_bem_estar').upsert(bem_estar_batch).execute()
            supabase.table('profissionais_saude').upsert(saude_batch).execute()
            supabase.table('material_pedagogico').upsert(material_batch).execute()
            supabase.table('ambiente_escolar').upsert(ambiente_batch).execute()
        except Exception as e:
            print(f"Erro no batch final: {e}")

    print("✅ Carga finalizada com sucesso!")

if __name__ == "__main__":
    # IMPORTANTE: Por estarmos desenvolvendo o MVP, o limite default foi setado em 1000 
    # para validar o fluxo rapidamente sem estourar quotas da API do Supabase.
    # Quando for a hora da verdade, mude limit para None.
    run_etl(limit=1000)
