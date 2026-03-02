/**
 * THEMES.JS — Troca Dinâmica de Temas Visuais
 * Forja de Aventuras | Sistema Pandorha
 */

const ForgeThemes = (() => {
  const TEMAS = {
    morden: {
      bg: "#0d0f14",
      surface: "#141822",
      border: "#1f2838",
      primary: "#4a9eff",
      accent: "#61dafb",
      fontTitle: "Orbitron",
      fontBody: "Rajdhani",
    },
    almar: {
      bg: "#1a1510",
      surface: "#231e16",
      border: "#352d20",
      primary: "#d4a853",
      accent: "#f0c674",
      fontTitle: "Cinzel",
      fontBody: "Lora",
    },
    cinar: {
      bg: "#0a140d",
      surface: "#122017",
      border: "#1d3324",
      primary: "#4caf50",
      accent: "#81c784",
      fontTitle: "Uncial Antiqua",
      fontBody: "Nunito",
    },
    draskar: {
      bg: "#1a0c08",
      surface: "#241410",
      border: "#3a1f15",
      primary: "#ff5722",
      accent: "#ff8a65",
      fontTitle: "Pirata One",
      fontBody: "Barlow",
    },
    dungard: {
      bg: "#10101a",
      surface: "#181828",
      border: "#252540",
      primary: "#9c8fff",
      accent: "#b8b0ff",
      fontTitle: "Cinzel Decorative",
      fontBody: "Source Sans 3",
    },
    floresta_ecos: {
      bg: "#081210",
      surface: "#0f1e1a",
      border: "#163028",
      primary: "#00e676",
      accent: "#69f0ae",
      fontTitle: "MedievalSharp",
      fontBody: "Quicksand",
    },
    gorbax: {
      bg: "#161008",
      surface: "#201a10",
      border: "#342a18",
      primary: "#a1887f",
      accent: "#d7ccc8",
      fontTitle: "Bungee Shade",
      fontBody: "Archivo",
    },
    generico: {
      bg: "#0f0f13",
      surface: "#1a1a24",
      border: "#2d2d3d",
      primary: "#7c5cfc",
      accent: "#f59e0b",
      fontTitle: "Inter",
      fontBody: "Inter",
    },
    custom: {
      bg: "#0f0f13",
      surface: "#1a1a24",
      border: "#2d2d3d",
      primary: "#7c5cfc",
      accent: "#f59e0b",
      fontTitle: "Inter",
      fontBody: "Inter",
    },
  };

  /**
   * Aplica um tema visual ao body.
   * @param {string} cenario - ID do cenário
   */
  function aplicarTema(cenario) {
    const tema = TEMAS[cenario] || TEMAS.generico;
    const root = document.documentElement;

    root.style.setProperty("--color-bg", tema.bg);
    root.style.setProperty("--color-surface", tema.surface);
    root.style.setProperty("--color-border", tema.border);
    root.style.setProperty("--color-primary", tema.primary);
    root.style.setProperty("--color-accent", tema.accent);
    root.style.setProperty("--font-title", `'${tema.fontTitle}', sans-serif`);
    root.style.setProperty("--font-body", `'${tema.fontBody}', sans-serif`);

    document.body.dataset.theme = cenario;
  }

  return { aplicarTema, TEMAS };
})();
