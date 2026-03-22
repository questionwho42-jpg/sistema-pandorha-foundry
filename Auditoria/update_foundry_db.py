import json
import os
import re

paths = {
    "conditions": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\conditions.db",
    "spells": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\spells.db",
    "monsters": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\bestiary.db"
}

def process_file(path, process_func):
    if not os.path.exists(path):
        return
    updated_lines = []
    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            try:
                obj = json.loads(line)
                obj = process_func(obj)
                updated_lines.append(json.dumps(obj, ensure_ascii=False) + "\n")
            except:
                updated_lines.append(line)
                
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(updated_lines)
    print(f"Updated {path}")

def update_conditions(obj):
    name = obj.get("name", "")
    sys = obj.get("system", {})
    if name == "Aterrorizado":
        sys["effect"] = "-2 em testes."
        sys["description"] = "<p>Foge com todas as ações. -2 em testes.</p><p>Remoção: Teste Global de [Mental + Resistência] no Fim do Turno.</p>"
    elif name == "Exposto":
        sys["effect"] = "-1 CA. Armas de Impacto causam Vulnerabilidade 2."
        sys["description"] = "<p>-1 CA. Se sofrer ataque de arma de Impacto ou Pesada, sofre Vulnerabilidade 2.</p><p>Remoção: Ao sair de Flanco ou fim da habilidade.</p>"
    return obj

def update_spells(obj):
    name = obj.get("name", "")
    sys = obj.get("system", {})
    if name == "Raio de Gelo":
        sys["damage"] = "1d4"
        desc = sys.get("description", "")
        desc = desc.replace("**1d8 de dano de Frio**", "**1d4 de dano de Frio**")
        sys["description"] = desc
    return obj

def update_monsters(obj):
    name = obj.get("name", "")
    sys = obj.get("system", {})
    details = sys.get("details", {})
    desc = sys.get("description", "")
    bio = details.get("biography", "")
    
    if name == "Enxame de Ratos":
        # Mordidas Coletivas
        desc = re.sub(r'\[A\] Mordidas em Massa.*?(\<br\>|\<\/p\>|$)', r'[A] Mordidas Coletivas:** Teste de Físico + Conflito (DC 14). Sucesso: Evita. Falha: 1d6+1 Dano Perfurante.</p>', desc)
        bio = re.sub(r'\[A\] Mordidas em Massa.*?(\<br\>|\<\/p\>|$)', r'[A] Mordidas Coletivas:** Teste de Físico + Conflito (DC 14). Sucesso: Evita. Falha: 1d6+1 Dano Perfurante.</p>', bio)
        
    elif name == "Banshee":
        # Lamento
        desc = re.sub(r'Falha.*?Dano Psíquico\.', r'Falha: Sofre **8d6 de Dano Psíquico** e fica **Abalado** (-2) por 1 minuto. Sucesso: Metade do dano e sem condição.', desc)
        bio = re.sub(r'Falha.*?Dano Psíquico\.', r'Falha: Sofre **8d6 de Dano Psíquico** e fica **Abalado** (-2) por 1 minuto. Sucesso: Metade do dano e sem condição.', bio)
        
    elif name == "Lobo do Éter":
        desc = re.sub(r'a Defesa do alvo é calculada.*?CA física\.', r'o ataque ignora escudos e é feito contra a CA física tradicional, porém com **Vantagem**.', desc)
        bio = re.sub(r'a Defesa do alvo é calculada.*?CA física\.', r'o ataque ignora escudos e é feito contra a CA física tradicional, porém com **Vantagem**.', bio)
        
    elif name == "Carniçal Faminto" or name == "Carniçal Rastejante":
        desc = desc.replace("por 1 minuto", "por 1 rodada e Abalado por 1 minuto no sucesso")
        bio = bio.replace("por 1 minuto", "por 1 rodada e Abalado por 1 minuto no sucesso")

    elif name == "Pixie":
        desc = desc.replace("[A] Pó Mágico", "[AA] Pó Mágico")
        desc = re.sub(r'ou cai no \*\*Sono\*\*(.*?)\.', r'. Sucesso: Abalado (1R). Falha: Sono \1.', desc)
        
        bio = bio.replace("[A] Pó Mágico", "[AA] Pó Mágico")
        bio = re.sub(r'ou cai no \*\*Sono\*\*(.*?)\.', r'. Sucesso: Abalado (1R). Falha: Sono \1.', bio)

    sys["description"] = desc
    details["biography"] = bio
    return obj

process_file(paths["conditions"], update_conditions)
process_file(paths["spells"], update_spells)
process_file(paths["monsters"], update_monsters)

print("Processo concluído.")
