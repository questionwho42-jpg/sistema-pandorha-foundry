# Pandorha: Capítulo 09 - O Guia do Artífice (Sistema de Criação)

Este capítulo expande as regras de economia para permitir que jogadores criem seus próprios equipamentos, desde espadas simples até artefatos lendários.

---

## ?? 1. Fundamentos da Criação (Crafting)

Para criar um item, você precisa de três coisas: **Receita (Conhecimento)**, **Materiais (Recursos)** e **Tempo (Trabalho)**.

### 1.1 O Processo de Trabalho

1. **Realizar o Ritual:** Teste de **Mental + Interação + Nível** vs DC do Item.

- **Ferramentas:** É obrigatório ter acesso a um laboratório, forja ou kit apropriado. Sem ferramentas, o teste é impossível.

| Nível do Item | DC (Cap 08)     | Tempo (Dias) |
| :------------ | :-------------- | :----------- |
| Comum         | **Mundana**     | 1            |
| Incomum       | **Desafiadora** | 3            |
| Raro          | **Lendária**    | 7            |
| Épico         | **Divina**      | 14           |
| Lendário      | **Divina + 5**  | 30           |

#### Tipos de Poções (Criação DC 15 + Nível do Item)

- **Poção de Cura (Menor):** Recupera **2d4+2 HP**. (**Custo:** 50 moedas).
- **Veneno Básico:** O alvo deve passar em **Teste Global de [Físico] + [Resistência] + [Nível]** vs **DC Desafiadora de seu Tier** ou sofrer **1d6 Veneno**. (**Custo:** 100 moedas).
- **Óleo de Afiar:** +1 no dano por 1 hora. (**Custo:** 150 moedas).
- **Poção de Cura (Maior):** Recupera **4d4+4 HP**. (**Custo:** 200 moedas). (**DC Desafiadora**).
- **Veneno Mortal:** O alvo deve passar em **Teste Global de [Físico] + [Resistência] + [Nível]** vs **DC Lendária de seu Tier** ou sofrer **4d6 Veneno** e ficar **Envenenado**. (**Custo:** 500 moedas). (**DC Lendária**).

> **Nota de Balanceamento:** Como os testes de criação somam o Nível do Personagem, as DCs foram ajustadas para acompanhar a progressão de Tier.
> **Falha no Teste:** Você perde 50% dos materiais e metade do tempo investido, mas não produz o item.
> **Sucesso Crítico:** O item ganha uma qualidade cosmética superior ou é feito na metade do tempo.

### 1.2 Talentos de Ofício (Obrigatório)

Diferente de cozinhar ou fazer nós, criar equipamentos de guerra exige treinamento especializado.
Para realizar qualquer criação deste capítulo, você deve gastar um **Ponto de Talento** (ganho nos níveis 2, 3, 4, 6) para aprender a técnica correspondente.

| Nome do Talento        | O que permite criar                     |
| :--------------------- | :-------------------------------------- |
| **Forja de Guerra**    | Armas, Armaduras, Escudos e Munições.   |
| **Ciência Alquímica**  | Poções, Óleos, Venenos e Explosivos.    |
| **Vinculação Rúnica**  | Runas Menores, Maiores e Ancestrais.    |
| **Engenharia de Éter** | Varinhas, Cajados, Orbes e Pergaminhos. |

> **Sem Talento:** Você só consegue realizar reparos simples ou criar itens mundanos improvisados (Qualidade Ruim), mas nunca itens de valor comercial ou mágico.

---

## ?? 2. Engenharia de Armas (Exige: Forja de Guerra)

Em vez de apenas copiar a lista do livro, um ferreiro habilidoso pode desenhar armas customizadas.
Cada arma tem um **Orçamento de Pontos (BP)** baseado no seu tipo.

- **Arma Simples:** 2 Pontos.
- **Arma Marcial:** 3 Pontos.
- **Arma Exótica:** 4 Pontos (Requer Talento Específico para usar).

### 2.1 Tabela de Custo de Propriedades

