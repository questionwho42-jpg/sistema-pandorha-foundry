/**
 * MACRO: INSTALADOR DE CONTEÚDO PANDORHA (v1.2 - Sincronizada)
 * 
 * Esta versão garante que os dados apareçam corretamente nos novos templates.
 */

(async () => {
    const getTemplateId = (name) => {
        const item = game.items.find(i => i.name === name);
        return item ? item.id : null;
    };

    const templates = {
        Ator: game.items.find(i => i.name === "Template Ator Pandorha v2.0")?.id,
        Ancestralidade: getTemplateId("Ancestralidade"),
        Classe: getTemplateId("Classe"),
        Antecedente: getTemplateId("Antecedente")
    };

    const content = [
        // ANCESTRALIDADES
        { name: "Humano", temp: "Ancestralidade", props: { nome_anc: "Humano", cap_prim_nome: "Mente Inquieta", cap_prim_desc: "Ganhe +1 Talento Geral adicional no Nível 1.", traco1: "Diligência Erudita", traco1_desc: "+2 em bônus fixos >= 10.", traco2: "Língua de Prata", traco2_desc: "Vantagem em Social x Eixo.", traco3: "Vontade Indomável", traco3_desc: "Estabiliza automático 1x/cena." } },
        { name: "Elfo", temp: "Ancestralidade", props: { nome_anc: "Elfo", cap_prim_nome: "Sentido Etérico", cap_prim_desc: "Percebe magia 9m.", traco1: "Visão Estelar", traco1_desc: "Ignora Penumbra.", traco2: "Agilidade Élfica", traco2_desc: "+1.5m Movimento.", traco3: "Transe Profundo", traco3_desc: "Descanso Longo em 4h." } },
        { name: "Anão", temp: "Ancestralidade", props: { nome_anc: "Anão", cap_prim_nome: "Peso Pétreo", cap_prim_desc: "Imune a Empurrão.", traco1: "Sentido de Minério", traco1_desc: "Sente metal a 18m.", traco2: "Couraça Biológica", traco2_desc: "+2 Resist. Veneno.", traco3: "Ruptura de Rocha", traco3_desc: "Crítico 19-20 em Físico." } },
        { name: "Drakari", temp: "Ancestralidade", props: { nome_anc: "Drakari", cap_prim_nome: "Sopro Elemental", cap_prim_desc: "Dano 1d8 cone 4,5m.", traco1: "Escamas de Guerra", traco1_desc: "CA = 11 + Nível + Fis + Res.", traco2: "Coração de Dragão", traco2_desc: "+1 HP por nível.", traco3: "Garras Letais", traco3_desc: "Ataque desarmado 1d6." } },
        { name: "Umbral", temp: "Ancestralidade", props: { nome_anc: "Umbral", cap_prim_nome: "Corpo de Éter", cap_prim_desc: "Atravessa frestas.", traco1: "Visão do Vazio", traco1_desc: "Enxerga no escuro total.", traco2: "Passo Silencioso", traco2_desc: "+2 Furtividade.", traco3: "Desvanecer", traco3_desc: "Invisível 1 rodada." } },
        { name: "Fera", temp: "Ancestralidade", props: { nome_anc: "Fera", cap_prim_nome: "Faro Aguçado", cap_prim_desc: "Rastreia por odor 18m.", traco1: "Impulso Selvagem", traco1_desc: "+3m Movimento.", traco2: "Couraça de Pelagem", traco2_desc: "+1 CA permanente.", traco3: "Ira de Pandorha", traco3_desc: "Abaixo 50% HP: +2 Conflito." } },
        // CLASSES
        { name: "Vanguarda", temp: "Classe", props: { nome_cls: "Vanguarda", passiva_nome: "Postura de Combate", passiva_desc: "Interação rápida.", talento1: "Golpe Esmagador", talento1_desc: "+1d8 dano.", talento2: "Muralha Humana", talento2_desc: "Cobertura para aliados." } },
        { name: "Tecelão de Sombras", temp: "Classe", props: { nome_cls: "Tecelão de Sombras", passiva_nome: "Visão de Éter", passiva_desc: "Vê auras mágicas.", talento1: "Armadura Mágica", talento1_desc: "CA 13 + Mental.", talento2: "Passo de Bruma", talento2_desc: "Teleporte 9m." } },
        { name: "Emissário", temp: "Classe", props: { nome_cls: "Emissário", passiva_nome: "Diplomacia Armada", passiva_desc: "Social para Iniciativa.", talento1: "Ataque Furtivo", talento1_desc: "+1d6 dano.", talento2: "Golpe Fantasma", talento2_desc: "Move-se sem oportunidade." } },
        { name: "Caçador", temp: "Classe", props: { nome_cls: "Caçador", passiva_nome: "Predador", passiva_desc: "Rastreia vel. normal.", talento1: "Companheiro Animal", talento1_desc: "Nível 1.", talento2: "Marca do Caçador", talento2_desc: "+1d4 dano." } },
        // ANTECEDENTES
        { name: "Acólito", temp: "Antecedente", props: { nome_ant: "Acólito", origem_nome: "Abrigo da Fé", origem_desc: "Cura em templos.", talento1: "Ritualista Sacro", talento1_desc: "Limpa mente.", talento2: "Teólogo de Combate", talento2_desc: "Mental para Init.", talento3: "Voto de Pobreza", talento3_desc: "+2 Mental+Res." } },
        { name: "Aristocrata", temp: "Antecedente", props: { nome_ant: "Aristocrata", origem_nome: "Sangue Azul", origem_desc: "Favor da nobreza.", talento1: "Esgrimista Clássico", talento1_desc: "+2 CA.", talento2: "Rede de Contatos", talento2_desc: "Acha aliados.", talento3: "Educação Superior", talento3_desc: "+2 Saber." } },
        { name: "Criminoso", temp: "Antecedente", props: { nome_ant: "Criminoso", origem_nome: "Contato Criminal", origem_desc: "Mercado negro.", talento1: "Arrombador", talento1_desc: "Abre fechaduras.", talento2: "Ataque Furtivo", talento2_desc: "+1d6 dano.", talento3: "Luta Suja", talento3_desc: "Ignora Caído." } },
        { name: "Erudito", temp: "Antecedente", props: { nome_ant: "Erudito", origem_nome: "Acesso Restrito", origem_desc: "Bibliotecas.", talento1: "Analista Tático", talento1_desc: "Vê fraquezas.", talento2: "Poliglota", talento2_desc: "Muitas línguas.", talento3: "Tecnomagia", talento3_desc: "Cria itens." } },
        { name: "Soldado Veterano", temp: "Antecedente", props: { nome_ant: "Soldado Veterano", origem_nome: "Patente Militar", origem_desc: "Ajuda de tropas.", talento1: "Vigilante", talento1_desc: "Dorme de armadura.", talento2: "Cerco", talento2_desc: "Dano struct.", talento3: "Guerreiro", talento3_desc: "+1 Dano." } }
    ];

    ui.notifications.info("Atualizando itens Pandorha (v1.2)...");
    
    let created = 0;
    for (let c of content) {
        const tId = templates[c.temp];
        if (!tId) continue;

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

    ui.notifications.info(`${created} itens atualizados com sucesso!`);
})();
