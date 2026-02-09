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

  onRender() {
    super.onRender?.();
    const el = this.element?.[0] ?? this.element;
    console.log("PandorhaActorSheet onRender", { hasElement: !!el, element: el });
    if (this.element) this.activateListeners(this.element);
  }

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

    const element = html?.[0] ?? html ?? this.element?.[0] ?? this.element;
    const root =
      element?.querySelector?.("[data-application-part='form']") ??
      element?.querySelector?.("form") ??
      element;
    console.log("PandorhaActorSheet activateListeners", { hasElement: !!element, hasRoot: !!root, element, root });
    if (!root) return;

    if (!root.dataset) root.dataset = {};
    if (root.dataset.pandorhaBound === "1") return;
    root.dataset.pandorhaBound = "1";

    root.addEventListener("click", async event => {
      const button = event.target.closest("[data-action]");
      if (!button) return;
      console.log("PandorhaActorSheet click", { action: button.getAttribute("data-action"), target: button });
      event.preventDefault();

      const action = button.getAttribute("data-action");
      if (!action) return;

      if (action === "roll-test") {
        const eixo = root.querySelector("[name='roll-eixo']")?.value;
        const aplicacao = root.querySelector("[name='roll-aplicacao']")?.value;
        const bonusRaw = root.querySelector("[name='roll-bonus']")?.value ?? "0";
        const trained = root.querySelector("[name='roll-trained']")?.checked ?? true;
        const mapValue = root.querySelector("[name='roll-map']")?.value ?? "auto";
        const mapStep = mapValue === "auto" ? "auto" : Number(mapValue);
        const bonus = Number(bonusRaw) || 0;
        await rollTest({ actor: this.document, eixo, aplicacao, bonus, trained, mapStep, label: "Teste Global" });
        return;
      }

      if (action === "roll-skill") {
        const skillId = button.getAttribute("data-skill-id");
        const skill = SKILLS.find(s => s.id === skillId);
        if (!skill) return;
        await rollSkill({ actor: this.document, skill });
        return;
      }

      if (["item-roll", "item-damage", "item-edit", "item-delete"].includes(action)) {
        const itemId = button.getAttribute("data-item-id");
        const item = this.document.items.get(itemId);
        if (!item) return;

        if (action === "item-roll") {
          const mapValue = root.querySelector("[name='roll-map']")?.value ?? "auto";
          const mapStep = mapValue === "auto" ? "auto" : Number(mapValue);
          await rollItem({ actor: this.document, item, mapStep });
          return;
        }

        if (action === "item-damage") {
          await rollItemDamage({ actor: this.document, item });
          return;
        }

        if (action === "item-edit") {
          item?.sheet?.render(true);
          return;
        }

        if (action === "item-delete") {
          await this.document.deleteEmbeddedDocuments("Item", [itemId]);
          return;
        }
      }

      if (action === "item-create") {
        const type = button.getAttribute("data-item-type");
        if (!type) return;
        await this.document.createEmbeddedDocuments("Item", [{ name: `Novo ${type}`, type }]);
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
        return;
      }
    }, { capture: true });
  }
}
