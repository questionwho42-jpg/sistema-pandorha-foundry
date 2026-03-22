# Regras de Engenharia e Padrões de Qualidade (Pandorha CSB)

Este documento estabelece as leis técnicas obrigatórias para o desenvolvimento do sistema Pandorha no Custom System Builder (CSB) para Foundry VTT.

## 1. Organização e Limites de Código
- **Regra dos 500**: Nenhum arquivo (JSON, JS ou CSS) deve exceder 500 linhas. Componentes complexos devem ser modularizados.
- **Kebab-Case Semântico**: Arquivos e pastas devem usar letras minúsculas separadas por traços (ex: `actor-aventureiro.json`).
- **Composição (SOLID)**: Priorizar composição via Mixins em vez de herança estrutural rígida para garantir flexibilidade e SRP (Responsabilidade Única).

## 2. Segurança e Gestão de Dados
- **Backup Duplo**: Antes de qualquer edição, realizar Backup Incremental (pasta backup com timestamp) e Commit Git local.
- **Namespace Único (`pdh-`)**: Todos os IDs internos, campos e chaves de tradução devem usar o prefixo `pdh-` para evitar conflitos.
- **Migração Ativa**: Novas versões do sistema devem incluir scripts de migração automática para atualizar fichas de versões anteriores sem perda de dados.

## 3. Padrões de Nomenclatura e Dados
- **CamelCase Hierárquico**: Keys do CSB devem usar o padrão `prefixo.Subgrupo.NomeDoCampo` (ex: `stats.Atributos.Forca`).
- **Tabela de Dependências**: Mixins devem declarar suas dependências de dados em um cabeçalho técnico, mantendo uma fonte única de verdade para cálculos em cascata.
- **Reatividade Granular**: Utilizar o sistema de `props` do CSB para garantir que apenas os dados necessários sejam processados por cada componente.

## 4. UI, Estilização e Acessibilidade
- **Design System**: Estilos devem ser baseados em Variáveis CSS (`:root`). Valores hexadecimais ou pixels fixos são proibidos nos componentes.
- **Responsividade (Grid Flexível)**: Layouts devem usar CSS Grid/Flexbox e serem funcionais na resolução mínima de 1024x768.
- **Acessibilidade WCAG 2.1**: Manter contraste mínimo de 4.5:1 e fontes legíveis (mínimo 14px para blocos de texto).
- **i18n Total**: É proibido o uso de texto puro nos templates. Todos os rótulos devem usar chaves de tradução (ex: `pdh.Label.Forca`).
- **Gestão de Ativos**: Imagens e ícones devem ser referenciados via caminhos relativos em `assets/`, com validação de existência obrigatória pela IA.

## 5. Lógica e Scripts
- **Scripts Puros**: Lógica em JavaScript deve ser isenta de efeitos colaterais. Proibida manipulação direta de DOM ou do core do Foundry fora das APIs do CSB.

## 6. Documentação e Auditoria
- **Cabeçalhos de Metadados**: Todo arquivo deve conter Nome, Versão e Propósito no topo.
- **Mapa do Sistema**: Manter `docs/MAPA_DO_SISTEMA.md` atualizado com as conexões entre arquivos.
- **Registro de Decisões (ADRs)**: Mudanças arquiteturais críticas devem ser documentadas em `docs/adr/` e referenciadas no código.
- **Protocolo de Validação Final**: Grandes entregas exigem um Checklist SOLID e um Exemplo de Uso Real (prova de conceito) para aprovação.
