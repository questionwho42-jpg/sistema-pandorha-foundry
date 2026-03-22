import json
import os
import re

paths = {
    "conditions": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\conditions.db",
    "spells": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\spells.db",
    "monsters": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\bestiary.db",
    "maneuvers": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\maneuvers.db",
    "ancestries": r"c:\Users\Pichau\Desktop\pandorha foundry\packs\ancestries.db"
}

def process_file(path, process_func):
    if not os.path.exists(path):
        print(f"Skipping {path} (not found)")
        return
    updated_lines = []
    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            try:
                obj = json.loads(line)
                obj = process_func(obj)
                updated_lines.append(json.dumps(obj, ensure_ascii=False) + "\n")
            except Exception as e:
                updated_lines.append(line)
                
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(updated_lines)
    print(f"Updated {path}")

# 1. Condições
def update_conditions(obj):
    name = obj.get("name", "")
    sys = obj.get("system", {})
    if name == "Aterrorizado":
        sys["description"] = "<p>Foge com todas as ações. -2 em testes.</p><p>Remoção: Teste Global de [Mental + Resistência] no Fim do Turno.</p>"
    elif name == "Exposto":
        sys["description"] = "<p>-1 CA. Se sofrer ataque de arma de Impacto ou Pesada, sofre Vulnerabilidade 2.</p><p>Remoção: Ao sair de Flanco ou fim da habilidade.</p>"
    return obj

# 2. Magias
def update_spells(obj):
    name = obj.get("name", "")
    sys = obj.get("system", {})
    if name == "Raio de Gelo":
        sys["damage"] = "1d4"
        sys["description"] = sys.get("description", "").replace("1d8 de dano", "1d4 de dano")
    elif name == "Seta Etérica":
        sys["description"] = sys.get("description", "") + "<p><strong>Uso:</strong> Uma vez por Turno.</p>"
    elif name == "Sono":
        sys["duration"] = "1 minuto (Ver efeito)"
        sys["description"] = "<p>Teste de <strong>Resistência Mental</strong>.</p><ul><li><strong>Sucesso Crítico:</strong> Ignora.</li><li><strong>Sucesso:</strong> Lento e Abalado (1R).</li><li><strong>Falha:</strong> Inconsciente (1 min).</li><li><strong>Falha Crítica:</strong> Sono Profundo (1 hora).</li></ul>"
    return obj

# 3. Manobras (Ameaça Gélida)
def update_maneuvers(obj):
    name = obj.get("name", "")
    sys = obj.get("system", {})
    if "Ameaça Gélida" in name:
        sys["activation"] = {"cost": "3 Ações [AAA]", "type": ""}
        sys["description"] = "<p><strong>Sucesso:</strong> Aterrorizado (1R). O alvo não pode realizar Reações [R].</p><p><strong>Crítico:</strong> Aterrorizado (1R) + Desarmar + Foge.</p><p><strong>Falha Parcial:</strong> Abalado (-2 / 1R).</p>"
    return obj

# 4. Ancestralidades (Drakari e Humano)
def update_ancestries(obj):
    name = obj.get("name", "")
    sys = obj.get("system", {})
    desc = sys.get("description", "")
    if name == "Drakari":
        desc = desc.replace("Sopro Elemental): [AA]", "Sopro Elemental): [AA]")
        desc = desc.replace("Dano: **1d8**", "Dano: **1d8** (2d8 no Nv 5, 3d8 no Nv 10)")
        desc = desc.replace("ou cairá com a condição 'Caído'", "empurra 1,5m. Crítico: Teste de Resistência ou Caído")
    elif name == "Humano":
        desc = desc.replace("escolhe o melhor resultado.", "um número de vezes igual ao seu Eixo Social por Descanso Longo.")
    sys["description"] = desc
    return obj

# 5. Bestiário (Já feito parcialmente, mas reforçando)
def update_monsters(obj):
    name = obj.get("name", "")
    sys = obj.get("system", {})
    desc = sys.get("description", "")
    if name == "Enxame de Ratos":
        desc = desc.replace("2d6 Perfurante", "1d6+1 (Teste de Físico+Conflito DC 14)")
    elif name == "Banshee":
        desc = desc.replace("Cai imediatamente a **0 HP**", "Sofre **8d6 de Dano Psíquico** e fica **Abalado**")
    sys["description"] = desc
    return obj

process_file(paths["conditions"], update_conditions)
process_file(paths["spells"], update_spells)
process_file(paths["maneuvers"], update_maneuvers)
process_file(paths["ancestries"], update_ancestries)
process_file(paths["monsters"], update_monsters)

print("Sincronização Final Concluída.")