| Propriedade         | Custo em Pontos  | Notas                                                                |
| :------------------ | :--------------: | :------------------------------------------------------------------- |
| **Dano d4**         |        0         | Base para armas leves.                                               |
| **Dano d6**         |        1         | Base para armas médias.                                              |
| **Dano d8**         |        2         | Base para armas de guerra.                                           |
| **Dano d10**        |        3         | Apenas armas de duas mãos ou exóticas.                               |
| **Dano d12**        |        4         | Apenas armas pesadas de duas mãos.                                   |
| **Tag: Ágil**       |        1         | Permite usar Mental/Interação e reduz penalidade de ataque múltiplo. |
| **Tag: Arremesso**  |        1         | Alcance curto de arremesso (6m/9m).                                  |
| **Tag: Versátil**   |        1         | Aumenta o dado de dano em um passo se usada com 2 mãos.              |
| **Tag: Alcance**    |        1         | Ataca a 3m de distância.                                             |
| **Tag: Brutal**     |        1         | Dado extra no Crítico.                                               |
| **Tag: Desarme**    |        1         | Bônus em manobras.                                                   |
| **Defeito: Pesada** | +1 (Ganha Ponto) | Exige Força e 2 Mãos.                                                |
| **Defeito: Lenta**  | +1 (Ganha Ponto) | 1 Ação [A] de Recarga necessária.                                    |

**Exemplo de Criação:**
_Quero criar uma "Lança de Duelo"._
É uma Arma Marcial (3 Pontos).

- Compro Dano d8 (2 Pontos).
- Compro Alcance (1 Ponto).
- Total: 3 Pontos. Criei uma Lança (1d8, Alcance).

---

## ?? 3. Catálogo de Materiais Especiais

Materiais alteram as propriedades base do item. O custo do material é somado ao custo base do item.

| Material            | Custo Adicional | Efeito em Arma                                           | Efeito em Armadura                                         |
| :------------------ | :-------------: | :------------------------------------------------------- | :--------------------------------------------------------- |
| **Aço Frio**        |      +20 O      | +2 Dano contra Fadas e Demônios.                         | +1 Resistência a Magia Vil.                                |
| **Prata Pura**      |      +50 O      | Ignora RD de Lobisomens e Mortos-Vivos.                  | Se atacado por Morto-Vivo, atacante sofre 1 dano.          |
| **Mithral**         |     +500 O      | Item torna-se _Leve_. Se já for leve, ganha _Ágil_.      | Reduz Categoria (Pesada vira Média, Média vira Leve).      |
| **Adamante**        |     +1000 O     | Ignora Dureza de objetos. Crítico automático em objetos. | Converte qualquer Acerto Crítico sofrido em Acerto Normal. |
| **Couro de Dragão** |     +800 O      | +1 Dano do elemento do dragão.                           | Resistência 5 ao elemento do dragão.                       |
| **Obsidiana**       |     +100 O      | +1 Dano, mas quebra se rolar "1" natural no ataque.      | -                                                          |

---

## ?? 4. Alquimia Avançada (Exige: Ciência Alquímica)

Alquimia não é apenas misturar ervas. É a ciência de extrair a alma da matéria.

### 4.1 O Processo de Destilação

Criar uma poção exige etapas. Para cada Receita, o Alquimista deve realizar **3 Testes Globais de Mental + Interação + Nível** sucessivos, representando Preparo, Destilação e Catalisação.

- **3 Sucessos:** Poção Perfeita (Efeito Máximo ou Dobrado).
- **2 Sucessos:** Poção Padrão.
- **1 Sucesso:** Poção Instável (Role 1d6 ao beber: 1-3 funciona, 4-6 falha e causa enjoo).
- **0 Sucessos:** Lixo Tóxico (1d4 Dano de Veneno, todos os materiais perdidos).

### 4.2 Tabela de Reagentes e Essências

O mundo possui 4 tipos de Essências Primárias.

| Tipo de Essência    | Onde Encontrar                           | Teste de Coleta (Global)                        | Exemplos de Fonte                                 |
| :------------------ | :--------------------------------------- | :---------------------------------------------- | :------------------------------------------------ |
| **Vital (Verde)**   | Florestas, Pântanos, Jardins.            | **Mental + Resistência + Nível (DC 10 + Tier)** | Raiz de Mandrágora, Musgo de Troll, Seiva de Ygg. |
| **Mineral (Cinza)** | Cavernas, Montanhas, Vulcões.            | **Mental + Resistência + Nível (DC 10 + Tier)** | Pó de Enxofre, Sal de Ferro, Mercúrio Líquido.    |
| **Etérica (Azul)**  | Ruínas, Torres de Magos, Linhas de Ley.  | **Mental + Resistência + Nível (DC 10 + Tier)** | Cristal de Éter, Pó de Fada, Ectoplasma.          |
| **Sombria (Roxa)**  | Cemitérios, Abismo, Locais Amaldiçoados. | **Mental + Resistência + Nível (DC 10 + Tier)** | Cinzas de Vampiro, Beladonna, Água do Estige.     |

