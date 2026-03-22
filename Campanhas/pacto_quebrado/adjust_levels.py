import os
import re

base_path = r"c:\Users\Pichau\Desktop\o mundo de pandorha - livro\Campanhas\pacto_quebrado"
npc_file = os.path.join(base_path, "npcs_pacto_quebrado.md")
bestiario_file = os.path.join(base_path, "bestiario_pacto_quebrado.md")

with open(npc_file, "r", encoding="utf-8") as f:
    npc_data = f.read()

# Mira Ferrosângue
npc_data = npc_data.replace("**Nível:** 5 | **ND:** 3 | **Tipo:** Humanoide (Humana)", "**Nível:** 2 | **ND:** 1 | **Tipo:** Humanoide (Humana)")
npc_data = npc_data.replace("| **HP**         | HP Base Classe + (Fís+Res)×5                |                35                 |", "| **HP**         | HP Base Classe + (Fís+Res)×5                |                20                 |")
npc_data = npc_data.replace("| **CA**         | 10 + Nível + Armadura + Fís (lim.) + Escudo | 19 (Couraça +4, Escudo +1, Fís 2) |", "| **CA**         | 10 + Nível + Armadura + Fís (lim.) + Escudo | 16 (Couraça leve +3, Escudo +1, Fís 2) |")
npc_data = npc_data.replace("| **EE**         | (Men+Res) + Nível + Classe                  |                 9                 |", "| **EE**         | (Men+Res) + Nível + Classe                  |                 6                 |")
npc_data = npc_data.replace("| **Iniciativa** | Nível + Mental + Interação                  |                +11                |", "| **Iniciativa** | Nível + Mental + Interação                  |                +8                 |")
npc_data = npc_data.replace("| **Percepção**  | Nível + Mental + Interação                  |          +11 (Treinada)           |", "| **Percepção**  | Nível + Mental + Interação                  |           +8 (Treinada)           |")
npc_data = npc_data.replace("- Diplomacia (Social + Interação): +11", "- Diplomacia (Social + Interação): +8")
npc_data = npc_data.replace("- Intimidação (Social + Conflito): +10", "- Intimidação (Social + Conflito): +7")
npc_data = npc_data.replace("- Engenharia Rúnica (Mental + Interação): +11", "- Engenharia Rúnica (Mental + Interação): +8")
npc_data = npc_data.replace("- Tática Militar (Mental + Conflito): +10", "- Tática Militar (Mental + Conflito): +7")
npc_data = npc_data.replace("- Atletismo (Físico + Conflito): +9", "- Atletismo (Físico + Conflito): +6")
npc_data = npc_data.replace("| **Espada Longa**        | [A] [Ataque] | Físico + Conflito + Nível = **+9** vs CA", "| **Espada Longa**        | [A] [Ataque] | Físico + Conflito + Nível = **+6** vs CA")
npc_data = npc_data.replace("| **Golpe de Escudo**     | [A] [Ataque] | Físico + Conflito + Nível = **+9** vs CA | 1d6+2 contusão", "| **Golpe de Escudo**     | [A] [Ataque] | Físico + Conflito + Nível = **+6** vs CA | 1d4+2 contusão")

# Thazza
npc_data = npc_data.replace("**Nível:** 5 | **ND:** 3 | **Tipo:** Humanoide (Orc)", "**Nível:** 3 | **ND:** 1 | **Tipo:** Humanoide (Orc)")
npc_data = npc_data.replace("| **HP**         | Base + (Fís+Res)×5          |            40             |", "| **HP**         | Base + (Fís+Res)×5          |            28             |")
npc_data = npc_data.replace("| **CA**         | 10 + Nível + Armadura + Fís | 21 (Placas orc +5, Fís 3) |", "| **CA**         | 10 + Nível + Armadura + Fís | 18 (Placas orc +4, Fís 3) |")
npc_data = npc_data.replace("| **Vigor**      | (Fís+Int) + Nível           |            11             |", "| **Vigor**      | (Fís+Int) + Nível           |             9             |")
npc_data = npc_data.replace("| **EE**         | (Men+Res) + Nível + Classe  |            10             |", "| **EE**         | (Men+Res) + Nível + Classe  |             8             |")
npc_data = npc_data.replace("| **Iniciativa** | Nível + Men + Int           |            +11            |", "| **Iniciativa** | Nível + Men + Int           |            +9             |")
npc_data = npc_data.replace("- Engenharia Rúnica (Mental + Interação): +11", "- Engenharia Rúnica (Mental + Interação): +9")
npc_data = npc_data.replace("- Arqueologia (Mental + Interação): +11", "- Arqueologia (Mental + Interação): +9")
npc_data = npc_data.replace("- Conhecimento: Ciclos Anteriores (Mental + Interação): +11", "- Conhecimento: Ciclos Anteriores (Mental + Interação): +9")
npc_data = npc_data.replace("| **Martelo de Guerra Orc** | [A] [Ataque]  | Físico + Conflito + Nível = **+10** vs CA", "| **Martelo de Guerra Orc** | [A] [Ataque]  | Físico + Conflito + Nível = **+8** vs CA")
npc_data = npc_data.replace("2d8+3 contusão", "2d6+3 contusão")
npc_data = npc_data.replace("| **Golpe Técnico**         | [AA] [Ataque] | +10 vs CA", "| **Golpe Técnico**         | [AA] [Ataque] | +8 vs CA")

