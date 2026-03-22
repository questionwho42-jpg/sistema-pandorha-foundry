import json
import os

paths = {
    "conditions": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\conditions.db",
    "spells": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\spells.db",
    "monsters": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\bestiary.db",
    "monster_abilities": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\monster-abilities.db"
}

out_path = r"c:\Users\Pichau\Desktop\o mundo de pandorha - livro\Auditoria\item_dumps.json"

target_names = ["Aterrorizado", "Exposto", "Raio de Gelo", "Pó Mágico", "Garra Paralisante", "Mordida Espectral", "Lamento", "Banshee", "Enxame de Ratos"]

found_items = {}

for cat, p in paths.items():
    try:
        with open(p, 'r', encoding='utf-8') as f:
            for line in f:
                try:
                    obj = json.loads(line)
                    name = obj.get("name", "")
                    if name in target_names:
                        found_items[name] = obj
                except:
                    pass
    except:
        pass

with open(out_path, 'w', encoding='utf-8') as out:
    json.dump(found_items, out, indent=4, ensure_ascii=False)