### 4.3 O Livro de Receitas Expandido

|     Nível     | Nome da Poção           | Ingredientes                         | DC Base | Efeito Detalhado                                                                                                                          |
| :-----------: | :---------------------- | :----------------------------------- | :-----: | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **Iniciante** | **Cura Menor**          | 2x Vital                             |   10    | Recupera 1d8+2 HP.                                                                                                                        |
| **Iniciante** | **Antídoto**            | 1x Vital + 1x Mineral                |   10    | Remove envenenamento (Nível < 5).                                                                                                         |
| **Iniciante** | **Cola de Aranha**      | 2x Vital                             |   12    | Frasco quebra. Cria Terreno Difícil (3m) e cola pés (Imobilizado).                                                                        |
| **Iniciante** | **Pedra do Trovão**     | 2x Mineral                           |   12    | Granada sônica. Todos em 3m ficam Surdos por 1 hora.                                                                                      |
| **Aprendiz**  | **Cura Maior**          | 3x Vital + 1x Mineral                |   14    | Recupera 3d8+6 HP.                                                                                                                        |
| **Aprendiz**  | **Fogo Líquido**        | 2x Mineral + 1x Etérica              |   14    | Granada. 3d6 Fogo em área (3m).                                                                                                           |
| **Aprendiz**  | **Pele de Árvore**      | 2x Vital + 1x Mineral                |   15    | A pele fica dura como carvalho. +2 na CA por 1 hora.                                                                                      |
| **Aprendiz**  | **Veneno Paralisante**  | 2x Vital + 1x Sombria                |   16    | Aplica na arma. Alvo deve passar em **Teste Global de [Físico] + [Resistência] + [Nível]** vs **DC Desafiadora** ou fica Imobilizado.     |
| **Aprendiz**  | **Gás do Sono**         | 2x Vital + 1x Etérica                |   16    | Quebrar frasco. Nuvem de 3m. Quem respirar dorme por 1 minuto.                                                                            |
|  **Mestre**   | **Invisibilidade**      | 2x Etérica + 1x Sombria              |   18    | Invisível por 1 hora ou até atacar.                                                                                                       |
|  **Mestre**   | **Voo**                 | 3x Etérica + 1x Vital                |   18    | Ganha Deslocamento de Voo (9m) por 10 min.                                                                                                |
|  **Mestre**   | **Elixir da Verdade**   | 3x Etérica + 1x Sombria              |   20    | Alvo não consegue mentir deliberadamente por 10 minutos (**Teste Global de [Mental] + [Resistência] + [Nível]** vs **DC Lendária** nega). |
|  **Mestre**   | **Sangue de Berserker** | 3x Mineral + 1x Sombria              |   24    | +4 Físico, +10 HP Temp. Você ataca a criatura mais próxima (amigo ou inimigo).                                                            |
| **Lendário**  | **Vida Eterna**         | 5x Vital + 1x Escama de Dragão (Cat) |   30    | Reseta a idade biológica para 20 anos.                                                                                                    |

---

## ?? 5. Encantamento Ritualístico (Exige: Vinculação Rúnica)

Encantar é forçar a magia a habitar um objeto inanimado. O universo resiste a isso.

### 5.1 O Ritual de Vinculação

Para prender uma Runa num objeto, você precisa de um **Catalisador de Poder** (uma parte de uma criatura mágica) que corresponda à natureza da runa.

**Tabela de Catalisadores por Runa:**

