import psycopg2
import os

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
        pass
    return env

env = load_env()
db_url = env.get("DATABASE_URL")

schema = """
DROP TABLE IF EXISTS escola CASCADE;
DROP TABLE IF EXISTS regiao CASCADE;
DROP TABLE IF EXISTS estado CASCADE;
DROP TABLE IF EXISTS municipio CASCADE;
DROP TABLE IF EXISTS localizacao_diferenciada CASCADE;
DROP TABLE IF EXISTS localizacaodiferenciada CASCADE;
DROP TABLE IF EXISTS infraestrutura_alimentacao CASCADE;
DROP TABLE IF EXISTS infraestruturaalimentacao CASCADE;
DROP TABLE IF EXISTS infraestrutura_bem_estar CASCADE;
DROP TABLE IF EXISTS infraestruturabeestar CASCADE;
DROP TABLE IF EXISTS profissionais_saude CASCADE;
DROP TABLE IF EXISTS profissionaissaude CASCADE;
DROP TABLE IF EXISTS material_pedagogico CASCADE;
DROP TABLE IF EXISTS materialpedagogico CASCADE;
DROP TABLE IF EXISTS ambiente_escolar CASCADE;
DROP TABLE IF EXISTS ambienteescolar CASCADE;
DROP TABLE IF EXISTS denuncias CASCADE;

CREATE TABLE regiao (
    co_regiao INT PRIMARY KEY,
    no_regiao VARCHAR(255)
);

CREATE TABLE estado (
    co_uf INT PRIMARY KEY,
    no_uf VARCHAR(255),
    sg_uf VARCHAR(2),
    co_regiao INT
);

CREATE TABLE municipio (
    co_municipio INT PRIMARY KEY,
    no_municipio VARCHAR(255),
    co_uf INT
);

CREATE TABLE localizacao_diferenciada (
    tp_localizacao_diferenciada INT PRIMARY KEY,
    ds_descricao VARCHAR(255)
);

CREATE TABLE escola (
    co_entidade BIGINT PRIMARY KEY,
    no_entidade TEXT,
    ds_endereco TEXT,
    tp_dependencia INT,
    tp_localizacao INT,
    tp_situacao_funcionamento INT,
    co_municipio INT,
    tp_localizacao_diferenciada INT
);

CREATE TABLE infraestrutura_alimentacao (
    co_entidade BIGINT PRIMARY KEY,
    in_alimentacao BOOLEAN,
    in_refeitorio BOOLEAN,
    in_cozinha BOOLEAN,
    in_despensa BOOLEAN
);

CREATE TABLE infraestrutura_bem_estar (
    co_entidade BIGINT PRIMARY KEY,
    in_banheiro_pne BOOLEAN,
    in_banheiro_chuveiro BOOLEAN,
    in_sala_atendimento_especial BOOLEAN,
    in_dormitorio_aluno BOOLEAN
);

CREATE TABLE profissionais_saude (
    co_entidade BIGINT PRIMARY KEY,
    qt_prof_saude INT,
    qt_prof_fonaudiologo INT,
    qt_prof_nutricionista INT,
    qt_prof_psicologo INT,
    qt_prof_assist_social INT,
    qt_prof_trad_libras INT
);

CREATE TABLE material_pedagogico (
    co_entidade BIGINT PRIMARY KEY,
    in_material_ped_cientifico BOOLEAN,
    in_material_ped_indigena BOOLEAN,
    in_material_ped_quilombola BOOLEAN,
    in_material_ped_edu_esp BOOLEAN,
    in_material_ped_bil_surdos BOOLEAN
);

CREATE TABLE ambiente_escolar (
    co_entidade BIGINT PRIMARY KEY,
    in_area_verde BOOLEAN,
    in_area_plantio BOOLEAN,
    in_patio_coberto BOOLEAN,
    in_parque_infantil BOOLEAN,
    in_quadra_esportes BOOLEAN
);

CREATE TABLE denuncias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    co_entidade BIGINT,
    no_entidade TEXT,
    descricao TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);
"""

def setup():
    conn = psycopg2.connect(db_url, sslmode='require')
    cursor = conn.cursor()
    try:
        cursor.execute(schema)
        conn.commit()
        print("Tabelas dropadas e recriadas com sucesso!")
    except Exception as e:
        print("Erro:", e)
        conn.rollback()
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    setup()
