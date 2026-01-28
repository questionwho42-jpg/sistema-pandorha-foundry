---
description: Wizard interativo de Worldbuilding. Gera Lore, Personagens e Locais através de entrevistas profundas e sugestões criativas.
---

# 🌍 Wizard de Worldbuilding (O Criador de Mundos)

Este workflow atua como um consultor criativo, guiando a criação de novos elementos para o universo de Pandorha.

1. **Carregar Contexto e Regras**
   - Ler estrutura atual: `list_dir .` e `list_dir ./01_Personagens` (ou diretórios equivalentes).
   - Ler regras de escrita: `view_file .agent/rules/novel-writing.md` (se existir).
   - O objetivo é entender o "tom" e a organização atual do projeto.

2. **O Menu da Criação**
   - Apresente ao usuário um **Menu Numerado com 15 Opções** de criação, cobrindo:
     1. Protagonista / Antagonista
     2. NPC (Coadjuvante)
     3. Nova Região / Reino
     4. Cidade / Vilarejo
     5. Masmorra / Local de Aventura
     6. Facção / Guilda
     7. Religião / Divindade
     8. Sistema Mágico / Feitiço Único
     9. Evento Histórico / Lenda
     10. Criatura / Monstro Único
     11. Item Mágico / Artefato
     12. Cultura / Tradição
     13. Tecnologia / Invenção
     14. Mistério / Segredo
     15. Cena / Momento Narrativo
   - Peça para o usuário escolher **UMA** opção para focar nesta sessão.

3. **Deep Dive (A Entrevista)**
   - Com base na escolha, inicie uma rodada de **10 Perguntas Estratégicas**.
   - **IMPORTANTE:** Para CADA pergunta, forneça **3 Sugestões Criativas** baseadas no que você já sabe sobre Pandorha (ex: conectar com Valerius, usar a Praga, citar uma região conhecida).
   - As perguntas devem cobrir: Aparência, Personalidade/Atmosfera, Segredos, Conflitos, Relações, Origem, Mecânica (se aplicável), etc.
   - Aguarde as respostas do usuário (ele pode responder em bloco ou uma a uma, adapte-se).

4. **Análise de Estrutura**
   - Com o conteúdo definido, analise a estrutura de pastas do projeto.
   - Proponha o **Caminho do Arquivo** ideal (ex: `02_Locais/Reinos/NovoReino.md` ou `01_Personagens/NPCs/NovoNPC.md`).
   - Se a pasta não existir, avise que ela será criada.

5. **Materialização (Criação do Arquivo)**
   - Escreva o arquivo .md final.
   - O arquivo deve ser rico, bem formatado (Markdown), com seções claras baseadas nas respostas da entrevista.
   - Inclua um frontmatter com metadados (tipo, tags, data de criação).

6. **Conclusão**
   - Mostre o caminho do arquivo criado.
   - Pergunte se o usuário deseja criar outro elemento (voltando ao passo 2) ou encerrar.
