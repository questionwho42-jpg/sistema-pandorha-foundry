import { PandorhaActor } from "./documents/actor.mjs";
import { PandorhaItem } from "./documents/item.mjs";
import "../scripts/monks-tokenbar-integration.mjs";
import { PandorhaActorSheet } from "./applications/actor-sheet.mjs";
import { PandorhaItemSheet } from "./applications/item-sheet.mjs";
import { PandorhaQuickbar } from "./applications/quickbar.mjs";
import { PandorhaActorModel } from "./documents/data/actor-model.mjs";
import { PandorhaItemModel } from "./documents/data/item-model.mjs";
import { registerHandlebars } from "./data/handlebars.mjs";

let quickbar = null;

function isQuickbarEnabled() {
  return Boolean(game.settings?.get("pandorha", "enableQuickbar"));
}

async function refreshQuickbar() {
  if (!isQuickbarEnabled()) {
    quickbar?.destroy();
    quickbar = null;
    return;
  }

  if (!quickbar) {
    quickbar = new PandorhaQuickbar();
    game.pandorha ||= {};
    game.pandorha.quickbar = quickbar;
    await quickbar.activate();
    return;
  }

  await quickbar.refresh();
}

Hooks.once("init", () => {
  console.log("Pandorha | Initializing system");

  CONFIG.Actor.documentClass = PandorhaActor;
  CONFIG.Item.documentClass = PandorhaItem;

  CONFIG.Actor.dataModels = {
    character: PandorhaActorModel,
    npc: PandorhaActorModel,
    monster: PandorhaActorModel,
  };

  CONFIG.Item.dataModels = {
    ancestry: PandorhaItemModel,
    trait: PandorhaItemModel,
    class: PandorhaItemModel,
    talent: PandorhaItemModel,
    maneuver: PandorhaItemModel,
    spell: PandorhaItemModel,
    weapon: PandorhaItemModel,
    armor: PandorhaItemModel,
    shield: PandorhaItemModel,
    equipment: PandorhaItemModel,
    consumable: PandorhaItemModel,
    condition: PandorhaItemModel,
    background: PandorhaItemModel,
    feature: PandorhaItemModel,
    ability: PandorhaItemModel,
    rune: PandorhaItemModel,
    disease: PandorhaItemModel,
    toxin: PandorhaItemModel,
  };

  const ActorsCollection = foundry.documents.collections.Actors;
  const ItemsCollection = foundry.documents.collections.Items;

  ActorsCollection.registerSheet("pandorha", PandorhaActorSheet, {
    makeDefault: true,
    types: ["character", "npc", "monster"],
  });

  ItemsCollection.registerSheet("pandorha", PandorhaItemSheet, {
    makeDefault: true,
  });

  registerHandlebars();

  game.settings.register("pandorha", "enableQuickbar", {
    name: "Pandorha: Barra Rapida de Token",
    hint: "Exibe o painel de status e rolagens ao lado esquerdo da barra de macros.",
    scope: "client",
    config: true,
    type: Boolean,
    default: true,
    onChange: () => {
      if (!game.ready) return;
      refreshQuickbar();
    },
  });

  game.settings.register("pandorha", "quickbarExpanded", {
    scope: "client",
    config: false,
    type: Boolean,
    default: false,
  });
});

Hooks.on("updateCombat", async (combat, changed) => {
  if (!changed) return;
  if (
    Object.prototype.hasOwnProperty.call(changed, "turn") ||
    Object.prototype.hasOwnProperty.call(changed, "round")
  ) {
    const combatant = combat.combatant;
    if (combatant?.actor) {
      await combatant.actor.setFlag("pandorha", "attacksThisTurn", 0);
    }
  }
});

Hooks.once("ready", () => {
  refreshQuickbar();
});

Hooks.on("renderHotbar", () => {
  quickbar?.refreshPosition();
  refreshQuickbar();
});

Hooks.on("canvasReady", () => refreshQuickbar());
Hooks.on("controlToken", () => refreshQuickbar());
Hooks.on("updateToken", () => refreshQuickbar());
Hooks.on("createToken", () => refreshQuickbar());
Hooks.on("deleteToken", () => refreshQuickbar());
Hooks.on("updateActor", (actor) => {
  const selectedActor = canvas?.tokens?.controlled?.[0]?.actor;
  if (selectedActor?.id === actor.id) refreshQuickbar();
});
