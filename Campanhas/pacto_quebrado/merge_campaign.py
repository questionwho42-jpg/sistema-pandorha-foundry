import os
import subprocess

files_in_order = [
    "sessao_zero_pacto_quebrado.md",
    "aventura_pacto_quebrado.md",
    "cheat_sheet_pacto_quebrado.md",
    "localidades_pacto_quebrado.md",
    "fluxo_capitulo1.md",
    "interacoes_vila_ferroforja.md",
    "interacoes_colinas_ocidentais.md",
    "fluxo_capitulo2.md",
    "interacoes_ruinas_karathon.md",
    "fluxo_capitulo3.md",
    "sidequests_pacto_quebrado.md",
    "npcs_pacto_quebrado.md",
    "bestiario_pacto_quebrado.md",
    "itens_pacto_quebrado.md",
    "handouts_e_reliquias.md",
    "imersao_e_lore_morden_gorbax.md",
    "ajuste_de_xp_e_nd.md",
    "legado_pacto_quebrado.md",
    "trilha_sonora_lyria.md"
]

output_filename = "Pacto_Quebrado_Livro_Completo.md"
base_dir = r"c:\Users\Pichau\Desktop\o mundo de pandorha - livro\Campanhas\pacto_quebrado"

with open(os.path.join(base_dir, output_filename), "w", encoding="utf-8") as outfile:
    outfile.write("# 📖 Pacto Quebrado - Livro de Campanha Completo\n\n")
    outfile.write("*Um guia consolidado para o Mestre.*\n\n")
    outfile.write("<div style=\"page-break-after: always;\"></div>\n\n")
    
    for filename in files_in_order:
        filepath = os.path.join(base_dir, filename)
        if os.path.exists(filepath):
            with open(filepath, "r", encoding="utf-8") as infile:
                content = infile.read()
                outfile.write(f"<!-- INÍCIO: {filename} -->\n")
                outfile.write(content)
                outfile.write(f"\n<!-- FIM: {filename} -->\n")
                outfile.write("\n<div style=\"page-break-after: always;\"></div>\n\n")
        else:
            print(f"Arquivo não encontrado: {filename}")

print(f"Mesclagem concluída! Gerado: {output_filename}")
