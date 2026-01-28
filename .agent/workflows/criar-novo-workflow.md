---
description: Assistente interativo para criação de novos workflows. Use este fluxo para gerar novos arquivos .md de workflow.
---

# 🪄 Criador de Workflows (The Meta-Workflow)

Este workflow guia a criação de novos processos automatizados.

1.  **Carregar Inteligência e Leis**
    - Ler Skill: `view_file .agent/skills/arquiteto-workflow.md`
    - Ler Regras: `view_file .agent/rules/regras-workflow.md`

2.  **Entrevista de Arquitetura**
    - Atuando como o **Arquiteto de Workflows**, inicie uma interação com o usuário.
    - **NÃO** tente adivinhar. Pergunte:
      - Qual o nome do arquivo desejado? (ex: `deploy-staging.md`)
      - Qual o objetivo único?
      - Quais skills/regras ele precisa ler?
      - Quais os passos manuais vs automáticos?

3.  **Desenho e Validação**
    - Com base nas respostas, crie um rascunho do workflow.
    - Verifique se ele viola alguma regra de `regras-workflow.md` (ex: falta de Frontmatter, paths relativos errados).

4.  **Materialização**
    - Crie o arquivo na pasta `.agent/workflows/[nome-do-arquivo].md`.
    - Confirme ao usuário que o workflow está pronto para uso.
