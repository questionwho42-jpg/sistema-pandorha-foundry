import { rollItem, rollItemDamage, rollSkill, rollTest, postItemDescription } from "../data/rolls.mjs";
import { SKILLS } from "../data/skills.mjs";

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

const ACTOR_TYPE_LABELS = {
  character: "Personagem",
  npc: "NPC",
  monster: "Monstro"
};

export class PandorhaQuickbar {
  constructor() {
    this.id = "pandorha-quickbar";
    this.element = null;
    this.mapValue = "auto";
    this._refreshPromise = null;
    this._onClickBound = this._onClick.bind(this);
    this._onChangeBound = this._onChange.bind(this);
    this._onResizeBound = this.refreshPosition.bind(this);
  }

  async activate() {
    this._ensureElement();
    window.addEventListener("resize", this._onResizeBound);
    await this.refresh();
  }

  destroy() {
    window.removeEventListener("resize", this._onResizeBound);
    if (!this.element) return;
    this.element.removeEventListener("click", this._onClickBound);
    this.element.removeEventListener("change", this._onChangeBound);
    this.element.remove();
    this.element = null;
  }

  async refresh() {
    if (this._refreshPromise) return this._refreshPromise;
    this._refreshPromise = this._render().finally(() => {
      this._refreshPromise = null;
    });
    return this._refreshPromise;
  }

  async _render() {
    this._ensureElement();

    const actor = this._getSelectedActor();
    const expanded = Boolean(game.settings.get("pandorha", "quickbarExpanded"));
    const context = this._buildContext({ actor, expanded });
    const html = await renderTemplate("systems/pandorha/templates/ui/quickbar.hbs", context);
    this.element.innerHTML = html;
    this.element.dataset.expanded = expanded ? "true" : "false";
    this.refreshPosition();
  }

  refreshPosition() {
    if (!this.element) return;

    const hotbar = document.getElementById("hotbar");
    if (!hotbar) return;

    const hotbarRect = hotbar.getBoundingClientRect();
    const width = this.element.offsetWidth || (this.element.dataset.expanded === "true" ? 340 : 42);
    const left = Math.max(72, Math.round(hotbarRect.left - width - 10));
    const bottom = Math.max(8, Math.round(window.innerHeight - hotbarRect.bottom));

    this.element.style.left = `${left}px`;
    this.element.style.bottom = `${bottom}px`;
  }

  _buildContext({ actor, expanded }) {
    const hasActor = Boolean(actor);
    if (!hasActor) {
      return {
        expanded,
        hasActor: false
      };
    }

    const skills = SKILLS.map((skill) => ({
      id: skill.id,
      label: skill.label,
      trained: Boolean(actor.system.skills?.[skill.id]?.trained),
      bonus: Number(actor.system.skills?.[skill.id]?.bonus ?? 0)
    }));

    const rollItems = actor.items
      .filter((item) => this._isItemRollable(item))
      .map((item) => ({
        id: item.id,
        name: item.name,
        typeLabel: ITEM_TYPE_LABELS[item.type] ?? item.type,
        hasDamage: Boolean(item.system?.damage || item.system?.weapon?.damage),
        hasDescription: Boolean(String(item.system?.description ?? item.system?.effect ?? "").trim())
      }))
      .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

    return {
      expanded,
      hasActor: true,
      actorName: actor.name,
      actorType: ACTOR_TYPE_LABELS[actor.type] ?? actor.type,
      tokenImage: this._getSelectedToken()?.texture?.src || actor.img || "icons/svg/mystery-man.svg",
      hp: actor.system.resources?.hp ?? { value: 0, max: 0 },
      pv: actor.system.resources?.pv ?? { value: 0, max: 0 },
      ee: actor.system.resources?.ee ?? { value: 0, max: 0 },
      actions: actor.system.resources?.actions ?? { value: 0, max: 0 },
      ca: Number(actor.system.defenses?.ca ?? 0),
      initiative: Number(actor.system.derived?.initiative ?? 0),
      skills,
      rollItems,
      mapValue: this.mapValue
    };
  }

  async _onClick(event) {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const action = button.dataset.action;
    if (!action) return;

    event.preventDefault();

    if (action === "quickbar-toggle") {
      const next = !Boolean(game.settings.get("pandorha", "quickbarExpanded"));
      await game.settings.set("pandorha", "quickbarExpanded", next);
      await this.refresh();
      return;
    }

    const actor = this._getSelectedActor();
    if (!actor) {
      ui.notifications?.warn("Selecione um token para usar a barra rapida.");
      return;
    }

    if (action === "quickbar-open-sheet") {
      actor.sheet?.render(true);
      return;
    }

    if (action === "quickbar-roll-initiative") {
      await actor.rollInitiative({
        createCombatants: true,
        rerollInitiative: Boolean(event.shiftKey)
      });
      return;
    }

    if (action === "quickbar-roll-test") {
      const eixo = this._getFieldValue("quickbar-roll-eixo", "fisico");
      const aplicacao = this._getFieldValue("quickbar-roll-aplicacao", "conflito");
      const bonus = Number(this._getFieldValue("quickbar-roll-bonus", "0")) || 0;
      const trained = Boolean(this._getField("quickbar-roll-trained")?.checked ?? true);
      const mapRaw = this._getFieldValue("quickbar-roll-map", "auto");
      const mapStep = mapRaw === "auto" ? "auto" : Number(mapRaw);
      await rollTest({
        actor,
        eixo,
        aplicacao,
        bonus,
        trained,
        mapStep,
        label: "Teste Rapido"
      });
      return;
    }

    if (action === "quickbar-roll-skill") {
      const skillId = button.dataset.skillId;
      const skill = SKILLS.find((entry) => entry.id === skillId);
      if (!skill) return;
      await rollSkill({ actor, skill });
      return;
    }

    if (["quickbar-item-roll", "quickbar-item-damage", "quickbar-item-description"].includes(action)) {
      const itemId = button.dataset.itemId;
      const item = actor.items.get(itemId);
      if (!item) return;

      if (action === "quickbar-item-roll") {
        const mapRaw = this._getFieldValue("quickbar-roll-map", "auto");
        const mapStep = mapRaw === "auto" ? "auto" : Number(mapRaw);
        await rollItem({ actor, item, mapStep });
        return;
      }

      if (action === "quickbar-item-damage") {
        await rollItemDamage({ actor, item });
        return;
      }

      await postItemDescription({ actor, item });
    }
  }

  _onChange(event) {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;
    if (target.name === "quickbar-roll-map") this.mapValue = target.value || "auto";
  }

  _ensureElement() {
    let element = document.getElementById(this.id);
    if (!element) {
      element = document.createElement("section");
      element.id = this.id;
      element.className = "pandorha-quickbar";
      document.body.appendChild(element);
    }

    if (!this.element) {
      element.addEventListener("click", this._onClickBound);
      element.addEventListener("change", this._onChangeBound);
    }

    this.element = element;
  }

  _getField(name) {
    return this.element?.querySelector?.(`[name='${name}']`) ?? null;
  }

  _getFieldValue(name, fallback = "") {
    const field = this._getField(name);
    return field?.value ?? fallback;
  }

  _getSelectedToken() {
    return canvas?.tokens?.controlled?.[0] ?? null;
  }

  _getSelectedActor() {
    return this._getSelectedToken()?.actor ?? null;
  }

  _isItemRollable(item) {
    if (!item) return false;
    if (ROLLABLE_ITEM_TYPES.has(item.type)) return true;
    return Boolean(item.system?.roll?.axis || item.system?.damage || item.system?.weapon?.damage);
  }
}
