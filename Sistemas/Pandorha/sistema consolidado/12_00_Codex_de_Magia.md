# Pandorha: Capítulo 12 - Codex de Magia

> _"Magia não é um dom. É a arte de convencer o universo a mudar de ideia."_

> **Para a lista de feitiços, consulte: [Grimório Etérico](12_01_Grimorio_Etérico.md).**

Este documento contém as regras fundamentais para conjuração, rituais e manipulação do Éter em Pandorha.

---

## 1. Fundamentos do Éter

A magia em Pandorha é a manipulação do **Éter**, a matéria-prima da realidade. Para moldá-lo, o conjurador usa sua própria força vital e mental, representada pela **Energia Etérica (EE)**.

### Energia Etérica (EE)

- **O que é:** O "combustível" mágico.
- **Limite Diário:** Seu máximo de EE é definido pela sua Matriz Mental e Nível.
- **Recuperação:** Você recupera **100% da EE** após um **Descanso Longo**.
- **Exaustão Mágica:** Se você zerar sua EE, qualquer nova tentativa de conjurar custa **HP** (na proporção 1 EE = 5 HP) e causa 1 Nível de Exaustão.

---

## 2. A Arte da Conjuração

Para lançar uma magia, você precisa pagar seu **Custo**, gastar a **Ação** necessária e, às vezes, manter **Concentração**.

### A. Custo e Círculos

O custo para conjurar uma magia é sempre igual ao número do seu **Círculo**.

| Círculo | Custo (EE) | Nível Desbloqueado | Exemplo de Poder                           |
| :-----: | :--------: | :----------------: | :----------------------------------------- |
|  **0**  |   **0**    |         1          | Truques (Inesgotáveis).                    |
|  **1**  |   **1**    |         1          | Efeitos básicos (Dano leve, sono).         |
|  **2**  |   **2**    |         3          | Invisibilidade, Paralisia.                 |
|  **3**  |   **3**    |         5          | Bola de Fogo, Voo, Reviver.                |
|  **4**  |   **4**    |         7          | Alterar terreno, banimento.                |
|  **5**  |   **5**    |         9          | Muralhas de força, reviver mortos antigos. |
|  **6**  |   **6**    |         11         | Desintegrar, cura completa.                |
|  **7**  |   **7**    |         13         | Teleporte global, regeneração.             |
|  **8**  |   **8**    |         15         | Controlar o clima, terremotos.             |
|  **9**  |   **9**    |         17         | Desejo, parar o tempo.                     |
| **10**  |   **10**   |         20         | Feitiços proíbidos (Apagar história).      |

> **Regra de Potencializar (Upcast):** Você pode gastar mais EE para lançar uma magia de Círculo menor com mais poder. Cada +1 EE gasto aumenta os efeitos conforme descrito na magia (geralmente +1 dado de dano ou +1 alvo).

### B. O Teste de Magia

Nem toda magia exige teste. Se exigir, use estas regras:

#### 1. Jogada de Ataque Mágico

Usada quando você mira um raio, uma flecha ou um toque.

> **Fórmula:** `[d20] + [Nível] + [Mental] + [Conflito]` vs **CA do Alvo**.

#### 2. Difficulty Class (CD) - Dificuldade para Resistir

Usada quando a magia afeta uma área ou a mente do alvo. O alvo deve rolar um Teste de Resistência.

> **Sua CD:** `10 + [Nível] + [Mental]`
> **Teste do Alvo:** `[d20] + [Nível] + [Eixo do Alvo] + [Resistência]` vs **Sua CD**.

- **Sucesso do Alvo:** Sofre apenas metade do dano e nega efeitos extras (como paralisia).
- **Falha do Alvo:** Sofre efeito total.

### C. Componentes da Magia

Para conjurar, você precisa cumprir os requisitos da magia (indicados na descrição).

1.  **Verbal [V]:** Exige a capacidade de falar palavras de poder em voz alta.
    - **Restrição:** Você não pode conjurar se estiver Amordaçado ou em uma área de Silêncio.
2.  **Somático [S]:** Exige gestos precisos com pelo menos uma mão livre.
    - **Restrição:** Você não pode conjurar se estiver com as duas mãos ocupadas (ex: Espada e Escudo) ou Amarrado.
3.  **Material [M]:** Exige um **Foco de Éter** (Varinha, Cristal) ou um ingrediente específico.
    - **Regra:** Se tiver uma Bolsa de Componentes ou um Foco, você ignora custos materiais irrelevantes.

---

## 3. Tipos de Conjuração

### Ritual (Casting Lento)

Algumas magias têm a etiqueta **Ritual**.

- **Vantagem:** Não custa **Nenhum EE**.
- **Custo:** Demora **10 minutos** a mais para conjurar.
- **Uso:** Identificação, alarmes, criar abrigo. Não serve para combate.

### Concentração [C]

Algumas magias duram enquanto você foca nelas (ex: Voo, Invisibilidade).

- **Regra:** Você só pode manter **1 Concentração** por vez.
- **Dano:** Se você tomar dano enquanto concentra, deve fazer um teste de **Mental + Resistência (CD 10 ou Metade do Dano, o que for maior)**. Se falhar, a magia acaba.
- **Incapacitado:** Se cair a 0 HP ou ficar atordoado, perde a concentração.

---

## 4. Formas e Áreas de Efeito

Entenda geometry básica para não queimar seus amigos.

