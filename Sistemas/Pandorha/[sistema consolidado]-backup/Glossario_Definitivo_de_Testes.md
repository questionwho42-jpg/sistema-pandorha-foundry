# Pandorha: Compêndio Maestro de Testes e Mecânicas (Edição Definitiva e Extensa)

Este documento é o repositório central de todas as regras de resolução de ações do sistema Pandorha. Ele foi desenhado para ser exaustivo, eliminando a necessidade de consultar outros manuais para entender o funcionamento de qualquer teste.

---

## 🏗️ 1. O Motor Sistêmico (Como os Dados Funcionam)

### 1.1 A Fórmula do Teste Global (Universal)

Toda e qualquer ação que envolva incerteza em Pandorha é resolvida por um Teste Global.
**Resultado = [d20] + [Nível Global] + [Eixo] + [Aplicação] + [Bônus de Item/Treinamento]**

- **Nível Global:** Soma-se o nível total do personagem (1-20). Isso representa a competência básica de quem vive em um mundo permeado por Éter.
- **Eixo (Físico, Mental ou Social):** Representa a natureza do esforço (corpo, mente ou alma).
- **Aplicação (Conflito, Interação ou Resistência):** Representa o objetivo da ação (agressão, utilidade ou defesa).
- **Penalidade de Destreino:** Se você realizar um teste em algo que não possui Treinamento (Armas, Perícias ou Ofícios), sofre uma penalidade fixa de **-4**.

### 1.2 Os 4 Graus de Sucesso (A Margem de 10)

O sucesso em Pandorha não se resume a "passar ou falhar". A qualidade do resultado depende da distância em relação à DC (Classe de Dificuldade).

1.  **Sucesso Crítico (Passou por 10 ou mais):**
    - O efeito base é **dobrado** (Dano, Cura, Movimento).
    - Gera efeitos secundários descritos na manobra (ex: derrubar, atordoar).
    - _Nota Especial:_ Um "20 Natural" garante o acerto, mas só é Crítico se a matemática final atingir a margem de +10.
2.  **Sucesso (Igualou ou Superou a DC):**
    - O personagem realiza a ação conforme o esperado.
3.  **Sucesso com Custo (Falhou por 1 a 4 pontos):**
    - O Mestre oferece um pacto narrativo/mecânico. Você consegue o objetivo, mas sofre uma complicação imediata:
      - Receber uma Condição (Exposto, Lento).
      - Dano em um item ou quebra de ferramenta.
      - Atrair a atenção de inimigos próximos.
4.  **Falha (Falhou por 5 ou mais pontos):**
    - A ação falha completamente. Em magias, pode gerar um _Feedback Arcano_ (Dano mental para o conjurador).

### 1.3 Economia de Ações e MAP

Cada turno de combate concede **3 Ações [A]** e **1 Reação [R]**.
Se o personagem utilizar múltiplas ações de ataque no mesmo turno, aplica-se a **Penalidade de Ataque Múltiplo (MAP)**:

- **1º Ataque:** Bônus normal.
- **2º Ataque:** **-5** (ou **-4** se a arma/manobra for _Ágil_).
- **3º Ataque:** **-10** (ou **-8** se a arma/manobra for _Ágil_).

---

## 🛡️ 2. Defesas, Dificuldades e Resistências

### 2.1 A DC Passiva (Calculando a Defesa)

Para calcular a dificuldade de um inimigo resistir a você (ou você a ele), usa-se a DC Passiva:
**DC Passiva = 10 + [Nível] + [Eixo] + [Aplicação]**

- **CA (Armadura):** 10 + Nível + Físico + Resistência + Bônus de Armadura.
- **Vontade Passiva:** 10 + Nível + Mental + Resistência.
- **Percepção Passiva:** 10 + Nível + Mental + Interação.

### 2.2 DC da Fonte de Poder (Magia e Habilidades)

Para efeitos que exigem que o alvo role um teste de resistência:
**DC da Fonte = 10 + [Nível] + [Eixo] + [Aplicação]**

