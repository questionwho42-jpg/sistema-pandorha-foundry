/**
 * MONSTERS.JS — Fórmulas de Combate do Sistema Pandorha
 * Baseado em gerador_monstros_pandorha.py (Decorator Pattern)
 */

const ForgeMonsters = (() => {
  const HP_POR_ND = {
    1: 15,
    2: 25,
    3: 40,
    4: 55,
    5: 70,
    6: 90,
    7: 110,
    8: 130,
    9: 155,
    10: 180,
  };
  const PAPEIS = ["Atacante", "Tanque", "Assassino", "Controlador", "Suporte"];

  const MONSTROS_POR_BIOMA = {
    morden: [
      {
        nome: "Morph de Saturação",
        papel: "Assassino",
        habilidade:
          "Chicote Biótico: 1d10+ND dano. Sucesso: +1 Ponto de Síncope no alvo.",
        comportamento: "Ataca das sombras, foge se isolado.",
      },
      {
        nome: "Sentinela de Adamante",
        papel: "Tanque",
        habilidade:
          "Carapaça Sincronizada: RD 4 contra físico. Investida: 2d8+ND dano.",
        comportamento: "Protege posição, não persegue.",
      },
      {
        nome: "Sombra de Éter",
        papel: "Controlador",
        habilidade:
          "Imaterial: RD 10 contra físico. Drenar Vontade: DC Mental, -1d4 PV.",
        comportamento: "Evita luz, ataca alvos isolados.",
      },
      {
        nome: "Autômato de Vapor",
        papel: "Atacante",
        habilidade:
          "Punho Pneumático: 2d6+ND dano. Jato de Vapor: cone 3m, 1d8 fogo.",
        comportamento: "Patrulha rotas fixas, sem inteligência.",
      },
      {
        nome: "Raiz Senciente",
        papel: "Controlador",
        habilidade:
          "Agarrar: teste Físico DC ou imobilizado. Drenar Seiva: 1d6 dano/turno.",
        comportamento: "Emboscada, espera imóvel até proximidade.",
      },
    ],
    almar: [
      {
        nome: "Corsário Veterano",
        papel: "Atacante",
        habilidade:
          "Lâmina Dupla: 2d6+ND dano. Pistola de Pederneira: 1d10 dano à distância.",
        comportamento: "Agressivo, grita insultos.",
      },
      {
        nome: "Serpente Marítima",
        papel: "Tanque",
        habilidade: "Constringir: teste Físico DC ou preso. Escamas: RD 3.",
        comportamento: "Arrasta vítimas para a água.",
      },
      {
        nome: "Espírito da Maré",
        papel: "Controlador",
        habilidade:
          "Onda: empurra 3m, teste Físico. Neblina: área dificulta visão.",
        comportamento: "Controla terreno, evita combate direto.",
      },
      {
        nome: "Caranguejo Colossal",
        papel: "Tanque",
        habilidade: "Pinça: 2d8+ND, agarra. Carapaça: RD 5 de frente.",
        comportamento: "Lento mas devastador.",
      },
      {
        nome: "Contrabandista Arcano",
        papel: "Suporte",
        habilidade:
          "Bomba de Fumaça: esconde aliados. Faca Envenenada: 1d6+veneno.",
        comportamento: "Foge se aliados caem.",
      },
    ],
    cinar: [
      {
        nome: "Lobo Espectral",
        papel: "Assassino",
        habilidade:
          "Mordida Fantasma: 1d8+ND, ignora armadura. Uivo: DC Mental ou Assustado.",
        comportamento: "Ataca em matilha, foca o mais fraco.",
      },
      {
        nome: "Treant Corrompido",
        papel: "Tanque",
        habilidade: "Esmagar: 2d10+ND. Raízes: imobiliza em área 3m.",
        comportamento: "Defende território, não persegue.",
      },
      {
        nome: "Pixie Sombria",
        papel: "Controlador",
        habilidade:
          "Ilusão: DC Mental ou ataca aliado. Invisibilidade: desaparece 1 turno.",
        comportamento: "Causa caos, nunca luta diretamente.",
      },
      {
        nome: "Urso Fungal",
        papel: "Atacante",
        habilidade:
          "Garras: 2d6+ND. Nuvem de Esporos: cone 3m, DC Resistência ou Envenenado.",
        comportamento: "Territorial, ataca quem se aproxima.",
      },
      {
        nome: "Dríade Vingativa",
        papel: "Suporte",
        habilidade:
          "Cura Vegetal: 2d8 cura aliado. Espinhos: 1d6 dano reflexivo a quem ataca.",
        comportamento: "Fica atrás, cura e amaldiçoa.",
      },
    ],
    draskar: [
      {
        nome: "Salamandra de Fogo",
        papel: "Atacante",
        habilidade: "Baforada: cone 3m, 2d6 fogo. Imune a fogo.",
        comportamento: "Agressiva, cerca e queima.",
      },
      {
        nome: "Golem de Obsidiana",
        papel: "Tanque",
        habilidade:
          "Punho: 2d10+ND. Corpo Reflexivo: atacantes corpo a corpo sofrem 1d4 cortante.",
        comportamento: "Guarda portal, não recua.",
      },
      {
        nome: "Wyvern Jovem",
        papel: "Atacante",
        habilidade:
          "Mergulho: 3d6+ND. Ferrão Venenoso: DC Resistência ou Paralisado.",
        comportamento: "Ataca do alto, retorna ao ar.",
      },
      {
        nome: "Elemental de Magma",
        papel: "Controlador",
        habilidade:
          "Lava: terreno em 3m se torna perigoso. Explosão: 2d8 fogo em área.",
        comportamento: "Transforma terreno, dificulta fuga.",
      },
      {
        nome: "Orc Forjador",
        papel: "Suporte",
        habilidade:
          "Arma Rúnica: +1d6 dano ao aliado. Grito de Guerra: +2 ataque aliados próximos.",
        comportamento: "Fica atrás, fortalece outros.",
      },
    ],
    dungard: [
      {
        nome: "Aberração do Abismo",
        papel: "Assassino",
        habilidade:
          "Tentáculos: 2d6+ND, alcance 3m. Escuridão: apaga luzes em 6m.",
        comportamento: "Apaga luzes antes de atacar.",
      },
      {
        nome: "Golem de Cristal",
        papel: "Tanque",
        habilidade: "Reflexo Arcano: reflete 50% dano mágico. Punho: 2d8+ND.",
        comportamento: "Avança lentamente, inabalável.",
      },
      {
        nome: "Verme das Profundezas",
        papel: "Atacante",
        habilidade: "Emergir: ataque surpresa 3d6. Ácido: 1d8 contínuo.",
        comportamento: "Ataca de baixo, desaparece no solo.",
      },
      {
        nome: "Fantasma do Minerador",
        papel: "Controlador",
        habilidade:
          "Possessão: DC Mental ou perde o turno. Grito: DC Mental ou Assustado.",
        comportamento: "Possui e confunde, odeia luz.",
      },
      {
        nome: "Guardião Rúnico",
        papel: "Suporte",
        habilidade: "Escudo Rúnico: +3 CA aliado. Pulso: cura 1d8 construtos.",
        comportamento: "Protege outros construtos.",
      },
    ],
    floresta_ecos: [
      {
        nome: "Morph Alpha",
        papel: "Atacante",
        habilidade:
          "Açoite: 2d8+ND. Grito Sincronizado: convoca 1d4 Morphs menores.",
        comportamento: "Lidera grupo, recua se sozinho.",
      },
      {
        nome: "Colmeia Ambulante",
        papel: "Tanque",
        habilidade:
          "Enxame: dano em área 3m. Regeneração: 5 HP/turno enquanto na névoa.",
        comportamento: "Avança sem parar, ignora dor.",
      },
      {
        nome: "Esporo Sentinela",
        papel: "Controlador",
        habilidade:
          "Nuvem: área 6m, DC Resistência ou +1 Síncope. Raiz Rápida: imobiliza.",
        comportamento: "Estático, defende área-chave.",
      },
      {
        nome: "Predador de Névoa",
        papel: "Assassino",
        habilidade:
          "Camuflar: invisível na névoa. Mordida: 2d10+ND, crítico em 19-20.",
        comportamento: "Caça isolados, paciente.",
      },
      {
        nome: "Simbionte Curador",
        papel: "Suporte",
        habilidade:
          "Cura Parasita: sacrifica 5 HP para curar aliado 2d8. Esporos Sedantes: DC ou Lento.",
        comportamento: "Fica grudado num aliado forte.",
      },
    ],
    gorbax: [
      {
        nome: "Berserker Orc",
        papel: "Atacante",
        habilidade:
          "Frenesi: +1d6 dano quando abaixo de 50% HP. Machado: 2d8+ND.",
        comportamento: "Carga total, sem recuo.",
      },
      {
        nome: "Xamã de Totem",
        papel: "Suporte",
        habilidade:
          "Bênção Ancestral: +2 ataque aliados. Raio Espiritual: 2d6 força.",
        comportamento: "Fica atrás de guerreiros.",
      },
      {
        nome: "Warg Montaria",
        papel: "Assassino",
        habilidade:
          "Salto: +2d6 dano na carga. Derrubar: DC Físico ou Derrubado.",
        comportamento: "Flanqueia, ataca desprevenidos.",
      },
      {
        nome: "Troll das Montanhas",
        papel: "Tanque",
        habilidade:
          "Regeneração: 5 HP/turno (exceto fogo/ácido). Pedrada: 2d10+ND.",
        comportamento: "Avança, ignora dano menor.",
      },
      {
        nome: "Águia Gigante",
        papel: "Controlador",
        habilidade:
          "Mergulho: 2d8+ND e agarra. Voo: carrega alvos para o alto.",
        comportamento: "Agarra e larga de altura.",
      },
    ],
  };

  /**
   * Calcula HP base por ND e papel.
   * @param {number} nd
   * @param {string} papel
   * @returns {number}
   */
  function calcularHP(nd, papel) {
    let hp = HP_POR_ND[nd] || nd * 15;
    if (papel === "Tanque") hp = Math.floor(hp * 1.5);
    if (papel === "Assassino") hp = Math.floor(hp * 0.75);
    return hp;
  }

  /**
   * Calcula CA base por ND e papel.
   * @param {number} nd
   * @param {string} papel
   * @returns {number}
   */
  function calcularCA(nd, papel) {
    let ca = 11 + nd;
    if (papel === "Tanque") ca -= 2;
    if (papel === "Assassino") ca += 2;
    return ca;
  }

  /**
   * Calcula eixos por ND.
   * @param {number} nd
   * @returns {Object}
   */
  function calcularEixos(nd) {
    return {
      fisico: Math.floor(nd / 2) + 2,
      mental: Math.floor(nd / 4) + 1,
      social: 0,
    };
  }

  /**
   * Determina o ND apropriado para um encontro.
   * @param {number} tier
   * @param {string} dificuldade
   * @param {number} jogadores
   * @returns {{ nd: number, quantidade: number }}
   */
  function calcularEncontro(tier, dificuldade, jogadores) {
    const ndBase = { 1: 1, 2: 3, 3: 5, 4: 8 }[tier] || 1;
    const mult =
      { facil: 0.8, medio: 1, dificil: 1.3, mortal: 1.6 }[dificuldade] || 1;
    const nd = Math.max(1, Math.round(ndBase * mult));
    let qtd = Math.max(1, Math.ceil(jogadores * 0.75));
    if (dificuldade === "mortal") qtd = Math.max(1, qtd - 1);
    return { nd, quantidade: qtd };
  }

  /**
   * Gera ficha completa de um monstro.
   * @param {string} cenario
   * @param {number} nd
   * @param {number} [indice]
   * @returns {Object}
   */
  function gerarMonstro(cenario, nd, indice) {
    const pool = MONSTROS_POR_BIOMA[cenario] || MONSTROS_POR_BIOMA.morden;
    const idx =
      indice !== undefined
        ? indice % pool.length
        : Math.floor(Math.random() * pool.length);
    const template = pool[idx];
    return {
      nome: template.nome,
      nd,
      papel: template.papel,
      hp: calcularHP(nd, template.papel),
      ca: calcularCA(nd, template.papel),
      eixos: calcularEixos(nd),
      ee: Math.floor(nd * 2) + 2,
      vigor: Math.floor(nd / 2) + 2,
      habilidade: template.habilidade,
      comportamento: template.comportamento,
    };
  }

  return {
    calcularHP,
    calcularCA,
    calcularEixos,
    calcularEncontro,
    gerarMonstro,
    MONSTROS_POR_BIOMA,
    PAPEIS,
  };
})();
