/**
 * GENERATOR.JS — Motor de Geração com Narrativa Completa
 * Forja de Aventuras | Sistema Pandorha
 */

const ForgeGenerator = (() => {
  class AventuraBase {
    constructor(dados) {
      this.titulo = dados.nomeAventura || "Aventura Sem Nome";
      this.cenario = dados.cenario;
      this.tier = parseInt(dados.tier) || 1;
      this.jogadores = parseInt(dados.jogadores) || 4;
      this.dificuldade = dados.dificuldade || "medio";
      this.tons = dados.tons || [];
      this.conflito = dados.conflito || "";
      this.vilao = dados.vilao || "";
      this.duracao = dados.duracao || "oneshot";
      this.estrutura = dados.estrutura || "3cenas";
      this.opcoes = {
        regraCasa: dados.regraCasa,
        downtime: dados.downtime,
        downtimeMecanico: dados.downtimeMecanico,
        progressaoXP: dados.progressaoXP,
      };
      this.capitulos = [];
      this.npcs = [];
      this.tabelas = {};
      this.faccoes = [];
      this.epilogo = {};
      this.sideQuests = [];
      this.regraCasa = null;
      this.sinopse = "";
    }
  }

  // ============================================================
  //  NARRATIVAS POR CENÁRIO + CONFLITO
  // ============================================================

  const NARRATIVAS = {
    morden: {
      sincope: {
        sinopse:
          "Uma nova cepa da Síncope da Vontade foi detectada nos níveis inferiores de Morden. Operários do Setor 7 abandonaram seus postos com expressões vazias, marchando em direção à Floresta dos Ecos como se ouvissem um chamado. A Guilda dos Artífices contratou o grupo para investigar a origem da contaminação antes que a epidemia atinja os andares superiores — onde moram as famílias dos artífices.",
        capitulos: [
          {
            titulo: "O Silêncio do Setor 7",
            introducao:
              "O elevador de carga range ao descer para o Setor 7. As luzes rúnicas, normalmente azuis e estáveis as paredes, piscam num verde doentio. O corredor principal, onde centenas de operários costumavam marchar entre turnos, está vazio. Ferramentas abandonadas no chão. Capacetes largados. Uma refeição pela metade numa mesa de cantina, a sopa ainda morna. Algo fez estas pessoas largarem tudo e saírem — ou algo as levou.",
            objetivo:
              "Descobrir o que aconteceu com os 47 operários desaparecidos do Setor 7 e encontrar a origem da contaminação biótica.",
            pistas: [
              'Um diário de operário encontrado na cantina menciona "sonhos com raízes que cantam" nas últimas 3 noites.',
              "Marcas de unhas no metal de um corredor sugerem que alguém foi arrastado — ou tentou resistir a algo.",
              "Um frasco quebrado num laboratório abandonado contém resíduos de seiva verde-luminescente. Teste Mental + Alquimia DC 13: é seiva da Floresta dos Ecos, mas modificada. Alguém a trouxe para cá de propósito.",
              "A última entrada do registro de turno mostra que o Duto de Ventilação C-12 foi aberto por alguém de dentro, 6 horas antes dos desaparecimentos. Quem autorizou?",
            ],
            cenas: [
              {
                titulo: "A Cantina Abandonada",
                descricao:
                  'Os heróis exploram a cantina do Setor 7, onde 200 operários faziam suas refeições. As mesas estão postas para o jantar da noite anterior — pratos servidos, canecas cheias, mas nenhuma alma. A comida não foi tocada. No canto, um rádio rúnico emite estática. Quando alguém se aproxima, uma voz distorcida sussurra: "Venham... a Raiz-Mãe chama... é tão quente aqui embaixo..." O rádio explode em faíscas verdes.',
                objetivo:
                  "Examinar a cantina em busca de pistas sobre o desaparecimento.",
                teste: {
                  eixo: "Mental",
                  pericia: "Percepção",
                  dc: 13,
                  sucesso:
                    'O herói encontra o diário do operário Bax sob uma mesa. Bax descreveu sintomas crescentes: primeiro sonhos, depois sussurros durante o dia, depois uma "vontade irresistível de caminhar para o leste". A última página diz: "Elara sabe. Ela trouxe as amostras. Porquê?"',
                  falha:
                    "O herói ativa acidentalmente uma armadilha de esporos dormentes. Nuvem de pólen verde: DC 12 Resistência ou +1 Ponto de Síncope temporário (desvantagem em testes Mentais por 1 hora).",
                },
              },
              {
                titulo: "O Ninho nos Dutos",
                descricao:
                  "Seguindo o Duto de Ventilação C-12, os heróis encontram a origem: um ninho biótico. Raízes verde-luminescentes perfuraram as paredes de adamante e criaram uma câmara orgânica do tamanho de uma sala. No centro, três operários estão de pé, imóveis, com raízes finas entrando por seus ouvidos. Seus olhos estão abertos mas vazios. Ao redor deles, Morphs de Saturação patrulham como cães de guarda. Os operários parecem vivos — mas conseguir libertá-los sem matá-los será o verdadeiro desafio.",
                objetivo:
                  "Derrotar os Morphs e libertar os operários sem matá-los.",
                teste: {
                  eixo: "Físico",
                  pericia: "Conflito",
                  dc: 15,
                  sucesso:
                    "O herói corta as raízes-âncora do ninho. Os Morphs perdem a conexão com a colmeia e ficam Atordoados por 1 rodada, dando Vantagem nos ataques. Os operários começam a tossir e acordar.",
                  falha:
                    "As raízes reagem ao ataque e apertam os operários. Se o grupo não derrotar os Morphs em 3 rodadas, 1 operário morre sufocado.",
                },
              },
              {
                titulo: "A Pergunta de Elara",
                descricao:
                  'Com os operários libertados (ou mortos), uma das sobreviventes — a Artífice Elara Vess — acorda e entra em pânico. Ela confessa entre lágrimas: foi ELA quem trouxe as amostras de seiva para o Setor 7. Estava pesquisando uma cura para a Síncope da Vontade, mas a seiva sofreu uma mutação no ambiente industrial e se tornou um vetor de contaminação ainda mais forte. Elara implora: "Se a Inquisição da Pureza descobrir, vão me executar. Me ajudem a destruir as amostras restantes — ou me entreguem e salvem sua reputação."',
                objetivo:
                  "Decidir o destino de Elara e das amostras contaminadas.",
                teste: {
                  eixo: "Social",
                  pericia: "Interação",
                  dc: 14,
                  sucesso:
                    "Elara confia no grupo e revela onde estão as amostras restantes (Laboratório do Setor 9), além de entregar suas notas de pesquisa — que podem ser usadas para criar um antídoto no futuro.",
                  falha:
                    "Elara acredita que vai ser entregue e tenta fugir. Se não for impedida (Físico DC 14), desaparece nos dutos com as notas de pesquisa.",
                },
              },
            ],
          },
        ],
        sideQuests: [
          {
            titulo: "O Operário Desaparecido",
            descricao:
              "O operário Griz, amigo de Bax, não foi encontrado entre os afetados. Sua família no Setor 3 implora aos heróis que o encontrem.",
            objetivo: "Localizar Griz antes que a Síncope o consuma.",
            cena1:
              "Pistas no alojamento de Griz revelam que ele estava investigando os desaparecimentos por conta própria. Encontram um mapa rabiscado dos dutos com um X marcando um local mais profundo que o ninho principal. Teste Mental + Navegação DC 14.",
            cena2:
              'Griz está vivo mas conectado a uma raiz mais grossa — uma "raiz-rainha". Se libertado (Físico DC 16), Griz acorda com informações cruciais: viu alguém da Inquisição da Pureza entrando nos dutos ANTES da contaminação.',
            recompensa:
              "Griz se torna aliado leal. +1 Favor Guilda dos Artífices. Se ignorada: +2 Pontos de Corrupção (a família culpa os heróis).",
            efeitoEpilogo: 2,
          },
        ],
        rumores: [
          {
            tipo: "V",
            texto:
              "Operários do Setor 7 foram vistos andando em fila para o leste, de olhos vidrados, cantarolando uma melodia que ninguém reconhece.",
          },
          {
            tipo: "V",
            texto:
              "O Mestre Artífice Thorne pediu para trancar os elevadores do Setor 7 pessoalmente, sem dar explicações ao Conselho.",
          },
          {
            tipo: "F",
            texto:
              "Dizem que os operários desaparecidos foram sequestrados pela Teia da Viúva para serem vendidos como escravos nas minas de Draskar.",
          },
          {
            tipo: "F",
            texto:
              "Um dragão verde adormecido sob Morden acordou e está hipnotizando operários com seu bafo.",
          },
          {
            tipo: "P",
            texto:
              'A Artífice Elara Vess foi vista carregando frascos estranhos para o Setor 7 na semana passada. "Pesquisa", ela disse. Mas estava com as mãos tremendo.',
          },
          {
            tipo: "P",
            texto:
              "A Inquisição da Pureza mandou agentes ao Setor 7 dias ANTES dos desaparecimentos. Investigação preventiva? Ou sabiam o que ia acontecer?",
          },
          {
            tipo: "L",
            texto:
              'Quem dormir perto dos dutos do Setor 7 tem sonhos com uma floresta infinita e uma voz que promete "paz sem dor, vida sem medo".',
          },
          {
            tipo: "V",
            texto:
              "O Duto de Ventilação C-12 foi encontrado aberto — alguém usou uma chave-mestra de nível administrativo para destrancá-lo.",
          },
          {
            tipo: "P",
            texto:
              "O preço do adamante subiu 40% esta semana. Alguém está comprando estoques enormes. Preparação para guerra ou para selar algo?",
          },
          {
            tipo: "F",
            texto:
              "Os operários na verdade fugiram para formar uma vila livre fora de Morden. Estão cansados de trabalhar para os Artífices.",
          },
          {
            tipo: "V",
            texto:
              "Uma substância verde-luminescente foi encontrada nas paredes do corredor principal. Ninguém sabe o que é, mas queima se tocada.",
          },
          {
            tipo: "L",
            texto:
              "Antiga lenda diz que Morden foi construída SOBRE uma raiz gigante da Floresta dos Ecos, selada há séculos. Se o selo quebrar...",
          },
          {
            tipo: "P",
            texto:
              'O médico do Setor 7 registrou 12 casos de "insônia com alucinações botânicas" nos últimos 10 dias. Nenhum foi reportado oficialmente.',
          },
          {
            tipo: "F",
            texto:
              "Os desaparecimentos são uma farsa da Guilda para justificar o aumento do preço do adamante e cortar salários.",
          },
          {
            tipo: "V",
            texto:
              "Um grupo de 5 operários retornou sozinho após 3 dias perdidos. Não lembram de nada, mas todos têm uma marca verde atrás da orelha.",
          },
          {
            tipo: "L",
            texto:
              'Dizem que existe uma "câmara selada" no nível mais profundo de Morden que ninguém abriu em 200 anos. Algo pulsa lá dentro.',
          },
          {
            tipo: "P",
            texto:
              'Kaelen, o Veterano, disse em voz baixa no bar: "Isso já aconteceu antes. Há 20 anos. Naquela época, queimamos tudo. Desta vez não temos adamante para queimar."',
          },
          {
            tipo: "V",
            texto:
              "Três crianças do Setor 3 desenharam a mesma imagem na escola esta manhã: uma árvore gigante com olhos, crescendo de dentro de Morden.",
          },
          {
            tipo: "F",
            texto:
              'A água de Morden está envenenada. É por isso que todos estão "loucos".',
          },
          {
            tipo: "L",
            texto:
              'Os anões mais velhos cantam uma canção sobre "O Dia em que a Montanha Sangrou Verde". Ninguém lembra a letra completa.',
          },
        ],
      },
      sabotagem: {
        sinopse:
          "Explosões simultâneas destruíram três torres de vigilância no perímetro leste de Morden. As runas defensivas que mantêm a Floresta dos Ecos à distância estão falhando setor por setor, como se alguém estivesse desativando-as de dentro. A Legião Leste pede reforços, mas o Conselho de Artífices recusa — não há adamante suficiente para reparos e armamento ao mesmo tempo. Alguém está forçando Morden a escolher entre se proteger de fora ou se destruir por dentro.",
        capitulos: [
          {
            titulo: "A Torre Caída",
            introducao:
              'A Torre de Vigilância Leste-3 é um esqueleto de adamante retorcido. Metal que deveria resistir a qualquer força natural está dobrado como papel. Fumaça negra sobe dos escombros enquanto legionários feridos são carregados em macas improvisadas. O Comandante da Legião Leste, o veterano Korvak, cruza os braços diante da destruição: "Isto não foi um acidente. Alguém sabotou as runas de sustentação. Alguém de dentro."',
            objetivo:
              "Investigar a sabotagem das torres e identificar o traidor antes que as defesas de Morden colapsem completamente.",
            pistas: [
              'Os resíduos rúnicos na base da torre mostram que as runas foram "invertidas", não destruídas. Isto requer conhecimento avançado de Runesmithing — apenas 12 pessoas em Morden têm essa capacidade. Teste Mental + Runesmithing DC 14.',
              "Um fragmento de uma luva de couro com o emblema da Inquisição da Pureza é encontrado nos escombros. Mas o Inquisidor-Chefe jura que nenhum de seus agentes esteve ali.",
              "O registro de acesso do portão leste mostra que alguém usou a credencial do Mestre Artífice Thorne — mas Thorne estava em reunião no Conselho na hora da explosão. Alguém clonou sua credencial.",
              'Um operário ferido sussurra antes de desmaiar: "Vi... o homem da máscara de cobre... mexendo nos cristais..."',
            ],
            cenas: [
              {
                titulo: "Os Escombros Falam",
                descricao:
                  "Os heróis vasculham os destroços fumegantes da Torre Leste-3. O metal ainda está quente. Entre as vigas retorcidas, corpos de 4 legionários jazem sob os escombros — mas um deles ainda respira. Enquanto o grupo investiga, um segundo tremor sacode a área: a Torre Leste-4, a 200 metros de distância, também começa a emitir faíscas erráticas. As runas estão sendo desativadas AGORA, em tempo real. Se não encontrarem o dispositivo de sabotagem, a próxima torre cai em 30 minutos.",
                objetivo:
                  "Encontrar o dispositivo de sabotagem da Torre Leste-4 antes que ela colapse.",
                teste: {
                  eixo: "Mental",
                  pericia: "Investigação",
                  dc: 14,
                  sucesso:
                    "O herói localiza um cristal rúnico modificado embutido na base da Torre Leste-4. Está emitindo um pulso que inverte as runas de sustentação. Pode ser removido com cuidado (Físico DC 13) ou destruído (mas a torre perde 30% da capacidade defensiva permanentemente).",
                  falha:
                    "O herói não encontra o dispositivo a tempo. A Torre Leste-4 colapsa parcialmente — 1d6 legionários morrem. +1 Ponto de Corrupção. A investigação fica 2 horas atrasada.",
                },
              },
              {
                titulo: "Caçada nos Dutos",
                descricao:
                  "As pistas levam a uma rede de túneis de manutenção que conectam todas as torres. Nos túneis, os heróis encontram o sabotador: não é um, são três — mercenários contratados equipados com armas de adamante que não deveriam existir fora das armarias militares. Eles não esperam ser encontrados e lutam desesperadamente. O líder usa uma Máscara de Cobre que distorce sua voz. Os túneis são estreitos (1,5m de largura), cheios de canos de vapor que podem explodir, e escuros — o combate será caótico.",
                objetivo:
                  "Derrotar ou capturar os sabotadores e interrogar o líder.",
                teste: {
                  eixo: "Físico",
                  pericia: "Conflito",
                  dc: 15,
                  sucesso:
                    "O herói usa os canos de vapor a seu favor: rompe um cano (Físico DC 13) e cria uma cortina de vapor que dá Desvantagem aos inimigos por 1 rodada. O jato causa 1d8 de dano de fogo a quem estiver na área.",
                  falha:
                    "Um cano explode atingindo o herói: 2d6 de dano de fogo e fica Cego por 1 rodada.",
                },
              },
              {
                titulo: "O Homem por Trás da Máscara",
                descricao:
                  'Se capturado, o líder da máscara de cobre (se removida: é Maltheus, ex-Mestre Artífice expulso há 5 anos por "pesquisas proibidas") revela sob pressão que foi contratado por alguém do Conselho de Artífices. Não sabe quem — a comunicação era por bilhetes anônimos e pagamentos em adamante não-rastreável. Porém ele oferece uma troca: "Me deixem vivo e conto onde estão os dispositivos nas outras 6 torres. Me entreguem à Inquisição e eles vão me quemar antes que eu fale — e as torres caem em 48 horas."',
                objetivo:
                  "Decidir o que fazer com Maltheus e suas informações.",
                teste: {
                  eixo: "Social",
                  pericia: "Intimidação",
                  dc: 15,
                  sucesso:
                    "Maltheus entrega a localização exata de todos os dispositivos E o nome do intermediário que o contratou: Hela, a informante da Teia da Viúva.",
                  falha:
                    "Maltheus dá apenas 3 das 6 localizações e mente sobre a terceira — levando os heróis a uma armadilha na Torre Norte-2.",
                },
              },
            ],
          },
        ],
        sideQuests: [
          {
            titulo: "As Armas Fantasma",
            descricao:
              "Os sabotadores usavam armas de adamante que sumiram dos registros militares há 2 meses. Quem está desviando armamento?",
            objetivo:
              "Infiltrar o depósito militar e descobrir quem falsificou os registros.",
            cena1:
              "No depósito, o inventário foi adulterado. Teste Mental + Investigação DC 15 revela que 34 espadas, 12 escudos e 200kg de adamante bruto desapareceram. O guarda noturno, Drex, parece nervoso.",
            cena2:
              "Drex, confrontado, confessa que vendia armas para Hela (Teia da Viúva) em troca de medicamentos para sua filha doente. Entregar Drex à Legião: +2 Favor Legião. Perdoar e entregar apenas Hela: a filha de Drex sobrevive, +1 Favor Teia da Viúva.",
            recompensa:
              "+2 Favor com a facção escolhida. Acesso ao depósito militar para comprar equipamento raro.",
            efeitoEpilogo: -1,
          },
        ],
        rumores: [
          {
            tipo: "V",
            texto:
              "Três torres de vigilância caíram nesta semana. Os legionários estão apavorados — sem as torres, a Floresta avança 10 metros por dia.",
          },
          {
            tipo: "P",
            texto:
              "O Mestre Artífice Thorne foi visto discutindo acaloradamente com um homem encapuzado na Taverna do Pistão, 3 noites antes das explosões.",
          },
          {
            tipo: "V",
            texto:
              "As runas defensivas de Morden estão piscando em vermelho pela primeira vez em 50 anos. Os Runesmiths estão em pânico.",
          },
          {
            tipo: "F",
            texto:
              "Os Anões de Dungard estão sabotando Morden para forçar uma aliança comercial desvantajosa.",
          },
          {
            tipo: "P",
            texto:
              "Armas de adamante militar apareceram no mercado negro do Distrito Baixo. São iguais às que sumiram do depósito há 2 meses.",
          },
          {
            tipo: "L",
            texto:
              'Dizem que Maltheus, o Artífice Banido, jurou vingança contra o Conselho antes de ser expulso: "Vou devolver Morden à floresta."',
          },
          {
            tipo: "V",
            texto:
              "O Inquisidor-Chefe convocou uma reunião de emergência secreta. Apenas 3 pessoas foram convidadas. Ninguém sabe o que discutiram.",
          },
          {
            tipo: "F",
            texto:
              "As torres estão caindo porque o adamante está velho e enferrujado. Não há sabotagem, é negligência do Conselho.",
          },
          {
            tipo: "P",
            texto:
              'Hela, a informante, ofereceu "proteção" a comerciantes do setor leste — por um preço. Como ela sabia que o setor ficaria vulnerável?',
          },
          {
            tipo: "V",
            texto:
              'Um cristal rúnico "modificado" foi encontrado por um operário de manutenção numa torre intacta. Estava prestes a ser ativado.',
          },
          {
            tipo: "L",
            texto:
              'Há rumores de que existe um "Protocolo Ferrugem" — um plano para derrubar TODAS as defesas de Morden de uma vez. Criado como último recurso de evacuação há 100 anos, mas o projeto sumiu dos arquivos.',
          },
          {
            tipo: "P",
            texto:
              "O fornecimento de adamante das minas profundas caiu 60% sem explicação. Sem adamante, sem reparos nas torres. Coincidência?",
          },
          {
            tipo: "F",
            texto:
              "É a Floresta dos Ecos que está derrubando as torres. As raízes estão mais fortes do que nunca.",
          },
          {
            tipo: "V",
            texto:
              "Um legionário desertor foi capturado tentando cruzar o perímetro para a Floresta. Carregava um mapa detalhado das defesas de Morden.",
          },
          {
            tipo: "P",
            texto:
              "O Conselho de Artífices votou em segredo para cortar o orçamento da Legião Leste há 6 meses. A Legião não foi informada oficialmente.",
          },
          {
            tipo: "L",
            texto:
              "Velhos soldados contam que a última vez que as torres caíram, há 70 anos, os morphs invadiram o Setor 7 em 3 dias. Levaram 200 vidas para reconquistar.",
          },
          {
            tipo: "V",
            texto:
              "Uma mulher de capa roxa foi vista saindo dos túneis de manutenção à noite. Ninguém a reconheceu, mas caminhava como se conhecesse cada passagem.",
          },
          {
            tipo: "F",
            texto:
              "Os Drakari estão planejando uma invasão e as explosões são diversão para enfraquecer as defesas.",
          },
          {
            tipo: "P",
            texto:
              "O registro de acesso dos portões mostra que 3 pessoas entraram com a credencial de Thorne na mesma noite. Thorne só tem 1 credencial.",
          },
          {
            tipo: "V",
            texto:
              'As crianças do Setor 3 se recusam a dormir. Dizem que ouvem "a montanha chorando" à noite.',
          },
        ],
      },
    },
  };

  // Fallback genérico para cenários sem narrativa específica
  const NARRATIVA_GENERICA = {
    sinopse: (c) =>
      `Uma ameaça se ergue em ${c.nome}. Relatos alarmantes chegam de viajantes e moradores: desaparecimentos, fenômenos inexplicáveis e tensões crescentes entre as facções locais. O grupo é convocado para investigar, mas logo descobre que as raízes do problema são mais profundas — e mais pessoais — do que qualquer um imaginava. Cada escolha terá consequências duradouras para a região e seus habitantes.`,
    capitulo: (cenarioData, conflito, idx) => ({
      titulo:
        [
          "O Chamado",
          "A Escalada",
          "O Ponto de Virada",
          "A Tempestade",
          "O Confronto Final",
        ][idx] || `Ato ${idx + 1}`,
      introducao: `O grupo chega a ${cenarioData.nome.split(",")[0]}. ${cenarioData.atmosfera.inicio.visao}. ${cenarioData.atmosfera.inicio.som}. Os moradores olham com uma mistura de esperança e desconfiança. Um informante local — nervoso, olhando por cima do ombro — confirma os piores rumores: a ameaça é real e está crescendo. Em 3 dias, será tarde demais para agir.`,
      objetivo: `Investigar a ameaça de ${conflito ? conflito.nome : "a região"} e encontrar uma solução antes que a situação fique irreversível.`,
      pistas: [
        `Um documento oficial encontrado num corpo de mensageiro revela que o Conselho local SABIA do problema há semanas, mas tentou resolver em silêncio.`,
        `Marcas incomuns no solo sugerem que a ameaça não é natural — alguém ou algo está dirigindo o caos deliberadamente.`,
        `Um sobrevivente encontrado num esconderijo improvisado balbucia informações fragmentadas: viu "a pessoa responsável" e pode identificá-la. Mas está ferido e precisa de cura.`,
        `Registros comerciais mostram compras massivas de um recurso específico nas últimas semanas — suprimentos que seriam necessários apenas se alguém estivesse planejando uma operação de grande escala.`,
      ],
    }),
    cenas: (cenarioData, nd, dcBase) => [
      {
        titulo: "O Rastro",
        descricao: `O grupo segue as primeiras pistas por ${cenarioData.nome.split(",")[0]}. ${cenarioData.atmosfera.inicio.visao}. O ar traz o cheiro de ${cenarioData.atmosfera.inicio.cheiro.toLowerCase()}. Um contato local marca encontro num local discreto e relata o que viu: figuras misteriosas operando durante a noite, carregando equipamento estranho para um local que todos evitam. O contato entrega um mapa rudimentar com a localização marcada, mas avisa: "Se falaar que eu ajudei vocês, minha família paga o preço."`,
        objetivo:
          "Coletar informações iniciais e decidir a abordagem: investigação discreta ou confronto direto.",
        teste: {
          eixo: "Mental",
          pericia: "Percepção",
          dc: dcBase,
          sucesso: `O herói percebe que estão sendo observados por um espião no telhado adjacente. Podem capturá-lo para obter mais informações — ele carrega uma mensagem codificada que revela o plano do vilão.`,
          falha: `O espião foge e alerta os inimigos. Os encontros futuros ficam mais difíceis (+2 DC nos próximos testes do capítulo).`,
        },
      },
      {
        titulo: "O Covil",
        descricao: `Seguindo o mapa, o grupo chega ao esconderijo da ameaça. ${cenarioData.atmosfera.meio.visao}. O local é mais fortificado do que esperavam — armadilhas no perímetro, sentinelas armadas e o som de atividade frenética lá dentro. No centro da operação, os inimigos estão realizando uma ação que, se concluída, tornará a ameaça permanente. O grupo tem 5 rodadas para agir antes que o ritual/máquina/processo seja completado.`,
        objetivo:
          "Interromper a operação inimiga e neutralizar a ameaça central.",
        teste: {
          eixo: "Físico",
          pericia: "Conflito",
          dc: dcBase + 2,
          sucesso: `O herói encontra o ponto fraco da operação e consegue sabotá-lo, dando Desvantagem a todos os inimigos por 2 rodadas.`,
          falha: `O herói ativa uma armadilha: ${Math.ceil(nd * 1.5)}d6 de dano e fica Derrubado.`,
        },
      },
      {
        titulo: "A Verdade",
        descricao: `Com a operação interrompida (ou concluída parcialmente), o verdadeiro responsável se revela — e não é quem o grupo esperava. É alguém que eles encontraram antes, alguém que parecia aliado. A motivação não é pura maldade: é desespero, vingança ou uma crença distorcida de que está fazendo o bem. O vilão oferece um argumento que faz sentido, e o grupo precisa decidir: justiça ou misericórdia?`,
        objetivo: "Confrontar a verdade e tomar a decisão final.",
        teste: {
          eixo: "Social",
          pericia: "Interação",
          dc: dcBase + 1,
          sucesso: `O herói encontra as palavras certas e o vilão depõe as armas. Aceita julgamento público. A região ganha esperança.`,
          falha: `O vilão foge ou se sacrifica num ato final. A vitória fica amarga. +1 Ponto de Corrupção.`,
        },
      },
    ],
  };

  // ============================================================
  //  FORJA PRINCIPAL
  // ============================================================

  function forjar(dadosWizard) {
    const av = new AventuraBase(dadosWizard);
    const cenarioData = ForgeTables.CENARIOS[av.cenario];
    const narr = _getNarrativa(av.cenario, av.conflito);
    const conflito = cenarioData
      ? cenarioData.conflitos.find((c) => c.id === av.conflito)
      : null;

    // Sinopse
    av.sinopse = narr
      ? narr.sinopse
      : NARRATIVA_GENERICA.sinopse(cenarioData || { nome: av.cenario });

    // Capítulos
    _gerarCapitulos(av, narr, cenarioData, conflito);
    _gerarNpcs(av);
    _gerarFaccoes(av, cenarioData);
    _gerarEpilogos(av, cenarioData);
    _gerarRumores(av, narr);
    _gerarSideQuests(av, narr);

    return av;
  }

  function _getNarrativa(cenario, conflito) {
    if (NARRATIVAS[cenario] && NARRATIVAS[cenario][conflito])
      return NARRATIVAS[cenario][conflito];
    return null;
  }

  function _gerarCapitulos(av, narr, cenarioData, conflito) {
    const numCaps = { oneshot: 1, mini: 3, campanha: 5 }[av.duracao] || 1;

    for (let i = 0; i < numCaps; i++) {
      const nivel = av.tier === 1 ? i + 1 : (av.tier - 1) * 5 + i + 1;
      const fase =
        i < numCaps * 0.33 ? "inicio" : i < numCaps * 0.66 ? "meio" : "climax";
      const atmos = cenarioData ? cenarioData.atmosfera[fase] : null;
      const { nd } = ForgeMonsters.calcularEncontro(
        av.tier,
        av.dificuldade,
        av.jogadores,
      );
      const ndCap = Math.max(1, nd + Math.floor(i * 0.5));
      const dcBase = 10 + av.tier * 3 + i;

      let capData;
      if (narr && narr.capitulos && narr.capitulos[i]) {
        capData = narr.capitulos[i];
      } else {
        capData = NARRATIVA_GENERICA.capitulo(
          cenarioData || {
            nome: av.cenario,
            atmosfera: { inicio: { visao: "", som: "" } },
          },
          conflito,
          i,
        );
      }

      const cenas =
        narr && narr.capitulos && narr.capitulos[i] && narr.capitulos[i].cenas
          ? narr.capitulos[i].cenas.map((c, ci) =>
              _enriquecerCena(c, ci, av, ndCap, cenarioData),
            )
          : _gerarCenasGenericas(av, ndCap, dcBase, cenarioData);

      av.capitulos.push({
        numero: i + 1,
        titulo: `Capítulo ${_roman(i + 1)}: ${capData.titulo}`,
        nivel,
        fase,
        atmosfera: atmos,
        introducao: capData.introducao,
        objetivo: capData.objetivo,
        pistas: capData.pistas,
        cenas,
        recompensa: _gerarRecompensa(av.tier, i),
      });
    }
  }

  function _gerarCenasGenericas(av, nd, dcBase, cenarioData) {
    const cd = cenarioData || {
      nome: av.cenario,
      atmosfera: {
        inicio: { visao: "", cheiro: "O ambiente" },
        meio: { visao: "" },
        climax: {},
      },
    };
    const baseCenas = NARRATIVA_GENERICA.cenas(cd, nd, dcBase);

    // Cena 2 (O Covil) — adicionar monstros
    const { quantidade } = ForgeMonsters.calcularEncontro(
      av.tier,
      av.dificuldade,
      av.jogadores,
    );
    const monstros = [];
    for (let m = 0; m < quantidade; m++)
      monstros.push(ForgeMonsters.gerarMonstro(av.cenario, nd, m));
    baseCenas[1].monstros = monstros;
    baseCenas[1].mecanicaCenario = cenarioData
      ? ForgeTables.random(cenarioData.mecanicasCenario)
      : "Terreno difícil em área aleatória";

    // Cena 3 (A Verdade) — adicionar dilema
    baseCenas[2].dilema = ForgeTables.random(ForgeTables.DILEMAS);

    return baseCenas;
  }

  function _enriquecerCena(cena, idx, av, nd, cenarioData) {
    if (idx === 1 && !cena.monstros) {
      const { quantidade } = ForgeMonsters.calcularEncontro(
        av.tier,
        av.dificuldade,
        av.jogadores,
      );
      const monstros = [];
      for (let m = 0; m < quantidade; m++)
        monstros.push(ForgeMonsters.gerarMonstro(av.cenario, nd, m));
      cena.monstros = monstros;
      cena.mecanicaCenario = cenarioData
        ? ForgeTables.random(cenarioData.mecanicasCenario)
        : "Terreno difícil em área aleatória";
    }
    if (idx === 2 && !cena.dilema) {
      cena.dilema = ForgeTables.random(ForgeTables.DILEMAS);
    }
    return cena;
  }

  // Habilidades temáticas por tipo de NPC
  const HABILIDADES_NPC = {
    mentor: {
      perfil: "mental",
      focos: ["interacao", "percepcao"],
      passivas: [
        {
          nome: "Olhos de Experiência",
          mecanica:
            "Vantagem em testes de Mental + Interação (Percepção) para detectar mentiras e emboscadas.",
        },
        {
          nome: "Autoridade Natural",
          mecanica:
            "Aliados a 6m ganham +1 em testes de Mental + Resistência contra Medo e Charme.",
        },
      ],
      ativas: [
        {
          nome: "Conselho Sábio",
          custo: "1 Ação",
          mecanica:
            "1× por cena: um aliado a 9m pode rerolar um teste falhado.",
          descricao:
            "Palavras precisas no momento certo, fruto de décadas de experiência.",
        },
        {
          nome: "Golpe Contido",
          custo: "1 Ação",
          mecanica:
            "Ataque Melee. +ATQ. Dano: DADOS. Pode optar por dano não-letal.",
          descricao: "Golpe medido — ensina uma lição sem matar.",
        },
      ],
    },
    rival: {
      perfil: "fisico",
      focos: ["conflito", "resistencia"],
      passivas: [
        {
          nome: "Determinação Implacável",
          mecanica:
            "1× por cena: ao cair a 0 HP, volta com 1 HP e faz um ataque gratuito.",
        },
        {
          nome: "Presença Intimidadora",
          mecanica:
            "Inimigos a 3m sofrem -1 em testes de ataque contra o rival (aura de pressão).",
        },
      ],
      ativas: [
        {
          nome: "Golpe Decisivo",
          custo: "2 Ações",
          mecanica:
            "Ataque Melee. +ATQ+2. Dano: DADOS + ND extra. Se crítico: alvo fica Atordoado por 1 rodada.",
          descricao: "Golpe com toda a força, concentrado num único ponto.",
        },
        {
          nome: "Provocação",
          custo: "1 Ação",
          mecanica:
            "Alvo a 9m faz Teste de Mental + Resistência DC. Falha: obrigado a atacar o rival no próximo turno.",
          descricao: "Insulto preciso que atinge onde dói.",
        },
      ],
    },
    aliado: {
      perfil: "social",
      focos: ["interacao", "vontade"],
      passivas: [
        {
          nome: "Rede de Contatos",
          mecanica:
            "Vantagem em testes de Social + Interação para obter informações e favores em áreas urbanas.",
        },
        {
          nome: "Presença Reconfortante",
          mecanica:
            "Aliados a 6m recuperam +2 Vigor extra em Descansos Curtos.",
        },
      ],
      ativas: [
        {
          nome: "Palavras de Encorajamento",
          custo: "1 Ação",
          mecanica:
            "Aliado a 9m ganha HP Temporário igual a 1d6 + ND do aliado. Dura até o fim da cena.",
          descricao: "Discurso motivacional que reacende a chama interior.",
        },
        {
          nome: "Negociação Rápida",
          custo: "1 Ação",
          mecanica:
            "Teste de Social + Interação DC. Sucesso: inimigo inteligente hesita e perde 1 Ação no próximo turno.",
          descricao: "Oferta ou blefe que faz o oponente pensar duas vezes.",
        },
      ],
    },
  };

  function _gerarNpcs(av) {
    const qtd = { oneshot: 6, mini: 10, campanha: 15 }[av.duracao] || 6;
    const nomes =
      ForgeTables.NOMES_NPC[av.cenario] || ForgeTables.NOMES_NPC.morden;
    const nomesEscolhidos = ForgeTables.randomN(
      nomes,
      Math.min(qtd, nomes.length),
    );
    const tipos = ["mentor", "rival", "aliado"];
    nomesEscolhidos.forEach((nome, i) => {
      const tipo = tipos[i % tipos.length];
      const motivacao = ForgeTables.random(ForgeTables.MOTIVACOES);
      const nd = Math.max(1, av.tier + Math.floor(i / 3));
      const hab = HABILIDADES_NPC[tipo];
      const base =
        ForgeMonsters.TABELA_MESTRA[nd] || ForgeMonsters.TABELA_MESTRA[1];
      const eixos = ForgeMonsters.calcularEixos(nd);

      // Recalcular eixos com perfil do NPC
      const forte = Math.floor(nd / 2) + 2;
      const medio = Math.floor(nd / 4) + 1;
      const fraco = Math.max(0, Math.floor(nd / 6));
      const eixosNpc =
        hab.perfil === "mental"
          ? { fisico: medio, mental: forte, social: fraco }
          : hab.perfil === "social"
            ? { fisico: fraco, mental: medio, social: forte }
            : { fisico: forte, mental: medio, social: fraco };

      // Aplicações
      const aplicacoes = {
        conflito: {
          valor: eixosNpc.fisico + (hab.focos.includes("conflito") ? 0 : -2),
          eixo: "Físico",
        },
        resistencia: {
          valor: eixosNpc.fisico + (hab.focos.includes("resistencia") ? 0 : -2),
          eixo: "Físico",
        },
        interacao: {
          valor: eixosNpc.mental + (hab.focos.includes("interacao") ? 0 : -2),
          eixo: "Mental",
        },
        percepcao: {
          valor: eixosNpc.mental + (hab.focos.includes("percepcao") ? 0 : -2),
          eixo: "Mental",
        },
        vontade: {
          valor: eixosNpc.social + (hab.focos.includes("vontade") ? 0 : -2),
          eixo: "Social",
        },
      };

      const hp = ForgeMonsters.calcularHP(nd, "Atacante");
      const ca = ForgeMonsters.calcularCA(nd, "Atacante");
      const ataque = base.ataque || 3;
      const dc = base.dc || 12;
      const iniciativa =
        eixosNpc.mental +
        Math.max(0, aplicacoes.interacao.valor - eixosNpc.mental);

      // Processar ativas com valores calculados
      const ativas = hab.ativas.map((a) => {
        let mec = a.mecanica;
        mec = mec.replace(/\+ATQ/g, `+${ataque}`);
        mec = mec.replace(/DADOS/g, base.dadosFis || "1d6+2");
        mec = mec.replace(/ DC(?!\d)/g, ` DC ${dc}`);
        mec = mec.replace(/ND/g, `${nd}`);
        return { ...a, mecanica: mec };
      });

      av.npcs.push({
        nome,
        tipo,
        descricaoFisica: ForgeTables.random(ForgeTables.DESCRICOES_FISICAS),
        desejo: motivacao.desejo,
        medo: motivacao.medo,
        segredo: motivacao.segredo,
        falaIconica: ForgeTables.random(ForgeTables.DIALOGOS_POR_TIPO[tipo]),
        stats: {
          nd,
          hp,
          ca,
          ataque: `+${ataque}`,
          dadosDano: base.dadosFis || "1d6+2",
          dc,
          eixos: eixosNpc,
          aplicacoes,
          iniciativa: `+${Math.max(0, iniciativa)}`,
          vigor: Math.max(1, Math.floor(nd / 2) + 2),
          ee: Math.max(1, Math.floor(nd * 1.5) + 2),
          velocidade: "9m (6 casas)",
          passivas: hab.passivas,
          ativas,
        },
      });
    });
  }

  function _gerarFaccoes(av, cenarioData) {
    if (!cenarioData) return;
    av.faccoes = cenarioData.faccoes.map((nome) => ({
      nome,
      favor: 0,
      prestigio: [
        { nivel: 1, recompensa: "+1 em testes sociais com membros" },
        { nivel: 3, recompensa: "Acesso a equipamento especial da facção" },
        { nivel: 5, recompensa: "Talento exclusivo da facção" },
      ],
    }));
  }

  function _gerarEpilogos(av, cenarioData) {
    const nome = cenarioData ? cenarioData.nome : "a região";
    av.epilogo = {
      contadorNome: "Corrupção",
      contadorMax: 10,
      finais: [
        {
          tipo: "bom",
          faixa: "0-3",
          titulo: "🌕 O Renascimento",
          descricao: `Os heróis impediram o pior. ${nome} começa a se recuperar. Os mortos são honrados, os feridos curados, e as facções, por um momento, se unem em gratidão. O Conselho oferece cidadania honorária e acesso às reservas de adamante. A população conta histórias sobre o grupo durante anos. Mas nos cantos escuros da cidade, alguém sussurra: "Foi sorte. Da próxima vez não serão tão rápidos."`,
        },
        {
          tipo: "neutro",
          faixa: "4-7",
          titulo: "🌓 A Trégua Amarga",
          descricao: `${nome} sobrevive, mas com cicatrizes profundas. As defesas foram restauradas parcialmente, mas o medo permanece. As facções se culpam mutuamente. Os heróis recebem gratidão de uns e ressentimento de outros. A ameaça recuou, mas não desapareceu — está esperando. A próxima vez será pior, e todos sabem disso.`,
        },
        {
          tipo: "sombrio",
          faixa: "8-10",
          titulo: "🌑 O Grande Silêncio",
          descricao: `${nome} cai. Não num estrondo glorioso, mas num silêncio terrível. Os setores esvaziam um a um. Os sobreviventes fogem carregando o que conseguem, olhando para trás com olhos que nunca esquecerão. Os heróis sobreviveram, mas a vitória que imaginavam nunca veio. Na estrada, um refugiado pergunta: "Vocês fizeram o possível?" A resposta não importa mais.`,
        },
      ],
    };
  }

  function _gerarRumores(av, narr) {
    if (narr && narr.rumores) {
      av.tabelas.rumores = narr.rumores;
      return;
    }
    const cenarioData = ForgeTables.CENARIOS[av.cenario];
    const n = cenarioData ? cenarioData.nome.split(",")[0] : av.cenario;
    const tipos = ["V", "F", "P", "L"];
    av.tabelas.rumores = Array.from({ length: 20 }, (_, i) => ({
      numero: i + 1,
      tipo: tipos[i % 4],
      texto: [
        `Viajantes vindos do norte relatam fenômenos estranhos: luzes que se movem sozinhas e sons de metal batendo à noite.`,
        `O preço dos suprimentos em ${n} triplicou da noite pro dia. Alguém está acumulando estoques.`,
        `Um mercador ambulante jura que viu o líder da facção principal conversando com figuras encapuzadas fora dos portões.`,
        `Dizem que os guardas encontraram corpos nas fronteiras — não de combate, mas de algo que arrancou a energia vital.`,
        `Uma velha curandeira alerta: "A terra está doente. Posso sentir na água." Ninguém leva a sério, mas ela nunca errou.`,
        `Três crianças desapareceram do distrito residencial. As famílias estão desesperadas e culpam o Conselho.`,
        `O ferreiro principal da cidade se recusa a forjar armas há uma semana. Diz que "o metal está diferente".`,
        `Um bêbado na taverna mostra uma moeda antiga com símbolos que ninguém reconhece. Diz que encontrou dezenas delas num túnel.`,
        `Animais domésticos estão fugindo na direção oposta à ameaça. Cavalos se recusam a ir para o leste.`,
        `O sacerdote local trancou o templo e não recebe ninguém. Seus assistentes dizem que ele está "em vigília".`,
        `Soldados veteranos estão pedindo transferência. Um deles disse: "Eu já vi isso antes, no último conflito. Não acaba bem."`,
        `Uma caravana de refugiados chegou ontem. Vieram de uma vila 2 dias ao norte que "simplesmente desapareceu".`,
        `O poço central da cidade está com a água turva pela primeira vez em 100 anos.`,
        `Um informante oferece informações por 200 PO. Parece confiável mas tem cicatrizes recentes no rosto.`,
        `Dois conselheiros brigaram publicamente na praça. Um acusou o outro de "saber mais do que deveria".`,
        `Houve terremotos leves nas últimas 3 noites. Os mineradores dizem que vem de algo se movendo no subsolo.`,
        `A guilda local está recrutando mercenários a preços altíssimos. Nunca pagaram tanto por proteção.`,
        `Um mapa antigo apareceu no mercado negro. Mostra passagens secretas sob a cidade que não estão em nenhum registro oficial.`,
        `Moradores do bairro norte relatam pesadelos compartilhados: todos sonham com o mesmo rosto.`,
        `O líder militar mandou reforçar os portões e cancelar todas as licenças. Ninguém sai nem entra sem autorização.`,
      ][i],
    }));
  }

  function _gerarSideQuests(av, narr) {
    if (narr && narr.sideQuests) {
      av.sideQuests = narr.sideQuests;
      return;
    }
    av.sideQuests = [
      {
        titulo: "O Mensageiro Perdido",
        descricao:
          "Um mensageiro oficial desapareceu há 3 dias com documentos importantes. Sua rota passava perto da zona de perigo.",
        objetivo:
          "Encontrar o mensageiro (vivo ou morto) e recuperar os documentos.",
        cena1:
          "Rastreando a rota do mensageiro, o grupo encontra sinais de luta. Teste Mental + Rastreamento DC 13 revela que ele foi arrastado para fora da estrada por pelo menos 3 criaturas.",
        cena2:
          'O mensageiro está vivo mas preso numa caverna, guardado por criaturas que parecem estar acumulando "suprimentos humanos". Os documentos que ele carregava revelam que o Conselho planejava evacuar secretamente os mais ricos e abandonar a população.',
        recompensa:
          "O mensageiro se torna informante (+1 Favor com facção). Os documentos podem ser usados para pressionar o Conselho.",
        efeitoEpilogo: -1,
      },
    ];
  }

  // ============================================================
  //  RENDERIZAÇÃO HTML
  // ============================================================

  function toHTML(av) {
    let html = "";
    const cenarioData = ForgeTables.CENARIOS[av.cenario];
    const cenarioNome = cenarioData ? cenarioData.nome : av.cenario;

    html += `<h1>⚔️ ${av.titulo}</h1>`;
    html += `<p><strong>Cenário:</strong> ${cenarioNome} | <strong>Tier:</strong> ${av.tier} | <strong>Jogadores:</strong> ${av.jogadores} | <strong>Dificuldade:</strong> ${av.dificuldade}</p>`;
    html += `<p><strong>Tom:</strong> ${av.tons.join(" + ")} | <strong>Duração:</strong> ${av.duracao}</p>`;

    // Sinopse
    html += "<h2>📜 Sinopse</h2>";
    html += `<blockquote>${av.sinopse}</blockquote>`;

    // Epílogos
    html += "<h2>🏁 Epílogos</h2>";
    html += `<p>Contador: <strong>${av.epilogo.contadorNome}</strong> (0 a ${av.epilogo.contadorMax}). Cada dilema, side-quest e decisão altera este valor.</p>`;
    html +=
      "<table><thead><tr><th>Faixa</th><th>Final</th><th>Descrição</th></tr></thead><tbody>";
    av.epilogo.finais.forEach(
      (f) =>
        (html += `<tr><td>${f.faixa}</td><td>${f.titulo}</td><td>${f.descricao}</td></tr>`),
    );
    html += "</tbody></table>";

    // Facções
    if (av.faccoes.length) {
      html += "<h2>🛡️ Facções</h2>";
      html +=
        "<table><thead><tr><th>Facção</th><th>Favor</th><th>Nível 1</th><th>Nível 3</th><th>Nível 5</th></tr></thead><tbody>";
      av.faccoes.forEach((f) => {
        html += `<tr><td><strong>${f.nome}</strong></td><td>0</td>`;
        f.prestigio.forEach((p) => (html += `<td>${p.recompensa}</td>`));
        html += "</tr>";
      });
      html += "</tbody></table>";
    }

    // Capítulos
    av.capitulos.forEach((cap) => {
      html += `<h2>📖 ${cap.titulo}</h2>`;
      if (cap.introducao) html += `<p>${cap.introducao}</p>`;
      html += `<p><strong>🎯 Objetivo:</strong> ${cap.objetivo}</p>`;

      if (cap.atmosfera) {
        html += "<blockquote><strong>🎭 Atmosfera:</strong><br>";
        html += `👁️ ${cap.atmosfera.visao}<br>👂 ${cap.atmosfera.som}<br>👃 ${cap.atmosfera.cheiro}<br>✋ ${cap.atmosfera.tato}<br>👅 ${cap.atmosfera.paladar}</blockquote>`;
      }

      if (cap.pistas && cap.pistas.length) {
        html += "<h3>🔍 Pistas</h3><ol>";
        cap.pistas.forEach((p) => (html += `<li>${p}</li>`));
        html += "</ol>";
      }

      cap.cenas.forEach((cena, ci) => {
        html += `<h3>Cena ${ci + 1}: ${cena.titulo}</h3>`;
        html += `<p>${cena.descricao}</p>`;
        if (cena.objetivo)
          html += `<p><strong>🎯 Objetivo da Cena:</strong> ${cena.objetivo}</p>`;

        if (cena.teste) {
          html += `<p>📋 <strong>Teste:</strong> ${cena.teste.eixo} + ${cena.teste.pericia} DC ${cena.teste.dc}</p>`;
          html += `<ul><li><strong>✅ Sucesso:</strong> ${cena.teste.sucesso}</li><li><strong>❌ Falha:</strong> ${cena.teste.falha}</li></ul>`;
        }

        if (cena.monstros && cena.monstros.length) {
          html += "<h4>⚔️ Encontro</h4>";
          if (cena.mecanicaCenario)
            html += `<p><em>🏗️ Mecânica de Cenário: ${cena.mecanicaCenario}</em></p>`;
          cena.monstros.forEach((m) => {
            html += _fichaComletaMonstro(m);
          });
        }

        if (cena.dilema) {
          html += `<h4>⚖️ Dilema: ${cena.dilema.titulo}</h4>`;
          html += `<ul><li><strong>Opção A — ${cena.dilema.opcaoA.nome}:</strong> ${cena.dilema.opcaoA.efeito}</li>`;
          html += `<li><strong>Opção B — ${cena.dilema.opcaoB.nome}:</strong> ${cena.dilema.opcaoB.efeito}</li></ul>`;
        }
      });
      html += `<p>🎁 <strong>Recompensa do Capítulo:</strong> ${cap.recompensa}</p><hr>`;
    });

    // Side-Quests
    if (av.sideQuests.length) {
      html += "<h2>📌 Side-Quests</h2>";
      av.sideQuests.forEach((sq) => {
        html += `<h3>${sq.titulo}</h3>`;
        html += `<p>${sq.descricao}</p>`;
        html += `<p><strong>🎯 Objetivo:</strong> ${sq.objetivo}</p>`;
        html += `<h4>Cena 1: Investigação</h4><p>${sq.cena1}</p>`;
        html += `<h4>Cena 2: Confronto</h4><p>${sq.cena2}</p>`;
        html += `<p>🎁 <strong>Recompensa:</strong> ${sq.recompensa}</p>`;
        html += `<p>📊 <strong>Efeito no Epílogo:</strong> ${sq.efeitoEpilogo > 0 ? "+" : ""}${sq.efeitoEpilogo} Ponto(s) de ${av.epilogo.contadorNome}</p><hr>`;
      });
    }

    // Rumores
    if (av.tabelas.rumores) {
      html += "<h2>🗣️ Tabela de Rumores (d20)</h2>";
      html +=
        "<table><thead><tr><th>d20</th><th>Tipo</th><th>Rumor</th></tr></thead><tbody>";
      av.tabelas.rumores.forEach((r) => {
        const tipoNome = {
          V: "Verdadeiro",
          F: "Falso",
          P: "Parcial",
          L: "Lenda",
        }[r.tipo];
        html += `<tr><td>${r.numero}</td><td><em>${tipoNome}</em></td><td>${r.texto}</td></tr>`;
      });
      html += "</tbody></table>";
    }

    // NPCs — Fichas Completas
    html += "<h2>\u{1F465} Personagens</h2>";
    av.npcs.forEach((npc) => {
      const s = npc.stats;
      const e = s.eixos;
      const ap = s.aplicacoes;
      html += `<div style="border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:1.5rem;margin:1rem 0;background:var(--color-bg-card)">`;
      html += `<h3 style="margin-top:0">${npc.nome} <span style="color:var(--color-text-muted)">(${npc.tipo}) \u2014 ND ${s.nd}</span></h3>`;
      html += `<p><em>${npc.descricaoFisica}</em></p>`;
      html += '<table><thead><tr><th>HP</th><th>CA</th><th>Ataque</th><th>Dano</th><th>DC</th><th>Iniciativa</th><th>Vigor</th><th>EE</th><th>Velocidade</th></tr></thead><tbody>';
      html += `<tr><td><strong>${s.hp}</strong></td><td><strong>${s.ca}</strong></td><td>${s.ataque}</td><td>${s.dadosDano}</td><td>${s.dc}</td><td>${s.iniciativa}</td><td>${s.vigor}</td><td>${s.ee}</td><td>${s.velocidade}</td></tr>`;
      html += '</tbody></table>';
      if (ap) {
        html += '<table><thead><tr><th>Eixo</th><th>Valor</th><th>Aplica\u00E7\u00E3o Focada</th><th>Aplica\u00E7\u00E3o N\u00E3o-Focada</th></tr></thead><tbody>';
        html += `<tr><td><strong>F\u00EDsico</strong></td><td>+${e.fisico}</td><td>Conflito +${Math.max(0,ap.conflito.valor)}</td><td>Resist\u00EAncia +${Math.max(0,ap.resistencia.valor)}</td></tr>`;
        html += `<tr><td><strong>Mental</strong></td><td>+${e.mental}</td><td>Intera\u00E7\u00E3o +${Math.max(0,ap.interacao.valor)}</td><td>Percep\u00E7\u00E3o +${Math.max(0,ap.percepcao.valor)}</td></tr>`;
        html += `<tr><td><strong>Social</strong></td><td>+${e.social || 0}</td><td colspan="2">Vontade +${Math.max(0,ap.vontade.valor)}</td></tr>`;
        html += '</tbody></table>';
      }
      if (s.passivas && s.passivas.length) {
        html += '<h4>\u{1F539} Passivas</h4><ul>';
        s.passivas.forEach(p => html += `<li><strong>${p.nome}:</strong> ${p.mecanica}</li>`);
        html += '</ul>';
      }
      if (s.ativas && s.ativas.length) {
        html += '<h4>\u{1F538} Ativas</h4><ul>';
        s.ativas.forEach(a => html += `<li><strong>[${a.custo}] ${a.nome}:</strong> ${a.mecanica}<br><em>${a.descricao}</em></li>`);
        html += '</ul>';
      }
      html += '<h4>\u{1F3AD} Motiva\u00E7\u00E3o</h4>';
      html += `<ul><li><strong>Desejo:</strong> ${npc.desejo}</li><li><strong>Medo:</strong> ${npc.medo}</li><li><strong>Segredo:</strong> ${npc.segredo}</li></ul>`;
      html += `<p>\u{1F4AC} <em>"${npc.falaIconica}"</em></p>`;
      html += '</div>';
    });
    return html;
  }

  function toMarkdown(av) {
    let md = `# ⚔️ ${av.titulo}\n\n`;
    const cenarioData = ForgeTables.CENARIOS[av.cenario];
    md += `**Cenário:** ${cenarioData ? cenarioData.nome : av.cenario}  \n`;
    md += `**Tier:** ${av.tier} | **Jogadores:** ${av.jogadores} | **Dificuldade:** ${av.dificuldade}\n\n`;
    md += `## 📜 Sinopse\n\n> ${av.sinopse}\n\n---\n\n`;

    av.capitulos.forEach((cap) => {
      md += `## ${cap.titulo}\n\n`;
      if (cap.introducao) md += `${cap.introducao}\n\n`;
      md += `**🎯 Objetivo:** ${cap.objetivo}\n\n`;
      if (cap.pistas) {
        md += `### 🔍 Pistas\n\n`;
        cap.pistas.forEach((p, i) => (md += `${i + 1}. ${p}\n`));
        md += "\n";
      }
      cap.cenas.forEach((cena, ci) => {
        md += `### Cena ${ci + 1}: ${cena.titulo}\n\n${cena.descricao}\n\n`;
        if (cena.objetivo) md += `**🎯 Objetivo:** ${cena.objetivo}\n\n`;
        if (cena.teste)
          md += `**Teste:** ${cena.teste.eixo} + ${cena.teste.pericia} DC ${cena.teste.dc}\n- ✅ **Sucesso:** ${cena.teste.sucesso}\n- ❌ **Falha:** ${cena.teste.falha}\n\n`;
        if (cena.monstros)
          cena.monstros.forEach((m) => {
            md += `#### ${m.nome} (${m.papel}, ND ${m.nd})\n`;
            md += `*${m.descricao}*\n\n`;
            md += `| HP | CA | Ataque | Dano | DC | Iniciativa | Vigor |\n`;
            md += `|:--:|:--:|:------:|:----:|:--:|:---------:|:-----:|\n`;
            md += `| ${m.hp} | ${m.ca} | ${m.ataque} | ${m.dadosDano} | ${m.dc} | ${m.iniciativa} | ${m.vigor} |\n\n`;
            md += `| Físico | Mental | Social |\n|:------:|:------:|:------:|\n| +${m.eixos.fisico} | +${m.eixos.mental} | +${m.eixos.social || 0} |\n\n`;
            if (m.passivas)
              m.passivas.forEach(
                (p) => (md += `- **${p.nome}:** ${p.mecanica}\n`),
              );
            if (m.ativas)
              m.ativas.forEach(
                (a) => (md += `- **[${a.custo}] ${a.nome}:** ${a.mecanica}\n`),
              );
            md += `\n**Comportamento:** *${m.comportamento}*\n\n`;
          });
        if (cena.dilema)
          md += `#### ⚖️ ${cena.dilema.titulo}\n- A) **${cena.dilema.opcaoA.nome}:** ${cena.dilema.opcaoA.efeito}\n- B) **${cena.dilema.opcaoB.nome}:** ${cena.dilema.opcaoB.efeito}\n\n`;
      });
      md += `**🎁 Recompensa:** ${cap.recompensa}\n\n---\n\n`;
    });
    md += '## \u{1F465} Personagens\n\n';
    av.npcs.forEach(npc => {
      const s = npc.stats;
      const e = s.eixos;
      const ap = s.aplicacoes;
      md += `### ${npc.nome} (${npc.tipo}) \u2014 ND ${s.nd}\n*${npc.descricaoFisica}*\n\n`;
      md += `| HP | CA | Ataque | Dano | DC | Iniciativa | Vigor | EE | Velocidade |\n`;
      md += `|:--:|:--:|:------:|:----:|:--:|:---------:|:-----:|:--:|:----------:|\n`;
      md += `| ${s.hp} | ${s.ca} | ${s.ataque} | ${s.dadosDano} | ${s.dc} | ${s.iniciativa} | ${s.vigor} | ${s.ee} | ${s.velocidade} |\n\n`;
      if (ap) {
        md += `| Eixo | Valor | Foco 1 | Foco 2 |\n|:----:|:-----:|:------:|:------:|\n`;
        md += `| F\u00EDsico | +${e.fisico} | Conflito +${Math.max(0,ap.conflito.valor)} | Resist\u00EAncia +${Math.max(0,ap.resistencia.valor)} |\n`;
        md += `| Mental | +${e.mental} | Intera\u00E7\u00E3o +${Math.max(0,ap.interacao.valor)} | Percep\u00E7\u00E3o +${Math.max(0,ap.percepcao.valor)} |\n`;
        md += `| Social | +${e.social || 0} | Vontade +${Math.max(0,ap.vontade.valor)} | \u2014 |\n\n`;
      }
      if (s.passivas) s.passivas.forEach(p => md += `- **${p.nome}:** ${p.mecanica}\n`);
      if (s.ativas) s.ativas.forEach(a => md += `- **[${a.custo}] ${a.nome}:** ${a.mecanica}\n`);
      md += `\n- **Desejo:** ${npc.desejo}\n- **Medo:** ${npc.medo}\n- **Segredo:** ${npc.segredo}\n- \u{1F4AC} *"${npc.falaIconica}"*\n\n---\n\n`;
    });
    return md;
  }

  function _roman(n) {
    return (
      ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][n - 1] || n
    );
  }
  function _gerarRecompensa(tier, capIdx) {
    const r = [
      `+1 em um Eixo à escolha e ${50 * tier} PO`,
      `Equipamento raro temático e +2 Favor com uma facção`,
      `Talento de Especialização e acesso a área restrita`,
      `Arma/Armadura +1 com nome único e ${100 * tier} PO`,
      `Relíquia do cenário e título honorário`,
    ];
    return r[capIdx] || r[0];
  }

  function _fichaComletaMonstro(m) {
    let h = "";
    h += `<div style="border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:1.5rem;margin:1rem 0;background:var(--color-bg-card)">`;
    h += `<h4 style="margin-top:0">${m.nome} <span style="color:var(--color-text-muted)">(${m.papel}) — ND ${m.nd}</span></h4>`;
    h += `<p><em>${m.descPapel}</em></p>`;
    h += `<p>${m.descricao}</p>`;

    // Stats base
    h +=
      "<table><thead><tr><th>HP</th><th>CA</th><th>Ataque</th><th>Dano</th><th>DC</th><th>Iniciativa</th><th>Vigor</th><th>EE</th><th>Velocidade</th><th>XP</th></tr></thead><tbody>";
    h += `<tr><td><strong>${m.hp}</strong></td><td><strong>${m.ca}</strong></td><td>${m.ataque}</td><td>${m.dadosDano}</td><td>${m.dc}</td><td>${m.iniciativa}</td><td>${m.vigor}</td><td>${m.ee}</td><td>${m.velocidade}</td><td>${m.xp}</td></tr>`;
    h += "</tbody></table>";

    // Eixos + Aplicações
    h +=
      "<table><thead><tr><th>Eixo</th><th>Valor</th><th>Aplicação Focada</th><th>Aplicação Não-Focada</th></tr></thead><tbody>";
    h += `<tr><td><strong>Físico</strong></td><td>+${m.eixos.fisico}</td><td>Conflito +${Math.max(0, m.aplicacoes.conflito.valor)}</td><td>Resistência +${Math.max(0, m.aplicacoes.resistencia.valor)}</td></tr>`;
    h += `<tr><td><strong>Mental</strong></td><td>+${m.eixos.mental}</td><td>Interação +${Math.max(0, m.aplicacoes.interacao.valor)}</td><td>Percepção +${Math.max(0, m.aplicacoes.percepcao.valor)}</td></tr>`;
    h += `<tr><td><strong>Social</strong></td><td>+${m.eixos.social || 0}</td><td colspan="2">Vontade +${Math.max(0, m.aplicacoes.vontade.valor)}</td></tr>`;
    h += "</tbody></table>";

    // Passivas
    if (m.passivas && m.passivas.length) {
      h += "<h5>🔹 Passivas</h5><ul>";
      m.passivas.forEach(
        (p) =>
          (h += `<li><strong>${p.nome}:</strong> ${p.mecanica} <em>(${p.origem})</em></li>`),
      );
      h += "</ul>";
    }

    // Ativas
    if (m.ativas && m.ativas.length) {
      h += "<h5>🔸 Ativas</h5><ul>";
      m.ativas.forEach(
        (a) =>
          (h += `<li><strong>[${a.custo}] ${a.nome}:</strong> ${a.mecanica}<br><em>${a.descricao}</em></li>`),
      );
      h += "</ul>";
    }

    // Comportamento
    h += `<p>🧠 <strong>Comportamento Tático:</strong> <em>${m.comportamento}</em></p>`;
    h += "</div>";
    return h;
  }

  return { forjar, toHTML, toMarkdown };
})();
