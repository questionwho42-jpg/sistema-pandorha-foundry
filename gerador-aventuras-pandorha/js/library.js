/**
 * LIBRARY.JS — Biblioteca Local (localStorage)
 * Forja de Aventuras | Sistema Pandorha
 */

const ForgeLibrary = (() => {
  const STORAGE_INDEX = "forja_indice";
  const STORAGE_PREFIX = "forja_aventura_";
  const VERSAO = 1;

  function init() {
    document
      .getElementById("btn-biblioteca")
      .addEventListener("click", _toggleBiblioteca);
    document
      .getElementById("btn-fechar-biblioteca")
      .addEventListener("click", _toggleBiblioteca);
    document
      .getElementById("btn-salvar")
      .addEventListener("click", salvarAventura);
    ["filtro-cenario", "filtro-tier", "filtro-duracao"].forEach((id) => {
      document.getElementById(id).addEventListener("change", _renderLista);
    });
    _populateFiltros();
  }

  /** Salva a aventura atual no localStorage */
  function salvarAventura() {
    const av = ForjaState.getState("aventuraGerada");
    if (!av) {
      ForgeApp.toast("Nenhuma aventura para salvar.", "warning");
      return;
    }
    const id = STORAGE_PREFIX + Date.now();
    const indice = _getIndice();

    const registro = {
      versao: VERSAO,
      id,
      titulo: av.titulo,
      cenario: av.cenario,
      tier: av.tier,
      duracao: av.duracao,
      criadoEm: new Date().toISOString(),
      favorita: false,
      dados: av,
    };

    try {
      localStorage.setItem(id, JSON.stringify(registro));
      indice.aventuras.push(id);
      _setIndice(indice);
      ForgeApp.toast(`"${av.titulo}" salva na biblioteca!`, "success");
    } catch (e) {
      ForgeApp.toast("Erro ao salvar. Espaço insuficiente.", "error");
    }
  }

  function _toggleBiblioteca() {
    const bib = document.getElementById("biblioteca");
    const wizard = document.getElementById("wizard");
    const preview = document.getElementById("preview");

    if (bib.classList.contains("hidden")) {
      bib.classList.remove("hidden");
      wizard.classList.add("hidden");
      preview.classList.add("hidden");
      _renderLista();
    } else {
      bib.classList.add("hidden");
      const view = ForjaState.getState("viewAtual");
      if (view === "preview") preview.classList.remove("hidden");
      else wizard.classList.remove("hidden");
    }
  }

  function _renderLista() {
    const container = document.getElementById("biblioteca-list");
    const indice = _getIndice();
    const filtroCenario = document.getElementById("filtro-cenario").value;
    const filtroTier = document.getElementById("filtro-tier").value;
    const filtroDuracao = document.getElementById("filtro-duracao").value;

    let aventuras = indice.aventuras
      .map((id) => {
        try {
          return JSON.parse(localStorage.getItem(id));
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    if (filtroCenario)
      aventuras = aventuras.filter((a) => a.cenario === filtroCenario);
    if (filtroTier)
      aventuras = aventuras.filter((a) => String(a.tier) === filtroTier);
    if (filtroDuracao)
      aventuras = aventuras.filter((a) => a.duracao === filtroDuracao);

    aventuras.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));

    if (aventuras.length === 0) {
      container.innerHTML =
        '<p class="biblioteca__empty">Nenhuma aventura encontrada.</p>';
      return;
    }

    container.innerHTML = aventuras
      .map(
        (a) => `
      <div class="bib-card" data-id="${a.id}">
        <div class="bib-card__info">
          <strong>${a.favorita ? "⭐ " : ""}${a.titulo}</strong>
          <span class="bib-card__meta">${a.cenario} • Tier ${a.tier} • ${a.duracao} • ${new Date(a.criadoEm).toLocaleDateString("pt-BR")}</span>
        </div>
        <div class="bib-card__actions">
          <button class="btn btn--ghost btn--sm" onclick="ForgeLibrary.carregar('${a.id}')" title="Abrir"><i data-lucide="eye"></i></button>
          <button class="btn btn--ghost btn--sm" onclick="ForgeLibrary.toggleFavorita('${a.id}')" title="Favoritar"><i data-lucide="star"></i></button>
          <button class="btn btn--ghost btn--sm" onclick="ForgeLibrary.deletar('${a.id}')" title="Deletar"><i data-lucide="trash-2"></i></button>
        </div>
      </div>
    `,
      )
      .join("");

    lucide.createIcons();
  }

  function carregar(id) {
    try {
      const registro = JSON.parse(localStorage.getItem(id));
      if (!registro) {
        ForgeApp.toast("Aventura não encontrada.", "error");
        return;
      }
      ForjaState.setState("aventuraGerada", registro.dados);
      document.getElementById("preview-content").innerHTML =
        ForgeGenerator.toHTML(registro.dados);
      document.getElementById("biblioteca").classList.add("hidden");
      document.getElementById("wizard").classList.add("hidden");
      document.getElementById("preview").classList.remove("hidden");
      ForjaState.setState("viewAtual", "preview");
      ForgeThemes.aplicarTema(registro.cenario);
      ForgeApp.toast(`"${registro.titulo}" carregada!`, "success");
      lucide.createIcons();
    } catch {
      ForgeApp.toast("Erro ao carregar aventura.", "error");
    }
  }

  function toggleFavorita(id) {
    try {
      const registro = JSON.parse(localStorage.getItem(id));
      if (!registro) return;
      registro.favorita = !registro.favorita;
      localStorage.setItem(id, JSON.stringify(registro));
      const indice = _getIndice();
      if (registro.favorita) {
        if (!indice.favoritas.includes(id)) indice.favoritas.push(id);
      } else {
        indice.favoritas = indice.favoritas.filter((f) => f !== id);
      }
      _setIndice(indice);
      _renderLista();
      ForgeApp.toast(
        registro.favorita ? "Favoritada! ⭐" : "Removida dos favoritos.",
        "success",
      );
    } catch {
      ForgeApp.toast("Erro ao favoritar.", "error");
    }
  }

  function deletar(id) {
    if (!confirm("Tem certeza que deseja deletar esta aventura?")) return;
    localStorage.removeItem(id);
    const indice = _getIndice();
    indice.aventuras = indice.aventuras.filter((a) => a !== id);
    indice.favoritas = indice.favoritas.filter((f) => f !== id);
    _setIndice(indice);
    _renderLista();
    ForgeApp.toast("Aventura deletada.", "success");
  }

  function _getIndice() {
    try {
      return (
        JSON.parse(localStorage.getItem(STORAGE_INDEX)) || {
          versao: VERSAO,
          aventuras: [],
          favoritas: [],
        }
      );
    } catch {
      return { versao: VERSAO, aventuras: [], favoritas: [] };
    }
  }

  function _setIndice(indice) {
    localStorage.setItem(STORAGE_INDEX, JSON.stringify(indice));
  }

  function _populateFiltros() {
    const cenarioSel = document.getElementById("filtro-cenario");
    Object.keys(ForgeTables.CENARIOS).forEach((key) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = ForgeTables.CENARIOS[key].nome.split(",")[0];
      cenarioSel.appendChild(opt);
    });
    const tierSel = document.getElementById("filtro-tier");
    [1, 2, 3, 4].forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = `Tier ${t}`;
      tierSel.appendChild(opt);
    });
    const duracaoSel = document.getElementById("filtro-duracao");
    [
      ["oneshot", "One-Shot"],
      ["mini", "Mini"],
      ["campanha", "Campanha"],
    ].forEach(([v, l]) => {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = l;
      duracaoSel.appendChild(opt);
    });
  }

  return { init, salvarAventura, carregar, toggleFavorita, deletar };
})();
