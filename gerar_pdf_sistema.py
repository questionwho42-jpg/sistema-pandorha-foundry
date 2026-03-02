"""
Script para gerar o PDF do Sistema de Pandorha.
Lê todos os arquivos Markdown do diretório 'sistema consolidado',
converte-os para HTML e gera um PDF estilizado.
"""

import os
import markdown
from weasyprint import HTML

# --- CONFIGURAÇÃO ---
DIRETORIO_SISTEMA = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "Sistemas", "Pandorha", "sistema consolidado"
)
ARQUIVO_SAIDA = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "Sistema_de_Pandorha.pdf"
)

# --- CSS PREMIUM ---
CSS_ESTILO = """
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Lora:ital,wght@0,400;0,700;1,400&family=Fira+Code&display=swap');

@page {
    size: A4;
    margin: 2cm 2.5cm;
    @bottom-center {
        content: counter(page);
        font-family: 'Cinzel', serif;
        font-size: 10pt;
        color: #8B7355;
    }
    @top-center {
        content: "Sistema de Pandorha";
        font-family: 'Cinzel', serif;
        font-size: 9pt;
        color: #8B7355;
        letter-spacing: 2px;
        text-transform: uppercase;
    }
}

@page :first {
    @top-center { content: none; }
    @bottom-center { content: none; }
}

body {
    font-family: 'Lora', 'Georgia', serif;
    font-size: 11pt;
    line-height: 1.7;
    color: #2C2C2C;
    background: #FEFCF8;
}

/* --- CAPA --- */
.capa {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    color: #E8D5B7;
    margin: -2cm -2.5cm;
    padding: 2cm 2.5cm;
}

.capa h1 {
    font-family: 'Cinzel', serif;
    font-size: 42pt;
    font-weight: 900;
    color: #D4AF37;
    text-shadow: 0 0 40px rgba(212, 175, 55, 0.3);
    letter-spacing: 4px;
    margin-bottom: 0.2em;
    border: none;
}

.capa h2 {
    font-family: 'Cinzel', serif;
    font-size: 18pt;
    font-weight: 400;
    color: #B8A07E;
    letter-spacing: 6px;
    text-transform: uppercase;
    border: none;
    margin-top: 0;
}

.capa .subtitulo {
    font-family: 'Lora', serif;
    font-style: italic;
    font-size: 12pt;
    color: #8B7D6B;
    margin-top: 3em;
}

.capa .linha-decorativa {
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    margin: 1.5em auto;
}

/* --- TÍTULOS --- */
h1 {
    font-family: 'Cinzel', serif;
    font-size: 24pt;
    font-weight: 900;
    color: #1a1a2e;
    border-bottom: 3px solid #D4AF37;
    padding-bottom: 0.3em;
    margin-top: 1.5em;
    margin-bottom: 0.8em;
    page-break-after: avoid;
}

h2 {
    font-family: 'Cinzel', serif;
    font-size: 18pt;
    font-weight: 700;
    color: #16213e;
    border-bottom: 1.5px solid #B8A07E;
    padding-bottom: 0.2em;
    margin-top: 1.3em;
    margin-bottom: 0.6em;
    page-break-after: avoid;
}

h3 {
    font-family: 'Cinzel', serif;
    font-size: 14pt;
    font-weight: 700;
    color: #0f3460;
    margin-top: 1.1em;
    margin-bottom: 0.5em;
    page-break-after: avoid;
}

h4 {
    font-family: 'Cinzel', serif;
    font-size: 12pt;
    font-weight: 700;
    color: #2C4A6E;
    margin-top: 1em;
    margin-bottom: 0.4em;
    page-break-after: avoid;
}

h5, h6 {
    font-family: 'Cinzel', serif;
    font-size: 11pt;
    font-weight: 700;
    color: #3D5A80;
    margin-top: 0.8em;
    margin-bottom: 0.3em;
}

/* --- PARÁGRAFOS E TEXTO --- */
p {
    text-align: justify;
    margin-bottom: 0.6em;
    orphans: 3;
    widows: 3;
}

strong {
    color: #1a1a2e;
}

em {
    color: #4A4A4A;
}

/* --- LISTAS --- */
ul, ol {
    margin-left: 1.2em;
    margin-bottom: 0.6em;
}

li {
    margin-bottom: 0.3em;
}

/* --- TABELAS --- */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    font-size: 10pt;
    page-break-inside: auto;
}

thead {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
}

thead th {
    color: #D4AF37;
    font-family: 'Cinzel', serif;
    font-weight: 700;
    padding: 8px 10px;
    text-align: left;
    border: 1px solid #2C4A6E;
    font-size: 9pt;
    letter-spacing: 0.5px;
}

tbody td {
    padding: 6px 10px;
    border: 1px solid #D4C5A9;
    vertical-align: top;
}

tbody tr:nth-child(even) {
    background-color: #F5EFE0;
}

tbody tr:nth-child(odd) {
    background-color: #FEFCF8;
}

/* --- CÓDIGO --- */
code {
    font-family: 'Fira Code', monospace;
    font-size: 9pt;
    background-color: #F0EBE0;
    padding: 2px 5px;
    border-radius: 3px;
    color: #8B4513;
}

pre {
    background-color: #1a1a2e;
    color: #E8D5B7;
    padding: 1em;
    border-radius: 6px;
    overflow-x: auto;
    font-size: 9pt;
    line-height: 1.5;
    border-left: 4px solid #D4AF37;
    margin: 1em 0;
}

pre code {
    background: none;
    color: inherit;
    padding: 0;
}

/* --- BLOCKQUOTE --- */
blockquote {
    border-left: 4px solid #D4AF37;
    margin: 1em 0;
    padding: 0.5em 1em;
    background-color: #F8F3E8;
    font-style: italic;
    color: #555;
}

/* --- LINHA HORIZONTAL --- */
hr {
    border: none;
    height: 2px;
    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    margin: 2em 0;
}

/* --- SEPARADOR DE CAPÍTULO --- */
.separador-capitulo {
    page-break-before: always;
    margin-top: 0;
}

/* --- LINKS --- */
a {
    color: #0f3460;
    text-decoration: none;
    border-bottom: 1px dotted #B8A07E;
}
"""


