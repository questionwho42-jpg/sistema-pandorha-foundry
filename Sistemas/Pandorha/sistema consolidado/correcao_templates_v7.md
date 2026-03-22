# Correção de Templates e Componentes - v7

## Estado Atual
O arquivo `pandorha_templates_bundle.json` foi refatorado para atender às exigências rigorosas do Custom System Builder (CSB) e do Foundry VTT.

### Principais Ajustes:
1.  **Tipo de Template de Item:** Alterado de `_template` para `_equippableItemTemplate`. O Foundry não aceitava `_template` para a classe `Item`, o que causava o erro de `DataModelValidationError`.
2.  **Propriedades Obrigatórias:** Adicionadas propriedades como `visibilityFormula`, `tooltip`, `role`, `permission`, `cssClass`, `align` e `flow` em **todos** os componentes. A ausência de algumas destas propriedades causava a falha do método `setDefaultValue` no motor do CSB.
3.  **Novos Templates:**
    *   **Manobra:** Template básico para habilidades ativas.
    *   **Habilidade de Eixo:** Template com seleção de Eixo Base e Nível (1-5).
    *   **Aplicação:** Template para bônus específicos baseados em Eixos.
4.  **IDs Manuais:** Foram removidos para permitir que o Foundry gere IDs válidos automaticamente, evitando erros de validação de 16 caracteres.

## Próximos Passos
1.  **Limpeza:** No Foundry, apague qualquer Ator ou Item que tenha sido criado nas tentativas falhas anteriores.
2.  **Importação:** Use a função de **Import** do CSB e selecione o arquivo `pandorha_templates_bundle.json`.
3.  **Teste de Ator:** Crie um novo ator usando o template importado.
4.  **Teste de Item:** Crie uma nova Habilidade ou Manobra usando os novos templates.

**Está pronto?**
