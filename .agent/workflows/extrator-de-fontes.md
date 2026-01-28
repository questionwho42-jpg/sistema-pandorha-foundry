---
description: Lê pastas de arquivos brutos e distribui informações de lore para as pastas corretas do projeto.
---

# 📥 Extrator de Fontes (The Ingestor)

Workflow para digestão de material bruto de worldbuilding.

1.  **Carregar Inteligência**
    - Ler Skill: `view_file .agent/skills/sistematizador-de-lore.md`
    - Ler Padrões: `view_file .agent/rules/writing-standards.md`

2.  **Definição de Origem e Destino**
    - Pergunte ao usuário: "Qual o caminho da pasta com os arquivos originais?"
    - Pergunte ao usuário: "Qual a pasta raiz do destino no projeto?" (Default: `o mundo de pandorha - livro`)
    - Identifique o **Nome da Origem** (ex: se o caminho for `C:/Docs/RPG2020`, o nome é `RPG2020`).

3.  **Varredura (The Deep Dive)**
    - Liste todos os arquivos da pasta de origem (recursivamente).
    - **Para cada arquivo encontrado:**
      - Leia o conteúdo (`read_url_content` ou `view_file`).
      - **INVOQUE O SISTEMATIZADOR:**
        - "Analise este texto. Qual a categoria dele? (Personagem, Reino, Música, Ficha, etc)."
        - **Inteligência de Caminho:**
          - Verifique se no destino já existem pastas padrão para essa categoria (ex: `01_Personagens` para Personagem).
          - Se existir: `[Destino]/[PastaPadrao]/[NomeDaOrigem]/[Nome].md`
          - Se não existir: `[Destino]/[Categoria] - [NomeDaOrigem]/[Nome].md`
      - Apresente o plano para este arquivo: "Detectei '[Nome]' do tipo '[Tipo]'. Vou mover para '[CaminhoCalculado]'. Confirma?"

4.  **Consolidação**
    - Após confirmação (ou se em modo // turbo parcial), escreva o arquivo formatado no destino.
    - Se o arquivo bruto conter múltiplas coisas (ex: um doc com 10 NPCs), separe-os em 10 arquivos diferentes.

5.  **Relatório Final**
    - Liste o que foi importado e para onde.
    - Liste itens ambíguos que precisaram de atenção.
