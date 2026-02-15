import { rollTest, rollSkill, rollItem, rollItemDamage } from "../data/rolls.mjs";
import { SKILLS } from "../data/skills.mjs";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const WIZARD_STEPS = 8;
const AXIS_KEYS = ["fisico", "mental", "social"];
const APPLICATION_KEYS = ["conflito", "interacao", "resistencia"];
const INITIAL_GOLD_LEVEL_1 = 50;
const INITIAL_EQUIPMENT_TYPES = ["weapon", "armor", "shield", "equipment", "consumable"];

const AXIS_LABELS = {
  fisico: "Fisico",
  mental: "Mental",
  social: "Social"
};

const APPLICATION_LABELS = {
  conflito: "Conflito",
  interacao: "Interacao",
  resistencia: "Resistencia"
};

const EQUIPMENT_RULES = {
  load: {
    formula: "[Fisico + Resistencia] + 6 Slots",
    penalties: [
      "Slots acima do limite: condicao Lento (-3m de movimento).",
      "Slots acima do limite + 5: condicao Imobilizado."
    ]
  },
  slotTable: [
    { item: "Armas curtas (espadas, adagas)", slots: "1 Slot" },
    { item: "Armas longas (cajados, arcos)", slots: "2 Slots" },
    { item: "Armaduras leves e medias", slots: "1 Slot" },
    { item: "Armaduras pesadas", slots: "2 Slots" },
    { item: "Escudos", slots: "1 Slot (leve), 2 Slots (torre)" },
    { item: "Itens de aventura", slots: "1 Slot a cada 3 unidades" },
    { item: "Pocoes, pergaminhos e moedas", slots: "0 Slot" }
  ],
  quality: [
    { level: "0", name: "Mundano", price: "Base", bonus: "Item padrao, 1 slot de runa (R)." },
    { level: "1", name: "Obra-Prima", price: "x10", bonus: "+1 Acerto ou -1 Penalidade, 2 slots (RR)." },
    { level: "2", name: "Encantado", price: "x50", bonus: "+1 Dano/CA e efeito magico, 3 slots (RRR)." },
    { level: "3", name: "Lendario", price: "x200", bonus: "Poder unico, 4 slots (RRRR)." }
  ],
  runes: [
    { grade: "Menor", level: "1", price: "100 O", requirement: "Sem requisito." },
    { grade: "Maior", level: "2", price: "500 O", requirement: "Item Encantado (NV 2+)." },
    { grade: "Ancestral", level: "3", price: "2500 O", requirement: "Item Lendario (NV 3)." }
  ]
};

function clampInteger(value, min, max, fallback = min) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  const i = Math.trunc(n);
  return Math.min(max, Math.max(min, i));
}

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function itemToContext(item) {
  return {
    _id: item.id,
    name: item.name,
    type: item.type,
    system: item.system
  };
}

function parsePriceToGold(rawPrice) {
  const text = String(rawPrice ?? "").trim();
  if (!text) return 0;

  const normalized = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  let total = 0;
  const matches = [...normalized.matchAll(/(\d+(?:[.,]\d+)?)\s*([opc])/g)];
  for (const match of matches) {
    const value = Number(match[1].replace(",", ".")) || 0;
    const unit = match[2];
    if (unit === "o") total += value;
    else if (unit === "p") total += value / 10;
    else if (unit === "c") total += value / 100;
  }

  if (total > 0) return total;
  const fallback = Number(normalized.replace(",", "."));
  return Number.isFinite(fallback) ? fallback : 0;
}

function formatGold(value) {
  const n = Number(value) || 0;
  if (Number.isInteger(n)) return `${n} O`;
  return `${n.toFixed(2)} O`;
}

export class PandorhaActorSheet extends HandlebarsApplicationMixin(foundry.applications.sheets.ActorSheetV2) {
  static _packCache = new Map();

