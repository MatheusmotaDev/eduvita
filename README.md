# EduVita - Índice de Vulnerabilidade Escolar do Brasil 🇧🇷

O **EduVita** é um portal analítico web focado em mapear e expor o **Índice de Vulnerabilidade Escolar do Brasil (IVEB)**. Utilizando milhares de registros provenientes dos Microdados do Censo Escolar (INEP), o sistema atua como uma ferramenta de transparência cívica e governamental, transformando dados complexos de infraestrutura escolar pública em um indicador (de 0 a 10) de fácil interpretação.

O projeto ajuda a sociedade civil e gestores públicos a visualizarem instantaneamente a falta de infraestrutura básica (ex: banheiros acessíveis - PNE, cozinhas, refeitórios) por meio de um Mapa de Calor interativo, Rankings Municipais e Painéis de Conformidade Legal.

---

## 🚀 Tecnologias Utilizadas
- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Banco de Dados:** Supabase (PostgreSQL) com acesso nativo via API
- **Mapas:** Mapbox GL & React-Map-GL (Mapas Interativos 3D)
- **Ícones:** Lucide React

---

## 📁 Estrutura de Pastas

O projeto foi projetado utilizando uma arquitetura modular inspirada em *Feature-First*, facilitando a escalabilidade:

```text
📦 src/
 ┣ 📂 app/                     # Roteamento do Next.js (App Router)
 ┃ ┣ 📂 conformidade/          # Página de auditoria legal (LBI/PNE)
 ┃ ┣ 📂 docs/                  # Página de documentação do cálculo IVEB
 ┃ ┣ 📂 escolas/               # Busca livre de perfil escolar
 ┃ ┣ 📂 mapa/                  # Mapa de Calor de vulnerabilidade
 ┃ ┣ 📂 rankings/              # Ranking interativo de municípios
 ┃ ┣ 📜 globals.css            # Variáveis globais do Tailwind v4
 ┃ ┗ 📜 layout.tsx & page.tsx  # Layout base da aplicação
 ┃
 ┣ 📂 features/                # Módulos principais do negócio
 ┃ ┣ 📂 compliance/            # Lógica de cálculo de conformidade (PNE)
 ┃ ┣ 📂 dashboard/             # Componentes base do painel (Sidebar, Layout)
 ┃ ┣ 📂 map/                   # Integração avançada com a API do Mapbox
 ┃ ┣ 📂 rankings/              # Algoritmo de cálculo do IVEB e paginação
 ┃ ┗ 📂 schools/               # Drawer e grids de detalhamento escolar
 ┃
 ┗ 📂 shared/                  # Código compartilhado genérico
   ┣ 📂 lib/                   # Clientes (ex: supabase.ts, mapbox)
   ┗ 📂 ui/                    # Componentes puramente visuais (Badge)
```

---

## ⚙️ Como rodar o projeto localmente

Para rodar este projeto na sua máquina, siga os passos estritamente na ordem abaixo.

### 1. Pré-requisitos
- Ter o [Node.js](https://nodejs.org/en/) instalado (versão 18 ou superior).
- Ter o gerenciador de pacotes `npm` ou `yarn` instalado.
- Ter o Git instalado.

### 2. Clonando o Repositório
Abra o seu terminal e clone o código-fonte:
```bash
git clone https://github.com/SEU_USUARIO/eduvita.git
cd eduvita
```

### 3. Instalando as Dependências
Com o terminal aberto dentro da pasta do projeto, instale os pacotes:
```bash
npm install
```

### 4. Configuração de Variáveis de Ambiente
Crie um arquivo chamado `.env.local` na raiz do projeto (mesmo nível do `package.json`) e insira as credenciais de banco de dados e mapas:

```env
NEXT_PUBLIC_SUPABASE_URL=Sua_URL_do_Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=Sua_Chave_Publica_do_Supabase
NEXT_PUBLIC_MAPBOX_TOKEN=Seu_Token_Privado_Mapbox
```
*(Para uso acadêmico/avaliação, solicite as chaves ao desenvolvedor caso não possua um banco espelho).*

### 5. Rodando o Servidor de Desenvolvimento
Inicie a aplicação localmente:
```bash
npm run dev
```

### 6. Acessando a Aplicação
Abra o seu navegador de preferência e acesse:
[http://localhost:3000](http://localhost:3000)

---

