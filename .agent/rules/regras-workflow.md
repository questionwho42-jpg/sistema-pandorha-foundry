---
description: Regras obrigatórias para a criação de arquivos de workflow (.md)
---

# 📜 Regras de Engenharia de Workflows

Todo novo workflow criado deve seguir estritamente estas diretrizes para garantir compatibilidade com o Agente.

## 1. Estrutura do Arquivo

- **Frontmatter YAML (Obrigatório):**
  O arquivo **DEVE** começar com um bloco YAML contendo a descrição.

  ```yaml
  ---
  description: [Descrição curta e ativa, ex: "Como fazer deploy em staging"]
  ---
  ```

- **Passos Numerados:**
  Os passos devem ser uma lista numerada ou tópicos claros.

## 2. Comandos e Ferramentas

- **Caminhos Absolutos:** Sempre instrua o uso de caminhos absolutos ou relativos à raiz do workspace conhecidos.
- **Interatividade:**
  - Se o passo requer input do usuário, especifique: "Pergunte ao usuário..."
  - Se o passo é automático, use a notação Turbo.

## 3. Turbo Mode (Automação)

Para passos que usam `run_command` e são seguros (não deletam dados irrecuperáveis), use a anotação `// turbo` na linha imediatamente anterior ao passo.

```markdown
// turbo 3. Criar a pasta de logs
```

Para marcar o workflow inteiro como seguro para execução automática de comandos, use `// turbo-all` em qualquer lugar do arquivo (preferencialmente no topo).

## 4. Contexto e Skills

- **Sempre carregar contexto:** O primeiro passo deve ser quase sempre `view_file` em arquivos de regras ou documentação relevantes para aquela tarefa específica.
- **Referência a Skills:** Se o workflow requer uma habilidade complexa (ex: escrever um capítulo de livro), instrua explicitamente o agente a ler a skill correspondente em `.agent/skills/`.

## 5. Exemplo de Template

```markdown
---
description: Exemplo de workflow
---

# Título do Workflow

1. Ler regras de projeto em `.agent/rules/meu-projeto.md`.

// turbo 2. Criar diretório de saída.

3. Perguntar ao usuário qual o tema.

4. Gerar o arquivo final.
```
