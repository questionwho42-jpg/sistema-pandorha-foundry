/**
 * MACRO: INSTALADOR DE CONTEÚDO PANDORHA (v1.3 - Fidelidade Total)
 * 
 * Sincroniza os itens com o Livro de Regras e os novos Templates (OFICIAL/PRO).
 */

(async () => {
    const getTemplateId = (name) => {
        const item = game.items.find(i => i.name === name || i.name.includes(name));
        return item ? item.id : null;
    };

    const templates = {
        Ator: game.items.find(i => i.name.includes("(OFICIAL)"))?.id || getTemplateId("Template Ator Pandorha"),
        Ancestralidade: getTemplateId("Ancestralidade (PRO)") || getTemplateId("Template de Ancestralidade"),
        Classe: getTemplateId("Template de Classe"),
        Antecedente: getTemplateId("Template de Antecedente")
    };

    const content = [
        // --- ANCESTRALIDADES (Sincronizadas com .md) ---
        { 
            name: "Humano", 
            temp: "Ancestralidade", 
            props: { 
                anc_descricao: "Os Humanos de Pandorha são definidos pela sua tenacidade sob pressão. Como habitantes de Morden, o Bastião da Tempestade, eles aprenderam que a sobrevivência não é um direito, mas um cálculo constante.", 
                anc_lore: "Nascidos sob o Domo de Mara, os humanos construíram uma civilização vertical de metal e oração. Para eles, o Éter é uma ferramenta de defesa e economia.", 
                anc_aparencia: "Trajes com reforços metálicos e dispositivos de respiração rúnica. Peles palidificadas e tatuagens de 'Selos de Pureza'.", 
                anc_bonus_eixo: "Escolha +1 em um dos Eixos (Físico, Mental ou Social) OU +1 em uma das Aplicações (Interação, Conflito ou Resistência).", 
                capacidade_primordial_nome: "Mente Inquieta", 
                capacidade_primordial_descr: "Você ganha +1 Talento Geral adicional no Nível 1 e pode escolher +1 Aplicação extra para aumentar em +1.", 
                traco_sel1_nome: "Diligência Erudita", 
                traco_sel1_descr: "Ganha +2 em qualquer Teste Global cuja soma de bônus fixos já seja 10 ou superior.", 
                traco_sel2_nome: "Língua de Prata", 
                traco_sel2_descr: "Vantagem (2d20) em Teste Global de Social+Interação um número de vezes igual ao Eixo Social.", 
                traco_sel3_nome: "Vontade Indomável [R]", 
                traco_sel3_descr: "Quando seu HP chega a 0 pela primeira vez na cena, você pode gastar sua Reação para estabilizar automaticamente." 
            } 
        },
        { 
            name: "Elfo", 
            temp: "Ancestralidade", 
            props: { 
                anc_descricao: "Seres de vida longa e conexão profunda com o Éter. Elegantes, distantes e com compreensão natural da magia.", 
                anc_lore: "Habitam Cinar, a Floresta das Estrelas Caídas. O Éter é o 'fio' de uma tapeçaria sagrada tecida pelo Tecelão Invisível.", 
                anc_aparencia: "Altos, esguios, túnicas de seda viva. Olhos brilhantes e orelhas que vibram na presença de magia.", 
                anc_bonus_eixo: "+1 no Eixo Mental OU +1 na Aplicação Interação.", 
                capacidade_primordial_nome: "Sentido Etérico", 
                capacidade_primordial_descr: "Percebem magia em um raio de 9m (Passiva). Não precisam rolar para saber que há magia ativa.", 
                traco_sel1_nome: "Visão Estelar", 
                traco_sel1_descr: "Ignora penalidades de baixa luminosidade (Penumbra), enxergando perfeitamente nas sombras.", 
                traco_sel2_nome: "Agilidade Élfica", 
                traco_sel2_descr: "Sua velocidade base aumenta em 1,5 metros (total de 10,5m).", 
                traco_sel3_nome: "Transe Profundo", 
                traco_sel3_descr: "Não dorme. Um transe de 4 horas fornece todos os benefícios de um Descanso Longo de 8 horas." 
            } 
        },
        { 
            name: "Anão", 
            temp: "Ancestralidade", 
            props: { 
                anc_descricao: "Personificação da resiliência. Mestres indiscutíveis da metalurgia e da engenharia pesada de Pandorha.", 
                anc_lore: "Habitam as 'Cidades de Raiz' escavadas sob as montanhas. Chamam o Éter cristalizado de 'Sangue da Rocha'.", 
                anc_aparencia: "Baixos e robustos, densidade muscular superior. Barbas trançadas com anéis de metal de status.", 
                anc_bonus_eixo: "+1 no Eixo Físico OU +1 na Aplicação Resistência.", 
                capacidade_primordial_nome: "Peso Pétreo", 
                capacidade_primordial_descr: "Imunes a efeitos de 'Empurrão' de criaturas/magias de Nível menor ou igual ao seu Físico.", 
                traco_sel1_nome: "Sentido de Minério", 
                traco_sel1_descr: "Sente metais/pedras a 18m através de pedra sólida. Pode identificar tipo com teste de Mental.", 
                traco_sel2_nome: "Couraça Biológica", 
                traco_sel2_descr: "Pele dura como couro. +2 de Resistência em testes contra Venenos e Doenças naturais.", 
                traco_sel3_nome: "Ruptura de Rocha", 
                traco_sel3_descr: "Margem de Crítico em Físico+Conflito reduzida em 1 (crita com 19 ou 20)." 
            } 
        },
        { 
            name: "Drakari", 
            temp: "Ancestralidade", 
            props: { 
                anc_descricao: "Senhores do Metal Vivo. Vivem em um 'Mercado Totalitário' onde a honra é medida em solvência.", 
                anc_lore: "Dominam o Ouro Vivo (Auro-Éter) em suas veias. Riqueza é o único caminho para a divindade.", 
                anc_aparencia: "Escamas metálicas (bronze ao ouro). Membros substituídos por engenhos rúnicos brilhantes.", 
                anc_bonus_eixo: "+1 no Eixo Físico OU +1 na Aplicação Conflito.", 
                capacidade_primordial_nome: "Sopro Elemental [AA]", 
                capacidade_primordial_descr: "Cone de 4,5m de energia (Fogo, Gelo ou Raio). Dano: 1d8 (escala c/ nível). 1x por Cena.", 
                traco_sel1_nome: "Escamas de Guerra", 
                traco_sel1_descr: "Sem armadura, sua Defesa (CA) é igual a 11 + Nível + Físico + Resistência.", 
                traco_sel2_nome: "Coração de Dragão", 
                traco_sel2_descr: "Ganha +1 ponto de Vida (HP) extra para cada nível global que possuir.", 
                traco_sel3_nome: "Garras Letais", 
                traco_sel3_descr: "Ataques desarmados causam 1d6 de dano + Físico (Conflito). Consideradas armas leves." 
            } 
        },
        { 
            name: "Umbral", 
            temp: "Ancestralidade", 
            props: { 
                anc_descricao: "Andarilhos do Vazio. Misteriosos, veem o mundo material como uma ilusão passageira.", 
                anc_lore: "Poeira estelar que ganhou consciência através da exposição direta ao Éter bruto.", 
                anc_aparencia: "Pálidos, translúcidos, olhos negros sem pupilas. Vozes soam como sussurros duplos.", 
                anc_bonus_eixo: "+1 no Eixo Social OU +1 na Aplicação Interação.", 
                capacidade_primordial_nome: "Corpo de Éter", 
                capacidade_primordial_descr: "Atravessa frestas de até 10cm sem sofrer penalidades de movimento ou carga.", 
                traco_sel1_nome: "Visão do Vazio", 
                traco_sel1_descr: "Enxerga perfeitamente na escuridão total, mesmo se ela for de origem mágica.", 
                traco_sel2_nome: "Passo Silencioso", 
                traco_sel2_descr: "Leveza sobrenatural. Ganha +2 em Testes Globais de Físico+Interação para Furtividade.", 
                traco_sel3_nome: "Desvanecer [AA]", 
                traco_sel3_descr: "Uma vez por cena, você pode se tornar invisível por 1 Rodada." 
            } 
        },
        { 
            name: "Fera", 
            temp: "Ancestralidade", 
            props: { 
                anc_descricao: "Fusão entre natureza selvagem e Poder Etérico. Instinto aguçado e conexão visceral com o ciclo da vida.", 
                anc_lore: "Protetoras das 'Selvas Primal'. Não usam a magia; elas a caçam e incorporam em seus corpos.", 
                anc_aparencia: "Traços animais proeminentes (caudas, garras, orelhas). Corpos atléticos para predação.", 
                anc_bonus_eixo: "+1 no Eixo Físico OU +1 na Aplicação Interação.", 
                capacidade_primordial_nome: "Faro Aguçado", 
                capacidade_primordial_descr: "Detecta odores 18m. Rastreio recebe bônus de +5 em Mental+Interação+Nível.", 
                traco_sel1_nome: "Impulso Selvagem", 
                traco_sel1_descr: "Sua velocidade base de movimento aumenta em 3 metros (total de 12m).", 
                traco_sel2_nome: "Couraça de Pelagem", 
                traco_sel2_descr: "Sua pele e pelos grossos fornecem um bônus permanente de +1 na sua Defesa (CA).", 
                traco_sel3_nome: "Ira de Pandorha", 
                traco_sel3_descr: "Abaixo de 50% HP: ganha um bônus de +2 em todos os seus Testes Globais de Físico+Conflito." 
            } 
        },
        // --- CLASSES ---
        { name: "Vanguarda", temp: "Classe", props: { classe_nome: "Vanguarda", passiva_nome: "Postura de Combate", passiva_descr: "Interação rápida.", t1_n: "Golpe Esmagador", t1_d: "+1d8 dano.", t2_n: "Muralha Humana", t2_d: "Cobertura para aliados." } },
        { name: "Tecelão de Sombras", temp: "Classe", props: { classe_nome: "Tecelão de Sombras", passiva_nome: "Visão de Éter", passiva_desc: "Vê auras mágicas.", t1_n: "Armadura Mágica", t1_d: "CA 13 + Mental.", t2_n: "Passo de Bruma", t2_d: "Teleporte 9m." } },
        { name: "Emissário", temp: "Classe", props: { classe_nome: "Emissário", passiva_nome: "Diplomacia Armada", passiva_desc: "Social para Iniciativa.", t1_n: "Ataque Furtivo", t1_d: "+1d6 dano.", t2_n: "Golpe Fantasma", t2_d: "Move-se sem oportunidade." } },
        { name: "Caçador", temp: "Classe", props: { classe_nome: "Caçador", passiva_nome: "Predador", passiva_desc: "Rastreia vel. normal.", t1_n: "Companheiro Animal", t1_d: "Nível 1.", t2_n: "Marca do Caçador", t2_d: "+1d4 dano." } },
        // --- ANTECEDENTES ---
        { name: "Acólito", temp: "Antecedente", props: { ant_nome: "Acólito", origem_nome: "Abrigo da Fé", origem_desc: "Cura em templos.", ta_n: "Ritualista Sacro", ta_d: "Limpa mente.", ta_n2: "Teólogo de Combate", ta_d2: "Mental para Init.", tg_n: "Voto de Pobreza" } },
        { name: "Aristocrata", temp: "Antecedente", props: { ant_nome: "Aristocrata", origem_nome: "Sangue Azul", origem_desc: "Favor da nobreza.", ta_n: "Esgrimista Clássico", ta_d: "+2 CA.", ta_n2: "Rede de Contatos", ta_d2: "Acha aliados.", tg_n: "Educação Superior" } },
        { name: "Criminoso", temp: "Antecedente", props: { ant_nome: "Criminoso", origem_nome: "Contato Criminal", origem_desc: "Mercado negro.", ta_n: "Arrombador", ta_d: "Abre fechaduras.", ta_n2: "Ataque Furtivo", ta_d2: "+1d6 dano.", tg_n: "Luta Suja" } },
        { name: "Erudito", temp: "Antecedente", props: { ant_nome: "Erudito", origem_nome: "Acesso Restrito", origem_desc: "Bibliotecas.", ta_n: "Analista Tático", ta_d: "Vê fraquezas.", ta_n2: "Poliglota", ta_d2: "Muitas línguas.", tg_n: "Tecnomagia" } },
        { name: "Soldado Veterano", temp: "Antecedente", props: { ant_nome: "Soldado Veterano", origem_nome: "Patente Militar", origem_desc: "Ajuda de tropas.", ta_n: "Vigilante", ta_d: "Dorme de armadura.", ta_n2: "Cerco", ta_d2: "Dano struct.", tg_n: "Guerreiro" } }
    ];

    ui.notifications.info("Atualizando itens Pandorha (v1.3)...");
    
    let created = 0;
    for (let c of content) {
        const tId = templates[c.temp];
        if (!tId) {
            console.warn(`Template não encontrado para ${c.name}: ${c.temp}`);
            continue;
        }

        const old = game.items.find(i => i.name === c.name && i.type === "equippableItem");
        if (old) await old.delete();

        await Item.create({
            name: c.name,
            type: "equippableItem",
            img: "icons/svg/item-bag.svg",
            system: {
                template: tId,
                props: c.props
            }
        });
        created++;
    }

    ui.notifications.info(`${created} itens Pandorha atualizados com sucesso!`);
})();
