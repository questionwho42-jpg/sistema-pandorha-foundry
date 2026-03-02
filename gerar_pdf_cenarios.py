"""
Script para gerar o PDF dos Cenários de Pandorha.
Inclui: Capa com mapa, os 7 cenários regionais, e as 4 divindades.
"""

import os
import base64
import markdown

from weasyprint import HTML

# --- CONFIGURAÇÃO ---
RAIZ = os.path.dirname(os.path.abspath(__file__))
CENARIOS_DIR = os.path.join(RAIZ, "Cenarios")
DIVINDADES_DIR = os.path.join(
    CENARIOS_DIR, "O_Mundo_de_Pandorha", "06_NPCs", "Divindades"
)
MAPA_PATH = os.path.join(CENARIOS_DIR, "Gemini_Generated_Image_fdjz0dfdjz0dfdjz.png")
ARQUIVO_SAIDA = os.path.join(RAIZ, "Cenarios_de_Pandorha.pdf")

# Ordem dos cenários (segue a lógica geográfica do mapa)
ORDEM_CENARIOS = [
    "Almar",
    "Cinar",
    "Dungard",
    "Gorbax_Montanhas_Orcs",
    "Floresta_Ecos",
    "Morden",
    "Draskar",
]

# Nomes legíveis para exibição
NOMES_CENARIOS = {
    "Almar": "Almar — O Reino do Comércio",
    "Cinar": "Cinar — As Torres de Cristal",
    "Dungard": "Dungard — A Fortaleza dos Anões",
    "Gorbax_Montanhas_Orcs": "Gorbax — As Montanhas dos Orcs",
    "Floresta_Ecos": "Floresta dos Ecos",
    "Morden": "Morden — A Cidade Proibida",
    "Draskar": "Draskar — As Areias Cinzentas",
}


def imagem_para_data_uri(caminho: str) -> str:
    """Converte uma imagem para data URI base64 para embutir no HTML."""
    with open(caminho, "rb") as f:
        dados = f.read()
    b64 = base64.b64encode(dados).decode("utf-8")
    ext = os.path.splitext(caminho)[1].lower()
    mime = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg"}
    tipo_mime = mime.get(ext.lstrip("."), "image/png")
    return f"data:{tipo_mime};base64,{b64}"


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
        content: "Cenários de Pandorha";
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