# Harken
npc_data = npc_data.replace("**Nível:** 5 | **ND:** 3 | **Tipo:** Humanoide (Humano, Veterano)", "**Nível:** 2 | **ND:** 1 | **Tipo:** Humanoide (Humano, Veterano)")
npc_data = npc_data.replace("| **HP**         | Base + (Fís+Res)×5                   |                     45                      |", "| **HP**         | Base + (Fís+Res)×5                   |                     30                      |")
npc_data = npc_data.replace("| **CA**         | 10 + Nível + Armadura + Escudo + Fís | 22 (Armadura completa +5, Escudo +2, Fís 3) |", "| **CA**         | 10 + Nível + Armadura + Escudo + Fís | 18 (Cota de malha +4, Escudo +1, Fís 3) |")
npc_data = npc_data.replace("| **Vigor**      | (Fís+Int) + Nível                    |                      9                      |", "| **Vigor**      | (Fís+Int) + Nível                    |                      6                      |")
npc_data = npc_data.replace("| **Iniciativa** | Nível + Men + Int                    |                     +7                      |", "| **Iniciativa** | Nível + Men + Int                    |                     +4                      |")
npc_data = npc_data.replace("- Resistência Física (Físico + Resistência): +11", "- Resistência Física (Físico + Resistência): +8")
npc_data = npc_data.replace("- Conhecimento Militar (Mental + Conflito): +9", "- Conhecimento Militar (Mental + Conflito): +6")
npc_data = npc_data.replace("| **Lança da Legião**       | [A] [Ataque]  | Físico + Conflito + Nível = **+11** vs CA", "| **Lança da Legião**       | [A] [Ataque]  | Físico + Conflito + Nível = **+8** vs CA")
npc_data = npc_data.replace("| **Ataque de Lança Duplo** | [AA] [Ataque] | +11 (1°) / +6 (2°) vs CA", "| **Ataque de Lança Duplo** | [AA] [Ataque] | +8 (1°) / +3 (2°) vs CA")
npc_data = npc_data.replace("| **Investida de Lança**    | [AA] [Ataque] | +11 vs CA (após mover 6m)", "| **Investida de Lança**    | [AA] [Ataque] | +8 vs CA (após mover 6m)")

# Veros
npc_data = npc_data.replace("| **HP**         | Base + (Fís+Res)×5 + Veterano        |                    35                     |", "| **HP**         | Base + (Fís+Res)×5 + Veterano        |                    28                     |")
npc_data = npc_data.replace("| **CA**         | 10 + Nível + Armadura + Escudo + Fís | 19 (Armadura Legião +4, Escudo +1, Fís 2) |", "| **CA**         | 10 + Nível + Armadura + Escudo + Fís | 17 (Armadura Legião +3, Escudo +1, Fís 2) |")
npc_data = npc_data.replace("| **Espada Longa da Legião** |  [A] [Ataque]  | Físico + Conflito + Nível = **+6** vs CA", "| **Espada Longa da Legião** |  [A] [Ataque]  | Físico + Conflito + Nível = **+5** vs CA")
npc_data = npc_data.replace("| **Ataque Duplo**           | [AA] [Ataque]  | +6 (1°) / +1 (2°) vs CA", "| **Ataque Duplo**           | [AA] [Ataque]  | +5 (1°) / +0 (2°) vs CA")
npc_data = npc_data.replace("| **Investida de Capitão**   | [AAA] [Ataque] | Físico + Conflito + Nível = **+6** vs CA (após mover 9m)", "| **Investida de Capitão**   | [AAA] [Ataque] | Físico + Conflito + Nível = **+5** vs CA (após mover 9m)")
npc_data = npc_data.replace("| **Desarmar**               |  [A] [Ataque]  | Físico + Conflito + Nível = **+6** vs CA", "| **Desarmar**               |  [A] [Ataque]  | Físico + Conflito + Nível = **+5** vs CA")