- **Cone:** Começa em você e se expande. Largura final = Comprimento. (Ex: Sopro de Dragão).
- **Cubo:** Um quadrado perfeito. O ponto de origem pode ser qualquer face.
- **Cilindro:** Círculo no chão que sobe até uma altura (ou desce do céu).
- **Esfera:** Explode a partir de um ponto central. Raio é a distância do centro até a borda.
- **Linha:** Um feixe reto. Largura geralmente de 1,5m.

---

## 5. Duelos Mágicos (Contra-Mágica)

Um mago pode tentar anular a magia de outro.

1. **Reação:** O defensor vê o atacante conjurando e usa **Contra-Mágica** (Círculo 3) como Reação.
2. **Cálculo Automático:** Se a magia atacante for Círculo 3 ou menor, ela falha automaticamente.
3. **Teste de Disputa:** Se a magia for Círculo 4 ou maior, o defensor faz um teste de:
   > `[Mental] + [Conflito]` vs `10 + [Círculo da Magia Atacante]`
   - Sucesso: A magia é anulada e o EE do atacante é gasto.
   - Falha: A magia acontece normalmente.

---

## 6. Magia em Armaduras

Em Pandorha, o metal interfere no fluxo do Éter. Toda magia é **Éter**, não existe distinção entre "Etérica" ou "divina".

- **Armadura Leve:** Sem penalidade.
- **Armadura Média:** Você sofre **-4 de penalidade** em Ataques Mágicos e testes de concentração.
- **Armadura Pesada:** Você **não pode conjurar** magias.
- **Talentos:** O talento "Mago de Batalha" remove essas restrições.

---

## 7. Pergaminhos e Poções

Itens consumíveis que contêm magias prontas.

- **Pergaminho:** Permite lançar a magia **sem gastar EE**.
  - Se a magia for de um Círculo maior que você pode lançar, faça um **Teste Global de Mental + Conflito + Nível** contra **CD = 15 + Nível Mínimo do Círculo**.
  - _Exemplo:_ Usar Pergaminho de Círculo 3 (Nível 5) exige CD 20. Círculo 9 (Nível 17) exige CD 32.
  - **Falha:** O pergaminho é consumido e a magia falha. Se falhar por 5 ou mais, ocorre uma falha mágica (Role na Tabela de Caos do Mestre).
- **Poção:** Beber é uma **Ação [A]**. Entregar para um aliado beber é uma **Ação [AA]**.

---

## 8. Implementos Etéricos (Sistemas de Armazenamento)

Cada tipo de **Foco de Éter** possui uma mecânica única de interação com o Éter.

### A. Varinha (O Revólver)

- **Sistema:** **Cargas (Charges)**.
- **Mecânica:** A varinha contém uma única magia (ex: _Varinha de Mísseis Mágicos_) com **3 a 5 Cargas**.
- **Uso:** Você gasta 1 Carga para lançar a magia contida nela **sem gastar seu EE**.
- **Recarga:** Recupera 1d4 cargas ao amanhecer. Se chegar a 0 cargas, role 1d20: no resultado 1, a varinha vira pó.

### B. Cajado (A Bateria)

- **Sistema:** **Reserva de Éter (Mana Battery)**.
- **Mecânica:** O cajado armazena energia bruta.
- **Capacidade:** Armazena uma quantidade de **EE igual ao Nível do Cajado** (ex: Cajado Nv 3 guarda 3 EE).
- **Uso:** Ao conjurar **suas próprias magias**, você pode drenar o EE do cajado em vez do seu.
- **Recarga:** Você pode transferir seu EE para o cajado durante um Descanso Longo.

### C. Grimório (A Biblioteca)

- **Sistema:** **Memória Estendida**.
- **Mecânica:** Não é consumido. É um banco de dados.
- **Ritualista:** Permite lançar magias com a tag **Ritual** direto do livro, sem precisar prepará-las na memória.
- **Estudos:** Durante um **Descanso Curto** (1h), você pode trocar sua lista de magias preparadas consultando o grimório etérico (normalmente exige Descanso Longo).

### D. Orbe (O Capacitor)

- **Sistema:** **Suspensão de Concentração**.
- **Mecânica:** Funciona como um "segundo cérebro".
- **Uso:** Você pode transferir a **Concentração** de uma magia ativa para o Orbe. Isso libera sua mente para concentrar em uma segunda magia (Total: 2 Concentrações).

---

## 9. Aprendizado e Preparação (Grimório e Memória)

Um mago não sabe todas as suas magias de cor. Ele precisa estudar.

### A. Magias Conhecidas (O Grimório)

Seu grimório é a soma de todo seu conhecimento.

- **Início:** Você começa com **3 Truques** e **3 Magias de Círculo 1**.
- **Subir de Nível:** A cada nível ganho, você descobre **2 Novas Magias** (de Círculos que possa lançar) e as adiciona ao grimório de graça.
- **Aprender por Pergaminhos:** Se encontrar um Pergaminho ou o Grimório de outro mago, você pode copiar a magia.
  - **Custo:** 50 Ouro por Círculo (tintas raras).
  - **Tempo:** 2 horas por Círculo.

### B. Magias Preparadas (A Memória)

Sua mente tem um limite de complexidade que suporta.

- **Limite de Preparação:** Você pode ter preparadas um número de magias igual a:
  > **[Eixo Mental] + [Seu Nível]**
- **Troca:** Você só pode trocar sua lista de magias preparadas após um **Descanso Longo** (1h de estudo).
  - _Exceção:_ Se tiver seu grimório em mãos, pode trocar 1 magia durante um Descanso Curto.

> **Regra de Ouro da Memória:** Magias com a etiqueta **Ritual** não precisam ser preparadas se você tiver seu grimório. Elas podem ser lançadas direto do livro (10 min extra).

