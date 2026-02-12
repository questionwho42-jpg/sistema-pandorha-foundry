import { PandorhaActor } from "./documents/actor.mjs";
import { PandorhaItem } from "./documents/item.mjs";
import { PandorhaActorSheet } from "./applications/actor-sheet.mjs";
import { PandorhaItemSheet } from "./applications/item-sheet.mjs";
import { PandorhaActorModel } from "./documents/data/actor-model.mjs";
import { PandorhaItemModel } from "./documents/data/item-model.mjs";
import { registerHandlebars } from "./data/handlebars.mjs";
import { rollTest, rollSkill, rollItem, rollItemDamage } from "./data/rolls.mjs";
import { SKILLS } from "./data/skills.mjs";

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
  document.addEventListener(
    "click",
    async event => {
      const form = event.target?.closest?.(".pandorha-sheet");
      if (!form) return;

      const button = event.target.closest("[data-action]");
      if (!button) return;

      event.preventDefault();

      const actorId = form.getAttribute("data-actor-id");
      const actor = game.actors?.get(actorId) ?? game.actors?.find(a => a.id === actorId);
      if (!actor) return;

      const action = button.getAttribute("data-action");
      if (!action) return;

      if (action === "roll-test") {
        const eixo = form.querySelector("[name='roll-eixo']")?.value;
        const aplicacao = form.querySelector("[name='roll-aplicacao']")?.value;
        const bonusRaw = form.querySelector("[name='roll-bonus']")?.value ?? "0";
        const trained = form.querySelector("[name='roll-trained']")?.checked ?? true;
        const mapValue = form.querySelector("[name='roll-map']")?.value ?? "auto";
        const mapStep = mapValue === "auto" ? "auto" : Number(mapValue);
        const bonus = Number(bonusRaw) || 0;
        await rollTest({ actor, eixo, aplicacao, bonus, trained, mapStep, label: "Teste Global" });
        return;
      }

      if (action === "roll-skill") {
        const skillId = button.getAttribute("data-skill-id");
        const skill = SKILLS.find(s => s.id === skillId);
        if (!skill) return;
        await rollSkill({ actor, skill });
        return;
      }

      if (["item-roll", "item-damage", "item-edit", "item-delete"].includes(action)) {
        const itemId = button.getAttribute("data-item-id");
        const item = actor.items.get(itemId);
        if (!item) return;

        if (action === "item-roll") {
          const mapValue = form.querySelector("[name='roll-map']")?.value ?? "auto";
          const mapStep = mapValue === "auto" ? "auto" : Number(mapValue);
          await rollItem({ actor, item, mapStep });
          return;
        }

        if (action === "item-damage") {
          await rollItemDamage({ actor, item });
          return;
        }

        if (action === "item-edit") {
          item.sheet?.render(true);
          return;
        }

        if (action === "item-delete") {
          await actor.deleteEmbeddedDocuments("Item", [itemId]);
          return;
        }
      }

      if (action === "item-create") {
        const type = button.getAttribute("data-item-type");
        if (!type) return;
        await actor.createEmbeddedDocuments("Item", [{ name: `Novo ${type}`, type }]);
        return;
      }

      if (action === "open-compendium") {
        const packId = button.getAttribute("data-pack");
        if (!packId) return;
        const pack = game.packs?.get(packId);
        if (pack) pack.render(true);
        return;
      }

      if (action === "add-from-pack") {
        const packId = button.getAttribute("data-pack");
        const type = button.getAttribute("data-item-type");
        if (!packId) return;
        const pack = game.packs?.get(packId);
        if (!pack) return;

        const index = await pack.getIndex();
        const options = index.map(entry => `<option value="${entry._id}">${entry.name}</option>`).join("");
        const content = `<form><div class="form-group"><label>Selecione</label><select name="entry">${options}</select></div></form>`;

        new Dialog({
          title: "Adicionar do Compêndio",
          content,
          buttons: {
            add: {
              icon: '<i class="fas fa-plus"></i>',
              label: "Adicionar",
              callback: async html => {
                const entryId = html.find("select[name='entry']").val();
                if (!entryId) return;
                const doc = await pack.getDocument(entryId);
                if (!doc) return;
                const data = doc.toObject();
                if (type) data.type = type;
                await actor.createEmbeddedDocuments("Item", [data]);
              }
            },
            cancel: {
              icon: '<i class="fas fa-times"></i>',
              label: "Cancelar"
            }
          },
          default: "add"
        }).render(true);
        return;
      }
    },
    true
  );
});
