---
description: Wizard interativo para criação de aventuras completas para o Sistema Pandorha com 20 perguntas guiadas e geração automática de arte.
---

# ⚔️ Workflow: Criar Aventura para o Sistema Pandorha

Gera uma aventura completa, jogável e ilustrada para o Sistema Pandorha através de 20 perguntas guiadas.

---

## Fase 1: Carregar Conhecimento

1. **Ler a Skill do Forjador:**

   ```
   view_file .agent/skills/forjador-aventuras-pandorha.md
   ```

2. **Ler as Regras de Validação:**

   ```
   view_file .agent/rules/regras-aventuras-pandorha.md
   ```

3. **Ler as Regras de Campanha:**

   ```
   view_file .agent/rules/regras-campanhas.md
   ```

4. **Ler o Guia do Mestre:**

   ```
   view_file Sistemas/Pandorha/sistema consolidado/08_Guia_do_Mestre.md
   ```

5. **Ler Mecânicas Fundamentais:**
   ```
   view_file Sistemas/Pandorha/sistema consolidado/00_Mecanicas_Fundamentais.md
   ```

---

## Fase 2: Entrevista das 20 Perguntas

6. **Execute o questionário completo** da skill `forjador-aventuras-pandorha.md`:

   ### ⚔️ PILAR 1: Base da Aventura (P1-P4)
   - Faça as perguntas 1 a 4
   - Apresente sempre 3 opções (A, B, C) + opção D
   - **Sugira a melhor opção** e explique por quê
   - **Aguarde resposta antes de prosseguir**

   ### 🌍 PILAR 2: Mundo e Atmosfera (P5-P8)
   - Faça as perguntas 5 a 8
   - **Adapte sugestões** com base nas respostas do Pilar 1
   - **Aguarde resposta antes de prosseguir**

   ### ⚔️ PILAR 3: Conflito e Ameaça (P9-P12)
   - Faça as perguntas 9 a 12
   - Conecte com cenário e atmosfera escolhidos
   - **Aguarde resposta antes de prosseguir**

   ### 👥 PILAR 4: Personagens e Sociedade (P13-P16)
   - Faça as perguntas 13 a 16
   - Crie sugestões que reflitam o conflito definido
   - **Aguarde resposta antes de prosseguir**

   ### 🎭 PILAR 5: Narrativa e Meta (P17-P20)
   - Faça as perguntas 17 a 20
   - Finalize o perfil narrativo da aventura
   - **Aguarde resposta antes de prosseguir**

---

## Fase 3: Carregar Lore do Cenário

7. **Após P1 (cenário escolhido):**
   - Se o cenário existir em `Cenarios/[nome]/`, ler todos os arquivos da pasta
   - Carregar o bestiário do Tier correspondente (P2):
     - Tier 1: `07_01a` e `07_01b`
     - Tier 2: `07_02a` e `07_02b`
     - Tier 3: `07_03a` e `07_03b`
     - Tier 4: `07_04a`
   - Carregar ancestralidades: `01_01` a `01_06`
   - Carregar `04_Arsenal_e_Economia.md` e `22_Codex_de_Exploracao_e_Downtime.md`

---

## Fase 4: Confirmar Resumo

8. **Apresente um resumo das 20 respostas** ao usuário em formato de tabela:

   ```
   | # | Pilar | Pergunta | Resposta |
   |---|---|---|---|
   | 1 | Base | Cenário | [resposta] |
   | 2 | Base | Tier | [resposta] |
   | ... | ... | ... | ... |
   ```

9. Pergunte: **"Deseja alterar alguma resposta antes de gerar?"**
   - Se sim, refaça apenas a(s) pergunta(s) indicada(s)
   - Se não, prossiga para a geração

---

## Fase 5: Gerar a Aventura (9 Arquivos)

10. **Criar pasta** `Campanhas/[nome_aventura]/`

11. **Gerar os 9 arquivos** na seguinte ordem:

    **Primeiro: Base narrativa**
    1. `aventura_[nome].md` — Documento principal com capítulos e cenas
    2. `npcs_[nome].md` — Fichas completas de NPCs
    3. `bestiario_[nome].md` — Fichas dos monstros exclusivos

    **Segundo: Material de suporte** 4. `itens_[nome].md` — Fichas de itens e loot 5. `sidequests_[nome].md` — Sidequests expandidas 6. `localidades_[nome].md` — Mapas narrativos + trilha sonora

    **Terceiro: Material de mesa** 7. `sessao_zero_[nome].md` — Guia + Contrato Social 8. `cheat_sheet_[nome].md` — Resumo de 1 página 9. `legado_[nome].md` — Ficha de Legado (save game)

---

## Fase 6: Gerar Arte

12. **Gerar imagens** com a ferramenta `generate_image`:
    - Cena de abertura (paisagem do cenário)
    - Retrato de cada NPC principal (2-4 imagens)
    - Monstro exclusivo da aventura
    - Local icônico (Elemento Icônico da P7)
    - Cena climática do combate final

13. **Salvar imagens** na pasta `Campanhas/[nome_aventura]/`
14. **Embutir imagens** nos arquivos `.md` correspondentes

---

## Fase 7: Validar

15. **Executar o Checklist Final** da skill (Seção 7):
    - Mecânicas (DCs, SN, fichas)
    - NPCs (Desejo/Medo/Segredo, falas, combate)
    - Estrutura (4 cenas, sidequests, dilemas, caminhos raciais)
    - Completude (tabelas, mapas, sessão zero, epílogos, legado)
    - Pandorha (ouro escasso, loot ferramental, ecologia)

16. **Verificar contra as regras** (`regras-aventuras-pandorha.md`):
    - Geografia suporta economia?
    - Ameaça deixou marcas visíveis?
    - Magia tem custo/limite?
    - Escala combina com duração?
    - Ganchos são jogáveis?
    - Facções têm motivação?
    - Locais têm 3 sentidos?

---

## Fase 8: Entrega e Finalização

17. **Apresente o resumo** ao usuário:
    - Lista dos 9 arquivos gerados com tamanho
    - Galeria das imagens geradas
    - Resultado do checklist de validação

18. **Pergunte:**
    - "Deseja expandir algum capítulo ou sidequest?"
    - "Deseja gerar mais NPCs ou monstros?"
    - "Deseja refinar alguma imagem?"
    - "A aventura está pronta para uso?"

19. Se pronto, confirme: **"Aventura [nome] salva em `Campanhas/[nome]/` com [N] arquivos e [N] imagens. Boa sessão! ⚔️"**
