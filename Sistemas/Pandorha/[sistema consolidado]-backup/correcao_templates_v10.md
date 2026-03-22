# Refatoração Supremo - v10 (Fórmulas e UX Avançada)

## Correções Críticas
- **Erro de Renderização**: Identificado que o CSB exige `${}$` em variáveis `hidden` para que elas sejam tratadas como fórmulas e não como texto. Corrigido.
- **Exibição Dinâmica**: Agora os labels mostram o RESULTADO numérico (ex: `/ 40`) em vez da fórmula bruta.

## Novidades Visuais e Funcionais
- **Barras de Vida (Meters)**: Adicionei barras de progresso visuais para HP (Vermelho), PV (Verde) e EE (Azul). Elas se ajustam automaticamente ao valor máximo calculado.
- **Layout Compacto**: Atributos e Aplicações agora estão lado a lado, reduzindo a necessidade de rolagem.
- **Grid de Combate**: A seção inferior agora agrupa Defesa, Iniciativa e Movimento de forma clara e elegante.

## Teste Recomendado
1. Delete o ator antigo para evitar sobreposição de dados orfãos.
2. Importe o `pandorha_templates_bundle.json` v10.
3. Altere o valor de **FÍSICO** para 3 e **RESISTÊNCIA** para 2.
4. O **HP Máximo** deve atualizar instantaneamente para **35** (10 + 5*5).
5. A barra vermelha do Meter HP deve refletir o valor atual em relação a esse novo máximo.

**A arquitetura agora está sólida. O Arquiteto entregou a chave do reino.**
