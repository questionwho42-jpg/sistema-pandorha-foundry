---
description: Regras técnicas e estruturais para o projeto do Livro Dark Fantasy.
---

# 📜 Regras do Projeto: O Mundo de Pandorha

Estas regras garantem a integridade estrutural e técnica do livro. Elas têm precedência sobre preferências estéticas.

## 1. Estrutura do Arquivo Física

- **Diretório de Capítulos:** Todos os arquivos de texto (.md) devem residir em `02_Capitulos/` (ou `Ato_X/02_Capitulos`).
- **Nomenclatura:** `Capitulo_XX_Nome_Descritivo.md`. Use zero à esquerda (01, 02...).
- **Backups:** Antes de _qualquer_ reescrita total, copie o arquivo atual para `_backups/Capitulo_XX_TIMESTAMP.md`.

## 2. Metas de Escrita

- **Extensão:** Alvo de ~30.000 caracteres (com espaços) por capítulo.
  - _Tolerância:_ Mínimo 25k, Máximo 35k.
- **Divisão:** O livro terá aproximadamente 20 capítulos por Ato.

## 3. Formatação Markdown

- **Títulos:**
  - `# Título do Capítulo` (H1 apenas uma vez no topo).
  - `## Cena / Local` (H2 para mudança de cena).
  - `***` (Separador para quebras de tempo/perspectiva).
- **Diálogos:** Use travessão (`—`) ou aspas, mas mantenha consistência total no arquivo. (Preferência: Travessão).
- **Ênfase:**
  - _Itálico_ para pensamentos ou sussurros.
  - **Negrito** para ênfase divina ou gritos (uso moderado).

## 4. Gestão de Lore

- **Single Source of Truth:** Se o texto contradiz a pasta `01_Personagens` ou `03_Locais`, a Lore vence.
  - _Exceção:_ Se a contradição for uma evolução de personagem (Plot), atualize a Lore.
- **Indexador:** O arquivo `docs/master-index.md` deve conter um resumo de 1 parágrafo de cada capítulo finalizado.

## 5. Protocolo de Aprovação

- Nunca assuma que um capítulo está "Pronto". Sempre pergunte: "Posso salvar como finalizado e ir para o próximo?".
- Ao receber feedback negativo, nunca delete o texto anterior. Crie uma nova versão abaixo ou em outro arquivo até a aprovação.