| Runa          | Tipo  | Catalisador Necessário (Exemplos)                                  |
| :------------ | :---: | :----------------------------------------------------------------- |
| **Ignis**     | Fogo  | Glândula de Dragão, Coração de Salamandra, Cinzas de Fênix.        |
| **Aequor**    | Água  | Pérola de Sereia, Escama de Leviatã, Água de Elemental Puro.       |
| **Vitae**     | Vida  | Sangue de Troll (Regeneração), Presa de Vampiro (Roubo).           |
| **Fulgur**    | Raio  | Chifre de Behir (Azul), Núcleo de Golem de Ferro.                  |
| **Terra**     | Terra | Coração de Gárgula, Diamante Bruto, Pó de Minhoca Púrpura.         |
| **Velocitas** | Vento | Pluma de Grifo Real, Essência de Djinn, Poeira de Estrela Cadente. |
| **Lux**       |  Luz  | Chifre de Unicórnio, Fragmento de Anjo, Metal Estelar.             |

### 5.2 Estabilidade e Falha (Ressonância)

| O ato de encantar                        | Raridade do Insumo               | Teste (Mental + Sobrevivência)    | Exemplo |
| :--------------------------------------- | :------------------------------- | :-------------------------------- | ------- |
| Urbano/Rural                             | **Teste Global (DC 10 + Nível)** | Ervas comuns, Couro               |
| Exótico                                  | **Teste Global (DC 15 + Nível)** | Ervas raras, Sangue de Fera       |
| Planar/Lendário                          | **Teste Global (DC 20 + Nível)** | Pó de Estrela, Essência de Dragão |
| Etérico/Eldritch                         | **Teste Global (DC 25 + Nível)** | Sangue de Deus, Coração de Titã   |
| Energia + Item Destruído + Atordoamento. |

- **Sucesso:** A runa se fixa. O item é mágico.
- **Falha (margem < 5):** O Catalisador é consumido, mas a runa não se fixa. O item sobrevive.
- **Falha Crítica (margem > 5 do DC):** **Ressonância Etérica.** A energia explode violentamente. O artífice sofre o dano listado acima.

### 5.3 Transferência e Purificação

Remover uma runa para colocar em outro lugar exige "Sal de Purificação" (Custo 50 Ouro). O processo leva 1 hora e devolve a Runa como uma "Pedra Rúnica" inerte, pronta para ser inserida em outro slot sem gastos extras.

---

## ?? 6. Manufatura de Itens de Éter (Exige: Engenharia de Éter)

A criação de implementos mágicos é uma arte de precisão. Um erro de cálculo transforma uma varinha em uma granada de mão.

### 6.1 Varinhas (O Revólver Mágico)

Varinhas armazenam **Cargas** de uma magia específica.

- **Custo Base do Chassi:** 20 Ouro (Madeira condutiva como Freixo ou Carvalho).
- **Processo de Imbuição:**
  1. O Artífice deve ser capaz de lançar a magia que deseja gravar (ou ter um pergaminho dela).
  2. Durante a criação, ele deve gastar o EE correspondente à magia todos os dias.
- **Custo de Carga:** Cada Carga custa **50 Ouro x Círculo da Magia** em pó de cristais.
  - _Exemplo:_ Varinha de _Mísseis Mágicos_ (Círculo 1) com 5 Cargas = 20 (Base) + 250 (5x50) = 270 Ouro.

### 6.2 Cajados (A Bateria de Éter)

Cajados armazenam **Energia Etérica (EE)** bruta. A capacidade dpende da qualidade do núcleo.

- **Núcleo de Madeira (Comum):** Armazena **1 EE**. (Custo: 10 Ouro).
- **Núcleo de Cristal (Incomum):** Armazena **3 EE**. (Custo: 200 Ouro).
- **Núcleo de Metal Estelar (Raro):** Armazena **5 EE**. (Custo: 1.000 Ouro).
- **Habilidade de Drenar:** O cajado só funciona se o usuário realizar o ritual de sintonização.
- _Custo:_ O mago deve sacrificar **EE igual à capacidade do cajado** todos os dias, por 1 semana (ex: 5 EE/dia para um cajado de Metal Estelar).
  - _Efeito:_ Isso "acorda" o núcleo e vincula o item à aura do mago.

### 6.3 Orbes (O Capacitor Mental)

Orbes seguram a **Concentração** de uma magia.

- **Requisito:** Exige uma gema perfeita e sem falhas. Se houver micro-fissuras, a mente do mago colapsa.
- **Custo:** O valor da gema bruta deve ser no mínimo **100 Ouro**.
- **Lapidação:** Exige um teste de Artífice (DC 20) para polir a gema na geometria mental correta.
- **Falha:** Se o artífice falhar no teste de criação por 5 ou mais, a gema estilhaça.

