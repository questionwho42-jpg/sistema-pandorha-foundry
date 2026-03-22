# Pandorha: Capítulo 13 - Guia de Criação de Monstros (A Engenharia do Caos)

Este guia fornece as fórmulas matemáticas exatas para criar inimigos equilibrados para o sistema Pandorha.

> **Filosofia de Design:** Monstros não seguem as mesmas regras que jogadores. Eles vivem pouco (3-5 rodadas de combate), então precisam ser simples de controlar e impactantes de enfrentar.

---

## ðŸ—ï¸ 1. A Tabela Mestra (Matemática por Nível)

Use esta tabela como base. Ajuste os valores conforme o **Papel Tático** (veja seção 2).

| Nível (ND) | HP Base (Médio) | CA Base | Ataque Principal | Dano Médio / Turno | DC de Habilidades | XP (Solo) |
| :--------: | :-------------: | :-----: | :--------------: | :----------------: | :---------------: | :-------: |
|   **1**    |       15        |   12    |        +3        |         5          |        17         |     1     |
|   **2**    |       25        |   13    |        +5        |         8          |        18         |     2     |
|   **3**    |       40        |   14    |        +7        |         12         |        20         |     3     |
|   **4**    |       55        |   15    |        +9        |         16         |        21         |     4     |
|   **5**    |       70        |   16    |       +10        |         22         |        23         |     5     |
|   **6**    |       90        |   17    |       +11        |         28         |        25         |     6     |
|   **8**    |       120       |   18    |       +14        |         35         |        29         |     8     |
|   **10**   |       150       |   19    |       +16        |         45         |        34         |    10     |
|   **11**   |       180       |   20    |       +17        |         55         |        36         |    11     |
|   **15**   |       280       |   22    |       +21        |         75         |        45         |    15     |
|   **20**   |       500       |   25    |       +30        |        150         |        55         |    20     |

---

## ðŸŽ² 1.5 O Padrão de Testes (Eixo + Aplicação)

Para manter a clareza durante o jogo, **todas** as habilidades de monstros devem especificar exatamente qual teste o jogador deve fazer para resistir.

- **Fórmula:** `Teste de [Eixo] + [Aplicação] CD [Valor]`.
- **Exemplos de Padrão:**
  - _Agarrar/Imobilizar:_ **Físico + Resistência** (Força bruta para soltar).
  - _Medo/Controle:_ **Mental + Resistência** (Proteção Mental).
  - _Explosões/Áreas:_ **Físico + Conflito (Esquiva)** (Esquiva para metade).
  - _Ilusões:_ **Mental + Interação (Percepção)** (Ver a verdade).

---

## ðŸŽ¨ 2. Papéis Táticos (Ajustes de Template)

Aplique estes modificadores sobre os valores da Tabela Mestra para dar personalidade mecânica ao monstro.

### 🛡️ Tanque / Bruto

_Feito para apanhar e proteger a linha de trás._

- **HP:** +50% (Ex: Nível 1 passa de 15 para 22).
- **CA:** -2 (Fácil de acertar).
- **Ataque:** -2 (Grosseiro).
- **Dano:** Alto, mas em um único golpe lento.
- **Sugestão de Passiva:** _Inabalável_ (RD 2 ou Imune a Derrubada).

### ðŸ—¡ï¸ Assassino / Striker

_Feito para causar dano massivo e morrer rápido._

- **HP:** -25% (Frágil).
- **CA:** +2 (Ágil ou Esquiva).
- **Ataque:** +2 (Preciso).
- **Dano:** +50% (Letal).
- **Sugestão de Passiva:** _Ataque Furtivo_ (+1d6 se tiver vantagem/flanco) ou _Evasão_ (Toma metade do dano em áreas).

### ðŸ”® Controlador / Conjurador

_Altera o campo de batalha e aplica condições._

- **HP:** -40% (Muito frágil).
- **CA:** Baixa, mas usa _Escudos Mágicos_ (Reação).
- **DC:** +2 (Difícil de resistir).
- **Dano:** Baixo, mas em Área.
- **Sugestão de Magias:** _Teia_, _Onda de Trovão_, _Medo_.

### ðŸœ Lacalo / Minion

