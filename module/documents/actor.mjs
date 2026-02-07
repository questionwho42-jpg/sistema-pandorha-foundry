export class PandorhaActor extends Actor {
  prepareDerivedData() {
    super.prepareDerivedData();

    const system = this.system;
    const level = system.attributes.level ?? 0;
    const fis = system.eixos.fisico ?? 0;
    const men = system.eixos.mental ?? 0;
    const soc = system.eixos.social ?? 0;
    const conf = system.aplicacoes.conflito ?? 0;
    const inter = system.aplicacoes.interacao ?? 0;
    const res = system.aplicacoes.resistencia ?? 0;

    const classItem = this.items.find(i => i.type === "class");
    const baseHp = classItem?.system.classData?.baseHp ?? 0;
    const basePv = classItem?.system.classData?.basePv ?? 0;
    const baseEe = classItem?.system.classData?.baseEe ?? 0;

    const hpMax = baseHp + (fis + res) * 5;
    const pvMax = basePv + (fis + inter) + level;
    const eeMax = baseEe + (men + res) + level;

    system.resources.hp.max = hpMax;
    system.resources.pv.max = pvMax;
    system.resources.ee.max = eeMax;

    system.attributes.tier = this._getTier(level);

    const armorItems = this.items.filter(i => i.type === "armor" && i.system.equipped);
    const shieldItems = this.items.filter(i => i.type === "shield" && i.system.equipped);

    const armor = armorItems[0];
    const armorBonus = armor?.system.armor?.bonus ?? 0;
    const armorMaxAxis = armor?.system.armor?.maxAxis ?? 0;
    const limitedAxis = armorMaxAxis > 0 ? Math.min(fis, armorMaxAxis) : fis;

    const shieldBonus = shieldItems.reduce((sum, i) => sum + (i.system.shield?.bonus ?? 0), 0);

    const ca = 10 + level + armorBonus + limitedAxis + shieldBonus;
    system.defenses.ca = ca;

    system.derived.initiative = level + men + inter;
    system.derived.dc = 10 + level;
    system.derived.dcTable = this._getDcTable(system.attributes.tier);
    system.derived.carryMax = (fis + res) + 6;
    system.derived.carrySlots = this._calculateCarrySlots();
  }

  _calculateCarrySlots() {
    let slots = 0;
    for (const item of this.items) {
      const cost = Number(item.system.slotCost ?? 0);
      if (!Number.isNaN(cost)) slots += cost;
    }
    return slots;
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
