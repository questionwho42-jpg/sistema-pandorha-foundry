import json

path = r"c:\Users\Pichau\Desktop\pandorha foundry\packs\spells.db"
out_path = r"c:\Users\Pichau\Desktop\o mundo de pandorha - livro\Auditoria\list_spells.txt"

with open(out_path, 'w', encoding='utf-8') as out:
    try:
        with open(path, 'r', encoding='utf-8') as f:
            for line in f:
                try:
                    obj = json.loads(line)
                    out.write(f"{obj.get('name', 'UNKNOWN')}\n")
                except:
                    pass
    except Exception as e:
        out.write(f"Error: {e}\n")
