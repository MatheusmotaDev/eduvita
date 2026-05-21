# EduVita — Design System Oficial
**Plataforma Inteligente de Bem-Estar Escolar**
`v1.0 | Maio de 2026 | CONFIDENCIAL – Uso Interno Exclusivo`

---

## Índice

1. [Fundação da Marca](#1-fundação-da-marca)
2. [Paleta de Cores](#2-paleta-de-cores)
3. [Tipografia](#3-tipografia)
4. [Espaçamento e Grid](#4-espaçamento-e-grid)
5. [Iconografia e Semântica Visual](#5-iconografia-e-semântica-visual)
6. [Componentes de UI](#6-componentes-de-ui)
7. [Padrões de Visualização de Dados](#7-padrões-de-visualização-de-dados)
8. [Tokens de Design](#8-tokens-de-design)
9. [Acessibilidade](#9-acessibilidade)
10. [Tom de Voz e Linguagem](#10-tom-de-voz-e-linguagem)
11. [Guia de Uso da Marca](#11-guia-de-uso-da-marca)

---

## 1. Fundação da Marca

### 1.1 Identidade Central

A EduVita posiciona-se como uma **instituição de inteligência pública** — não como produto de software convencional. Seu design deve comunicar:

- **Seriedade institucional** → confiança para gestores públicos e pesquisadores
- **Clareza analítica** → dados complexos tornados compreensíveis
- **Acessibilidade radical** → do secretário ao familiar do aluno
- **Impacto social** → cada decisão de design justificada pelo benefício às populações vulneráveis

### 1.2 Personalidade da Marca

| Atributo | Expressão no Design |
|---|---|
| Técnico, mas acessível | Linguagem clara; gráficos autoexplicativos |
| Analítico, mas empático | Dados com contexto humano; histórias por trás dos números |
| Sério, mas não burocrático | Interface limpa, sem excesso de formulários |
| Público, mas premium | Qualidade visual equivalente ao setor privado |

### 1.3 Anti-Padrões da Marca

❌ Não usar estética de "startup tech" genérica (gradientes roxos, bolhas, neons)
❌ Não usar linguagem corporativa vazia ("soluções inovadoras")
❌ Não usar dashboards com excesso de números sem hierarquia visual
❌ Não usar imagens de banco de fotos com pessoas sorridentes e genéricas
❌ Não usar alertas vermelhos sem contexto ou sugestão de ação

---

## 2. Paleta de Cores

### 2.1 Cores Primárias

A paleta é construída sobre o **azul institucional** (seriedade pública) e o **verde-vida** (saúde, bem-estar, impacto positivo) — refletindo diretamente a fusão Edu + Vita.

```
Primary — Azul Institucional
─────────────────────────────
--color-primary-900: #0D2B4E   /* Azul profundo — títulos, headers */
--color-primary-700: #1A4A7A   /* Azul principal — botões, links */
--color-primary-500: #2E6FAD   /* Azul médio — ícones, bordas ativas */
--color-primary-300: #7FB3D9   /* Azul claro — backgrounds secundários */
--color-primary-100: #D6EAF8   /* Azul pálido — hover states, chips */
--color-primary-050: #EBF5FB   /* Azul suave — backgrounds de cards */
```

```
Secondary — Verde Vita
──────────────────────
--color-secondary-700: #1A6B3C   /* Verde escuro — impacto, conformidade */
--color-secondary-500: #27AE60   /* Verde principal — status positivo, IVEB alto */
--color-secondary-300: #82E0AA   /* Verde médio — progresso, melhorias */
--color-secondary-100: #D5F5E3   /* Verde pálido — backgrounds de sucesso */
```

### 2.2 Cores Semânticas (Sistema de Alertas)

Utilizadas exclusivamente para comunicar status de vulnerabilidade e conformidade.

```
Status — Vulnerabilidade Crítica (Vermelho)
────────────────────────────────────────────
--color-critical-700: #922B21
--color-critical-500: #E74C3C
--color-critical-100: #FADBD8

Status — Atenção / Risco Moderado (Âmbar)
───────────────────────────────────────────
--color-warning-700: #9A7D0A
--color-warning-500: #F39C12
--color-warning-100: #FDEBD0

Status — Conformidade / Adequado (Verde)
──────────────────────────────────────────
Usar --color-secondary-500 e --color-secondary-100

Status — Sem Dados / Neutro (Cinza)
─────────────────────────────────────
--color-neutral-500: #7F8C8D
--color-neutral-100: #F2F3F4
```

### 2.3 Escala de Cinzas (Neutrals)

```
--color-neutral-900: #1C2833   /* Texto principal */
--color-neutral-700: #2C3E50   /* Texto secundário */
--color-neutral-500: #717D7E   /* Texto de apoio, labels */
--color-neutral-300: #BDC3C7   /* Bordas, divisores */
--color-neutral-100: #F2F3F4   /* Backgrounds de página */
--color-neutral-000: #FFFFFF   /* Cards, superfícies */
```

### 2.4 IVEB — Escala de Score (0 a 100)

O Índice de Vulnerabilidade Escolar e Bem-Estar usa escala de cor contínua com 5 faixas:

| Faixa | Score | Cor | Hex | Interpretação |
|---|---|---|---|---|
| Crítico | 0–20 | Vermelho | `#C0392B` | Intervenção urgente |
| Vulnerável | 21–40 | Laranja | `#E67E22` | Atenção prioritária |
| Moderado | 41–60 | Âmbar | `#F1C40F` | Monitoramento ativo |
| Adequado | 61–80 | Verde-claro | `#58D68D` | Condições razoáveis |
| Referência | 81–100 | Verde | `#1E8449` | Boas práticas |

---

## 3. Tipografia

### 3.1 Família Tipográfica

A EduVita usa dois typefaces complementares: um serifado clássico para títulos (autoridade institucional) e um sans-serif humanista para corpo (legibilidade e acessibilidade).

```
Display / Títulos: "Playfair Display" (Google Fonts)
  → Uso: H1, H2, nome da plataforma, números de destaque grandes
  → Peso: 700 (Bold), 900 (Black) para destaque máximo
  → Justificativa: seriedade institucional sem frieza corporativa

Corpo / Interface: "Source Sans 3" (Google Fonts)
  → Uso: parágrafos, labels, botões, tabelas, UI em geral
  → Peso: 300, 400, 600
  → Justificativa: altíssima legibilidade; projetado para leitura em telas
```

### 3.2 Escala Tipográfica

```
--font-size-2xl:  2.5rem  / 40px   → Título de página, score IVEB em destaque
--font-size-xl:   2rem    / 32px   → H1 de seção
--font-size-lg:   1.5rem  / 24px   → H2 de seção
--font-size-md:   1.25rem / 20px   → H3, subtítulos de card
--font-size-base: 1rem    / 16px   → Corpo de texto padrão
--font-size-sm:   0.875rem/ 14px   → Labels, metadata, tooltips
--font-size-xs:   0.75rem / 12px   → Badges, legendas de gráficos, rodapés
```

### 3.3 Hierarquia de Uso

| Elemento | Fonte | Tamanho | Peso | Cor |
|---|---|---|---|---|
| Nome da marca "EduVita" | Playfair Display | 2xl | 700 | `primary-900` |
| Título de página (H1) | Playfair Display | xl | 700 | `neutral-900` |
| Título de seção (H2) | Source Sans 3 | lg | 600 | `neutral-900` |
| Título de card (H3) | Source Sans 3 | md | 600 | `neutral-700` |
| Corpo de texto | Source Sans 3 | base | 400 | `neutral-700` |
| Score IVEB | Playfair Display | 2xl | 900 | variável (escala IVEB) |
| Dados numéricos | Source Sans 3 | lg | 600 tabular | `neutral-900` |
| Labels e metadata | Source Sans 3 | sm | 400 | `neutral-500` |
| Badges e chips | Source Sans 3 | xs | 600 uppercase | variável |

### 3.4 Line-height e Letter-spacing

```
Títulos (Playfair): line-height: 1.2 / letter-spacing: -0.01em
Corpo (Source Sans): line-height: 1.6 / letter-spacing: 0
Labels uppercase: letter-spacing: 0.08em
Dados numéricos: font-variant-numeric: tabular-nums
```

---

## 4. Espaçamento e Grid

### 4.1 Escala de Espaçamento (Base 4px)

```
--space-1:   4px    → Separação mínima, ícone + label
--space-2:   8px    → Padding interno de badges
--space-3:   12px   → Gap entre elementos de formulário
--space-4:   16px   → Padding de cards compactos
--space-5:   20px   → Gap padrão entre componentes
--space-6:   24px   → Padding de cards padrão
--space-8:   32px   → Separação entre seções internas
--space-10:  40px   → Margem de seções de página
--space-12:  48px   → Padding de seções maiores
--space-16:  64px   → Separação entre blocos de conteúdo
--space-20:  80px   → Hero sections e destaque máximo
```

### 4.2 Grid do Sistema

```
Desktop (≥1280px):   12 colunas | gutter 24px | margin 48px
Tablet  (768–1279px): 8 colunas | gutter 20px | margin 32px
Mobile  (≤767px):     4 colunas | gutter 16px | margin 16px
```

**Breakpoints:**
```
--breakpoint-sm:  640px
--breakpoint-md:  768px
--breakpoint-lg:  1024px
--breakpoint-xl:  1280px
--breakpoint-2xl: 1536px
```

### 4.3 Layout de Dashboards

```
Sidebar fixa:     280px (desktop) | drawer (mobile)
Header fixo:      64px
Área de conteúdo: calc(100vw - 280px) com max-width: 1440px
Cards de KPI:     Grid de 4 colunas (desktop) / 2 (tablet) / 1 (mobile)
```

### 4.4 Border Radius

```
--radius-sm:   4px    → Badges, chips, tooltips
--radius-md:   8px    → Botões, inputs, cards compactos
--radius-lg:   12px   → Cards padrão, modals
--radius-xl:   16px   → Cards de destaque, hero sections
--radius-full: 9999px → Pills, avatares
```

---

## 5. Iconografia e Semântica Visual

### 5.1 Biblioteca de Ícones

Usar **Lucide Icons** (open source, consistente, MIT license).
Para mapas e geolocalização, complementar com ícones customizados SVG.

### 5.2 Ícones Semânticos por Dimensão do IVEB

Cada dimensão do índice possui ícone, cor e emoji de referência:

| Dimensão | Peso IVEB | Ícone Lucide | Cor |
|---|---|---|---|
| Segurança Alimentar | 30% | `utensils` | `#E67E22` |
| Saneamento e Higiene | 30% | `droplets` | `#2980B9` |
| Saúde Mental e Inclusão | 25% | `heart-handshake` | `#8E44AD` |
| Ambientes Saudáveis | 15% | `leaf` | `#27AE60` |

### 5.3 Indicadores de Status (Ícones + Cores)

```
✅ Conformidade total     → ícone: check-circle    | cor: secondary-500
⚠️  Atenção necessária   → ícone: alert-triangle   | cor: warning-500
❌ Não conformidade      → ícone: x-circle         | cor: critical-500
⏸ Sem dados disponíveis → ícone: help-circle      | cor: neutral-500
📈 Melhoria registrada   → ícone: trending-up      | cor: secondary-500
📉 Piora registrada      → ícone: trending-down    | cor: critical-500
```

### 5.4 Tamanhos de Ícones

```
--icon-xs: 12px   → Ícones inline em texto
--icon-sm: 16px   → Ícones em labels e badges
--icon-md: 20px   → Ícones em botões e itens de lista
--icon-lg: 24px   → Ícones em cards e navegação
--icon-xl: 32px   → Ícones em seções de destaque
--icon-2xl: 48px  → Ícones hero / ilustrações funcionais
```

---

## 6. Componentes de UI

### 6.1 Botões

**Hierarquia de botões:**

```
Primary (Ação principal)
  background: primary-700
  color: white
  hover: primary-900
  → "Exportar Relatório", "Ver Dashboard", "Aplicar Filtros"

Secondary (Ação secundária)
  background: transparent
  border: 2px solid primary-700
  color: primary-700
  hover: primary-050
  → "Comparar Municípios", "Ver Detalhes"

Ghost (Ação terciária)
  background: transparent
  color: primary-700
  hover: primary-050
  → "Saiba mais", navegação contextual

Destructive (Ação crítica)
  background: critical-500
  color: white
  → Apenas para ações irreversíveis; raramente usada

Disabled
  opacity: 0.4
  cursor: not-allowed
```

**Tamanhos:**
```
sm:   height 32px | padding 8px 16px  | font-size sm
md:   height 40px | padding 10px 20px | font-size base  ← padrão
lg:   height 48px | padding 12px 24px | font-size md
```

**Regras de uso:**
- Máximo 1 botão Primary por área de contexto
- Botões sempre com ícone à esquerda quando indicam ação (ex: `download` + "Exportar PDF")
- Loading state: substituir ícone por spinner; manter texto e width

### 6.2 Cards

**Card de KPI (Métricas Resumidas)**
```
Estrutura:
┌─────────────────────────────┐
│ [Ícone 24px]  Label          │
│                              │
│  [Valor principal 2xl]       │
│  [Variação ↑↓ % vs. ano ant] │
│                              │
│  [Contexto / subtexto sm]    │
└─────────────────────────────┘

Altura: 140px (desktop) / auto (mobile)
Largura: 1/4 do grid (desktop) / 1/2 (tablet) / full (mobile)
Border: none; shadow: 0 1px 3px rgba(0,0,0,0.08)
Background: white com border-left 4px na cor semântica
```

**Card de Escola (Perfil Resumido)**
```
Estrutura:
┌─────────────────────────────────────┐
│ Nome da Escola               [IVEB] │
│ Município · Rede · Etapa            │
├─────────────────────────────────────┤
│ 🍽️ Alimentação  💧 Saneamento       │
│ 🧠 Saúde Mental 🌿 Ambiente         │
├─────────────────────────────────────┤
│ [Ver Perfil Completo →]             │
└─────────────────────────────────────┘
```

**Card de Alerta (Conformidade Legal)**
```
Estrutura:
┌─────────────────────────────────────┐
│ ⚠️ Alerta de Conformidade           │
│ Lei 13.935/2019 — Psicólogos        │
├─────────────────────────────────────┤
│ 342 escolas em Pernambuco sem        │
│ profissional de psicologia           │
│                                     │
│ [Ver Escolas Afetadas] [Exportar]   │
└─────────────────────────────────────┘
Border-left: 4px critical-500
```

### 6.3 Tabelas de Dados

```
Regras:
- Cabeçalhos em uppercase / letter-spacing / font-size xs / cor neutral-500
- Linhas alternadas: white / neutral-100 (zebra striping)
- Dados numéricos: alinhados à direita / font-variant tabular-nums
- Textos: alinhados à esquerda
- Cells com status: badge colorido alinhado ao centro
- Hover em linha: highlight primary-050
- Máximo 8 colunas (desktop); priorizar as mais críticas em mobile

Sticky header quando tabela exceder viewport vertical
Paginação: increments de 25/50/100 itens
```

### 6.4 Badges e Chips

```
Badge de Status:
  Tamanho: xs / uppercase / padding 2px 8px / radius-sm
  Variantes: critical | warning | success | neutral | info

Chip de Filtro (selecionável):
  Tamanho: sm / padding 6px 12px / radius-full
  Estado ativo: primary-700 background / white text
  Estado inativo: neutral-100 background / neutral-700 text
  → "Pernambuco" | "Escola Rural" | "Sem Água" | "Lei 13.935"

Badge IVEB (Score):
  Círculo 48px / Playfair Display bold / cor da escala IVEB
  Usado em cards de escola como elemento de destaque
```

### 6.5 Formulários e Filtros

```
Input padrão:
  height: 40px
  border: 1px solid neutral-300
  border-radius: radius-md
  padding: space-3 space-4
  focus: border primary-500 / box-shadow 0 0 0 3px primary-100

Select / Dropdown:
  Mesmo estilo do input
  Ícone chevron-down alinhado à direita
  Lista com max-height: 300px + scroll

Range Slider (IVEB):
  Track: neutral-300 / Fill: escala dinâmica
  Thumb: primary-700 / size 20px

Busca de Escola/Município:
  Sempre com ícone search à esquerda
  Sugestões autocomplete max 8 itens
  Highlight do texto buscado nas sugestões
```

### 6.6 Navegação

**Sidebar (Desktop)**
```
Largura: 280px fixo
Logo EduVita: topo, padding 24px
Itens de menu: ícone + label / altura 44px / radius-md
Grupo de itens: com label de categoria em uppercase xs
Item ativo: background primary-050 / border-left 3px primary-700 / cor primary-700
Item hover: background neutral-100

Itens sugeridos:
  Dashboard Nacional
  Mapa de Vulnerabilidade
  Rankings Municipais
  Conformidade Legal
  Perfil de Escola
  Comparativo Intermunicipal
  Exportações / Relatórios
  [divider]
  Documentação IVEB
  Configurações
```

**Header (Desktop)**
```
Altura: 64px
Conteúdo: [breadcrumb esquerda] [search global centro] [notificações + avatar direita]
Background: white / border-bottom: 1px neutral-300
```

**Navegação Mobile**
```
Bottom navigation bar: 5 ícones principais
Drawer lateral para menu completo (swipe ou hamburger)
```

### 6.7 Modals e Drawers

```
Modal:
  max-width: 560px (padrão) / 800px (tabelas) / 1100px (mapas)
  Overlay: black 40% opacity
  Header: título H3 + botão fechar / border-bottom
  Footer: botões de ação / border-top
  Body: scroll interno se conteúdo exceder 60vh

Drawer:
  Direção: direita (perfil de escola, detalhes)
  Largura: 480px (desktop) / 100% (mobile)
  → Ideal para perfil completo de escola sem sair do contexto do mapa
```

---

## 7. Padrões de Visualização de Dados

### 7.1 Princípios

1. **Contexto antes de números**: sempre mostrar "do quê" e "comparado a quê"
2. **Hierarquia clara**: o dado mais importante deve dominar visualmente
3. **Cores com significado**: nunca usar cor apenas como decoração
4. **Performance primeiro**: preferir Canvas (ECharts) a SVG para datasets grandes
5. **Estado vazio sempre tratado**: skeleton, zero-state e erro têm design próprio

### 7.2 Tipos de Gráfico por Caso de Uso

| Pergunta | Gráfico | Lib |
|---|---|---|
| Como está este município agora? | KPI cards + gauge IVEB | ECharts |
| Qual a distribuição por faixa IVEB? | Histograma / bar chart | ECharts |
| Como evoluiu ao longo dos anos? | Line chart temporal | ECharts |
| Quais escolas são piores? | Bar chart horizontal ranqueado | ECharts |
| Onde estão concentrados os problemas? | Heatmap geográfico | Mapbox + PostGIS |
| Como se comparam duas dimensões? | Scatter plot | ECharts |
| Qual a composição do IVEB? | Donut chart 4 segmentos | ECharts |
| Comparativo entre municípios | Grouped bar chart | ECharts |

### 7.3 Mapa de Vulnerabilidade

```
Base: Mapbox GL JS (tiles vetoriais)
Estilo base: claro e neutro (não usar satellite por padrão)
Camadas:
  1. Polígonos municipais com fill-color por IVEB médio (escala 5 cores)
  2. Marcadores de escola (cluster em zoom baixo / individual em zoom alto)
  3. Heatmap de densidade de vulnerabilidade crítica
  4. Polígonos de privação (territórios com IVEB < 20)

Controles:
  Seletor de camada (canto superior direito)
  Legenda sempre visível (canto inferior esquerdo)
  Tooltip ao hover em escola: nome + IVEB + 4 indicadores
  Click em escola: abre Drawer com perfil completo

Cores dos marcadores de escola:
  IVEB > 80: #1E8449 (verde)
  IVEB 60–80: #58D68D
  IVEB 40–60: #F1C40F
  IVEB 20–40: #E67E22
  IVEB < 20:  #C0392B
  Sem dados:  #7F8C8D (cinza)
```

### 7.4 Gráficos — Padrões Visuais

```
Cores de gráficos (sequência padrão):
  1. #2E6FAD (primary-500)
  2. #27AE60 (secondary-500)
  3. #E67E22 (warning)
  4. #8E44AD (roxo)
  5. #17A589 (teal)
  → Nunca usar vermelho como primeira cor (reservado para crítico)

Grid lines: neutral-100 / dashed / 1px
Axis labels: Source Sans 3 / xs / neutral-500
Tooltips: white card / shadow / radius-md / dados formatados
Legend: abaixo do gráfico em mobile / direita em desktop
Animation: 600ms ease-out na entrada inicial
```

### 7.5 Estados Especiais

**Skeleton Loading:**
```
Usar shimmer animation (gradient esquerda→direita)
Preservar exatamente o layout que será carregado
Duração máxima do skeleton visível: 3 segundos
```

**Zero State (sem dados):**
```
Ícone ilustrativo (não genérico)
Título explicativo do porquê não há dados
Ação sugerida (ex: "Selecionar outro município" ou "Dados disponíveis a partir de 2020")
```

**Erro de carregamento:**
```
Ícone alert-circle / cor critical
Mensagem: o que falhou + o que o usuário pode fazer
Botão "Tentar novamente"
```

---

## 8. Tokens de Design

### 8.1 Sombras

```css
--shadow-sm:  0 1px 2px rgba(0,0,0,0.05);
--shadow-md:  0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04);
--shadow-lg:  0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04);
--shadow-xl:  0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04);
--shadow-modal: 0 20px 25px rgba(0,0,0,0.12), 0 10px 10px rgba(0,0,0,0.05);
```

### 8.2 Transições

```css
--transition-fast:   150ms ease
--transition-base:   250ms ease
--transition-slow:   400ms ease
--transition-map:    600ms ease-out
```

### 8.3 Z-Index

```
--z-base:      0    → Conteúdo normal
--z-sticky:    100  → Header, sticky elements
--z-sidebar:   200  → Sidebar
--z-tooltip:   500  → Tooltips de gráficos
--z-drawer:    700  → Drawers laterais
--z-modal:     800  → Modals
--z-overlay:   750  → Overlay de modal
--z-toast:     900  → Notificações toast
```

### 8.4 Tokens de Acessibilidade

```
Focus ring: 3px solid primary-300 com offset 2px
Contrast ratio mínimo: 4.5:1 (texto normal) / 3:1 (texto grande)
Touch target mínimo: 44x44px (mobile)
```

---

## 9. Acessibilidade

### 9.1 Conformidade

A EduVita segue **WCAG 2.1 nível AA** como requisito mínimo.
Justificativa: personas incluem usuários com baixo letramento digital, acesso em dispositivos de baixo desempenho e conexões instáveis.

### 9.2 Checklist de Componentes

- [ ] Todo elemento interativo acessível via teclado (Tab, Enter, Escape, Arrow keys)
- [ ] Imagens e ícones com `alt` descritivo ou `aria-hidden` se decorativos
- [ ] Gráficos com tabela de dados alternativa acessível via `aria-describedby`
- [ ] Cores de status nunca como único meio de comunicação (sempre acompanhadas de ícone e texto)
- [ ] Formulários com `label` explícito associado a cada campo
- [ ] Mensagens de erro vinculadas ao campo com `aria-describedby`
- [ ] Títulos de página (`<h1>`) únicos por view
- [ ] Hierarquia de headings sem pulos (H1 → H2 → H3)
- [ ] Focus visible em todos os estados (não usar `outline: none` sem substituição)
- [ ] Contraste texto/fundo: mínimo 4.5:1 (verificar com ferramenta antes de aprovação)

### 9.3 Performance e Acesso em Condições Adversas

```
Imagens: WebP com fallback JPEG; lazy loading fora do viewport
Fontes: preload das 2 fontes principais; font-display: swap
Scripts: code splitting por rota; lazy load de gráficos
Offline: cache de dados de municípios recentes via Service Worker
Timeout: indicar degradação após 5s de loading; oferecer modo texto
```

### 9.4 Mobile-First

Toda interface projetada primeiro para 375px de largura.
Persona de diretor escolar acessa via celular em redes instáveis — prioridade máxima.

```
Toques: mínimo 44x44px para qualquer alvo interativo
Scroll: evitar scroll horizontal em qualquer breakpoint
Dados densos: cards colapsáveis / "ver mais" para preservar legibilidade
Mapas: controles simplificados; gestos nativos de pinch/zoom
```

---

## 10. Tom de Voz e Linguagem

### 10.1 Princípios de Linguagem

| Situação | Tom |
|---|---|
| Dados críticos / alertas | Direto, sem eufemismos. "342 escolas sem psicólogo." |
| Onboarding / tutoriais | Acolhedor, sem jargão técnico |
| Erros de sistema | Empático + acionável. Nunca "erro desconhecido". |
| Rankings e comparativos | Neutro e contextualizado. Sem linguagem punitiva. |
| Comunicados institucionais | Formal, claro, sem juridiquês |

### 10.2 Glossário de Interface

Usar sempre os termos padronizados abaixo para consistência:

| ✅ Termo EduVita | ❌ Evitar |
|---|---|
| Escola | Unidade escolar (muito formal) |
| IVEB (sigla explicada no primeiro uso) | "Índice" sem especificação |
| Saneamento | "Infraestrutura básica" (vago) |
| Municípios | "Entidades" |
| Secretaria de Educação | "Gestor" (pode ser ambíguo) |
| Dados do Censo Escolar | "Dados coletados" |
| Exportar relatório | "Baixar" ou "Gerar" |
| Alerta de conformidade | "Notificação" |
| Score IVEB | "Nota" ou "Pontuação" |

### 10.3 Numeração e Formatação de Dados

```
Números grandes:     1.234.567 (ponto como separador de milhar — padrão pt-BR)
Decimais:            85,4% (vírgula decimal — padrão pt-BR)
Datas:               12/05/2026 ou "Maio de 2026" (por extenso em relatórios)
Score IVEB:          "IVEB: 67,3" (sempre uma casa decimal)
Percentuais:         "15,7%" (com espaço entre número e símbolo em textos corridos)
Variação:            "↑ 3,2 pontos" / "↓ 1,8 pontos" vs. ano anterior
```

### 10.4 Mensagens de Estado

```
Loading:   "Carregando dados de [Município]..."
Sem dados: "Não há dados disponíveis para [Escola/Município] neste período."
Erro:      "Não foi possível carregar os dados. Verifique sua conexão e tente novamente."
Sucesso:   "Relatório exportado com sucesso." (toast, 3s)
Alerta:    "Atenção: [X] escolas em [Município] estão em situação crítica de [dimensão]."
```

---

## 11. Guia de Uso da Marca

### 11.1 Logotipo

```
Estrutura: wordmark "EduVita" em Playfair Display Bold
  Edu: --color-primary-700 (azul)
  Vita: --color-secondary-500 (verde)
  Sem ícone separado — a identidade é tipográfica

Variantes:
  Principal: Edu[azul]Vita[verde] sobre fundo branco
  Invertida: branco sobre fundo primary-900 (uso em headers escuros)
  Monocromática: primary-900 (impressão, documentos PDF)
  Favicon/App icon: "EV" monograma em fundo primary-700

Espaço de proteção: equivalente à altura da letra "E" em todos os lados
Tamanho mínimo: 120px de largura em digital / 30mm em impresso
```

### 11.2 O Que Nunca Fazer

❌ Não distorcer proporções do wordmark
❌ Não aplicar sombras ou gradientes sobre o logotipo
❌ Não usar sobre backgrounds com baixo contraste
❌ Não separar "Edu" de "Vita" em elementos diferentes
❌ Não recolorizar em cores fora da paleta oficial
❌ Não usar em tamanhos menores que o mínimo especificado

### 11.3 Assinaturas Institucionais

```
Documentos formais:   "EduVita — Plataforma Inteligente de Bem-Estar Escolar"
Rodapés de relatório: "© 2026 EduVita | Todos os dados: Censo Escolar / INEP"
Email e assinaturas:  "EduVita | eduvita.com.br"
Citação em pesquisas: "EduVita (2026). Índice de Vulnerabilidade Escolar e Bem-Estar (IVEB)."
```

### 11.4 Aplicações de Marca por Persona

| Persona | Contexto de Contato | Prioridade de Design |
|---|---|---|
| Gestor Público | Dashboard executivo, relatórios PDF | Dados consolidados, exportação rápida, identidade formal |
| Diretor Escolar | Perfil de escola, mobile | Carregamento rápido, simplicidade, ação imediata |
| Pesquisador | Documentação de API, explorador de dados | Densidade de informação, precisão metodológica |
| Família / Cidadão | Mapa público, perfil de escola simplificado | Intuitividade, linguagem acessível, mobile-first |

---

## Controle do Documento

| Campo | Valor |
|---|---|
| Versão | 1.0 |
| Data de Criação | Maio de 2026 |
| Baseado em | EduVita — Documento Institucional Oficial v1.0 |
| Responsável | Equipe EduVita — Design e Produto |
| Classificação | CONFIDENCIAL – Uso Interno Exclusivo |
| Próxima Revisão | Setembro de 2026 (pós-validação com personas reais) |

---

*EduVita — Plataforma Inteligente de Bem-Estar Escolar*
*CONFIDENCIAL – Uso Interno Exclusivo | Design System v1.0 | Maio de 2026*