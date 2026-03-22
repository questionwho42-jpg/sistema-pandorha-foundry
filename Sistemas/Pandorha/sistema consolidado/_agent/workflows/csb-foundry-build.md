---
description: Fluxo Operacional de Construção e Gestão do Sistema Pandorha (CSB Foundry)
---

# CSB Foundry Build Workflow

Este workflow define as operações padrão para o desenvolvimento e manutenção do sistema Pandorha usando o Custom System Builder.

## 1. Gatilhos de Início
- **Comando Central**: `/pandorha-build` - Abre o menu principal de arquitetura.
- **Atalhos Rápidos**:
  - `/pdh-criar-ficha`: Inicia o Wizard de Novo Ator.
  - `/pdh-deploy`: Executa o pipeline de build e bundle.
  - `/pdh-backup`: Realiza o Snapshot de Segurança.
- **Mentoria Proativa**: A IA monitora rascunhos de lore ou mecânicas e sugere a transformação em componentes.

## 2. Fluxo de Criação de Atores (Wizard em Camadas)
1. **Conceito**: Definição de nome, tipo e biografia.
2. **Atributos**: Configuração de chaves e bônus base.
3. **Mecânicas Secundárias**: Defesas, vida e recursos derivados.
4. **Design Visual**: Estilização CSS e escolha de ícones.
5. **Aprovação**: Prova de conceito antes da escrita final do JSON.

## 3. Pipeline de Deploy e Qualidade
- **Build & Check**: Executa `vite build` e valida integridade de JSON/CSS.
- **Auditoria de Integridade**: Verifica fórmulas, caminhos de ativos e chaves i18n faltantes.
- **Rollback de Segurança**: Em caso de falha de migração, restaura snapshots automaticamente.
- **Changelog Automático**: Gera resumo de atualizações para usuários finais no `CHANGELOG.md`.

## 4. Gestão de Conteúdo e Inteligência
- **Sincronizador de Ativos**: Organização, renomeação e otimização automática na pasta `assets/`.
- **Bulk Creation**: Processamento inteligente de listas de itens (Magias/Talentos) com tabela de revisão.
- **Análise de Balanço**: Simulação proativa de poder e alertas de inconsistências mecânicas.
- **Importação Híbrida**: O Agente atua como analista de regras ao ler PDFs ou documentos de sistema.

## 5. Operação Técnica e Manutenção
- **Git Feature Flow**: Isolamento de tarefas em branches `feat/` com merge controlado.
- **Debug Híbrido**: Resolução assistida de erros com sandbox preventivo e mentoria técnica.
- **Wiki em Tempo Real**: Atualização automática do `MAPA_DO_SISTEMA.md` e `SYSTEM_HANDBOOK.md`.
- **Consultor de Update**: Relatório de impacto antes de atualizações do Foundry/CSB.

## 6. Rito de Entrega (Release)
1. Execução do Checklist SOLID.
2. Build de produção final.
3. Tagging de versão no Git.
4. Geração do "Certificado de Entrega" com resumo técnico e narrativo.
