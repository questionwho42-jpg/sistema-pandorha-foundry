---
description: Wizard interativo para criação de cenários de RPG com 20 perguntas guiadas em formato ABC.
---

# 🎲 Criador de Cenários de RPG

Este workflow guia você na criação completa de um cenário de RPG jogável através de um questionário interativo de 20 perguntas com sugestões em formato ABC.

---

## Fase 1: Carregar Matriz Mental

1. **Ler Skill (As 20 Perguntas):**

   ```
   view_file .agent/skills/scenario-builder.md
   ```

2. **Ler Regras (Consistência):**
   ```
   view_file .agent/rules/rpg-scenario-rules.md
   ```

---

## Fase 2: Definir Contexto Inicial

3. Pergunte ao usuário:
   - "Qual o **nome provisório** do seu cenário?" (ex: O Deserto de Cristal, A Fortaleza Caída)
   - "Este cenário é para que **sistema de RPG**?" (ex: D&D 5e, Pathfinder 2e, Genérico)
   - "Qual a **duração estimada**?" (One-shot, Mini-campanha 3-5 sessões, Campanha longa)

4. Crie uma pasta para o cenário em `Cenarios/[NomeDoCenario]/`

---

## Fase 3: O Questionário das 20 Perguntas

5. **Execute o questionário completo** seguindo a skill `scenario-builder.md`:

   ### 🌍 PILAR 1: Ambiente (Perguntas 1-4)
   - Faça as perguntas 1 a 4 da skill
   - Apresente sempre as 3 opções (A, B, C)
   - Se o usuário escolher "D - Própria ideia", aceite e refine
   - **Aguarde resposta antes de prosseguir**

   ### ⚔️ PILAR 2: Conflito (Perguntas 5-8)
   - Faça as perguntas 5 a 8 da skill
   - Conecte sugestões com as escolhas anteriores do Pilar 1
   - **Aguarde resposta antes de prosseguir**

   ### 👥 PILAR 3: Sociedade (Perguntas 9-12)
   - Faça as perguntas 9 a 12 da skill
   - Relembre ao usuário suas escolhas anteriores para manter coerência
   - **Aguarde resposta antes de prosseguir**

   ### ✨ PILAR 4: Fantasia (Perguntas 13-16)
   - Faça as perguntas 13 a 16 da skill
   - Valide contra as regras de consistência mágica
   - **Aguarde resposta antes de prosseguir**

   ### 🎭 PILAR 5: Narrativa (Perguntas 17-20)
   - Faça as perguntas 17 a 20 da skill
   - Estas perguntas definem o tom e os ganchos de aventura
   - **Aguarde resposta antes de prosseguir**

---

## Fase 4: Compilação do Cenário

6. **Gere o documento de cenário** com a seguinte estrutura:

   ```markdown
   # [Nome do Cenário]

   ## Visão Geral

   [Resumo de 3 parágrafos]

   ## Ambiente

   - Escala: [Escolha P1]
   - Geografia: [Escolha P2]
   - Clima/Atmosfera: [Escolha P3]
   - Elemento Icônico: [Escolha P4]

   ## Conflito Central

   - Ameaça Principal: [Escolha P5]
   - Urgência: [Escolha P6]
   - Facções: [Escolha P7]
   - Reviravolta: [Escolha P8]

   ## Sociedade

   - Estrutura de Poder: [Escolha P9]
   - Economia Base: [Escolha P10]
   - Tensão Social: [Escolha P11]
   - Figura de Autoridade: [Escolha P12]

   ## Elementos Fantásticos

   - Nível de Magia: [Escolha P13]
   - Criaturas Notáveis: [Escolha P14]
   - Artefato/Local Mágico: [Escolha P15]
   - Custo da Magia: [Escolha P16]

   ## Narrativa

   - Tom Predominante: [Escolha P17]
   - Tema Central: [Escolha P18]
   - Gancho Inicial: [Escolha P19]
   - Clímax Potencial: [Escolha P20]

   ## Ganchos de Aventura (3)

   1. [Gancho derivado das escolhas]
   2. [Gancho derivado das escolhas]
   3. [Gancho derivado das escolhas]

   ## NPCs Sugeridos (3)

   | Nome   | Função   | Conexão com Conflito |
   | ------ | -------- | -------------------- |
   | [NPC1] | [Função] | [Conexão]            |
   | [NPC2] | [Função] | [Conexão]            |
   | [NPC3] | [Função] | [Conexão]            |
   ```

7. Salve o documento em `Cenarios/[NomeDoCenario]/cenario.md`

---

## Fase 5: Validação e Refinamento

8. **Verifique contra as regras** (`rpg-scenario-rules.md`):
   - A Geografia suporta a economia escolhida?
   - O nível de magia é consistente com a tecnologia?
   - O conflito tem consequências tangíveis?
   - Os ganchos são jogáveis em mesa?

9. **Apresente o resumo** ao usuário e pergunte:
   - "Deseja refinar algum dos 5 pilares?"
   - "Deseja expandir algum elemento (NPCs, mapas, encontros)?"
   - "O cenário está pronto para uso?"

10. Se pronto, gere um arquivo `resumo_rapido.md` com bullet points para consulta rápida durante a sessão.
