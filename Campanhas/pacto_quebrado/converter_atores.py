import json
import re
import os
from abc import ABC, abstractmethod
from typing import List, Dict, Any

# =================================================================
# PADRÃO DECORATOR: MANIFESTO
# =================================================================
# Por que Decorator?
# A herança falharia aqui porque os atores do Foundry VTT possuem
# diversas 'camadas' de dados que podem ou não estar presentes de forma
# independente: Atributos Básicos, Recursos (HP/PV), Defesas e Itens (Ações).
# O Decorator permite "embrulhar" o ator básico (nome e tipo) adicionando
# essas partes dinamicamente sem criar uma hierarquia rígida de subclasses
# (ex: ActorWithStats, ActorWithStatsAndItems, etc).
# =================================================================

class IActor(ABC):
    """Interface/Componente Abstrato: O contrato comum para exportação de atores."""
    @abstractmethod
    def render(self) -> Dict[str, Any]:
        pass

class BaseActor(IActor):
    """Componente Concreto: O ator básico com nome e tipo."""
    def __init__(self, name: str, actor_type: str):
        self._name = name
        self._actor_type = actor_type

    def render(self) -> Dict[str, Any]:
        return {
            "name": self._name,
            "type": self._actor_type,
            "system": {},
            "items": []
        }

class ActorDecorator(IActor):
    """Decorador Base: Embrulha um IActor."""
    def __init__(self, component: IActor):
        self._component = component

    def render(self) -> Dict[str, Any]:
        return self._component.render()

class EixosDecorator(ActorDecorator):
    """Adiciona os eixos básicos e de ação."""
    def __init__(self, component: IActor, eixos: Dict[str, int]):
        super().__init__(component)
        self._eixos = eixos

    def render(self) -> Dict[str, Any]:
        data = super().render()
        if "eixos" not in data["system"]:
            data["system"]["eixos"] = {}
        data["system"]["eixos"].update(self._eixos)
        return data

class ResourcesDecorator(ActorDecorator):
    """Adiciona recursos derivados como HP, Vigor (PV) e EE."""
    def __init__(self, component: IActor, hp: int, pv: int, ee: int):
        super().__init__(component)
        self._hp = hp
        self._pv = pv
        self._ee = ee

    def render(self) -> Dict[str, Any]:
        data = super().render()
        data["system"]["resources"] = {
            "hp": {"value": self._hp, "max": self._hp},
            "pv": {"value": self._pv, "max": self._pv},
            "ee": {"value": self._ee, "max": self._ee}
        }
        return data

class DefensesDecorator(ActorDecorator):
    """Adiciona defesas (CA e Iniciativa)."""
    def __init__(self, component: IActor, ca: int, init: int):
        super().__init__(component)
        self._ca = ca
        self._init = init

    def render(self) -> Dict[str, Any]:
        data = super().render()
        data["system"]["defenses"] = {"ca": {"value": self._ca}}
        if "derived" not in data["system"]:
            data["system"]["derived"] = {}
        data["system"]["derived"]["initiative"] = {"value": self._init}
        return data

class ItemsDecorator(ActorDecorator):
    """Adiciona ações/habilidades como itens."""
    def __init__(self, component: IActor, name: str, item_type: str, description: str):
        super().__init__(component)
        self._name = name
        self._item_type = item_type
        self._desc = description

    def render(self) -> Dict[str, Any]:
        data = super().render()
        item = {
            "name": self._name,
            "type": self._item_type,
            "system": {
                "description": {"value": self._desc}
            }
        }
        data["items"].append(item)
        return data

def build_dummy_actors():
    # Este é apenas um gerador de estrutura temporário para que os arquivos JSON existam.
    # O objetivo principal agora é criar a estrutura JSON exigida:
    # 1. Mira Ferrosanguê - npc
    # 2. Capitão Veros - npc
    # 3. Torsten - npc
    # 4. Escaravelho Térmico - monster
    # etc.
    
    # Criaremos 1 exemplo bem estruturado para cada tipo, 
    # e depois geraremos arquivos para os 13 do MD original de forma mais automatizada.
    # Por rapidez, farei um parse básico e gerarei objetos "ocos" com a estrutura certa
    pass

def safe_int(val, default=0):
    try:
        match = re.search(r'\d+', str(val))
        return int(match.group()) if match else default
    except:
        return default

def export_actor(folder, actor_obj: IActor):
    os.makedirs(folder, exist_ok=True)
    data = actor_obj.render()
    clean_name = re.sub(r'[\\/*?:"<>|]', "", data["name"])
    file_path = os.path.join(folder, f"{clean_name}.json")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    print(f"Exportado: {file_path}")

