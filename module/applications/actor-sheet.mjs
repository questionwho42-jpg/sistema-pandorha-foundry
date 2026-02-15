import { rollTest, rollSkill, rollItem, rollItemDamage } from "../data/rolls.mjs";
import { SKILLS } from "../data/skills.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const WIZARD_STEPS = 5;
const WIZARD_REQUIREMENTS = {
  2: { field: "ancestry", label: "ancestralidade" },
  3: { field: "background", label: "antecedente" },
  4: { field: "class", label: "classe" }
};

export class PandorhaActorSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["pandorha", "sheet", "actor"],
    position: { width: 900, height: 720 },
    actions: {
      "switch-tab": function (event, target) { return this._onClickAction(event, target); },
      "roll-test": function (event, target) { return this._onClickAction(event, target); },
      "roll-skill": function (event, target) { return this._onClickAction(event, target); },
      "item-roll": function (event, target) { return this._onClickAction(event, target); },
      "item-damage": function (event, target) { return this._onClickAction(event, target); },
      "item-create": function (event, target) { return this._onClickAction(event, target); },
      "item-edit": function (event, target) { return this._onClickAction(event, target); },
      "item-delete": function (event, target) { return this._onClickAction(event, target); },
      "open-compendium": function (event, target) { return this._onClickAction(event, target); },
      "add-from-pack": function (event, target) { return this._onClickAction(event, target); },
      "wizard-prev": function (event, target) { return this._onClickAction(event, target); },
      "wizard-next": function (event, target) { return this._onClickAction(event, target); },
      "wizard-go-step": function (event, target) { return this._onClickAction(event, target); },
      "wizard-finish": function (event, target) { return this._onClickAction(event, target); }
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

    const activeTab = this.document.getFlag("pandorha", "sheetTab") ?? "base";
    const wizardStepRaw = Number(this.document.getFlag("pandorha", "wizardStep") ?? 1);
    const wizardStep = Number.isFinite(wizardStepRaw) ? Math.min(WIZARD_STEPS, Math.max(1, wizardStepRaw)) : 1;

    return {
      ...context,
      system: this.document.system,
      items: byType,
      skills,
      activeTab,
      wizard: {
        step: wizardStep,
        total: WIZARD_STEPS,
        progress: Math.round((wizardStep / WIZARD_STEPS) * 100)
      },
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

    if (action === "switch-tab") {
      const tab = target.dataset.tab;
      if (!tab) return;
      await actor.setFlag("pandorha", "sheetTab", tab);
      return;
    }

    if (action === "wizard-go-step") {
      const requestedStep = Number(target.dataset.step);
      if (!Number.isFinite(requestedStep)) return;
      const step = Math.min(WIZARD_STEPS, Math.max(1, requestedStep));
      await actor.setFlag("pandorha", "wizardStep", step);
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-prev" || action === "wizard-next") {
      const currentRaw = Number(actor.getFlag("pandorha", "wizardStep") ?? 1);
      const current = Number.isFinite(currentRaw) ? Math.min(WIZARD_STEPS, Math.max(1, currentRaw)) : 1;
      const requirement = action === "wizard-next" ? WIZARD_REQUIREMENTS[current] : undefined;
      if (requirement) {
        const value = actor.system.details?.[requirement.field];
        if (!value) {
          ui.notifications?.warn(`Selecione uma ${requirement.label} antes de continuar.`);
          return;
        }
      }

      const delta = action === "wizard-next" ? 1 : -1;
      const nextStep = Math.min(WIZARD_STEPS, Math.max(1, current + delta));
      await actor.setFlag("pandorha", "wizardStep", nextStep);
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-finish") {
      const missing = Object.values(WIZARD_REQUIREMENTS)
        .map(req => req.field)
        .find(field => !actor.system.details?.[field]);

      if (missing) {
        ui.notifications?.warn("Finalize ancestralidade, antecedente e classe antes de concluir.");
        return;
      }

      await actor.setFlag("pandorha", "sheetTab", "base");
      ui.notifications?.info("Criacao concluida. Voce ja pode ajustar os detalhes finais na aba Base.");
      return;
    }

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
      const nextStep = Number(target.dataset.nextStep ?? 0);
      if (!packId) return;
      const pack = game.packs?.get(packId);
      if (!pack) return;

      const index = await pack.getIndex();
      const options = index.map(entry => `<option value="${entry._id}">${entry.name}</option>`).join("");
      const content = `<form><div class="form-group"><label>Selecione</label><select name="entry">${options}</select></div></form>`;

      new Dialog({
        title: "Adicionar do Compendio",
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
              // Avoid silent failures from duplicate embedded document ids.
              delete data._id;
              if (type) data.type = type;
              const originDetailsKey = {
                ancestry: "ancestry",
                background: "background",
                class: "class"
              }[type];

              if (originDetailsKey) {
                const previous = actor.items.filter(i => i.type === type).map(i => i.id);
                if (previous.length) await actor.deleteEmbeddedDocuments("Item", previous);
              }

              const created = await actor.createEmbeddedDocuments("Item", [data]);

              if (originDetailsKey && created?.[0]) {
                await actor.update({ [`system.details.${originDetailsKey}`]: created[0].name });
              }

              if (Number.isFinite(nextStep) && nextStep >= 1 && nextStep <= WIZARD_STEPS) {
                await actor.setFlag("pandorha", "sheetTab", "criacao");
                await actor.setFlag("pandorha", "wizardStep", nextStep);
              }
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

