import { PandorhaActor } from "./documents/actor.mjs";
import { PandorhaItem } from "./documents/item.mjs";
import { PandorhaActorSheet } from "./applications/actor-sheet.mjs";
import { PandorhaItemSheet } from "./applications/item-sheet.mjs";
import { PandorhaActorModel } from "./documents/data/actor-model.mjs";
import { PandorhaItemModel } from "./documents/data/item-model.mjs";
import { registerHandlebars } from "./data/handlebars.mjs";

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

Hooks.on("renderActorSheet", (app, html) => {
  try {
    if (!app || app.constructor?.name !== "PandorhaActorSheet") return;
    console.warn("Pandorha renderActorSheet hook", { app, html });
    app.activateListeners?.(html);
  } catch (err) {
    console.error("Pandorha renderActorSheet hook error", err);
  }
});

Hooks.on("renderActorSheetV2", (app, html) => {
  try {
    if (!app || app.constructor?.name !== "PandorhaActorSheet") return;
    console.warn("Pandorha renderActorSheetV2 hook", { app, html });
    app.activateListeners?.(html);
  } catch (err) {
    console.error("Pandorha renderActorSheetV2 hook error", err);
  }
});
