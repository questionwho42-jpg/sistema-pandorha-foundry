# Refatoração Supremo - v11 (Fix de Editabilidade e Layout Rígido)

## O que foi corrigido?
- **Eixos e Aplicações Esmagados**: Na versão anterior, o uso de layouts flexíveis (painéis horizontais) sem larguras fixas fez com que os atributos fossem "esmagados" lateralmente, tornando impossível clicar neles para editar.
- **Solução de Engenharia**: Substituí os painéis de atributos por uma **tabela de 4 colunas**. No CSB, tabelas são estruturas rígidas que protegem o tamanho dos seus filhos. Agora cada atributo tem seu espaço garantido.

## Melhorias de UX
- **Campos de Entrada Amplos**: Os campos de número (`fisico`, `mental`, etc.) agora têm um tamanho mínimo de 60px de largura e 35px de altura, garantindo que o clique do mouse sempre acerte o alvo.
- **Feedback Visual**: Ao clicar em um campo para editar, ele agora recebe uma borda dourada brilhante e fundo preto, sinalizando claramente o foco da edição.
- **Sintaxe de Fórmulas Mantida**: As correções da v10 (cálculos de HP, Defesa, etc.) continuam funcionando plenamente.

## Como Aplicar
1. Importe o `pandorha_templates_bundle.json` v11.
2. Os atributos agora devem aparecer em um grid claro e espaçoso.
3. Clique nos boxes ao lado de **FÍSICO**, **MENTAL**, etc., e insira os novos valores.

**O Arquiteto ajustou as ferramentas. Os Eixos de Pandorha agora obedecem à sua vontade.**
