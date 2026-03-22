// ============================================================
// MACRO INSTALADOR PANDORHA — CLASSES (v1.0)
// Instala os 4 itens de classe + modal de seleção de talentos
// ============================================================

(async () => {
    "use strict";

    // --- 1. CONFIGURAÇÕES E DADOS ---
    const CLASSES_DATA = {
        "Vanguarda": {
            descricao: "O Vanguarda não é apenas um soldado; ele é a âncora do grupo. Seja um cavaleiro de armadura brilhante, um mercenário calejado ou um bárbaro das estepes, todos compartilham a mesma verdade: a batalha é vencida com sangue e disciplina.",
            matriz: "Físico / Resistência e Conflito",
            vitalidade: "+10 HP (Potencial de Recuperação Base), +2 Vigor",
            equipamento: "Todas as Armas, Armaduras e Escudos",
            passivaNome: "Postura de Combate",
            passivaDescr: "Uma vez por turno, você pode fazer uma Ação de Interagir (abrir porta, sacar arma, beber poção) como 1 Ação [L], sem gastar seus pontos de ação.",
            talentos: [
                { n: "Golpe Esmagador [AA]", d: "Ataque Corpo a Corpo com +1d8 de Dano. Se acertar, alvo fica Exposto (-2 CA) até seu próximo turno." },
                { n: "Muralha Humana [A]", d: "Postura Defensiva: concede Cobertura Total para aliados atrás de você. Se inimigo adjacente atacar aliado, gasta Reação para receber o dano." },
                { n: "Grito de Desafio [A]", d: "Inimigos em 9m: Mental + Resistência vs DC (10+Nível+Social+Conflito). Falha: obrigados a atacar você no próximo turno." },
                { n: "Segundo Fôlego [A]", d: "Cura 1d10 + Nível de HP. Apenas 1x por combate." },
                { n: "Investida de Escudo [A]", d: "Ataque com escudo (1d4). Sucesso: empurra 3m. Colide com parede: Exposto. Crítico: empurra 3m + Caído." },
                { n: "Quebra-Hordas (Passivo)", d: "Ao reduzir inimigo a 0 HP, pode fazer ataque básico imediato (1 Ação [L]) contra outro inimigo adjacente." }
            ]
        },
        "Tecelão de Sombras": {
            descricao: "Magos, Bruxos, Feiticeiros. Em Pandorha, todos são Tecelões. Eles puxam os fios invisíveis da realidade para criar fogo, ilusão e morte. Mas a magia tem um preço: a sanidade e a energia vital do conjurador.",
            matriz: "Mental / Conflito e Interação",
            vitalidade: "+4 HP (Potencial de Recuperação Base), +5 Energia Etérica (EE)",
            equipamento: "Armas Simples, Sem Armadura",
            passivaNome: "Visão de Éter",
            passivaDescr: "Enxerga auras mágicas e criaturas invisíveis naturalmente. Pode gastar 1 EE para rerolar qualquer Teste Global de Mental + Interação + Nível (Conhecimento), acessando a memória coletiva do Éter.",
            talentos: [
                { n: "Seta Etérica [A]", d: "Truque Seta Etérica. Para Tecelões, dano aumenta para 1d6+1 no Nível 1." },
                { n: "Passo de Bruma [A]", d: "Teleporte 9 metros para local visível. Custa 1 EE." },
                { n: "Armadura Mágica [A]", d: "Por 1 hora, CA = 13 + Eixo Mental." },
                { n: "Bola de Fogo Menor [AA]", d: "Explosão em 3m de raio. 2d6 Fogo (Físico + Resistência + Nível reduz à metade). Custa 2 EE." },
                { n: "Sono [AA]", d: "Role 2d8. Total de HP de criaturas que pode adormecer em área de 6m (começa pelas de menor HP). Custa 2 EE." },
                { n: "Mãos Mágicas (Passivo)", d: "Truque Mãos Mágicas. Manipula objetos a 9m, abre portas destrancadas e pega itens leves silenciosamente." }
            ]
        },
        "Emissário": {
            descricao: "Ladinos, Bardos, Espiões, Oficiais. O Emissário é aquele que resolve problemas com astúcia, lábia e carisma. Eles lutam sujo quando necessário, mas preferem vencer antes mesmo da luta começar.",
            matriz: "Social / Interação e Conflito",
            vitalidade: "+6 HP (Potencial de Recuperação Base), +2 Vigor, +2 EE",
            equipamento: "Armas Leves, Marciais, Armaduras Leves e Médias",
            passivaNome: "Diplomacia Armada",
            passivaDescr: "Pode usar Eixo Social para rolar Iniciativa. No início do combate, aliados a 3m ganham +1 em Testes de Mental + Resistência.",
            talentos: [
                { n: "Ataque Furtivo (Passivo)", d: "1x/turno, se atacar alvo distraído (flanqueado ou surpreso), causa +1d6 de Dano." },
                { n: "Inspirar Coragem [A]", d: "Aliado que pode te ouvir ganha +1d6 para adicionar no próximo Teste (Ataque, Matriz ou Resistência)." },
                { n: "Voz de Comando [A]", d: "Inimigo: Mental + Resistência vs DC (10+Nível+Social+Conflito). Falha: obrigado a Largar arma, Fugir 3m ou Ficar Caído." },
                { n: "Truque Sujo [A]", d: "Social + Conflito vs Físico + Resistência. Sucesso: Cego ou Sem Ar (1 rodada). Crítico: Atordoado. F. Parcial: Abalado." },
                { n: "Mestre dos Disfarces (Passivo)", d: "Cria disfarce convincente em 1 minuto com materiais simples. Pessoas comuns não reconhecem sem teste ativo." },
                { n: "Golpe Fantasma [AA]", d: "Ataque corpo a corpo. Independente de acertar, move deslocamento total sem ataque de oportunidade + Invisível até fim do turno." }
            ]
        },
        "Caçador": {
            descricao: "Rangers, Druidas, Batedores. Eles são os guardiões da fronteira entre a civilização e o selvagem. Eles dominam o arco, a fera e a erva curativa.",
            matriz: "Híbrido — Escolha 2 eixos primários (Físico, Mental ou Social) no Nível 1",
            vitalidade: "+8 HP (Potencial de Recuperação Base), +4 Vigor",
            equipamento: "Armas à Distância, Armas Leves, Armaduras Leves e Médias",
            passivaNome: "Predador",
            passivaDescr: "Rastreia em velocidade normal (sem penalidade). Causa +2 de Dano contra Bestas e Monstros já estudados ou enfrentados (Inimigos Conhecidos).",
            talentos: [
                { n: "Companheiro Animal", d: "Animal leal (Lobo, Falcão, Urso - Nível 1). Age na sua iniciativa, obedece comandos mentais. Se morrer, 24h na natureza para chamar outro." },
                { n: "Tiro Preciso (Passivo)", d: "Ataques à distância mesmo engajado em corpo a corpo, sem penalidade no acerto." },
                { n: "Armadilha de Urso [A]", d: "Armadilha em quadrado adjacente. Primeira criatura: 2d6 Dano + Imobilizada (DC de Físico + Resistência + Nível)." },
                { n: "Marca do Caçador [A]", d: "Alvo visível recebe +1d4 de dano extra em todos os seus ataques. Dura até morrer ou marcar outro." },
                { n: "Saraivada [AA]", d: "Dispara contra todos os inimigos em Cone de 9m. Um único Teste Global de [Eixo] + Conflito + Nível vs defesa de cada um." },
                { n: "Cura Natural [A]", d: "Ervas e emplastros. Toca criatura viva e cura 1d8 + Eixo Mental de HP." }
            ]
        }
    };

    // --- 2. MODAL DE SELEÇÃO DE TALENTOS ---
    function openClassSelector(actor, item) {
        const className = item.name.replace(" (PRO)", "").trim();
        const classData = CLASSES_DATA[className];
        if (!classData) {
            ui.notifications.warn(`Classe "${className}" não encontrada nos dados.`);
            return;
        }

        // Gerar HTML dos checkboxes de talentos
        let talentosHTML = "";
        classData.talentos.forEach((t, i) => {
            talentosHTML += `
            <div style="margin: 4px 0; padding: 6px; border: 1px solid #555; border-radius: 4px;">
                <label style="display: flex; align-items: flex-start; gap: 6px; cursor: pointer;">
                    <input type="checkbox" name="talento_${i}" value="${i}" style="margin-top: 3px;" />
                    <div>
                        <strong>${t.n}</strong><br/>
                        <small style="color: #ccc;">${t.d}</small>
                    </div>
                </label>
            </div>`;
        });

        const content = `
        <form>
            <h2 style="text-align: center; border-bottom: 2px solid gold; padding-bottom: 8px;">
                ⚔️ ${className}
            </h2>

            <p style="font-style: italic; color: #aaa; text-align: center; margin: 8px 0;">
                ${classData.descricao}
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 10px 0;">
                <div style="padding: 6px; background: #333; border-radius: 4px;">
                    <strong>Matriz:</strong> ${classData.matriz}
                </div>
                <div style="padding: 6px; background: #333; border-radius: 4px;">
                    <strong>Vitalidade:</strong> ${classData.vitalidade}
                </div>
                <div style="padding: 6px; background: #333; border-radius: 4px;">
                    <strong>Equipamento:</strong> ${classData.equipamento}
                </div>
                <div style="padding: 6px; background: #333; border-radius: 4px;">
                    <strong>Passiva:</strong> ${classData.passivaNome}
                </div>
            </div>

            <h3 style="text-align: center; margin-top: 12px;">🎯 Escolha 2 Talentos Iniciais</h3>
            <p style="color: #f0d264; text-align: center; font-size: 0.85em;">
                Selecione exatamente 2 talentos para o Nível 1.
            </p>

            ${talentosHTML}
        </form>`;

        new Dialog({
            title: `Configurar Classe: ${className}`,
            content,
            buttons: {
                confirmar: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Confirmar",
                    callback: async (html) => {
                        const checked = html.find("input[type='checkbox']:checked");
                        if (checked.length !== 2) {
                            ui.notifications.warn("Selecione exatamente 2 talentos!");
                            // Reabrir o modal
                            setTimeout(() => openClassSelector(actor, item), 100);
                            return;
                        }

                        const selectedTalents = [];
                        checked.each(function() {
                            const idx = parseInt(this.value);
                            selectedTalents.push(classData.talentos[idx]);
                        });

                        await applyClassSelection(actor, item, classData, selectedTalents);
                    }
                },
                cancelar: {
                    icon: '<i class="fas fa-times"></i>',
                    label: "Cancelar"
                }
            },
            default: "confirmar",
            render: (html) => {
                // Limitar a 2 checkboxes selecionados
                html.find("input[type='checkbox']").on("change", function() {
                    const checked = html.find("input[type='checkbox']:checked");
                    if (checked.length > 2) {
                        this.checked = false;
                        ui.notifications.warn("Máximo de 2 talentos!");
                    }
                });
            }
        }, { width: 520, height: 700 }).render(true);
    }

    // --- 3. APLICAR SELEÇÃO ---
    async function applyClassSelection(actor, item, classData, talents) {
        const updates = {
            "system.props.classe_descricao": classData.descricao,
            "system.props.classe_matriz": classData.matriz,
            "system.props.classe_vitalidade": classData.vitalidade,
            "system.props.classe_equipamento": classData.equipamento,
            "system.props.hab_passiva_nome": classData.passivaNome,
            "system.props.hab_passiva_descr": classData.passivaDescr,
            "system.props.talento_classe_1_nome": talents[0].n,
            "system.props.talento_classe_1_descr": talents[0].d,
            "system.props.talento_classe_2_nome": talents[1].n,
            "system.props.talento_classe_2_descr": talents[1].d,
            "system.props.is_configurado": true,
            "system.props.tipo_item": "classe"
        };

        // Atualizar campo de classe na aba Identidade do ator
        const actorUpdates = {
            "system.props.classe_nome": item.name
        };

        await item.update(updates);
        await actor.update(actorUpdates);

        ui.notifications.info(`Classe ${item.name} configurada com sucesso!`);
    }

    // --- 4. GATILHO AUTOMÁTICO (HOOK) ---
    const CLASS_NAMES = Object.keys(CLASSES_DATA);
    if (!window._pandorhaClassHookActive) {
        Hooks.on("createItem", (item, options, userId) => {
            if (game.user.id !== userId) return;
            if (!item.actor) return;

            const itemName = item.name.replace(" (PRO)", "").trim();
            const isClass = CLASS_NAMES.includes(itemName);

            if (isClass && !item.system?.props?.is_configurado) {
                console.log(`PANDORHA | Classe detectada: ${item.name}. Abrindo Seletor...`);
                openClassSelector(item.actor, item);
            }
        });
        window._pandorhaClassHookActive = true;
        console.log("PANDORHA | Gatilho de Classe Ativado!");
    }

    // --- 5. INSTALADOR DE ITENS ---
    const getTemplateId = (name) => {
        const item = game.items.find(i => i.name === name && i.type === "_equippableItemTemplate");
        return item ? item.id : null;
    };

    const templateCls = getTemplateId("Template de Classe");

    if (!templateCls) {
        ui.notifications.error("Template de Classe não encontrado! Importe o bundle primeiro.");
        return;
    }

    const itemsToSync = Object.entries(CLASSES_DATA).map(([name, data]) => ({
        name: name,
        type: "equippableItem",
        img: "icons/skills/melee/weapons-crossed-swords-yellow.webp",
        system: {
            templateId: templateCls,
            props: {
                classe_descricao: data.descricao,
                classe_matriz: data.matriz,
                classe_vitalidade: data.vitalidade,
                classe_equipamento: data.equipamento,
                hab_passiva_nome: data.passivaNome,
                hab_passiva_descr: data.passivaDescr,
                is_configurado: false,
                tipo_item: "classe"
            }
        }
    }));

    // Executa a sincronização
    for (let itemData of itemsToSync) {
        const existing = game.items.find(i => i.name === itemData.name && i.type === "equippableItem");
        if (existing) {
            await existing.update({
                img: itemData.img,
                system: itemData.system
            });
            console.log(`PANDORHA | Classe atualizada: ${itemData.name}`);
        } else {
            await Item.create(itemData);
            console.log(`PANDORHA | Classe criada: ${itemData.name}`);
        }
    }

    ui.notifications.info(`Instalador de Classes Pandorha concluído! ${itemsToSync.length} classes sincronizadas. Arraste para a ficha do personagem.`);
})();
