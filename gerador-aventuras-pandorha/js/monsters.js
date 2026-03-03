/**
 * MONSTERS.JS — Fichas Completas (Sistema Pandorha — Cap. 13 + 14)
 * Inclui: HP/CA/Ataque/Dano com dados, Eixos+Aplicações, Passivas oficiais, Ativas com custo de ação
 */

const ForgeMonsters = (() => {
  // Tabela Mestra oficial (Cap. 13, Seção 1)
  const TABELA_MESTRA = {
    1: {
      hp: 15,
      ca: 12,
      ataque: 3,
      danoMedio: 5,
      dc: 12,
      xp: 1,
      dadosFis: "1d6+2",
      dadosMag: "1d10",
    },
    2: {
      hp: 25,
      ca: 13,
      ataque: 5,
      danoMedio: 8,
      dc: 13,
      xp: 2,
      dadosFis: "1d8+3",
      dadosMag: "2d6",
    },
    3: {
      hp: 40,
      ca: 14,
      ataque: 7,
      danoMedio: 12,
      dc: 13,
      xp: 3,
      dadosFis: "2d6+5",
      dadosMag: "3d6",
    },
    4: {
      hp: 55,
      ca: 15,
      ataque: 9,
      danoMedio: 16,
      dc: 14,
      xp: 4,
      dadosFis: "2d8+6",
      dadosMag: "4d6",
    },
    5: {
      hp: 70,
      ca: 16,
      ataque: 10,
      danoMedio: 22,
      dc: 15,
      xp: 5,
      dadosFis: "3d8+8",
      dadosMag: "6d6",
    },
    6: {
      hp: 90,
      ca: 17,
      ataque: 11,
      danoMedio: 28,
      dc: 16,
      xp: 6,
      dadosFis: "4d8+10",
      dadosMag: "8d6",
    },
    8: {
      hp: 120,
      ca: 18,
      ataque: 14,
      danoMedio: 35,
      dc: 17,
      xp: 8,
      dadosFis: "4d10+12",
      dadosMag: "10d6",
    },
    10: {
      hp: 150,
      ca: 19,
      ataque: 16,
      danoMedio: 45,
      dc: 18,
      xp: 10,
      dadosFis: "6d8+15",
      dadosMag: "12d6",
    },
  };

  function _getBase(nd) {
    if (TABELA_MESTRA[nd]) return { ...TABELA_MESTRA[nd] };
    const nds = Object.keys(TABELA_MESTRA)
      .map(Number)
      .sort((a, b) => a - b);
    let lower = nds[0],
      upper = nds[nds.length - 1];
    for (const n of nds) {
      if (n <= nd) lower = n;
      if (n >= nd) {
        upper = n;
        break;
      }
    }
    if (lower === upper) return { ...TABELA_MESTRA[lower] };
    const lo = TABELA_MESTRA[lower],
      hi = TABELA_MESTRA[upper];
    const t = (nd - lower) / (upper - lower);
    return {
      hp: Math.round(lo.hp + (hi.hp - lo.hp) * t),
      ca: Math.round(lo.ca + (hi.ca - lo.ca) * t),
      ataque: Math.round(lo.ataque + (hi.ataque - lo.ataque) * t),
      danoMedio: Math.round(lo.danoMedio + (hi.danoMedio - lo.danoMedio) * t),
      dc: Math.round(lo.dc + (hi.dc - lo.dc) * t),
      xp: nd,
      dadosFis: lo.dadosFis,
      dadosMag: lo.dadosMag,
    };
  }

  // Ajustes por Papel Tático (Cap. 13, Seção 2)
  const AJUSTES_PAPEL = {
    Tanque: {
      hp: 1.5,
      ca: -2,
      ataque: -2,
      dano: 1.0,
      descPapel: "🛡️ Tanque — Feito para apanhar e proteger a linha de trás.",
    },
    Atacante: {
      hp: 1.0,
      ca: 0,
      ataque: 0,
      dano: 1.0,
      descPapel: "⚔️ Atacante — Dano constante e confiável.",
    },
    Assassino: {
      hp: 0.75,
      ca: 2,
      ataque: 2,
      dano: 1.5,
      descPapel: "🗡️ Assassino — Dano massivo e morre rápido.",
    },
    Controlador: {
      hp: 0.6,
      ca: 0,
      ataque: 0,
      dano: 0.7,
      descPapel: "🔮 Controlador — Altera o campo e aplica condições.",
    },
    Suporte: {
      hp: 0.8,
      ca: 0,
      ataque: -2,
      dano: 0.5,
      descPapel: "🩹 Suporte — Fortalece aliados e debuffa inimigos.",
    },
    Lacaio: {
      hp: 0,
      ca: 0,
      ataque: 0,
      dano: 0.5,
      descPapel:
        "🐜 Lacaio — HP 1. Morre com qualquer dano. Use 4-5 por jogador.",
    },
    Chefe: {
      hp: 4.0,
      ca: 0,
      ataque: 0,
      dano: 1.0,
      descPapel: "👑 Chefe — HP x4, Ações Lendárias, Resistência Lendária.",
    },
  };

  // Fórmulas de Eixos (Cap. 13, Seção 3)
  function _calcEixos(nd, perfil) {
    const forte = Math.floor(nd / 2) + 2;
    const medio = Math.floor(nd / 4) + 1;
    const fraco = Math.max(0, Math.floor(nd / 6));
    const profiles = {
      fisico: { fisico: forte, mental: medio, social: fraco },
      mental: { fisico: medio, mental: forte, social: fraco },
      social: { fisico: fraco, mental: medio, social: forte },
      bestial: { fisico: forte, mental: fraco, social: -2 },
    };
    return profiles[perfil] || profiles.fisico;
  }

  // Aplicações derivadas (Cap. 13, Seção 3.2)
  function _calcAplicacoes(eixos, focos) {
    return {
      interacao:   { valor: Math.max(0, (focos.includes('interacao') ? Math.max(eixos.fisico, eixos.mental, eixos.social) : Math.max(eixos.fisico, eixos.mental, eixos.social) - 2)) },
      conflito:    { valor: Math.max(0, (focos.includes('conflito') ? Math.max(eixos.fisico, eixos.mental) : Math.max(eixos.fisico, eixos.mental) - 2)) },
      resistencia: { valor: Math.max(0, (focos.includes('resistencia') ? Math.max(eixos.fisico, eixos.mental) : Math.max(eixos.fisico, eixos.mental) - 2)) }
    };
  }

  // Monstros completos por bioma
  const BESTIARIO = {
    morden: [
      {
        nome: "Morph de Saturação",
        papel: "Assassino",
        perfil: "bestial",
        focos: ["conflito"],
        descricao:
          "Criatura biótica que se formou a partir de matéria orgânica corrompida pela seiva da Floresta dos Ecos. Corpo amorfo, músculos de fibra vegetal, e tentáculos que secretam uma substância paralisante. Seus olhos são pontos de luz verde-esmeralda.",
        comportamento:
          "Ataca das sombras, focando alvos isolados. Foge se reduzido a 25% HP, escondendo-se nos dutos da ventilação. Nunca luta sozinho — sempre há mais nos dutos.",
        passivas: [
          {
            nome: "Frenesi de Sangue",
            mecanica: "+2 no Ataque contra alvos com menos de 50% HP.",
            origem: "Cap.14 #1",
          },
          {
            nome: "Invisibilidade nas Sombras",
            mecanica:
              "Em penumbra, pode usar 1 Ação para ficar Invisível até atacar ou ser atacado.",
            origem: "Cap.14 #50",
          },
        ],
        ativas: [
          {
            nome: "Chicote Biótico",
            custo: "1 Ação",
            mecanica:
              "Ataque Melee, alcance 3m. +ATQ. Dano: DADOS + ND dano Ácido. Se acertar: alvo faz Teste de Físico + Resistência DC para escapar ou fica Agarrado.",
            descricao: "Tentáculo de fibra que envolve o alvo.",
          },
          {
            nome: "Esporos de Síncope",
            custo: "2 Ações (Recarga 5-6)",
            mecanica:
              "Cone 3m. Teste de Físico + Resistência DC. Falha: +1 Ponto de Síncope e Envenenado por 1 rodada.",
            descricao: "Libera uma nuvem verde de esporos alucinógenos.",
          },
        ],
      },
      {
        nome: "Sentinela de Adamante",
        papel: "Tanque",
        perfil: "fisico",
        focos: ["conflito", "resistencia"],
        descricao:
          "Construto militar de Morden. 2,5m de altura, revestido de placas de adamante gravadas com runas azuis. Um núcleo rúnico pulsa em seu peito. Não sente dor, não negocia, não para.",
        comportamento:
          "Protege uma posição fixa (portão, sala, prisioneiro). Não persegue além de 18m de seu posto. Se 2+ intrusos atacam, prioriza o mais ruidoso. Usa Investida para empurrar invasores para trás.",
        passivas: [
          {
            nome: "Armadura Natural",
            mecanica:
              "RD 4 contra dano Cortante, Perfurante e Impacto não-mágico.",
            origem: "Cap.14 #30",
          },
          {
            nome: "Incansável",
            mecanica: "Imune a Exaustão, Sono, Veneno e Charme.",
            origem: "Cap.14 #28",
          },
        ],
        ativas: [
          {
            nome: "Investida de Escudo",
            custo: "2 Ações",
            mecanica:
              "Move até 9m em linha reta e ataca. +ATQ. Dano: DADOS. Se acertar: alvo faz Teste de Físico + Resistência DC ou é empurrado 3m e fica Caído.",
            descricao:
              "Avança como um aríete, usando o peso completo do corpo.",
          },
          {
            nome: "Punho Pneumático",
            custo: "1 Ação",
            mecanica:
              "Ataque Melee. +ATQ. Dano: DADOS de Impacto. Se crítico: armadura do alvo perde 1 CA (reparo necessário).",
            descricao: "Golpe do punho mecânico com pressão de vapor.",
          },
          {
            nome: "Provocação Rúnica",
            custo: "Reação",
            mecanica:
              "Quando aliado adjacente é atacado: obriga o atacante a redirecionar o golpe para a Sentinela. Teste de Mental + Resistência DC nega.",
            descricao: "Runas pulsam e atraem a atenção do agressor.",
          },
        ],
      },
      {
        nome: "Sombra de Éter",
        papel: "Controlador",
        perfil: "mental",
        focos: ["interacao", "interacao"],
        descricao:
          "Entidade semitransparente que habita o Éter. Aparência de fumaça negra com olhos brancos. Flutua através de paredes. A temperatura cai 10°C quando está próxima.",
        comportamento:
          "Evita luz direta (toma 1d6 de dano radiante por turno sob luz solar). Ataca alvos isolados e foge para dentro de paredes. Prefere Drenar Vontade antes de combate físico.",
        passivas: [
          {
            nome: "Imaterial",
            mecanica:
              "RD 10 contra dano Cortante, Perfurante e Impacto não-mágico. Pode se mover através de objetos sólidos (sofre 1d10 se terminar o turno dentro).",
            origem: "Cap.14 #63",
          },
          {
            nome: "Caminhar no Vento",
            mecanica: "Voa (Levita 3m). Ignora terrenos difíceis.",
            origem: "Cap.14 #46",
          },
        ],
        ativas: [
          {
            nome: "Drenar Vontade",
            custo: "1 Ação",
            mecanica:
              "Alcance 6m. Teste de Mental + Resistência DC. Falha: alvo perde 1d4 Pontos de Vigor e fica Aterrorizado por 1 rodada. A Sombra cura HP igual ao Vigor drenado × 3.",
            descricao: "Sussurros de desespero invadem a mente do alvo.",
          },
          {
            nome: "Toque Gélido",
            custo: "1 Ação",
            mecanica:
              "Ataque Melee. +ATQ. Dano: DADOS de Frio. Alvo perde Reações até o fim do próximo turno.",
            descricao: "Drena o calor muscular com um toque espectral.",
          },
        ],
      },
      {
        nome: "Autômato de Vapor",
        papel: "Atacante",
        perfil: "fisico",
        focos: ["conflito"],
        descricao:
          "Robô industrial reprogramado para combate. 1,8m, pernas hidráulicas, braços com martelos pneumáticos. Placas de ferro com remendos de solda. Olho único rúnico vermelho.",
        comportamento:
          "Patrulha rotas fixas de 30m ida e volta. Sem inteligência — ataca qualquer coisa não-autorizada que cruze sua rota. Não persegue fora da rota. Previsível mas letal.",
        passivas: [
          {
            nome: "Incansável",
            mecanica: "Imune a Exaustão, Sono, Veneno e Charme.",
            origem: "Cap.14 #28",
          },
          {
            nome: "Visão Noturna",
            mecanica:
              "Enxerga no escuro (30m). Ignora penalidade de Cegueira por escuridão.",
            origem: "Cap.14 #10",
          },
        ],
        ativas: [
          {
            nome: "Martelo Hidráulico",
            custo: "1 Ação",
            mecanica: "Ataque Melee. +ATQ. Dano: DADOS de Impacto.",
            descricao: "Golpe de martelo movido a pressão de vapor.",
          },
          {
            nome: "Jato de Vapor",
            custo: "2 Ações (Recarga 5-6)",
            mecanica:
              "Cone 3m. Dano: 2d6 de Fogo. Teste de Físico + Conflito (Esquiva) DC. Falha: dano total e Cego por 1 rodada. Sucesso: metade, sem Cegueira.",
            descricao: "Libera todo o vapor acumulado num jato quente.",
          },
        ],
      },
      {
        nome: "Raiz Senciente",
        papel: "Controlador",
        perfil: "bestial",
        focos: ["resistencia"],
        descricao:
          "Extensão da Floresta dos Ecos que perfurou o adamante de Morden. 3m de comprimento, cor verde-acinzentada, coberta de espinhos e ventosas. Parece inerte até que algo quente passe por perto.",
        comportamento:
          "Emboscada pura. Fica imóvel (Mimetismo CD 15) até que um alvo passe a 1,5m. Então Agarra e Drena. Não se move. Se cortada, outra cresce em 1d4 horas.",
        passivas: [
          {
            nome: "Mimetismo (Planta)",
            mecanica:
              "Detectá-la exige Teste de Mental + Interação (Percepção) DC 15. Indistinguível de raiz morta enquanto imóvel.",
            origem: "Cap.14 #4",
          },
          {
            nome: "Vingança Final",
            mecanica:
              "Ao morrer, libera nuvem de esporos: 1d4 dano Veneno a todos em 1,5m.",
            origem: "Cap.14 #8",
          },
        ],
        ativas: [
          {
            nome: "Agarrar Parasita",
            custo: "1 Ação",
            mecanica:
              "Alcance 3m. Teste de Físico + Resistência DC. Falha: Agarrado e Imobilizado. Enquanto agarrado, sofre 1d6 de dano Ácido no início de cada turno.",
            descricao:
              "Envolve a vítima com tentáculos e começa a se alimentar.",
          },
          {
            nome: "Grito de Alerta",
            custo: "1 Ação",
            mecanica:
              "Emite vibração que alerta outras Raízes a 30m. Reforços chegam em 1d4 rodadas.",
            descricao:
              "Pulso sísmico inaudível para humanos, ensurdecedor para outras raízes.",
          },
        ],
      },
    ],
  };

  /**
   * Gera ficha completa de um monstro.
   */
  function gerarMonstro(cenario, nd, indice) {
    const pool = BESTIARIO[cenario] || BESTIARIO.morden;
    const idx =
      indice !== undefined
        ? indice % pool.length
        : Math.floor(Math.random() * pool.length);
    const template = pool[idx];
    const base = _getBase(nd);
    const ajuste = AJUSTES_PAPEL[template.papel] || AJUSTES_PAPEL.Atacante;

    // Stats ajustados
    const hp =
      template.papel === "Lacaio" ? 1 : Math.round(base.hp * ajuste.hp);
    const ca = base.ca + ajuste.ca;
    const ataque = base.ataque + ajuste.ataque;
    const danoMedio = Math.round(base.danoMedio * ajuste.dano);
    const dc = base.dc;

    // Eixos e Aplicações
    const eixos = _calcEixos(nd, template.perfil);
    const aplicacoes = _calcAplicacoes(eixos, template.focos);

    // Iniciativa = Mental + Interação
    const iniciativa =
      eixos.mental + (aplicacoes.interacao.valor - eixos.mental);

    // Processar ativas com valores calculados
    const ativas = template.ativas.map((a) => {
      let mec = a.mecanica;
      mec = mec.replace(/\+ATQ/g, `+${ataque}`);
      mec = mec.replace(/DADOS/g, base.dadosFis);
      mec = mec.replace(/ DC(?!\d)/g, ` DC ${dc}`);
      return { ...a, mecanica: mec };
    });

    return {
      nome: template.nome,
      nd,
      papel: template.papel,
      descPapel: ajuste.descPapel,
      descricao: template.descricao,
      comportamento: template.comportamento,
      hp,
      ca,
      ataque: `+${ataque}`,
      danoMedio,
      dadosDano: base.dadosFis,
      dc,
      xp: base.xp,
      eixos,
      aplicacoes,
      iniciativa: `+${Math.max(0, iniciativa)}`,
      vigor: Math.max(1, Math.floor(nd / 2) + 2),
      ee: Math.max(1, Math.floor(nd * 1.5) + 2),
      passivas: template.passivas,
      ativas,
      velocidade: "9m (6 casas)",
    };
  }

  function calcularEncontro(tier, dificuldade, jogadores) {
    const ndBase = { 1: 1, 2: 3, 3: 5, 4: 8 }[tier] || 1;
    const mult =
      { facil: 0.8, medio: 1, dificil: 1.3, mortal: 1.6 }[dificuldade] || 1;
    const nd = Math.max(1, Math.round(ndBase * mult));
    let qtd = Math.max(1, Math.ceil(jogadores * 0.75));
    if (dificuldade === "mortal") qtd = Math.max(1, qtd - 1);
    return { nd, quantidade: qtd };
  }

  /** API auxiliar para NPCs — usa mesmas fórmulas internas */
  function calcularHP(nd, papel) {
    const base = _getBase(nd);
    const ajuste = AJUSTES_PAPEL[papel] || AJUSTES_PAPEL.Atacante;
    return Math.round(base.hp * ajuste.hp);
  }
  function calcularCA(nd, papel) {
    const base = _getBase(nd);
    const ajuste = AJUSTES_PAPEL[papel] || AJUSTES_PAPEL.Atacante;
    return base.ca + ajuste.ca;
  }
  function calcularEixos(nd) {
    return _calcEixos(nd, "fisico");
  }

  return {
    gerarMonstro,
    calcularEncontro,
    calcularHP,
    calcularCA,
    calcularEixos,
    BESTIARIO,
    TABELA_MESTRA,
  };
})();
