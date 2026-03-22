import json
import os

paths = {
    "conditions": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\conditions.db",
    "spells": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\spells.db",
    "monsters": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\bestiary.db",
    "monster_abilities": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\monster-abilities.db"
}

out_path = r"c:\Users\Pichau\Desktop\o mundo de pandorha - livro\Auditoria\inspect_out.txt"

with open(out_path, 'w', encoding='utf-8') as out:
    def analyze_db(name, path, search_keys):
        out.write(f"\n--- Analyzing {name} ---\n")
        try:
            with open(path, 'r', encoding='utf-8') as f:
                for line in f:
                    try:
                        obj = json.loads(line)
                        obj_name = obj.get("name", "")
                        if any(key.lower() in obj_name.lower() for key in search_keys):
                            out.write(f"FOUND: {obj_name}\n")
                            # Escreve apenas os campos relevantes
                            desc = obj.get("system", {}).get("description", {}).get("value", "")[:100].replace("\n", " ")
                            out.write(f"  Description format: {desc}...\n")
                    except Exception as e:
                        pass
        except Exception as e:
            out.write(f"File not found: {path} - {e}\n")

    analyze_db("Conditions", paths["conditions"], ["Aterrorizado", "Exposto"])
    analyze_db("Spells", paths["spells"], ["Dardo de Fogo", "Choque Estático", "Míssil Mágico", "Raio de Gelo"])
    analyze_db("Monster Abilities", paths["monster_abilities"], ["Pó Mágico", "Garra Paralisante", "Mordida Espectral", "Lamento", "Mordidas Coletivas", "Garra"])
    analyze_db("Bestiary", paths["monsters"], ["Pixie", "Carniçal", "Lobo do Éter", "Banshee", "Enxame de Ratos"])
