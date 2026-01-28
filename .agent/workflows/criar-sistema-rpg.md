---
description: Wizard interativo para criação completa de sistemas de RPG com 30 perguntas guiadas em formato ABC.
---

# 🎲 Criador de Sistemas de RPG

Este workflow guia você na criação completa de um **sistema de RPG** (mecânicas, dados, classes, combate) através de um questionário interativo de 30 perguntas com sugestões em formato ABC.

> **Nota:** Este workflow cria _sistemas de jogo_ (como D&D, FATE, PbtA). Para criar _cenários/aventuras_, use `/criar-cenario-rpg`.

---

## Fase 1: Carregar Matriz Mental

1. **Ler Skill (As 30 Perguntas):**

   ```
   view_file .agent/skills/system-designer.md
   ```

2. **Ler Regras (Consistência):**
   ```
   view_file .agent/rules/rpg-system-rules.md
   ```

---

## Fase 2: Definir Identidade do Sistema

3. Pergunte ao usuário:
   - "Qual o **nome provisório** do seu sistema?" (ex: Runas de Ferro, Crônicas do Abismo)
   - "Qual o **gênero principal**?" (Fantasia, Sci-Fi, Horror, Universal)
   - "Qual a **complexidade desejada**?" (Leve/Beer & Pretzels, Médio, Crunch Pesado)
   - "Existe algum **sistema de inspiração**?" (D&D, FATE, PbtA, Nenhum)

4. Crie uma pasta para o sistema em `Sistemas/[NomeDoSistema]/`

---

## Fase 3: O Questionário das 30 Perguntas

5. **Execute o questionário completo** seguindo a skill `system-designer.md`:

   ### 🎯 PILAR 1: Identidade (Perguntas 1-5)
   - Faça as perguntas 1 a 5 da skill
   - Apresente sempre as 3 opções (A, B, C)
   - Se o usuário escolher "D - Própria ideia", aceite e refine
   - **Aguarde resposta antes de prosseguir**

   ### 🎲 PILAR 2: Sistema de Resolução (Perguntas 6-10)
   - Faça as perguntas 6 a 10 da skill
   - Conecte sugestões com as escolhas de tom/público do Pilar 1
   - **Aguarde resposta antes de prosseguir**

   ### 👤 PILAR 3: Criação de Personagens (Perguntas 11-16)
   - Faça as perguntas 11 a 16 da skill
   - Relembre ao usuário suas escolhas de dados para manter coerência
   - **Aguarde resposta antes de prosseguir**

   ### ⚔️ PILAR 4: Conflito e Combate (Perguntas 17-22)
   - Faça as perguntas 17 a 22 da skill
   - Valide contra as regras de economia de ações
   - **Aguarde resposta antes de prosseguir**

   ### 📈 PILAR 5: Progressão (Perguntas 23-27)
   - Faça as perguntas 23 a 27 da skill
   - Conecte com as escolhas de duração de campanha
   - **Aguarde resposta antes de prosseguir**

   ### 📖 PILAR 6: Meta-Design (Perguntas 28-30)
   - Faça as perguntas 28 a 30 da skill
   - Estas definem formato, materiais e expansibilidade
   - **Aguarde resposta antes de prosseguir**

---

## Fase 4: Compilação do Sistema

