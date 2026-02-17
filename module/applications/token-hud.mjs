import { rollItem, rollItemDamage, rollSkill, rollTest, postItemDescription } from "../data/rolls.mjs";
import { SKILLS } from "../data/skills.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;

const ROLLABLE_ITEM_TYPES = new Set([
  "weapon",
  "maneuver",
  "spell",
  "feature",
  "ability",
  "talent",
  "trait",
  "condition",
  "disease",
  "toxin"
]);

const ITEM_TYPE_LABELS = {
  weapon: "Arma",
  maneuver: "Manobra",
  spell: "Magia",
  feature: "Caracteristica",
  ability: "Habilidade",
  talent: "Talento",
  trait: "Traco",
  condition: "Condicao",
  disease: "Enfermidade",
  toxin: "Toxina"
};

const ACTOR_TYPE_LABELS = {
  character: "Personagem",
  npc: "NPC",
  monster: "Monstro"
};

export class PandorhaTokenHud extends HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {
  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    id: "pandorha-token-hud",
    classes: ["pandorha", "token-hud"],
    tag: "section",
    position: {
      width: 340,
      height: 360
    },
    window: {
      title: "Pandorha | Rolagem Rapida",
      icon: "fa-solid fa-heart-pulse",
      minimizable: true,
      resizable: false
    },
    actions: {
      "hud-open-sheet": function (event, target) { return this._onClickAction(event, target); },
      "hud-roll-initiative": function (event, target) { return this._onClickAction(event, target); },
      "hud-roll-test": function (event, target) { return this._onClickAction(event, target); },
      "hud-roll-skill": function (event, target) { return this._onClickAction(event, target); },
      "hud-item-roll": function (event, target) { return this._onClickAction(event, target); },
      "hud-item-damage": function (event, target) { return this._onClickAction(event, target); },
      "hud-item-description": function (event, target) { return this._onClickAction(event, target); }
    }
  });

  static PARTS = {
    main: {
      template: "systems/pandorha/templates/ui/token-hud.hbs"
    }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const token = this._getControlledToken();
    const actor = token?.actor ?? null;
    if (!actor) {
      return {
        ...context,
        hasActor: false
      };
    }

    const skills = SKILLS.map((skill) => ({
      ...skill,
      trained: Boolean(actor.system.skills?.[skill.id]?.trained),
      bonus: Number(actor.system.skills?.[skill.id]?.bonus ?? 0)
    }));

    const rollItems = actor.items
      .filter((item) => this._isItemRollable(item))
      .map((item) => {
        const damage = item.system?.damage || item.system?.weapon?.damage || "";
        const description = item.system?.description || item.system?.effect || "";
        return {
          id: item.id,
          name: item.name,
          type: item.type,
          typeLabel: ITEM_TYPE_LABELS[item.type] ?? item.type,
          hasDamage: Boolean(damage),
          hasDescription: Boolean(String(description).trim())
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

    const statuses = actor.effects
      .filter((effect) => !effect.disabled)
      .map((effect) => ({
        id: effect.id,
        label: effect.name,
        icon: effect.img || effect.icon || "icons/svg/aura.svg"
      }))
      .sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));

    return {
      ...context,
      hasActor: true,
      actor,
      actorTypeLabel: ACTOR_TYPE_LABELS[actor.type] ?? actor.type,
      tokenImage: token.texture?.src || actor.img || "icons/svg/mystery-man.svg",
      hp: actor.system.resources?.hp ?? { value: 0, max: 0 },
      pv: actor.system.resources?.pv ?? { value: 0, max: 0 },
      ee: actor.system.resources?.ee ?? { value: 0, max: 0 },
      actions: actor.system.resources?.actions ?? { value: 0, max: 0 },
      ca: Number(actor.system.defenses?.ca ?? 0),
      initiative: Number(actor.system.derived?.initiative ?? 0),
      skills,
      rollItems,
      statuses
    };
  }

  async _onRender(context, options) {
    await super._onRender(context, options);
    this._syncCompactSize(context?.hasActor ?? false);
    this.refreshPosition();
  }

  _syncCompactSize(hasActor) {
    const element = this._getElementNode();
    if (!element) return;

    const width = 340;
    const height = hasActor ? 360 : 110;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
  }

  refreshPosition() {
    const element = this._getElementNode();
    const hotbar = document.getElementById("hotbar");
    if (!element || !hotbar) return;

    const hotbarBox = hotbar.getBoundingClientRect();
    const sidebar = document.getElementById("sidebar");
    const width = element.offsetWidth || this.position.width || 340;
    const sidebarLeft = sidebar?.getBoundingClientRect?.().left ?? window.innerWidth;
    const maxLeft = Math.max(84, Math.floor(sidebarLeft - width - 12));
    const computedLeft = Math.round(hotbarBox.left - width - 8);
    const left = Math.max(84, Math.min(computedLeft, maxLeft));
    const bottom = Math.max(12, Math.round(window.innerHeight - hotbarBox.bottom));

    element.style.position = "fixed";
    element.style.left = `${left}px`;
    element.style.right = "auto";
    element.style.top = "auto";
    element.style.bottom = `${bottom}px`;
    element.style.zIndex = "58";
  }

  async _onClickAction(event, target) {
    const action = target?.dataset?.action;
    if (!action) return super._onClickAction?.(event, target);

    event.preventDefault();

    const actor = this._getControlledToken()?.actor ?? null;
    if (!actor) {
      ui.notifications?.warn("Selecione um token para usar o HUD Pandorha.");
      return;
    }

    const root = this._getElementNode();
    const findField = (name) => root?.querySelector?.(`[name='${name}']`);

    if (action === "hud-open-sheet") {
      actor.sheet?.render(true);
      return;
    }

    if (action === "hud-roll-initiative") {
      await actor.rollInitiative({
        createCombatants: true,
        rerollInitiative: Boolean(event?.shiftKey)
      });
      return;
    }

    if (action === "hud-roll-test") {
      const eixo = findField("hud-roll-eixo")?.value ?? "fisico";
      const aplicacao = findField("hud-roll-aplicacao")?.value ?? "conflito";
      const bonusRaw = findField("hud-roll-bonus")?.value ?? "0";
      const trained = findField("hud-roll-trained")?.checked ?? true;
      const mapValue = findField("hud-roll-map")?.value ?? "auto";
      const mapStep = mapValue === "auto" ? "auto" : Number(mapValue);
      const bonus = Number(bonusRaw) || 0;
      await rollTest({ actor, eixo, aplicacao, bonus, trained, mapStep, label: "Teste Rapido" });
      return;
    }

    if (action === "hud-roll-skill") {
      const skillId = target.dataset.skillId;
      const skill = SKILLS.find((entry) => entry.id === skillId);
      if (!skill) return;
      await rollSkill({ actor, skill });
      return;
    }

    if (["hud-item-roll", "hud-item-damage", "hud-item-description"].includes(action)) {
      const itemId = target.dataset.itemId;
      if (!itemId) return;
      const item = actor.items.get(itemId);
      if (!item) return;

      if (action === "hud-item-roll") {
        const mapValue = findField("hud-roll-map")?.value ?? "auto";
        const mapStep = mapValue === "auto" ? "auto" : Number(mapValue);
        await rollItem({ actor, item, mapStep });
        return;
      }

      if (action === "hud-item-damage") {
        await rollItemDamage({ actor, item });
        return;
      }

      if (action === "hud-item-description") {
        await postItemDescription({ actor, item });
        return;
      }
    }

    return super._onClickAction?.(event, target);
  }

  _getControlledToken() {
    const controlled = canvas?.tokens?.controlled ?? [];
    return controlled[0] ?? null;
  }

  _isItemRollable(item) {
    if (!item) return false;
    if (ROLLABLE_ITEM_TYPES.has(item.type)) return true;
    return Boolean(item.system?.roll?.axis || item.system?.damage || item.system?.weapon?.damage);
  }

  _getElementNode() {
    if (!this.element) return null;
    if (this.element instanceof HTMLElement) return this.element;
    if (Array.isArray(this.element)) return this.element[0] ?? null;
    if (this.element.jquery) return this.element[0] ?? null;
    return this.element;
  }
}