_Feito para morrer aos montes. Use 4-5 deles por Jogador._

- **HP:** 1 (Morre com qualquer dano direto).
- **Dano:** Fixo (sem rolar dados, ex: 4 de dano).
- **Regra Especial:** Se passarem num teste de resistência para tomar metade do dano, eles não tomam **nenhum** dano.

### ðŸ‘‘ Chefe / Solo (Lendário)

_Feito para enfrentar um grupo inteiro sozinho._

- **HP:** x4 (Quadruplicado).
- **Iniciativa:** Role 2d20 e escolha o melhor.
- **Ações:** Ganha 1 turno extra ou 3 _Ações Lendárias_ no final do turno dos jogadores.
- **Resistência Lendária:** 3x/Dia pode escolher passar num teste que falhou.

---

## ðŸ§® 3. A Matemática dos Eixos e Aplicações

Se você precisa preencher a ficha completa, use esta lógica para definir os Eixos e suas Aplicações derivadas.

### 3.1 Definindo Eixos (O Poder Bruto)

> **Eixo Primário (Forte):** (Nível / 2) + 2
> **Eixo Secundário (Médio):** (Nível / 4) + 1
> **Eixo Fraco (Fraco):** 0 ou Negativo (Para monstros irracionais pode ser -2 ou -4)

_Exemplo: Dragão Nível 12 (Físico Primário)._

- **Físico:** 12/2 + 2 = **+8** (Ajustado para +7 ou +9).
- **Mental:** 12/3 = **+4**.
- **Social:** **+2** (Dragões são carismáticos).

### 3.2 Definindo Aplicações (O Treinamento)

Monstros não distribuem pontos 1 a 1 como jogadores. Use a regra do "Foco":

1.  **Aplicação Focada:** Igual ao Eixo Base (Ex: Um Soldado tem Físico 3 e Conflito 3).
2.  **Aplicação Não-Focada:** Eixo Base - 2 (Ex: O mesmo Soldado tem Físico 3 mas Interação 1).
3.  **Aplicação Nula:** 0 (Se o monstro não faz aquilo, ex: Zumbi em Interação).

**Fórmulas Derivadas:**

- **Iniciativa** = Mental + Interação.
- **Ataque** = Nível + Eixo (Fis/Men).
- **DC Passiva** = 10 + Nível + Eixo + Aplicação.

---

## ðŸ“ 4. Passo a Passo de Criação

1.  **Conceito:** O que é? (Ex: Um urso de pedra que cospe lava).
2.  **Nível Alvo:** Qual o nível do grupo? Se for um Boss, Nível do Grupo + 2 ou 3. Se for mob comum, Nível do Grupo - 1.
3.  **Tabela Mestra:** Copie os números base.
4.  **Template:** Aplique o Papel Tático (Ex: Bruto > Aumenta HP, reduz CA).
5.  **Habilidades Únicas (O Tempero):** Dê a ele 1 Passiva e 1 Ação Especial [AA] com Recarga.
    - _Ex para Urso de Lava:_ Passiva (Quem bater sofre 1d6 Fogo) + Sopro de Lava (Cone, Recarga 5-6).
6.  **Teste Mental:** Simule mentalmente 3 rodadas. "Ele aguenta 3 ataques do Guerreiro? Ele mata o Mago em 1 hit?" (Se matar em 1 hit, reduza o dano e aumente o acerto).

---

## ⚖️ 5. Tabela de Conversão de Dano (Dice vs Fixed)

Para agilizar, use esta tabela para definir os dados de dano baseados no "Dano Médio" da Tabela Mestra.

| Dano Médio | Dados Sugeridos (Físico) | Dados Sugeridos (Mágico) |
| :--------: | :----------------------- | :----------------------- |
|     5      | 1d6+2                    | 1d10                     |
|     8      | 1d8+3                    | 2d6                      |
|     12     | 2d6+5                    | 3d6                      |
|     16     | 2d8+6                    | 4d6                      |
|     22     | 3d8+8                    | 6d6                      |
|     28     | 4d8+10                   | 8d6                      |
|     35     | 4d10+12                  | 10d6                     |
|     45     | 6d8+15                   | 12d6                     |
|     55     | 6d10+20                  | 15d6                     |
