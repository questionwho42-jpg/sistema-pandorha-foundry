/**
 * TABLES.JS — Banco de Dados de Conteúdo
 * Forja de Aventuras | Sistema Pandorha
 */

const ForgeTables = (() => {
  const CENARIOS = {
    morden: {
      nome: "Morden, O Bastião da Tempestade",
      clima: "Industrial subterrâneo, neve externa",
      tema: "morden",
      conflitos: [
        {
          id: "sincope",
          nome: "Síncope da Vontade",
          desc: "Contágio biótico ameaça transformar todos em escravos da Floresta.",
        },
        {
          id: "sabotagem",
          nome: "Sabotagem Interna",
          desc: "Alguém nas Legiões está destruindo as defesas por dentro.",
        },
        {
          id: "colapso",
          nome: "Colapso do Bastião",
          desc: "As runas que sustentam Morden estão falhando.",
        },
      ],
      faccoes: [
        "Guilda dos Artífices",
        "Inquisição da Pureza",
        "Legião Leste",
        "Teia da Viúva",
      ],
      mecanicasCenario: [
        "Válvulas de vapor (fechar reduz CA do inimigo)",
        "Elevador em queda (teste de Físico ou cai)",
        "Dutos de seiva (terreno difícil + dano ácido)",
        "Pilares rúnicos (destruir desativa escudos)",
      ],
      atmosfera: {
        inicio: {
          visao: "Runas azuis piscam nas paredes de adamante",
          som: "Ronco de engrenagens e marretas",
          cheiro: "Metal oxidado e suor",
          tato: "Calor úmido e opressivo",
          paladar: "Gosto metálico no ar",
        },
        meio: {
          visao: "Luzes verdes infiltram-se nas paredes",
          som: "Sussurros entre as máquinas",
          cheiro: "Flores em decomposição",
          tato: "Arrepios involuntários",
          paladar: "Amargor de esporos",
        },
        climax: {
          visao: "Raízes perfuram o adamante, brilho esmeralda total",
          som: "Rugido da montanha rachando",
          cheiro: "Ozônio queimado e seiva podre",
          tato: "Vibração constante no chão",
          paladar: "Bile e desespero",
        },
      },
    },
    almar: {
      nome: "Almar, O Porto Dourado",
      clima: "Costeiro tropical, brisa marítima",
      tema: "almar",
      conflitos: [
        {
          id: "piratas",
          nome: "Invasão Pirata",
          desc: "Uma frota pirata cerco o porto.",
        },
        {
          id: "contrabando",
          nome: "Rede de Contrabando",
          desc: "Mercadorias proibidas infiltram a cidade.",
        },
        {
          id: "tempestade",
          nome: "Tempestade Arcana",
          desc: "Uma tempestade sobrenatural ameaça destruir o litoral.",
        },
      ],
      faccoes: [
        "Conselho Mercante",
        "Irmandade do Sal",
        "Guarda Portuária",
        "Culto da Maré",
      ],
      mecanicasCenario: [
        "Convés balançando (teste de equilíbrio a cada rodada)",
        "Barris de pólvora (acertar causa explosão em área)",
        "Cordames (escalar para vantagem tática)",
        "Maré subindo (área diminui a cada 3 rodadas)",
      ],
      atmosfera: {
        inicio: {
          visao: "Sol dourado reflete na água cristalina",
          som: "Gaivotas e pregões de mercadores",
          cheiro: "Sal, especiarias e peixe fresco",
          tato: "Brisa quente e úmida",
          paladar: "Sal nos lábios",
        },
        meio: {
          visao: "Nuvens escurecem o horizonte",
          som: "Tambores de guerra ao longe",
          cheiro: "Pólvora e madeira queimada",
          tato: "Vento cortante",
          paladar: "Ferro e adrenalina",
        },
        climax: {
          visao: "Relâmpagos arcanos cortam o céu verde",
          som: "Trovões e urros de criaturas marinhas",
          cheiro: "Ozônio e algas podres",
          tato: "Chuva ácida na pele",
          paladar: "Água salgada e bile",
        },
      },
    },
    cinar: {
      nome: "Cinar, A Floresta Ancestral",
      clima: "Floresta temperada, neblina constante",
      tema: "cinar",
      conflitos: [
        {
          id: "corrupcao_natural",
          nome: "Corrupção da Raiz-Mãe",
          desc: "A árvore ancestral está apodrecendo por dentro.",
        },
        {
          id: "caca",
          nome: "A Grande Caçada",
          desc: "Uma criatura primordial despertou e caça tudo que se move.",
        },
        {
          id: "pacto",
          nome: "Pacto Quebrado",
          desc: "O acordo entre mortais e espíritos foi violado.",
        },
      ],
      faccoes: [
        "Círculo dos Druidas",
        "Caçadores da Névoa",
        "Povo das Copas",
        "Corte Feérica",
      ],
      mecanicasCenario: [
        "Raízes vivas (agarram personagens, teste para escapar)",
        "Copas densas (escuridão mágica, Desvantagem em ataques à distância)",
        "Cogumelos explosivos (pisar ativa nuvem de esporos)",
        "Rio turbulento (separar o grupo, teste de natação)",
      ],
      atmosfera: {
        inicio: {
          visao: "Raios de sol filtrados por folhagem esmeralda",
          som: "Pássaros e riachos distantes",
          cheiro: "Terra úmida e musgo",
          tato: "Brisa fresca entre as árvores",
          paladar: "Ar puro e fresco",
        },
        meio: {
          visao: "Neblina densa fecha a visão a 10 metros",
          som: "Silêncio perturbador, galhos quebrando",
          cheiro: "Putrefação doce",
          tato: "Umidade pegajosa na pele",
          paladar: "Amargo de seiva",
        },
        climax: {
          visao: "Árvores se movem, olhos brilham na escuridão",
          som: "Uivo do vento como vozes",
          cheiro: "Decomposição e pólen venenoso",
          tato: "Raízes pulsando sob os pés",
          paladar: "Terra e sangue",
        },
      },
    },
    draskar: {
      nome: "Draskar, As Terras de Fogo",
      clima: "Vulcânico, calor extremo",
      tema: "draskar",
      conflitos: [
        {
          id: "dragao",
          nome: "Despertar do Dragão",
          desc: "Um dragão ancestral acorda nas profundezas do vulcão.",
        },
        {
          id: "guerra_clas",
          nome: "Guerra dos Clãs",
          desc: "Dois clãs guerreiros disputam o controle da forja primordial.",
        },
        {
          id: "erupcao",
          nome: "A Grande Erupção",
          desc: "O vulcão está prestes a entrar em erupção catastrófica.",
        },
      ],
      faccoes: [
        "Clã da Escama Vermelha",
        "Forjadores de Obsidiana",
        "Sacerdotes da Chama",
        "Nômades das Cinzas",
      ],
      mecanicasCenario: [
        "Lava fluindo (dano massivo, terreno impassável)",
        "Jatos de vapor (dano de fogo em área aleatória)",
        "Ponte de obsidiana (rachando, limite de peso)",
        "Cinzas vulcânicas (visibilidade reduzida, sufocamento)",
      ],
      atmosfera: {
        inicio: {
          visao: "Montanhas negras contra céu laranja",
          som: "Ronco distante do vulcão",
          cheiro: "Enxofre e cinzas",
          tato: "Calor seco que queima a pele",
          paladar: "Cinza e ferro",
        },
        meio: {
          visao: "Rios de lava iluminam cavernas",
          som: "Estalos de rocha e rugidos",
          cheiro: "Metal fundido e fumaça",
          tato: "Chão tremendo",
          paladar: "Fuligem grossa",
        },
        climax: {
          visao: "Céu vermelho, chuva de cinzas",
          som: "Explosões e gritos de dragão",
          cheiro: "Carne queimada e enxofre puro",
          tato: "Onda de calor insuportável",
          paladar: "Sangue e fogo",
        },
      },
    },
    dungard: {
      nome: "Dungard, A Fortaleza Subterrânea",
      clima: "Subterrâneo, cristais bioluminescentes",
      tema: "dungard",
      conflitos: [
        {
          id: "invasao_profunda",
          nome: "Invasão das Profundezas",
          desc: "Criaturas do subsolo começaram a atacar os salões.",
        },
        {
          id: "gema",
          nome: "A Gema Corrompida",
          desc: "Uma gema primordial foi desenterrada e emana loucura.",
        },
        {
          id: "traicao_anoes",
          nome: "Traição no Conselho",
          desc: "Um líder anão fez pacto com entidades proibidas.",
        },
      ],
      faccoes: [
        "Conselho dos Anciãos",
        "Guilda dos Mineradores",
        "Ordem dos Runesmiths",
        "Exploradores do Abismo",
      ],
      mecanicasCenario: [
        "Desabamento (rochas caem, dano + bloqueio de passagem)",
        "Cristais ressonantes (amplificam magia, +1d6 dano mágico)",
        "Gás subterrâneo (nuvem venenosa, teste de Resistência)",
        "Ponte sobre abismo (sem grades, queda = morte)",
      ],
      atmosfera: {
        inicio: {
          visao: "Cristais azuis iluminam salões vastos",
          som: "Eco de marteladas e cantos anões",
          cheiro: "Pedra molhada e cerveja",
          tato: "Frio úmido constante",
          paladar: "Poeira mineral",
        },
        meio: {
          visao: "Cristais piscam em vermelho",
          som: "Ruídos de escavação vindos de baixo",
          cheiro: "Gás sulfuroso",
          tato: "Vibrações no chão",
          paladar: "Metal e medo",
        },
        climax: {
          visao: "Escuridão total, apenas brilho vermelho",
          som: "Rugidos das profundezas",
          cheiro: "Morte e pedra queimada",
          tato: "Calor vindo de baixo",
          paladar: "Terra e desespero",
        },
      },
    },
    floresta_ecos: {
      nome: "Floresta dos Ecos",
      clima: "Tropical mutante, névoa inteligente",
      tema: "floresta_ecos",
      conflitos: [
        {
          id: "expansao",
          nome: "Expansão Predatória",
          desc: "A floresta está crescendo e consumindo vilas.",
        },
        {
          id: "colmeia",
          nome: "Consciência de Colmeia",
          desc: "Uma mente coletiva controla todas as criaturas da floresta.",
        },
        {
          id: "mutacao",
          nome: "A Grande Mutação",
          desc: "Animais e pessoas estão se transformando em híbridos.",
        },
      ],
      faccoes: [
        "Vigias da Fronteira",
        "Culto da Raiz",
        "Sobreviventes do Interior",
        "Pesquisadores Arcanos",
      ],
      mecanicasCenario: [
        "Esporos inteligentes (teste ou ganha Ponto de Síncope)",
        "Raízes sencientes (prendem, precisam ser cortadas)",
        "Névoa densa (esconde inimigos, Desvantagem em Percepção)",
        "Plantas carnívoras (engole personagens caídos)",
      ],
      atmosfera: {
        inicio: {
          visao: "Vegetação exuberante com brilho verde suave",
          som: "Zumbido constante de insetos",
          cheiro: "Flores doces e terra fértil",
          tato: "Umidade sufocante",
          paladar: "Doçura enjoativa",
        },
        meio: {
          visao: "Plantas se movem sozinhas",
          som: "Sussurros em língua desconhecida",
          cheiro: "Mel e carne podre",
          tato: "Coisas rastejando na pele",
          paladar: "Pólen amargo",
        },
        climax: {
          visao: "Toda vegetação brilha verde-néon",
          som: "Coro de vozes fundidas num único tom",
          cheiro: "Decomposição total",
          tato: "O chão respira",
          paladar: "Sangue vegetal, metálico",
        },
      },
    },
    gorbax: {
      nome: "Gorbax, As Montanhas Orc",
      clima: "Montanhoso árido, ventos fortes",
      tema: "gorbax",
      conflitos: [
        {
          id: "unificacao",
          nome: "Unificação das Tribos",
          desc: "Um líder tenta unir todas as tribos orc sob uma bandeira.",
        },
        {
          id: "totem",
          nome: "O Totem Despedaçado",
          desc: "O totem sagrado foi destruído e a terra enlouqueceu.",
        },
        {
          id: "invasao_humana",
          nome: "Invasão Estrangeira",
          desc: "Exércitos humanos marcham contra as montanhas.",
        },
      ],
      faccoes: [
        "Tribo do Crânio",
        "Xamãs da Pedra",
        "Caçadores de Wyvern",
        "Renegados do Vale",
      ],
      mecanicasCenario: [
        "Avalanche (teste ou é soterrado, precisa ser resgatado)",
        "Penhascos (empurrar inimigos, queda causa dano massivo)",
        "Tempestade de areia (visibilidade zero, desorientação)",
        "Totem ativo (aura que fortalece orcs próximos)",
      ],
      atmosfera: {
        inicio: {
          visao: "Picos rochosos contra céu cinzento",
          som: "Vento uivando entre desfiladeiros",
          cheiro: "Pedra seca e couro curtido",
          tato: "Vento cortante e frio",
          paladar: "Poeira e sangue seco",
        },
        meio: {
          visao: "Fogueiras tribais no horizonte",
          som: "Tambores de guerra",
          cheiro: "Carne assada e tinta de guerra",
          tato: "Tremores de marcha",
          paladar: "Cerveja orc amarga",
        },
        climax: {
          visao: "Céu vermelho de incêndios",
          som: "Gritos de batalha ensurdecedores",
          cheiro: "Sangue e suor",
          tato: "Calor do combate",
          paladar: "Ferro e vitória",
        },
      },
    },
  };

  const NOMES_NPC = {
    morden: [
      "Kaelen",
      "Elara",
      "Thorne",
      "Hela",
      "Bax",
      "Lira",
      "Maltheus",
      "Griz",
      "Olar",
      "Marx",
      "Valen",
      "Drex",
      "Sira",
      "Korvak",
      "Yenna",
    ],
    almar: [
      "Mariel",
      "Capitão Breddo",
      "Zara",
      "Nikos",
      "Ondina",
      "Thalasso",
      "Coralia",
      "Vendrick",
      "Luma",
      "Bastian",
      "Yara",
      "Oceanus",
      "Salma",
      "Tritão",
      "Maré",
    ],
    cinar: [
      "Elowen",
      "Thorn",
      "Faelith",
      "Rook",
      "Mosswick",
      "Lunara",
      "Grovehart",
      "Fern",
      "Ashwood",
      "Bramble",
      "Dewdrop",
      "Sagebriar",
      "Willowmere",
      "Ivyshade",
      "Oakenroot",
    ],
    draskar: [
      "Vulkran",
      "Cindra",
      "Magnar",
      "Ashka",
      "Forgeborn",
      "Embris",
      "Slaggor",
      "Pyrra",
      "Obsidian",
      "Flamecrest",
      "Kragor",
      "Scoria",
      "Ignis",
      "Moltar",
      "Brightsteel",
    ],
    dungard: [
      "Thorin",
      "Brunhild",
      "Durik",
      "Gemma",
      "Ironbeard",
      "Crysta",
      "Deepdelve",
      "Runeforge",
      "Stoneheart",
      "Glimmer",
      "Anvilson",
      "Opalshine",
      "Berylcut",
      "Quartzfist",
      "Cobaltson",
    ],
    floresta_ecos: [
      "Eco",
      "Sussurro",
      "Raiz",
      "Névoa",
      "Esporo",
      "Simbionte",
      "Pulso",
      "Líquen",
      "Parasita",
      "Nexo",
      "Cepa",
      "Filamento",
      "Seiva",
      "Colmeia",
      "Mutante",
    ],
    gorbax: [
      "Grath",
      "Urgha",
      "Krag",
      "Shazza",
      "Bonecrusher",
      "Totemcaller",
      "Bloodfang",
      "Stormpeak",
      "Ironclaw",
      "Ashroar",
      "Skullsplitter",
      "Thunderbrow",
      "Ragefist",
      "Darkhorn",
      "Scarback",
    ],
  };

  const DESCRICOES_FISICAS = [
    "Cicatriz que cruza o rosto inteiro", "Olhos de cores diferentes",
    "Braço mecânico/protético", "Cabelos brancos prematuros",
    "Tatuagens rúnicas brilhantes", "Estatura impressionante (2m+)",
    "Voz rouca como metal raspando", "Manca de uma perna mas se move rápido",
    "Dedos finos e longos como garras", "Sorriso que nunca alcança os olhos",
    "Queimaduras nas mãos e antebraços", "Máscara que nunca tira",
    "Cheiro persistente de ervas medicinais", "Falta dois dedos da mão esquerda",
    "Pele coberta de escamas parciais", "Um olho coberto por tapa-olho de prata",
    "Barba trançada com miçangas de osso", "Corpo coberto de pelos brancos",
    "Sempre mascando algo entre os dentes", "Unha negra envenenada no polegar",
    "Corcunda sutil que esconde sob capa", "Dentes de metal reforçado",
    "Olheiras fundas como cavernas", "Pele pálida como papel",
    "Marca de ferro quente no pescoço", "Trema involuntariamente quando mente",
    "Cabeça raspada com símbolos tribais", "Nariz quebrado várias vezes",
    "Fala em terceira pessoa", "Pisca constantemente o olho esquerdo"
  ]

  const MOTIVACOES = [
    { desejo: "Proteger sua família a qualquer custo", medo: "Ser fraco demais quando precisarem", segredo: "Já traiu alguém para salvar os seus" },
    { desejo: "Encontrar a cura para uma doença rara", medo: "O tempo acabar antes de conseguir", segredo: "A doença foi causada por seus experimentos" },
    { desejo: "Subir ao poder e reformar o sistema", medo: "Ser corrompido pelo poder", segredo: "Já mandou matar um rival político" },
    { desejo: "Vingança contra quem destruiu sua aldeia", medo: "Descobrir que o culpado é alguém querido", segredo: "O ataque foi retaliação por algo que fez" },
    { desejo: "Provar que é digno de respeito", medo: "Ser visto como impostor", segredo: "Roubou a identidade de outra pessoa" },
    { desejo: "Descobrir a verdade sobre suas origens", medo: "A verdade ser pior que a ignorância", segredo: "Já encontrou parte da resposta mas escondeu" },
    { desejo: "Acumular riqueza para comprar liberdade", medo: "Morrer pobre e esquecido", segredo: "Já vendeu informações ao inimigo" },
    { desejo: "Manter a ordem social a todo custo", medo: "O caos que vem com a mudança", segredo: "Silenciou testemunhas inocentes por estabilidade" },
    { desejo: "Expiar um pecado do passado", medo: "Nunca ser perdoado", segredo: "O pecado foi maior do que todos imaginam" },
    { desejo: "Proteger um segredo ancestral", medo: "Que o segredo caia em mãos erradas", segredo: "Já usou o segredo para benefício próprio" },
    { desejo: "Reunir uma família que nunca teve", medo: "Ser abandonado novamente", segredo: "Fugiu de um orfanato após cometer violência" },
    { desejo: "Construir algo que dure mil anos", medo: "Que tudo que construa desmorone", segredo: "Destruiu a obra de outro para ter a chance" },
    { desejo: "Ouvir a voz dos deuses mais uma vez", medo: "Que os deuses o tenham esquecido", segredo: "A última mensagem divina ordenava algo terrível" },
    { desejo: "Encontrar um lar onde possa descansar", medo: "Que nenhum lugar no mundo o aceite", segredo: "Já incendiou o último lugar que chamou de lar" },
    { desejo: "Ser lembrado como herói", medo: "Que sua história real venha à tona", segredo: "Sua maior vitória foi roubo de crédito" },
    { desejo: "Salvar alguém que ama de uma maldição", medo: "Que a cura exija sacrifício próprio", segredo: "Ele mesmo lançou a maldição por acidente" },
    { desejo: "Dominar uma arte esquecida", medo: "Que o conhecimento o consuma", segredo: "Já perdeu a sanídade uma vez e ninguém sabe" },
    { desejo: "Libertar seu povo de uma tiranía", medo: "Se tornar o novo tirano", segredo: "Pacíífícou com o tirano uma vez por conveniência" }
  ]

  const DIALOGOS_POR_TIPO = {
    mentor: [
      '"Vocês não estão prontos. Mas o mundo não espera por quem está."',
      '"A lição mais valiosa que posso dar é esta: sobrevivam."',
      '"Quando eu tinha a idade de vocês, cometi o mesmo erro. A diferença é que meu mentor não sobreviveu."',
      '"Não confundam coragem com estupidez. A linha é tão fina que dói."',
      '"Eu já vi impérios caírem. Não por guerras, mas por orgúlho."',
      '"Prestem atenção em quem lucra quando todos sofrem. Lá está o verdadeiro inimigo."',
      '"Minha cabeça tem preço em três reinos. Sigam meu conselho: não fiquem famosos."',
      '"Se eu morrer hoje, não me vinguem. Terminem o que começamos."'
    ],
    rival: [
      '"Vocês creem que são heróis? Eu também acreditava. Olhem onde isso me levou."',
      '"Não me culpem. Eu fiz o que vocês são fracos demais para fazer."',
      '"Nos veremos novamente. E da próxima vez, eu não serei tão paciente."',
      '"Vocês são peões. Eu sou o jogador. Há uma diferença."',
      '"O mundo não se salva com boas intenções. Se salva com poder."',
      '"Admiro a coragem. Mas eu não perco para amadores."',
      '"Pensem bem antes de me enfrentar. O último grupo que tentou virou fertilizante."',
      '"Nós queríamos a mesma coisa. A diferença é que eu aceito o custo."'
    ],
    aliado: [
      '"Não confio em vocês. Mas confio menos ainda neles."',
      '"Minha ajuda tem um preço. Não em ouro, mas em lealdade."',
      '"Se vamos morrer juntos, ao menos vamos morrer sabendo a verdade."',
      '"Não me chamem de amigo. Parceiros de negócio. Até acabar."',
      '"Eu tenho minhas razões para ajudar. Nenhuma delas é bondade."',
      '"Quando isso terminar, cada um segue seu caminho. Combinado?"',
      '"Vou proteger suas costas. Mas não me peçam para gostar disso."',
      '"O inimigo do meu inimigo é minha única opção hoje."'
    ]
  }

  const DILEMAS = [
    {
      tipo: "misericordia_pragmatismo",
      titulo: "Misericórdia vs Pragmatismo",
      opcaoA: { nome: "Poupar", efeito: "+1 Aliado, +2 Ponto Epílogo" },
      opcaoB: {
        nome: "Eliminar",
        efeito: "-1 Ponto Epílogo, +Informação crítica",
      },
    },
    {
      tipo: "ordem_liberdade",
      titulo: "Ordem vs Liberdade",
      opcaoA: {
        nome: "Manter a Lei",
        efeito: "+2 Favor Autoridade, -1 Favor Povo",
      },
      opcaoB: {
        nome: "Quebrar as Regras",
        efeito: "-1 Favor Autoridade, +2 Favor Povo",
      },
    },
    {
      tipo: "sacrificio_seguranca",
      titulo: "Sacrifício vs Segurança",
      opcaoA: {
        nome: "Se Sacrificar",
        efeito: "Perda de recurso, +3 Favor Geral",
      },
      opcaoB: { nome: "Se Proteger", efeito: "Mantém recurso, NPC morre" },
    },
    {
      tipo: "verdade_protecao",
      titulo: "Verdade vs Proteção",
      opcaoA: {
        nome: "Revelar a Verdade",
        efeito: "Crise política, +Pista crítica",
      },
      opcaoB: {
        nome: "Manter o Segredo",
        efeito: "Estabilidade, -1 Aliado que descobre",
      },
    },
    {
      tipo: "individuo_coletivo",
      titulo: "Indivíduo vs Coletivo",
      opcaoA: { nome: "Salvar Um", efeito: "+NPC leal, multidão ressentida" },
      opcaoB: {
        nome: "Salvar Muitos",
        efeito: "+Favor populacho, aliado perdido",
      },
    },
    {
      tipo: "vinganca_perdao",
      titulo: "Vingança vs Perdão",
      opcaoA: { nome: "Vingar", efeito: "+Satisfação, -2 Pontos Epílogo" },
      opcaoB: {
        nome: "Perdoar",
        efeito: "+Aliado improvável, +1 Ponto Epílogo",
      },
    },
  ];

  const TITULO_PREFIXOS = [
    "O Rastro", "A Queda", "Ecos", "O Último", "Sangue", "A Maré", "Cinzas",
    "O Grito", "Raízes", "A Sinfonia", "O Cerco", "Pó", "A Forja", "Névoa",
    "O Pacto", "Sementes", "A Chama", "Sob a Pele", "O Preço", "A Vigília",
    "O Sussurro", "A Sombra", "Ossos", "A Promessa", "O Vazio", "Lágrimas",
    "A Hora", "O Juramento", "A Fenda", "O Despertar", "A Agonia", "O Caminho",
    "O Eco", "A Herança", "O Segredo", "A Marca", "O Ritual", "A Chave",
    "A Torre", "O Abismo", "A Fuga", "O Muro", "O Trono", "A Coroa"
  ];
  const TITULO_SUFIXOS = [
    "do Paciente Zero", "do Firmamento", "da Tempestade", "Bastião", "nas Engrenagens",
    "Negra", "do Alvorecer", "da Montanha", "de Adamante", "dos Mortos",
    "Silencioso", "e Promessas", "Partida", "e Aço", "Esquecido", "de Ruína",
    "Fria", "do Mundo", "do Silêncio", "Eterna", "das Profundezas", "dos Ecos",
    "de Pedra", "Quebrada", "Infinito", "de Sangue", "da Verdade", "Perdido",
    "da Noite", "Ancestral", "da Corrupção", "Proibido", "do Caos", "da Cinza",
    "do Ferro", "Arcano", "da Selva", "do Fogo", "da Loucura", "das Sombras",
    "dos Caídos", "do Trono", "Selvagem", "Império", "da Magia"
  ]

  /** Retorna um item aleatório de um array */
  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** Retorna N itens únicos aleatórios */
  function randomN(arr, n) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }


  // ============ POOLS PROCEDURAIS ============

  const SINOPSES_TEMPLATE = [
    "Uma ameaça misteriosa surgiu em {local}: {evento}. {faccao} contratou o grupo para investigar antes que {consequencia}.",
    "Rumores falam de {evento} nos arredores de {local}. {faccao} pede que aventureiros descubram a verdade antes que {consequencia}.",
    "Um {npc_tipo} chegou a {local} trazendo notícias terríveis: {evento}. Se ninguém agir, {consequencia}.",
    "O equilíbrio em {local} foi quebrado quando {evento}. {faccao} suspeita de sabotagem e busca heróis para {objetivo}.",
    "{faccao} está em pânico: {evento} ameaça destruir tudo que construíram em {local}. O grupo deve {objetivo} antes que {consequencia}.",
    "Uma expedição de {faccao} desapareceu perto de {local} após reportar {evento}. O grupo é enviado para descobrir o que aconteceu.",
    "Nos últimos dias, {evento} tem causado terror em {local}. {faccao} oferece recompensa generosa a quem {objetivo}.",
    "Um antigo {npc_tipo} de {faccao} revelou em seu leito de morte: {evento}. Agora, o grupo deve {objetivo} antes que {consequencia}.",
    "Viajantes reportam fenômenos estranhos em {local}: {evento}. {faccao} acredita que se trata de algo muito mais perigoso do que parece.",
    "Uma caravana de {faccao} foi atacada a caminho de {local}. Os sobreviventes falam de {evento}. O grupo deve {objetivo}."
  ];

  const EVENTOS_POOL = [
    "desaparecimentos em massa", "criaturas nunca vistas antes atacando viajantes",
    "uma praga desconhecida se espalhando", "tremores constantes abalando as fundações",
    "uma relíquia antiga foi roubada", "um portal se abriu no subsolo",
    "mortos estão se levantando", "a magia começou a falhar",
    "uma neblina tóxica avança sobre a região", "símbolos profanos apareceram nas paredes",
    "um sonho coletivo atormenta todos os habitantes", "a água se tornou negra e venenosa",
    "espíritos ancestrais foram vistos no céu noturno", "animais selvagens atacam em formação coordenada",
    "uma torre apareceu do nada durante a noite", "crianças começaram a falar em línguas mortas"
  ];

  const OBJETIVOS_POOL = [
    "investigar a origem", "eliminar a ameaça", "resgatar os desaparecidos",
    "selar o que foi aberto", "recuperar o artefato", "negociar uma trégua",
    "encontrar o responsável", "evacuar os inocentes", "deter a corrupção",
    "descobrir a verdade oculta", "proteger os sobreviventes", "destruir a fonte do mal"
  ];

  const CONSEQUENCIAS_POOL = [
    "a cidade inteira seja destruída", "a corrupção se espalhe para outras regiões",
    "mais vidas sejam perdidas", "o equilíbrio do mundo se quebre",
    "uma guerra inevitável comece", "o conhecimento se perca para sempre",
    "o inimigo se torne forte demais para enfrentar", "a população perca toda esperança",
    "a realidade se fragmente", "uma entidade antiga seja libertada"
  ];

  const CENAS_POOL = {
    investigacao: [
      { titulo: "A Cena do Crime", desc: "O grupo chega ao local do primeiro incídente. Pistas estão espalhadas, mas o tempo é curto." },
      { titulo: "O Interrogátorio", desc: "Uma testemunha sabe mais do que revela. Extrair a verdade exige habilidade." },
      { titulo: "O Arquivo Proibido", desc: "Documentos antigos revelam um padrão. Alguém tentou apagar as evidências." },
      { titulo: "O Rastro", desc: "Marcas no chão, resíduos estranhos, um cheiro familiar. A trilha leva a um lugar inesperado." },
      { titulo: "A Autopção", desc: "Um corpo conta uma história. As feridas não batem com nenhuma arma conhecida." },
      { titulo: "A Armadilha", desc: "O grupo percebe tarde demais: a pista era isca. Agora estão encurralados." },
      { titulo: "O Informante", desc: "Um contato shady oferece informações em troca de um favor perigoso." },
      { titulo: "A Vigília", desc: "O grupo monta guarda no local. À meia-noite, algo finalmente se move." }
    ],
    combate: [
      { titulo: "A Emboscada", desc: "Inimigos surgem de todos os lados. Não há para onde correr, só lutar." },
      { titulo: "O Covil", desc: "O grupo entra no território inimigo. As vantagens agora são do adversário." },
      { titulo: "A Última Defesa", desc: "Civis encurralados. O grupo deve segurar a linha enquanto os inocentes fogem." },
      { titulo: "O Duelo", desc: "O líder inimigo desafia o grupo. Aceitar pode resolver tudo, ou ser uma armadilha." },
      { titulo: "A Fuga", desc: "O grupo está em desvantagem. A melhor opção é escapar com vida." },
      { titulo: "O Cerco", desc: "Uma posição fortifícada precisa ser tomada. Estratégia é tão importante quanto força." },
      { titulo: "A Patrulha", desc: "O grupo cruza com uma patrulha inimiga. Podem tentar evitar ou eliminar." },
      { titulo: "O Ritual Interrompido", desc: "Cultistas estão completando um ritual. Cada rodada que passa, o perigo cresce." }
    ],
    social: [
      { titulo: "A Negociação", desc: "Duas facções estão à beira da guerra. O grupo pode mediar a paz ou acender a chama." },
      { titulo: "O Tribunal", desc: "Alguém é julgado injustamente. O grupo pode intervir, mas há consequências." },
      { titulo: "A Festa", desc: "Um evento social esconde intrigas. A verdade está entre sorrisos e adàgas." },
      { titulo: "O Pedido de Ajuda", desc: "Um grupo de refugiados implora socorro. Ajudar custa recursos preciosos." },
      { titulo: "A Traição", desc: "Um aliado revela sua verdadeira face. O grupo deve decidir como reagir." },
      { titulo: "O Mercado Negro", desc: "Informações vitais estão à venda. Mas o vendedor é tão perigoso quanto o segredo." },
      { titulo: "A Assembleia", desc: "Líderes locais debatem o futuro. A voz do grupo pode mudar o rumo dos eventos." },
      { titulo: "O Dilema Moral", desc: "Não há escolha boa. Apenas menos ruim. O grupo deve decidir quem sacrificar." }
    ]
  };

  const SIDE_QUESTS_POOL = [
    { titulo: "O Desaparecido", desc: "Um parente de um NPC local sumiu. Encontrá-lo revela uma subcamada da trama.", recompensa: "+1 Aliado leal, +2 Ponto Epílogo" },
    { titulo: "O Contrabando", desc: "Uma carga suspeita está sendo transportada. Interceptá-la pode render itens ou informações.", recompensa: "+Item mágico ou +Pista crítica" },
    { titulo: "A Promessa Quebrada", desc: "Um antigo pacto foi violado. Restaurá-lo apazigua uma ameaça secundária.", recompensa: "+1 Favor facção, -1 Ameaça" },
    { titulo: "O Monstro na Estrada", desc: "Viajantes estão sendo atacados na rota principal. Eliminar a criatura abre caminhos.", recompensa: "+XP bônus, rota segura" },
    { titulo: "A Relíquia Perdida", desc: "Um artefato sagrado está escondido nas redondezas. Recuperá-lo dá vantagem no clímax.", recompensa: "+Item-chave para o clímax, +2 Favor" },
    { titulo: "O Espírito Preso", desc: "Um fantasma pede ajuda para descansar. Cumprir seu pedido revela história oculta.", recompensa: "+Conhecimento crítico, bênção espiritual" },
    { titulo: "A Criança Perdida", desc: "Uma criança se perdeu em área perigosa. Salvá-la ganha a confiança da comunidade.", recompensa: "+3 Favor populacho, +1 Ponto Epílogo" },
    { titulo: "O Rival Ferido", desc: "Um rival está ferido e precisa de ajuda. Ajudá-lo pode transformá-lo em aliado.", recompensa: "+Aliado improvável ou informação" },
    { titulo: "A Mina Colapsada", desc: "Mineiros estão presos. O resgate é arriscado mas recompensador.", recompensa: "+Recursos valiosos, +2 Favor" },
    { titulo: "O Mensageiro Caído", desc: "Um mensageiro morto carrega um documento vital. Entregá-lo ao destino muda a política.", recompensa: "+Aliança política, +Pista" }
  ];

  const PISTAS_POOL = [
    "Um diário abandonado com anotações criptografadas",
    "Marcas de garras em uma porta reforçada",
    "Resíduos de uma substância desconhecida no chão",
    "Um mapa parcialmente queimado com um X vermelho",
    "Pegadas que mudam de forma humana para bestial",
    "Um símbolo desconhecido riscado repetidamente nas paredes",
    "Uma carta lacrada com selo de uma facção inimiga",
    "Frascos vazios de veneno com rótulos arrancados",
    "Um espelho quebrado que ainda reflete algo errado",
    "Cinzas de ôssos em um círculo ritual mal apagado",
    "O último registro de turno mostra uma anomalia 6 horas antes do incídente",
    "Tecido de roupa nobre rasgado em espinhos perto do local",
    "Um animal morto com expressão de terror puro no rosto",
    "Uma mensagem escrita às pressas em sangue: apenas duas palavras ilegíveis",
    "O cheiro de ozônio e flores mortas que não deveria existir aqui",
    "Testemunhas mencionam o mesmo som estranho ouvido à meia-noite"
  ];

  const RUMORES_POOL = [
    { tipo: "V", texto: "Guardas foram vistos carregando corpos embrulhados em panos negros durante a madrugada." },
    { tipo: "V", texto: "Uma luz estranha brilha todas as noites na torre abandonada ao norte." },
    { tipo: "V", texto: "Ratos estão fugindo em massa do subsolo. Algo lá embaixo os assustou." },
    { tipo: "F", texto: "O prefeito é na verdade um impostor. O verdadeiro foi substituído há meses." },
    { tipo: "P", texto: "A facção dominante enviou agentes ao local ANTES do incídente acontecer." },
    { tipo: "L", texto: "Lendas falam de uma criatura selada sob a cidade há séculos. O selo pode ter enfraquecido." },
    { tipo: "V", texto: "Comerciantes relatam que seus produtos estão apodrecendo três vezes mais rápido que o normal." },
    { tipo: "P", texto: "Um espião foi pego tentando enviar mensagens codificadas para fora da cidade." },
    { tipo: "F", texto: "A água da cidade está envenenada. É por isso que todos estão doentes." },
    { tipo: "L", texto: "Os mais velhos cantam uma canção sobre o último cataclismo. Ninguém lembra a letra completa." },
    { tipo: "V", texto: "Três crianças desenharam a mesma imagem na escola: uma criatura com mil olhos." },
    { tipo: "P", texto: "O médico local registrou casos estranhos nos últimos 10 dias. Nenhum foi reportado oficialmente." },
    { tipo: "V", texto: "Cães de guarda se recusam a entrar no bairro leste. Uivam a noite toda." },
    { tipo: "F", texto: "Um mago louco está experimentando com portais no porão da biblioteca." },
    { tipo: "L", texto: "Dizem que quem dorme perto das runas antigas tem pesadelos proféticos." },
    { tipo: "P", texto: "O ferreiro entregou uma encomenda secreta de armas a um grupo desconhecido na semana passada." },
    { tipo: "V", texto: "O rio mudou de cor ontem à noite. Ninguém sabe por quê." },
    { tipo: "F", texto: "Os aventureiros anteriores foram mortos pela própria facção contratante." },
    { tipo: "L", texto: "Uma profecia antiga diz que quando as estrelas mudam, o mundo racha." },
    { tipo: "V", texto: "Alguém viu uma figura encapuzada conversando com os monstros como se fossem cães." }
  ];

  return {
    CENARIOS,
    NOMES_NPC,
    DESCRICOES_FISICAS,
    MOTIVACOES,
    DIALOGOS_POR_TIPO,
    DILEMAS,
    TITULO_PREFIXOS,
    TITULO_SUFIXOS,
    SINOPSES_TEMPLATE,
    EVENTOS_POOL,
    OBJETIVOS_POOL,
    CONSEQUENCIAS_POOL,
    CENAS_POOL,
    SIDE_QUESTS_POOL,
    PISTAS_POOL,
    RUMORES_POOL,
    random,
    randomN,
  };
})();