- _Exemplo (Magia de Ataque):_ 10 + Nível + Mental + Conflito.
- _Exemplo (Manobra Social):_ 10 + Nível + Social + Conflito.

### 2.3 Testes de Resistência Ativos (Saves)

Geralmente ocorrem no final do turno do personagem para encerrar condições:

- **Físico + Resistência + Nível:** Para encerrar Veneno, Sangramento, Enfermidades.
- **Mental + Resistência + Nível:** Para encerrar Medo, Confusão, Hipnose.
- **Social + Resistência + Nível:** Para encerrar Coações, Insultos ou Pressão Social.

### 2.4 O Teste de Morte (Estado Moribundo)

Quando os HPs chegam a 0, o personagem cai Inconsciente e Moribundo. No início de cada turno, ele deve realizar o teste:
**Check: [Físico] + [Resistência] + [Nível] vs Própria DC Passiva de Resistência.**

- **Sucesso:** Acumula 1 Sucesso. Com 3 Sucessos, o personagem estabiliza em 0 HP.
- **Falha:** Acumula 1 Falha. Com 3 Falhas, o personagem morre definitivamente.
- **Crítico (20 Natural):** Estabiliza e recupera 1 HP imediatamente.

---

## ⚔️ 3. A Enciclopédia de Manobras (Texto Integral)

Abaixo, cada uma das 90 manobras fundamentais do sistema descritas em detalhes.

### 🔴 3.1 QUADRANTE FÍSICO + CONFLITO (Agressão)

1.  **Golpe de Impacto [A]:** Dano da arma + Empurrão 1,5m. Crítico: Dano x2 + Caído.
2.  **Investida Brutal [AA]:** Requer 3m de linha reta. Dano da arma + bônus por distância. Crítico: Atordoado.
3.  **Quebrar Postura [A]:** Alvo fica Exposto (CA -2) por 1 rodada. Crítico: Exposto pela Cena.
4.  **Varredura de Pernas [A]:** vs Físico+Resistência. Alvo fica Caído. Crítico: Caído e Atordoado.
5.  **Desarmar Técnico [AA]:** vs Físico+Resistência. Arma cai a 1,5m. Crítico: Você captura a arma.
6.  **Ataque em Arco [AAA]:** Ataca até 3 inimigos adjacentes. Crítico: Dano x2 em todos.
7.  **Golpe no Ponto Vital [AA]:** vs CA+4. Ignora RD do alvo. Crítico: Sangrando (1d6/turno).
8.  **Finta Marcial [A]:** vs Mental+Resistência. Próximo ataque ganha +4. Crítico: Próximo acerto é Crítico automático.
9.  **Contra-Escudo [R]:** Gatilho: Receber ataque. Reduz dano em 5 e empurra 1,5m. Crítico: Dano zero + Caído.
10. **Execução Final [AAA]:** Gatilho: Alvo < 25% HP. Dano x3. Crítico: Morte instantânea.

### 🏃 3.2 QUADRANTE FÍSICO + INTERAÇÃO (Proezas)

1.  **Salto de Força [A]:** Distância = (Teste / 3) metros. Crítico: Distância x2 + Ataque Aéreo.
2.  **Corrida de Parede [A]:** Move 6m vertical/horizontal. Crítico: Ganha Reação [R] extra.
3.  **Arremesso de Objeto [A]:** Dano 1d6 + Mod físico. Crítico: Atordoado.
4.  **Escapar de Prensa [A]:** Remove Agarrado/Imobilizado. Crítico: Move 1,5m sem AO.
5.  **Manobra de Equilíbrio [A]:** Atravessa superfícies difíceis. Crítico: Move x2 sem AO.
6.  **Escalada Veloz [A]:** Move 100% da velocidade. Crítico: +2 CA contra ataques de baixo.
7.  **Nado de Combate [A]:** Sem penalidade na água. Crítico: +3m de nado e respiração x2.
8.  **Queda Controlada [F]:** Reduz dano de queda em 10 e cai de pé. Crítico: Dano zero.
9.  **Arrombamento Bruto [A]:** Destrói objetos. Crítico: Abre silenciosamente.
10. **Intimidar Muscular [A]:** vs Social+Resistência. Alvo Abalado. Crítico: Revela informação por pavor.

