
import os
import re

ROOT_DIR = r"c:\Users\Pichau\Desktop\jogo\mundo\missoes"
OUTPUT_FILE = r"c:\Users\Pichau\Desktop\o mundo de pandorha - livro\entity_dump.txt"

# Regex patterns to catch entities even if formatting varies
patterns = {
    "NPC": [
        r"NPC Doador.*?:?\s*\**([A-Za-zÀ-ÖØ-öø-ÿ\s]+)",  # Matches "NPC Doador: Name"
        r"NPC:?\s*\**([A-Za-zÀ-ÖØ-öø-ÿ\s]+)",             # Matches "NPC: Name"
        r"Doador:?\s*\**([A-Za-zÀ-ÖØ-öø-ÿ\s]+)",          # Matches "Doador: Name"
        r"- \*\*Nome:\*\*\s*(.*)",                        # Matches "- **Nome:** Name"
        r"##\s*([A-Z][a-z]+ [A-Z][a-z]+.*)\(NPC\)"        # Matches "## Name (NPC)"
    ],
    "THREAT": [
        r"Ameaça.*?:?\s*\**([A-Za-zÀ-ÖØ-öø-ÿ\s]+)",       # Matches "Ameaça: Name"
        r"Boss:?\s*\**([A-Za-zÀ-ÖØ-öø-ÿ\s]+)",            # Matches "Boss: Name"
        r"Inimigo Principal:?\s*\**([A-Za-zÀ-ÖØ-öø-ÿ\s]+)",
        r"##\s*([A-Z][a-z]+.*?)\(Creature",               # Matches "## Name (Creature...)"
        r"##\s*([A-Z][a-z]+.*?)\(Boss",                   # Matches "## Name (Boss...)"
        r"##\s*Tocha da Chama.*",                         # Ignore items
        r"##\s*Pergaminho.*"                              # Ignore items
    ]
}

def extract_from_file(filepath):
    entities = {"NPC": [], "THREAT": []}
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.readlines()
            
        for line in content:
            line = line.strip()
            # NPC Scan
            for pat in patterns["NPC"]:
                match = re.search(pat, line, re.IGNORECASE)
                if match:
                    name = match.group(1).strip("* ").strip()
                    if len(name) > 3 and "Recompensa" not in name and "Conteúdo" not in name:
                        entities["NPC"].append(name)
                        break
            
            # Threat Scan
            for pat in patterns["THREAT"]:
                match = re.search(pat, line, re.IGNORECASE)
                if match:
                    name = match.group(1).strip("* ").strip()
                    if len(name) > 3 and "Recompensa" not in name:
                        entities["THREAT"].append(name)
                        break
                        
    except Exception as e:
        return None

    return entities if (entities["NPC"] or entities["THREAT"]) else None

def main():
    results = {}
    
    for root, dirs, files in os.walk(ROOT_DIR):
        for file in files:
            if file.endswith(".md"):
                path = os.path.join(root, file)
                extracted = extract_from_file(path)
                if extracted:
                    # Store by relative path for context
                    rel_path = os.path.relpath(path, ROOT_DIR)
                    results[rel_path] = extracted

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        for fname, data in sorted(results.items()):
            f.write(f"\nFILE: {fname}\n")
            if data["NPC"]:
                f.write(f"  NPCs: {', '.join(data['NPC'])}\n")
            if data["THREAT"]:
                f.write(f"  THREATS: {', '.join(data['THREAT'])}\n")
                
    print(f"Extraction complete. Found entities in {len(results)} files.")

if __name__ == "__main__":
    main()
