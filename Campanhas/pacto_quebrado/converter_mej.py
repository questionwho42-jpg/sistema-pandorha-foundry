import json
import re
import os
import random
import string
from abc import ABC, abstractmethod
from typing import List, Dict, Any


def generate_id():
    """Gera um ID alfanumérico de 16 caracteres compatível com o Foundry."""
    return "".join(random.choices(string.ascii_letters + string.digits, k=16))


# =================================================================
# PADRÃO DECORATOR: MANIFESTO
# =================================================================
# Por que Decorator?
# A herança falharia aqui porque poderíamos ter diários que são
# "Pessoas", "Lugares", "Missões", ao mesmo tempo que poderiam ter
# "Privacidade", "Bookmarks" ou "Tags". O Decorator permite
# "embrulhar" o conteúdo básico com essas funcionalidades extras
# sem criar uma explosão de subclasses.
# =================================================================


class JournalComponent(ABC):
    """Interface/Componente Abstrato: O contrato comum para todos os diários."""

    @abstractmethod
    def render(self) -> Dict[str, Any]:
        pass


class BaseJournalEntry(JournalComponent):
    """Componente Concreto: O objeto base de um Journal Entry do Foundry."""

    def __init__(self, name: str, content: str):
        self._name = name
        self._content = content

    def render(self) -> Dict[str, Any]:
        return {
            "name": self._name,
            "pages": [
                {
                    "name": self._name,
                    "type": "text",
                    "text": {"content": self._content, "format": 1},
                    "flags": {},
                    "system": {},
                    "title": {"show": True, "level": 1},
                    "sort": 0,
                }
            ],
            "flags": {},
            "system": {},
            "_stats": {"systemId": "pandorha", "coreVersion": "13.351"},
        }


class JournalDecorator(JournalComponent):
    """Decorador Base: Implementa a interface e recebe uma instância dela."""

    def __init__(self, component: JournalComponent):
        self._component = component

    def render(self) -> Dict[str, Any]:
        return self._component.render()


class MEJDecorator(JournalDecorator):
    """Decorador Concreto: Adiciona funcionalidades do Monk's Enhanced Journal (v13 compatible)."""

    def __init__(
        self,
        component: JournalComponent,
        mej_type: str,
        metadata: Dict[str, Any] = None,
    ):
        super().__init__(component)
        self._mej_type = mej_type
        self._metadata = metadata or {}

    def render(self) -> Dict[str, Any]:
        data = self._component.render()

        icons = {
            "person": "modules/monks-enhanced-journal/assets/person.png",
            "place": "modules/monks-enhanced-journal/assets/place.png",
            "quest": "modules/monks-enhanced-journal/assets/quest.png",
        }

        # Estrutura IDÊNTICA ao exemplo do usuário
        data["flags"]["monks-enhanced-journal"] = {
            "pagetype": self._mej_type,
            "img": icons.get(self._mej_type, icons["person"]),
        }

        if data["pages"]:
            data["pages"][0]["flags"]["monks-enhanced-journal"] = {
                "type": self._mej_type,
                **self._metadata,
            }

        return data


def md_table_to_html(md_text: str) -> str:
    """Converte tabelas simples de Markdown para HTML básico."""
    lines = md_text.strip().split("\n")
    if len(lines) < 2 or "|" not in lines[0]:
        return md_text

    html = '<table border="1" style="width: 100%; border-collapse: collapse;"><tbody>'
    for i, line in enumerate(lines):
        if "---" in line and i == 1:
            continue  # Pula a linha separadora
        cells = [c.strip() for c in line.split("|") if c.strip()]
        html += "<tr>"
        for cell in cells:
            tag = "th" if i == 0 else "td"
            html += f'<{tag} style="padding: 5px;">{cell}</{tag}>'
        html += "</tr>"
    html += "</tbody></table>"
    return html


def format_body(text: str) -> str:
    """Converte parágrafos e tabelas do MD para HTML."""
    # Primeiro, isola as tabelas
    parts = re.split(r"(\n\|.*?\|\n(?:\|.*?\|\n)+)", text, flags=re.DOTALL)
    processed_parts = []
    for part in parts:
        if part.strip().startswith("|"):
            processed_parts.append(md_table_to_html(part))
        else:
            processed_parts.append(part.replace("\n", "<br>"))
    return "".join(processed_parts)


# =================================================================
# LÓGICA DE PARSING (CONVERSÃO)
# =================================================================


class CampaignConverter:
    def __init__(self, base_path: str):
        self.base_path = base_path
        self.journal_entries = []

    def parse_npcs(self, file_path: str):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        sections = re.split(r"\n### ", content)
        for section in sections[1:]:
            lines = section.split("\n")
            name = lines[0].strip()
            raw_body = "\n".join(lines[1:])
            # Removido <h2> redundante pois a página já exibe o título no v13
            body = format_body(raw_body)

            metadata = {"attributes": {}}
            entry = MEJDecorator(BaseJournalEntry(name, body), "person", metadata)
            self.journal_entries.append(entry.render())

    def parse_places(self, file_path: str):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        sections = re.split(r"\n### ", content)
        for section in sections[1:]:
            lines = section.split("\n")
            name = lines[0].strip()
            raw_body = "\n".join(lines[1:])
            body = format_body(raw_body)

            entry = MEJDecorator(BaseJournalEntry(name, body), "place")
            self.journal_entries.append(entry.render())

    def parse_quests(self, file_path: str):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        sections = re.split(r"\n## Sidequest ", content)
        for section in sections[1:]:
            lines = section.split("\n")
            name = "Sidequest " + lines[0].strip()
            raw_body = "\n".join(lines[1:])
            body = format_body(raw_body)

            metadata = {"status": "active"}
            entry = MEJDecorator(BaseJournalEntry(name, body), "quest", metadata)
            self.journal_entries.append(entry.render())

    def export(self, output_dir: str):
        # Cria o diretório de saída se não existir
        os.makedirs(output_dir, exist_ok=True)

        for entry in self.journal_entries:
            # Pega o tipo do diário das flags (v13 usa pagetype)
            mej_type = entry["flags"]["monks-enhanced-journal"]["pagetype"]

            # Cria subpasta para o tipo (ex: Person, Place, Quest)
            type_dir = os.path.join(output_dir, mej_type.capitalize())
            os.makedirs(type_dir, exist_ok=True)

            # Limpa o nome para o sistema de arquivos
            clean_name = re.sub(r'[\\/*?:"<>|]', "", entry["name"])
            file_name = f"{clean_name}.json"
            file_path = os.path.join(type_dir, file_name)

            # Salva o arquivo individual
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(entry, f, indent=4, ensure_ascii=False)
            print(f"Gerado em {mej_type.capitalize()}: {file_name}")


if __name__ == "__main__":
    path = (
        r"c:\Users\Pichau\Desktop\o mundo de pandorha - livro\Campanhas\pacto_quebrado"
    )
    # Nova pasta organizada por tipo
    output_path = os.path.join(path, "importação_por_tipo_mej")
    converter = CampaignConverter(path)

    print("Processando NPCs...")
    converter.parse_npcs(os.path.join(path, "npcs_pacto_quebrado.md"))

    print("Processando Localidades...")
    converter.parse_places(os.path.join(path, "localidades_pacto_quebrado.md"))

    print("Processando Quests...")
    converter.parse_quests(os.path.join(path, "sidequests_pacto_quebrado.md"))

    print(f"\nExportando arquivos para: {output_path}")
    converter.export(output_path)
