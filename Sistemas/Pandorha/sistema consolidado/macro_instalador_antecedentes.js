/**
 * Instalador de Antecedentes Pandorha v1.0
 * 
 * Este script deve rodar apenas ONCE por mundo.
 * Ele cria os 20 Antecedentes originais do Livro (Capítulo 10) baseados
 * no "Template de Antecedente".
 */

async function instalarAntecedentes() {
    console.log("PANDORHA | Iniciando instalação de Antecedentes...");
    
    // Procura o Template de Antecedente no jogo
    const templateName = "Template de Antecedente";
    const template = game.items.find(i => i.name === templateName && i.type === "_equippableItemTemplate");
    
    if (!template) {
        ui.notifications.error(`PANDORHA | Template base "${templateName}" não encontrado! Importe o pacote de templates primeiro.`);
        return;
    }
    
    // Dicionário com os 20 Antecedentes do Capítulo 10
    const antecedentesData = [
        {
            name: "Acólito",
            descricao: "Você serviu em um templo, aprendendo rituais e a vontade dos deuses.",
            habilidade_nome: "Abrigo da Fé",
            habilidade_descr: "Você e seu grupo sempre têm hospedagem e cura gratuita em templos da sua religião.",
            t1_nome: "Ritualista Sacro", t1_descr: "Você pode realizar rituais de purificação. Gaste 10 minutos para remover uma Condição Mental (Medo, Confusão) de um aliado.",
            t2_nome: "Teólogo de Combate", t2_descr: "Você usa seu Eixo [Mental] em vez de [Físico] para rolar Iniciativa.",
            t3_nome: "Voto de Pobreza", t3_descr: "Você não acumula riquezas (doa tudo acima de 10 Ouro), mas ganha +2 em todos os testes de Mental + Resistência."
        },
        {
            name: "Aristocrata",
            descricao: "Você nasceu em berço de ouro, educado em cortesias e intrigas.",
            habilidade_nome: "Sangue Azul",
            habilidade_descr: "Pessoas comuns tendem a obedecer suas ordens simples sem questionar. Você tem acesso a bailes e audiências reais. \n\nInfluência de Berço: Você começa o jogo com 1 Ponto de Favor com a nobreza de sua terra natal.",
            t1_nome: "Esgrimista Clássico", t1_descr: "Se estiver usando uma Lâmina Leve e nenhuma armadura (ou roupas finas), ganha +2 na CA.",
            t2_nome: "Rede de Contatos", t2_descr: "Uma vez por cidade, você pode encontrar um NPC que lhe deve um favor (informação, empréstimo, esconderijo).",
            t3_nome: "Educação Superior", t3_descr: "Escolha um assunto (História, Monstros, Geografia). Você sempre rola com +2 de Bônus testes sobre isso."
        },
        {
            name: "Artesão de Guilda",
            descricao: "Membro respeitado de uma guilda comercial. Suas mãos criam valor.",
            habilidade_nome: "Olho para Valor",
            habilidade_descr: "Você sabe estimar o preço exato de qualquer item e nunca é enganado por falsificações.",
            t1_nome: "Forja de Guerra", t1_descr: "(Talento de Ofício): Permite criar Armas e Armaduras.",
            t2_nome: "Manutenção de Campo", t2_descr: "Durante um descanso curto, você pode reparar 1 item quebrado ou restaurar a munição de um aliado (recupera 1d6 flechas).",
            t3_nome: "Negociante Mestre", t3_descr: "Você compra itens com 20% de desconto e vende por 20% a mais."
        },
        {
            name: "Artista",
            descricao: "Músico, poeta ou ator. Você vive para o aplauso.",
            habilidade_nome: "A Fama Precede",
            habilidade_descr: "Em qualquer taverna, você pode tocar/atuar em troca de estadia de luxo e refeições para o grupo. \n\nReconhecimento: Você começa o jogo com Nível 1 de Fama (Conhecido Local) em sua região de origem.",
            t1_nome: "Distração Fascinante [A]", t1_descr: "Sua performance prende a atenção. Alvos em 9m sofrem -2 em Percepção e Iniciativa.",
            t2_nome: "Memória Eidética", t2_descr: "Você decora mapas, poemas ou mensagens com uma única leitura.",
            t3_nome: "Insulto Cortante [A]", t3_descr: "Você zomba de um inimigo. Ele deve atacar você ou sofre -2 em todos os dados até o fim do turno dele."
        },
        {
            name: "Caçador de Recompensas",
            descricao: "Você persegue alvos por dinheiro. Vivo ou morto, é apenas negócio.",
            habilidade_nome: "O Contrato",
            habilidade_descr: "Se você tiver um contrato formal para capturar alguém, você tem +2 de Bônus em todos os testes para rastrear esse alvo específico.",
            t1_nome: "Algemas Rápidas [A]", t1_descr: "Se você agarrar (Grapple) um alvo, pode tentar algemá-lo (Teste Global de Mental+Interação+Nível vs DC Desafiadora) na mesma ação.",
            t2_nome: "Interrogador Urbano", t2_descr: "Você sabe onde o submundo se esconde. Ganha +2 para obter informações em tavernas suspeitas.",
            t3_nome: "Olhar da Morte", t3_descr: "Você sabe quanto HP atual um inimigo tem apenas olhando para ele (1 Ação [L])."
        },
        {
            name: "Charlatão",
            descricao: "Você vende óleo de cobra, falsifica documentos e finge ser quem não é.",
            habilidade_nome: "Identidade Falsa",
            habilidade_descr: "Você possui documentos perfeitos e um disfarce completo para uma \"segunda vida\" que ninguém consegue desmentir.",
            t1_nome: "Mãos Leves", t1_descr: "Você pode roubar um item pequeno ou plantar um objeto no bolso de alguém sem ser notado (Teste de Mental+Interação).",
            t2_nome: "Língua de Prata", t2_descr: "1x por cena, você pode rolar novamente um teste Social fracassado.",
            t3_nome: "Truque de Moeda", t3_descr: "Você pode usar moedas como armas de arremesso (Dano 1d4). Se acertar, você recupera a moeda (ela volta ou ricocheteia)."
        },
        {
            name: "Criminoso",
            descricao: "Você já esteve do outro lado da lei. Assaltante, contrabandista ou capanga.",
            habilidade_nome: "Contato Criminal",
            habilidade_descr: "Em qualquer cidade, você sabe encontrar um receptador para vender itens roubados.",
            t1_nome: "Ataque Furtivo", t1_descr: "Se atacar um inimigo que não te viu, causa +1d6 de dano.",
            t2_nome: "Arrombador", t2_descr: "Você abre fechaduras simples sem rolagem. Fechaduras complexas recebem +2 no teste.",
            t3_nome: "Luta Suja", t3_descr: "Se estiver Caído, você não sofre penalidade para atacar."
        },
        {
            name: "Eremita",
            descricao: "Você viveu anos longe da civilização, meditando ou sobrevivendo.",
            habilidade_nome: "Segredo da Descoberta",
            habilidade_descr: "Você carrega um segredo cósmico ou uma profecia que ninguém mais sabe (Discuta com o Mestre).",
            t1_nome: "Ciência Alquímica", t1_descr: "(Talento de Ofício): Permite criar Poções e Venenos.",
            t2_nome: "Metabolismo Lento", t2_descr: "Você precisa de metade da comida e água que uma pessoa normal precisa. Imune a doenças naturais.",
            t3_nome: "Sentido de Perigo", t3_descr: "Você nunca é surpreendido em combate. Age normalmente na rodada surpresa."
        },
        {
            name: "Erudito",
            descricao: "Bibliotecas são seu habitat natural.",
            habilidade_nome: "Acesso Restrito",
            habilidade_descr: "Você tem credenciais para entrar em bibliotecas arcanas, arquivos reais e universidades fechadas ao público.",
            t1_nome: "Engenharia Etérica", t1_descr: "(Talento de Ofício): Permite criar Itens Etéricos.",
            t2_nome: "Analista Tático [A]", t2_descr: "Estuda um inimigo. Descobre as imunidades e vulnerabilidades dele.",
            t3_nome: "Poliglota Supremo", t3_descr: "Você lê todas as línguas mortas e fala 5 idiomas extras."
        },
        {
            name: "Escravo Fugitivo",
            descricao: "Você perdeu sua liberdade, mas quebrou suas correntes.",
            habilidade_nome: "Indomável",
            habilidade_descr: "Você tem +2 de Bônus em testes para resistir a controle mental ou medo. Ninguém te domina de novo.",
            t1_nome: "Resistência à Dor", t1_descr: "Se cair a 0 HP, você continua de pé agindo por 1 rodada antes de cair inconsciente.",
            t2_nome: "Improvisador", t2_descr: "Você não sofre penalidade por usar armas improvisadas (cadeiras, garrafas, pedras).",
            t3_nome: "Corrida Desesperada", t3_descr: "Sua ação de \"Disparar\" dobra seu movimento (18m) em vez de apenas andar."
        },
        {
            name: "Gladiador",
            descricao: "A morte é seu esporte.",
            habilidade_nome: "Glória de Sangue",
            habilidade_descr: "NPCs guerreiros e mercenários te reconhecem e respeitam sua força. Você ganha +2 em interações com eles.\n\nFama da Arena: Nível 1 de Fama (Local) na cidade onde fica sua arena principal.",
            t1_nome: "Exibicionista", t1_descr: "Quando você faz um Crítico, recupera 1d6 PV pela adrenalina da torcida imaginária (1 Ação [L]).",
            t2_nome: "Mestre de Armas Exóticas", t2_descr: "Você sabe usar Chicotes, Tridentes e Redes sem penalidade.",
            t3_nome: "Golpe Baixo", t3_descr: "Uma vez por combate, pode tentar derrubar (trip) um inimigo como 1 Ação [L] após um ataque."
        },
        {
            name: "Guarda da Cidade",
            descricao: "Você protegeu os muros e patrulhou as ruas.",
            habilidade_nome: "Autoridade Legal",
            habilidade_descr: "Você pode acessar cenas de crime e exigir cooperação de cidadãos comuns.",
            t1_nome: "Formação de Escudos", t1_descr: "Se estiver adjacente a um aliado, ambos ganham +1 CA.",
            t2_nome: "Sentido de Investigação", t2_descr: "Você encontra pistas (pegadas, sangue) automaticamente se passar 10 minutos procurando.",
            t3_nome: "Nocautear", t3_descr: "Você pode escolher causar Dano Não-Letal sem penalidade no ataque."
        },
        {
            name: "Marinheiro",
            descricao: "O oceano é seu lar.",
            habilidade_nome: "Passagem Livre",
            habilidade_descr: "Você consegue transporte gratuito em qualquer navio mercante para você e seu grupo (trocando por trabalho no convés).",
            t1_nome: "Equilíbrio Perfeito", t1_descr: "Você nunca fica Caído por efeitos de empurrão ou terreno instável. Escalada é igual ao seu deslocamento.",
            t2_nome: "Navegador", t2_descr: "Você nunca se perde sob o céu aberto.",
            t3_nome: "Luta de Taverna", t3_descr: "Seu soco causa 1d4 de dano (em vez de 1) e você ganha +1 para agarrar."
        },
        {
            name: "Médico de Campo",
            descricao: "Você viu o horror da guerra e remendou os pedaços.",
            habilidade_nome: "Triagem",
            habilidade_descr: "Você sabe imediatamente quem está morrendo, quem está estável e quem está fingindo.",
            t1_nome: "Cirurgião de Combate [A]", t1_descr: "Gasta 1 uso de Kit Médico para curar 1d8 HP de um aliado adjacente.",
            t2_nome: "Anatomista", t2_descr: "Seus ataques com adagas causam +2 de dano contra humanoides (você sabe onde dói).",
            t3_nome: "Mãos Firmes", t3_descr: "Você tem +2 de Bônus em testes de destreza manual fina."
        },
        {
            name: "Mercador",
            descricao: "Você move o mundo com moedas.",
            habilidade_nome: "Caravana",
            habilidade_descr: "Você começa o jogo com uma carroça e um animal de carga (boi/mula), além de 50 Ouro extra.",
            t1_nome: "Avaliação Mística", t1_descr: "Você sabe se um item é mágico apenas segurando-o.",
            t2_nome: "Língua de Ouro", t2_descr: "Pode tentar subornar inimigos inteligentes para não atacarem (o Mestre define o preço).",
            t3_nome: "Mochileiro", t3_descr: "Você carrega o dobro do peso [Físico] sem ficar sobrecarregado."
        },
        {
            name: "Nômade",
            descricao: "Você nunca dorme no mesmo lugar duas vezes.",
            habilidade_nome: "Guia Regional",
            habilidade_descr: "Você conhece as rotas, poços de água e abrigos seguros de qualquer região selvagem que já visitou.",
            t1_nome: "Passo Leve", t1_descr: "Terreno Difícil (lama, neve) não reduz seu movimento.",
            t2_nome: "Caçador-Coletor", t2_descr: "Você encontra comida para 5 pessoas todos os dias sem teste.",
            t3_nome: "Poliglota Selvagem", t3_descr: "Você fala os dialetos de tribos bárbaras, orcs e goblins."
        },
        {
            name: "Pirata",
            descricao: "A bandeira negra é sua lei. Ouro e medo.",
            habilidade_nome: "Má Reputação",
            habilidade_descr: "As pessoas têm medo de você. Você pode cometer crimes menores sem que chamem a guarda imediatamente.\n\nInfâmia: Nível 1 de Infâmia. A guarda regional conhece seu rosto.",
            t1_nome: "Acrobacia de Cordas", t1_descr: "Você pode usar cordas para se balançar e mover 12m em uma ação.",
            t2_nome: "Bebedor Resistente", t2_descr: "Imune a envenenamento por álcool e venenos ingeridos.",
            t3_nome: "Pólvora e Chumbo [A]", t3_descr: "Você sabe usar Armas de Pólvora. Começa com uma pistola enferrujada."
        },
        {
            name: "Rato de Rua",
            descricao: "Você cresceu na sarjeta, lutando por restos.",
            habilidade_nome: "Mapa da Cidade",
            habilidade_descr: "Você conhece os atalhos, telhados e esgotos da cidade. Desloca-se 2x mais rápido em ambiente urbano.",
            t1_nome: "Estômago de Ferro", t1_descr: "Você pode comer comida estragada ou beber água suja sem adoecer.",
            t2_nome: "Esconderijo Mestre", t2_descr: "Se você se esconder, ninguém te acha sem magia.",
            t3_nome: "Faca na Bota", t3_descr: "Você pode sacar uma adaga como 1 Ação [L] (mesmo se surpreendido)."
        },
        {
            name: "Soldado Veterano",
            descricao: "A guerra acabou, mas não para você.",
            habilidade_nome: "Patente Militar",
            habilidade_descr: "Soldados da sua nação prestam continência e podem oferecer suporte logístico (armas, rações) se solicitado.",
            t1_nome: "Forja de Guerra", t1_descr: "(Talento de Ofício): Permite criar Armas/Armaduras.",
            t2_nome: "Vigilante", t2_descr: "Você dorme de armadura leve/média sem penalidade e acorda instantaneamente se houver perigo.",
            t3_nome: "Tática de Cerco", t3_descr: "Seus ataques causam o dobro de dano contra objetos e estruturas (portas, muros)."
        },
        {
            name: "Vidente",
            descricao: "Você vê o que os outros ignoram.",
            habilidade_nome: "Presságio",
            habilidade_descr: "Uma vez por dia, role 1d20 e anote o número. Você pode substituir qualquer rolagem futura sua ou de um aliado por esse número.",
            t1_nome: "Vinculação Rúnica", t1_descr: "(Talento de Ofício): Permite criar Runas.",
            t2_nome: "Leitura Fria", t2_descr: "Ao conversar com alguém por 1 minuto, descobre um traço de personalidade (Medo, Desejo ou Segredo).",
            t3_nome: "Sexto Sentido", t3_descr: "Você sente a presença de mortos-vivos ou demônios em 30m."
        }
    ];

    let count = 0;

    // Criar os Itens no Foundry
    for (let ant of antecedentesData) {
        // Verifica se o Antecedente já existe
        const exists = game.items.find(i => i.name === ant.name && i.type === "equippableItem");
        if (exists) {
            console.log(`PANDORHA | Antecedente ${ant.name} já existe, pulando...`);
            continue;
        }

        const itemData = {
            name: ant.name,
            type: "equippableItem",
            system: {
                templateId: template.id,
                props: {
                    ant_descricao: ant.descricao,
                    hab_origem_nome: ant.habilidade_nome,
                    hab_origem_descr: ant.habilidade_descr,
                    talento_ant_1_nome: ant.t1_nome,
                    talento_ant_1_descr: ant.t1_descr,
                    talento_ant_2_nome: ant.t2_nome,
                    talento_ant_2_descr: ant.t2_descr,
                    talento_ant_3_nome: ant.t3_nome,
                    talento_ant_3_descr: ant.t3_descr
                }
            }
        };

        await Item.create(itemData);
        console.log(`PANDORHA | Antecedente criada: ${ant.name}`);
        count++;
    }

    ui.notifications.info(`PANDORHA | Instalador concluído! ${count} antecedentes novos adicionados.`);
}

instalarAntecedentes();
