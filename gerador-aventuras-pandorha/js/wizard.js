/**
 * WIZARD.JS — Lógica do Formulário Passo a Passo
 * Forja de Aventuras | Sistema Pandorha
 */

const ForgeWizard = (() => {
  let _selecoesTom = [];

  function init() {
    _bindNavigation();
    _bindOptionCards();
    _bindFormFields();
    _bindSugerirNome();
    _populateConflitos();
  }

  function _bindNavigation() {
    const btnProximo = document.getElementById("btn-proximo");
    const btnAnterior = document.getElementById("btn-anterior");
    const btnForjar = document.getElementById("btn-forjar");

    btnProximo.addEventListener("click", () => {
      const etapa = ForjaState.getState("etapaAtual");
      if (_validarEtapa(etapa)) _irParaEtapa(etapa + 1);
    });

    btnAnterior.addEventListener("click", () => {
      const etapa = ForjaState.getState("etapaAtual");
      if (etapa > 1) _irParaEtapa(etapa - 1);
    });

    btnForjar.addEventListener("click", () => {
      if (_validarEtapa(8)) _forjarAventura();
    });
  }

  function _bindOptionCards() {
    document
      .querySelectorAll(".option-grid:not(.option-grid--multi)")
      .forEach((grid) => {
        grid.addEventListener("click", (e) => {
          const card = e.target.closest(".option-card");
          if (!card) return;
          grid
            .querySelectorAll(".option-card")
            .forEach((c) => c.classList.remove("selected"));
          card.classList.add("selected");
          const step = card.closest(".wizard__step");
          const stepNum = parseInt(step.dataset.step);
          const value = card.dataset.value;
          _salvarSelecao(stepNum, value);
        });
      });

    const tomGrid = document.getElementById("tom-options");
    if (tomGrid) {
      tomGrid.addEventListener("click", (e) => {
        const card = e.target.closest(".option-card");
        if (!card) return;
        const value = card.dataset.value;
        if (card.classList.contains("selected")) {
          card.classList.remove("selected");
          _selecoesTom = _selecoesTom.filter((t) => t !== value);
        } else if (_selecoesTom.length < 2) {
          card.classList.add("selected");
          _selecoesTom.push(value);
        }
        ForjaState.setState("wizard.tons", [..._selecoesTom]);
        document.getElementById("tom-counter").textContent =
          `${_selecoesTom.length}/2 selecionados`;
      });
    }
  }

  function _bindFormFields() {
    ["tier-select", "jogadores-select", "dificuldade-select"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("change", () => {
          const key = id.replace("-select", "").replace("-", "");
          const map = {
            tier: "wizard.tier",
            jogadores: "wizard.jogadores",
            dificuldade: "wizard.dificuldade",
          };
          ForjaState.setState(map[key] || `wizard.${key}`, el.value);
          el.classList.toggle("valid", !!el.value);
          el.classList.toggle("invalid", !el.value);
          if (key === "tier") _populateConflitos();
        });
      }
    });

    const estrutura = document.getElementById("estrutura-select");
    if (estrutura)
      estrutura.addEventListener("change", () =>
        ForjaState.setState("wizard.estrutura", estrutura.value),
      );

    [
      "toggle-regra-casa",
      "toggle-downtime",
      "toggle-downtime-tipo",
      "toggle-progressao",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const map = {
          "toggle-regra-casa": "wizard.regraCasa",
          "toggle-downtime": "wizard.downtime",
          "toggle-downtime-tipo": "wizard.downtimeMecanico",
          "toggle-progressao": "wizard.progressaoXP",
        };
        el.addEventListener("change", () =>
          ForjaState.setState(map[id], el.checked),
        );
      }
    });

    const nomeInput = document.getElementById("nome-aventura");
    if (nomeInput)
      nomeInput.addEventListener("input", () =>
        ForjaState.setState("wizard.nomeAventura", nomeInput.value),
      );
  }

  function _bindSugerirNome() {
    const btn = document.getElementById("btn-sugerir-nome");
    if (btn) {
      btn.addEventListener("click", () => {
        const nome = ForgeTables.random(ForgeTables.NOMES_AVENTURA);
        document.getElementById("nome-aventura").value = nome;
        ForjaState.setState("wizard.nomeAventura", nome);
      });
    }
  }

  function _salvarSelecao(step, value) {
    const map = {
      1: "wizard.cenario",
      4: "wizard.conflito",
      5: "wizard.vilao",
      6: "wizard.duracao",
    };
    if (map[step]) {
      ForjaState.setState(map[step], value);
      if (step === 1) {
        ForgeThemes.aplicarTema(value);
        _populateConflitos();
      }
    }
  }

  function _populateConflitos() {
    const container = document.getElementById("conflito-options");
    if (!container) return;
    container.innerHTML = "";
    const cenario = ForjaState.getState("wizard.cenario");
    const cenarioData = ForgeTables.CENARIOS[cenario];
    const icons = ["⚡", "🔥", "💀", "🌊", "⚔️", "🧪", "👁️", "🏴"];

    let conflitos = [
      {
        id: "invasao",
        nome: "Invasão",
        desc: "Forças externas ameaçam destruir a região.",
      },
      {
        id: "corrupcao",
        nome: "Corrupção",
        desc: "Uma força interna apodrece tudo por dentro.",
      },
      {
        id: "guerra_civil",
        nome: "Guerra Civil",
        desc: "Facções locais entram em conflito aberto.",
      },
      {
        id: "artefato",
        nome: "Caçada ao Artefato",
        desc: "Um item de poder imenso precisa ser encontrado.",
      },
      {
        id: "praga",
        nome: "Praga / Contágio",
        desc: "Uma doença ou maldição se espalha sem controle.",
      },
      {
        id: "entidade",
        nome: "Despertar Ancestral",
        desc: "Uma entidade antiga acorda de seu sono milenar.",
      },
    ];

    if (cenarioData)
      conflitos = [...cenarioData.conflitos, ...conflitos.slice(0, 3)];

    conflitos.forEach((c, i) => {
      const btn = document.createElement("button");
      btn.className = "option-card";
      btn.dataset.value = c.id;
      btn.innerHTML = `<span style="font-size:1.5rem">${icons[i % icons.length]}</span><h3>${c.nome}</h3><p>${c.desc}</p>`;
      btn.addEventListener("click", () => {
        container
          .querySelectorAll(".option-card")
          .forEach((x) => x.classList.remove("selected"));
        btn.classList.add("selected");
        ForjaState.setState("wizard.conflito", c.id);
      });
      container.appendChild(btn);
    });
  }

  function _validarEtapa(step) {
    const w = ForjaState.getState("wizard");
    const validacoes = {
      1: () => !!w.cenario,
      2: () => !!w.tier && !!w.jogadores && !!w.dificuldade,
      3: () => w.tons && w.tons.length > 0,
      4: () => !!w.conflito,
      5: () => !!w.vilao,
      6: () => !!w.duracao,
      7: () => true,
      8: () => !!w.nomeAventura && w.nomeAventura.trim().length > 0,
    };
    const valido = validacoes[step] ? validacoes[step]() : true;
    if (!valido)
      ForgeApp.toast("Preencha todos os campos antes de avançar.", "warning");
    return valido;
  }

  function _irParaEtapa(num) {
    const total = ForjaState.getState("totalEtapas");
    if (num < 1 || num > total) return;
    ForjaState.setState("etapaAtual", num);
    document
      .querySelectorAll(".wizard__step")
      .forEach((s) => s.classList.remove("active"));
    const step = document.querySelector(`.wizard__step[data-step="${num}"]`);
    if (step) step.classList.add("active");

    document.getElementById("btn-anterior").disabled = num === 1;
    document
      .getElementById("btn-proximo")
      .classList.toggle("hidden", num === total);
    document
      .getElementById("btn-forjar")
      .classList.toggle("hidden", num !== total);
    document.getElementById("progress-bar").style.width =
      `${(num / total) * 100}%`;
  }

  function _forjarAventura() {
    const overlay = document.getElementById("loading-overlay");
    overlay.classList.remove("hidden");

    setTimeout(() => {
      const dados = ForjaState.getState("wizard");
      const aventura = ForgeGenerator.forjar(dados);
      ForjaState.setState("aventuraGerada", aventura);

      const previewContent = document.getElementById("preview-content");
      previewContent.innerHTML = ForgeGenerator.toHTML(aventura);

      document.getElementById("wizard").classList.add("hidden");
      document.getElementById("preview").classList.remove("hidden");
      ForjaState.setState("viewAtual", "preview");

      overlay.classList.add("hidden");
      ForgeApp.toast("Aventura forjada com sucesso!", "success");
      lucide.createIcons();
    }, 1200);
  }

  return { init };
})();
