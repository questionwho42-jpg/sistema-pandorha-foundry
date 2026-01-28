---
description: Padrões de formatação e estrutura para capítulos e cenas
---

# 📝 Padrões de Escrita e Formatação

## Estrutura de Arquivos

- **Nomenclatura:** `00_Capitulo_Titulo.md` ou `NomePersonagem_Bio.md`.
- **Metadados:** Todo arquivo deve começar com um bloco de metadados YAML se for um rascunho.

## Integração de Mecânicas (PF2e Remaster)

> **Regra Mestra:** Consulte `.agent/rules/pf2e-narrative-adapter.md` antes de escrever cenas de ação.

- **Nunca use números no texto.** (Ex: Não diga "Ele tirou 18 no dado", diga "Ele acertou com precisão cirúrgica").
- **Respeite a Ficha:** Se o personagem tem INT +0, ele não pode deduzir pistas complexas instantaneamente (isso é trabalho para quem tem INT +4 ou Feat _That's Odd_).
- **Magia tem Custo:** Descreva o componente (Gesto/Voz) e o esgotamento (Spell Slot gasto).

## Estrutura de Cena

Cada cena deve ter um propósito claro (Avançar a Trama ou Revelar Personagem).

### Template de Capítulo

```markdown
# Capítulo X: [Título Provisório]

> **POV:** [Nome do Personagem]
> **Local:** [Localização, ex: Corvo-do-Poço]
> **Tempo:** [Dia/Hora/Clima]

[Corpo do texto...]

---

(Divisória de cena se necessário)
```

## Checklist de Qualidade (Pós-Escrita)

1. **Ganchos:** O capítulo termina com uma pergunta, revelação ou perigo?
2. **Conflito:** Existe tensão em cada cena? (Externa ou Interna).
3. **Diálogo:** Os personagens soam distintos? O diálogo tem subtexto?
4. **Descrição:** Os 5 sentidos foram invocados?
5. **Consistência Mecânica:** O personagem fez algo impossível para o nível dele?