### 🛡️ 3.3 QUADRANTE FÍSICO + RESISTÊNCIA (Dureza)

1.  **Resistir ao Óbito [R]:** Gatilho: 0 HP. Fica com 1 HP. Crítico: Fica com 1 HP + 1 PV.
2.  **Pele de Ferro [Passiva]:** RD 1 permanente contra dano físico. Crítico (Evolução): RD 2.
3.  **Fôlego de Retomada [AAA]:** Cura 1d8+Nível. Crítico: Cura máxima + remove condição.
4.  **Ignorar Dor [R]:** Gatilho: Receber dano. Reduz dano em 1d10+Físico. Crítico: Dano zero.
5.  **Pulmões de Aço [Passiva]:** Respiração x3. Imune a gases por 5 min.
6.  **Purificação Biológica [AAA]:** Encerra Envenenado/Sangrando. Crítico: Cura 5 HP.
7.  **Estreito de Couraça [Passiva]:** Ignora 50% da penalidade de movimento de armaduras.
8.  **Grito de Vigor [AAA]:** Aliados ganham 5 HP temporários. Crítico: 10 HP Temporários.
9.  **Metabolismo Hiper-Acelerado [Passiva]:** Cura x2 em descansos. Estanca Sangrando em 1R.
10. **Sacrifício do Vanguarda [R]:** Recebe dano por aliado adjacente. RD 3 fixa. Crítico: RD = Físico.

### 🔮 3.4 QUADRANTE MENTAL + CONFLITO (Feitiçaria)

1.  **Seta de Éter [AA]:** 1d10+4 dano (Ignora CA). Crítico: + Status Confuso.
2.  **Explosão de Éter [AAA]:** 4d6 fogo em área. Crítico: 8d6 + Em Chamas.
3.  **Prisão Psíquica [AA]:** Alvo não faz ações de Conflito por 1R. Crítico: Incapacitado.
4.  **Lógica Corrosiva [AA]:** vs Social+Resistência. -2 em testes mentais por 10 min. Crítico: Abalado.
5.  **Empurrão Telecinético [A]:** Empurra 3m. Crítico: 6m + Caído.
6.  **Escudo Mental Reativo [R]:** +4 resistência contra magia. Crítico: Reflete a magia.
7.  **Cópia Ilusória [AA]:** 50% de chance de erro contra você por 1 min. Crítico: 3 cópias.
8.  **Pulso Estático [A]:** 1d6 elétrico + Alvo perde Reação. Crítico: Atordoado.
9.  **Romper Trama [AA]:** Encerra magia ativa. Crítico: Recupera 1 EA.
10. **Sugestão Imediata [AAA]:** vs Mental+Resistência. Alvo faz 1 ação [A] solicitada. Crítico: Comando por 1R.

### 👁️ 3.5 QUADRANTE MENTAL + INTERAÇÃO (Sentidos)

1.  **Detecção Aguçada [A]:** vs Furtividade. Localiza inimigos. Crítico: +2 em testes contra o alvo.
2.  **Reconstrução de Cena [A]:** Deduz eventos passados. Crítico: Identifica rastro de éter.
3.  **Escuta à Distância [A]:** Ouve a 30m. Crítico: Discernir intenção emocional.
4.  **Analisar Aura [A]:** Identifica círculo/escola de efeito mágico. Crítico: Identifica conjurador.
5.  **Orientar Geográfica [A]:** Impede grupo de se perder. Crítico: Tempo de viagem -20%.
6.  **Detector de Micro-expressões [A]:** vs Social+Resistência. Detecta mentira. Crítico: Detecta o que foi omitido.
7.  **Foco de Vigilante [AA]:** +4 contra um alvo específico. Crítico: Ignora camuflagem por 3R.
8.  **Decifrar Criptografia [A]:** Traduz textos/runas. Crítico: Aprende segredo associado.
9.  **Rastreio de Éter [A]:** Segue resquícios de conjuração. Crítico: Sabe há quanto tempo foi lançada.
10. **Puxar Conhecimento [A]:** Recorda fato relevante. Crítico: Recorda fraqueza mecânica.

