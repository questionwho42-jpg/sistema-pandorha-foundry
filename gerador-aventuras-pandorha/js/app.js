/**
 * APP.JS — Orquestrador Principal
 * Forja de Aventuras | Sistema Pandorha
 */

const ForgeApp = (() => {
  function init() {
    ForgeWizard.init();
    ForgeLibrary.init();
    ForgeSession.init();
    _bindGlobalActions();
    lucide.createIcons();
    console.log("⚒️ Forja de Aventuras inicializada.");
  }

  function _bindGlobalActions() {
    document
      .getElementById("btn-aleatorio")
      .addEventListener("click", _gerarAleatorio);
    document
      .getElementById("btn-voltar-wizard")
      .addEventListener("click", _voltarWizard);
    document
      .getElementById("btn-download-md")
      .addEventListener("click", ForgeExport.exportarMarkdown);
    document
      .getElementById("btn-download-pdf")
      .addEventListener("click", ForgeExport.exportarPDF);
    document
      .getElementById("btn-cheat-sheet")
      .addEventListener("click", ForgeExport.gerarFichaResumo);
  }

  function _gerarAleatorio() {
    const cenarios = Object.keys(ForgeTables.CENARIOS);
    const cenario = ForgeTables.random(cenarios);
    const cenarioData = ForgeTables.CENARIOS[cenario];
    const tons = [
      "dark_fantasy",
      "epica",
      "misterio",
      "horror",
      "comedia",
      "politico",
      "sobrevivencia",
    ];
    const duracoes = ["oneshot", "mini", "campanha"];
    const dificuldades = ["facil", "medio", "dificil", "mortal"];
    const viloes = ["faccao", "criatura", "corrupcao", "individuo", "entidade"];

    const dados = {
      cenario,
      tier: String(Math.ceil(Math.random() * 4)),
      jogadores: String(Math.floor(Math.random() * 4) + 2),
      dificuldade: ForgeTables.random(dificuldades),
      tons: ForgeTables.randomN(tons, 2),
      conflito: cenarioData.conflitos[0].id,
      vilao: ForgeTables.random(viloes),
      duracao: ForgeTables.random(duracoes),
      estrutura: "3cenas",
      regraCasa: true,
      downtime: true,
      downtimeMecanico: false,
      progressaoXP: false,
      nomeAventura: ForgeTables.random(ForgeTables.NOMES_AVENTURA),
    };

    ForgeThemes.aplicarTema(cenario);
    const overlay = document.getElementById("loading-overlay");
    overlay.classList.remove("hidden");

    setTimeout(() => {
      const aventura = ForgeGenerator.forjar(dados);
      ForjaState.setState("aventuraGerada", aventura);
      ForjaState.setState("wizard", dados);
      document.getElementById("preview-content").innerHTML =
        ForgeGenerator.toHTML(aventura);
      document.getElementById("wizard").classList.add("hidden");
      document.getElementById("preview").classList.remove("hidden");
      ForjaState.setState("viewAtual", "preview");
      overlay.classList.add("hidden");
      toast("Aventura aleatória forjada! 🎲", "success");
      lucide.createIcons();
    }, 1500);
  }

  function _voltarWizard() {
    document.getElementById("preview").classList.add("hidden");
    document.getElementById("wizard").classList.remove("hidden");
    ForjaState.setState("viewAtual", "wizard");
  }

  /**
   * Mostra uma notificação toast.
   * @param {string} mensagem
   * @param {'success'|'error'|'warning'} tipo
   */
  function toast(mensagem, tipo = "success") {
    const container = document.getElementById("toast-container");
    const icons = {
      success: "check-circle",
      error: "alert-circle",
      warning: "alert-triangle",
    };
    const el = document.createElement("div");
    el.className = `toast toast--${tipo}`;
    el.innerHTML = `<i data-lucide="${icons[tipo]}" style="width:18px;height:18px;"></i><span>${mensagem}</span>`;
    container.appendChild(el);
    lucide.createIcons({ nameAttr: "data-lucide" });
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translateX(20px)";
      setTimeout(() => el.remove(), 300);
    }, 3500);
  }

  document.addEventListener("DOMContentLoaded", init);

  return { init, toast };
})();
