import { rollTest, rollSkill, rollItem, rollItemDamage } from "../data/rolls.mjs";
import { SKILLS } from "../data/skills.mjs";

export class PandorhaActorSheet extends foundry.applications.sheets.ActorSheetV2 {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["pandorha", "sheet", "actor"],
    template: "templates/actor/actor.hbs",
    width: 900,
    height: 720,
    position: { width: 900, height: 720 }
  });

  async _prepareContext(options) {
    const context = await super._prepareContext(options);

    const items = this.actor.items.map(i => i.toObject());
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
      trained: this.actor.system.skills?.[skill.id]?.trained ?? false,
      bonus: this.actor.system.skills?.[skill.id]?.bonus ?? 0
    }));

    return {
      ...context,
      system: this.actor.system,
      items: byType,
      skills,
      isCharacter: this.actor.type === "character",
      isNpc: this.actor.type === "npc",
      isMonster: this.actor.type === "monster"
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    const root = this.element;
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
        await rollTest({ actor: this.actor, eixo, aplicacao, bonus, trained, mapStep, label: "Teste Global" });
      });
    }

    root.querySelectorAll("[data-action='roll-skill']").forEach(button => {
      button.addEventListener("click", async event => {
        event.preventDefault();
        const skillId = button.getAttribute("data-skill-id");
        const skill = SKILLS.find(s => s.id === skillId);
        if (!skill) return;
        await rollSkill({ actor: this.actor, skill });
      });
    });

    root.querySelectorAll("[data-action='item-roll']").forEach(button => {
      button.addEventListener("click", async event => {
        event.preventDefault();
        const itemId = button.getAttribute("data-item-id");
        const item = this.actor.items.get(itemId);
        if (!item) return;
        const mapValue = root.querySelector("[name='roll-map']")?.value ?? "auto";
        const mapStep = mapValue === "auto" ? "auto" : Number(mapValue);
        await rollItem({ actor: this.actor, item, mapStep });
      });
    });

    root.querySelectorAll("[data-action='item-damage']").forEach(button => {
      button.addEventListener("click", async event => {
        event.preventDefault();
        const itemId = button.getAttribute("data-item-id");
        const item = this.actor.items.get(itemId);
        if (!item) return;
        await rollItemDamage({ actor: this.actor, item });
      });
    });

    root.querySelectorAll("[data-action='item-create']").forEach(button => {
      button.addEventListener("click", async event => {
        event.preventDefault();
        const type = button.getAttribute("data-item-type");
        if (!type) return;
        await this.actor.createEmbeddedDocuments("Item", [{ name: `Novo ${type}`, type }]);
      });
    });

    root.querySelectorAll("[data-action='item-edit']").forEach(button => {
      button.addEventListener("click", event => {
        event.preventDefault();
        const itemId = button.getAttribute("data-item-id");
        const item = this.actor.items.get(itemId);
        item?.sheet?.render(true);
      });
    });

    root.querySelectorAll("[data-action='item-delete']").forEach(button => {
      button.addEventListener("click", async event => {
        event.preventDefault();
        const itemId = button.getAttribute("data-item-id");
        if (!itemId) return;
        await this.actor.deleteEmbeddedDocuments("Item", [itemId]);
      });
    });
  }
}
