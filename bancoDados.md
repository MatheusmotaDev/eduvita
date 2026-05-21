# EduVita — Script e conexão do Banco de Dados (Supabase)



Este documento contém o script SQL (PostgreSQL) para a criação das tabelas do banco de dados do **EduVita — Painel de Saúde e Bem-Estar Escolar**. 


obsrvação: o banco de dados JÁ foi criado!!!

Credenciais do supabase:

url: https://napmzciekbhocgflpnhp.supabase.co

key: sb_publishable_XGxj-nF45HnCK-P_Q6xQdQ_124Hm4IT


A modelagem foi baseada no Censo Escolar do INEP e estruturada utilizando o padrão `snake_case` para garantir compatibilidade e evitar problemas de sensibilidade de caixa (*case sensitivity*) na execução do painel do Supabase.

## Ordem de Criação e Dependências
As tabelas estão organizadas respeitando as restrições de chaves estrangeiras (FK), iniciando pelas entidades independentes e finalizando nas entidades fracas.

## Script SQL

```sql
-- 1. regiao
CREATE TABLE regiao (
    co_regiao INT PRIMARY KEY,
    no_regiao VARCHAR(50) NOT NULL
);

-- 2. estado
CREATE TABLE estado (
    co_uf INT PRIMARY KEY,
    no_uf VARCHAR(50) NOT NULL,
    sg_uf CHAR(2) NOT NULL,
    co_regiao INT NOT NULL,
    CONSTRAINT fk_estado_regiao FOREIGN KEY (co_regiao) REFERENCES regiao(co_regiao)
);

-- 3. municipio
CREATE TABLE municipio (
    co_municipio INT PRIMARY KEY,
    no_municipio VARCHAR(100) NOT NULL,
    co_uf INT NOT NULL,
    CONSTRAINT fk_municipio_estado FOREIGN KEY (co_uf) REFERENCES estado(co_uf)
);

-- 4. localizacao_diferenciada
CREATE TABLE localizacao_diferenciada (
    tp_localizacao_diferenciada INT PRIMARY KEY,
    ds_descricao VARCHAR(100) NOT NULL
);

-- 5. escola
CREATE TABLE escola (
    co_entidade INT PRIMARY KEY,
    no_entidade VARCHAR(200) NOT NULL,
    ds_endereco VARCHAR(200),
    tp_dependencia INT NOT NULL,
    tp_localizacao INT NOT NULL,
    tp_situacao_funcionamento INT NOT NULL,
    co_municipio INT NOT NULL,
    tp_localizacao_diferenciada INT NOT NULL,
    CONSTRAINT fk_escola_municipio FOREIGN KEY (co_municipio) REFERENCES municipio(co_municipio),
    CONSTRAINT fk_escola_localizacao FOREIGN KEY (tp_localizacao_diferenciada) REFERENCES localizacao_diferenciada(tp_localizacao_diferenciada)
);

-- 6. infraestrutura_alimentacao
CREATE TABLE infraestrutura_alimentacao (
    co_entidade INT PRIMARY KEY,
    in_alimentacao BOOLEAN NOT NULL,
    in_refeitorio BOOLEAN NOT NULL,
    in_cozinha BOOLEAN NOT NULL,
    in_despensa BOOLEAN NOT NULL,
    CONSTRAINT fk_alimentacao_escola FOREIGN KEY (co_entidade) REFERENCES escola(co_entidade) ON DELETE CASCADE
);

-- 7. infraestrutura_bem_estar
CREATE TABLE infraestrutura_bem_estar (
    co_entidade INT PRIMARY KEY,
    in_banheiro_pne BOOLEAN NOT NULL,
    in_banheiro_chuveiro BOOLEAN NOT NULL,
    in_sala_atendimento_especial BOOLEAN NOT NULL,
    in_dormitorio_aluno BOOLEAN NOT NULL,
    CONSTRAINT fk_beestar_escola FOREIGN KEY (co_entidade) REFERENCES escola(co_entidade) ON DELETE CASCADE
);

-- 8. profissionais_saude
CREATE TABLE profissionais_saude (
    co_entidade INT PRIMARY KEY,
    qt_prof_saude INT NOT NULL DEFAULT 0,
    qt_prof_fonaudiologo INT NOT NULL DEFAULT 0,
    qt_prof_nutricionista INT NOT NULL DEFAULT 0,
    qt_prof_psicologo INT NOT NULL DEFAULT 0,
    qt_prof_assist_social INT NOT NULL DEFAULT 0,
    qt_prof_trad_libras INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_profissionais_escola FOREIGN KEY (co_entidade) REFERENCES escola(co_entidade) ON DELETE CASCADE
);

-- 9. material_pedagogico
CREATE TABLE material_pedagogico (
    co_entidade INT PRIMARY KEY,
    in_material_ped_cientifico BOOLEAN NOT NULL,
    in_material_ped_indigena BOOLEAN NOT NULL,
    in_material_ped_quilombola BOOLEAN NOT NULL,
    in_material_ped_edu_esp BOOLEAN NOT NULL,
    in_material_ped_bil_surdos BOOLEAN NOT NULL,
    CONSTRAINT fk_material_escola FOREIGN KEY (co_entidade) REFERENCES escola(co_entidade) ON DELETE CASCADE
);

-- 10. ambiente_escolar
CREATE TABLE ambiente_escolar (
    co_entidade INT PRIMARY KEY,
    in_area_verde BOOLEAN NOT NULL,
    in_area_plantio BOOLEAN NOT NULL,
    in_patio_coberto BOOLEAN NOT NULL,
    in_parque_infantil BOOLEAN NOT NULL,
    in_quadra_esportes BOOLEAN NOT NULL,
    CONSTRAINT fk_ambiente_escola FOREIGN KEY (co_entidade) REFERENCES escola(co_entidade) ON DELETE CASCADE
);