with open(npc_file, "w", encoding="utf-8") as f:
    f.write(npc_data)

with open(bestiario_file, "r", encoding="utf-8") as f:
    bestiario_data = f.read()

bestiario_data = bestiario_data.replace("- **ND:** 1 | **HP:** 12 | **CA:** 13 (Pele endurecida + focinheira)", "- **ND:** 1/4 | **HP:** 8 | **CA:** 12 (Pele endurecida + focinheira)")
bestiario_data = bestiario_data.replace("| **Mordida** | [A] | Físico + Conflito (+4) vs CA | 1d6+2 perfurante |", "| **Mordida** | [A] | Físico + Conflito (+3) vs CA | 1d4+1 perfurante |")
bestiario_data = bestiario_data.replace("| **Investida** | [A] | Físico + Conflito (+4) vs CA | 1d4+2", "| **Investida** | [A] | Físico + Conflito (+3) vs CA | 1d4+1")

bestiario_data = bestiario_data.replace("- **ND:** 3 | **HP:** 35 | **CA:** 15 (Carapaça de ferro natural)", "- **ND:** 1 | **HP:** 22 | **CA:** 14 (Carapaça de ferro natural)")
bestiario_data = bestiario_data.replace("| **Mandíbula Esmagadora** | [A] | Físico + Conflito (+4) vs CA | 1d10+3 perfurante |", "| **Mandíbula Esmagadora** | [A] | Físico + Conflito (+4) vs CA | 1d8+2 perfurante |")
bestiario_data = bestiario_data.replace("| **Carga Pesada** | [AAA] | Físico + Conflito (+4) vs CA | 2d8+3 contusão.", "| **Carga Pesada** | [AAA] | Físico + Conflito (+4) vs CA | 2d6+2 contusão.")

bestiario_data = bestiario_data.replace("- **ND:** 1 | **HP:** 18 | **CA:** 14 (Cota de malha leve)", "- **ND:** 1/2 | **HP:** 12 | **CA:** 13 (Cota de malha mod.)")
bestiario_data = bestiario_data.replace("| **Espada curta** | [A] | Físico + Conflito (+4) vs CA | 1d6+2 cortante |", "| **Espada curta** | [A] | Físico + Conflito (+3) vs CA | 1d6+1 cortante |")
bestiario_data = bestiario_data.replace("| **Besta leve** | [A] | Mental + Conflito (+4) vs CA | 1d8+2 perfurante", "| **Besta leve** | [A] | Mental + Conflito (+3) vs CA | 1d6+1 perfurante")

bestiario_data = bestiario_data.replace("- **ND:** 2 | **HP:** 22 | **CA:** 13 (Couro + agilidade)", "- **ND:** 1/2 | **HP:** 11 | **CA:** 12 (Couro + agilidade)")
bestiario_data = bestiario_data.replace("| **Adaga envenenada** | [A] | Físico + Conflito (+5) vs CA | 1d4+3 perfurante", "| **Adaga envenenada** | [A] | Físico + Conflito (+4) vs CA | 1d4+1 perfurante")
bestiario_data = bestiario_data.replace("| **Pó nos olhos** | [A] | Mental + Conflito (+3) vs CA |", "| **Pó nos olhos** | [A] | Mental + Conflito (+2) vs CA |")
bestiario_data = bestiario_data.replace("| **Ataque furtivo** | [A] | Físico + Conflito (+5) vs CA | 2d6+3", "| **Ataque furtivo** | [A] | Físico + Conflito (+4) vs CA | 1d6+1")

with open(bestiario_file, "w", encoding="utf-8") as f:
    f.write(bestiario_data)
print("Balanceamento finalizado.")
