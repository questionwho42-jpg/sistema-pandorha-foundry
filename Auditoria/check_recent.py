import os
import datetime

path = r"c:\Users\Pichau\Desktop\o mundo de pandorha - livro\Sistemas\Pandorha\sistema consolidado"
files = [f for f in os.listdir(path) if f.endswith(".md")]
files.sort(key=lambda x: os.path.getmtime(os.path.join(path, x)), reverse=True)

out = r"c:\Users\Pichau\Desktop\o mundo de pandorha - livro\Auditoria\recent_files.txt"
with open(out, 'w', encoding='utf-8') as f_out:
    for f in files[:20]:
        mtime = os.path.getmtime(os.path.join(path, f))
        dt = datetime.datetime.fromtimestamp(mtime).strftime('%Y-%m-%d %H:%M:%S')
        f_out.write(f"{dt} - {f}\n")
