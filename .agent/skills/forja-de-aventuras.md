---
description: Skill de desenvolvimento da Forja de Aventuras. Define regras de construção, padrões de código, ordem de entrega e critérios de qualidade.
---

# ⚒️ Skill: Construtor da Forja de Aventuras

Você é um Engenheiro Frontend Sênior construindo a **Forja de Aventuras**, uma interface web para gerar aventuras completas para o Sistema Pandorha. Siga rigorosamente as diretrizes abaixo.

---

## 1. Estratégia de Construção

### Ordem de Entrega (Vertical)

Construa uma feature completa de cada vez, na seguinte ordem:

1. **MVP** — Wizard (8 etapas) + Motor de Geração (Decorator) funcionando juntos
2. **Temas** — 8 temas visuais adaptativos com fontes e micro-animações
3. **Exportação** — PDF temático + Markdown + Ficha Resumo A4
4. **Biblioteca** — localStorage com favoritos, filtros e versionamento
5. **Bônus** — Sessão Zero, Modo Próxima Sessão, Tracker de Facções

### Regra de Ouro

A cada feature concluída: **teste manual no navegador** + **commit com data/hora**.

---

## 2. Padrões de Código

### Limite de Linhas

- Máximo **500 linhas** por arquivo (Constituição Master v23)
- Se ultrapassar, divida em sub-módulos com nomes descritivos

### Documentação

- **JSDoc** nas funções públicas (parâmetros + retorno)
- **Zero comentários** explicativos no corpo do código
- Documentação detalhada em arquivo separado (`docs_forja.md`)

### Nomenclatura (camelCase + Módulo)

```javascript
// ✅ Correto
wizard.avancarEtapa()
generator.aplicarDecorator()
export.gerarPDF()
library.salvarAventura()

// ❌ Incorreto
avancar()
gerar()
salvar()
```

### Gestão de Estado

- Arquivo centralizado `state.js` com `getState()` e `setState()`
- Nenhum módulo acessa dados globais diretamente, sempre via `state.js`

---

## 3. Padrões de Interface

### Responsividade (Mobile First)

| Breakpoint | Largura    | Alvo               |
| ---------- | ---------- | ------------------ |
| Mobile     | ≤480px     | Celular            |
| Tablet     | 481-1024px | Tablet / iPad      |
| Desktop    | >1024px    | Notebook / Monitor |

### Validação do Wizard

- **Tempo real:** borda verde (ok) / vermelha (falta) em cada campo
- **Bloqueio:** botão "Próximo" desabilitado até tudo preenchido

### Tratamento de Erros

- **Sempre:** feedback visual (toast/notificação elegante)
- **Sempre:** fallback com valor padrão para nunca travar
- **Nunca:** erro silencioso ou `alert()` nativo

### Acessibilidade (WCAG AA)

- Labels e aria-labels em todos os inputs
- Contraste mínimo 4.5:1
- Navegação completa por teclado (Tab/Enter/Esc)
- Foco visível em elementos interativos

---

## 4. Padrões Visuais

### Animações

| Tipo                      | Onde                                                  |
| ------------------------- | ----------------------------------------------------- |
| Fade-in/out               | Transição entre etapas do wizard                      |
| Slide                     | Cards de conteúdo gerado                              |
| Hover                     | Botões e cards (scale + sombra)                       |
| Micro-animações temáticas | Durante a geração (runas, folhas, brasas por cenário) |

### Fontes (Google Fonts por Tema)

| Cenário       | Título            | Corpo         |
| ------------- | ----------------- | ------------- |
| Morden        | Orbitron          | Rajdhani      |
| Almar         | Cinzel            | Lora          |
| Cinar         | Uncial Antiqua    | Nunito        |
| Floresta Ecos | MedievalSharp     | Quicksand     |
| Draskar       | Pirata One        | Barlow        |
| Dungard       | Cinzel Decorative | Source Sans 3 |
| Gorbax        | Bungee Shade      | Archivo       |
| Genérico      | Inter             | Inter         |

### Dependências Permitidas

- ✅ Google Fonts (CDN)
- ✅ Lucide Icons (CDN, ~5kb)
- ❌ Qualquer framework JS (React, Vue, etc.)
- ❌ Qualquer framework CSS (Tailwind, Bootstrap)
- ❌ npm / node_modules

---

## 5. Padrões de Geração (Motor Decorator)

### Aplicação de Decoradores

```javascript
// Efeito Cebola: cada decorador "embrulha" o anterior
let aventura = new AventuraBase(dadosWizard);
aventura = new CapituloDecorator(aventura);
aventura = new NpcDecorator(aventura);
aventura = new MonstroDecorator(aventura);
// ... demais decoradores conforme as escolhas do mestre
```

### Regra: Decoradores Opcionais

Os seguintes decoradores só são aplicados SE o mestre ativar no wizard:

- `RegraCasaDecorator` (toggle "Regras da Casa")
- `DowntimeDecorator` (toggle "Tempo Livre")

---

## 6. Padrões de Exportação

### PDF

- Via `window.print()` com `@media print` em `print.css`
- **Manter cores e estilo** do tema ativo (não preto/branco)
- Usar `color-adjust: exact` e `-webkit-print-color-adjust: exact`

### Markdown

- Gerar via `toMarkdown()` no motor
- Download como arquivo `.md` via `Blob` + `URL.createObjectURL()`
- Salvar em `Campanhas/aventura_[nome].md`

### Ficha Resumo (Cheat Sheet)

- 1 página A4 com 4 quadrantes via CSS Grid
- Layout otimizado para `@media print`

---

## 7. Padrões de Persistência (localStorage)

### Estrutura

```javascript
// Índice
localStorage.setItem(
  "forja_indice",
  JSON.stringify({
    versao: 1,
    aventuras: ["aventura_001", "aventura_002"],
    favoritas: ["aventura_001"],
  }),
);

// Aventura individual
localStorage.setItem(
  "aventura_001",
  JSON.stringify({
    versao: 1,
    id: "aventura_001",
    titulo: "O Rastro do Paciente Zero",
    cenario: "Morden",
    tier: 1,
    criadoEm: "2026-03-02T19:00:00",
    favorita: true,
    dados: {
      /* aventura completa */
    },
  }),
);
```

---

## 8. Modo Semi-Aleatório (Re-rolar)

### Interface

- Ícone 🎲 ao lado de cada seção re-rolável
- Ao clicar: mostra **3 alternativas** em cards
- Mestre clica na alternativa preferida
- Botão **"Desfazer"** para voltar ao resultado anterior

### Lógica

- Guardar resultado anterior num stack (`undoStack[]`)
- Re-rolar apenas a seção específica, sem afetar o resto

---

## 9. Git Flow

### Branch

```bash
git checkout -b feat/forja-de-aventuras
```

### Commits (a cada feature)

```bash
git add .
git commit -m "feat(forja): [nome-da-feature] - YYYY-MM-DD HH:MM"
```

### Backup

- Cópia física da pasta antes de iniciar: `o mundo de pandorha - livro-backup`

---

## 10. Critério de Pronto

A ferramenta está pronta quando:

- [ ] Gera aventura completa em cada duração (one-shot / mini / campanha)
- [ ] Cada cenário de Pandorha tem tema visual funcional
- [ ] Exporta PDF temático, Markdown e Ficha Resumo (1 página A4)
- [ ] Biblioteca salva, filtra e favorita aventuras
- [ ] Sessão Zero e Próxima Sessão funcionam
- [ ] Responsivo em Mobile (480px), Tablet (1024px) e Desktop
- [ ] Zero erros no console do navegador
- [ ] Vídeo de demonstração gravado
