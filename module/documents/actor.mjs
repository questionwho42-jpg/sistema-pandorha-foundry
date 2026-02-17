import { SKILLS } from "../data/skills.mjs";
import { getActorAutomation, getDerivedEffectBonuses } from "../data/automation.mjs";

export class PandorhaActor extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();

    const system = this.system;
    const automation = getActorAutomation(this);
    const effectBonuses = getDerivedEffectBonuses(this);

    const level = Number(system.attributes.level ?? 0);
    const fis = Number(system.eixos.fisico ?? 0) + automation.eixos.fisico;
    const men = Number(system.eixos.mental ?? 0) + automation.eixos.mental;
    const soc = Number(system.eixos.social ?? 0) + automation.eixos.social;
    const conf = Number(system.aplicacoes.conflito ?? 0) + automation.aplicacoes.conflito;
    const inter = Number(system.aplicacoes.interacao ?? 0) + automation.aplicacoes.interacao;
    const res = Number(system.aplicacoes.resistencia ?? 0) + automation.aplicacoes.resistencia;

    system.eixos.fisico = fis;
    system.eixos.mental = men;
    system.eixos.social = soc;
    system.aplicacoes.conflito = conf;
    system.aplicacoes.interacao = inter;
    system.aplicacoes.resistencia = res;

    for (const skill of SKILLS) {
      const skillData = system.skills?.[skill.id];
      const autoSkill = automation.skills?.[skill.id];
      if (!skillData || !autoSkill) continue;
      skillData.bonus = Number(skillData.bonus ?? 0) + Number(autoSkill.bonus ?? 0);
      skillData.trained = Boolean(skillData.trained || autoSkill.trained);
    }

    system.bonuses.attack = Number(system.bonuses.attack ?? 0) + automation.attack;
    system.bonuses.damage = Number(system.bonuses.damage ?? 0) + automation.damage;

    const classItem = this.items.find(i => i.type === "class");
    const baseHp = classItem?.system.classData?.baseHp ?? 0;
    const basePv = classItem?.system.classData?.basePv ?? 0;
    const baseEe = classItem?.system.classData?.baseEe ?? 0;

    const hpMax = baseHp + (fis + res) * 5 + automation.resources.hp + effectBonuses.resources.hp;
    const pvMax = basePv + (fis + inter) + level + automation.resources.pv + effectBonuses.resources.pv;
    const eeMax = baseEe + (men + res) + level + automation.resources.ee + effectBonuses.resources.ee;

    system.resources.hp.max = hpMax;
    system.resources.pv.max = pvMax;
    system.resources.ee.max = eeMax;

    system.attributes.tier = this._getTier(level);

    const armorItems = this.items.filter(i => i.type === "armor" && i.system.equipped);
    const shieldItems = this.items.filter(i => i.type === "shield" && i.system.equipped);

    const armor = armorItems.sort((a, b) => (b.system?.armor?.bonus ?? 0) - (a.system?.armor?.bonus ?? 0))[0];
    const armorBonus = armor?.system.armor?.bonus ?? 0;
    const armorMaxAxis = armor?.system.armor?.maxAxis ?? 0;
    const limitedAxis = armorMaxAxis > 0 ? Math.min(fis, armorMaxAxis) : fis;

    const shieldBonus = shieldItems.reduce((sum, i) => sum + (i.system.shield?.bonus ?? 0), 0);

    const ca = 10 + level + armorBonus + limitedAxis + shieldBonus + automation.ca + effectBonuses.ca;
    system.defenses.ca = ca;

    const movementBase = Number(system.movement.base ?? 0);
    system.movement.base = Math.max(0, movementBase + automation.movement);

    system.derived.initiative = level + men + inter + automation.initiative + effectBonuses.initiative;
    system.derived.dc = 10 + level;
    system.derived.dcTable = this._getDcTable(system.attributes.tier);
    const carryBase = (fis + res) + 6 + automation.carryBonus;
    const carryMultiplier = Math.max(1, Number(automation.carryMultiplier ?? 1));
    system.derived.carryMax = Math.max(0, Math.floor(carryBase * carryMultiplier));
    system.derived.carrySlots = this._calculateCarrySlots();
  }

  _calculateCarrySlots() {
    return this.items.reduce((total, item) => total + this._getItemSlotCost(item), 0);
  }

  _getItemSlotCost(item) {
    const explicit = Number(item.system?.slotCost ?? 0);
    if (Number.isFinite(explicit) && explicit > 0) return explicit;

    const normalize = value => String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const quantity = Math.max(1, Number(item.system?.quantity ?? 1) || 1);
    const category = normalize(item.system?.details?.category ?? "");
    const name = normalize(item.name ?? "");
    const type = item.type;

    if (type === "consumable" || type === "rune") return 0;
    if (type === "equipment") return Math.ceil(quantity / 3);

    if (type === "armor") {
      if (category.includes("pesad")) return 2;
      return 1;
    }

    if (type === "shield") {
      const shieldType = normalize(item.system?.shield?.type ?? "");
      if (name.includes("torre") || shieldType.includes("pesad")) return 2;
      return 1;
    }

    if (type === "weapon") {
      const tagsRaw = item.system?.weapon?.tags ?? [];
      const tags = Array.isArray(tagsRaw)
        ? tagsRaw.map(normalize)
        : String(tagsRaw).split(",").map(normalize);
      const isLongWeapon =
        tags.some(t => t.includes("2 maos") || t.includes("pesada"))
        || name.includes("arco")
        || name.includes("besta")
        || name.includes("cajado")
        || name.includes("montante")
        || name.includes("alabarda");
      return isLongWeapon ? 2 : 1;
    }

    return 0;
  }

  _getTier(level) {
    if (level >= 16) return 4;
    if (level >= 11) return 3;
    if (level >= 6) return 2;
    return 1;
  }

  _getDcTable(tier) {
    switch (tier) {
      case 4:
        return { mundana: 30, desafiadora: 33, lendaria: 38, divina: 43 };
      case 3:
        return { mundana: 24, desafiadora: 27, lendaria: 32, divina: 37 };
      case 2:
        return { mundana: 18, desafiadora: 21, lendaria: 26, divina: 31 };
      default:
        return { mundana: 12, desafiadora: 15, lendaria: 20, divina: 25 };
    }
  }
}
