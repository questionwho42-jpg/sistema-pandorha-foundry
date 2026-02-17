import { PandorhaActor } from "./documents/actor.mjs";
import { PandorhaItem } from "./documents/item.mjs";
import { PandorhaActorSheet } from "./applications/actor-sheet.mjs";
import { PandorhaItemSheet } from "./applications/item-sheet.mjs";
import { PandorhaTokenHud } from "./applications/token-hud.mjs";
import { PandorhaActorModel } from "./documents/data/actor-model.mjs";
import { PandorhaItemModel } from "./documents/data/item-model.mjs";
import { registerHandlebars } from "./data/handlebars.mjs";

let tokenHud;

function renderTokenHud(force = false) {
  if (!tokenHud) return;
  tokenHud.render(force);
  setTimeout(() => tokenHud?.refreshPosition(), 10);
}

Hooks.once("init", () => {
  console.log("Pandorha | Initializing system");

  CONFIG.Actor.documentClass = PandorhaActor;
  CONFIG.Item.documentClass = PandorhaItem;

  CONFIG.Actor.dataModels = {
    character: PandorhaActorModel,
    npc: PandorhaActorModel,
    monster: PandorhaActorModel
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
    toxin: PandorhaItemModel
  };

  const ActorsCollection = foundry.documents.collections.Actors;
  const ItemsCollection = foundry.documents.collections.Items;

  ActorsCollection.registerSheet("pandorha", PandorhaActorSheet, {
    makeDefault: true,
    types: ["character", "npc", "monster"]
  });

  ItemsCollection.registerSheet("pandorha", PandorhaItemSheet, { makeDefault: true });

  registerHandlebars();
});

Hooks.on("updateCombat", async (combat, changed) => {
  if (!changed) return;
  if (Object.prototype.hasOwnProperty.call(changed, "turn") || Object.prototype.hasOwnProperty.call(changed, "round")) {
    const combatant = combat.combatant;
    if (combatant?.actor) {
      await combatant.actor.setFlag("pandorha", "attacksThisTurn", 0);
    }
  }
});

Hooks.once("ready", () => {
  game.pandorha ||= {};
  tokenHud = new PandorhaTokenHud();
  game.pandorha.tokenHud = tokenHud;

  renderTokenHud(true);

  window.addEventListener("resize", () => tokenHud?.refreshPosition());
});

Hooks.on("renderHotbar", () => tokenHud?.refreshPosition());
Hooks.on("canvasReady", () => renderTokenHud());
Hooks.on("controlToken", () => renderTokenHud());
Hooks.on("updateToken", () => renderTokenHud());
Hooks.on("createToken", () => renderTokenHud());
Hooks.on("deleteToken", () => renderTokenHud());
Hooks.on("updateActor", (actor) => {
  const selectedActor = canvas?.tokens?.controlled?.[0]?.actor;
  if (selectedActor?.id === actor.id) renderTokenHud();
});

