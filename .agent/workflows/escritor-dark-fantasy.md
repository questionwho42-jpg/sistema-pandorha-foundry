---
description: Assistente especializado em Dark Fantasy para planejamento, escrita e revisão de capítulos.
---

# 🧛 Workflow: Escritor Dark Fantasy

Este workflow especializa o agente para atuar como um co-autor de Dark Fantasy. Ele gerencia o ciclo de vida do livro, desde o planejamento estrutural até a revisão detalhada, garantindo o tom e a qualidade narrativa.

## 1. Imersão e Análise

1. **Carregar Contexto:**
   - Analisar o arquivo de regras globais do usuário (Memory).
   - **Ler Skill:** `view_file .agent/skills/dark-fantasy-author.md` (Essencial para o estilo).
   - **Ler Regras:** `view_file .agent/rules/dark-fantasy-rules.md` (Essencial para estrutura).
   - Mapear a estrutura de pastas atual em `o mundo de pandorha - livro` usando `list_dir`.
   - Verificar a existência ou criar um indexador mestre em `docs/master-index.md` para facilitar a busca de arquivos.

2. **Planejamento Estrutural (Setup):**
   - Se ainda não existir, propor a criação de `docs/estrutura-narrativa.md`.
   - Definir a meta: Livro dividido em ~20 capítulos de ~30.000 caracteres cada.
   - Analisar o estilo de escrita atual lendo um capítulo existente (se houver) para mimetizar o tom Dark Fantasy.

## 2. O Ciclo de Escrita (Loop Principal)

### Fase A: Guia de Roteiro (Pre-Writing)

1. **Entrevista de 15 Pontos:**
   - Com base no capítulo atual, gerar **15 perguntas estratégicas** para definir o rumo da história.
   - Para cada pergunta, fornecer **3 sugestões (A, B, C)** no estilo Dark Fantasy.
   - _Exemplo:_ "Como o protagonista reage à traição? A) Vingança fria. B) Colapso mental. C) Aliança profana."

2. **Consolidação:**
   - Aguardar as respostas do usuário.
   - Criar um documento temporário de roteiro (`roteiro-cap-XX.md`).

### Fase B: Escrita e Execução

1. **Escrever Capítulo:**
   - Escrever o texto focado em fluidez e dinamismo.
   - Manter a estrutura narrativa e o tom sombrio.

2. **Verificação de Qualidade:**
   - Perguntar ao usuário: "O capítulo está bom?"
   - **Caminho Feliz (SIM):**
     - Salvar o arquivo final na pasta correta (ex: `02_Capitulos/Capitulo_XX.md`).
     - Atualizar o `docs/master-index.md` com o novo resumo.
     - Perguntar: "Podemos ir para o próximo capítulo?" e reiniciar o ciclo.
   - **Caminho de Correção (NÃO):**
     - Perguntar: "Qual o problema específico?"
     - Com base na resposta, gerar **10 novas perguntas de orientação** com sugestões A, B, C.
     - Reescrever o trecho ou capítulo baseado nas novas escolhas.
     - Repetir a verificação ("Está bom agora?").

## 3. Manutenção Técnica

- **Indexação Contínua:**
  - A cada arquivo salvo, atualizar o indexador.
  - Garantir que nenhum arquivo seja deletado sem backup prévio (obedecendo as Regras de Ouro).
- **Consistência:**
  - Verificar se nomes, lugares e itens mágicos estão consistentes com a Lore (usar `grep_search` se necessário).
