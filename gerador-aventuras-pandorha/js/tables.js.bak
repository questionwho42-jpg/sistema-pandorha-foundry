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
    "Cicatriz que cruza o rosto inteiro",
    "Olhos de cores diferentes",
    "Braço mecânico/protético",
    "Cabelos brancos prematuros",
    "Tatuagens rúnicas brilhantes",
    "Estatura impressionante (2m+)",
    "Voz rouca como metal raspando",
    "Manca de uma perna mas se move rápido",
    "Dedos finos e longos como garras",
    "Sorriso que nunca alcança os olhos",
    "Queimaduras nas mãos e antebraços",
    "Máscara que nunca tira",
    "Cheiro persistente de ervas medicinais",
    "Falta dois dedos da mão esquerda",
    "Pele coberta de escamas parciais",
  ];

  const MOTIVACOES = [
    {
      desejo: "Proteger sua família a qualquer custo",
      medo: "Ser fraco demais quando precisarem",
      segredo: "Já traiu alguém para salvar os seus",
    },
    {
      desejo: "Encontrar a cura para uma doença rara",
      medo: "O tempo acabar antes de conseguir",
      segredo: "A doença foi causada por seus experimentos",
    },
    {
      desejo: "Subir ao poder e reformar o sistema",
      medo: "Ser corrompido pelo poder",
      segredo: "Já mandou matar um rival político",
    },
    {
      desejo: "Vingança contra quem destruiu sua aldeia",
      medo: "Descobrir que o culpado é alguém querido",
      segredo: "O ataque foi retaliação por algo que fez",
    },
    {
      desejo: "Provar que é digno de respeito",
      medo: "Ser visto como impostor",
      segredo: "Roubou a identidade de outra pessoa",
    },
    {
      desejo: "Descobrir a verdade sobre suas origens",
      medo: "A verdade ser pior que a ignorância",
      segredo: "Já encontrou parte da resposta mas escondeu",
    },
    {
      desejo: "Acumular riqueza para comprar liberdade",
      medo: "Morrer pobre e esquecido",
      segredo: "Já vendeu informações ao inimigo",
    },
    {
      desejo: "Manter a ordem social a todo custo",
      medo: "O caos que vem com a mudança",
      segredo: "Silenciou testemunhas inocentes por estabilidade",
    },
    {
      desejo: "Expiar um pecado do passado",
      medo: "Nunca ser perdoado",
      segredo: "O pecado foi maior do que todos imaginam",
    },
    {
      desejo: "Proteger um segredo ancestral",
      medo: "Que o segredo caia em mãos erradas",
      segredo: "Já usou o segredo para benefício próprio",
    },
  ];

  const DIALOGOS_POR_TIPO = {
    mentor: [
      '"Vocês não estão prontos. Mas o mundo não espera por quem está."',
      '"A lição mais valiosa que posso dar é esta: sobrevivam."',
      '"Quando eu tinha a idade de vocês, cometi o mesmo erro. A diferença é que meu mentor não sobreviveu."',
    ],
    rival: [
      '"Vocês creem que são heróis? Eu também acreditava. Olhem onde isso me levou."',
      '"Não me culpem. Eu fiz o que vocês são fracos demais para fazer."',
      '"Nos veremos novamente. E da próxima vez, eu não serei tão paciente."',
    ],
    aliado: [
      '"Não confio em vocês. Mas confio menos ainda neles."',
      '"Minha ajuda tem um preço. Não em ouro, mas em lealdade."',
      '"Se vamos morrer juntos, ao menos vamos morrer sabendo a verdade."',
    ],
  };

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

  const NOMES_AVENTURA = [
    "O Rastro do Paciente Zero",
    "A Queda do Firmamento",
    "Ecos da Tempestade",
    "O Último Bastião",
    "Sangue nas Engrenagens",
    "A Maré Negra",
    "Cinzas do Alvorecer",
    "O Grito da Montanha",
    "Raízes de Adamante",
    "A Sinfonia dos Mortos",
    "O Cerco Silencioso",
    "Pó e Promessas",
    "A Forja Partida",
    "Névoa e Aço",
    "O Pacto Esquecido",
    "Sementes de Ruína",
    "A Chama Fria",
    "Sob a Pele do Mundo",
    "O Preço do Silêncio",
    "A Vigília Eterna",
  ];

  /** Retorna um item aleatório de um array */
  function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /** Retorna N itens únicos aleatórios */
  function randomN(arr, n) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }

  return {
    CENARIOS,
    NOMES_NPC,
    DESCRICOES_FISICAS,
    MOTIVACOES,
    DIALOGOS_POR_TIPO,
    DILEMAS,
    NOMES_AVENTURA,
    random,
    randomN,
  };
})();
