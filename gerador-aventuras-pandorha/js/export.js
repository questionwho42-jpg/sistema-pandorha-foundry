/**
 * EXPORT.JS — Exportação PDF / Markdown / Ficha Resumo
 * Forja de Aventuras | Sistema Pandorha
 */

const ForgeExport = (() => {
  /** Exporta como arquivo Markdown (.md) */
  function exportarMarkdown() {
    const av = ForjaState.getState("aventuraGerada");
    if (!av) {
      ForgeApp.toast("Nenhuma aventura para exportar.", "warning");
      return;
    }
    const md = ForgeGenerator.toMarkdown(av);
    const nomeArq = _slugify(av.titulo) + ".md";
    _download(md, nomeArq, "text/markdown");
    ForgeApp.toast(`Baixado: ${nomeArq}`, "success");
  }

  /** Exporta como PDF via window.print() */
  function exportarPDF() {
    const av = ForjaState.getState("aventuraGerada");
    if (!av) {
      ForgeApp.toast("Nenhuma aventura para exportar.", "warning");
      return;
    }
    window.print();
  }

  /** Gera e exibe a Ficha Resumo (Cheat Sheet) */
  function gerarFichaResumo() {
    const av = ForjaState.getState("aventuraGerada");
    if (!av) {
      ForgeApp.toast("Nenhuma aventura para resumir.", "warning");
      return;
    }

    const fichaHTML = _buildCheatSheet(av);
    const w = window.open("", "_blank", "width=800,height=600");
    w.document
      .write(`<!DOCTYPE html><html><head><title>Ficha Resumo — ${av.titulo}</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: Arial, sans-serif; font-size: 11px; padding: 10px; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; height: calc(100vh - 40px); }
      .quadrant { border: 1px solid #333; border-radius: 6px; padding: 8px; overflow: hidden; }
      .quadrant h3 { font-size: 12px; margin-bottom: 6px; border-bottom: 1px solid #ccc; padding-bottom: 4px; }
      table { width: 100%; border-collapse: collapse; font-size: 10px; }
      th, td { border: 1px solid #ddd; padding: 3px 5px; text-align: left; }
      th { background: #f0f0f0; }
      ul { padding-left: 14px; }
      li { margin-bottom: 2px; }
      h2 { text-align: center; margin-bottom: 8px; font-size: 14px; }
      @media print { body { padding: 5mm; } }
    </style></head><body>
    <h2>⚒️ ${av.titulo} — Ficha Resumo</h2>
    ${fichaHTML}
    </body></html>`);
    w.document.close();
    w.focus();
    ForgeApp.toast("Ficha Resumo aberta em nova aba.", "success");
  }

  function _buildCheatSheet(av) {
    let html = '<div class="grid">';

    // Q1: NPCs
    html +=
      '<div class="quadrant"><h3>👥 NPCs Ativos</h3><table><tr><th>Nome</th><th>Tipo</th><th>Fala</th></tr>';
    av.npcs.slice(0, 8).forEach((n) => {
      html += `<tr><td><strong>${n.nome}</strong></td><td>${n.tipo}</td><td style="font-style:italic">${n.falaIconica.substring(0, 60)}...</td></tr>`;
    });
    html += "</table></div>";

    // Q2: Monstros
    html +=
      '<div class="quadrant"><h3>⚔️ Monstros</h3><table><tr><th>Nome</th><th>ND</th><th>HP</th><th>CA</th></tr>';
    av.capitulos.forEach((cap) => {
      cap.cenas.forEach((cena) => {
        if (cena.monstros)
          cena.monstros.forEach((m) => {
            html += `<tr><td>${m.nome}</td><td>${m.nd}</td><td>${m.hp}</td><td>${m.ca}</td></tr>`;
          });
      });
    });
    html += "</table></div>";

    // Q3: DCs
    html += '<div class="quadrant"><h3>📋 DCs e Testes</h3><ul>';
    av.capitulos.forEach((cap) => {
      cap.cenas.forEach((cena) => {
        if (cena.teste)
          html += `<li><strong>${cena.titulo}:</strong> ${cena.teste.eixo} DC ${cena.teste.dc}</li>`;
      });
    });
    html += "</ul></div>";

    // Q4: Ganchos
    html += '<div class="quadrant"><h3>🔗 Ganchos e Pistas</h3><ul>';
    av.capitulos.forEach((cap) => {
      cap.cenas.forEach((cena) => {
        if (cena.dilema)
          html += `<li><strong>Dilema:</strong> ${cena.dilema.titulo}</li>`;
      });
    });
    html += `<li><strong>Epílogo:</strong> ${av.epilogo.contadorNome} (0-${av.epilogo.contadorMax})</li>`;
    av.faccoes.forEach((f) => {
      html += `<li><strong>${f.nome}:</strong> Favor 0</li>`;
    });
    html += "</ul></div>";

    html += "</div>";
    return html;
  }

  function _download(content, filename, type) {
    const blob = new Blob([content], { type: type + ";charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function _slugify(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");
  }

  return { exportarMarkdown, exportarPDF, gerarFichaResumo };
})();