@page mapa {
    @top-center { content: none; }
    @bottom-center { content: none; }
    margin: 0;
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
    background: linear-gradient(180deg, #0D1B2A 0%, #1B2838 40%, #2C3E50 100%);
    color: #E8D5B7;
    margin: -2cm -2.5cm;
    padding: 2cm 2.5cm;
}

.capa h1 {
    font-family: 'Cinzel', serif;
    font-size: 44pt;
    font-weight: 900;
    color: #D4AF37;
    text-shadow: 0 0 40px rgba(212, 175, 55, 0.3);
    letter-spacing: 5px;
    margin-bottom: 0.1em;
    border: none;
}

.capa h2 {
    font-family: 'Cinzel', serif;
    font-size: 16pt;
    font-weight: 400;
    color: #B8A07E;
    letter-spacing: 8px;
    text-transform: uppercase;
    border: none;
    margin-top: 0;
}

.capa .subtitulo {
    font-family: 'Lora', serif;
    font-style: italic;
    font-size: 11pt;
    color: #8B7D6B;
    margin-top: 2em;
}

.capa .linha-decorativa {
    width: 200px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    margin: 1.5em auto;
}

/* --- PÁGINA DO MAPA --- */
.pagina-mapa {
    page: mapa;
    page-break-after: always;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #1a1510;
    margin: -2cm -2.5cm;
    padding: 1cm;
}

.pagina-mapa img {
    max-width: 100%;
    max-height: 90vh;
    border: 3px solid #D4AF37;
    box-shadow: 0 0 30px rgba(0,0,0,0.5);
}

.pagina-mapa .legenda-mapa {
    font-family: 'Cinzel', serif;
    font-size: 14pt;
    color: #D4AF37;
    letter-spacing: 4px;
    margin-top: 1em;
    text-transform: uppercase;
}

/* --- PÁGINA DE ABERTURA DE CENÁRIO --- */
.abertura-cenario {
    page-break-before: always;
    page-break-after: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    margin: -2cm -2.5cm;
    padding: 2cm 3cm;
}

.abertura-cenario.almar {
    background: linear-gradient(180deg, #2C1810 0%, #4A2E1F 50%, #6B3D2E 100%);
}
.abertura-cenario.cinar {
    background: linear-gradient(180deg, #0A1628 0%, #1A3A5C 50%, #2A5F8F 100%);
}
.abertura-cenario.dungard {
    background: linear-gradient(180deg, #1A1A1A 0%, #3D2B1F 50%, #5C4033 100%);
}
.abertura-cenario.gorbax {
    background: linear-gradient(180deg, #1A1A0A 0%, #3D3D1A 50%, #4A4A2A 100%);
}
.abertura-cenario.floresta {
    background: linear-gradient(180deg, #0A1A0A 0%, #1A3D1A 50%, #2A5C2A 100%);
}
.abertura-cenario.morden {
    background: linear-gradient(180deg, #1A0A2E 0%, #2E1A4A 50%, #4A2A6B 100%);
}
.abertura-cenario.draskar {
    background: linear-gradient(180deg, #2E2A1A 0%, #4A4030 50%, #6B5A40 100%);
}
.abertura-cenario.divindades {
    background: linear-gradient(180deg, #1A0A0A 0%, #2E1A1A 50%, #0A1A2E 100%);
}

.abertura-cenario h1 {
    font-family: 'Cinzel', serif;
    font-size: 36pt;
    font-weight: 900;
    color: #D4AF37;
    text-shadow: 0 0 30px rgba(212, 175, 55, 0.25);
    letter-spacing: 3px;
    border: none;
    margin-bottom: 0.3em;
}

.abertura-cenario .linha-dec {
    width: 150px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    margin: 0.8em auto;
}

.abertura-cenario .descricao {
    font-family: 'Lora', serif;
    font-style: italic;
    font-size: 13pt;
    color: #C4A882;
    max-width: 400px;
}

/* --- TÍTULOS --- */
h1 {
    font-family: 'Cinzel', serif;
    font-size: 22pt;
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
    font-size: 16pt;
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
    font-size: 13pt;
    font-weight: 700;
    color: #0f3460;
    margin-top: 1.1em;
    margin-bottom: 0.5em;
    page-break-after: avoid;
}

h4 {
    font-family: 'Cinzel', serif;
    font-size: 11.5pt;
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

/* --- PARÁGRAFOS --- */
p {
    text-align: justify;
    margin-bottom: 0.6em;
    orphans: 3;
    widows: 3;
}

strong { color: #1a1a2e; }
em { color: #4A4A4A; }

/* --- LISTAS --- */
ul, ol {
    margin-left: 1.2em;
    margin-bottom: 0.6em;
}

li { margin-bottom: 0.3em; }

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

tbody tr:nth-child(even) { background-color: #F5EFE0; }
tbody tr:nth-child(odd) { background-color: #FEFCF8; }

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

/* --- HR --- */
hr {
    border: none;
    height: 2px;
    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    margin: 2em 0;
}

/* --- LINKS --- */
a {
    color: #0f3460;
    text-decoration: none;
    border-bottom: 1px dotted #B8A07E;
}
"""


def ler_arquivo(caminho: str) -> str:
    """Lê o conteúdo de um arquivo Markdown."""
    with open(caminho, "r", encoding="utf-8") as f:
        return f.read()


def md_para_html(texto_md: str) -> str:
    """Converte Markdown para HTML."""
    extensoes = [
        "tables",
        "fenced_code",
        "codehilite",
        "toc",
        "sane_lists",
        "smarty",
    ]
    return markdown.markdown(texto_md, extensions=extensoes)


def construir_html() -> str:
    """Monta o HTML completo com capa, mapa, cenários e divindades."""

    # --- Capa ---
    html_capa = """
    <div class="capa">
        <div class="linha-decorativa"></div>
        <h1>PANDORHA</h1>
        <h2>Guia dos Cenários</h2>
        <div class="linha-decorativa"></div>
        <p class="subtitulo">
            Sete reinos. Quatro divindades. Um mundo à beira do abismo.
        </p>
    </div>
    """

    # --- Mapa ---
    mapa_uri = imagem_para_data_uri(MAPA_PATH)
    html_mapa = f"""
    <div class="pagina-mapa">
        <img src="{mapa_uri}" alt="Mapa de Pandorha" />
        <p class="legenda-mapa">Mapa do Mundo de Pandorha</p>
    </div>
    """

    # --- Sumário ---
    html_sumario = '<section class="separador-capitulo">'
    html_sumario += "<h1>Sumário</h1>"
    html_sumario += "<h2>Reinos</h2><ol>"
    for chave in ORDEM_CENARIOS:
        nome = NOMES_CENARIOS.get(chave, chave)
        html_sumario += f"<li><strong>{nome}</strong></li>"
    html_sumario += "</ol>"
    html_sumario += "<h2>Divindades</h2><ol>"
    for nome_div in sorted(os.listdir(DIVINDADES_DIR)):
        if nome_div.endswith(".md"):
            nome_limpo = nome_div.replace(".md", "")
            html_sumario += f"<li><strong>{nome_limpo}</strong></li>"
    html_sumario += "</ol></section>"

    # --- Cenários ---
    classes_cenario = {
        "Almar": "almar",
        "Cinar": "cinar",
        "Dungard": "dungard",
        "Gorbax_Montanhas_Orcs": "gorbax",
        "Floresta_Ecos": "floresta",
        "Morden": "morden",
        "Draskar": "draskar",
    }

    descricoes_cenario = {
        "Almar": "Onde o ouro fala mais alto que a espada.",
        "Cinar": "Torres de cristal erguidas sobre segredos ancestrais.",
        "Dungard": "A fortaleza eterna, esculpida na pedra e no orgulho.",
        "Gorbax_Montanhas_Orcs": "As montanhas tremem ao som dos tambores de guerra.",
        "Floresta_Ecos": "Onde cada folha sussurra uma memória esquecida.",
        "Morden": "A cidade selada, um enigma envolto em éter.",
        "Draskar": "Areias cinzentas que guardam os ossos de impérios.",
    }

    html_cenarios = []
    for chave in ORDEM_CENARIOS:
        nome = NOMES_CENARIOS.get(chave, chave)
        classe = classes_cenario.get(chave, "almar")
        descricao = descricoes_cenario.get(chave, "")
        caminho = os.path.join(CENARIOS_DIR, chave, "cenario.md")

        if not os.path.exists(caminho):
            print(f"  ⚠️  Arquivo não encontrado: {caminho}")
            continue

        # Página de abertura do cenário
        abertura = f"""
        <div class="abertura-cenario {classe}">
            <div class="linha-dec"></div>
            <h1>{nome}</h1>
            <div class="linha-dec"></div>
            <p class="descricao">{descricao}</p>
        </div>
        """

        # Conteúdo do cenário
        conteudo_md = ler_arquivo(caminho)
        conteudo_html = md_para_html(conteudo_md)

        html_cenarios.append(f"{abertura}\n<section>{conteudo_html}</section>")
        print(f"  ✅ {nome}")

    # --- Divindades ---
    html_divindades_abertura = """
    <div class="abertura-cenario divindades">
        <div class="linha-dec"></div>
        <h1>As Divindades</h1>
        <div class="linha-dec"></div>
        <p class="descricao">
            Os quatro pilares que sustentam — ou destroem — a realidade.
        </p>
    </div>
    """

    html_divindades = [html_divindades_abertura]
    for nome_arq in sorted(os.listdir(DIVINDADES_DIR)):
        if not nome_arq.endswith(".md"):
            continue
        caminho = os.path.join(DIVINDADES_DIR, nome_arq)
        conteudo_md = ler_arquivo(caminho)
        conteudo_html = md_para_html(conteudo_md)
        html_divindades.append(
            f'<section style="page-break-before: always;">{conteudo_html}</section>'
        )
        print(f"  ✅ Divindade: {nome_arq.replace('.md', '')}")

    # --- Montagem final ---
    html_completo = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <style>{CSS_ESTILO}</style>
</head>
<body>
    {html_capa}
    {html_mapa}
    {html_sumario}
    {"".join(html_cenarios)}
    {"".join(html_divindades)}
</body>
</html>"""

    return html_completo


def gerar_pdf(html: str, caminho_saida: str) -> None:
    """Converte o HTML para PDF via WeasyPrint."""
    print(f"\nGerando PDF em: {caminho_saida}")
    HTML(string=html).write_pdf(caminho_saida)
    tamanho_mb = os.path.getsize(caminho_saida) / (1024 * 1024)
    print(f"PDF gerado com sucesso! Tamanho: {tamanho_mb:.1f} MB")


def main() -> None:
    """Função principal."""
    print("=== Gerador de PDF - Cenários de Pandorha ===\n")
    print("Processando cenários e divindades...\n")

    html = construir_html()

    print("\nConvertendo para PDF (pode demorar alguns minutos)...")
    gerar_pdf(html, ARQUIVO_SAIDA)

    print(f"\n✅ Concluído! Arquivo salvo em:\n   {ARQUIVO_SAIDA}")


if __name__ == "__main__":
    main()