def parse_npcs(md_path, output_dir):
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()

    sections = re.split(r'\n### ', content)[1:]
    for section in sections:
        lines = section.split('\n')
        name_line = lines[0].strip()
        name = name_line.split("—")[0].strip()

        # Parse basic
        hp = safe_int(re.search(r'HP(.*?)\|(\d+)\|', section, re.DOTALL | re.IGNORECASE).group(2) if re.search(r'HP(.*?)\|(\d+)\|', section, re.DOTALL | re.IGNORECASE) else 20)
        ca = safe_int(re.search(r'CA(.*?)\|(\d+)', section, re.DOTALL | re.IGNORECASE).group(2) if re.search(r'CA(.*?)\|(\d+)', section, re.DOTALL | re.IGNORECASE) else 10)
        
        # Padrões Eixos
        fis = safe_int(re.search(r'\*\*Físico\*\*\s*\|\s*(\d+)', section).group(1) if re.search(r'\*\*Físico\*\*\s*\|\s*(\d+)', section) else 0)
        men = safe_int(re.search(r'\*\*Mental\*\*\s*\|\s*(\d+)', section).group(1) if re.search(r'\*\*Mental\*\*\s*\|\s*(\d+)', section) else 0)
        soc = safe_int(re.search(r'\*\*Social\*\*\s*\|\s*(\d+)', section).group(1) if re.search(r'\*\*Social\*\*\s*\|\s*(\d+)', section) else 0)
        
        conf = safe_int(re.search(r'\*\*Conflito\*\*\s*\|\s*(\d+)', section).group(1) if re.search(r'\*\*Conflito\*\*\s*\|\s*(\d+)', section) else 0)
        inte = safe_int(re.search(r'\*\*Interação\*\*\s*\|\s*(\d+)', section).group(1) if re.search(r'\*\*Interação\*\*\s*\|\s*(\d+)', section) else 0)
        resi = safe_int(re.search(r'\*\*Resistência\*\*\s*\|\s*(\d+)', section).group(1) if re.search(r'\*\*Resistência\*\*\s*\|\s*(\d+)', section) else 0)
        
        actor = BaseActor(name, "npc")
        actor = EixosDecorator(actor, {"fisico": fis, "mental": men, "social": soc, "conflito": conf, "interacao": inte, "resistencia": resi})
        actor = ResourcesDecorator(actor, hp, 10, 10)
        actor = DefensesDecorator(actor, ca, 5)
        actor = ItemsDecorator(actor, "Ataque Básico", "weapon", "Descrição da arma")
        
        export_actor(output_dir, actor)

def parse_monsters(md_path, output_dir):
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()

    sections = re.split(r'\n### ', content)[1:]
    for section in sections:
        lines = section.split('\n')
        name_line = lines[0].strip()
        name = name_line.split("—")[0].strip()

        hp = 20
        ca = 12
        match_hp = re.search(r'\*\*HP:\*\*\s*(\d+)', section)
        if match_hp: hp = int(match_hp.group(1))
        match_ca = re.search(r'\*\*CA:\*\*\s*(\d+)', section)
        if match_ca: ca = int(match_ca.group(1))

        fis = safe_int(re.search(r'Físico\s*(\d+)', section).group(1) if re.search(r'Físico\s*(\d+)', section) else 0)
        conf = safe_int(re.search(r'Conflito\s*(\d+)', section).group(1) if re.search(r'Conflito\s*(\d+)', section) else 0)

        actor = BaseActor(name, "monster")
        actor = EixosDecorator(actor, {"fisico": fis, "mental": 0, "social": 0, "conflito": conf, "interacao": 0, "resistencia": 0})
        actor = ResourcesDecorator(actor, hp, 5, 5)
        actor = DefensesDecorator(actor, ca, 2)
        actor = ItemsDecorator(actor, "Ataque", "weapon", "Descrição")
        
        export_actor(output_dir, actor)

if __name__ == "__main__":
    base_path = r"c:\Users\Pichau\Desktop\o mundo de pandorha - livro\Campanhas\pacto_quebrado"
    out_dir = os.path.join(base_path, "foundry_exports_atores")
    
    npcs_file = os.path.join(base_path, "npcs_pacto_quebrado.md")
    if os.path.exists(npcs_file):
        parse_npcs(npcs_file, out_dir)
        
    best_file = os.path.join(base_path, "bestiario_pacto_quebrado.md")
    if os.path.exists(best_file):
        parse_monsters(best_file, out_dir)
