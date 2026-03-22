# Refatoração Premium Concluída - v8

## O que Mudou?
A ficha foi completamente reconstruída para ser funcional, automática e visualmente alinhada ao cenário de Pandorha.

### 1. Sistema de Abas
- **Essência**: Foco em atributos (Eixos/Aplicações) e recursos vitais.
- **Habilidades**: Espaço dedicado para arrastar e soltar Manobras e Habilidades de Eixo.
- **Arsenal**: Inventário e gestão de moedas (Ouro/Prata).

### 2. Automação de Fórmulas
Agora a ficha calcula sozinha:
- **HP Máximo**: `10 + (Físico + Resistência) * 5`
- **PV Máximo (Vigor)**: `Físico + Interação + Nível`
- **EE Máximo (Energia)**: `Mental + Resistência + Nível`
- **CA (Defesa)**: `10 + Nível + Resistência`
- **Iniciativa**: `Mental + Interação`
- **Movimento**: `9 + Físico` metros.

### 3. Design Visual
- Criado o arquivo `css/style.css` com cores Dark (Dourado, Sangue, Sépia).
- Campos de nome com fonte estilizada.
- Grid organizado para Eixos e Aplicações.

## Instruções de Teste
1.  **Limpeza**: Apague os atores de teste antigos.
2.  **Importação**: Importe o novo `pandorha_templates_bundle.json`.
3.  **Novo Ator**: Crie um personagem, suba o nível para 1 e veja os atributos derivarem automaticamente.
4.  **Estilo**: Se o visual não mudar imediatamente, certifique-se de que o sistema está carregando o `css/style.css` (geralmente automático ao recarregar o mundo).

**Está pronto?**
