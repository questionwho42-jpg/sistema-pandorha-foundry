# Pandorha: Capítulo 03 - Codex de Combate e Condições (Edição Brutalista)

Este manual define as regras de engajamento tático. Toda regra aqui é absoluta e numérica.

---

## ðŸ—ï¸ 1. O Fluxo de Batalha (3 Ações)

### 1.0 Iniciativa (Mental + Interação + Nível)

Antes do primeiro turno, todos rolam **Iniciativa** para decidir a ordem de agir.

- **Fórmula:** `[d20] + [Nível] + [Eixo Mental] + [Aplicação Interação]`.
- **Empate:** Quem tiver maior Eixo Mental vence.

### 1.1 Rodada e Turno

Cada personagem recebe:

- **3 Ações [A]**: Podem ser gastas em ataques, movimentos ou habilidades.
- **1 Reação [R]**: Disponível uma única vez entre seus turnos.

### 1.1b Concentração (Mental + Resistência)

Algumas magias exigem **Concentração** para durar.

- **Limite:** Você só pode concentrar em **1 magia** por vez.
- **Dano:** Se sofrer dano, deve passar em um teste de **Mental + Resistência (DC 10 ou Metade do Dano, o que for maior)**. Falha encerra a magia.

### 1.2 Penalidade de Ataque Múltiplo (MAP)

Toda ação com a tag [Ataque] aplica penalidade cumulativa no mesmo turno:

- **1º Ataque:** +0.
- **2º Ataque:** -5 (-4 Ágil).
- **3º Ataque:** -10 (-8 Ágil).

### 1.3 Movimentação e Passo Seguro

- **Mover [A]:** Move sua velocidade total (Base 9m). Gera Ataque de Oportunidade (AO).
- **Passo Seguro [A]:** Move 1,5m. Não gera AO.
- **Levantar [A]:** Remove a condição **Caído**.

### 1.4 Manobras de Combate (Substituem 1 Ataque)

Use **[Físico + Conflito]** contra a **DC Passiva de CA** do alvo.

**CA = 10 + [Nível] + [Armadura] + [Eixo Limitado] + [Escudo]**

- **Agarrar [A]:** Sucesso deixa o alvo **Agarrado** (Velocidade 0). Só funciona em criaturas até 1 tamanho maior.
- **Empurrar [A]:** Sucesso empurra o alvo 1,5m ou deixa **Caído**.

---

### 1.5 Reações Comuns

- **Ataque de Oportunidade (AO):**
  - **Gatilho:** Inimigo sai do seu alcance (adjacente) sem usar Passo Seguro ou teleportar.
  - **Efeito:** Você faz 1 Ataque corpo-a-corpo contra ele.
  - **Custo:** [R].

### 1.6 Acertos Críticos (Regra da Margem)

Em combate, a precisão letal é recompensada.

- **Gatilho:** Se o resultado do Ataque superar a CA do inimigo por **10 ou mais**.
  - _Exemplo:_ Inimigo tem CA 15. Se você tirar 25 ou mais, é Crítico.
- **Efeito:** Todo o dano (dados + bônus) é **DOBRADO**.
- **Nota:** Um "20 Natural" no dado garante o Acerto, mas só é Crítico se atingir a margem.

### 1.7 Habilidades de Recarga (Monstros)

Algumas habilidades poderosas possuem **(Recarga X-Y)**.

- **Como funciona:** No início do turno da criatura, role **1d6**. Se o resultado estiver na faixa indicada (ex: 5-6), a habilidade recarrega e pode ser usada novamente.

---

## 🎭 4. Enciclopédia de Condições (34 Status)

Cada condição tem duração em **Rodadas (R)** ou gatilho de remoção.

