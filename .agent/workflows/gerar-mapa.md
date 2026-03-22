---
description: Gera um mapa de batalha para o Foundry VTT usando a IA para imagem base e JSON estrutural
---

# Workflow: `/gerar-mapa`

Este workflow utiliza o Nano Banana para elaboração artística e cria a configuração `.json` necessária para importar como uma _Scene_ perfeita no Foundry VTT v13+. O fluxo possui **6 Etapas**.

## Pré-Requisitos e Protocolo Inicial

1. Certifique-se de que a biblioteca da skill correspondente (gerador-mapas-foundry) esteja interpretada no escopo;
2. Se o usuário digitar `/gerar-mapa` de imediato (sem parâmetros extras), siga estritamente do **Passo 1** a seguir. Se ele fornecer `/gerar-mapa [descrição, campanha, template]`, deduza as respostas iniciais (_Híbrido/Automático_) e pergunte apenas o que carece de configuração;
3. Fique atento a palavras-chave relacionáveis ao sistema nativo: "Morden", "Dungard", "Almar". Ative a detecção com: _"Detectei Morden. Devo ativar o modo Pandorha para esse mapa? (S/N)"_.
4. Consulte sempre a preferência em `mapas-foundry/[Campanha]/preferencias.json`.

---

## Passo 1: Contexto e Formulário Estruturado

Faça a captação das informações de contexto. Pergunte _numa única mensagem estruturada_ se o usuário ainda não tiver delineado seus desejos (mas oculte dados inferidos):

- **O que precisa detalhar?** (ex: Templo de Ossos Vermelhos)
- **A qual Campanha este mapa pertence?** (ex: Pacto Quebrado)
- **Qual a Resolução desejada?** (Normal 2K, Alta 4K)
- **Qual o Estilo Visual Principal?** (Fotorrealista, Dark-Fantasy, Cartoon)
  _(Aguarde o usuário confirmar os detalhes para seguir)_

---

## Passo 2: Sugestão de Template e Resumo Compacto

1. Pela descrição dada, sugira **3 opções de Template** da biblioteca de "14 padrões" do Foundry (ex: Sugestões Baseadas: 1º Câmara do Tesouro, 2º Área Externa de Ruínas, 3º Corredor Em L).
2. Forneça o **Resumo Compacto** do setup até aqui:
   `[Tipo: Selecionado | Estilo: Selecionado | Template sugerido: X | Campanha: Selecionada]`
3. Aguarde o aceite ou a troca do Template pelo usuário. O aceite sinaliza o pulo para frente.

---

## Passo 3: Geração da Imagem de Fundo (Preview de Ajuste)

1. Antes disso, avalie os termos e passe a descrição do usuário pelo _Aprimoramento Automático_ para moldar um prompt técnico e artístico de RPG Battle Map (Top-down, Aspect Ratio compatível com template).
   - _Lembrete_: Nano Banana Pro para (Tavernas, Navios, Cidades); Flash para os mais simples. Grounding On apenas no _Fotorrealista_. Thinking _Minimal_ para este ensaio se possível na API (ou avise internamente).
2. Leia a pasta da campanha em busca de referências antigas em PNG (`mapas-foundry/Campanha/`) para forçar seed/coerência de imagem.
3. Chame a geração e apresente a versão rascunho.
   _(Pause e aguarde avaliação na Etapa 4)_

---

## Passo 4: Aprovação ou Regeneração

1. Obtenha aprovação do mestre sobre o visual na ferramenta.
2. Pergunte: _"A imagem base do ambiente está ok? Quer aceitar, iterar um detalhe (multi-turn), ou gerar do zero de novo?"_
3. _Fallback:_ Se houver erro de API no processo anterior, não avise ao usuário a não ser que tenha esgotado **3 tentativas de downscale/safety trigger**.

---

## Passo 5: Configuração de Cena (Automatizada com Overrides)

1. O usuário aprovando a obra do passo 4, proceda à etapa de _Settings da Scene_.
2. Apresente os cálculos e sugestões deOverrides do JSON. Ex:
   > "Sua imagem possui dimensões de NX e MY. Usaremos grid quadrado."
   > "Padrão de Template para _Câmara Secréta_ é aplicar: Névoa Indoor [ON], Portas Normais e Secretas (1 de cada), Ambiente Subterrâneo Escuro com Iluminação local. Deseja re-escrever algo disso ou posso forjar?"
3. A IA configura logicamente `lights`, `walls`, posicionamento de placeholders textuais (`notes`) e sombreado de regiões indicativas baseando-se no aspecto visual de relevo do PNG.

---

## Passo 6: Revisão Final, README e Finalização

Esta etapa realiza a estruturação das pastas no projeto.

1. Salve as coisas localmente via node/fs nos devidos espaços, com nomenclaturas padronizadas em `mapas-foundry/[campanha]/[descrição_suja]/`.
2. Inclua o `background.png`, monte a string pura para `scene.json` que encapsula o JSON do VTT.
3. Gere o arquivo `README.md` junto da pasta (conforme regimentos da Skill - Ficha Técnica Absoluta com DCs e guias explícitos). Use `_historico` para mover gerações antigas se esse arquivo substituir um pré-existente no mesmo path.
4. Escreva internamente/mostre ao usuário: _"✅ Mapa exportado e JSON fabricado com Overrides VTT 13!"_ e exiba a imagem de Review uma última vez e com a pergunta contínua:
   _"Gostaria de fabricar o próximo mapa desta mesma listagem ou alterar para uma nova demanda?"_
