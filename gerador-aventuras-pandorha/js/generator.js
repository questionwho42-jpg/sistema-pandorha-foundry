/**
 * GENERATOR.JS — Motor de Geração (Decorator Pattern)
 * Forja de Aventuras | Sistema Pandorha
 */

const ForgeGenerator = (() => {
  /** Componente Concreto: aventura base */
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
      this.monstros = [];
      this.tabelas = {};
      this.faccoes = [];
      this.epilogo = { contadorMax: 10, finais: [] };
      this.regraCasa = null;
    }
  }

  /** Gera capítulos base conforme duração */
  function _gerarCapitulos(av) {
    const numCaps = { oneshot: 1, mini: 3, campanha: 5 }[av.duracao] || 1;
    const cenarioData = ForgeTables.CENARIOS[av.cenario];
    const conflito = cenarioData
      ? cenarioData.conflitos.find((c) => c.id === av.conflito)
      : null;

    for (let i = 0; i < numCaps; i++) {
      const nivel = av.tier === 1 ? i + 1 : (av.tier - 1) * 5 + i + 1;
      const fase =
        i < numCaps * 0.33 ? "inicio" : i < numCaps * 0.66 ? "meio" : "climax";
      const atmos = cenarioData ? cenarioData.atmosfera[fase] : null;
      const { nd, quantidade } = ForgeMonsters.calcularEncontro(
        av.tier,
        av.dificuldade,
        av.jogadores,
      );
      const ndCap = Math.max(1, nd + Math.floor(i * 0.5));

      const capitulo = {
        numero: i + 1,
        titulo: `Capítulo ${_roman(i + 1)}: ${_tituloCapitulo(i, numCaps, conflito)}`,
        nivel,
        fase,
        atmosfera: atmos,
        cenas: _gerarCenas(av, i, ndCap, quantidade, cenarioData),
        recompensa: _gerarRecompensa(av.tier, i),
      };
      av.capitulos.push(capitulo);
    }
  }

  function _gerarCenas(av, capIdx, nd, qtdMonstros, cenarioData) {
    const dcBase = 10 + av.tier * 3 + capIdx;
    const cenas = [];

    // Cena 1: Investigação/Introdução
    cenas.push({
      tipo: "investigacao",
      titulo: _titulosCena(0, capIdx),
      descricao: `Os heróis chegam ao local e devem investigar. A atmosfera é tensa.`,
      teste: {
        eixo: "Mental",
        pericia: "Interação",
        dc: dcBase,
        sucesso: "Revela uma pista crítica sobre a ameaça.",
        falha: "Os heróis são pegos de surpresa na próxima cena.",
      },
    });

    // Cena 2: Ação/Confronto
    const monstrosEncontro = [];
    for (let m = 0; m < qtdMonstros; m++) {
      monstrosEncontro.push(
        ForgeMonsters.gerarMonstro(av.cenario, nd, capIdx + m),
      );
    }
    const mecCenario = cenarioData
      ? ForgeTables.random(cenarioData.mecanicasCenario)
      : "Terreno difícil em área aleatória";

    cenas.push({
      tipo: "combate",
      titulo: _titulosCena(1, capIdx),
      descricao: "Os heróis enfrentam a ameaça em combate direto.",
      monstros: monstrosEncontro,
      mecanicaCenario: mecCenario,
      teste: {
        eixo: "Físico",
        pericia: "Conflito",
        dc: dcBase + 2,
        sucesso: "Usa o cenário a favor, ganhando Vantagem.",
        falha: `Sofre ${Math.ceil(nd * 1.5)}d6 de dano e fica Derrubado.`,
      },
    });

    // Cena 3: Clímax/Resolução
    const dilema = ForgeTables.random(ForgeTables.DILEMAS);
    cenas.push({
      tipo: "climax",
      titulo: _titulosCena(2, capIdx),
      descricao: "A cena chega ao ápice com um dilema moral.",
      dilema: { ...dilema },
      teste: {
        eixo: "Social",
        pericia: "Interação",
        dc: dcBase + 1,
        sucesso: "Convence o NPC e ganha um aliado.",
        falha: "O NPC se torna hostil.",
      },
    });

    return cenas;
  }

  /** Gera NPCs conforme duração */
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
          hp: ForgeMonsters.calcularHP(nd, "Atacante"),
          ca: ForgeMonsters.calcularCA(nd, "Atacante"),
          eixos: ForgeMonsters.calcularEixos(nd),
        },
      });
    });
  }

  /** Gera facções */
  function _gerarFaccoes(av) {
    const cenarioData = ForgeTables.CENARIOS[av.cenario];
    if (!cenarioData) return;
    const faccoes = cenarioData.faccoes.map((nome, i) => ({
      nome,
      favor: 0,
      prestigio: [
        { nivel: 1, recompensa: "+1 em testes sociais com membros" },
        { nivel: 3, recompensa: "Acesso a equipamento especial da facção" },
        { nivel: 5, recompensa: "Talento exclusivo da facção" },
      ],
    }));
    av.faccoes = faccoes;
  }

  /** Gera epílogos */
  function _gerarEpilogos(av) {
    const cenarioData = ForgeTables.CENARIOS[av.cenario];
    const nome = cenarioData ? cenarioData.nome : "a região";
    av.epilogo = {
      contadorNome: "Corrupção",
      contadorMax: 10,
      finais: [
        {
          tipo: "bom",
          faixa: "0-3",
          titulo: "🌕 O Renascimento",
          descricao: `${nome} é purificada. Os heróis são celebrados como salvadores.`,
        },
        {
          tipo: "neutro",
          faixa: "4-7",
          titulo: "🌓 A Trégua Amarga",
          descricao: `${nome} sobrevive, mas ferida. A ameaça recua mas não desaparece.`,
        },
        {
          tipo: "sombrio",
          faixa: "8-10",
          titulo: "🌑 O Grande Silêncio",
          descricao: `${nome} cai. Os sobreviventes fogem carregando cinzas e memórias.`,
        },
      ],
    };
  }

  /** Gera tabelas de rumores */
  function _gerarRumores(av) {
    const tipos = ["V", "F", "P", "L"];
    const rumores = [];
    for (let i = 0; i < 20; i++) {
      rumores.push({
        numero: i + 1,
        tipo: tipos[i % 4],
        texto: `Rumor ${i + 1} adaptado ao cenário de ${av.cenario}.`,
      });
    }
    av.tabelas.rumores = rumores;
  }

  /** Gera a aventura completa aplicando todos os decoradores */
  function forjar(dadosWizard) {
    const av = new AventuraBase(dadosWizard);
    _gerarCapitulos(av);
    _gerarNpcs(av);
    _gerarFaccoes(av);
    _gerarEpilogos(av);
    _gerarRumores(av);
    return av;
  }

  /** Converte aventura para HTML renderizado */
  function toHTML(av) {
    let html = "";
    const cenarioData = ForgeTables.CENARIOS[av.cenario];
    const cenarioNome = cenarioData ? cenarioData.nome : av.cenario;

    html += `<h1>⚔️ ${av.titulo}</h1>`;
    html += `<p><strong>Cenário:</strong> ${cenarioNome} | <strong>Tier:</strong> ${av.tier} | <strong>Jogadores:</strong> ${av.jogadores} | <strong>Dificuldade:</strong> ${av.dificuldade}</p>`;
    html += `<p><strong>Tom:</strong> ${av.tons.join(" + ")} | <strong>Duração:</strong> ${av.duracao}</p>`;
    html += "<hr>";

    // Epílogo
    html += "<h2>🏁 Epílogos</h2>";
    html += `<p>Contador: <strong>${av.epilogo.contadorNome}</strong> (0 a ${av.epilogo.contadorMax})</p>`;
    html +=
      "<table><thead><tr><th>Faixa</th><th>Final</th><th>Descrição</th></tr></thead><tbody>";
    av.epilogo.finais.forEach((f) => {
      html += `<tr><td>${f.faixa}</td><td>${f.titulo}</td><td>${f.descricao}</td></tr>`;
    });
    html += "</tbody></table>";

    // Facções
    if (av.faccoes.length) {
      html += "<h2>🛡️ Facções</h2>";
      html +=
        "<table><thead><tr><th>Facção</th><th>Favor</th><th>Nível 1</th><th>Nível 3</th><th>Nível 5</th></tr></thead><tbody>";
      av.faccoes.forEach((f) => {
        html += `<tr><td><strong>${f.nome}</strong></td><td>0</td>`;
        f.prestigio.forEach((p) => {
          html += `<td>${p.recompensa}</td>`;
        });
        html += "</tr>";
      });
      html += "</tbody></table>";
    }

    // Capítulos
    av.capitulos.forEach((cap) => {
      html += `<h2>📖 ${cap.titulo}</h2>`;
      html += `<p><strong>Nível:</strong> ${cap.nivel} | <strong>Fase:</strong> ${cap.fase}</p>`;

      if (cap.atmosfera) {
        html += "<blockquote>";
        html += `<strong>🎭 Atmosfera:</strong><br>`;
        html += `👁️ ${cap.atmosfera.visao}<br>`;
        html += `👂 ${cap.atmosfera.som}<br>`;
        html += `👃 ${cap.atmosfera.cheiro}<br>`;
        html += `✋ ${cap.atmosfera.tato}<br>`;
        html += `👅 ${cap.atmosfera.paladar}`;
        html += "</blockquote>";
      }

      cap.cenas.forEach((cena, ci) => {
        html += `<h3>Cena ${ci + 1}: ${cena.titulo}</h3>`;
        html += `<p>${cena.descricao}</p>`;

        if (cena.teste) {
          html += `<p>📋 <strong>Teste:</strong> ${cena.teste.eixo} + ${cena.teste.pericia} DC ${cena.teste.dc}</p>`;
          html += `<ul><li><strong>Sucesso:</strong> ${cena.teste.sucesso}</li><li><strong>Falha:</strong> ${cena.teste.falha}</li></ul>`;
        }

        if (cena.monstros && cena.monstros.length) {
          html += "<h4>⚔️ Encontro</h4>";
          html += `<p><em>Mecânica de Cenário: ${cena.mecanicaCenario}</em></p>`;
          html +=
            "<table><thead><tr><th>Monstro</th><th>ND</th><th>HP</th><th>CA</th><th>Habilidade</th></tr></thead><tbody>";
          cena.monstros.forEach((m) => {
            html += `<tr><td><strong>${m.nome}</strong> (${m.papel})</td><td>${m.nd}</td><td>${m.hp}</td><td>${m.ca}</td><td>${m.habilidade}</td></tr>`;
          });
          html += "</tbody></table>";
        }

        if (cena.dilema) {
          html += `<h4>⚖️ Dilema: ${cena.dilema.titulo}</h4>`;
          html += `<ul><li><strong>Opção A (${cena.dilema.opcaoA.nome}):</strong> ${cena.dilema.opcaoA.efeito}</li>`;
          html += `<li><strong>Opção B (${cena.dilema.opcaoB.nome}):</strong> ${cena.dilema.opcaoB.efeito}</li></ul>`;
        }
      });

      html += `<p>🎁 <strong>Recompensa:</strong> ${cap.recompensa}</p><hr>`;
    });

    // NPCs
    html += "<h2>👥 Personagens</h2>";
    av.npcs.forEach((npc) => {
      html += `<h3>${npc.nome} <span style="color: var(--color-text-muted)">(${npc.tipo})</span></h3>`;
      html += `<p><em>${npc.descricaoFisica}</em></p>`;
      html += `<ul><li><strong>Desejo:</strong> ${npc.desejo}</li><li><strong>Medo:</strong> ${npc.medo}</li><li><strong>Segredo:</strong> ${npc.segredo}</li></ul>`;
      html += `<p>💬 ${npc.falaIconica}</p>`;
      html += `<p><em>ND ${npc.stats.nd} | HP ${npc.stats.hp} | CA ${npc.stats.ca} | Físico ${npc.stats.eixos.fisico} | Mental ${npc.stats.eixos.mental}</em></p>`;
    });

    return html;
  }

  /** Converte aventura para Markdown */
  function toMarkdown(av) {
    let md = `# ⚔️ ${av.titulo}\n\n`;
    const cenarioData = ForgeTables.CENARIOS[av.cenario];
    md += `**Cenário:** ${cenarioData ? cenarioData.nome : av.cenario}  \n`;
    md += `**Tier:** ${av.tier} | **Jogadores:** ${av.jogadores} | **Dificuldade:** ${av.dificuldade}\n\n---\n\n`;

    av.capitulos.forEach((cap) => {
      md += `## ${cap.titulo}\n\n`;
      cap.cenas.forEach((cena, ci) => {
        md += `### Cena ${ci + 1}: ${cena.titulo}\n\n${cena.descricao}\n\n`;
        if (cena.teste)
          md += `**Teste:** ${cena.teste.eixo} + ${cena.teste.pericia} DC ${cena.teste.dc}\n- **Sucesso:** ${cena.teste.sucesso}\n- **Falha:** ${cena.teste.falha}\n\n`;
        if (cena.monstros)
          cena.monstros.forEach((m) => {
            md += `**${m.nome}** (ND ${m.nd}) — HP ${m.hp} | CA ${m.ca} | ${m.habilidade}\n\n`;
          });
        if (cena.dilema)
          md += `**Dilema: ${cena.dilema.titulo}**\n- A) ${cena.dilema.opcaoA.nome}: ${cena.dilema.opcaoA.efeito}\n- B) ${cena.dilema.opcaoB.nome}: ${cena.dilema.opcaoB.efeito}\n\n`;
      });
      md += `**Recompensa:** ${cap.recompensa}\n\n---\n\n`;
    });

    md += `## 👥 NPCs\n\n`;
    av.npcs.forEach((npc) => {
      md += `### ${npc.nome} (${npc.tipo})\n- ${npc.descricaoFisica}\n- **Desejo:** ${npc.desejo}\n- **Medo:** ${npc.medo}\n- **Segredo:** ${npc.segredo}\n- 💬 ${npc.falaIconica}\n- ND ${npc.stats.nd} | HP ${npc.stats.hp} | CA ${npc.stats.ca}\n\n`;
    });

    return md;
  }

  // --- Helpers ---
  function _roman(n) {
    return (
      ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][n - 1] || n
    );
  }

  function _tituloCapitulo(idx, total, conflito) {
    const titulos = [
      "O Chamado",
      "A Escalada",
      "O Ponto de Virada",
      "A Tempestade",
      "O Confronto Final",
    ];
    if (total === 1) return conflito ? conflito.nome : "A Aventura";
    return titulos[idx] || `Ato ${idx + 1}`;
  }

  function _titulosCena(cenaIdx, capIdx) {
    const opcoes = [
      ["O Sinal", "A Investigação", "Primeiros Sussurros"],
      ["O Confronto", "Emboscada", "A Maré Sobe"],
      ["A Escolha", "O Dilema", "Cinzas e Decisões"],
    ];
    return opcoes[cenaIdx]
      ? opcoes[cenaIdx][capIdx % opcoes[cenaIdx].length]
      : `Cena ${cenaIdx + 1}`;
  }

  function _gerarRecompensa(tier, capIdx) {
    const recompensas = [
      `+1 em um Eixo à escolha e ${50 * tier} PO`,
      `Equipamento raro temático e +2 Favor com uma facção`,
      `Talento de Especialização e acesso a área restrita`,
      `Arma/Armadura +1 com nome único e ${100 * tier} PO`,
      `Relíquia do cenário e título honorário`,
    ];
    return recompensas[capIdx] || recompensas[0];
  }

  return { forjar, toHTML, toMarkdown };
})();