### 🧠 3.6 QUADRANTE MENTAL + RESISTÊNCIA (Vontade)

1.  **Muralha Psíquica [F]:** Imune a Medo/Confusão por 1R. Crítico: Imune pela Cena.
2.  **Meditação Acelerada [AAA]:** Recupera 1 EA ou encerra Atordoado. Crítico: Recupera 2 EA.
3.  **Hiper-Concentração [AA]:** Ignora penalidades de dor/ruído. Crítico: Mantém 2 magias por 1R.
4.  **Memória Fotográfica [A]:** Recorda perfeitamente imagem/texto. Crítico: Detecta alteração de memória.
5.  **Blindagem de Interrogatório [R]:** vs Social+Conflito. Silêncio absoluto. Crítico: Planta mentira.
6.  **Hibernação [AAA]:** Consumo biológico 10x menor. Crítico: Estanca Veneno/Sangrando.
7.  **Filtro Arcano [F/R]:** Anula Feedback Arcano. Crítico: Feedback vira +1 EA.
8.  **Detecção Lógica Passiva [Passiva]:** Nota contradições. +2 contra mentira. Crítico: Ganha Reação extra.
9.  **Purificação Mental [A]:** Encerra Confuso/Atordoado. Crítico: +2 bônus na próxima ação.
10. **Aceleração Sináptica [AAA]:** Ganha +1 Ação no próximo turno. Crítico: +2 Ações.

### 🎭 3.7 QUADRANTE SOCIAL + INTERAÇÃO (Influência)

1.  **Senso de Grupo [AA]:** Melhora atitude NPC em 1 grau. Crítico: 2 graus + favor.
2.  **Charme Místico [AA]:** vs Mental+Resistência. Alvo não ataca por 10 min. Crítico: Aliado pela cena.
3.  **Negociação de Margem [AA]:** Preço +- 10%. Crítico: Preço +- 25%.
4.  **Etiqueta da Corte [A]:** Acesso a setores restritos. Crítico: Confundido com Alta Nobreza.
5.  **Oratória de Palanque [AAA]:** Aliados ganham +2 Resistência por 1h. Crítico: +5 HP Temporário.
6.  **Rede de Fofocas [AA]:** Boato se espalha em 1d4 horas. Crítico: Boato vira "Fato de Vila".
7.  **Olhar Intrigante [A]:** Alvo foca apenas em você por 1R. Crítico: Alvo move em sua direção.
8.  **Lisonja Venenosa [A]:** Próxima coação ganha +2 de bônus. Crítico: Alvo solta segredo.
9.  **Camuflagem de Plebeu [AA]:** Integra-se a grupo social sem ser notado. Crítico: Aceito como veterano.
10. **Contrato de Éter [AAA]:** Cria pacto. Quebrar gera condição Maldito. Crítico: Quebrar causa 50% HP dano.

### ⚔️ 3.8 QUADRANTE SOCIAL + CONFLITO (Imposição)

