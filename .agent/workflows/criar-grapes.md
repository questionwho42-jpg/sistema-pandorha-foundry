---
description: Workflow avançado de construção de mundo usando o método G.R.A.P.E.S. (Geografia, Religião, Realizações, Política, Economia, Sociedade).
---

# 🍇 Construtor de Civilizações (G.R.A.P.E.S.)

Este workflow guia o usuário na criação profunda de locais e sociedades, garantindo que nada seja esquecido.

1.  **Carregar Matriz Mental**
    - Ler Skill: `view_file .agent/skills/grapes-method.md`
    - Ler Regras: `view_file .agent/rules/grapes-rules.md`

2.  **Definir Alvo**
    - Pergunte ao usuário: "Qual local ou sociedade estamos construindo hoje?" (ex: Magnacrom, Tribo do Deserto, Guilda dos Ladrões).
    - Pergunte: "Qual o diretório onde os arquivos residem ou residirão?"

3.  **Análise de Lacunas (The Gap Analysis)**
    - Liste os arquivos do diretório alvo (`list_dir`).
    - Leia os arquivos existentes (`view_file`) para entender o que já foi criado.
    - Crie um **Checklist Mental G.R.A.P.E.S.** e identifique o que falta. (ex: Temos Geografia e Política, mas faltam Economia e Religião).

4.  **O Ciclo da Criação (Repetir para cada letra faltante)**
    Para cada letra do G.R.A.P.E.S. que precisa ser desenvolvida:

    #### A. Sugestões e Conexões
    - Com base na Skill e nas Regras, gere **3 Ideias/Conceitos** para este pilar que se conectem com o que já existe.
    - _Exemplo:_ "Se a Geografia é um vulcão (G), a Religião (R) pode adorar o Fogo ou temer a Erupção."

    #### B. A Entrevista Profunda (10 Perguntas)
    - Faça 10 perguntas específicas sobre este pilar para o usuário.
    - Use as perguntas da Skill `grapes-method.md` como base, mas adapte ao contexto.
    - _Dica:_ Pergunte sobre detalhes sensoriais e conflitos.

    #### C. Materialização
    - Compile as respostas em um texto estruturado.
    - Adicione este conteúdo ao arquivo principal do local ou crie um arquivo específico (ex: `Magnacrom_Economia.md`) se o conteúdo for extenso.

5.  **Validação Final**
    - Verifique se a "Teia de Conexões" está sólida (revisar `grapes-rules.md`).
    - Pergunte ao usuário se ele quer refinar alguma área ou avançar para criar NPCs/Ganchos de Aventura baseados nesse cenário.
