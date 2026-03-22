# Refatoração Premium Concluída - v9 (Decorator Pattern)

## O que foi corrigido?
Identifiquei que a versão anterior não exibia as abas porque a estrutura interna do CSB exige um `type: "tab"` dentro de um `tabbedPanel`. Além disso, a separação entre lógica e visual foi reforçada usando o padrão **Decorator**.

### 1. Arquitetura de Dados (Hidden)
Todos os cálculos foram movidos para uma seção `hidden`. Isso garante que:
- A lógica de cálculos esteja centralizada.
- A interface (UI) apenas "decore" e exiba esses valores.
- **Fórmulas**: HP Máx, PV Máx, EE Máx, CA, Iniciativa e Movimento agora são processados em segundo plano.

### 2. Interface Decorator (Premium Design)
- **Abas Funcionais**: Agora divididas em **ESSÊNCIA**, **HABILIDADES** e **ARSENAL**.
- **CSS Avançado**: O arquivo `css/style.css` agora aplica bordas douradas, gradientes de fundo e sombras para criar a profundidade necessária para um cenário Dark Fantasy.
- **Grids e Tabelas**: Eixos e Aplicações agora estão organizados em tabelas limpas para evitar que a ficha fique excessivamente longa.

### 3. Melhorias de UX
- Adicionados containers para **Manobras** e **Habilidades de Eixo**.
- O inventário está pronto para receber itens customizados.

## Instruções de Importação (Crítico)
1.  **Limpeza**: Apague personagens antigos se necessário para evitar conflitos de dados.
2.  **Import**: Importe o arquivo `pandorha_templates_bundle.json`.
3.  **Seleção**: Ao abrir a ficha, certifique-se de que o template selecionado é o **Template Ator Pandorha**.
4.  **Recarga**: Caso as cores não apareçam, pressione `F5` ou limpe o cache do CSS no Foundry.

**O sistema agora reflete fielmente o Arquiteto por trás do Mundo de Pandorha.**