6. **Gere o documento SRD (System Reference Document)** com a seguinte estrutura:

   ```markdown
   # [Nome do Sistema] - SRD

   ## Visão Geral

   [Resumo de 3 parágrafos: tema, proposta, diferencial]

   ## Mecânica Core

   - Dado Principal: [Escolha P6]
   - Resolução: [Escolha P7]
   - Vantagem/Desvantagem: [Escolha P9]
   - Oposição: [Escolha P10]

   ## Criação de Personagem

   - Atributos: [Escolha P11]
   - Classes/Arquétipos: [Escolha P12]
   - Raças/Ancestralidades: [Escolha P13]
   - Tempo de Criação: [Escolha P14]
   - Perícias: [Escolha P15]
   - Personalidade: [Escolha P16]

   ## Combate

   - Ritmo: [Escolha P17]
   - Iniciativa: [Escolha P18]
   - Vitalidade: [Escolha P19]
   - Dano: [Escolha P20]
   - Condições: [Escolha P21]
   - Morte: [Escolha P22]

   ## Progressão

   - Experiência: [Escolha P23]
   - Níveis/Tiers: [Escolha P24]
   - Ganhos por Nível: [Escolha P25]
   - Talentos: [Escolha P26]
   - Equipamento: [Escolha P27]

   ## Meta-Jogo

   - Papel do Mestre: [Escolha P28]
   - Materiais: [Escolha P29]
   - Expansibilidade: [Escolha P30]

   ## Quick Start (1 página)

   [Resumo ultra-simplificado para primeira sessão]

   ## Exemplo de Jogo

   [Cena de combate narrada com mecânicas aplicadas]
   ```

7. Salve o documento em `Sistemas/[NomeDoSistema]/SRD.md`

---

## Fase 5: Documentos Complementares

8. **Gere documentos adicionais** conforme escolhas do usuário:

   | Se escolheu...                | Gere também...                          |
   | ----------------------------- | --------------------------------------- |
   | Classes definidas (P12-A)     | `classes.md` - Descrição de cada classe |
   | Raças (P13-A)                 | `racas.md` - Descrição de cada raça     |
   | Lista de Perícias (P15-A)     | `pericias.md` - Lista completa          |
   | Lista de Talentos (P26-A)     | `talentos.md` - Todas as opções         |
   | Equipamento detalhado (P27-A) | `equipamento.md` - Tabelas de itens     |

9. Crie arquivo `ficha_personagem.md` com campos baseados nas escolhas

---

## Fase 6: Validação e Playtest

10. **Verifique contra as regras** (`rpg-system-rules.md`):
    - O dado principal serve ao tom? (Regra 1)
    - Turnos são resolvíveis em < 2 min? (Regra 2)
    - Existe Quick Start? (Regra 3)
    - Loop de jogo está explícito? (Regra 4)
    - Subir de nível dá opções novas? (Regra 5)

11. **Crie cenário de playtest**:
    - 3 personagens pré-gerados representando builds diferentes
    - 1 encontro de combate balanceado
    - 1 cena social com mecânicas
    - 1 desafio de exploração/puzzle

12. **Apresente o resumo** ao usuário e pergunte:
    - "Deseja refinar algum dos 6 pilares?"
    - "Precisa de mais detalhes em alguma mecânica?"
    - "Quer que eu gere os documentos complementares?"
    - "O sistema está pronto para playtest?"

---

## Fase 7: Refinamento Iterativo

13. Se o usuário identificar problemas:
    - Reavalie as escolhas conflitantes
    - Sugira alterações com justificativa de game design
    - Atualize os documentos gerados

14. Quando aprovado, gere:
    - `changelog.md` - Histórico de versões
    - `playtest_notes.md` - Template para registrar sessões de teste
    - `resumo_rapido.md` - Cheat sheet de 1 página para a mesa

---

## 📋 Checklist de Entregáveis

Ao final do workflow, a pasta `Sistemas/[NomeDoSistema]/` deve conter:

| Arquivo               | Obrigatório | Conteúdo                   |
| --------------------- | ----------- | -------------------------- |
| `SRD.md`              | ✅          | Documento core do sistema  |
| `resumo_rapido.md`    | ✅          | Quick reference 1 página   |
| `ficha_personagem.md` | ✅          | Template de ficha          |
| `classes.md`          | Condicional | Se tiver classes           |
| `racas.md`            | Condicional | Se tiver raças             |
| `pericias.md`         | Condicional | Se tiver lista extensa     |
| `talentos.md`         | Condicional | Se tiver talentos          |
| `equipamento.md`      | Condicional | Se tiver listas detalhadas |
| `playtest_notes.md`   | ✅          | Template de feedback       |
| `changelog.md`        | ✅          | Versões e mudanças         |
