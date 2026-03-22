---
name: Gerador de Mapas de Batalha para Foundry VTT
description: Regras e padrões para gerar backgrounds imersivos e exportar JSON compatível com o sistema Scene do Foundry VTT.
---

# Skill: Gerador de Mapas de Batalha (Foundry VTT)

Esta skill capacita a IA a compreender, estruturar e gerar conteúdos para mapas de batalha baseados no sistema _Foundry Virtual Tabletop_, integrando recursos avançados de geração de imagens do Nano Banana e dados do lore de _Pandorha_.

## 1. Regras Gerais de Geração

- **Tipo de Mapa:** Suporte híbrido a mapas táticos (combate/dungeons) e mapas de exploração (outdoor/vastos).
- **Estilo Visual:** O usuário pode requerer _Fotorrealista_, _Cartoon/Fantasia_ ou _Dark Fantasy_. A iluminação, ambiente e estilo devem respeitar essa escolha.
- **Integração de Lore:** Modo duplo (_Genérico_ vs _Pandorha_). Se ativado o modo Pandorha, o contexto visual usará as especificações e o clima descrito nos documentos de _Cenarios_ e _Campanhas_.
- **Grid:** O padrão exigido no Foundry é **Square** (Quadrilátero).
- **Resolução:** Adaptável pelo usuário na chamada do comando, podendo variar desde versões limpas e otimizadas (~2K) para exploração, até resoluções monstruosas e ricas (~4K) para táticos.
- **Saída:** Pasta organizada contendo o `background.png` (ou jpeg/webp), um arquivo `scene.json` e o formulário `README.md` (Guia completo + ficha técnica). Tudo deve ser exportado no diretório da campanha.

## 2. Estrutura do Arquivo `scene.json` (Foundry VTT Schema)

O JSON exportado deve seguir as diretrizes do `Scene` do Foundry. Elementos-chave que a skill precisará preencher e gerar automaticamente (via IA e cálculos) ou definir os padrões:

- **`name`**: Nome da cena (ex: "Taverna do Javali Dourado").
- **`background`**: Caminho relativo para a imagem gerada (ex: `"background.png"`).
- **`width` / `height`**: Dimensões totais correspondentes à resolução pedida.
- **`grid`**: `{ "type": 1, "size": 140 }` (Square, 140px por padrão, variando conforme resolução pedida).
- **`padding`**: Opcional, sugerido `0`.
- **`environment` & `weather`**: Configurações em presets nominais ("Dia Claro", "Noite Estrelada", "Tempestade", "Sombrio/Subterrâneo"). Ajusta luz global (0 ou 1) de acordo. Efeitos climáticos variam conforme o preset.
- **`fog` & `tokenVision`**: Indoor (Dungeon, Caverna) -> Névoa/Fog = true, Visão = true. Outdoor -> Névoa = false, Visão opcional (conforme luz).
- **`walls`**: O uso de polígonos/linhas baseado no **Template de Layout**. Deve suportar também portas (C: normal `1`, secreta `2`, trancadas com DC `ds: 2`).
- **`lights`**: Perfis atrelados ao template e atmosfera. Fontes de luz pontuais de atmosfera (tochas, lareiras).
- **`sounds`**: `AmbientSound` apenas como _placeholders_ (posicionados logicamente mas sem fonte de arquivo) para que o mestre adicione música local.
- **`notes`**: Anotações detalhadas pelo mapa contendo DC de Portas trancadas, descrições de áreas de interesse ou perigos de armadilhas.
- **`regions`**: `Region` embutidas indicando pontuações de interesse visualmente com cores e nomes sem código em scripts (apenas highlights).
- **`tiles`**: NÃO utilizar tiles separadamente; dependemos do visual da imagem base.

## 3. Biblioteca de Templates (14 Padrões)

Os layouts padronizados instruem o mapeamento geográfico do prompt da imagem, aspect ratio e cálculo geométrico predefinido:

### Dungeons (Indoor)

1. **Sala Retangular Simples** (AS: 1:1 ou 3:2)
2. **Sala com Pilares** (AS: 1:1)
3. **Corredor Reto** (AS: 3:1)
4. **Corredor em L** (AS: 1:1 ou Custom)
5. **Corredor em T** (AS: Custom)
6. **Sala Circular/Arena** (AS: 1:1)
7. **Sala com Fosso** (AS: 1:1)
8. **Plataforma Elevada** (AS: 1:1)
9. **Salão do Trono** (AS: 3:2 ou 4:3)
10. **Câmara do Tesouro** (AS: 1:1)

### Exterior (Outdoor)

11. **Clareira na Floresta** (AS: 3:2)
12. **Acampamento** (AS: 3:2)
13. **Ponte sobre Rio/Fosso** (AS: 3:2)
14. **Ruínas Abertas** (AS: 1:1)

### Especiais

15. **Taverna** (Interior com divisórias - AS: 3:2)
16. **Navio Convés** (AS: 1:3 vertical)
17. **Torre** (AS: 1:1 - Múltiplos Andares)
18. **Caverna Natural** (Paredes Irregulares/Orgânicas - AS: 3:2)
    _(Nota: São referenciados os 14 escolhidos + adições de bônus pelas sugestões táticas)_

## 4. Geração de Imagem com Nano Banana

- **Modelos:** Automático por complexidade.
  - Mapas simples -> `gemini-3.1-flash-image-preview`
  - Mapas complexos (Taverna, Torre, Navio) -> `gemini-3-pro-image-preview`
- **Thinking Level Adaptável:** `minimal` na revisão e esboço iterativo; `high` nas saídas de resolução final e render terminal.
- **Google Search Grounding:** Somente se a escolha for estilo **Fotorrealista**. Nos demais (Dark Fantasy, Cartoon), a busca deve estar inativa.
- **Imagens de Referência:** Salvar e utilizar uma biblioteca progressiva por campanha. Exemplo: Para um 2º mapa na campanha "Pacto Quebrado", usar automaticamente até 14 referências visuais daquela mesma campanha (imagens anteriores aprovadas) caso haja compatibilidade de bioma/tema.
- **Aprimoramento do Prompt:** Transformar inputs básicos em prompts artísticos avançados no background. Adicione menções de texturização PBR, Isometric/Top-Down (Top-down battle map RPG), ambientação, aspect ratio na engenharia do comando.

## 5. Diretórios & Histórico

- Todos os mapas vão para: `mapas-foundry/[nome-campanha]/[nome-mapa]/`
- Versionamento e backups no diretório da cena em uma sub-pasta `_historico/`.
- `preferencias.json` dentro da pasta de campanha para resgatar configurações-padrão daquela lore.

## 6. Fluxo Iterativo da Skill

A IA que realizar estas criações atua sobre interatividade ou one-shot baseado na flexibilidade do mestre. Em caso de edição, a image editing deve acatar `Multi-turn` ou Regeneração Total, perguntando "Modifique X e preserve Y?". Falhas de geração (Policy) tem Auto-Retry com downscale de termos críticos em até 3 tentativas.

---

**Instrução à IA para Execução Prática:** Ao assumir esta tag, estude o YAML e leia as recomendações. Seu dever principal é montar o arquivo JSON validado e as geometrias matemáticas para Scene a partir das propriedades pré-definidas em conjunto da API de imagem Nano Banana.