def coletar_arquivos(diretorio: str) -> list[str]:
    """
    Coleta todos os arquivos .md do diretório e os ordena pelo nome.
    Isso garante que os capítulos fiquem na ordem correta (00, 01, 02...).
    """
    arquivos = []
    for nome in sorted(os.listdir(diretorio)):
        if nome.endswith(".md"):
            arquivos.append(os.path.join(diretorio, nome))
    return arquivos


def ler_arquivo(caminho: str) -> str:
    """Lê o conteúdo de um arquivo Markdown."""
    with open(caminho, "r", encoding="utf-8") as f:
        return f.read()


def construir_html(arquivos: list[str]) -> str:
    """
    Lê todos os Markdown, converte para HTML e monta o documento completo.
    Cada arquivo se torna um capítulo separado com quebra de página.
    """
    extensoes = [
        "tables",
        "fenced_code",
        "codehilite",
        "toc",
        "sane_lists",
        "smarty",
    ]

    # Capa
    html_capa = """
    <div class="capa">
        <div class="linha-decorativa"></div>
        <h1>PANDORHA</h1>
        <h2>Sistema Consolidado</h2>
        <div class="linha-decorativa"></div>
        <p class="subtitulo">Um sistema completo de RPG para o Mundo de Pandorha</p>
    </div>
    """

    html_capitulos = []
    for i, caminho in enumerate(arquivos):
        conteudo_md = ler_arquivo(caminho)
        conteudo_html = markdown.markdown(
            conteudo_md, extensions=extensoes
        )
        # Adiciona separador de capítulo (exceto no primeiro)
        classe = ' class="separador-capitulo"' if i > 0 else ""
        html_capitulos.append(
            f'<section{classe}>\n{conteudo_html}\n</section>'
        )

    html_completo = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <style>{CSS_ESTILO}</style>
</head>
<body>
    {html_capa}
    {"".join(html_capitulos)}
</body>
</html>"""

    return html_completo


def gerar_pdf(html: str, caminho_saida: str) -> None:
    """Converte o HTML completo para PDF usando WeasyPrint."""
    print(f"Gerando PDF em: {caminho_saida}")
    HTML(string=html).write_pdf(caminho_saida)
    tamanho_mb = os.path.getsize(caminho_saida) / (1024 * 1024)
    print(f"PDF gerado com sucesso! Tamanho: {tamanho_mb:.1f} MB")


def main() -> None:
    """Função principal que orquestra a geração do PDF."""
    print("=== Gerador de PDF - Sistema de Pandorha ===\n")

    # 1. Coletar arquivos
    arquivos = coletar_arquivos(DIRETORIO_SISTEMA)
    print(f"Encontrados {len(arquivos)} arquivos Markdown.\n")

    for a in arquivos:
        print(f"  📄 {os.path.basename(a)}")
    print()

    # 2. Construir HTML
    print("Convertendo Markdown para HTML...")
    html = construir_html(arquivos)

    # 3. Gerar PDF
    print("Gerando PDF (pode demorar alguns minutos)...")
    gerar_pdf(html, ARQUIVO_SAIDA)

    print(f"\n✅ Concluído! Arquivo salvo em:\n   {ARQUIVO_SAIDA}")


if __name__ == "__main__":
    main()