1.  **Ameaça Gélida [A]:** Alvo Aterrorizado por 1R. Crítico: 1 minuto + foge.
2.  **Ordem Autoritária [AA]:** vs Social+Resistência. Alvo faz tarefa simples. Crítico: Tarefa arriscada.
3.  **Domínio de Massa [AAA]:** 5 inimigos ficam Expostos (CA -2). Crítico: Rendição instantânea.
4.  **Interrogatório Bruto [AA]:** Resposta honesta (Sim/Não). Crítico: Confissão integral.
5.  **Provocação de Duelo [A]:** vs Mental+Resistência. Alvo foca apenas em você. Crítico: Alvo em Ira (-4 penalidade).
6.  **Grito de Avanço [A]:** Aliado ganha 1 movimento extra [A] como Reação. Crítico: Ganha 1 Ataque.
7.  **Desmoralizar Próximo [A]:** -2 em testes do alvo por 1 min. Crítico: Perda de 1 ação por hesitação.
8.  **Ultimato Velado [AA]:** Requer prova/segredo. Alvo abandona cena. Crítico: Alvo vira informante.
9.  **Colisão de Vontades [AAA]:** Duelo direto. Perdedor Incapacitado por 1R. Crítico: 0 HP Mental.
10. **Choque Exemplar [AAA]:** Gatilho: Matar inimigo. Inimigos em volta fogem. Crítico: Incapacitados por 2R.

### 🛡️ 3.9 QUADRANTE SOCIAL + RESISTÊNCIA (Compostura)

1.  **Face de Mármore [F]:** Imunidade a detecção de mentiras. Crítico: Projeta intenção falsa.
2.  **Vácuo de Insulto [R]:** vs Intimidação. Anula Medo. Crítico: Atacante fica Exposto.
3.  **Estoicismo Corporal [Passiva]:** +2 vs Tortura/Dor. Crítico: Cura 1 PV ao resistir.
4.  **Camuflagem de Massa [A]:** Não pode ser alvo enquanto houver aliados perto. Crítico: Inimigos te ignoram.
5.  **Filtro de Corrupção [F]:** Anula suborno/sedução. Crítico: Alvo te dá um item por admiração.
6.  **Silêncio Dominante [A]:** Interrompe discursos de NPCs menores. Crítico: Alvos ficam Confusos.
7.  **Redenção Mental [AAA]:** Encerra Remorso/Culpa mágica. Crítico: Recupera Vitalidade Mental.
8.  **Blindagem Anti-Charme [R]:** vs Hipnose. Anula efeito. Crítico: Atacante fica Devotado.
9.  **Estabilização Emocional [F]:** Ignora penalidades de ferimento em testes sociais. Crítico: +2 bônus em HP baixo.
10. **Grito de Resgate [R]:** Gatilho: Aliado cai a 0 HP. Ele levanta com 1 HP. Crítico: Aliado recupera HP base.

---

## 🎲 4. Testes Globais de Perícias (Mapeamento)

As perícias mundanas são interpretadas através das combinações de matriz:

- **Furtividade (Física):** Físico + Interação (Esconder em sombras, mover-se sem ruído).
- **Furtividade (Mágica):** Mental + Conflito (Camuflagem óptica, distorção de éter).
- **Percepção:** Mental + Interação (Nota detalhes, ouvir conversas).
- **Ladinagem:** Físico + Interação (Abrir cofres, bater carteiras).
- **Medicina:** Mental + Interação (Tratamento de feridas, anatomia).
- **História/Arcanismo:** Mental + Interação (Uso da manobra 510. Puxar Lore).
- **Atletismo:** Físico + Interação (Escalar, saltar, nadar).
- **Intimidação:** Social + Conflito (Coação direta) ou Físico + Interação (Muscular).
- **Persuasão:** Social + Interação (Argumentação lógica e charme).
- **Adestramento:** Social + Interação (Conexão empática com animais).

---

## 🔮 5. Regras Adicionais de Rolagem

### 5.1 Concentração

Ao manter uma magia de duração, sofrer dano exige um teste de **Mental + Resistência + Nível**.

- **DC:** 10 ou Metade do Dano recebido (o que for maior).
- **Falha:** A magia termina instantaneamente.

### 5.2 Testes de Concentração em Área

Se o ambiente for caótico (terremoto, tempestade), o Mestre pode exigir um teste de Concentração com DC baseada no Tier (15-25).

### 5.3 Sucesso Passivo

Em situações sem pressão e com tempo, o Mestre pode considerar que o jogador obteve um resultado de **10 + Seus Bônus**, sem necessidade de rolar o dado.