| #   | Condição         | Efeito                                                                                                                                  | Remoção (Forma Explicita)                                                                                                                |
| :-- | :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Abalado**      | -1 em testes Mentais/Sociais. Dura 1 minuto (10R).                                                                                      | Automática após 10R.                                                                                                                     |
| 2   | **Agarrado**     | Velocidade 0. Exposto (-2 CA).                                                                                                          | [A] Escapar (Teste Global: Físico + Interação) vs DC do Agressor (10 + Nível + Físico + Conflito).                                       |
| 3   | **Aterrorizado** | Foge com todas as ações. -2 em testes.                                                                                                  | Teste Global de [Mental + Resistência + Nível DC da Fonte] (Fim do Turno).                                                               |
| 4   | **Atordoado**    | Perde 3 Ações [A] no turno. Dura 1R.                                                                                                    | Automática após 1R.                                                                                                                      |
| 5   | **Caído**        | -2 ataques físicos. Inimigos corpo-a-corpo ganham +2. Move metade da velocidade. Ataques à distância contra o alvo têm -2.              | Requer [A] Levantar.                                                                                                                     |
| 6   | **Cego**         | Alvos têm Cobertura Total. -4 em testes de Visão (Mental + Interação).                                                                  | Conforme a causa (limpar olhos ou fim da magia).                                                                                         |
| 7   | **Combalido**    | HP Máximo reduzido em 10% permanentemente até Descanso Longo.                                                                           | Apenas após um Descanso Longo.                                                                                                           |
| 8   | **Confuso**      | Role 1d6: 1-2 (Ataca aliado), 3-4 (Parado), 5-6 (Age normal). Dura 1R.                                                                  | Automática após 1R.                                                                                                                      |
| 9   | **Dormindo**     | Incapacitado.                                                                                                                           | Acorda com dano ou se um aliado usar [A] Sacudir.                                                                                        |
| 10  | **Em Chamas**    | 1d6 dano de fogo/turno.                                                                                                                 | Requer [A] Apagar.                                                                                                                       |
| 11  | **Energizado**   | +1 dado de dano na próxima magia ofensiva.                                                                                              | Gasta ao usar.                                                                                                                           |
| 12  | **Enfeitiçado**  | Não ataca o criador. Criador ganha +2 Sociais contra você.                                                                              | Dano de aliados ou [Mental + Resistência + Nível DC Fonte].                                                                              |
| 13  | **Envenenado**   | 1d8 dano físico/turno.                                                                                                                  | Teste Global de [Físico + Resistência + Nível DC da Fonte] (Fim do Turno).                                                               |
| 14  | **Exausto**      | Não pode usar [AAA] ou Investidas.                                                                                                      | Removido após Descanso Longo.                                                                                                            |
| 15  | **Exposto**      | -2 CA.                                                                                                                                  | Ao sair de Flanco ou fim da habilidade.                                                                                                  |
| 16  | **Focado**       | +2 no próximo teste.                                                                                                                    | Gasta ao usar.                                                                                                                           |
| 17  | **Gelado**       | Perde 1 Ação [A]. Velocidade -50%. Dura 1R.                                                                                             | Automática após 1R.                                                                                                                      |
| 18  | **Imobilizado**  | Velocidade 0.                                                                                                                           | Conforme a causa (quebrar gelo, soltar amarras, etc).                                                                                    |
| 19  | **Incapacitado** | Não pode agir ou reagir.                                                                                                                | Conforme a causa (cura ou fim da magia).                                                                                                 |
| 20  | **Inconsciente** | Incapacitado, Caído e larga itens. Falha automática em testes de Resistência (Exceto Testes de Morte). Ataques adjacentes são Críticos. | Acordar com dano ou se receber cura.                                                                                                     |
| 21  | **Invisível**    | 50% chance de erro para atacantes. Indetectável por visão normal.                                                                       | Encontrar: [Mental + Interação] vs [DC Passiva de Furtividade (Mental + Conflito)]. Atacar ou fazer barulho revela.                      |
| 22  | **Lento**        | Velocidade -3m. Dura conforme a causa.                                                                                                  | Geralmente 1R ou fim da causa.                                                                                                           |
| 23  | **Maldito**      | Rola 2d20 e escolhe o menor resultado em Resistências. Dura 1 hora.                                                                     | Automática após 1 hora.                                                                                                                  |
| 24  | **Marcado**      | +2 dano sofrido de todas as fontes. Falha automática em Furtividade.                                                                    | Fim da cena de combate.                                                                                                                  |
| 25  | **Moribundo**    | Inconsciente c/ 0 HP. Ao fim do turno, teste de [Físico + Resistência + Nível] vs sua própria **DC Passiva de Resistência**.            | 3 Sucessos estabilizam. 3 Falhas = Morte. Ajuda: [Mental + Interação] vs DC Passiva do Moribundo.                                        |
| 26  | **Nauseado**     | Não pode usar [AA] ou [AAA].                                                                                                            | Teste Global de [Físico + Resistência + Nível DC da Fonte] (Fim do Turno).                                                               |
| 27  | **Oculto**       | Indetectável. Não pode ser alvo direto. Se atacar, alvo fica Surpreendido (sem reação).                                                 | Revelado se atacar, fizer barulho ou for encontrado por [Mental + Interação].                                                            |
| 28  | **Paralisado**   | Incapacitado + Exposto. Ataques físicos adjacentes são Críticos Automáticos.                                                            | Teste Global de [Físico + Resistência + Nível DC da Fonte] (Fim do Turno).                                                               |
| 29  | **Petrificado**  | Incapacitado. RD 10 (físico).                                                                                                           | Magias de Cura de Alto Nível (Círculo 3+).                                                                                               |
| 30  | **Sangrando**    | 1d4 dano/turno. Não recupera HP naturalmente.                                                                                           | Teste Global de [Físico + Resistência + Nível DC da Fonte] (Fim do Turno), Mover ou usar [A] para estancar (Gasta 1 uso de Kit de Cura). |
| 31  | **Sem Ar**       | Sufocando. Dura [Físico] + 1 Rodadas. Após isso, cai a 0 HP (Moribundo). Magias com componente Verbal falham.                           | Respirar novamente.                                                                                                                      |
| 32  | **Surdo**        | Falha em ouvir (Mental + Interação). -2 Iniciativa.                                                                                     | Fim da causa ou da magia.                                                                                                                |
| 33  | **Surpreendido** | Sem reações. Perde 1 Ação [A] no 1º turno.                                                                                              | Automática após o seu 1º turno.                                                                                                          |
| 34  | **Vulnerável**   | Sofre +1d6 dano de [TIPO].                                                                                                              | Fim da cena ou fim da habilidade.                                                                                                        |