### 6.4 Grimórios (O Arquivo)

Grimórios facilitam Rituais e troca de memórias.

- **Encadernação:** 25 Ouro (Couro tratado, papel de linho, fechos de ferro frio).
- **Transcrição:** O custo de criar ou comprar depende das magias contidas.
  - _Custo de Escrita:_ **50 Ouro x Círculo**.
  - _Valor de Mercado:_ Use a tabela abaixo para avaliar grimórios encontrados.

| Círculo da Magia | Valor de Mercado (un) |
| :--------------: | :-------------------: |
|  **0 (Truque)**  |        10 Ouro        |
|      **1**       |        50 Ouro        |
|      **2**       |       100 Ouro        |
|      **3**       |       150 Ouro        |
|      **4**       |       200 Ouro        |
|      **5+**      | +50 Ouro por Círculo  |

- _Exemplo:_ Um grimório com _Bola de Fogo (C3)_ e _Voo (C3)_ vale: 25 (Livro) + 150 + 150 = **325 Ouro**.

---

## ??? 7. Criação de Armaduras (Exige: Forja de Guerra)

Assim como armas, armaduras têm um orçamento.

- **Leve:** 2 Pontos.
- **Média:** 3 Pontos (Max Físico ou Mental aplicável na CA limitado a +2).
- **Pesada:** 4 Pontos (Sem bônus de Eixo na CA, Penalidade de Movimento -1.5m).

### Tabela de Propriedades de Armadura

| Propriedade          |   Custo    | Notas                                                  |
| :------------------- | :--------: | :----------------------------------------------------- |
| **CA Base +1**       |     1      | Aumenta a proteção. Limitado pelo Tipo.                |
| **Tag: Camuflada**   |     1      | Pode ser escondida sob roupas.                         |
| **Tag: Leve**        |     1      | Remove penalidade de Atletismo (só para Média/Pesada). |
| **Tag: Reforçada**   |     2      | Reduz dano Crítico.                                    |
| **Tag: Mão Livre**   |     1      | Apenas para Escudos.                                   |
| **Tag: Cobertura**   |     2      | Apenas Escudos. Fornece cobertura a aliados.           |
| **Defeito: Ruidosa** | +1 (Ganha) | **-2 de Penalidade** em Furtividade.                   |

**Exemplo:** _Criando uma "Armadura de Gladiador"._
É Armadura Leve (2 Pontos).

- Compro CA +2 (2 Pontos).
- Total: CA +2 (Igual a Couro).
- _Posso adicionar Defeito Ruidosa (+1 pt) para comprar "Reforçada"._

---

## ⚙️ 8. Conserto e Manutenção

Itens em Pandorha sofrem desgaste através de combates intensos, falhas críticas ou como parte de um "Sucesso com Custo" (Cap. 00).

### 8.1 O Teste de Reparo

Para devolver as propriedades totais de um item danificado ou quebrado, o personagem deve realizar um trabalho de manutenção técnica.

- **Teste:** `[Global] Mental + Interação + Nível` vs **DC de Criação do Item**.
- **Ferramentas:** Requer Kit de Reparo ou Oficina apropriada. Sem ferramentas, o teste sofre **-4 de penalidade**.

### 8.2 Custos e Tempo

O custo de materiais e o tempo de trabalho dependem da gravidade do dano.

| Estado do Item                | Custo de Material | Tempo Base |
| :---------------------------- | :---------------: | :--------: |
| **Danificado** (-1 em testes) |   10% do Valor    |  4 Horas   |
| **Quebrado** (Inutilizável)   |   30% do Valor    |   1 Dia    |
| **Destruído** (Item Raro+)    |   50% do Valor    |   3 Dias   |

> [!TIP]
> **Artífice de Ferro (Humanos):** Reduz o tempo de trabalho de reparo pela metade.

### 8.3 Reparos em Itens Mágicos

Consertar itens com **Runas** ou **Encantamentos** exige que o artífice possua o talento correspondente (**Vinculação Rúnica** ou **Engenharia de Éter**). Se o reparo de um item mágico resultar em uma **Falha Crítica**, a Runa acoplada pode ser permanentemente danificada.
