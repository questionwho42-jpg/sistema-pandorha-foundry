import json

path = r"c:\Users\Pichau\Desktop\pandorha foundry\packs\maneuvers.db"
out = r"c:\Users\Pichau\Desktop\o mundo de pandorha - livro\Auditoria\maneuver.json"

res = {}
try:
    with open(path, 'r', encoding='utf-8') as f:
        for line in f:
            obj = json.loads(line)
            if "Ameaça Gélida" in obj.get("name", ""):
                res = obj
except Exception as e:
    res = {"error": str(e)}
    
with open(out, 'w', encoding='utf-8') as f:
    json.dump(res, f, indent=4, ensure_ascii=False)
