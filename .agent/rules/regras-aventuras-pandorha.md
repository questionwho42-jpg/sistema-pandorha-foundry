---
description: Regras de validação específicas para aventuras geradas no Sistema Pandorha.
---

# 📜 Regras de Validação para Aventuras de Pandorha

Estas regras DEVEM ser verificadas antes de entregar qualquer aventura gerada pelo workflow `/criar-aventura-pandorha`.

---

## Regra 1: Testes Explícitos

**Todo desafio mecânico DEVE usar o formato padrão de Pandorha.**

```
Teste de **[Atributo] + [Eixo] DC [N]** ([Habilidade])
```

### Validação:

- ✅ Atributo é um de: Físico, Mental, Social
- ✅ Eixo é um de: Conflito, Interação, Resistência
- ✅ DC segue a Tabela de DC Relativa por Tier
- ❌ Nunca use "teste de Percepção DC 15" sem Atributo + Eixo

---

## Regra 2: Balanceamento por SN

**Todo encontro de combate DEVE ter SN calculado e Multiplicador aplicado.**

### Fórmula:

```
SN Alvo = Σ(Nível dos PCs) × Multiplicador de Grupo
```

| Grupo         | Multiplicador |
| ------------- | :-----------: |
| 1 jogador     |     ×0.75     |
| 2 jogadores   |     ×0.90     |
| 3-5 jogadores |     ×1.00     |
| 6+ jogadores  |     ×1.20     |

### Validação:

- ✅ SN dos monstros está entre 80% e 150% do SN alvo
- ✅ Encontro "Justo" (~100%) para cenas comuns
- ✅ Encontro "Mortal" (~150%) apenas para clímax/bosses
- ✅ Número de inimigos respeita o limite do tamanho do grupo
- ❌ Nunca coloque 1 boss sozinho contra 6+ jogadores sem Ações Lendárias

---

## Regra 3: Economia de Ações

**A Lei da Ação de Pandorha: quem tem mais ações geralmente ganha.**

### Validação:

- ✅ Ações totais dos monstros não excedam 200% das ações do grupo
- ✅ Se 1-2 jogadores: máximo de 2-3 inimigos por encontro
- ✅ Bosses solitários têm Ações Lendárias ou lacaios
- ✅ Cada combate lista o total de ações por lado

---

## Regra 4: DCs Corretas por Tier

| Dificuldade | T1  | T2  | T3  | T4  |
| ----------- | :-: | :-: | :-: | :-: |
| Mundana     | 12  | 18  | 24  | 30  |
| Desafiadora | 15  | 21  | 27  | 33  |
| Lendária    | 20  | 26  | 32  | 38  |
| Divina      | 25  | 31  | 37  | 43  |

### Validação:

- ✅ Cena 1 (RP): DCs Mundanas a Desafiadoras
- ✅ Cena 2 (Exploração): DCs Desafiadoras
- ✅ Cena 3 (Combate): DCs Desafiadoras a Lendárias
- ✅ Cena 4 (Downtime): DCs Mundanas
- ❌ Nunca use DC Divina fora de Tier 4 ou momentos de desespero narrativo

---

## Regra 5: Completude de NPCs

**Todo NPC nomeado DEVE ter os 6 elementos obrigatórios.**

### Checklist por NPC:

- [ ] ND (Nível de Desafio)
- [ ] Descrição física com traço marcante
- [ ] Desejo (o que quer)
- [ ] Medo (o que o impede)
- [ ] Segredo (o que esconde)
- [ ] 3-4 falas de diálogo prontas

### NPCs de combate adicionam:

- [ ] Fichas com HP, CA, atributos
- [ ] Comportamento tático ("Prefere atacar das sombras")

---

## Regra 6: Estrutura de 4 Cenas

**Cada capítulo DEVE seguir a sequência de 4 cenas.**

| Cena | Tipo                  | Elementos Obrigatórios                          |
| ---- | --------------------- | ----------------------------------------------- |
| 1    | Investigação/RP       | Diálogos, pistas, teste social/mental           |
| 2    | Exploração/Desafio    | Perigo ambiental, teste físico/mental           |
| 3    | Combate Épico         | Encontro balanceado, cenário interativo, dilema |
| 4    | Consequência/Downtime | Menu de atividades, evento-surpresa             |

### Cada cena DEVE ter:

- [ ] Atmosfera sensorial (visual + som + cheiro)
- [ ] Pelo menos 1 teste mecânico (Atributo + Eixo + DC)
- [ ] Consequência clara para sucesso E fracasso

### Cada capítulo DEVE ter:

- [ ] ≥1 Sidequest Hook
- [ ] 1 Dilema Moral (Opção A vs B) com impacto no Medidor
- [ ] ≥1 Caminho Racial alternativo
- [ ] 1 Elemento de Cenário interativo no combate

---

## Regra 7: Loot Ferramental

**Pandorha valoriza itens como FERRAMENTAS, não como decoração.**

### Validação:

- ✅ Todo item tem efeito mecânico explícito
- ✅ Todo item tem: nome temático, descrição, mecânica, raridade, preço
- ✅ Loot é diferenciado por tipo de jogador
- ✅ Ouro é ESCASSO (jogadores devem fazer escolhas entre compras)
- ❌ Nunca dê um item sem explicar o que ele FAZ mecanicamente

---

## Regra 8: Ramificação de Escolhas

**Escolhas devem ter impacto REAL na aventura.**

### Validação:

- ✅ Cada dilema moral afeta o Medidor de Consequência
- ✅ ≥3 escolhas desbloqueiam/trancam opções em capítulos futuros
- ✅ NPCs salvos/mortos reaparecem/desaparecem
- ✅ Facções lembram e reagem às escolhas dos jogadores
- ✅ 3 epílogos distintos refletem escolhas acumuladas

---

## Regra 9: Consistência do Mundo

**O cenário deve fazer sentido interno.**

### Validação (importada de `rpg-scenario-rules.md`):

- ✅ Geografia suporta a economia descrita
- ✅ Ameaça já deixou marcas visíveis antes do Cap.1
- ✅ Magia tem custo OU limitação + Fenômeno Mágico local
- ✅ Escala combina com duração (one-shot = local, campanha = regional+)
- ✅ Monstros conectados à ecologia local ou trama

---

## Regra 10: Entrega Completa

**A aventura deve conter os 9 arquivos obrigatórios.**

### Checklist de Entrega:

- [ ] `aventura_[nome].md` — Documento principal
- [ ] `npcs_[nome].md` — Fichas de NPCs
- [ ] `bestiario_[nome].md` — Monstros exclusivos
- [ ] `itens_[nome].md` — Fichas de itens
- [ ] `sidequests_[nome].md` — Missões secundárias
- [ ] `localidades_[nome].md` — Mapas + trilha sonora
- [ ] `sessao_zero_[nome].md` — Guia + Contrato Social
- [ ] `cheat_sheet_[nome].md` — Resumo de 1 página
- [ ] `legado_[nome].md` — Ficha de Legado (save game)
- [ ] ≥5 imagens geradas
- [ ] Todos na pasta `Campanhas/[nome]/`
