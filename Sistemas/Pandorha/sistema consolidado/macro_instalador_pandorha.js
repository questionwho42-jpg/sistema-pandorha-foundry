/**
 * MACRO: INSTALADOR DE CONTEÚDO PANDORHA (v1.4 - O SELETOR INTERATIVO)
 * 
 * Sincroniza os itens com o Livro de Regras e ativa o Seletor Automático.
 * Instruções: Execute esta macro UMA VEZ para atualizar seu banco de itens e ativar o modal.
 */

(async () => {
    // --- 1. CONFIGURAÇÕES E DADOS ---
    const ANCESTRIES_DATA = {
        "Humanos": {
            descricao: "Os Humanos de Pandorha são definidos pela sua tenacidade sob pressão. Como habitantes de Morden, o Bastião da Tempestade, eles aprenderam que a sobrevivência não é um direito, mas um cálculo constante. Em um mundo de mutações descontroladas, eles são os mestres do aço, da estratégia e da 'Pureza Técnica'.",
            lore: "Nascidos sob o Domo de Mara, os humanos construíram uma civilização vertical de metal e oração. Para eles, o Éter é uma ferramenta de defesa, e a economia de 'Peso em Aço' dita quem respira e quem é reciclado. Eles veem a si mesmos como a última bússola moral de um mundo que esqueceu a forma original da vida.",
            aparencia: "Frequentemente usam trajes com reforços metálicos e dispositivos de respiração rúnica. Suas peles costumam ser palidificadas pela vida sob o domo, e muitos possuem tatuagens de 'Selos de Pureza' na nuca ou pulsos.",
            capNome: "Mente Inquieta",
            capDescr: "Sua mente absorve conhecimento rapidamente. Você ganha +1 Talento Geral adicional no Nível 1 e pode escolher +1 Aplicação extra (Interação, Conflito ou Resistência) para aumentar em +1.",
            bonusOptions: ["Físico", "Mental", "Social", "Interação", "Conflito", "Resistência"],
            extraOptions: ["Interação", "Conflito", "Resistência"],
            traits: [
                { n: "Diligência Erudita", d: "Ganha +2 em qualquer Teste Global cuja soma de bônus fixos (Nível + Eixo + Aplicação) já seja 10 ou superior." },
                { n: "Língua de Prata", d: "Pode ganhar vantagem (2d20, escolhe o melhor) em Social + Interação + Nível um número de vezes = Eixo Social por Descanso Longo." },
                { n: "Vontade Indomável [R]", d: "Quando HP chega a 0 pela 1ª vez na cena, gasta Reação para estabilizar automaticamente sem rolar dados." },
                { n: "Maestria Improvisada", d: "Ignora a penalidade de -4 por usar ferramentas ou armas que não possua treinamento (Nível 0)." },
                { n: "Memória de Mercador", d: "+2 em Testes Globais de Mental + Interação + Nível para lembrar fatos históricos ou identificar o valor real de itens." },
                { n: "Imunidade Adaptativa", d: "Imune a Doenças Comuns e +2 de Resistência contra Toxinas Mágicas." },
                { n: "Sorte do Novato", d: "1x por sessão, pode rolar novamente um teste de Social + Interação que tenha resultado em Falha Crítica." },
                { n: "Artífice de Ferro", d: "Tempo necessário para construir, consertar ou modificar itens mundanos é reduzido pela metade." },
                { n: "Foco Cooperativo", d: "Aliados em raio de 1,5m ganham +1 de bônus em testes de Resistência Mental." },
                { n: "Pensamento Estratégico [A]", d: "Gaste 1 [A] para observar um inimigo. Próximo ataque contra ele ganha +2 de bônus no dado." }
            ]
        },
        "Elfos": {
            descricao: "Seres de vida longa e conexão profunda com o Éter, os Elfos veem o mundo em ciclos de séculos, não anos. Eles são elegantes, distantes e possuem uma compreensão natural da magia que beira o instinto.",
            lore: "Habitam Cinar, a Floresta das Estrelas Caídas, um reino protegido por muralhas de árvores-escudo e governado pelas Sete Torres Sentinelas. Para um elfo, o Éter não é um combustível, mas o 'fio' de uma tapeçaria sagrada tecida pelo Tecelão Invisível. Eles carregam o Nó de Seda de Névoa, um amuleto físico que representa sua história e honra.",
            aparencia: "Altos, esguios e vestindo túnicas de seda viva que reagem à luz. Seus olhos brilham levemente com a cor das estelas das Torres (azul, dourado ou prata) e suas orelhas pontiagudas vibram sutilmente na presença de magia forte.",
            capNome: "Sentido Etérico",
            capDescr: "Elfos percebem a presença de magia em um raio de 9m (Passiva). Não precisam rolar para saber que há um item ou magia ativa (DC da Fonte).",
            bonusOptions: ["Mental", "Interação"],
            traits: [
                { n: "Visão Estelar", d: "Ignora penalidades de baixa luminosidade (Penumbra), enxergando perfeitamente onde outros veriam apenas sombras." },
                { n: "Passo de Folha", d: "Não sofre penalidade de movimento em terrenos difíceis de origem natural (florestas densas, neve)." },
                { n: "Memória Arcaica", d: "+2 em Testes Globais de Mental + Interação + Nível que envolvam eventos de mais de 500 anos atrás." },
                { n: "Agilidade Élfica", d: "Velocidade base aumenta em 1,5m (total 10,5m)." },
                { n: "Mente de Cristal", d: "Barreiras mentais naturais. +2 de Resistência contra a condição 'Confuso'." },
                { n: "Arquearia Tradicional", d: "Alcance de qualquer arma de distância (Arco, Besta) aumenta em 6 metros." },
                { n: "Transe Profundo", d: "Não dorme. Transe de 4 horas fornece todos os benefícios de um Descanso Longo de 8 horas." },
                { n: "Domínio Animal [A]", d: "Pode tentar comandar criatura natural de nível inferior usando Social + Interação + Nível. Sucesso: animal obedece ordem simples." },
                { n: "Reflexos Célere", d: "Percepção do tempo acelerada. +1 permanente em Iniciativa." },
                { n: "Ressonância Elemental", d: "Escolha um elemento (Fogo, Gelo ou Raio). RD 2 contra esse tipo de dano mágico." }
            ]
        },
        "Anões": {
            descricao: "Os Anões são a personificação da resiliência. Enquanto as outras raças olham para as estrelas em busca de éter, os anões olham para baixo, para as veias da terra. Eles são os mestres indiscutíveis da metalurgia e da engenharia pesada de Pandorha.",
            lore: "Habitam as 'Cidades de Raiz', metrópoles escavadas profundamente sob as cordilheiras do mundo. Eles acreditam que o Éter mais puro é o cristalizado, chamando-o de 'Sangue da Rocha'.",
            aparencia: "Baixos e robustos, com densidade muscular superior a qualquer raça. Seus cabelos e barbas costumam ser trançados com anéis de metal que indicam seu status social e profissão.",
            capNome: "Peso Pétreo",
            capDescr: "Devido à sua densidade, Anões são imunes a efeitos de 'Empurrão' de criaturas ou magias cujo Nível seja menor ou igual ao seu valor de Físico (Resistência).",
            bonusOptions: ["Físico", "Resistência"],
            traits: [
                { n: "Fôlego da Profundeza", d: "Pulmões adaptados ao ar rarefeito e tóxico das minas. Segura o fôlego 3x mais que o normal." },
                { n: "Sentido de Minério", d: "Sente metais preciosos ou pedras raras a 18m através de pedra sólida. Teste de Mental + Profissão (DC 15) para tipo exato." },
                { n: "Inimizade Ancestral", d: "Treinado contra ameaças subterrâneas. +2 no dano contra criaturas das Famílias Orc ou Goblin." },
                { n: "Couraça Biológica", d: "Pele dura como couro tratado. +2 de Resistência contra Venenos e Doenças naturais." },
                { n: "Estreito de Armadura", d: "Sabe usar o peso ao seu favor. Penalidade de velocidade de armaduras pesadas reduzida em 1,5m." },
                { n: "Bússola Interna", d: "Sentido de orientação magnético. Subterrâneo: sempre sabe o Norte e nunca se perde (Sucesso Automático)." },
                { n: "Ruptura de Rocha", d: "Margem de Crítico em Físico + Conflito + Nível reduzida em 1 (Crit 19-20 no dado)." },
                { n: "Mule do Abismo", d: "Condicionado a carregar peso. +2 Slots extras em inventário de carga pesada." },
                { n: "Barganha Mercantil", d: "+1 em Testes Globais de Social + Interação + Nível para barganhar preços." },
                { n: "Vontade de Rocha", d: "Mente sólida. +4 de bônus contra qualquer magia que tente controlar suas ações." }
            ]
        },
        "Drakari": {
            descricao: "Os Drakari não são apenas guerreiros; eles são os proprietários de Pandorha. Habitantes do Geodo de Draskar, eles vivem em um 'Mercado Totalitário' onde a honra é medida em solvência e a existência é uma dívida a ser paga aos deuses do metal.",
            lore: "Originários da Espiral do Geodo, os Drakari veem o mundo como uma grande transação. Eles dominam o Ouro Vivo (Auro-Éter), um metal que corre em suas veias e substitui a carne frágil por poder duradouro. Para um Drakari, ser pobre é a maior heresia, e o acúmulo de riqueza é o único caminho para a divindade.",
            aparencia: "Cobertos por escamas metálicas que variam do bronze fosco dos 'Opacos' ao ouro resplandecente da elite. Muitos possuem membros ou órgãos substituídos por engenhos rúnicos de Julian, emitindo um brilho etérico constante.",
            capNome: "Sopro Elemental [AA]",
            capDescr: "Você pode exalar um cone de 4,5m de energia elemental (Fogo, Gelo ou Raio). Dano: 1d8 (2d8 Nv5, 3d8 Nv10, 4d8 Nv15). 1x por Cena de combate.",
            bonusOptions: ["Físico", "Conflito"],
            extraOptions: ["Fogo", "Gelo", "Raio"],
            traits: [
                { n: "Escamas de Guerra", d: "Pele é armadura natural. Sem armadura, CA = 11 + Nível + Físico + Resistência." },
                { n: "Rugido Aterrorizante [A]", d: "1 [A] para rugido. Inimigos em 3m: Mental + Resistência + Nível (DC 10+Nível+Social+Conflito) ou 'Abalado'." },
                { n: "Honra de Sangue", d: "Determinação inquebrável. +2 de Resistência contra a condição 'Medo'." },
                { n: "Coração de Dragão", d: "Vitalidade superior. +1 PV (HP) extra para cada nível global." },
                { n: "Garras Letais", d: "Ataques desarmados: 1d6 (1d8 Nv5, 1d10 Nv10) + Físico (Conflito). Considerados armas leves." },
                { n: "Herança de Cor", d: "RD 5 contra o elemento correspondente ao seu sopro." },
                { n: "Carga Traumática [A]", d: "Move 3m + Ataque: empurra 1,5m. Crítico: alvo rola Físico + Resistência + Nível ou 'Caído'." },
                { n: "Visão Térmica", d: "Detecta calor de seres vivos. Ignora invisibilidade e camuflagem em raio de 15m." },
                { n: "Misticismo Inato", d: "Nasce com Centelha Etérica. Escolha 1 magia de 1º Círculo. Lança 1x/dia sem gastar EE." },
                { n: "Golpe de Cauda [R]", d: "Quando inimigo tenta fugir, gasta Reação para atacar com cauda (1d4 + Físico)." }
            ]
        },
        "Umbrais": {
            descricao: "Os Umbrais são seres cercados de mistério, cujas origens remontam ao 'Vazio Entre as Estrelas'. Eles não possuem uma pátria física, vivendo nas periferias das sociedades ou em comunidades nômades que se movem sob o manto da noite.",
            lore: "Acredita-se que os Umbrais foram poeira estelar que ganhou consciência através da exposição direta ao Éter bruto. Eles veem o mundo material como uma ilusão passageira.",
            aparencia: "Pálidos, quase translúcidos, com olhos negros sem pupilas que parecem absorver a luz ao redor. Suas vozes soam como sussurros duplos, o que pode ser inquietante para outras raças.",
            capNome: "Corpo de Éter",
            capDescr: "Umbrais podem atravessar frestas de até 10cm sem sofrer penalidades de movimento ou carga, desde que não estejam carregando itens de tamanho Grande.",
            bonusOptions: ["Social", "Interação"],
            traits: [
                { n: "Visão do Vazio", d: "Enxerga perfeitamente na escuridão total, mesmo se de origem mágica." },
                { n: "Passo Silencioso", d: "Leveza sobrenatural. +2 em qualquer Teste Global de Físico + Interação + Nível voltado para Furtividade." },
                { n: "Toque de Geada", d: "Ataques desarmados podem usar Matriz Mental em vez da Física para o bônus de dano." },
                { n: "Aura de Inquietude", d: "Criaturas mundanas de nível inferior evitam contato visual e se afastam instintivamente." },
                { n: "Névoa de Proteção", d: "RD 1 contra qualquer ataque físico não-mágico." },
                { n: "Desvanecer [AA]", d: "1x por cena, torna-se invisível por 1 Rodada (Duração: Instante)." },
                { n: "Elo Telepático", d: "Transmite pensamentos para qualquer criatura em 15m, desde que compartilhem idioma." },
                { n: "Resistência à Luz", d: "+2 de Resistência contra efeitos mágicos baseados em Luz ou Cegueira." },
                { n: "Salto de Sombra [R]", d: "Ao ser alvo de ataque, gasta Reação para teletransportar 1,5m para área de sombra próxima." },
                { n: "Memória Genética", d: "1x por descanso longo, pode usar habilidade com Nível 0 como se tivesse Nível 1." }
            ]
        },
        "Feras": {
            descricao: "As Feras são o resultado da fusão entre a natureza selvagem e o Poder Etérico. Elas são diversas, variando de felinos humanoides a seres lupinos, todos unidos por um instinto aguçado e uma conexão visceral com o ciclo da vida e morte.",
            lore: "Protetoras das 'Selvas Primal', as Feras veem o Éter como a 'Grande Matilha'. Elas não usam a magia; elas a caçam e a incorporam em seus próprios corpos físicos.",
            aparencia: "Possuem traços animais proeminentes (caudas, garras, orelhas sensíveis) e corpos atléticos desenhados para a predação e sobrevivência em ambientes extremos.",
            capNome: "Faro Aguçado",
            capDescr: "Detecta odores em raio de 18m. Rastreio de inimigos feridos recebe +5 em Testes Globais de Mental + Interação + Nível.",
            bonusOptions: ["Físico", "Interação"],
            traits: [
                { n: "Tática de Matilha", d: "+2 de bônus no dano sempre que houver um aliado adjacente ao mesmo inimigo." },
                { n: "Impulso Selvagem", d: "Velocidade base de movimento aumenta em 3 metros (total de 12m)." },
                { n: "Resiliência Primal", d: "Corpo adaptado ao consumo selvagem. Imune a doenças por carne podre ou águas contaminadas." },
                { n: "Predador Vertical", d: "Testes de Salto [A] como parte do Movimento, sem custo de ação extra." },
                { n: "Sangue de Fera", d: "Ataques com garras/dentes aplicam 'Sangrando' (1d4/turno) em Sucesso Crítico." },
                { n: "Couraça de Pelagem", d: "Pele e pelos grossos: +1 permanente na Defesa (CA)." },
                { n: "Instinto de Sobrevivência", d: "Impossível de ser pego desprevenido. Imune a 'Surpreendido' no 1º turno de combate." },
                { n: "Mestre do Terreno", d: "Ignora penalidade de movimento por vegetação densa, pântanos ou pedregulhos naturais." },
                { n: "Rugido de Comando", d: "Social + Interação + Nível para comunicar e dar ordens simples a animais selvagens (Sucesso Automático para Nível 1)." },
                { n: "Ira de Pandorha", d: "Abaixo de 50% HP: +2 em todos os Testes Globais de Físico + Conflito + Nível." }
            ]
        }
    };

    // --- 2. LÓGICA DO SELETOR (MODAL) ---
    async function openAncestrySelector(actor, item) {
        const race = item.name.replace(" (PRO)", "").trim();
        const data = ANCESTRIES_DATA[race];
        if (!data) return;

        // Limpar flag de configurado para permitir reconfiguração se necessário
        let html = `<form id="pandorha-selector">
            <p>Escolha as opções para sua ancestralidade: <b>${race}</b></p>
            <hr>
            <h3>1. Escolha seu Bônus Inicial</h3>
            <div class="form-group" style="display:flex; flex-wrap: wrap; gap: 10px;">
                ${data.bonusOptions.map(opt => `
                    <label><input type="radio" name="bonus" value="${opt}" required> +1 ${opt}</label>
                `).join("")}
            </div>`;

        // Lógica Especial Humana
        if (race === "Humanos") {
            html += `<h3>2. Mente Inquieta (Extra)</h3>
            <p>Escolha a aplicação extra para receber +1:</p>
            <div class="form-group" style="display:flex; gap: 10px;">
                ${data.extraOptions.map(opt => `
                    <label><input type="radio" name="extra" value="${opt}" required> +1 ${opt}</label>
                `).join("")}
            </div>`;
        }

        // Lógica Especial Drakari
        if (race === "Drakari") {
            html += `<h3>2. Elemento do Sopro</h3>
            <div class="form-group" style="display:flex; gap: 10px;">
                ${data.extraOptions.map(opt => `
                    <label><input type="radio" name="elemento" value="${opt}" required> ${opt}</label>
                `).join("")}
            </div>`;
        }

        html += `<hr>
            <h3>3. Selecione 3 Traços (Fiel ao Livro)</h3>
            <div class="traits-list" style="max-height: 300px; overflow-y: auto; background: #eee; padding: 10px; border-radius: 5px;">
                ${data.traits.map((t, i) => `
                    <div style="margin-bottom: 8px; border-bottom: 1px solid #ccc;">
                        <label>
                            <input type="checkbox" name="trait" value="${i}" class="trait-check"> 
                            <b>${t.n}</b>
                        </label>
                        <p style="font-size: 0.9em; margin: 2px 0 5px 20px; color: #444;">${t.d}</p>
                    </div>
                `).join("")}
            </div>
            <p id="trait-counter">Selecionados: 0 / 3</p>
        </form>`;

        new Dialog({
            title: `Configurar Ancestralidade: ${race}`,
            content: html,
            buttons: {
                save: {
                    label: "Confirmar Seleção",
                    callback: (dlg) => {
                        const form = dlg[0].querySelector("#pandorha-selector");
                        const selectedTraitsIdx = Array.from(form.querySelectorAll(".trait-check:checked")).map(c => parseInt(c.value));
                        
                        if (selectedTraitsIdx.length !== 3) {
                            ui.notifications.warn("Você DEVE escolher exatamente 3 traços!");
                            return openAncestrySelector(actor, item); // Reabrir
                        }

                        const bonus = form.bonus.value;
                        const extra = form.extra?.value || form.elemento?.value || "";
                        const selectedTraits = selectedTraitsIdx.map(idx => data.traits[idx]);

                        applySelection(actor, item, bonus, extra, selectedTraits);
                    }
                }
            },
            render: (dlg) => {
                const checks = dlg[0].querySelectorAll(".trait-check");
                const counter = dlg[0].querySelector("#trait-counter");
                checks.forEach(c => c.addEventListener("change", () => {
                   const count = dlg[0].querySelectorAll(".trait-check:checked").length;
                   counter.innerText = `Selecionados: ${count} / 3`;
                   if(count > 3) {
                       c.checked = false;
                       ui.notifications.warn("Limite de 3 traços atingido!");
                   }
                }));
            }
        }).render(true);
    }

    async function applySelection(actor, item, bonus, extra, traits) {
        const updates = {
            "system.props.anc_bonus_eixo": bonus + (extra ? ` & ${extra}` : ""),
            "system.props.traco_sel1_nome": traits[0].n,
            "system.props.traco_sel1_descr": traits[0].d,
            "system.props.traco_sel2_nome": traits[1].n,
            "system.props.traco_sel2_descr": traits[1].d,
            "system.props.traco_sel3_nome": traits[2].n,
            "system.props.traco_sel3_descr": traits[2].d,
            "system.props.is_configurado": true,
            "system.props.tipo_item": "ancestralidade"
        };

        // Automação de Atributos: Se o bônus for um Eixo ou Aplicação, tentamos somar (Opcional, mas Wow!)
        const attrMap = { 
            "Físico": "fisico", "Mental": "mental", "Social": "social",
            "Interação": "interacao", "Conflito": "conflito", "Resistência": "resistencia"
        };
        
        const actorUpdates = {};
        if (attrMap[bonus]) actorUpdates[`system.props.${attrMap[bonus]}`] = Number(actor.system.props[attrMap[bonus]] || 0) + 1;
        if (extra && attrMap[extra]) actorUpdates[`system.props.${attrMap[extra]}`] = Number(actor.system.props[attrMap[extra]] || 0) + 1;

        await item.update(updates);
        if (Object.keys(actorUpdates).length > 0) await actor.update(actorUpdates);

        ui.notifications.info(`Ancestralidade ${item.name} configurada com sucesso!`);
    }

    // --- 3. GATILHO AUTOMÁTICO (HOOK) ---
    // Registra no sistema para abrir o modal quando o item é criado no ator
    const ANCESTRY_NAMES = Object.keys(ANCESTRIES_DATA);
    if (!window._pandorhaHookActive) {
        Hooks.on("createItem", (item, options, userId) => {
            if (game.user.id !== userId) return;
            if (!item.actor) return;
            
            // Verifica se é um item de ancestralidade pelo nome OU pelo templateId
            const itemName = item.name.replace(" (PRO)", "").trim();
            const isAncestry = ANCESTRY_NAMES.includes(itemName);
            
            if (isAncestry && !item.system?.props?.is_configurado) {
                console.log(`PANDORHA | Ancestralidade detectada: ${item.name}. Abrindo Seletor...`);
                openAncestrySelector(item.actor, item);
            }
        });
        window._pandorhaHookActive = true;
        console.log("PANDORHA | Gatilho de Ancestralidade Ativado!");
    }

    // --- 4. INSTALADOR DE ITENS ---
    const getTemplateId = (name) => {
        const item = game.items.find(i => i.name === name && i.type === "_equippableItemTemplate");
        return item ? item.id : null;
    };

    const templateAnc = getTemplateId("Ancestralidade (PRO)");

    const itemsToSync = Object.entries(ANCESTRIES_DATA).map(([name, data]) => ({
        name: name,
        type: "equippableItem",
        img: `icons/skills/social/diplomacy-handshake.webp`,
        system: {
            templateId: templateAnc,
            props: {
                anc_lore: data.lore,
                anc_descricao: data.descricao,
                anc_aparencia: data.aparencia,
                capacidade_primordial_nome: data.capNome,
                capacidade_primordial_descr: data.capDescr,
                is_configurado: false,
                tipo_item: "ancestralidade"
            }
        }
    }));

    // Executa a sincronização
    for (let itemData of itemsToSync) {
        let existing = game.items.find(i => i.name === itemData.name && i.type === "equippableItem");
        if (existing) {
            await existing.update(itemData);
            console.log(`PANDORHA | Sincronizado: ${itemData.name}`);
        } else {
            await Item.create(itemData);
            console.log(`PANDORHA | Criado: ${itemData.name}`);
        }
    }

    ui.notifications.info("Sincronização Pandorha v1.4 Concluída! Gatilho do Seletor Ativo.");

    // --- 5. CORREÇÃO DINÂMICA DE FILTROS CSB ---
    // Fix definitivo para as abas misturando itens: Injeta o "templateFilter" dinâmico com os IDs reais do mundo atual.
    async function updateTemplateFilters() {
        // Encontrar os templates de de itens pelos nomes definidos nesta macro
        const ancTemplateName = "Ancestralidade (PRO)";
        const clsTemplateName = "Template de Classe";

        const ancTemplate = game.items.find(i => i.type === "_equippableItemTemplate" && i.name === "Template de Ancestralidade");
        const clsTemplate = game.items.find(i => i.type === "_equippableItemTemplate" && i.name === "Template de Classe");
        const antTemplate = game.items.find(i => i.type === "_equippableItemTemplate" && i.name === "Template de Antecedente");

        if (!ancTemplate || !clsTemplate || !antTemplate) {
            ui.notifications.warn("PANDORHA | Um dos templates base (Ancestralidade, Classe ou Antecedente) não foi encontrado. Importe o pacote completo.");
            return;
        }

        // Buscar todos os templates de Ator no mundo que possam usar esse sistema
        const allActorTemplates = game.actors.filter(a => a.type === "_template");
        
        let templatesUpdated = 0;

        for (let actorTemplate of allActorTemplates) {
            let hasChanges = false;
            
            function recursivelyProcessDict(obj) {
                if (!obj || typeof obj !== "object") return;
                
                if (obj.type === "itemContainer") {
                    if (obj.key === "anc_main_container") {
                        if (!Array.isArray(obj.templateFilter) || obj.templateFilter[0] !== ancTemplate.id || obj.itemFilterFormula) {
                            obj.templateFilter = [ancTemplate.id];
                            obj.itemFilterFormula = ""; // Limpa a fórmula defeituosa para parar erros no log
                            hasChanges = true;
                        }
                    } else if (obj.key === "cls_main_container") {
                        if (!Array.isArray(obj.templateFilter) || obj.templateFilter[0] !== clsTemplate.id || obj.itemFilterFormula) {
                            obj.templateFilter = [clsTemplate.id];
                            obj.itemFilterFormula = ""; // Limpa a fórmula defeituosa para parar erros no log
                            hasChanges = true;
                        }
                    } else if (obj.key === "ant_main_container") {
                        if (!Array.isArray(obj.templateFilter) || obj.templateFilter[0] !== antTemplate.id || obj.itemFilterFormula) {
                            obj.templateFilter = [antTemplate.id];
                            obj.itemFilterFormula = ""; // Limpa a fórmula defeituosa para parar erros no log
                            hasChanges = true;
                        }
                    }
                }
                
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        recursivelyProcessDict(obj[key]);
                    }
                }
            }

            const newBody = foundry.utils.deepClone(actorTemplate.system?.body || {});
            recursivelyProcessDict(newBody);

            if (hasChanges) {
                await actorTemplate.update({ "system.body": newBody });
                console.log(`PANDORHA | Filtros corrigidos no Actor Template: ${actorTemplate.name}`);
                templatesUpdated++;
            }
        }

        if (templatesUpdated > 0) {
            ui.notifications.info(`Filtros de Ancestralidade e Classe foram blindados com sucesso em ${templatesUpdated} Ficha(s)!`);
        } else {
            console.log("PANDORHA | Nenhuma Ficha de Ator precisou de atualização ou as abas necessárias não existem nela.");
        }
    }

    await updateTemplateFilters();
})();
