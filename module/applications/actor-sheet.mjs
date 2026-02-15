import { rollTest, rollSkill, rollItem, rollItemDamage } from "../data/rolls.mjs";
import { SKILLS } from "../data/skills.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;

export class PandorhaActorSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["pandorha", "sheet", "actor"],
    position: { width: 900, height: 720 },
    actions: {
      "roll-test": function (event, target) { return this._onClickAction(event, target); },
      "roll-skill": function (event, target) { return this._onClickAction(event, target); },
      "item-roll": function (event, target) { return this._onClickAction(event, target); },
      "item-damage": function (event, target) { return this._onClickAction(event, target); },
      "item-create": function (event, target) { return this._onClickAction(event, target); },
      "item-edit": function (event, target) { return this._onClickAction(event, target); },
      "item-delete": function (event, target) { return this._onClickAction(event, target); },
      "open-compendium": function (event, target) { return this._onClickAction(event, target); },
      "add-from-pack": function (event, target) { return this._onClickAction(event, target); }
    }
  });

  static PARTS = {
    form: {
      template: "systems/pandorha/templates/actor/actor.hbs"
    }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    const items = this.document.items.map(i => i.toObject());
    const byType = {
      ancestries: items.filter(i => i.type === "ancestry"),
      traits: items.filter(i => i.type === "trait"),
      classes: items.filter(i => i.type === "class"),
      talents: items.filter(i => i.type === "talent"),
      maneuvers: items.filter(i => i.type === "maneuver"),
      spells: items.filter(i => i.type === "spell"),
      conditions: items.filter(i => i.type === "condition"),
      equipment: items.filter(i => ["weapon", "armor", "shield", "equipment", "consumable", "rune"].includes(i.type)),
      weapons: items.filter(i => i.type === "weapon"),
      features: items.filter(i => ["feature", "ability"].includes(i.type))
    };

    const skills = SKILLS.map(skill => ({
      ...skill,
      trained: this.document.system.skills?.[skill.id]?.trained ?? false,
      bonus: this.document.system.skills?.[skill.id]?.bonus ?? 0
    }));

    return {
      ...context,
      system: this.document.system,
      items: byType,
      skills,
      isCharacter: this.document.type === "character",
      isNpc: this.document.type === "npc",
      isMonster: this.document.type === "monster",
      actor: this.document
    };
  }

  async _onClickAction(event, target) {
    const action = target?.dataset?.action;
    if (!action) return super._onClickAction?.(event, target);

    event.preventDefault();

    const actor = this.document;
    const root = target.closest("form") ??
      this.element?.querySelector?.("[data-application-part='form']") ??
      this.element?.querySelector?.("form") ??
      this.element;

    if (action === "roll-test") {
      const eixo = root?.querySelector?.("[name='roll-eixo']")?.value;
      const aplicacao = root?.querySelector?.("[name='roll-aplicacao']")?.value;
      const bonusRaw = root?.querySelector?.("[name='roll-bonus']")?.value ?? "0";
      const trained = root?.querySelector?.("[name='roll-trained']")?.checked ?? true;
      const mapValue = root?.querySelector?.("[name='roll-map']")?.value ?? "auto";
      const mapStep = mapValue === "auto" ? "auto" : Number(mapValue);
      const bonus = Number(bonusRaw) || 0;
      await rollTest({ actor, eixo, aplicacao, bonus, trained, mapStep, label: "Teste Global" });
      return;
    }

    if (action === "roll-skill") {
      const skillId = target.dataset.skillId;
      const skill = SKILLS.find(s => s.id === skillId);
      if (!skill) return;
      await rollSkill({ actor, skill });
      return;
    }

    if (["item-roll", "item-damage", "item-edit", "item-delete"].includes(action)) {
      const itemId = target.dataset.itemId;
      const item = actor.items.get(itemId);
      if (!item) return;

      if (action === "item-roll") {
        const mapValue = root?.querySelector?.("[name='roll-map']")?.value ?? "auto";
        const mapStep = mapValue === "auto" ? "auto" : Number(mapValue);
        await rollItem({ actor, item, mapStep });
        return;
      }

      if (action === "item-damage") {
        await rollItemDamage({ actor, item });
        return;
      }

      if (action === "item-edit") {
        item?.sheet?.render(true);
        return;
      }

      if (action === "item-delete") {
        await actor.deleteEmbeddedDocuments("Item", [itemId]);
        return;
      }
    }

    if (action === "item-create") {
      const type = target.dataset.itemType;
      if (!type) return;
      await actor.createEmbeddedDocuments("Item", [{ name: `Novo ${type}`, type }]);
      return;
    }

    if (action === "open-compendium") {
      const packId = target.dataset.pack;
      if (!packId) return;
      const pack = game.packs?.get(packId);
      if (pack) pack.render(true);
      return;
    }

    if (action === "add-from-pack") {
      const packId = target.dataset.pack;
      const type = target.dataset.itemType;
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

    return super._onClickAction?.(event, target);
  }
}

