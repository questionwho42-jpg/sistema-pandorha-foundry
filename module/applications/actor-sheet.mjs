import { rollTest, rollSkill, rollItem, rollItemDamage } from "../data/rolls.mjs";
import { SKILLS } from "../data/skills.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;

export class PandorhaActorSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["pandorha", "sheet", "actor"],
    position: { width: 900, height: 720 }
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
      spells: items.filter(i => i.type === "spell"),
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
      isMonster: this.document.type === "monster"
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    const root = html?.[0] ?? html ?? this.element?.[0] ?? this.element;
    if (!root) return;
    const rollButton = root.querySelector("[data-action='roll-test']");
    if (rollButton) {
      rollButton.addEventListener("click", async event => {
        event.preventDefault();
        const eixo = root.querySelector("[name='roll-eixo']")?.value;
        const aplicacao = root.querySelector("[name='roll-aplicacao']")?.value;
        const bonusRaw = root.querySelector("[name='roll-bonus']")?.value ?? "0";
        const trained = root.querySelector("[name='roll-trained']")?.checked ?? true;
        const mapValue = root.querySelector("[name='roll-map']")?.value ?? "auto";
        const mapStep = mapValue === "auto" ? "auto" : Number(mapValue);
        const bonus = Number(bonusRaw) || 0;
        await rollTest({ actor: this.document, eixo, aplicacao, bonus, trained, mapStep, label: "Teste Global" });
      });
    }

    root.querySelectorAll("[data-action='roll-skill']").forEach(button => {
      button.addEventListener("click", async event => {
        event.preventDefault();
        const skillId = button.getAttribute("data-skill-id");
        const skill = SKILLS.find(s => s.id === skillId);
        if (!skill) return;
        await rollSkill({ actor: this.document, skill });
      });
    });

    root.querySelectorAll("[data-action='item-roll']").forEach(button => {
      button.addEventListener("click", async event => {
        event.preventDefault();
        const itemId = button.getAttribute("data-item-id");
        const item = this.document.items.get(itemId);
        if (!item) return;
        const mapValue = root.querySelector("[name='roll-map']")?.value ?? "auto";
        const mapStep = mapValue === "auto" ? "auto" : Number(mapValue);
        await rollItem({ actor: this.document, item, mapStep });
      });
    });

    root.querySelectorAll("[data-action='item-damage']").forEach(button => {
      button.addEventListener("click", async event => {
        event.preventDefault();
        const itemId = button.getAttribute("data-item-id");
        const item = this.document.items.get(itemId);
        if (!item) return;
        await rollItemDamage({ actor: this.document, item });
      });
    });

    root.querySelectorAll("[data-action='item-create']").forEach(button => {
      button.addEventListener("click", async event => {
        event.preventDefault();
        const type = button.getAttribute("data-item-type");
        if (!type) return;
        await this.document.createEmbeddedDocuments("Item", [{ name: `Novo ${type}`, type }]);
      });
    });

    root.querySelectorAll("[data-action='item-edit']").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        const itemId = button.getAttribute("data-item-id");
        const item = this.document.items.get(itemId);
        item?.sheet?.render(true);
      });
    });

    root.querySelectorAll("[data-action='item-delete']").forEach(button => {
      button.addEventListener("click", async event => {
        event.preventDefault();
        const itemId = button.getAttribute("data-item-id");
        if (!itemId) return;
        await this.document.deleteEmbeddedDocuments("Item", [itemId]);
      });
    });

    root.querySelectorAll("[data-action='open-compendium']").forEach(button => {
      button.addEventListener("click", async event => {
        event.preventDefault();
        const packId = button.getAttribute("data-pack");
        if (!packId) return;
        const pack = game.packs?.get(packId);
        if (pack) pack.render(true);
      });
    });

    root.querySelectorAll("[data-action='add-from-pack']").forEach(button => {
      button.addEventListener("click", async event => {
        event.preventDefault();
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
                await this.document.createEmbeddedDocuments("Item", [data]);
              }
            },
            cancel: {
              icon: '<i class="fas fa-times"></i>',
              label: "Cancelar"
            }
          },
          default: "add"
        }).render(true);
      });
    });
  }
}
