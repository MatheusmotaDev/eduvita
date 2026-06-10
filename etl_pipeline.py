import csv
import json
import psycopg2
import psycopg2.extras
import os

# 1. Leitor manual do .env.local
def load_env():
    env = {}
    try:
        with open('.env.local', 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    key, val = line.split('=', 1)
                    env[key.strip()] = val.strip()
    except Exception as e:
        print("Erro ao ler .env.local:", e)
    return env

env = load_env()
db_url = env.get("DATABASE_URL")

if not db_url:
    raise Exception("DATABASE_URL não encontrado no .env.local. Configure a url do Render.")

# Conexão com o banco via psycopg2
def get_db_connection():
    return psycopg2.connect(db_url, sslmode='require')

def upsert_batch(cursor, table, data_list):
    if not data_list: return
    
    keys = data_list[0].keys()
    columns = ', '.join(keys)
    
    # A lógica de conflito depende da chave primária de cada tabela.
    # Exemplo genérico:
    pk = 'co_entidade' if 'co_entidade' in keys else list(keys)[0]
    
    update_clause = ', '.join([f"{k} = EXCLUDED.{k}" for k in keys if k != pk])
    
    values_template = ', '.join(['%s'] * len(keys))
    insert_query = f"INSERT INTO {table} ({columns}) VALUES %s ON CONFLICT ({pk}) DO UPDATE SET {update_clause}"
    
    # Se update_clause for vazio, é um DO NOTHING
    if not update_clause:
        insert_query = f"INSERT INTO {table} ({columns}) VALUES %s ON CONFLICT ({pk}) DO NOTHING"
        
    values = [[row[k] for k in keys] for row in data_list]
    psycopg2.extras.execute_values(cursor, insert_query, values)

def clean_bool(val):
    if not val or val.strip() == '' or val.strip() == 'NaN':
        return False
    return val.strip() == '1'

def clean_int(val):
    if not val or val.strip() == '':
        return 0
    try:
        return int(float(val))
    except:
        return 0

def run_etl(limit=None):
    csv_path = "INEP/Tabela_Escola_2025.csv"
    print(f"Iniciando ETL (Limite: {limit if limit else 'Sem limite'})...")
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    regioes_vistas = set()
    estados_vistos = set()
    municipios_vistos = set()
    locais_vistos = set()
    
    escola_batch, alimentacao_batch, bem_estar_batch = [], [], []
    saude_batch, material_batch, ambiente_batch = [], [], []
    batch_size = 1000
    count = 0
    
    try:
        with open(csv_path, 'r', encoding='iso-8859-1') as f:
            reader = csv.DictReader(f, delimiter=';')
            capitais = {
                'SÃO PAULO', 'RIO DE JANEIRO', 'BELO HORIZONTE', 'BRASÍLIA', 'SALVADOR', 
                'FORTALEZA', 'MANAUS', 'CURITIBA', 'RECIFE', 'PORTO ALEGRE', 'BELÉM', 
                'GOIÂNIA', 'SÃO LUÍS', 'MACEIÓ', 'NATAL', 'JOÃO PESSOA', 'TERESINA', 
                'ARACAJU', 'VITÓRIA', 'FLORIANÓPOLIS', 'CUIABÁ', 'CAMPO GRANDE', 
                'PORTO VELHO', 'MACAPÁ', 'RIO BRANCO', 'BOA VISTA', 'PALMAS'
            }
            
            for row in reader:
                if row.get('TP_SITUACAO_FUNCIONAMENTO') != '1' or row.get('NO_MUNICIPIO', '').strip().upper() not in capitais:
                    continue
                    
                co_regiao = row.get('CO_REGIAO')
                if co_regiao and co_regiao not in regioes_vistas:
                    regioes_vistas.add(co_regiao)
                    upsert_batch(cursor, 'regiao', [{'co_regiao': int(co_regiao), 'no_regiao': row.get('NO_REGIAO')}])
                    
                co_uf = row.get('CO_UF')
                if co_uf and co_uf not in estados_vistos:
                    estados_vistos.add(co_uf)
                    upsert_batch(cursor, 'estado', [{
                        'co_uf': int(co_uf), 
                        'no_uf': row.get('NO_UF'), 
                        'sg_uf': row.get('SG_UF'), 
                        'co_regiao': int(co_regiao) if co_regiao else 0
                    }])
                    
                co_municipio = row.get('CO_MUNICIPIO')
                if co_municipio and co_municipio not in municipios_vistos:
                    municipios_vistos.add(co_municipio)
                    upsert_batch(cursor, 'municipio', [{
                        'co_municipio': int(co_municipio),
                        'no_municipio': row.get('NO_MUNICIPIO', '')[:100],
                        'co_uf': int(co_uf) if co_uf else 0
                    }])
                    
                tp_loc = row.get('TP_LOCALIZACAO_DIFERENCIADA')
                if tp_loc and tp_loc not in locais_vistos:
                    locais_vistos.add(tp_loc)
                    upsert_batch(cursor, 'localizacao_diferenciada', [{
                        'tp_localizacao_diferenciada': int(tp_loc),
                        'ds_descricao': f"Tipo {tp_loc}"
                    }])
                    
                co_entidade = int(row.get('CO_ENTIDADE', 0))
                if not co_entidade: continue
                
                escola_batch.append({
                    'co_entidade': co_entidade,
                    'no_entidade': row.get('NO_ENTIDADE', '')[:200],
                    'ds_endereco': row.get('DS_ENDERECO', '')[:200] or 'NÃO INFORMADO',
                    'tp_dependencia': clean_int(row.get('TP_DEPENDENCIA')),
                    'tp_localizacao': clean_int(row.get('TP_LOCALIZACAO')),
                    'tp_situacao_funcionamento': clean_int(row.get('TP_SITUACAO_FUNCIONAMENTO')),
                    'co_municipio': clean_int(row.get('CO_MUNICIPIO')),
                    'tp_localizacao_diferenciada': clean_int(row.get('TP_LOCALIZACAO_DIFERENCIADA'))
                })
                
                alimentacao_batch.append({
                    'co_entidade': co_entidade,
                    'in_alimentacao': clean_bool(row.get('IN_ALIMENTACAO')),
                    'in_refeitorio': clean_bool(row.get('IN_REFEITORIO')),
                    'in_cozinha': clean_bool(row.get('IN_COZINHA')),
                    'in_despensa': clean_bool(row.get('IN_DESPENSA'))
                })
                
                bem_estar_batch.append({
                    'co_entidade': co_entidade,
                    'in_banheiro_pne': clean_bool(row.get('IN_BANHEIRO_PNE')),
                    'in_banheiro_chuveiro': clean_bool(row.get('IN_BANHEIRO_CHUVEIRO')),
                    'in_sala_atendimento_especial': clean_bool(row.get('IN_SALA_ATENDIMENTO_ESPECIAL')),
                    'in_dormitorio_aluno': clean_bool(row.get('IN_DORMITORIO_ALUNO'))
                })
                
                saude_batch.append({
                    'co_entidade': co_entidade,
                    'qt_prof_saude': clean_int(row.get('QT_PROF_SAUDE')),
                    'qt_prof_fonaudiologo': clean_int(row.get('QT_PROF_FONAUDIOLOGO')),
                    'qt_prof_nutricionista': clean_int(row.get('QT_PROF_NUTRICIONISTA')),
                    'qt_prof_psicologo': clean_int(row.get('QT_PROF_PSICOLOGO')),
                    'qt_prof_assist_social': clean_int(row.get('QT_PROF_ASSIST_SOCIAL')),
                    'qt_prof_trad_libras': clean_int(row.get('QT_PROF_TRAD_LIBRAS'))
                })
                
                material_batch.append({
                    'co_entidade': co_entidade,
                    'in_material_ped_cientifico': clean_bool(row.get('IN_MATERIAL_PED_CIENTIFICO')),
                    'in_material_ped_indigena': clean_bool(row.get('IN_MATERIAL_PED_INDIGENA')),
                    'in_material_ped_quilombola': clean_bool(row.get('IN_MATERIAL_PED_QUILOMBOLA')),
                    'in_material_ped_edu_esp': clean_bool(row.get('IN_MATERIAL_PED_EDU_ESP')),
                    'in_material_ped_bil_surdos': clean_bool(row.get('IN_MATERIAL_PED_BIL_SURDOS'))
                })
                
                ambiente_batch.append({
                    'co_entidade': co_entidade,
                    'in_area_verde': clean_bool(row.get('IN_AREA_VERDE')),
                    'in_area_plantio': clean_bool(row.get('IN_AREA_PLANTIO')),
                    'in_patio_coberto': clean_bool(row.get('IN_PATIO_COBERTO')),
                    'in_parque_infantil': clean_bool(row.get('IN_PARQUE_INFANTIL')),
                    'in_quadra_esportes': clean_bool(row.get('IN_QUADRA_ESPORTES'))
                })
                
                count += 1
                if len(escola_batch) >= batch_size:
                    upsert_batch(cursor, 'escola', escola_batch)
                    upsert_batch(cursor, 'infraestrutura_alimentacao', alimentacao_batch)
                    upsert_batch(cursor, 'infraestrutura_bem_estar', bem_estar_batch)
                    upsert_batch(cursor, 'profissionais_saude', saude_batch)
                    upsert_batch(cursor, 'material_pedagogico', material_batch)
                    upsert_batch(cursor, 'ambiente_escolar', ambiente_batch)
                    
                    conn.commit()
                    
                    escola_batch.clear(); alimentacao_batch.clear(); bem_estar_batch.clear()
                    saude_batch.clear(); material_batch.clear(); ambiente_batch.clear()
                    print(f"[{count}] Escolas inseridas no PostgreSQL via psycopg2...")
                    
                if limit and count >= limit:
                    break
                    
        if len(escola_batch) > 0:
            upsert_batch(cursor, 'escola', escola_batch)
            upsert_batch(cursor, 'infraestrutura_alimentacao', alimentacao_batch)
            upsert_batch(cursor, 'infraestrutura_bem_estar', bem_estar_batch)
            upsert_batch(cursor, 'profissionais_saude', saude_batch)
            upsert_batch(cursor, 'material_pedagogico', material_batch)
            upsert_batch(cursor, 'ambiente_escolar', ambiente_batch)
            conn.commit()
            print(f"[{count}] Escolas inseridas no PostgreSQL via psycopg2...")
            
    except FileNotFoundError:
        print(f"Erro: O arquivo {csv_path} não foi encontrado. Verifique se a pasta INEP existe.")
        return
    finally:
        cursor.close()
        conn.close()

    print("Carga finalizada com sucesso! O banco de dados agora tem dados reais.")

if __name__ == "__main__":
    run_etl(limit=15000)