  static DEFAULT_OPTIONS = foundry.utils.mergeObject(super.DEFAULT_OPTIONS, {
    classes: ["pandorha", "sheet", "actor"],
    position: { width: 900, height: 720 },
    actions: {
      "switch-tab": function (event, target) { return this._onClickAction(event, target); },
      "roll-test": function (event, target) { return this._onClickAction(event, target); },
      "roll-initiative": function (event, target) { return this._onClickAction(event, target); },
      "roll-skill": function (event, target) { return this._onClickAction(event, target); },
      "item-roll": function (event, target) { return this._onClickAction(event, target); },
      "item-damage": function (event, target) { return this._onClickAction(event, target); },
      "item-create": function (event, target) { return this._onClickAction(event, target); },
      "item-edit": function (event, target) { return this._onClickAction(event, target); },
      "item-delete": function (event, target) { return this._onClickAction(event, target); },
      "item-toggle-equipped": function (event, target) { return this._onClickAction(event, target); },
      "open-compendium": function (event, target) { return this._onClickAction(event, target); },
      "add-from-pack": function (event, target) { return this._onClickAction(event, target); },
      "wizard-prev": function (event, target) { return this._onClickAction(event, target); },
      "wizard-next": function (event, target) { return this._onClickAction(event, target); },
      "wizard-go-step": function (event, target) { return this._onClickAction(event, target); },
      "wizard-finish": function (event, target) { return this._onClickAction(event, target); },
      "wizard-apply-attributes": function (event, target) { return this._onClickAction(event, target); },
      "wizard-select-ancestry": function (event, target) { return this._onClickAction(event, target); },
      "wizard-set-ancestry-bonus": function (event, target) { return this._onClickAction(event, target); },
      "wizard-add-ancestry-trait": function (event, target) { return this._onClickAction(event, target); },
      "wizard-select-background": function (event, target) { return this._onClickAction(event, target); },
      "wizard-add-background-talent": function (event, target) { return this._onClickAction(event, target); },
      "wizard-select-class": function (event, target) { return this._onClickAction(event, target); },
      "wizard-add-class-talent": function (event, target) { return this._onClickAction(event, target); },
      "wizard-add-maneuver": function (event, target) { return this._onClickAction(event, target); },
      "wizard-add-spell": function (event, target) { return this._onClickAction(event, target); },
      "wizard-buy-equipment": function (event, target) { return this._onClickAction(event, target); },
      "wizard-remove-equipment": function (event, target) { return this._onClickAction(event, target); }
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
      backgrounds: items.filter(i => i.type === "background"),
      traits: items.filter(i => i.type === "trait"),
      classes: items.filter(i => i.type === "class"),
      talents: items.filter(i => i.type === "talent"),
      maneuvers: items.filter(i => i.type === "maneuver"),
      spells: items.filter(i => i.type === "spell"),
      conditions: items.filter(i => i.type === "condition"),
      diseases: items.filter(i => i.type === "disease"),
      toxins: items.filter(i => i.type === "toxin"),
      armors: items.filter(i => i.type === "armor"),
      shields: items.filter(i => i.type === "shield"),
      consumables: items.filter(i => i.type === "consumable"),
      gear: items.filter(i => i.type === "equipment"),
      runes: items.filter(i => i.type === "rune"),
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
    const wizardSummary = this._getWizardSummary();
    const wizardChecks = this._computeWizardChecks(wizardSummary);

    const wizardSteps = [
      { number: 1, label: "Atributos", done: wizardChecks[1] },
      { number: 2, label: "Ancestralidade", done: wizardChecks[2] },
      { number: 3, label: "Antecedente", done: wizardChecks[3] },
      { number: 4, label: "Classe", done: wizardChecks[4] },
      { number: 5, label: "Manobras", done: wizardChecks[5] },
      { number: 6, label: "Pericias e Magias", done: wizardChecks[6] },
      { number: 7, label: "Equipamentos", done: wizardChecks[7] },
      { number: 8, label: "Revisao", done: wizardChecks[8] }
    ];

    const ancestryPrimaryOptions = wizardSummary.ancestryProfile.primaryOptions.map(option => ({
      ...option,
      selected:
        wizardSummary.creation.ancestryBonusPrimary?.scope === option.scope
        && wizardSummary.creation.ancestryBonusPrimary?.key === option.key
    }));

    const ancestryExtraOptions = wizardSummary.ancestryProfile.extraApplication
      ? APPLICATION_KEYS.map(key => ({
        key,
        label: APPLICATION_LABELS[key],
        selected: wizardSummary.creation.ancestryBonusExtra === key
      }))
      : [];

    const maneuversAxes = AXIS_KEYS.map(axis => ({
      id: axis,
      label: AXIS_LABELS[axis],
      required: wizardSummary.requiredManeuvers[axis],
      selectedCount: wizardSummary.maneuversByAxis[axis].length,
      items: wizardSummary.maneuversByAxis[axis]
    }));

    return {
      ...context,
      system: this.document.system,
      items: byType,
      skills,
      activeTab,
      wizard: {
        step: wizardSummary.creation.step,
        total: WIZARD_STEPS,
        progress: Math.round((wizardSummary.creation.step / WIZARD_STEPS) * 100),
        canPrev: wizardSummary.creation.step > 1,
        canNext: wizardSummary.creation.step < WIZARD_STEPS,
        steps: wizardSteps,
        pools: wizardSummary.pools,
        totals: wizardSummary.totals,
        ancestry: {
          selected: wizardSummary.ancestryName,
          profileLabel: wizardSummary.ancestryProfile.label,
          primaryOptions: ancestryPrimaryOptions,
          extraOptions: ancestryExtraOptions,
          requiresExtraApplication: wizardSummary.ancestryProfile.extraApplication,
          traitCount: wizardSummary.ancestryTraits.length,
          traits: wizardSummary.ancestryTraits
        },
        background: {
          selected: wizardSummary.backgroundName,
          talentCount: wizardSummary.backgroundTalents.length,
          talents: wizardSummary.backgroundTalents,
          availableTalents: wizardSummary.backgroundTalentOptions
        },
        class: {
          selected: wizardSummary.className,
          passiveCount: wizardSummary.classPassive.length,
          passives: wizardSummary.classPassive,
          initialTalentCount: wizardSummary.classInitialTalents.length,
          initialTalents: wizardSummary.classInitialTalents,
          isCaster: wizardSummary.classIsCaster,
          baseEe: wizardSummary.classBaseEe
        },
        maneuvers: {
          complete: wizardSummary.maneuversComplete,
          axes: maneuversAxes
        },
        equipment: {
          budgetGold: formatGold(wizardSummary.equipmentBudgetGold),
          spentGold: formatGold(wizardSummary.equipmentSpentGold),
          remainingGold: formatGold(wizardSummary.equipmentRemainingGold),
          withinBudget: wizardSummary.equipmentWithinBudget,
          items: wizardSummary.equipmentItems
        },
        spells: {
          requiredMin: wizardSummary.minimumInitialSpells,
          selectedCount: wizardSummary.selectedSpells.length,
          selected: wizardSummary.selectedSpells
        },
        trainedSkillsCount: wizardSummary.trainedSkillsCount,
        checklist: [
          { label: "Atributos 6/6 validos", done: wizardChecks[1] },
          { label: "Ancestralidade + bonus + 3 tracos", done: wizardChecks[2] },
          { label: "Antecedente + 1 talento de origem", done: wizardChecks[3] },
          { label: "Classe + passiva + 2 talentos iniciais", done: wizardChecks[4] },
          { label: "Manobras por Eixo selecionadas", done: wizardChecks[5] },
          { label: "Magias iniciais (se conjurador)", done: wizardChecks[6] },
          { label: "Equipamentos iniciais dentro do orcamento", done: wizardChecks[7] },
          { label: "Ficha pronta para jogar", done: wizardChecks[8] }
        ]
      },
      isCharacter: this.document.type === "character",
      isNpc: this.document.type === "npc",
      isMonster: this.document.type === "monster",
      equipmentRules: EQUIPMENT_RULES,
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
      const requestedStep = clampInteger(target.dataset.step, 1, WIZARD_STEPS, 1);
      if (requestedStep > 1) {
        for (let step = 1; step < requestedStep; step += 1) {
          if (!this._validateWizardStep(step, { notify: true })) {
            await this._updateCreationState({ step });
            await actor.setFlag("pandorha", "sheetTab", "criacao");
            return;
          }
        }
      }
      await this._updateCreationState({ step: requestedStep });
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-prev" || action === "wizard-next") {
      const creation = this._getCreationState();
      if (action === "wizard-next" && !this._validateWizardStep(creation.step, { notify: true })) return;
      const delta = action === "wizard-next" ? 1 : -1;
      const nextStep = clampInteger(creation.step + delta, 1, WIZARD_STEPS, creation.step);
      await this._updateCreationState({ step: nextStep });
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-apply-attributes") {
      const baseEixos = {
        fisico: clampInteger(root?.querySelector?.("[name='wizard-base-eixos-fisico']")?.value, 1, 3, 1),
        mental: clampInteger(root?.querySelector?.("[name='wizard-base-eixos-mental']")?.value, 1, 3, 1),
        social: clampInteger(root?.querySelector?.("[name='wizard-base-eixos-social']")?.value, 1, 3, 1)
      };
      const baseAplicacoes = {
        conflito: clampInteger(root?.querySelector?.("[name='wizard-base-aplicacoes-conflito']")?.value, 1, 3, 1),
        interacao: clampInteger(root?.querySelector?.("[name='wizard-base-aplicacoes-interacao']")?.value, 1, 3, 1),
        resistencia: clampInteger(root?.querySelector?.("[name='wizard-base-aplicacoes-resistencia']")?.value, 1, 3, 1)
      };

      if (!this._isPoolValid(baseEixos) || !this._isPoolValid(baseAplicacoes)) {
        ui.notifications?.warn("A distribuicao de Eixos e Aplicacoes deve ser 6/6, com minimo 1 e maximo 3.");
        return;
      }

      const nextCreation = foundry.utils.mergeObject(this._getCreationState(), { baseEixos, baseAplicacoes }, { inplace: false, recursive: true });
      const totals = this._computeCreationTotals(nextCreation);
      if (!this._totalsWithinLevelOneCap(totals)) {
        ui.notifications?.warn("Com os bonus raciais, nenhum Eixo ou Aplicacao pode passar de 4 no nivel 1.");
        return;
      }

      await this._setCreationState(nextCreation);
      await this._applyCreationTotals(nextCreation);
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      ui.notifications?.info("Atributos base atualizados.");
      return;
    }

    if (action === "wizard-select-ancestry") {
      const existingNames = new Set(actor.items.filter(i => i.type === "ancestry").map(i => i.name));
      const selected = await this._pickPackDocument({
        packId: "pandorha.ancestries",
        title: "Escolher Ancestralidade",
        filterFn: doc => !existingNames.has(doc.name)
      });
      if (!selected) return;

      await this._replaceSingleItemFromPack({
        doc: selected,
        type: "ancestry",
        detailsField: "ancestry"
      });
      await this._deleteItemsByPredicate(item => item.type === "trait");

      const resetCreation = foundry.utils.mergeObject(this._getCreationState(), {
        ancestryBonusPrimary: null,
        ancestryBonusExtra: null
      }, { inplace: false, recursive: true });
      await this._setCreationState(resetCreation);
      await this._applyCreationTotals(resetCreation);
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-set-ancestry-bonus") {
      const ancestryName = actor.system.details?.ancestry ?? "";
      if (!ancestryName) {
        ui.notifications?.warn("Escolha uma ancestralidade antes de definir bonus.");
        return;
      }

      const profile = this._getAncestryProfile(ancestryName);
      const slot = target.dataset.slot;
      const creation = this._getCreationState();
      const nextCreation = foundry.utils.deepClone(creation);

      if (slot === "primary") {
        const scope = target.dataset.scope;
        const key = target.dataset.key;
        const isAllowed = profile.primaryOptions.some(option => option.scope === scope && option.key === key);
        if (!isAllowed) {
          ui.notifications?.warn("Esse bonus nao e valido para essa ancestralidade.");
          return;
        }
        const sameSelection = creation.ancestryBonusPrimary?.scope === scope && creation.ancestryBonusPrimary?.key === key;
        nextCreation.ancestryBonusPrimary = sameSelection ? null : { scope, key };
      } else if (slot === "extra") {
        const key = target.dataset.key;
        if (!profile.extraApplication || !APPLICATION_KEYS.includes(key)) {
          ui.notifications?.warn("Bonus extra indisponivel para essa ancestralidade.");
          return;
        }
        nextCreation.ancestryBonusExtra = creation.ancestryBonusExtra === key ? null : key;
      } else {
        return;
      }

      const totals = this._computeCreationTotals(nextCreation);
      if (!this._totalsWithinLevelOneCap(totals)) {
        ui.notifications?.warn("Esse bonus ultrapassa o limite 4 no nivel 1.");
        return;
      }

      await this._setCreationState(nextCreation);
      await this._applyCreationTotals(nextCreation);
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-add-ancestry-trait") {
      const ancestryName = actor.system.details?.ancestry ?? "";
      if (!ancestryName) {
        ui.notifications?.warn("Escolha uma ancestralidade antes de adicionar tracos.");
        return;
      }

      const selectedTraits = actor.items.filter(i => i.type === "trait");
      if (selectedTraits.length >= 3) {
        ui.notifications?.warn("Voce ja escolheu os 3 tracos iniciais da ancestralidade.");
        return;
      }

      const ownedNames = new Set(selectedTraits.map(item => item.name));
      const selected = await this._pickPackDocument({
        packId: "pandorha.traits",
        title: `Escolher Traco de ${ancestryName}`,
        filterFn: doc => (doc.system?.details?.category === ancestryName) && !ownedNames.has(doc.name)
      });
      if (!selected) return;

      await this._createItemFromPackDocument(selected, "trait");
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-select-background") {
      const existingNames = new Set(actor.items.filter(i => i.type === "background").map(i => i.name));
      const selected = await this._pickPackDocument({
        packId: "pandorha.backgrounds",
        title: "Escolher Antecedente",
        filterFn: doc => !existingNames.has(doc.name)
      });
      if (!selected) return;

      await this._replaceSingleItemFromPack({
        doc: selected,
        type: "background",
        detailsField: "background"
      });

      await this._deleteItemsByPredicate(item => this._isBackgroundTalent(item));
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-add-background-talent") {
      const backgroundItem = actor.items.find(item => item.type === "background");
      if (!backgroundItem) {
        ui.notifications?.warn("Escolha um antecedente antes de selecionar talento.");
        return;
      }

      const options = this._extractBackgroundTalentOptions(backgroundItem);
      if (!options.length) {
        ui.notifications?.warn("Nao foi possivel ler os talentos desse antecedente.");
        return;
      }

      const choice = await this._pickSimpleOption({
        title: `Talento de ${backgroundItem.name}`,
        options: options.map(option => ({
          label: option.name,
          description: option.description,
          value: option
        }))
      });
      if (!choice) return;

      await this._deleteItemsByPredicate(item => this._isBackgroundTalent(item));

      const talentData = {
        name: choice.name,
        type: "talent",
        img: "icons/svg/book.svg",
        system: {
          description: `<p>${choice.description}</p>`,
          details: {
            source: backgroundItem.name,
            category: `Antecedente: ${backgroundItem.name}`,
            requirements: "Nivel 1",
            tags: ["origem"]
          }
        }
      };

      await actor.createEmbeddedDocuments("Item", [talentData]);
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-select-class") {
      const existingNames = new Set(actor.items.filter(i => i.type === "class").map(i => i.name));
      const selected = await this._pickPackDocument({
        packId: "pandorha.classes",
        title: "Escolher Classe",
        filterFn: doc => !existingNames.has(doc.name)
      });
      if (!selected) return;

      await this._deleteItemsByPredicate(item => this._isAnyClassStartingFeature(item));

      const createdClass = await this._replaceSingleItemFromPack({
        doc: selected,
        type: "class",
        detailsField: "class"
      });

      await this._ensureClassPassive(createdClass?.name ?? selected.name);
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-add-class-talent") {
      const className = actor.system.details?.class ?? "";
      if (!className) {
        ui.notifications?.warn("Escolha uma classe antes de selecionar talentos iniciais.");
        return;
      }

      const selectedTalents = actor.items.filter(item => this._isClassInitialTalent(item, className));
      if (selectedTalents.length >= 2) {
        ui.notifications?.warn("Voce ja escolheu os 2 talentos iniciais da classe.");
        return;
      }

      const ownedNames = new Set(selectedTalents.map(item => item.name));
      const selected = await this._pickPackDocument({
        packId: "pandorha.class-features",
        title: `Talento Inicial de ${className}`,
        filterFn: doc => (doc.system?.details?.category === `${className} - Talento Inicial`) && !ownedNames.has(doc.name)
      });
      if (!selected) return;

      await this._createItemFromPackDocument(selected, "feature");
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-add-maneuver") {
      const axis = target.dataset.axis;
      if (!AXIS_KEYS.includes(axis)) return;

      const summary = this._getWizardSummary();
      const required = summary.requiredManeuvers[axis] ?? 0;
      const selectedCount = summary.maneuversByAxis[axis]?.length ?? 0;
      if (selectedCount >= required) {
        ui.notifications?.warn(`Voce ja selecionou todas as manobras de ${AXIS_LABELS[axis]}.`);
        return;
      }

      const ownedNames = new Set((summary.maneuversByAxis[axis] ?? []).map(item => item.name));
      const selected = await this._pickPackDocument({
        packId: "pandorha.maneuvers",
        title: `Selecionar Manobra (${AXIS_LABELS[axis]})`,
        filterFn: doc => (doc.system?.roll?.axis === axis) && !ownedNames.has(doc.name)
      });
      if (!selected) return;

      await this._createItemFromPackDocument(selected, "maneuver");
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-add-spell") {
      const summary = this._getWizardSummary();
      if (!summary.classIsCaster) {
        ui.notifications?.warn("A classe atual nao possui selecao inicial de magias.");
        return;
      }

      const ownedNames = new Set(summary.selectedSpells.map(item => item.name));
      const selected = await this._pickPackDocument({
        packId: "pandorha.spells",
        title: "Selecionar Magia Inicial",
        filterFn: doc => (Number(doc.system?.circle ?? 0) <= 1) && !ownedNames.has(doc.name)
      });
      if (!selected) return;

      await this._createItemFromPackDocument(selected, "spell");
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-buy-equipment") {
      const budget = this._getInitialEquipmentBudgetGold();
      const currentSpent = this._getInitialEquipmentSpentGold();
      const selected = await this._pickPackDocument({
        packId: "pandorha.equipment",
        title: "Comprar Equipamento Inicial",
        filterFn: doc => INITIAL_EQUIPMENT_TYPES.includes(doc.type)
      });
      if (!selected) return;

      const itemCost = this._getItemPriceGold(selected);
      if ((currentSpent + itemCost) > budget) {
        ui.notifications?.warn(`Orcamento insuficiente. Saldo atual: ${formatGold(Math.max(budget - currentSpent, 0))}.`);
        return;
      }

      const created = await this._createItemFromPackDocument(selected, selected.type);
      if (created && ["weapon", "armor", "shield"].includes(created.type)) {
        const hasOtherEquippedSameType = actor.items.some(i =>
          i.type === created.type
          && i.id !== created.id
          && Boolean(i.system?.equipped)
        );
        if (!hasOtherEquippedSameType) {
          await created.update({ "system.equipped": true });
        }
      }

      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-remove-equipment") {
      const itemId = target.dataset.itemId;
      if (!itemId) return;
      const item = actor.items.get(itemId);
      if (!item || !INITIAL_EQUIPMENT_TYPES.includes(item.type)) return;
      await actor.deleteEmbeddedDocuments("Item", [itemId]);
      await actor.setFlag("pandorha", "sheetTab", "criacao");
      return;
    }

    if (action === "wizard-finish") {
      for (let step = 1; step <= 7; step += 1) {
        if (!this._validateWizardStep(step, { notify: true })) {
          await this._updateCreationState({ step });
          await actor.setFlag("pandorha", "sheetTab", "criacao");
          return;
        }
      }
      await this._updateCreationState({ step: WIZARD_STEPS });
      await actor.setFlag("pandorha", "creationComplete", true);
      await actor.setFlag("pandorha", "sheetTab", "base");
      ui.notifications?.info("Personagem criado. Continue os ajustes finos na aba Base.");
      return;
    }

    if (action === "roll-test") {
      const panel = target.closest(".tab-panel") ?? root;
      const scope = target.closest("[data-roll-context]") ?? panel ?? root;
      const findField = (name) =>
        scope?.querySelector?.(`[name='${name}']`)
        ?? panel?.querySelector?.(`[name='${name}']`)
        ?? root?.querySelector?.(`[name='${name}']`);

      const eixo = findField("roll-eixo")?.value;
      const aplicacao = findField("roll-aplicacao")?.value;
      const bonusRaw = findField("roll-bonus")?.value ?? "0";
      const trained = findField("roll-trained")?.checked ?? true;
      const mapValue = findField("roll-map")?.value ?? "auto";
      const mapStep = mapValue === "auto" ? "auto" : Number(mapValue);
      const bonus = Number(bonusRaw) || 0;
      await rollTest({ actor, eixo, aplicacao, bonus, trained, mapStep, label: "Teste Global" });
      return;
    }

    if (action === "roll-initiative") {
      await actor.rollInitiative({
        createCombatants: true,
        rerollInitiative: Boolean(event?.shiftKey)
      });
      return;
    }

    if (action === "roll-skill") {
      const skillId = target.dataset.skillId;
      const skill = SKILLS.find(s => s.id === skillId);
      if (!skill) return;
      await rollSkill({ actor, skill });
      return;
    }

    if (["item-roll", "item-damage", "item-edit", "item-delete", "item-toggle-equipped"].includes(action)) {
      const itemId = target.dataset.itemId;
      const item = actor.items.get(itemId);
      if (!item) return;

      if (action === "item-roll") {
        const panel = target.closest(".tab-panel") ?? root;
        const mapField = panel?.querySelector?.("[name='roll-map']") ?? root?.querySelector?.("[name='roll-map']");
        const mapValue = mapField?.value ?? "auto";
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

      if (action === "item-toggle-equipped") {
        const current = item.system?.equipped ?? false;
        await item.update({ "system.equipped": !current });
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

      const docs = await this._getPackDocuments(packId);
      const filteredDocs = docs.filter(doc => (type ? doc.type === type : true));
      if (!filteredDocs.length) {
        ui.notifications?.warn(type
          ? `Nenhum item do tipo ${type} encontrado neste compendio.`
          : "Nenhum item encontrado neste compendio.");
        return;
      }

      const options = filteredDocs
        .map((doc, index) => `<option value="${index}">${foundry.utils.escapeHTML(doc.name)}</option>`)
        .join("");
      const content = `<form><div class="form-group"><label>Selecione</label><select name="entry">${options}</select></div></form>`;

      new Dialog({
        title: "Adicionar do Compendio",
        content,
        buttons: {
          add: {
            icon: '<i class="fas fa-plus"></i>',
            label: "Adicionar",
            callback: async html => {
              const selectedIndex = Number(html.find("select[name='entry']").val());
              if (!Number.isFinite(selectedIndex)) return;
              const doc = filteredDocs[selectedIndex];
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

              if (created?.[0] && ["weapon", "armor", "shield"].includes(created[0].type)) {
                const hasOtherEquippedSameType = actor.items.some(i =>
                  i.type === created[0].type
                  && i.id !== created[0].id
                  && Boolean(i.system?.equipped)
                );
                if (!hasOtherEquippedSameType) {
                  await created[0].update({ "system.equipped": true });
                }
              }

              if (Number.isFinite(nextStep) && nextStep >= 1 && nextStep <= WIZARD_STEPS) {
                await actor.setFlag("pandorha", "sheetTab", "criacao");
                await this._updateCreationState({ step: nextStep });
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

  _getCreationState() {
    const raw = this.document.getFlag("pandorha", "creation");
    return this._coerceCreationState(raw);
  }

  _coerceCreationState(raw) {
    const defaults = this._getDefaultCreationState();
    if (!raw || typeof raw !== "object") return defaults;

    const merged = foundry.utils.mergeObject(defaults, raw, { inplace: false, recursive: true });
    merged.step = clampInteger(merged.step, 1, WIZARD_STEPS, 1);
    merged.baseEixos = this._sanitizePool(merged.baseEixos);
    merged.baseAplicacoes = this._sanitizePool(merged.baseAplicacoes);

    const validPrimary = merged.ancestryBonusPrimary
      && ["eixos", "aplicacoes"].includes(merged.ancestryBonusPrimary.scope)
      && ((merged.ancestryBonusPrimary.scope === "eixos" && AXIS_KEYS.includes(merged.ancestryBonusPrimary.key))
      || (merged.ancestryBonusPrimary.scope === "aplicacoes" && APPLICATION_KEYS.includes(merged.ancestryBonusPrimary.key)));
    if (!validPrimary) merged.ancestryBonusPrimary = null;

    if (!APPLICATION_KEYS.includes(merged.ancestryBonusExtra)) merged.ancestryBonusExtra = null;
    return merged;
  }

  _getDefaultCreationState() {
    const eixosCandidate = {
      fisico: Number(this.document.system.eixos?.fisico ?? 0),
      mental: Number(this.document.system.eixos?.mental ?? 0),
      social: Number(this.document.system.eixos?.social ?? 0)
    };
    const aplicacoesCandidate = {
      conflito: Number(this.document.system.aplicacoes?.conflito ?? 0),
      interacao: Number(this.document.system.aplicacoes?.interacao ?? 0),
      resistencia: Number(this.document.system.aplicacoes?.resistencia ?? 0)
    };

    return {
      step: 1,
      baseEixos: this._isPoolValid(eixosCandidate) ? this._sanitizePool(eixosCandidate) : { fisico: 2, mental: 2, social: 2 },
      baseAplicacoes: this._isPoolValid(aplicacoesCandidate) ? this._sanitizePool(aplicacoesCandidate) : { conflito: 2, interacao: 2, resistencia: 2 },
      ancestryBonusPrimary: null,
      ancestryBonusExtra: null
    };
  }

  _sanitizePool(pool) {
    const keys = Object.keys(pool ?? {});
    const source = keys.length === 3 ? pool : {};
    const fallback = keys.includes("fisico")
      ? { fisico: 2, mental: 2, social: 2 }
      : { conflito: 2, interacao: 2, resistencia: 2 };
    return Object.fromEntries(Object.entries(fallback).map(([key, value]) => [key, clampInteger(source[key], 1, 3, value)]));
  }

  _isPoolValid(pool) {
    const values = Object.values(pool ?? {});
    if (values.length !== 3) return false;
    const validRange = values.every(value => Number.isFinite(Number(value)) && Number(value) >= 1 && Number(value) <= 3);
    const total = values.reduce((sum, value) => sum + Number(value), 0);
    return validRange && total === 6;
  }

  _computeCreationTotals(creation) {
    const eixos = { ...creation.baseEixos };
    const aplicacoes = { ...creation.baseAplicacoes };

    if (creation.ancestryBonusPrimary?.scope === "eixos" && AXIS_KEYS.includes(creation.ancestryBonusPrimary.key)) {
      eixos[creation.ancestryBonusPrimary.key] += 1;
    }
    if (creation.ancestryBonusPrimary?.scope === "aplicacoes" && APPLICATION_KEYS.includes(creation.ancestryBonusPrimary.key)) {
      aplicacoes[creation.ancestryBonusPrimary.key] += 1;
    }
    if (creation.ancestryBonusExtra && APPLICATION_KEYS.includes(creation.ancestryBonusExtra)) {
      aplicacoes[creation.ancestryBonusExtra] += 1;
    }

    return { eixos, aplicacoes };
  }

  _totalsWithinLevelOneCap(totals) {
    const values = [...Object.values(totals.eixos ?? {}), ...Object.values(totals.aplicacoes ?? {})];
    return values.every(value => Number(value) <= 4);
  }

  async _setCreationState(nextState) {
    const safeState = this._coerceCreationState(nextState);
    await this.document.setFlag("pandorha", "creation", safeState);
    return safeState;
  }

  async _updateCreationState(patch) {
    const current = this._getCreationState();
    const merged = foundry.utils.mergeObject(current, patch, { inplace: false, recursive: true });
    return this._setCreationState(merged);
  }

  async _applyCreationTotals(creation) {
    const totals = this._computeCreationTotals(creation);
    await this.document.update({
      "system.eixos.fisico": totals.eixos.fisico,
      "system.eixos.mental": totals.eixos.mental,
      "system.eixos.social": totals.eixos.social,
      "system.aplicacoes.conflito": totals.aplicacoes.conflito,
      "system.aplicacoes.interacao": totals.aplicacoes.interacao,
      "system.aplicacoes.resistencia": totals.aplicacoes.resistencia
    });
  }

  _getAncestryProfile(ancestryName) {
    const normalized = normalizeText(ancestryName);
    const allPrimary = [
      ...AXIS_KEYS.map(key => ({ scope: "eixos", key, label: AXIS_LABELS[key] })),
      ...APPLICATION_KEYS.map(key => ({ scope: "aplicacoes", key, label: APPLICATION_LABELS[key] }))
    ];

    if (normalized.includes("humano")) {
      return {
        label: "Humano: +1 livre (Eixo ou Aplicacao) e +1 Aplicacao extra",
        primaryOptions: allPrimary,
        extraApplication: true
      };
    }
    if (normalized.includes("elf")) {
      return {
        label: "Elfo: +1 Mental ou +1 Interacao",
        primaryOptions: [
          { scope: "eixos", key: "mental", label: AXIS_LABELS.mental },
          { scope: "aplicacoes", key: "interacao", label: APPLICATION_LABELS.interacao }
        ],
        extraApplication: false
      };
    }
    if (normalized.includes("anao")) {
      return {
        label: "Anao: +1 Fisico ou +1 Resistencia",
        primaryOptions: [
          { scope: "eixos", key: "fisico", label: AXIS_LABELS.fisico },
          { scope: "aplicacoes", key: "resistencia", label: APPLICATION_LABELS.resistencia }
        ],
        extraApplication: false
      };
    }
    if (normalized.includes("drakari")) {
      return {
        label: "Drakari: +1 Fisico ou +1 Conflito",
        primaryOptions: [
          { scope: "eixos", key: "fisico", label: AXIS_LABELS.fisico },
          { scope: "aplicacoes", key: "conflito", label: APPLICATION_LABELS.conflito }
        ],
        extraApplication: false
      };
    }
    if (normalized.includes("umbra")) {
      return {
        label: "Umbrai: +1 Social ou +1 Interacao",
        primaryOptions: [
          { scope: "eixos", key: "social", label: AXIS_LABELS.social },
          { scope: "aplicacoes", key: "interacao", label: APPLICATION_LABELS.interacao }
        ],
        extraApplication: false
      };
    }
    if (normalized.includes("fera")) {
      return {
        label: "Fera: +1 Fisico ou +1 Interacao",
        primaryOptions: [
          { scope: "eixos", key: "fisico", label: AXIS_LABELS.fisico },
          { scope: "aplicacoes", key: "interacao", label: APPLICATION_LABELS.interacao }
        ],
        extraApplication: false
      };
    }

    return {
      label: "Selecione uma ancestralidade para liberar os bonus",
      primaryOptions: [],
      extraApplication: false
    };
  }

  _extractBackgroundTalentOptions(backgroundItem) {
    const html = backgroundItem?.system?.description ?? "";
    if (!html) return [];

    const plain = html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/\r/g, "");
    const marker = plain.split(/Talentos d[oa] .*?\(Escolha 1\)/i);
    const section = marker[1] ?? "";
    if (!section) return [];

    const options = [];
    const lines = section.split("\n").map(line => line.trim()).filter(Boolean);
    for (const line of lines) {
      if (/^##\s*\d+/.test(line)) break;
      const match = line.match(/^- \*\*(.+?)\*\*\s*:?\s*(.+)$/);
      if (!match) continue;
      const name = match[1].replace(/:\s*$/, "").trim();
      const description = match[2].trim();
      if (!name || !description) continue;
      options.push({
        name,
        description: description.replace(/\*\*/g, "").trim()
      });
    }
    return options.slice(0, 3);
  }

  _isBackgroundTalent(item) {
    if (item.type !== "talent") return false;
    const category = item.system?.details?.category ?? "";
    return String(category).startsWith("Antecedente:");
  }

  _isClassInitialTalent(item, className) {
    if (!className || item.type !== "feature") return false;
    return item.system?.details?.category === `${className} - Talento Inicial`;
  }

  _isClassPassive(item, className) {
    if (!className || item.type !== "feature") return false;
    return item.system?.details?.category === `${className} - Passiva`;
  }

  _isAnyClassStartingFeature(item) {
    if (item.type !== "feature") return false;
    const category = String(item.system?.details?.category ?? "");
    return category.endsWith(" - Talento Inicial") || category.endsWith(" - Passiva");
  }

  _getInitialEquipmentBudgetGold() {
    return INITIAL_GOLD_LEVEL_1;
  }

  _getInitialEquipmentItems() {
    return this.document.items.filter(item => INITIAL_EQUIPMENT_TYPES.includes(item.type));
  }

  _getItemPriceGold(itemOrDoc) {
    const priceRaw = itemOrDoc?.system?.price ?? "";
    const quantity = Math.max(1, Number(itemOrDoc?.system?.quantity ?? 1) || 1);
    return parsePriceToGold(priceRaw) * quantity;
  }

  _getInitialEquipmentSpentGold() {
    return this._getInitialEquipmentItems().reduce((sum, item) => sum + this._getItemPriceGold(item), 0);
  }

  _getWizardSummary() {
    const actor = this.document;
    const creation = this._getCreationState();
    const totals = this._computeCreationTotals(creation);
    const totalsWithinCap = this._totalsWithinLevelOneCap(totals);

    const pools = {
      baseEixos: creation.baseEixos,
      baseAplicacoes: creation.baseAplicacoes,
      eixosSpent: Object.values(creation.baseEixos).reduce((sum, value) => sum + Number(value), 0),
      aplicacoesSpent: Object.values(creation.baseAplicacoes).reduce((sum, value) => sum + Number(value), 0)
    };
    pools.eixosRemaining = 6 - pools.eixosSpent;
    pools.aplicacoesRemaining = 6 - pools.aplicacoesSpent;
    pools.eixosValid = this._isPoolValid(creation.baseEixos);
    pools.aplicacoesValid = this._isPoolValid(creation.baseAplicacoes);

    const ancestryName = actor.system.details?.ancestry ?? "";
    const backgroundName = actor.system.details?.background ?? "";
    const className = actor.system.details?.class ?? "";
    const classItem = actor.items.find(item => item.type === "class");
    const classBaseEe = Number(classItem?.system?.classData?.baseEe ?? 0) || 0;
    const classIsCaster = classBaseEe > 0 || /tecel|arcano|mago|brux|feiti|emissario/.test(normalizeText(className));

    const ancestryProfile = this._getAncestryProfile(ancestryName);
    const ancestryTraits = actor.items.filter(item => item.type === "trait").map(itemToContext);

    const backgroundItem = actor.items.find(item => item.type === "background");
    const backgroundTalentOptions = this._extractBackgroundTalentOptions(backgroundItem);
    const backgroundTalents = actor.items.filter(item => this._isBackgroundTalent(item)).map(itemToContext);

    const classInitialTalents = actor.items
      .filter(item => this._isClassInitialTalent(item, className))
      .map(itemToContext);
    const classPassive = actor.items
      .filter(item => this._isClassPassive(item, className))
      .map(itemToContext);

    const maneuversByAxis = {
      fisico: [],
      mental: [],
      social: []
    };
    for (const item of actor.items.filter(entry => entry.type === "maneuver")) {
      const axis = item.system?.roll?.axis;
      if (!AXIS_KEYS.includes(axis)) continue;
      maneuversByAxis[axis].push(itemToContext(item));
    }

    const requiredManeuvers = {
      fisico: totals.eixos.fisico,
      mental: totals.eixos.mental,
      social: totals.eixos.social
    };
    const maneuversComplete = AXIS_KEYS.every(axis => maneuversByAxis[axis].length >= requiredManeuvers[axis]);

    const selectedSpells = actor.items.filter(item => item.type === "spell").map(itemToContext);
    const minimumInitialSpells = classIsCaster ? 1 : 0;
    const hasRequiredInitialSpells = selectedSpells.length >= minimumInitialSpells;

    const trainedSkillsCount = Object.values(actor.system.skills ?? {}).filter(skill => skill?.trained).length;
    const equipmentBudgetGold = this._getInitialEquipmentBudgetGold();
    const equipmentItems = this._getInitialEquipmentItems().map(item => ({
      ...itemToContext(item),
      priceGold: this._getItemPriceGold(item),
      priceLabel: formatGold(this._getItemPriceGold(item))
    }));
    const equipmentSpentGold = equipmentItems.reduce((sum, item) => sum + item.priceGold, 0);
    const equipmentRemainingGold = equipmentBudgetGold - equipmentSpentGold;
    const equipmentWithinBudget = equipmentRemainingGold >= 0;

    return {
      creation,
      pools,
      totals,
      totalsWithinCap,
      ancestryName,
      ancestryProfile,
      hasPrimaryAncestryBonus: Boolean(creation.ancestryBonusPrimary),
      hasExtraAncestryBonus: !ancestryProfile.extraApplication || Boolean(creation.ancestryBonusExtra),
      ancestryTraits,
      backgroundName,
      backgroundTalentOptions,
      backgroundTalents,
      className,
      classBaseEe,
      classIsCaster,
      classInitialTalents,
      classPassive,
      selectedSpells,
      minimumInitialSpells,
      hasRequiredInitialSpells,
      requiredManeuvers,
      maneuversByAxis,
      maneuversComplete,
      trainedSkillsCount,
      equipmentItems,
      equipmentBudgetGold,
      equipmentSpentGold,
      equipmentRemainingGold,
      equipmentWithinBudget
    };
  }

  _computeWizardChecks(summary) {
    const checks = {};
    checks[1] = summary.pools.eixosValid && summary.pools.aplicacoesValid && summary.totalsWithinCap;
    checks[2] = Boolean(summary.ancestryName)
      && summary.hasPrimaryAncestryBonus
      && summary.hasExtraAncestryBonus
      && summary.ancestryTraits.length >= 3;
    checks[3] = Boolean(summary.backgroundName) && summary.backgroundTalents.length >= 1;
    checks[4] = Boolean(summary.className) && summary.classPassive.length >= 1 && summary.classInitialTalents.length >= 2;
    checks[5] = summary.maneuversComplete;
    checks[6] = summary.hasRequiredInitialSpells;
    checks[7] = summary.equipmentWithinBudget && summary.equipmentItems.length > 0;
    checks[8] = checks[1] && checks[2] && checks[3] && checks[4] && checks[5] && checks[6] && checks[7];
    return checks;
  }

  _validateWizardStep(step, { notify = true } = {}) {
    const summary = this._getWizardSummary();
    const checks = this._computeWizardChecks(summary);
    if (checks[step]) return true;
    if (!notify) return false;

    switch (step) {
      case 1:
        if (!summary.pools.eixosValid || !summary.pools.aplicacoesValid) {
          ui.notifications?.warn("Distribua Eixos e Aplicacoes em 6/6, com minimo 1 e maximo 3.");
          return false;
        }
        ui.notifications?.warn("Com os bonus da ancestralidade, nenhum valor pode passar de 4 no nivel 1.");
        return false;
      case 2:
        if (!summary.ancestryName) {
          ui.notifications?.warn("Selecione a ancestralidade.");
          return false;
        }
        if (!summary.hasPrimaryAncestryBonus) {
          ui.notifications?.warn("Selecione o bonus inicial da ancestralidade.");
          return false;
        }
        if (!summary.hasExtraAncestryBonus) {
          ui.notifications?.warn("A ancestralidade humana exige escolher a Aplicacao extra.");
          return false;
        }
        ui.notifications?.warn("Escolha os 3 tracos iniciais da ancestralidade.");
        return false;
      case 3:
        if (!summary.backgroundName) {
          ui.notifications?.warn("Selecione o antecedente.");
          return false;
        }
        ui.notifications?.warn("Escolha 1 talento do antecedente.");
        return false;
      case 4:
        if (!summary.className) {
          ui.notifications?.warn("Selecione a classe.");
          return false;
        }
        if (summary.classPassive.length < 1) {
          ui.notifications?.warn("A passiva da classe ainda nao foi aplicada.");
          return false;
        }
        ui.notifications?.warn("Escolha 2 talentos iniciais da classe.");
        return false;
      case 5:
        ui.notifications?.warn("Complete a selecao de manobras de acordo com os Eixos.");
        return false;
      case 6:
        if (!summary.classIsCaster) return true;
        ui.notifications?.warn(`Selecione pelo menos ${summary.minimumInitialSpells} magia inicial para a classe conjuradora.`);
        return false;
      case 7:
        if (!summary.equipmentItems.length) {
          ui.notifications?.warn("Compre ao menos 1 equipamento inicial.");
          return false;
        }
        ui.notifications?.warn("O total gasto em equipamentos iniciais excede o orcamento.");
        return false;
      default:
        ui.notifications?.warn("Etapa de criacao incompleta.");
        return false;
    }
  }

  async _getPackDocuments(packId) {
    if (PandorhaActorSheet._packCache.has(packId)) return PandorhaActorSheet._packCache.get(packId);
    const pack = game.packs?.get(packId);
    if (!pack) return [];
    const docs = await pack.getDocuments();
    PandorhaActorSheet._packCache.set(packId, docs);
    return docs;
  }

  async _pickPackDocument({ packId, title, filterFn }) {
    const docs = await this._getPackDocuments(packId);
    const filtered = docs.filter(doc => (typeof filterFn === "function" ? filterFn(doc) : true));
    if (!filtered.length) {
      ui.notifications?.warn("Nenhuma opcao disponivel para esse filtro.");
      return null;
    }

    return new Promise(resolve => {
      let resolved = false;
      const close = (value) => {
        if (resolved) return;
        resolved = true;
        resolve(value ?? null);
      };

      const options = filtered
        .map((doc, index) => `<option value="${index}">${foundry.utils.escapeHTML(doc.name)}</option>`)
        .join("");

      new Dialog({
        title,
        content: `<form><div class="form-group"><label>Opcao</label><select name="entry">${options}</select></div></form>`,
        buttons: {
          add: {
            icon: '<i class="fas fa-check"></i>',
            label: "Selecionar",
            callback: html => {
              const index = Number(html.find("select[name='entry']").val());
              close(filtered[index] ?? null);
            }
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancelar",
            callback: () => close(null)
          }
        },
        default: "add",
        close: () => close(null)
      }).render(true);
    });
  }

  async _pickSimpleOption({ title, options }) {
    if (!options.length) return null;
    return new Promise(resolve => {
      let resolved = false;
      const close = (value) => {
        if (resolved) return;
        resolved = true;
        resolve(value ?? null);
      };

      const optionHtml = options
        .map((option, index) => {
          const label = foundry.utils.escapeHTML(option.label);
          const description = foundry.utils.escapeHTML(option.description ?? "");
          return `<option value="${index}">${label}${description ? ` - ${description}` : ""}</option>`;
        })
        .join("");

      new Dialog({
        title,
        content: `<form><div class="form-group"><label>Opcao</label><select name="entry">${optionHtml}</select></div></form>`,
        buttons: {
          add: {
            icon: '<i class="fas fa-check"></i>',
            label: "Selecionar",
            callback: html => {
              const index = Number(html.find("select[name='entry']").val());
              close(options[index]?.value ?? null);
            }
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancelar",
            callback: () => close(null)
          }
        },
        default: "add",
        close: () => close(null)
      }).render(true);
    });
  }

  async _createItemFromPackDocument(doc, typeOverride = null) {
    const data = doc.toObject();
    delete data._id;
    if (typeOverride) data.type = typeOverride;
    const created = await this.document.createEmbeddedDocuments("Item", [data]);
    return created?.[0] ?? null;
  }

  async _replaceSingleItemFromPack({ doc, type, detailsField }) {
    const previousIds = this.document.items.filter(item => item.type === type).map(item => item.id);
    if (previousIds.length) {
      await this.document.deleteEmbeddedDocuments("Item", previousIds);
    }
    const created = await this._createItemFromPackDocument(doc, type);
    if (created) {
      await this.document.update({ [`system.details.${detailsField}`]: created.name });
    }
    return created;
  }

  async _deleteItemsByPredicate(predicate) {
    const ids = this.document.items.filter(predicate).map(item => item.id);
    if (!ids.length) return;
    await this.document.deleteEmbeddedDocuments("Item", ids);
  }

  async _ensureClassPassive(className) {
    if (!className) return;
    const alreadyExists = this.document.items.some(item => this._isClassPassive(item, className));
    if (alreadyExists) return;

    const docs = await this._getPackDocuments("pandorha.class-features");
    const passive = docs.find(doc => doc.system?.details?.category === `${className} - Passiva`);
    if (!passive) {
      ui.notifications?.warn(`Nao encontrei passiva inicial da classe ${className} no compendio.`);
      return;
    }
    await this._createItemFromPackDocument(passive, "feature");
  }
}

